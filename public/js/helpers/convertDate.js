export default function convertUtc(date, withTime) {
  const tanggal = new Date(date);
  const year = tanggal.getFullYear();
  const month = tanggal.getMonth() + 1;
  const dt = tanggal.getDate();

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Mei',
    'Jun',
    'Jul',
    'Agu',
    'Sep',
    'Okt',
    'Nop',
    'Des',
  ];

  if (withTime) {
    const dateTime = new Date(
      year +
        '-' +
        month +
        '-' +
        dt +
        ' ' +
        tanggal.getHours() +
        ':' +
        tanggal.getMinutes() +
        ':' +
        tanggal.getSeconds(),
    );
    return (
      monthNames[dateTime.getMonth()] +
      ' ' +
      dateTime.getDate() +
      ' ' +
      dateTime.getFullYear() +
      ' | ' +
      dateTime.getHours() +
      ':' +
      dateTime.getMinutes()
    );
  } else {
    return monthNames[month] + ' ' + dt + ' ' + year;
  }
}
