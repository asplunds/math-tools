export default function clamp(start: number, current: number, end: number) {
  return Math.max(start, Math.min(current, end));
}
