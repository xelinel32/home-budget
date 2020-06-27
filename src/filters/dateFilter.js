export default function dateFilter(value) {
  return new Intl.DateTimeFormat('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value));
}
