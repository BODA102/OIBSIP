# Degree — Temperature Converter

A responsive browser-based converter for Celsius, Fahrenheit, and Kelvin.

## Open locally

Open `index.html` in a modern browser. The project uses vanilla JavaScript and has no build or install steps.

## Features

- Numeric input and starting-unit selector
- Converts to all three temperature scales
- Rejects empty or invalid numeric values with an accessible error message
- Rejects values below absolute zero
- Rounds displayed results to at most two decimal places
- Responsive layout and clear labels

## Conversion approach

The input is first converted to Kelvin. Celsius is `K − 273.15`; Fahrenheit is `C × 9/5 + 32`. Any value below `0 K` is rejected as physically impossible.

## Demo checklist

Show conversions from each starting scale, a decimal input, and the below-absolute-zero error. Start with a two-second title card: Abdulrahman Elsaid Mohammed · Web Development and Designing · Temperature Converter.

## Screenshots

- Desktop: [screenshots/desktop.png](screenshots/desktop.png)
- Mobile: [screenshots/mobile.png](screenshots/mobile.png)
- Conversion result: [screenshots/conversion-result.png](screenshots/conversion-result.png)
