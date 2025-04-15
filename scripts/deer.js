document.querySelectorAll('input[name="animalType"]').forEach(radio => {
    radio.addEventListener('change', () => {
        const pointsSection = document.getElementById('buckPointsContainer');
        if (radio.value === 'Buck') {
            pointsSection.classList.remove('hidden');
        } else {
            pointsSection.classList.add('hidden');
        }
    });
});

const backstrapCheckbox = document.getElementById('backstraps');
const backstrapOptions = document.getElementById('backstrapsOptions');

backstrapCheckbox.addEventListener('change', () => {
    backstrapOptions.classList.toggle('hidden', !backstrapCheckbox.checked);
});

// Show shoulder roast count selector if checked
document.getElementById('shoulderRoast').addEventListener('change', function () {
    const section = document.getElementById('shoulderCount');
    section.classList.toggle('hidden', !this.checked);
});

const hindSelects = document.querySelectorAll('.hind-select');
const hindWarning = document.getElementById('hindWarning');

hindSelects.forEach(select => {
    select.addEventListener('change', () => {
        const total = Array.from(hindSelects)
            .map(s => parseInt(s.value))
            .reduce((sum, val) => sum + val, 0);

        if (total > 2) {
            hindWarning.classList.remove('hidden');
            select.value = "0";
        } else {
            hindWarning.classList.add('hidden');
        }
    });
});

document.getElementById('jerky').addEventListener('change', function () {
    const options = document.getElementById('jerkyOptions');
    options.classList.toggle('hidden', !this.checked);
  });

  document.getElementById('snackStick').addEventListener('change', function () {
    const options = document.getElementById('snackStickOptions');
    options.classList.toggle('hidden', !this.checked);
  });

  document.getElementById('summerSausage').addEventListener('change', function () {
    const options = document.getElementById('summerSausageOptions');
    options.classList.toggle('hidden', !this.checked);
  });

  document.getElementById('deerBurger').addEventListener('change', function () {
    const options = document.getElementById('deerBurgerOptions');
    options.classList.toggle('hidden', !this.checked);
  });

  document.getElementById('brats').addEventListener('change', function () {
    const options = document.getElementById('bratsOptions');
    options.classList.toggle('hidden', !this.checked);
  });

  function setupSpecialtyCheckboxToggle(checkboxId, optionsContainerId) {
    const checkbox = document.getElementById(checkboxId);
    const container = document.getElementById(optionsContainerId);
  
    checkbox.addEventListener('change', () => {
      const isChecked = checkbox.checked;
      container.classList.toggle('hidden', !isChecked);
  
      // Clear number inputs when unchecked
      if (!isChecked) {
        const inputs = container.querySelectorAll('input[type="number"]');
        inputs.forEach(input => input.value = '');
      }
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    // Attach logic to each specialty item
    setupSpecialtyCheckboxToggle('jerky', 'jerkyOptions');
    setupSpecialtyCheckboxToggle('snackStick', 'snackStickOptions');
    setupSpecialtyCheckboxToggle('summerSausage', 'summerSausageOptions');
    setupSpecialtyCheckboxToggle('deerBurger', 'deerBurgerOptions');
    setupSpecialtyCheckboxToggle('brats', 'bratsOptions');
  });