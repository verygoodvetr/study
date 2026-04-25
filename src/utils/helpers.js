export function uuid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function formatDate(dateString) {
  if (!dateString) return 'No date';
  return new Date(dateString).toLocaleDateString();
}

export function clamp(number, min, max) {
  return Math.min(max, Math.max(min, number));
}
