export const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(
    value,
  );

export const formatDistance = (distance) => `${distance.toFixed(1)} km away`;

export const formatPercent = (value) => `${Math.round(value)}%`;
