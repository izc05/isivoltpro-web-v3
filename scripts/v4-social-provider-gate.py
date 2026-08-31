from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

CHANNEL_PROVIDER = {
    "linkedin": "linkedin",
    "instagram": "meta",
    "facebook": "meta",
}
FORBIDDEN_SECRET_KEYS = {
    "token",
    "access_token",
    "accesstoken",
    "secret",
    "client_secret",
    "clientsecret",
    "password",
    "api_key",
    "apikey",
}


def fail(message: str) -> int:
    print(f"Provider gate: {message}", file=sys.stderr)
    return 1


def load(path: Path) -> dict:
    if not path.is_file():
        raise RuntimeError(f"no existe el paquete: {path}")
    value = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(value, dict):
        raise RuntimeError("el paquete debe ser un objeto JSON")
    return value


def normalized_key(value: str) -> str:
    return re.sub(r"[^a-z0-9_]", "", value.lower())


def reject_secrets(value, prefix: str = "root") -> None:
    if isinstance(value, dict):
        for key, child in value.items():
            if normalized_key(str(key)) in FORBIDDEN_SECRET_KEYS:
                raise RuntimeError(f"secreto incrustado en payload: {prefix}.{key}")
            reject_secrets(child, f"{prefix}.{key}")
    elif isinstance(value, list):
        for index, child in enumerate(value):
            reject_secrets(child, f"{prefix}[{index}]")


def text(data: dict, key: str, minimum: int = 1) -> str:
    value = str(data.get(key, "")).strip()
    if len(value) < minimum:
        raise RuntimeError(f"falta campo: {key}")
    return value


def validate_base(package: dict) -> tuple[str, str, dict, dict]:
    reject_secrets(package)
    queue_id = text(package, "queueId", 6)
    channel = text(package, "channel", 5)
    if channel not in CHANNEL_PROVIDER:
        raise RuntimeError(f"canal no permitido: {channel}")
    provider = text(package, "provider", 4)
    expected = CHANNEL_PROVIDER[channel]
    if provider != expected:
        raise RuntimeError(f"{channel} debe usar proveedor {expected}, no {provider}")

    approval = package.get("approval")
    if not isinstance(approval, dict) or approval.get("approved") is not True:
        raise RuntimeError("falta aprobación humana explícita")
    text(approval, "approvedBy", 2)
    text(approval, "approvedAt", 10)

    connection = package.get("connection")
    if not isinstance(connection, dict):
        raise RuntimeError("falta estado de conexión")
    if connection.get("state") != "ready":
        raise RuntimeError("el proveedor no está listo")
    if connection.get("credentialLocation") != "backend_secret_store":
        raise RuntimeError("las credenciales deben residir en backend_secret_store")

    request = package.get("request")
    if not isinstance(request, dict):
        raise RuntimeError("falta petición social")
    text(request, "idempotencyKey", 12)
    text(request, "caption", 12)
    media = text(request, "media", 8)
    if not media.startswith("/"):
        raise RuntimeError("media debe ser una ruta pública absoluta")
    article_path = text(request, "articlePath", 8)
    if not article_path.startswith("/blog/"):
        raise RuntimeError("articlePath debe apuntar al Blog")
    if request.get("state") == "published":
        raise RuntimeError("una petición no puede declararse published antes del receipt")

    return queue_id, channel, approval, request


def validate_send(package: dict) -> dict:
    queue_id, channel, approval, request = validate_base(package)
    if package.get("receipt") not in (None, {}):
        raise RuntimeError("validate-send no acepta un receipt previo")
    return {
        "queueId": queue_id,
        "channel": channel,
        "provider": package["provider"],
        "state": "ready_to_send",
        "approvedBy": approval["approvedBy"],
        "idempotencyKey": request["idempotencyKey"],
        "providerConfirmationRequired": True,
    }


def validate_receipt(package: dict) -> dict:
    queue_id, channel, approval, request = validate_base(package)
    receipt = package.get("receipt")
    if not isinstance(receipt, dict):
        raise RuntimeError("falta receipt del proveedor")
    if receipt.get("state") != "published":
        raise RuntimeError("solo un receipt published puede cerrar la publicación")
    provider_publication_id = text(receipt, "providerPublicationId", 3)
    confirmed_at = text(receipt, "confirmedAt", 10)
    if receipt.get("provider") != package["provider"]:
        raise RuntimeError("el receipt no corresponde al proveedor solicitado")
    if receipt.get("channel") != channel:
        raise RuntimeError("el receipt no corresponde al canal solicitado")
    if receipt.get("queueId") != queue_id:
        raise RuntimeError("el receipt no corresponde a la cola solicitada")
    if receipt.get("idempotencyKey") != request["idempotencyKey"]:
        raise RuntimeError("el receipt no conserva la clave de idempotencia")
    return {
        "queueId": queue_id,
        "channel": channel,
        "provider": package["provider"],
        "state": "published_confirmed",
        "providerPublicationId": provider_publication_id,
        "confirmedAt": confirmed_at,
        "approvedBy": approval["approvedBy"],
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("mode", choices=["validate-send", "validate-receipt"])
    parser.add_argument("input")
    parser.add_argument("--output")
    args = parser.parse_args()
    try:
        package = load(Path(args.input))
        result = validate_send(package) if args.mode == "validate-send" else validate_receipt(package)
        body = json.dumps(result, ensure_ascii=False, indent=2) + "\n"
        if args.output:
            Path(args.output).write_text(body, encoding="utf-8")
        print(body, end="")
        return 0
    except Exception as exc:
        return fail(f"{type(exc).__name__}: {exc}")


if __name__ == "__main__":
    sys.exit(main())
