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

// === Save form to localStorage and redirect to review page ===

function populateFormFromStorage() {
  const stored = localStorage.getItem("deerCutsheet");
  if (!stored) return;

  const data = JSON.parse(stored);

  for (const key in data) {
    const el = document.querySelector(`[name="${key}"]`);
    if (el && el.type !== "checkbox" && el.type !== "radio") {
      el.value = data[key];
    }
  }

  document.querySelectorAll('input[type="radio"]').forEach(radio => {
    if (data[radio.name] === radio.value) {
      radio.checked = true;
    }
  });

  document.querySelectorAll('input[type="checkbox"]').forEach(box => {
    if (Array.isArray(data[box.name])) {
      box.checked = data[box.name].includes(box.value);
    } else if (data[box.name] === box.value || data[box.name] === true) {
      box.checked = true;
    }
  });

  const hindDropdowns = data.hinds || {};
  for (const key in hindDropdowns) {
    const dropdown = document.getElementById(key);
    if (dropdown) dropdown.value = hindDropdowns[key];
  }

  if (data.shoulderChoice) {
    document.getElementById("shoulderRoast").checked = true;
    document.getElementById("shoulderCount").classList.remove("hidden");
    document.getElementById("shoulderChoice").value = data.shoulderChoice;
  }

  if (data.processingOptions?.includes("Backstraps")) {
    document.getElementById("backstraps").checked = true;
    document.getElementById("backstrapsOptions").classList.remove("hidden");
  }
  document.getElementById("backstrapStyle1").value = data.backstrapStyles?.style1 || "";
  document.getElementById("backstrapStyle2").value = data.backstrapStyles?.style2 || "";

  for (const section in data.specialties) {
    const checkbox = document.getElementById(section);
    const container = document.getElementById(`${section}Options`);
    if (checkbox && container) {
      checkbox.checked = true;
      container.classList.remove("hidden");

      const flavors = data.specialties[section];
      for (const inputId in flavors) {
        const input = document.getElementById(inputId);
        if (input) input.value = flavors[inputId];
      }
    }
  }

  if (data.animalType === "Buck") {
    document.getElementById("buckPointsContainer")?.classList.remove("hidden");
    document.getElementById("buckPoints").value = data.buckPoints || "";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  populateFormFromStorage();

  const form = document.getElementById("cutsheetForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Stop actual form submission

    const formData = new FormData(form);
    const data = {};

    // Store all basic input/checkbox values
    formData.forEach((value, key) => {
      if (data[key]) {
        if (!Array.isArray(data[key])) {
          data[key] = [data[key]];
        }
        data[key].push(value);
      } else {
        data[key] = value;
      }
    });

    // Hinds dropdowns
    const hindDropdowns = ["hindRoasts", "hindSteaks", "hindCubeSteaks", "hindStewMeat", "hindJerky"];
    data.hinds = {};
    hindDropdowns.forEach(id => {
      const el = document.getElementById(id);
      if (el) data.hinds[id] = el.value;
    });

    // Backstrap styles
    data.backstrapStyles = {
      style1: document.getElementById("backstrapStyle1")?.value || "",
      style2: document.getElementById("backstrapStyle2")?.value || ""
    };

    // Specialties
    const specialtyGroups = [
      { id: "jerky", options: ["jerkyOriginal", "jerkyTeriyaki", "jerkyPeppered", "jerkyCajun"] },
      { id: "snackStick", options: ["snackStickOriginal", "snackStickJalapeno"] },
      { id: "summerSausage", options: ["summerSausageOriginal", "summerSausageJalapeno"] },
      { id: "deerBurger", options: ["deerBurgerBleuCheese", "deerBurgerOnionCheddar", "deerBurgerBacon", "deerBurgerJalapenoCheddar"] },
      { id: "brats", options: ["bratsSweet", "bratsMild", "bratsHot"] }
    ];

    data.specialties = {};

    specialtyGroups.forEach(group => {
      const checked = document.getElementById(group.id)?.checked;
      if (checked) {
        data.specialties[group.id] = {};
        group.options.forEach(opt => {
          const val = document.getElementById(opt)?.value;
          if (val && parseFloat(val) > 0) {
            data.specialties[group.id][opt] = val;
          }
        });
      }
    });

    // Save and go to review page
    localStorage.setItem("deerCutsheet", JSON.stringify(data));
    window.location.href = "review.html";
  });
});
