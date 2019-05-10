import { caltopoMarkerToInfoPoint } from './json-to-hg';

test('CalTopo GeoJSON Marker to InfoPoint', () => {
  const input = {
    type: 'Feature',
    id: 'someid',
    geometry: {
      type: 'Point',
      coordinates: [-100, 40, 0, 0],
    },
    properties: {
      'marker-symbol': 'point',
      'marker-color': '#FF0000',
      description: '',
      title: 'somename',
      class: 'Marker',
      updated: 1557360815000,
      folderId: '90f5f75d-b2e7-4d6b-aacc-fe7036bafb02',
    },
  };

  const expected = {
    id: 'someid',
    name: 'somename',
    position: {
      longitude: -100,
      latitude: 40,
    },
  };

  // @ts-ignore
  expect(caltopoMarkerToInfoPoint(input)).toEqual(expected);
});
