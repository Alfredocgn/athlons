export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }

  return `${minutes}:${secs.toString().padStart(2, "0")}`;
};

export const formatDistance = (meters: number): string => {
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  const distance = (meters / 1000).toFixed(2);
  return `${distance} km`;
};

export const formatPace = (secondsPerKm: number): string => {
  const minutes = Math.floor(secondsPerKm / 60);
  const secs = Math.floor(secondsPerKm % 60);
  return `${minutes}:${secs.toString().padStart(2, "0")}/km`;
};

export const formatSpeed = (metersPerSecond: number): string => {
  const toKmHour = (metersPerSecond * 3600) / 1000;
  return `${toKmHour.toFixed(1)} km/h`;
};

export const formatDate = (date: Date): string => {
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};

export const calculateAge = (birthDate: string): string => {
  if (!birthDate) return "";

  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age > 0 ? ` (${age} years old)` : "";
};
