import dayjs from "dayjs";

export function getGreeting(): string {
  const hour = dayjs().hour();

  if (hour < 12) {
    return "Buenos días";
  }

  if (hour < 20) {
    return "Buenas tardes";
  }

  return "Buenas noches";
}
