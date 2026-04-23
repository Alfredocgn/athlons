import { WorkoutType } from "@/core/types/workout";
import { useMemo, useState } from "react";

export interface DayWorkout {
  id: string;
  type: WorkoutType;
  title: string;
  duration?: number;
  distance?: number;
  completed: boolean;
  scheduledTime?: string;
}

export interface CalendarDay {
  date: Date;
  dayName: string;
  dayNumber: number;
  isToday: boolean;
  isSelected: boolean;
  workout?: DayWorkout;
  hasWorkout: boolean;
}

export interface WeeklyCalendarData {
  days: CalendarDay[];
  selectedDay: CalendarDay | null;
  currentWeekStart: Date;
}

// Mock data para demostración - En producción esto vendría de tu backend
const mockWeeklyWorkouts: Record<string, DayWorkout> = {
  monday: {
    id: "1",
    type: WorkoutType.RUN,
    title: "Easy Run",
    duration: 30,
    distance: 5,
    completed: false,
    scheduledTime: "07:00",
  },
  tuesday: {
    id: "2",
    type: WorkoutType.RECOVERY,
    title: "Recovery Walk",
    duration: 20,
    completed: false,
    scheduledTime: "18:00",
  },
  wednesday: {
    id: "3",
    type: WorkoutType.INTERVAL,
    title: "Speed Intervals",
    duration: 45,
    distance: 8,
    completed: true,
    scheduledTime: "07:30",
  },
  thursday: {
    id: "4",
    type: WorkoutType.RECOVERY,
    title: "Rest Day",
    completed: false,
    scheduledTime: "00:00",
  },
  friday: {
    id: "5",
    type: WorkoutType.TEMPO,
    title: "Tempo Run",
    duration: 40,
    distance: 10,
    completed: false,
    scheduledTime: "07:00",
  },
  saturday: {
    id: "6",
    type: WorkoutType.LONG_RUN,
    title: "Long Run",
    duration: 90,
    distance: 15,
    completed: false,
    scheduledTime: "08:00",
  },
  sunday: {
    id: "7",
    type: WorkoutType.RECOVERY,
    title: "Easy Recovery",
    duration: 25,
    distance: 3,
    completed: false,
    scheduledTime: "09:00",
  },
};

export const useWeeklyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek + 1); // Lunes
    startOfWeek.setHours(0, 0, 0, 0);
    return startOfWeek;
  });

  const getDayName = (date: Date): string => {
    return date.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();
  };

  const getWeekDays = (weekStart: Date): CalendarDay[] => {
    const days: CalendarDay[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);

      const dayName = getDayName(date);
      const workout = mockWeeklyWorkouts[dayName];

      const calendarDay: CalendarDay = {
        date,
        dayName: dayName.charAt(0).toUpperCase() + dayName.slice(1),
        dayNumber: date.getDate(),
        isToday: date.getTime() === today.getTime(),
        isSelected: selectedDate.getTime() === date.getTime(),
        workout,
        hasWorkout: !!workout,
      };

      days.push(calendarDay);
    }

    return days;
  };

  const weeklyData: WeeklyCalendarData = useMemo(() => {
    const days = getWeekDays(currentWeekStart);
    const selectedDay = days.find((day) => day.isSelected) || null;

    return {
      days,
      selectedDay,
      currentWeekStart,
    };
  }, [currentWeekStart, selectedDate]);

  const selectDay = (date: Date) => {
    setSelectedDate(date);
  };

  const goToPreviousWeek = () => {
    const newWeekStart = new Date(currentWeekStart);
    newWeekStart.setDate(currentWeekStart.getDate() - 7);
    setCurrentWeekStart(newWeekStart);
  };

  const goToNextWeek = () => {
    const newWeekStart = new Date(currentWeekStart);
    newWeekStart.setDate(currentWeekStart.getDate() + 7);
    setCurrentWeekStart(newWeekStart);
  };

  const goToCurrentWeek = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek + 1);
    startOfWeek.setHours(0, 0, 0, 0);
    setCurrentWeekStart(startOfWeek);
    setSelectedDate(new Date());
  };

  const getWorkoutForDate = (date: Date): DayWorkout | null => {
    const dayName = getDayName(date);
    return mockWeeklyWorkouts[dayName] || null;
  };

  const markWorkoutCompleted = (workoutId: string) => {
    // En producción, aquí harías la llamada a la API
    console.log(`Marking workout ${workoutId} as completed`);
  };

  return {
    weeklyData,
    selectDay,
    goToPreviousWeek,
    goToNextWeek,
    goToCurrentWeek,
    getWorkoutForDate,
    markWorkoutCompleted,
  };
};
