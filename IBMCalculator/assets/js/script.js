function calculateBMI(weight, height) {
  let bmi = weight / ((height / 100) ** 2);
  return bmi.toFixed(1);
}

function updateBMIDisplay(bmi) {
  const bmiValue = parseFloat(bmi);
  const ellipse = document.querySelector('.line-indicator');
  const filledLine = document.querySelector('.line-filled');

  // Updates positions to reflect a realistic BMI distribution
  const ranges = [
    { min: 0, max: 16.9, position: 5 },   // Severe underweight
    { min: 17, max: 18.4, position: 15 },  // Underweight do peso
    { min: 18.5, max: 24.9, position: 40 },// Normal weight
    { min: 25, max: 29.9, position: 60 },  // Overweight
    { min: 30, max: 34.9, position: 75 },  // Obesity I
    { min: 35, max: 39.9, position: 85 },  // Obesity II
    { min: 40, max: 50, position: 95 },    // Obesity III
  ];

  let ellipseColor = 'var(--color-background)';
  let lineFilledWidth = 0;

  // Checks that the value is extreme and adjusts the position of the ellipse
  if (bmiValue < 0) {
    ellipse.style.left = '0%';
    lineFilledWidth = 0;
  } else if (bmiValue > 50) {
    ellipse.style.left = 'calc(100% - 20px)';
    lineFilledWidth = 100;
  } else {
    for (let range of ranges) {
      if (bmiValue >= range.min && bmiValue <= range.max) {
        const positionPercent = range.position;
        ellipse.style.left = `calc(${positionPercent}% - 20px)`;
        lineFilledWidth = positionPercent;
        ellipseColor = 'var(--color-dark)';
        break;
      }
    }
  }

  // Updates the color of the ellipse in the progress line
  ellipse.style.backgroundColor = ellipseColor;
  ellipse.textContent = bmiValue;
  filledLine.style.width = `${lineFilledWidth}%`;

  // Resets the colors of the ellipses in the categories
  const categoryEllipses = document.querySelectorAll('.categories .ellipse');
  categoryEllipses.forEach(el => el.style.backgroundColor = 'var(--color-background)');

  // Updates the color of the ellipse in the corresponding category
  const categories = [
    { min: 0, max: 18.4, className: 'underweight' },
    { min: 18.5, max: 24.9, className: 'normal-weight' },
    { min: 25, max: 29.9, className: 'overweight' },
    { min: 30, max: 34.9, className: 'obesity-i' },
    { min: 35, max: 39.9, className: 'obesity-ii' },
    { min: 40, max: 50, className: 'obesity-iii' }
  ];

  for (let category of categories) {
    if (bmiValue >= category.min && bmiValue <= category.max) {
      const targetEllipse = document.querySelector(`.categories .ellipse.${category.className}`);
      if (targetEllipse) {
        targetEllipse.style.backgroundColor = 'var(--color-primary)';
      }
      break;
    }
  }
}

document.querySelector('button').addEventListener('click', function() {
  const weightInput = document.querySelector('.weight input');
  const heightInput = document.querySelector('.height input');
  const weight = parseFloat(weightInput.value);
  const height = parseFloat(heightInput.value);

  // Removes previous error classes and error messages
  weightInput.classList.remove('input-error');
  heightInput.classList.remove('input-error');
  weightInput.value = weightInput.value.replace('Invalid', '').trim();
  heightInput.value = heightInput.value.replace('Invalid', '').trim();

  let valid = true;

  // Checks that the weight is within the permitted range
  if (weight < 10 || weight > 300 || isNaN(weight)) {
    weightInput.classList.add('input-error');
    weightInput.value = 'Invalid weight';
    valid = false;
  }

  // Checks that the weight is within the permitted range
  if (height < 10 || height > 250 || isNaN(height)) {
    heightInput.classList.add('input-error');
    heightInput.value = 'Invalid height';
    valid = false;
  }

  // Only calculates BMI if the values are valid
  if (valid) {
    const bmi = calculateBMI(weight, height);
    updateBMIDisplay(bmi);
  }
});