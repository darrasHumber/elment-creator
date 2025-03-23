function copyCode(elementId) {
  const codeElement = document.getElementById(elementId);
  if (codeElement) {
    navigator.clipboard
      .writeText(codeElement.textContent)
      .then(() => alert("Code copied to clipboard!"))
      .catch(() => alert("Failed to copy code."));
  } else {
    console.error(`Element with ID "${elementId}" not found.`);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  let currentElement = null;

  // Get all cards and the back button
  const cards = document.querySelectorAll(".card");
  const backButton = document.getElementById("backButton");

  // Attach event listeners to cards
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const element = card.getAttribute("data-element");
      showElementPage(element);
    });
  });

  // Attach event listener to back button
  backButton.addEventListener("click", showWelcomePage);

  // Show Welcome Page
  function showWelcomePage() {
    document.getElementById("welcomePage").classList.remove("hidden");
    document.getElementById("elementPage").classList.add("hidden");
  }

  // Show Element Customization Page
  function showElementPage(element) {
    currentElement = element;
    document.getElementById("welcomePage").classList.add("hidden");
    document.getElementById("elementPage").classList.remove("hidden");

    // Set Element Title
    document.getElementById("elementTitle").textContent = `Generate ${
      element.charAt(0).toUpperCase() + element.slice(1)
    }`;

    // Load Element Controls
    const controls = document.getElementById("elementControls");
    controls.innerHTML = getElementControls(element);

    // Add event listeners for dynamic input changes
    controls.addEventListener("input", generateElement);
    controls.addEventListener("change", generateElement); // For select dropdowns

    // Generate Initial Output
    generateElement();
  }

  // Get Controls for Selected Element
  function getElementControls(element) {
    switch (element) {
      case "header":
        return `
            <div class="form-group">
              <label for="headerText">Header Text:</label>
              <input type="text" id="headerText" placeholder="Enter header text">
            </div>
            <div class="form-group">
              <label for="fontSize">Font Size (px):</label>
              <input type="number" id="fontSize" placeholder="e.g., 24">
            </div>
            <div class="form-group">
              <label for="textColor">Text Color:</label>
              <input type="color" id="textColor" value="#000000">
            </div>
            <div class="form-group">
              <label for="backgroundColor">Background Color:</label>
              <input type="color" id="backgroundColor" value="#ffffff">
            </div>
            <div class="form-group">
              <label for="headerAlignment">Alignment:</label>
              <select id="headerAlignment">
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
            <div class="form-group">
              <label for="headerPadding">Padding (px):</label>
              <input type="number" id="headerPadding" placeholder="e.g., 10">
            </div>
            <div class="form-group">
              <label for="headerMargin">Margin (px):</label>
              <input type="number" id="headerMargin" placeholder="e.g., 10">
            </div>
          `;
      case "navbar":
        return `
            <div class="form-group">
              <label for="navbarItems">Navbar Items (comma-separated):</label>
              <input type="text" id="navbarItems" placeholder="e.g., Home, About, Contact">
            </div>
            <div class="form-group">
              <label for="navbarAlignment">Alignment:</label>
              <select id="navbarAlignment">
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
            <div class="form-group">
              <label for="navbarBgColor">Background Color:</label>
              <input type="color" id="navbarBgColor" value="#333">
            </div>
            <div class="form-group">
              <label for="navbarTextColor">Text Color:</label>
              <input type="color" id="navbarTextColor" value="#fff">
            </div>
          `;
      case "button":
        return `
            <div class="form-group">
              <label for="buttonText">Button Text:</label>
              <input type="text" id="buttonText" placeholder="e.g., Click Me">
            </div>
            <div class="form-group">
              <label for="buttonBgColor">Button Background Color:</label>
              <input type="color" id="buttonBgColor" value="#007bff">
            </div>
            <div class="form-group">
              <label for="buttonTextColor">Button Text Color:</label>
              <input type="color" id="buttonTextColor" value="#ffffff">
            </div>
            <div class="form-group">
              <label for="buttonPadding">Button Padding (px):</label>
              <input type="number" id="buttonPadding" placeholder="e.g., 10">
            </div>
          `;
      case "card":
        return `
            <div class="form-group">
              <label for="cardImage">Image URL:</label>
              <input type="text" id="cardImage" placeholder="Enter image URL">
            </div>
            <div class="form-group">
              <label for="cardTitle">Card Title:</label>
              <input type="text" id="cardTitle" placeholder="Enter card title">
            </div>
            <div class="form-group">
              <label for="cardDescription">Card Description:</label>
              <textarea id="cardDescription" placeholder="Enter card description"></textarea>
            </div>
            <div class="form-group">
              <label for="cardButtonText">Card Button Text:</label>
              <input type="text" id="cardButtonText" placeholder="e.g., Learn More">
            </div>
          `;
      case "form":
        return `
            <div class="form-group">
              <label for="formNameLabel">Name Label:</label>
              <input type="text" id="formNameLabel" placeholder="e.g., Name">
            </div>
            <div class="form-group">
              <label for="formEmailLabel">Email Label:</label>
              <input type="text" id="formEmailLabel" placeholder="e.g., Email">
            </div>
            <div class="form-group">
              <label for="formBgColor">Background Color:</label>
              <input type="color" id="formBgColor" value="#f9f9f9">
            </div>
            <div class="form-group">
              <label for="formPadding">Padding (px):</label>
              <input type="number" id="formPadding" placeholder="e.g., 20">
            </div>
          `;
      case "footer":
        return `
            <div class="form-group">
              <label for="footerText">Footer Text:</label>
              <input type="text" id="footerText" placeholder="e.g., © 2023 My Website">
            </div>
            <div class="form-group">
              <label for="socialLinks">Social Links (comma-separated):</label>
              <input type="text" id="socialLinks" placeholder="e.g., Twitter, Facebook, Instagram">
            </div>
            <div class="form-group">
              <label for="footerBgColor">Background Color:</label>
              <input type="color" id="footerBgColor" value="#333">
            </div>
            <div class="form-group">
              <label for="footerTextColor">Text Color:</label>
              <input type="color" id="footerTextColor" value="#fff">
            </div>
          `;
      default:
        return "";
    }
  }

  // Generate Element Based on User Input
  function generateElement() {
    const output = document.getElementById("elementOutput");
    output.innerHTML = ""; // Clear previous output

    switch (currentElement) {
      case "header":
        generateHeader();
        break;
      case "navbar":
        generateNavbar();
        break;
      case "button":
        generateButton();
        break;
      case "card":
        generateCard();
        break;
      case "form":
        generateForm();
        break;
      case "footer":
        generateFooter();
        break;
    }

    // Generate HTML and CSS Code
    generateCode();
  }

  // Generate Header
  function generateHeader() {
    const headerText = document.getElementById("headerText").value;
    const fontSize = document.getElementById("fontSize").value + "px";
    const textColor = document.getElementById("textColor").value;
    const backgroundColor = document.getElementById("backgroundColor").value;
    const alignment = document.getElementById("headerAlignment").value;
    const padding = document.getElementById("headerPadding").value + "px";
    const margin = document.getElementById("headerMargin").value + "px";

    const headerClass = "generated-header";

    // Inject Dynamic CSS
    const dynamicStyles = `
        .${headerClass} {
          font-size: ${fontSize};
          color: ${textColor};
          background-color: ${backgroundColor};
          padding: ${padding};
          margin: ${margin};
          text-align: ${alignment};
          border-radius: 4px;
        }
      `;
    document.getElementById("dynamicStyles").textContent = dynamicStyles;

    // Create Header Element
    const header = document.createElement("h1");
    header.textContent = headerText;
    header.classList.add(headerClass);

    // Display Header
    const output = document.getElementById("elementOutput");
    output.appendChild(header);

    // Generate HTML and CSS Code
    const htmlCode = `
  <h1 class="${headerClass}">
    ${headerText}
  </h1>
      `;

    const cssCode = dynamicStyles;

    document.getElementById("htmlCode").textContent = htmlCode;
    document.getElementById("cssCode").textContent = cssCode;
  }

  // Generate Navbar
  function generateNavbar() {
    const navbarItems = document
      .getElementById("navbarItems")
      .value.split(",")
      .map((item) => item.trim());
    const alignment = document.getElementById("navbarAlignment").value;
    const bgColor = document.getElementById("navbarBgColor").value;
    const textColor = document.getElementById("navbarTextColor").value;

    const navbarClass = "generated-navbar";
    const navLinkClass = "generated-nav-link";

    // Inject Dynamic CSS
    const dynamicStyles = `
        .${navbarClass} {
          display: flex;
          gap: 10px;
          background-color: ${bgColor};
          padding: 10px;
          border-radius: 4px;
          justify-content: ${alignment};
        }
  
        .${navLinkClass} {
          color: ${textColor};
          text-decoration: none;
          padding: 5px 10px;
        }
  
        .${navLinkClass}:hover {
          background-color: #555;
        }
      `;
    document.getElementById("dynamicStyles").textContent = dynamicStyles;

    // Create Navbar Element
    const navbar = document.createElement("nav");
    navbar.classList.add(navbarClass);

    navbarItems.forEach((item) => {
      const link = document.createElement("a");
      link.textContent = item;
      link.classList.add(navLinkClass);
      link.href = "#";
      navbar.appendChild(link);
    });

    // Display Navbar
    const output = document.getElementById("elementOutput");
    output.appendChild(navbar);

    // Generate HTML and CSS Code
    const htmlCode = `
  <nav class="${navbarClass}">
    ${navbarItems
      .map((item) => `<a href="#" class="${navLinkClass}">${item}</a>`)
      .join("\n  ")}
  </nav>
      `;

    const cssCode = dynamicStyles;

    document.getElementById("htmlCode").textContent = htmlCode;
    document.getElementById("cssCode").textContent = cssCode;
  }

  // Generate Button
  function generateButton() {
    const buttonText = document.getElementById("buttonText").value;
    const buttonBgColor = document.getElementById("buttonBgColor").value;
    const buttonTextColor = document.getElementById("buttonTextColor").value;
    const buttonPadding = document.getElementById("buttonPadding").value + "px";

    const buttonClass = "generated-button";

    // Inject Dynamic CSS
    const dynamicStyles = `
        .${buttonClass} {
          background-color: ${buttonBgColor};
          color: ${buttonTextColor};
          padding: ${buttonPadding};
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
  
        .${buttonClass}:hover {
          opacity: 0.9;
        }
  
        .${buttonClass}:active {
          transform: scale(0.98);
        }
      `;
    document.getElementById("dynamicStyles").textContent = dynamicStyles;

    // Create Button Element
    const button = document.createElement("button");
    button.textContent = buttonText;
    button.classList.add(buttonClass);

    // Display Button
    const output = document.getElementById("elementOutput");
    output.appendChild(button);

    // Generate HTML and CSS Code
    const htmlCode = `
  <button class="${buttonClass}">
    ${buttonText}
  </button>
      `;

    const cssCode = dynamicStyles;

    document.getElementById("htmlCode").textContent = htmlCode;
    document.getElementById("cssCode").textContent = cssCode;
  }

  // Generate Form
  function generateForm() {
    const nameLabel = document.getElementById("formNameLabel").value;
    const emailLabel = document.getElementById("formEmailLabel").value;
    const bgColor = document.getElementById("formBgColor").value;
    const padding = document.getElementById("formPadding").value + "px";

    const formClass = "generated-form";

    // Inject Dynamic CSS
    const dynamicStyles = `
        .${formClass} {
          display: flex;
          flex-direction: column;
          gap: 15px;
          max-width: 400px;
          padding: ${padding};
          background-color: ${bgColor};
          border: 1px solid #ddd;
          border-radius: 8px;
        }
  
        .${formClass} label {
          font-weight: bold;
          margin-bottom: 5px;
        }
  
        .${formClass} input {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 14px;
        }
  
        .${formClass} button {
          padding: 10px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
  
        .${formClass} button:hover {
          background-color: #0056b3;
        }
      `;
    document.getElementById("dynamicStyles").textContent = dynamicStyles;

    // Create Form Element
    const form = document.createElement("form");
    form.classList.add(formClass);

    const nameLabelElement = document.createElement("label");
    nameLabelElement.textContent = nameLabel;
    form.appendChild(nameLabelElement);

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.placeholder = nameLabel;
    form.appendChild(nameInput);

    const emailLabelElement = document.createElement("label");
    emailLabelElement.textContent = emailLabel;
    form.appendChild(emailLabelElement);

    const emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.placeholder = emailLabel;
    form.appendChild(emailInput);

    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    form.appendChild(submitButton);

    // Display Form
    const output = document.getElementById("elementOutput");
    output.appendChild(form);

    // Generate HTML and CSS Code
    const htmlCode = `
  <form class="${formClass}">
    <label>${nameLabel}</label>
    <input type="text" placeholder="${nameLabel}">
    <label>${emailLabel}</label>
    <input type="email" placeholder="${emailLabel}">
    <button>Submit</button>
  </form>
      `;

    const cssCode = dynamicStyles;

    document.getElementById("htmlCode").textContent = htmlCode;
    document.getElementById("cssCode").textContent = cssCode;
  }

  // Generate Footer
  function generateFooter() {
    const footerText = document.getElementById("footerText").value;
    const socialLinks = document
      .getElementById("socialLinks")
      .value.split(",")
      .map((item) => item.trim());
    const bgColor = document.getElementById("footerBgColor").value;
    const textColor = document.getElementById("footerTextColor").value;

    const footerClass = "generated-footer";
    const socialLinkClass = "generated-social-link";

    // Inject Dynamic CSS
    const dynamicStyles = `
        .${footerClass} {
          background-color: ${bgColor};
          color: ${textColor};
          padding: 20px;
          text-align: center;
        }
  
        .${socialLinkClass} {
          color: ${textColor};
          text-decoration: none;
          margin: 0 10px;
        }
  
        .${socialLinkClass}:hover {
          text-decoration: underline;
        }
      `;
    document.getElementById("dynamicStyles").textContent = dynamicStyles;

    // Create Footer Element
    const footer = document.createElement("footer");
    footer.classList.add(footerClass);

    const footerTextElement = document.createElement("div");
    footerTextElement.textContent = footerText;
    footer.appendChild(footerTextElement);

    const socialLinksContainer = document.createElement("div");
    socialLinks.forEach((link) => {
      const socialLink = document.createElement("a");
      socialLink.textContent = link;
      socialLink.classList.add(socialLinkClass);
      socialLink.href = "#";
      socialLinksContainer.appendChild(socialLink);
    });
    footer.appendChild(socialLinksContainer);

    // Display Footer
    const output = document.getElementById("elementOutput");
    output.appendChild(footer);

    // Generate HTML and CSS Code
    const htmlCode = `
  <footer class="${footerClass}">
    <div>${footerText}</div>
    <div>
      ${socialLinks
        .map((link) => `<a href="#" class="${socialLinkClass}">${link}</a>`)
        .join("\n    ")}
    </div>
  </footer>
      `;

    const cssCode = dynamicStyles;

    document.getElementById("htmlCode").textContent = htmlCode;
    document.getElementById("cssCode").textContent = cssCode;
  }

  // Generate HTML and CSS Code
  function generateCode() {
    // This function is already implemented in each element's generation function.
    // No additional logic is needed here.
  }
});
