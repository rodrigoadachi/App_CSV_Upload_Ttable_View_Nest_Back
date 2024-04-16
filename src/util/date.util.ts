export const normalizeDate = (date: string): Date | null => {
  if (!date || date?.length !== 8) return null;

  const year = parseInt(date.slice(0, 4));
  const month = parseInt(date.slice(4, 6)) - 1;
  const day = parseInt(date.slice(6));
  return new Date(year, month, day);
};
