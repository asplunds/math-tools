export default function parseNumber(val: string | number) {
  const parsed =
    typeof val === "number" ? (!isFinite(val) ? 0 : val) : parseFloat(val);
  return isNaN(parsed) ? 0 : parsed;
}
