document.addEventListener("DOMContentLoaded", () => {
    const data = JSON.parse(localStorage.getItem("deerCutsheet"));
    if (!data) {
      document.body.innerHTML = "<p class='text-center text-red-600'>No cutsheet data found.</p>";
      return;
    }
  
    function renderSection(id, html) {
      document.getElementById(id).innerHTML = html;
    }
  
    // Hunter Info
    renderSection("hunterInfo", `
      <h2 class="text-xl font-semibold text-gray-700">Hunter Information</h2>
      <ul class="text-gray-800 space-y-1">
        <li><strong>Name:</strong> ${data.name}</li>
        <li><strong>Drop Off Date:</strong> ${data.dropOffDate}</li>
        <li><strong>Mobile:</strong> ${data.mobilePhone}</li>
        <li><strong>Kill Date:</strong> ${data.killDate}</li>
        <li><strong>County:</strong> ${data.county}</li>
        <li><strong>State:</strong> ${data.state}</li>
        <li><strong>Confirmation #:</strong> ${data.confirmation}</li>
      </ul>
    `);
  
    // Animal Info
    renderSection("animalInfo", `
      <h2 class="text-xl font-semibold text-gray-700">Animal Information</h2>
      <ul class="text-gray-800 space-y-1">
        <li><strong>Type:</strong> ${data.animalType}</li>
        ${data.animalType === "Buck" ? `<li><strong>Buck Points:</strong> ${data.buckPoints || "N/A"}</li>` : ""}
        ${data.gutFee ? `<li><strong>Gut Fee:</strong> $40.00</li>` : ""}
        ${data.capeFee ? `<li><strong>Cape Fee:</strong> $40.00</li>` : ""}
      </ul>
    `);
  
    // Taxidermy
    renderSection("taxidermyInfo", `
      <h2 class="text-xl font-semibold text-gray-700">Taxidermy</h2>
      <p class="text-gray-800">${data.taxidermy || "None selected"}</p>
    `);
  
    // Processing Prices
    const prices = Array.isArray(data.processingPrices) ? data.processingPrices : [data.processingPrices];
    renderSection("processingPrices", `
      <h2 class="text-xl font-semibold text-gray-700">Basic Processing Prices</h2>
      <ul class="text-gray-800 space-y-1">
        ${prices.filter(Boolean).map(p => `<li>${p}</li>`).join("")}
      </ul>
    `);
  
    // Processing Options
    const processing = Array.isArray(data.processingOptions) ? data.processingOptions : [data.processingOptions];
    renderSection("processingOptions", `
      <h2 class="text-xl font-semibold text-gray-700">Processing Options</h2>
      <ul class="text-gray-800 space-y-1">
        ${processing.map(opt => `<li>${opt}</li>`).join("")}
        ${data.backstrapStyles?.style1 ? `<li><strong>Backstrap Style 1:</strong> ${data.backstrapStyles.style1}</li>` : ""}
        ${data.backstrapStyles?.style2 ? `<li><strong>Backstrap Style 2:</strong> ${data.backstrapStyles.style2}</li>` : ""}
        ${data.shoulderChoice ? `<li><strong>Shoulder Roasts:</strong> ${data.shoulderChoice}</li>` : ""}
      </ul>
      <h3 class="text-md font-medium mt-2">Hinds:</h3>
      <ul class="text-gray-700">
        ${Object.entries(data.hinds || {}).map(([key, val]) => val > 0 ? `<li>${key.replace("hind", "")}: ${val}</li>` : "").join("")}
      </ul>
    `);
  
    // Specialties
    const specialtiesHTML = Object.entries(data.specialties || {})
      .map(([section, flavors]) => {
        const flavorLines = Object.entries(flavors).map(([flavor, lbs]) =>
          `<li>${flavor.replace(section, "")}: ${lbs} lbs</li>`
        ).join("");
        return `
          <div class="mb-4">
            <h3 class="text-md font-semibold text-green-700 capitalize">${section.replace(/([A-Z])/g, ' $1')}</h3>
            <ul class="ml-4 text-gray-700">${flavorLines}</ul>
          </div>
        `;
      }).join("");
  
    renderSection("specialtiesInfo", `
      <h2 class="text-xl font-semibold text-gray-700">Specialties</h2>
      ${specialtiesHTML || "<p class='text-gray-600'>No specialties selected.</p>"}
    `);
  });

  function handlePrint() {
    window.print();
  
    // Show finish button after print dialog
    setTimeout(() => {
      document.getElementById("finishContainer").classList.remove("hidden");
    }, 1000); // small delay to let the print dialog open first
  }
  
  function finishForm() {
    localStorage.removeItem("deerCutsheet");
    window.location.href = "index.html"; // or wherever you want to send them
  }