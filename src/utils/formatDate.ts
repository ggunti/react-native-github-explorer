export function formatDate(date: string) {
  if (!date) return '';
  const dateObj = new Date(date);
  return `${dateObj.toLocaleDateString()} ${dateObj.toLocaleTimeString()}`;
}
