export class ControlPanel {
  constructor(labelTexture) {
    this.labelTexture = labelTexture;

    this.brandInput = document.getElementById('brandNameInput');
    this.charCount = document.getElementById('charCount');
    this.colorSwatches = document.querySelectorAll('.color-swatch');
    this.customColorPicker = document.getElementById('customColorPicker');
    this.logoFileInput = document.getElementById('logoFileInput');
    this.uploadZone = document.getElementById('uploadZone');
    this.uploadContent = document.getElementById('uploadContent');
    this.uploadPreview = document.getElementById('uploadPreview');
    this.logoPreviewImg = document.getElementById('logoPreviewImg');
    this.removeLogoBtn = document.getElementById('removeLogo');
    this.resetBtn = document.getElementById('resetBtn');

    this.init();
  }

  init() {
    // Brand Name Input
    this.brandInput.addEventListener('input', (e) => {
      this.charCount.textContent = e.target.value.length;
      this.labelTexture.update({ brandName: e.target.value });
    });

    // Color Swatches
    this.colorSwatches.forEach(swatch => {
      swatch.addEventListener('click', () => {
        this.setActiveColorSwatch(swatch);
        const color = swatch.getAttribute('data-color');
        this.labelTexture.update({ brandColor: color });
      });
    });

    // Custom Color Picker
    this.customColorPicker.addEventListener('input', (e) => {
      this.colorSwatches.forEach(s => s.classList.remove('active'));
      this.labelTexture.update({ brandColor: e.target.value });
    });

    // Logo Upload (Click)
    this.uploadZone.addEventListener('click', (e) => {
      if (e.target !== this.removeLogoBtn) {
        this.logoFileInput.click();
      }
    });

    // Logo Upload (Drag & Drop)
    this.uploadZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      this.uploadZone.classList.add('drag-over');
    });

    this.uploadZone.addEventListener('dragleave', () => {
      this.uploadZone.classList.remove('drag-over');
    });

    this.uploadZone.addEventListener('drop', (e) => {
      e.preventDefault();
      this.uploadZone.classList.remove('drag-over');
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        this.handleFileUpload(e.dataTransfer.files[0]);
      }
    });

    // Logo File Input Change
    this.logoFileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length > 0) {
        this.handleFileUpload(e.target.files[0]);
      }
    });

    // Remove Logo
    this.removeLogoBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.logoFileInput.value = '';
      this.uploadContent.style.display = 'flex';
      this.uploadPreview.style.display = 'none';
      this.logoPreviewImg.src = '';
      this.labelTexture.update({ logoImage: null });
    });

    // Reset All
    this.resetBtn.addEventListener('click', () => {
      this.reset();
    });
  }

  handleFileUpload(file) {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, SVG).');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('File size must be less than 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        this.uploadContent.style.display = 'none';
        this.uploadPreview.style.display = 'block';
        this.logoPreviewImg.src = e.target.result;
        this.labelTexture.update({ logoImage: img });
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  setActiveColorSwatch(activeSwatch) {
    this.colorSwatches.forEach(swatch => swatch.classList.remove('active'));
    activeSwatch.classList.add('active');
  }

  reset() {
    this.brandInput.value = '';
    this.charCount.textContent = '0';
    this.setActiveColorSwatch(this.colorSwatches[0]);
    this.customColorPicker.value = '#6c63ff';
    this.logoFileInput.value = '';
    this.uploadContent.style.display = 'flex';
    this.uploadPreview.style.display = 'none';
    this.logoPreviewImg.src = '';

    this.labelTexture.update({
      brandName: '',
      brandColor: '#6c63ff',
      logoImage: null
    });
  }
}
