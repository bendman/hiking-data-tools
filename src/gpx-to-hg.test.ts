import { convertGPXFile } from './gpx-to-hg';

const expectPositionElevation = expect.objectContaining({
  latitude: expect.any(Number),
  longitude: expect.any(Number),
  elevation: expect.any(Number),
});

describe('convertGPXFile', () => {
  test('returns an object', async () => {
    const res = convertGPXFile('./src/data/sample.gpx');
    expect(res instanceof Promise).toBe(true);

    const data = await res;

    expect(typeof data).toBe('object');
    expect(data).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        type: expect.any(String),
        length: expect.any(Number),
        difficulty: expect.any(Number),
        infoPoints: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
            position: expectPositionElevation,
          }),
        ]),
        path: expect.arrayContaining([expectPositionElevation]),
      })
    );
  });
});
