import { useEffect, useState } from "react";

export function useGeolocation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported in this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) =>
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
      () => setError("Location access denied. Showing default city coverage."),
    );
  }, []);

  return { location, error };
}
