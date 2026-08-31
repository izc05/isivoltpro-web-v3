from __future__ import annotations

import json
import os
import re
import sys
from pathlib import Path

ARTICLE_FILE = Path(os.environ.get("V4_SOCIAL_ARTICLE_FILE", ""))
OUT = Path(os.environ.get("V4_SOCIAL_QUEUE_DIR", "social-queue-output"))
OUT.mkdir(parents=True, exist_ok=True)
CHANNELS = ("linkedin", "instagram", "facebook")


def fail(message: str) -> int:
    print(f"Social queue: {message}", file=sys.stderr)
    return 1


def load_article(path: Path) -> dict:
    if not path.is_file():
        raise RuntimeError(f"no existe el artículo: {path}")
    text = path.read_text(encoding="utf-8")
    marker = "export const v3DailyGeneratedPost = "
    if marker not in text or " satisfies V3DailyPublishedPost;" not in text:
        raise RuntimeError("el archivo no tiene el formato editorial generado esperado")
    payload = text.split(marker, 1)[1].rsplit(" satisfies V3DailyPublishedPost;", 1)[0].strip()
    article = json.loads(payload)
    if not isinstance(article, dict):
        raise RuntimeError("el artículo generado no contiene un objeto")
    return article


def required(article: dict, key: str, minimum: int = 1) -> str:
    value = str(article.get(key, "")).strip()
    if len(value) < minimum:
        raise RuntimeError(f"falta campo editorial: {key}")
    return value


def clean_hashtag(value: str) -> str:
    value = value.lower()
    value = value.replace("á", "a").replace("é", "e").replace("í", "i").replace("ó", "o").replace("ú", "u").replace("ñ", "n")
    value = re.sub(r"[^a-z0-9]+", "", value)
    return value


def source_line(article: dict) -> str:
    source = article.get("source") or {}
    name = str(source.get("name", "")).strip()
    state = str(article.get("regulationState", "")).strip()
    if name and state:
        return f"Fuente: {name} · estado: {state}."
    if name:
        return f"Fuente: {name}."
    return ""


def captions(article: dict) -> dict[str, str]:
    title = required(article, "title", 12)
    excerpt = required(article, "excerpt", 45)
    takeaway = required(article, "takeaway", 15)
    route = f"/blog/{required(article, 'slug', 5)}/"
    source = source_line(article)
    keywords = article.get("keywords") if isinstance(article.get("keywords"), list) else []
    tags = [clean_hashtag(str(item)) for item in keywords]
    tags = [tag for tag in tags if len(tag) >= 3][:5]
    instagram_tags = " ".join(f"#{tag}" for tag in [*tags, "mantenimiento", "isivoltpro"][:7])

    linkedin = "\n\n".join(filter(None, [
        title,
        excerpt,
        f"Idea práctica: {takeaway}",
        source,
        f"Artículo preparado en IsiVoltPro: {route}",
    ]))
    instagram = "\n\n".join(filter(None, [
        title,
        takeaway,
        excerpt,
        source,
        instagram_tags,
    ]))
    facebook = "\n\n".join(filter(None, [
        title,
        excerpt,
        f"Qué conviene recordar: {takeaway}",
        source,
        f"Leer el artículo: {route}",
    ]))
    return {"linkedin": linkedin[:2500], "instagram": instagram[:2200], "facebook": facebook[:3000]}


def main() -> int:
    try:
        article = load_article(ARTICLE_FILE)
        slug = required(article, "slug", 5)
        image = required(article, "image", 8)
        image_alt = required(article, "imageAlt", 15)
        image_file = Path("public") / image.lstrip("/")
        if not image_file.is_file():
            raise RuntimeError(f"la imagen editorial no existe: {image_file}")

        channel_captions = captions(article)
        queue = {
            "id": f"social-{slug}",
            "postSlug": slug,
            "articlePath": f"/blog/{slug}/",
            "media": image,
            "mediaAlt": image_alt,
            "status": "ready_for_review",
            "approvalRequired": True,
            "automaticPublish": False,
            "providerStatus": "disconnected",
            "channels": [
                {"channel": channel, "status": "draft", "caption": channel_captions[channel]}
                for channel in CHANNELS
            ],
        }
        (OUT / "queue.json").write_text(json.dumps(queue, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        (OUT / "title.txt").write_text(f"Cola social · {slug}\n", encoding="utf-8")

        lines = [
            f"# Cola social · {article['title']}",
            "",
            "> Estado: **lista para revisión**. No existe conexión con proveedores sociales y este documento no publica nada por sí solo.",
            "",
            f"- Artículo: `{queue['articlePath']}`",
            f"- Imagen: `{image}`",
            "- Proveedores: `disconnected`",
            "- Publicación automática: `false`",
            "",
            "## Puerta social",
            "",
            "- [ ] Imagen y ALT revisados para redes.",
            "- [ ] LinkedIn revisado.",
            "- [ ] Instagram revisado.",
            "- [ ] Facebook revisado.",
            "- [ ] Fecha/horario definidos si se programa.",
            "- [ ] Cuenta/proveedor oficial conectado desde backend.",
            "- [ ] Aprobación humana antes de enviar.",
            "",
        ]
        for channel in CHANNELS:
            lines.extend([f"## {channel.capitalize()}", "", channel_captions[channel], ""])
        lines.extend([
            "## Regla de estado",
            "",
            "`scheduled` nunca equivale a `published`. Un futuro worker solo podrá marcar `published` después de recibir confirmación del proveedor oficial.",
        ])
        (OUT / "queue.md").write_text("\n".join(lines).strip() + "\n", encoding="utf-8")
        print(f"Social queue: OK · {slug} · 3 canales · sin publicación automática")
        return 0
    except Exception as exc:
        return fail(f"{type(exc).__name__}: {exc}")


if __name__ == "__main__":
    sys.exit(main())
