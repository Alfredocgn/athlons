import * as turf from '@turf/turf';
import { LineString, Feature } from 'geojson';

export function isValidRouteGeoJSON(routeData: string): boolean {
  try {
    const parsed = JSON.parse(routeData);

    if (parsed.type === 'LineString') {
      return turf.lineString(parsed.coordinates) !== undefined;
    } else if (
      parsed.type === 'Feature' &&
      parsed.geometry?.type === 'LineString'
    ) {
      return turf.lineString(parsed.geometry.coordinates) !== undefined;
    }
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export function calculateRouteDistance(routeData: string): number {
  try {
    const parsed = JSON.parse(routeData);
    let line: Feature<LineString> | null = null;

    if (parsed.type === 'LineString') {
      line = turf.lineString(parsed.coordinates);
    } else if (
      parsed.type === 'Feature' &&
      parsed.geometry?.type === 'LineString'
    ) {
      line = parsed as Feature<LineString>;
    }

    if (!line) return 0;

    return turf.length(line, { units: 'kilometers' });
  } catch (e) {
    console.error(e);
    return 0;
  }
}

export function filterRoutesByProximity(
  routes: any[],
  lat: number,
  lng: number,
  radiusKm: number,
): any[] {
  const from = turf.point([lng, lat]);
  return routes.filter((route) => {
    try {
      const routeData = JSON.parse(route.routeData);
      const coordinates =
        routeData.type === 'Feature'
          ? routeData.geometry.coordinates[0]
          : routeData.coordinates[0];

      const to = turf.point([coordinates[0], coordinates[1]]);
      const distance = turf.distance(from, to, { units: 'kilometers' });
      return distance <= radiusKm;
    } catch {
      return false;
    }
  });
}
