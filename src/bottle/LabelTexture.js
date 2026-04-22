import * as THREE from 'three';

export class LabelTexture {
  constructor(width = 1024, height = 512) {
    this.width = width;
    this.height = height;
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext('2d');

    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.wrapS = THREE.ClampToEdgeWrapping;
    this.texture.wrapT = THREE.ClampToEdgeWrapping;
    this.texture.anisotropy = 16;

    this.brandName = '';
    this.brandColor = '#6c63ff';
    this.logoImage = null;

    this._render();
  }

  update({ brandName, brandColor, logoImage }) {
    if (brandName !== undefined) this.brandName = brandName;
    if (brandColor !== undefined) this.brandColor = brandColor;
    if (logoImage !== undefined) this.logoImage = logoImage;
    this._render();
    this.texture.needsUpdate = true;
  }

  _render() {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    // Background with brand color
    ctx.fillStyle = this.brandColor;
    ctx.fillRect(0, 0, w, h);

    // Subtle pattern overlay
    ctx.save();
    ctx.globalAlpha = 0.06;
    for (let i = 0; i < w; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, h);
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
    ctx.restore();

    // Top & bottom accent lines
    const gradient = ctx.createLinearGradient(0, 0, w, 0);
    gradient.addColorStop(0, 'rgba(255,255,255,0)');
    gradient.addColorStop(0.5, 'rgba(255,255,255,0.5)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, 3);
    ctx.fillRect(0, h - 3, w, 3);

    // Corner accents
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 2;
    const cm = 30;
    // top-left
    ctx.beginPath(); ctx.moveTo(cm, 15); ctx.lineTo(15, 15); ctx.lineTo(15, cm); ctx.stroke();
    // top-right
    ctx.beginPath(); ctx.moveTo(w - cm, 15); ctx.lineTo(w - 15, 15); ctx.lineTo(w - 15, cm); ctx.stroke();
    // bottom-left
    ctx.beginPath(); ctx.moveTo(cm, h - 15); ctx.lineTo(15, h - 15); ctx.lineTo(15, h - cm); ctx.stroke();
    // bottom-right
    ctx.beginPath(); ctx.moveTo(w - cm, h - 15); ctx.lineTo(w - 15, h - 15); ctx.lineTo(w - 15, h - cm); ctx.stroke();

    // Determine content vertical layout
    const hasLogo = this.logoImage !== null;
    const hasName = this.brandName.length > 0;

    if (hasLogo && hasName) {
      // Logo centered upper half, name below
      this._drawLogo(w / 2, h * 0.38, Math.min(180, w * 0.3));
      this._drawBrandName(w / 2, h * 0.72);
    } else if (hasLogo) {
      this._drawLogo(w / 2, h * 0.5, Math.min(200, w * 0.35));
    } else if (hasName) {
      this._drawBrandName(w / 2, h * 0.5);
    } else {
      // Default placeholder
      ctx.save();
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = '#fff';
      ctx.font = '600 24px Inter, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('YOUR BRAND HERE', w / 2, h / 2);
      ctx.restore();
    }

    // Small "SlipAds" branding
    ctx.save();
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = '#fff';
    ctx.font = '500 11px Inter, system-ui, sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    ctx.fillText('powered by SlipAds', w - 20, h - 10);
    ctx.restore();
  }

  _drawBrandName(x, y) {
    const ctx = this.ctx;
    const text = this.brandName;
    const maxWidth = this.width * 0.7;

    // Adaptive font size
    let fontSize = 56;
    ctx.font = `800 ${fontSize}px Outfit, system-ui, sans-serif`;
    while (ctx.measureText(text).width > maxWidth && fontSize > 20) {
      fontSize -= 2;
      ctx.font = `800 ${fontSize}px Outfit, system-ui, sans-serif`;
    }

    // Text shadow
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 3;
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x, y);
    ctx.restore();
  }

  _drawLogo(x, y, maxSize) {
    if (!this.logoImage) return;
    const ctx = this.ctx;
    const img = this.logoImage;

    const scale = Math.min(maxSize / img.width, maxSize / img.height, 1);
    const dw = img.width * scale;
    const dh = img.height * scale;

    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 10;
    ctx.drawImage(img, x - dw / 2, y - dh / 2, dw, dh);
    ctx.restore();
  }

  getTexture() {
    return this.texture;
  }
}
