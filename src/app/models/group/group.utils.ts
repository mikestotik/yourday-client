export function isGroupId(value: unknown): boolean {
  return !isNaN(Number(value));
}
