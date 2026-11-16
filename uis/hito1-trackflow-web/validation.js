/* ==========================================
   validation.js — TrackFlow Form Validation
   ========================================== */

(function () {
  'use strict';

  const form = document.getElementById('contact-form');
  if (!form) return;

  // ---------- DOM refs ----------
  const fields = {
    company: {
      el: document.getElementById('company'),
      error: document.getElementById('company-error'),
    },
    contact: {
      el: document.getElementById('contact'),
      error: document.getElementById('contact-error'),
    },
    email: {
      el: document.getElementById('email'),
      error: document.getElementById('email-error'),
    },
    phone: {
      el: document.getElementById('phone'),
      error: document.getElementById('phone-error'),
    },
    website: {
      el: document.getElementById('website'),
      error: document.getElementById('website-error'),
    },
    country: {
      el: document.getElementById('country'),
      error: document.getElementById('country-error'),
    },
    productType: {
      el: document.getElementById('product-type'),
      error: document.getElementById('product-type-error'),
    },
    volume: {
      el: document.getElementById('volume'),
      error: document.getElementById('volume-error'),
    },
    services: {
      inputs: document.querySelectorAll('input[name="services"]'),
      error: document.getElementById('services-error'),
    },
    current3pl: {
      inputs: document.querySelectorAll('input[name="current-3pl"]'),
      error: document.getElementById('current-3pl-error'),
    },
    comments: {
      el: document.getElementById('comments'),
      error: document.getElementById('comments-error'),
      counter: document.getElementById('comments-counter'),
    },
    privacy: {
      el: document.getElementById('privacy'),
      error: document.getElementById('privacy-error'),
    },
  };

  const successMessage = document.getElementById('success-message');
  const volumeWarning = document.getElementById('volume-warning');

  // ---------- Validation rules ----------

  const validators = {
    company(value) {
      if (!value || value.trim().length < 2) {
        return 'El nombre de la empresa debe tener al menos 2 caracteres';
      }
      return '';
    },

    contact(value) {
      if (!value || value.trim().split(/\s+/).length < 2) {
        return 'Ingresa nombre y apellido del contacto';
      }
      return '';
    },

    email(value) {
      if (!value) return 'Ingresa un email corporativo válido (ejemplo: nombre@empresa.com)';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value.trim())) {
        return 'Ingresa un email corporativo válido (ejemplo: nombre@empresa.com)';
      }
      return '';
    },

    phone(value) {
      if (!value) return 'El teléfono debe incluir código de país (ejemplo: +1 213 555 0147)';
      const phoneRegex = /^\+\d[\d\s\-().]{4,}$/;
      if (!phoneRegex.test(value.trim())) {
        return 'El teléfono debe incluir código de país (ejemplo: +1 213 555 0147)';
      }
      return '';
    },

    website(value) {
      if (!value || value.trim() === '') return '';
      const urlRegex = /^https?:\/\/.+/;
      if (!urlRegex.test(value.trim())) {
        return 'Si incluyes sitio web, debe ser una URL válida';
      }
      return '';
    },

    country(value) {
      if (!value) return 'Selecciona el país de operación principal';
      return '';
    },

    productType(value) {
      if (!value) return 'Selecciona el tipo de producto que manejas';
      return '';
    },

    volume(value) {
      if (!value) return 'Selecciona el volumen mensual estimado';
      return '';
    },

    services() {
      const checked = Array.from(fields.services.inputs).some(function (cb) {
        return cb.checked;
      });
      if (!checked) return 'Selecciona al menos un servicio de interés';
      return '';
    },

    current3pl() {
      const checked = Array.from(fields.current3pl.inputs).some(function (cb) {
        return cb.checked;
      });
      if (!checked) return 'Indica si actualmente trabajas con otro proveedor logístico';
      return '';
    },

    comments(value) {
      if (value && value.length > 500) {
        return 'Los comentarios no pueden exceder 500 caracteres (quedan ' + (500 - value.length) + ')';
      }
      return '';
    },

    privacy(checked) {
      if (!checked) return 'Debes aceptar la política de privacidad para continuar';
      return '';
    },
  };

  // ---------- Show / hide error ----------

  function showError(errorEl, message) {
    if (!errorEl) return;
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');
  }

  function hideError(errorEl) {
    if (!errorEl) return;
    errorEl.textContent = '';
    errorEl.classList.add('hidden');
  }

  function setFieldState(input, isValid) {
    if (!input) return;
    input.classList.remove('error', 'success');
    if (isValid === false) {
      input.classList.add('error');
    } else if (isValid === true) {
      input.classList.add('success');
    }
  }

  // ---------- Validate single field ----------

  function validateField(fieldName) {
    var field = fields[fieldName];
    if (!field) return true;

    var value, isValid;

    switch (fieldName) {
      case 'services':
        value = Array.from(field.inputs).filter(function (cb) { return cb.checked; }).length;
        isValid = validators.services();
        break;
      case 'current3pl':
        value = Array.from(field.inputs).filter(function (cb) { return cb.checked; }).length;
        isValid = validators.current3pl();
        break;
      case 'privacy':
        value = field.el.checked;
        isValid = validators.privacy(value);
        break;
      default:
        value = field.el ? field.el.value : '';
        isValid = validators[fieldName](value);
    }

    if (isValid) {
      showError(field.error, isValid);
      setFieldState(field.el || field.inputs[0], false);
      return false;
    }

    hideError(field.error);
    setFieldState(field.el || field.inputs[0], true);
    return true;
  }

  // ---------- Volume warning ----------

  function checkVolumeWarning() {
    var volume = fields.volume.el.value;
    var productType = fields.productType.el.value;

    if (volume === '0-100' && productType && productType !== '') {
      volumeWarning.classList.remove('hidden');
    } else {
      volumeWarning.classList.add('hidden');
    }
  }

  // ---------- Comments counter ----------

  function updateCommentsCounter() {
    var len = fields.comments.el.value.length;
    fields.comments.counter.textContent = len + '/500';

    if (len > 500) {
      fields.comments.counter.classList.add('text-red-600');
      fields.comments.counter.classList.remove('text-gray-400');
    } else {
      fields.comments.counter.classList.remove('text-red-600');
      fields.comments.counter.classList.add('text-gray-400');
    }
  }

  // ---------- Real-time validation events ----------

  // Text/email/tel/url inputs
  ['company', 'contact', 'email', 'phone', 'website'].forEach(function (name) {
    var input = fields[name].el;
    if (!input) return;

    input.addEventListener('blur', function () {
      validateField(name);
    });

    input.addEventListener('input', function () {
      // Clear error while typing
      hideError(fields[name].error);
      setFieldState(input, undefined);
    });
  });

  // Selects
  ['country', 'productType', 'volume'].forEach(function (name) {
    var select = fields[name].el;
    if (!select) return;

    select.addEventListener('change', function () {
      validateField(name);
      if (name === 'volume' || name === 'productType') {
        checkVolumeWarning();
      }
    });
  });

  // Services checkboxes
  fields.services.inputs.forEach(function (cb) {
    cb.addEventListener('change', function () {
      validateField('services');
    });
  });

  // Current 3PL radios
  fields.current3pl.inputs.forEach(function (cb) {
    cb.addEventListener('change', function () {
      validateField('current3pl');
    });
  });

  // Privacy checkbox
  fields.privacy.el.addEventListener('change', function () {
    validateField('privacy');
  });

  // Comments
  fields.comments.el.addEventListener('input', function () {
    updateCommentsCounter();
    validateField('comments');
  });

  // ---------- Reset button ----------

  var limpiarBtn = document.getElementById('limpiar-btn');
  if (limpiarBtn) {
    limpiarBtn.addEventListener('click', function () {
      form.reset();
      // Clear all errors and states
      Object.keys(fields).forEach(function (name) {
        hideError(fields[name].error);
        var input = fields[name].el;
        if (input) {
          input.classList.remove('error', 'success');
        }
        // Reset checkbox/radio groups
        if (fields[name].inputs) {
          fields[name].inputs.forEach(function (cb) {
            cb.classList.remove('error', 'success');
          });
        }
      });
      // Reset comments counter
      document.getElementById('comments-counter').textContent = '0/500';
      // Hide volume warning
      document.getElementById('volume-warning').classList.add('hidden');
      // Hide success message
      document.getElementById('success-message').classList.add('hidden');
      document.getElementById('form-container').classList.remove('hidden');
    });
  }

  // ---------- Form submit ----------

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Validate all fields
    var fieldNames = ['company', 'contact', 'email', 'phone', 'website',
                      'country', 'productType', 'volume', 'services',
                      'current3pl', 'comments', 'privacy'];

    var allValid = true;

    fieldNames.forEach(function (name) {
      var valid = validateField(name);
      if (!valid) allValid = false;
    });

    if (!allValid) {
      // Scroll to first error
      var firstError = form.querySelector('.error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstError.focus({ preventScroll: true });
      }
      return;
    }

    // All valid → show success message
    form.classList.add('hidden');
    successMessage.classList.remove('hidden');
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  // ---------- Init ----------

  updateCommentsCounter();

})();