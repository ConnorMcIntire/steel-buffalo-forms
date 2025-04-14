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

  // Show backstrap options if checked
document.getElementById('backstraps').addEventListener('change', function () {
    const section = document.getElementById('backstrapsOptions');
    section.classList.toggle('hidden', !this.checked);
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