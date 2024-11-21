let display = document.getElementById("display");
let currentInput = "";

// Tambahkan angka atau operator ke layar
function appendNumber(number) {
  if (currentInput === "0" && number !== ".") {
    currentInput = number;
  } else {
    currentInput += number;
  }
  display.innerText = currentInput;
}

function appendOperator(operator) {
  if (currentInput === "" || /[+\-*/%]$/.test(currentInput)) return;
  currentInput += operator;
  display.innerText = currentInput;
}

function clearDisplay() {
  currentInput = "";
  display.innerText = "0";
}

function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  display.innerText = currentInput || "0";
}

function calculate() {
  try {
    currentInput = eval(currentInput).toString();
    display.innerText = currentInput;
  } catch (e) {
    display.innerText = "Error";
    currentInput = "";
  }
}

// Fungsi untuk menambahkan efek animasi ke tombol
function addKeyAnimation(key) {
  const button = document.querySelector(`button[data-key="${key}"]`);
  if (button) {
    button.classList.add("active");
    setTimeout(() => button.classList.remove("active"), 100);
  }
}

// Event listener untuk keyboard
document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (!isNaN(key)) {
    appendNumber(key);
    addKeyAnimation(key);
  } else if (key === "+" || key === "-" || key === "*" || key === "/" || key === "%") {
    appendOperator(key);
    addKeyAnimation(key);
  } else if (key === "Enter" || key === "=") {
    calculate();
    addKeyAnimation("=");
  } else if (key === "Backspace") {
    deleteLast();
    addKeyAnimation("DEL");
  } else if (key === "Escape") {
    clearDisplay();
    addKeyAnimation("C");
  } else if (key === ".") {
    appendNumber(".");
    addKeyAnimation(".");
  }
});
