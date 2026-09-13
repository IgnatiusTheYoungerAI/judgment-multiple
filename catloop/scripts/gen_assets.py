"""Generate CatLoop app assets (icon, splash, adaptive icon, favicon).

Warm, light brand matching app.json splash background (#FFF7ED).
Run: python3 scripts/gen_assets.py
"""
import os
from PIL import Image, ImageDraw, ImageFont

CREAM = (255, 247, 237, 255)
ORANGE = (251, 146, 60, 255)
ORANGE_DEEP = (234, 108, 26, 255)
DARK = (60, 42, 30, 255)
PINK = (244, 114, 182, 255)
WHITE = (255, 255, 255, 255)

ASSETS = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "assets")
os.makedirs(ASSETS, exist_ok=True)


def _font(size: int):
    for path in [
        "/usr/share/fonts/truetype/macos/Inter-Bold.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    ]:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except Exception:
                pass
    return ImageFont.load_default()


def draw_cat(draw: ImageDraw.ImageDraw, cx: float, cy: float, r: float):
    """Draw a friendly cat face centered at (cx, cy) with head radius r."""
    # Ears
    ear = r * 0.95
    draw.polygon(
        [(cx - r * 0.75, cy - r * 0.35), (cx - r * 0.95, cy - r - ear * 0.5), (cx - r * 0.1, cy - r * 0.55)],
        fill=ORANGE,
    )
    draw.polygon(
        [(cx + r * 0.75, cy - r * 0.35), (cx + r * 0.95, cy - r - ear * 0.5), (cx + r * 0.1, cy - r * 0.55)],
        fill=ORANGE,
    )
    # Inner ears
    draw.polygon(
        [(cx - r * 0.62, cy - r * 0.45), (cx - r * 0.72, cy - r * 0.95), (cx - r * 0.3, cy - r * 0.58)],
        fill=PINK,
    )
    draw.polygon(
        [(cx + r * 0.62, cy - r * 0.45), (cx + r * 0.72, cy - r * 0.95), (cx + r * 0.3, cy - r * 0.58)],
        fill=PINK,
    )
    # Head
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=ORANGE)
    # Eyes
    eo = r * 0.42
    ey = cy - r * 0.05
    er = r * 0.16
    for sx in (-1, 1):
        ex = cx + sx * eo
        draw.ellipse([ex - er, ey - er * 1.3, ex + er, ey + er * 1.3], fill=DARK)
        draw.ellipse([ex - er * 0.35, ey - er * 0.9, ex + er * 0.25, ey - er * 0.2], fill=WHITE)
    # Nose
    ny = cy + r * 0.28
    draw.polygon([(cx - r * 0.1, ny), (cx + r * 0.1, ny), (cx, ny + r * 0.16)], fill=PINK)
    # Mouth
    draw.line([(cx, ny + r * 0.16), (cx, ny + r * 0.32)], fill=DARK, width=max(2, int(r * 0.03)))
    draw.arc([cx - r * 0.26, ny + r * 0.1, cx, ny + r * 0.5], 0, 100, fill=DARK, width=max(2, int(r * 0.03)))
    draw.arc([cx, ny + r * 0.1, cx + r * 0.26, ny + r * 0.5], 80, 180, fill=DARK, width=max(2, int(r * 0.03)))
    # Whiskers
    wy = ny + r * 0.05
    wlen = r * 0.7
    lw = max(2, int(r * 0.03))
    for dy in (-r * 0.12, 0, r * 0.12):
        draw.line([(cx - r * 0.5, wy + dy), (cx - r * 0.5 - wlen, wy + dy * 1.6)], fill=DARK, width=lw)
        draw.line([(cx + r * 0.5, wy + dy), (cx + r * 0.5 + wlen, wy + dy * 1.6)], fill=DARK, width=lw)


def make_icon(size: int, bg, path: str, cat_scale: float = 0.34):
    img = Image.new("RGBA", (size, size), bg)
    d = ImageDraw.Draw(img)
    draw_cat(d, size / 2, size * 0.52, size * cat_scale)
    img.save(path)
    print("wrote", path, f"{size}x{size}")


def make_splash(w: int, h: int, path: str):
    img = Image.new("RGBA", (w, h), CREAM)
    d = ImageDraw.Draw(img)
    r = w * 0.22
    cy = h * 0.42
    draw_cat(d, w / 2, cy, r)
    font = _font(int(w * 0.12))
    text = "CatLoop"
    tb = d.textbbox((0, 0), text, font=font)
    tw = tb[2] - tb[0]
    d.text(((w - tw) / 2, cy + r + h * 0.04), text, font=font, fill=ORANGE_DEEP)
    sub_font = _font(int(w * 0.04))
    sub = "AI Cat Video Maker"
    sb = d.textbbox((0, 0), sub, font=sub_font)
    sw = sb[2] - sb[0]
    d.text(((w - sw) / 2, cy + r + h * 0.13), sub, font=sub_font, fill=(150, 120, 95, 255))
    img.save(path)
    print("wrote", path, f"{w}x{h}")


if __name__ == "__main__":
    make_icon(1024, CREAM, os.path.join(ASSETS, "icon.png"), cat_scale=0.3)
    make_icon(1024, (0, 0, 0, 0), os.path.join(ASSETS, "adaptive-icon.png"), cat_scale=0.24)
    make_icon(48, CREAM, os.path.join(ASSETS, "favicon.png"), cat_scale=0.34)
    make_splash(1242, 2436, os.path.join(ASSETS, "splash.png"))
