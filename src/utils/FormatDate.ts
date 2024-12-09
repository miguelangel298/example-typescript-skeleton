export default function formatDate(date:Date) {
  const monthNames = [
    'Enero', 'Febrero', 'Marzo',
    'Abril', 'Mayo', 'Junio', 'Julio',
    'Agosto', 'Septiembre', 'Octubre',
    'Noviembre', 'Diciembre',
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${day} ${monthNames[monthIndex]} ${year}`;
}
export function formatHour(date:Date) {
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();

  return `${h}:${m}:${s}`;
}
