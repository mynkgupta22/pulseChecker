export const chartColors = {
  // Primary colors
  blue: "#3B82F6", // Bright blue
  indigo: "#6366F1", // Vibrant indigo
  purple: "#8B5CF6", // Rich purple
  pink: "#EC4899", // Hot pink
  red: "#EF4444", // Bright red
  orange: "#F97316", // Vibrant orange
  yellow: "#F59E0B", // Golden yellow
  green: "#10B981", // Emerald green
  teal: "#14B8A6", // Bright teal
  cyan: "#06B6D4", // Electric cyan

  // Extended palette for more data points
  magenta: "#D946EF", // Electric magenta
  lime: "#84CC16", // Bright lime
  amber: "#F59E0B", // Warm amber
  rose: "#F43F5E", // Bright rose
  violet: "#7C3AED", // Deep violet
  sky: "#0EA5E9", // Sky blue
  emerald: "#10B981", // Emerald green
  fuchsia: "#D946EF", // Fuchsia
  lightBlue: "#0EA5E9", // Light blue
  warmGray: "#78716C", // Warm gray
};

export const getChartColors = (count) => {
  const colors = Object.values(chartColors);
  return Array.from({ length: count }, (_, i) => colors[i % colors.length]);
};

export const getGradientColors = (baseColor, steps = 5) => {
  const colors = [];
  for (let i = 0; i < steps; i++) {
    const opacity = 0.2 + (i * 0.8) / (steps - 1);
    colors.push(
      `${baseColor}${Math.round(opacity * 255)
        .toString(16)
        .padStart(2, "0")}`
    );
  }
  return colors;
};
