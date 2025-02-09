import { parseISO, format } from 'date-fns';

export function convertDate(isoDateString: string): string {
  const date = parseISO(isoDateString);
  return format(date, 'MMM dd yyyy');
}