import { Feature, MultiLineString, Point } from 'geojson';

interface CalTopoMarker {
  'marker-symbol': 'point';
  'marker-color': string;
  description: string;
  title: string;
  class: 'Marker';
  updated: number;
  folderId: string;
}

export const caltopoMarkerToInfoPoint = (
  feature: Feature<Point, CalTopoMarker>
) => ({
  id: feature.id,
  name: feature.properties.title,
  position: {
    latitude: feature.geometry.coordinates[1],
    longitude: feature.geometry.coordinates[0],
  },
});
