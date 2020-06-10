export const setMonthName = value => {
  const date = new Date(null);
  date.setMonth(value);
  const monthName = date.toLocaleString('default', { month: 'long' });
  return monthName;
};
