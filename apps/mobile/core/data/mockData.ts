import { DeviceType, WorkoutSession, WorkoutType } from "../types/workout";

export const mockWorkoutSessions: WorkoutSession[] = [
  {
    id: "1",
    title: "Carrera matutina",
    date: new Date("2024-12-15T07:30:00"),
    duration: 1800, // 30 minutos
    distance: 5000, // 5km
    caloriesBurned: 450,
    avgPace: 216, // 3:36/km
    workoutType: WorkoutType.RUNNING,
    importedFrom: DeviceType.MOBILE,
    status: "completed",
    notes: "Excelente ritmo, me sentí muy bien",
  },
  {
    id: "2",
    title: "Entrenamiento largo",
    date: new Date("2024-12-14T16:00:00"),
    duration: 3600, // 1 hora
    distance: 10000, // 10km
    caloriesBurned: 850,
    avgPace: 216, // 3:36/km
    workoutType: WorkoutType.RUNNING,
    importedFrom: DeviceType.MOBILE,
    status: "completed",
    notes: "Distancia personal record",
  },
  {
    id: "3",
    title: "Carrera fácil",
    date: new Date("2024-12-13T18:30:00"),
    duration: 1200, // 20 minutos
    distance: 3000, // 3km
    caloriesBurned: 250,
    avgPace: 240, // 4:00/km
    workoutType: WorkoutType.RUNNING,
    importedFrom: DeviceType.MOBILE,
    status: "completed",
    notes: "Recuperación activa",
  },
  {
    id: "4",
    title: "Intervalos",
    date: new Date("2024-12-12T06:00:00"),
    duration: 2700, // 45 minutos
    distance: 8000, // 8km
    caloriesBurned: 650,
    avgPace: 202, // 3:22/km
    workoutType: WorkoutType.RUNNING,
    importedFrom: DeviceType.MOBILE,
    status: "completed",
    notes: "Entrenamiento de velocidad",
  },
];
