function parseTimeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return (hours ?? 0) * 60 + (minutes ?? 0);
}

export function formatScheduleTime(time: string): string {
  return time.slice(0, 5);
}

export function calculateScheduleDuration(startTime: string, endTime: string): string {
  const totalMinutes = parseTimeToMinutes(endTime) - parseTimeToMinutes(startTime);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) {
    return `${minutes} min`;
  }

  if (minutes === 0) {
    return `${hours} h`;
  }

  return `${hours} h ${minutes} min`;
}
