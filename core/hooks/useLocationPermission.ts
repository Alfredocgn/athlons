import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { LocationPermission } from "../types/training";

export const useLocationPermission = () => {
  const [permission, setPermission] = useState<LocationPermission>({
    granted: false,
    status: "undetermined",
  });

  const checkPermission = async () => {
    const { status } = await Location.getForegroundPermissionsAsync();
    setPermission({
      granted: status === "granted",
      status: status as "granted" | "denied" | "undetermined",
    });
  };

  const requestPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setPermission({
      granted: status === "granted",
      status: status as "granted" | "denied" | "undetermined",
    });
    return status === "granted";
  };

  useEffect(() => {
    checkPermission();
  }, []);

  return {
    permission,
    checkPermission,
    requestPermission,
  };
};
