const skinCheckbox = document.getElementById("skinProcessCheckbox");
const skinInputDiv = document.getElementById("skinProcessInput");
const skinWeightInput = document.getElementById("skinProcessWeight");
const skinTotal = document.getElementById("skinProcessTotal");

const coolerCheckbox = document.getElementById("coolerCheckbox");
const coolerInputDiv = document.getElementById("coolerInput");
const coolerWeightInput = document.getElementById("coolerWeight");
const coolerTotal = document.getElementById("coolerTotal");

skinCheckbox.addEventListener("change", () => {
  skinInputDiv.classList.toggle("hidden", !skinCheckbox.checked);
  if (!skinCheckbox.checked) {
    skinWeightInput.value = "";
    skinTotal.textContent = "$0.00";
  }
});

coolerCheckbox.addEventListener("change", () => {
  coolerInputDiv.classList.toggle("hidden", !coolerCheckbox.checked);
  if (!coolerCheckbox.checked) {
    coolerWeightInput.value = "";
    coolerTotal.textContent = "$0.00";
  }
});

skinWeightInput.addEventListener("input", () => {
  const weight = parseFloat(skinWeightInput.value);
  if (!isNaN(weight)) {
    const total = Math.max(weight * 1.25, 50);
    skinTotal.textContent = `$${total.toFixed(2)}`;
  } else {
    skinTotal.textContent = "$0.00";
  }
});

coolerWeightInput.addEventListener("input", () => {
  const weight = parseFloat(coolerWeightInput.value);
  if (!isNaN(weight)) {
    const total = Math.max(weight * 1.25, 50);
    coolerTotal.textContent = `$${total.toFixed(2)}`;
  } else {
    coolerTotal.textContent = "$0.00";
  }
});

const loinPorkRadio = document.getElementById("loinPork");
const loinTenderloinRadio = document.getElementById("loinTenderloin");
const porkLoinCutOptions = document.getElementById("porkLoinCutOptions");

function updateLoinCutStyle() {
  porkLoinCutOptions.classList.toggle("hidden", !loinPorkRadio.checked);
}

loinPorkRadio.addEventListener("change", updateLoinCutStyle);
loinTenderloinRadio.addEventListener("change", updateLoinCutStyle);