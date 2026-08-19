export function getInitials(
  firstName?: string | null,
  lastName?: string | null,
): string {
  const first = firstName?.trim().charAt(0) ?? "";
  const last = lastName?.trim().charAt(0) ?? "";
  return `${first}${last}`.toUpperCase();
}
