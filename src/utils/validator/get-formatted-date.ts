export const getFormattedDate = (newDate: string): string => {
  const day = new Date(newDate).getDate().toString();
  const month = (new Date(newDate).getMonth() + 1).toString();
  const year = new Date(newDate).getFullYear().toString();
  return day + '/' + month + '/' + year;
};
