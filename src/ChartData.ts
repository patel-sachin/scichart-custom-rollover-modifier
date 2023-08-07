export const getChartData = () => {
  const xValues = [];
  const yValues = [];
  for (let i = 0; i < 100; i++) {
    xValues.push(i);
    yValues.push(Math.random() * Math.sin(i * 0.1) - Math.cos(i * 0.01));
  }
  return {xValues, yValues};
};
