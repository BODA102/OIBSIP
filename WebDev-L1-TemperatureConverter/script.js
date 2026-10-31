const form = document.querySelector('#converter-form');
const temperatureInput = document.querySelector('#temperature');
const unitSelect = document.querySelector('#unit');
const errorMessage = document.querySelector('#input-error');
const resultContext = document.querySelector('#result-context');

function toKelvin(value, unit) {
  if (unit === 'C') return value + 273.15;
  if (unit === 'F') return (value - 32) * 5 / 9 + 273.15;
  return value;
}

function format(value) {
  return new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0
  }).format(Object.is(value, -0) ? 0 : value);
}

function showError(message) {
  errorMessage.textContent = message;
  temperatureInput.setAttribute('aria-invalid', 'true');
  resultContext.textContent = 'Correct the value above to see the conversions.';
}

function clearResults() {
  document.querySelector('#result-c').textContent = '—';
  document.querySelector('#result-f').textContent = '—';
  document.querySelector('#result-k').textContent = '—';
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const rawValue = temperatureInput.value.trim();
  const value = Number(rawValue);

  if (rawValue === '' || !Number.isFinite(value)) {
    clearResults();
    showError('Enter a valid numeric temperature to continue.');
    temperatureInput.focus();
    return;
  }

  const kelvin = toKelvin(value, unitSelect.value);
  if (kelvin < 0) {
    clearResults();
    showError('That temperature is below absolute zero (0 K / −273.15°C).');
    temperatureInput.focus();
    return;
  }

  const celsius = kelvin - 273.15;
  const fahrenheit = celsius * 9 / 5 + 32;
  document.querySelector('#result-c').textContent = format(celsius);
  document.querySelector('#result-f').textContent = format(fahrenheit);
  document.querySelector('#result-k').textContent = format(kelvin);
  errorMessage.textContent = '';
  temperatureInput.removeAttribute('aria-invalid');
  resultContext.textContent = `Converted from ${format(value)} ${unitSelect.value === 'K' ? 'K' : `°${unitSelect.value}`}.`;
});

temperatureInput.addEventListener('input', () => {
  if (errorMessage.textContent) {
    errorMessage.textContent = '';
    temperatureInput.removeAttribute('aria-invalid');
  }
});
