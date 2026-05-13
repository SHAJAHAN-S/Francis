import { format, parseISO, isAfter, isBefore } from 'date-fns';

export function formatDate(dateString: string, fmt = 'MMM dd, yyyy'): string {
  try {
    return format(parseISO(dateString), fmt);
  } catch {
    return dateString;
  }
}

export function isFutureDate(dateString: string): boolean {
  try {
    return isAfter(parseISO(dateString), new Date());
  } catch {
    return false;
  }
}

export function isPastDate(dateString: string): boolean {
  try {
    return isBefore(parseISO(dateString), new Date());
  } catch {
    return false;
  }
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    Academic: 'bg-blue-100 text-blue-800',
    Event: 'bg-purple-100 text-purple-800',
    Holiday: 'bg-green-100 text-green-800',
    Admission: 'bg-orange-100 text-orange-800',
    General: 'bg-gray-100 text-gray-800',
    Achievement: 'bg-yellow-100 text-yellow-800',
    Sports: 'bg-red-100 text-red-800',
    Cultural: 'bg-pink-100 text-pink-800',
  };
  return colors[category] || 'bg-gray-100 text-gray-800';
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

export function generateICSFile(title: string, date: string, time: string, venue: string, description: string): string {
  const dt = parseISO(date);
  const dateStr = format(dt, 'yyyyMMdd');
  return `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${dateStr}T090000
SUMMARY:${title}
LOCATION:${venue}
DESCRIPTION:${description}\\nTime: ${time}
END:VEVENT
END:VCALENDAR`;
}

export function downloadICS(title: string, date: string, time: string, venue: string, description: string) {
  const ics = generateICSFile(title, date, time, venue, description);
  const blob = new Blob([ics], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title.replace(/\s+/g, '_')}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}
