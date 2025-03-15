const lengthInput = document.getElementById("length");
const lengthValue = document.getElementById("length-value"); // Muestra la longitud seleccionada
const includeUppercase = document.getElementById("uppercase");
const includeNumbers = document.getElementById("numbers");
const includeSymbols = document.getElementById("symbols");
const passwordField = document.getElementById("password");
const generateBtn = document.getElementById("generate-btn");
const copyBtn = document.getElementById("copy-btn");
const strengthIndicator = document.getElementById("strength"); // Indicador de seguridad

const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_-+=<>?/";

// Función para generar la contraseña
function generatePassword() {
  let characters = lowercaseChars;
  if (includeUppercase.checked) characters += uppercaseChars;
  if (includeNumbers.checked) characters += numberChars;
  if (includeSymbols.checked) characters += symbolChars;

  let password = "";
  for (let i = 0; i < lengthInput.value; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  passwordField.value = password;
  updateStrength(password);
}

// Actualizar el valor de la longitud cuando se mueve el slider
lengthInput.addEventListener("input", () => {
  lengthValue.textContent = lengthInput.value;
});

// Evaluar la seguridad de la contraseña
function updateStrength(password) {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++; // Contiene mayúsculas
  if (/[0-9]/.test(password)) strength++; // Contiene números
  if (/[^a-zA-Z0-9]/.test(password)) strength++; // Contiene símbolos

  let strengthText = ["Muy débil", "Débil", "Regular", "Fuerte", "Muy fuerte"];
  let strengthColor = ["red", "orange", "yellow", "green", "darkgreen"];

  strengthIndicator.textContent = `Seguridad: ${strengthText[strength]}`;
  strengthIndicator.style.color = strengthColor[strength];
}

// Copiar la contraseña al portapapeles
copyBtn.addEventListener("click", () => {
  navigator.clipboard
    .writeText(passwordField.value)
    .then(() => {
      alert("¡Contraseña copiada al portapapeles!");
    })
    .catch((err) => {
      console.error("Error al copiar", err);
    });
});

generateBtn.addEventListener("click", generatePassword);
