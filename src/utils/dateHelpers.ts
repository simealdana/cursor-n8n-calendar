// Helper to extract start and end time from time string (e.g., "13:00 – 14:00")
export const extractTimeFromString = (timeString: string) => {
  const timeMatch = timeString.match(/(\d{2}):(\d{2}) – (\d{2}):(\d{2})/);
  if (!timeMatch) {
    console.log("Invalid time string format:", timeString);
    return null;
  }

  return {
    startHour: parseInt(timeMatch[1]),
    startMinute: parseInt(timeMatch[2]),
    endHour: parseInt(timeMatch[3]),
    endMinute: parseInt(timeMatch[4]),
  };
};

// Helper to add time to a date and return ISO string in America/New_York timezone
export const addTimeToDate = (
  dateString: string,
  hour: number,
  minute: number
) => {
  const [year, month, day] = dateString.slice(0, 10).split("-");

  // Create date string with the specified time
  const dateStringWithTime = `${year}-${month}-${day}T${String(hour).padStart(
    2,
    "0"
  )}:${String(minute).padStart(2, "0")}:00`;

  // Create date and get month for DST calculation
  const date = new Date(dateStringWithTime);
  const monthNum = date.getMonth() + 1; // 1-12

  // Handle America/New_York timezone with known offsets
  const isDST = monthNum >= 3 && monthNum <= 11;
  const offsetHours = isDST ? 4 : 5;
  const offsetString = `-0${offsetHours}:00`;

  return `${year}-${month}-${day}T${String(hour).padStart(2, "0")}:${String(
    minute
  ).padStart(2, "0")}:00.000${offsetString}`;
};

// Converts a selectedDate string (e.g., 'Tue, Jul 8') to ISO format in America/New_York timezone
export const getSelectedDateForAPI = (
  selectedDate: string,
  year?: number
): string => {
  const dateParts = selectedDate.split(" ");
  const month = dateParts[1];
  const day = dateParts[2];
  const resolvedYear = year || new Date().getFullYear();

  const monthMap: { [key: string]: string } = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };

  const monthNumber = monthMap[month];
  const dayStr = String(parseInt(day)).padStart(2, "0");
  const yearStr = String(resolvedYear);

  // Create date string for the selected date
  const dateString = `${yearStr}-${monthNumber}-${dayStr}`;

  // Create date at 00:00
  const startDate = new Date(`${dateString}T00:00:00`);
  const monthNum = startDate.getMonth() + 1; // 1-12

  // Handle America/New_York timezone with known offsets
  const isDST = monthNum >= 3 && monthNum <= 11;
  const offsetHours = isDST ? 4 : 5;
  const offsetString = `-0${offsetHours}:00`;

  return `${dateString}T00:00:00.000${offsetString}`;
};

// Converts a selectedDate string to 00:00 hours in specified timezone
export const getSelectedDateForAPIAtMidnight = (
  selectedDate: string,
  timezone?: string,
  year?: number
): string => {
  const dateParts = selectedDate.split(" ");
  const month = dateParts[1];
  const day = dateParts[2];
  const resolvedYear = year || new Date().getFullYear();

  const monthMap: { [key: string]: string } = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };

  const monthNumber = monthMap[month];
  const dayStr = String(parseInt(day)).padStart(2, "0");
  const yearStr = String(resolvedYear);

  // Create date string for the selected date
  const dateString = `${yearStr}-${monthNumber}-${dayStr}`;

  // Create date at 00:00
  const startDate = new Date(`${dateString}T00:00:00`);

  // If no timezone specified, return local midnight
  if (!timezone) {
    return `${dateString}T00:00:00.000Z`;
  }

  // For specific timezone, use a simpler approach
  const monthNum = startDate.getMonth() + 1; // 1-12

  // Handle common timezones with known offsets
  if (timezone === "America/New_York") {
    const isDST = monthNum >= 3 && monthNum <= 11;
    const offsetHours = isDST ? 4 : 5;
    const offsetString = `-0${offsetHours}:00`;
    return `${dateString}T00:00:00.000${offsetString}`;
  }

  // For other timezones, return UTC for now
  return `${dateString}T00:00:00.000Z`;
};

export const createTimeSlotString = (
  startDate: string,
  endDate: string
): string => {
  // Extract time directly from ISO string to avoid timezone conversion
  const startHour = startDate.slice(11, 13);
  const startMinute = startDate.slice(14, 16);
  const endHour = endDate.slice(11, 13);
  const endMinute = endDate.slice(14, 16);

  return `${startHour}:${startMinute} – ${endHour}:${endMinute}`;
};

export const getSelectedSlotDates = (
  timeString: string,
  selectedDate: string
) => {
  const timeComponents = extractTimeFromString(timeString);
  if (!timeComponents) {
    return null;
  }
  const baseDate = getSelectedDateForAPI(selectedDate);
  const startDate = addTimeToDate(
    baseDate,
    timeComponents.startHour,
    timeComponents.startMinute
  );
  const endDate = addTimeToDate(
    baseDate,
    timeComponents.endHour,
    timeComponents.endMinute
  );
  return {
    startDate,
    endDate,
  };
};
