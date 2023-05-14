export const DegToRad = 0.01745329251;
export const RadToDeg = 57.2957795131;

export function keplersEquation(e, M) {
  let E = M + e * Math.sin(M) * (1 + e * Math.cos(M));

  if (e < 0.05) {
    return E;
  }

  let E0 = E;
  let E1 = E0 - (E0 - e * Math.sin(E0) - M) / (1 - e * Math.cos(E0));

  const epsilon = 0.001 * DegToRad;

  while (Math.abs(E0 - E1) > epsilon) {
    E0 = E1;
    E1 = E0 - (E0 - e * Math.sin(E0) - M) / (1 - e * Math.cos(E0));
  }

  return E0;
}
