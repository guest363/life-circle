export default function getHexCorner(size: number, direction: number) {
  const angleDeg = 51.5 * direction - 30;
  const angleRad = (Math.PI / 180) * angleDeg;
  return `${size * Math.cos(angleRad)},${size * Math.sin(angleRad)}`;
}
