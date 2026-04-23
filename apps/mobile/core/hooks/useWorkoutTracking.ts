import * as Location from "expo-location";
import {
  Accelerometer,
  Barometer,
  DeviceMotion,
  DeviceMotionMeasurement,
  Gyroscope,
  Magnetometer,
} from "expo-sensors";
import { useEffect, useRef, useState } from "react";

export interface SensorData {
  accelerometer: {
    x: number;
    y: number;
    z: number;
  };
  gyroscope: {
    x: number;
    y: number;
    z: number;
  };
  magnetometer: {
    x: number;
    y: number;
    z: number;
  };
  barometer: {
    pressure: number;
    relativeAltitude?: number;
  };
  deviceMotion?: DeviceMotionMeasurement;
}

export interface TrackingMetrics {
  steps: number;
  cadence: number; // pasos por minuto
  strideLength: number; // metros por paso
  groundContactTime: number; // tiempo de contacto con el suelo
  verticalOscillation: number; // oscilación vertical
  runningPower: number; // potencia de carrera
  efficiency: number; // eficiencia de carrera
}

export interface LocationData {
  latitude: number;
  longitude: number;
  altitude: number;
  accuracy: number;
  speed: number;
  heading: number;
  timestamp: number;
}

export const useWorkoutTracking = () => {
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [trackingMetrics, setTrackingMetrics] = useState<TrackingMetrics>({
    steps: 0,
    cadence: 0,
    strideLength: 0,
    groundContactTime: 0,
    verticalOscillation: 0,
    runningPower: 0,
    efficiency: 0,
  });
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Referencias para cálculos
  const stepCountRef = useRef(0);
  const lastStepTimeRef = useRef<number>(0);
  const stepTimesRef = useRef<number[]>([]);
  const strideLengthsRef = useRef<number[]>([]);
  const verticalOscillationsRef = useRef<number[]>([]);

  // Configurar sensores
  const setupSensors = async () => {
    try {
      // Configurar frecuencia de actualización
      Accelerometer.setUpdateInterval(100); // 10Hz
      Gyroscope.setUpdateInterval(100);
      Magnetometer.setUpdateInterval(100);
      Barometer.setUpdateInterval(100);
      DeviceMotion.setUpdateInterval(100);

      // Verificar disponibilidad
      const accelerometerAvailable = await Accelerometer.isAvailableAsync();
      const gyroscopeAvailable = await Gyroscope.isAvailableAsync();
      const magnetometerAvailable = await Magnetometer.isAvailableAsync();
      const barometerAvailable = await Barometer.isAvailableAsync();
      const deviceMotionAvailable = await DeviceMotion.isAvailableAsync();

      if (!accelerometerAvailable) {
        throw new Error("Accelerometer not available");
      }

      return {
        accelerometer: accelerometerAvailable,
        gyroscope: gyroscopeAvailable,
        magnetometer: magnetometerAvailable,
        barometer: barometerAvailable,
        deviceMotion: deviceMotionAvailable,
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to setup sensors");
      return null;
    }
  };

  // Detectar pasos usando acelerómetro
  const detectSteps = (acceleration: { x: number; y: number; z: number }) => {
    const magnitude = Math.sqrt(
      acceleration.x * acceleration.x +
        acceleration.y * acceleration.y +
        acceleration.z * acceleration.z
    );

    // Filtro simple para detectar picos de aceleración
    const threshold = 1.2; // Ajustar según el dispositivo
    const now = Date.now();

    if (magnitude > threshold && now - lastStepTimeRef.current > 300) {
      stepCountRef.current++;
      lastStepTimeRef.current = now;

      // Calcular cadencia (pasos por minuto)
      stepTimesRef.current.push(now);
      if (stepTimesRef.current.length > 10) {
        stepTimesRef.current.shift();
      }

      const recentSteps = stepTimesRef.current;
      if (recentSteps.length >= 2) {
        const timeDiff =
          (recentSteps[recentSteps.length - 1] - recentSteps[0]) / 1000;
        const cadence = ((recentSteps.length - 1) * 60) / timeDiff;

        setTrackingMetrics((prev) => ({
          ...prev,
          steps: stepCountRef.current,
          cadence: Math.round(cadence),
        }));
      }
    }
  };

  // Calcular longitud de zancada
  const calculateStrideLength = (speed: number, cadence: number) => {
    if (cadence === 0) return 0;

    // Fórmula básica: velocidad / (cadencia / 60) / 2
    const strideLength = speed / (cadence / 60) / 2;
    strideLengthsRef.current.push(strideLength);

    if (strideLengthsRef.current.length > 20) {
      strideLengthsRef.current.shift();
    }

    const avgStrideLength =
      strideLengthsRef.current.reduce((a, b) => a + b, 0) /
      strideLengthsRef.current.length;

    setTrackingMetrics((prev) => ({
      ...prev,
      strideLength: Math.round(avgStrideLength * 100) / 100,
    }));
  };

  // Calcular oscilación vertical usando DeviceMotion
  const calculateVerticalOscillation = (
    deviceMotion: DeviceMotionMeasurement | null
  ) => {
    if (!deviceMotion?.accelerationIncludingGravity) return;

    const { accelerationIncludingGravity } = deviceMotion;
    // Calcular la magnitud de la aceleración incluyendo gravedad
    const verticalAcceleration = Math.abs(accelerationIncludingGravity.z);

    verticalOscillationsRef.current.push(verticalAcceleration);

    if (verticalOscillationsRef.current.length > 50) {
      verticalOscillationsRef.current.shift();
    }

    const avgVerticalOscillation =
      verticalOscillationsRef.current.reduce((a, b) => a + b, 0) /
      verticalOscillationsRef.current.length;

    setTrackingMetrics((prev) => ({
      ...prev,
      verticalOscillation: Math.round(avgVerticalOscillation * 100) / 100,
    }));
  };

  // Calcular tiempo de contacto con el suelo
  const calculateGroundContactTime = (acceleration: {
    x: number;
    y: number;
    z: number;
  }) => {
    // Implementación simplificada
    // En una implementación real, esto requeriría análisis más complejo
    const magnitude = Math.sqrt(
      acceleration.x * acceleration.x +
        acceleration.y * acceleration.y +
        acceleration.z * acceleration.z
    );

    // Estimación basada en la magnitud de aceleración
    const estimatedContactTime = Math.max(
      200,
      Math.min(400, 300 - (magnitude - 9.8) * 10)
    );

    setTrackingMetrics((prev) => ({
      ...prev,
      groundContactTime: Math.round(estimatedContactTime),
    }));
  };

  // Calcular potencia de carrera
  const calculateRunningPower = (
    speed: number,
    verticalOscillation: number,
    cadence: number
  ) => {
    // Fórmula simplificada para potencia de carrera
    const power = speed * 3.6 * (1 + verticalOscillation) * (cadence / 180);

    setTrackingMetrics((prev) => ({
      ...prev,
      runningPower: Math.round(power * 10) / 10,
    }));
  };

  // Calcular eficiencia de carrera
  const calculateEfficiency = (
    cadence: number,
    strideLength: number,
    verticalOscillation: number
  ) => {
    // Fórmula simplificada de eficiencia
    const efficiency = (cadence * strideLength) / (1 + verticalOscillation);

    setTrackingMetrics((prev) => ({
      ...prev,
      efficiency: Math.round(efficiency * 100) / 100,
    }));
  };

  // Inicializar sensorData con valores por defecto
  const initializeSensorData = (): SensorData => {
    return {
      accelerometer: { x: 0, y: 0, z: 0 },
      gyroscope: { x: 0, y: 0, z: 0 },
      magnetometer: { x: 0, y: 0, z: 0 },
      barometer: { pressure: 0 },
      deviceMotion: undefined,
    };
  };

  // Iniciar tracking
  const startTracking = async () => {
    try {
      setError(null);

      // Inicializar sensorData
      setSensorData(initializeSensorData());

      // Verificar permisos de ubicación
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        throw new Error("Location permission required");
      }

      // Configurar sensores
      const sensorAvailability = await setupSensors();
      if (!sensorAvailability) {
        throw new Error("Sensors not available");
      }

      setIsTracking(true);

      // Configurar listeners de sensores
      const accelerometerSubscription = Accelerometer.addListener(
        ({ x, y, z }) => {
          setSensorData((prev) =>
            prev
              ? {
                  ...prev,
                  accelerometer: { x, y, z },
                }
              : null
          );
          detectSteps({ x, y, z });
          calculateGroundContactTime({ x, y, z });
        }
      );

      const gyroscopeSubscription = Gyroscope.addListener(({ x, y, z }) => {
        setSensorData((prev) =>
          prev
            ? {
                ...prev,
                gyroscope: { x, y, z },
              }
            : null
        );
      });

      const magnetometerSubscription = Magnetometer.addListener(
        ({ x, y, z }) => {
          setSensorData((prev) =>
            prev
              ? {
                  ...prev,
                  magnetometer: { x, y, z },
                }
              : null
          );
        }
      );

      const barometerSubscription = Barometer.addListener(
        ({ pressure, relativeAltitude }) => {
          setSensorData((prev) =>
            prev
              ? {
                  ...prev,
                  barometer: { pressure, relativeAltitude },
                }
              : null
          );
        }
      );

      let deviceMotionSubscription: any = null;
      if (sensorAvailability.deviceMotion) {
        deviceMotionSubscription = DeviceMotion.addListener((motion) => {
          setSensorData((prev) =>
            prev
              ? {
                  ...prev,
                  deviceMotion: motion,
                }
              : null
          );
          calculateVerticalOscillation(motion);
        });
      }

      // Configurar tracking de ubicación
      const locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 1000, // 1 segundo
          distanceInterval: 1, // 1 metro
        },
        (location) => {
          const locationData: LocationData = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            altitude: location.coords.altitude || 0,
            accuracy: location.coords.accuracy || 0,
            speed: location.coords.speed || 0,
            heading: location.coords.heading || 0,
            timestamp: location.timestamp,
          };

          setLocationData(locationData);

          // Actualizar métricas basadas en ubicación
          if (trackingMetrics.cadence > 0) {
            calculateStrideLength(locationData.speed, trackingMetrics.cadence);
          }
        }
      );

      // Guardar referencias para limpiar después
      return () => {
        accelerometerSubscription?.remove();
        gyroscopeSubscription?.remove();
        magnetometerSubscription?.remove();
        barometerSubscription?.remove();
        deviceMotionSubscription?.remove();
        locationSubscription?.remove();
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start tracking");
      setIsTracking(false);
    }
  };

  // Detener tracking
  const stopTracking = () => {
    setIsTracking(false);
    setSensorData(null);
    setLocationData(null);

    // Resetear métricas
    stepCountRef.current = 0;
    lastStepTimeRef.current = 0;
    stepTimesRef.current = [];
    strideLengthsRef.current = [];
    verticalOscillationsRef.current = [];

    setTrackingMetrics({
      steps: 0,
      cadence: 0,
      strideLength: 0,
      groundContactTime: 0,
      verticalOscillation: 0,
      runningPower: 0,
      efficiency: 0,
    });
  };

  // Limpiar al desmontar
  useEffect(() => {
    return () => {
      stopTracking();
    };
  }, []);

  return {
    sensorData,
    trackingMetrics,
    locationData,
    isTracking,
    error,
    startTracking,
    stopTracking,
  };
};
