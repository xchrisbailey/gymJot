/**
 * Gets an array of dates for the current week (Sunday to Saturday)
 * @returns {string[]} Array of dates in MM/DD/YYYY format, starting from Sunday of the current week
 * @example
 * // Returns something like ["1/1/2024", "1/2/2024", "1/3/2024", "1/4/2024", "1/5/2024", "1/6/2024", "1/7/2024"]
 * getWeekDates();
 */
export function getWeekDates(): string[] {
  const today = new Date();
  const sunday = new Date(today);
  const diff = today.getDay() - sunday.getDay();
  sunday.setDate(today.getDate() - (diff < 0 ? diff + 7 : diff));

  const weekDates: string[] = [];
  for (let i = 0; i <= 6; i++) {
    const date = new Date(sunday);
    date.setDate(sunday.getDate() + i);
    weekDates.push(`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`);
  }
  return weekDates;
}
