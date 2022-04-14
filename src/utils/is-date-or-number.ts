export default function isDateOrNumber(value: any) {
  return value instanceof Date || typeof value === "number";
}
