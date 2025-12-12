const breakPoints = {
  xs: "320px",
  xsm: "639px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
};

export const media = {
  xs: `min-width: ${breakPoints.xs}`,
  xsm: `max-width: ${breakPoints.xsm}`,
  sm: `min-width: ${breakPoints.sm}`,
  md: `min-width: ${breakPoints.md}`,
  lg: `min-width: ${breakPoints.lg}`,
  xl: `min-width: ${breakPoints.xl}`,
};
