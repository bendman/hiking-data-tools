#!/usr/bin/env node
// @ts-ignore
import { parseGpxFromFile } from 'gpx-parse';
import { promisify } from 'util';
import { writeFile } from 'fs';

interface GPXWaypoint {
  name: string;
  cmt: string;
  src: string;
  type: string;
  lat: number;
  lon: number;
  elevation: number;
  time: null;
}

interface GPXJSON {
  waypoints: GPXWaypoint[];
  tracks: GPXTrack[];
}

interface GPXTrack {
  name: string;
  segments: GPXTrackPoint[][];
}

interface GPXTrackPoint {
  lat: number;
  lon: number;
  elevation: number;
}

const parseGPX = promisify(parseGpxFromFile);

const gpxSegmentToPosition = (segment: GPXTrackPoint) => ({
  latitude: segment.lat,
  longitude: segment.lon,
  elevation: segment.elevation,
});

const gpxWaypointToInfoPoint = (waypoint: GPXWaypoint, index: number) => ({
  id: index.toString(),
  name: waypoint.name,
  position: {
    latitude: waypoint.lat,
    longitude: waypoint.lon,
    elevation: waypoint.elevation,
  },
});

export const gpxToHG = (data: GPXJSON) => ({
  id: 'id',
  name: data.tracks[0].name,
  length: 0,
  difficulty: 1,
  type: '',
  path: data.tracks[0].segments[0].map(gpxSegmentToPosition),
  infoPoints: data.waypoints.map(gpxWaypointToInfoPoint),
});

export const convertGPXFile = async (filename: string): Promise<object> => {
  const data: GPXJSON = await parseGPX(filename);
  return gpxToHG(data);
};

/**
 * Executable
 * gpx-to-hg sourcefile.gpx targetfile.json
 */

const exec = async () => {
  const args = process.argv.slice(2);

  const [sourceFile, targetFile] = args;

  if (!sourceFile) {
    console.error('No input file provided.');
    process.exit(1);
  }

  const data = await convertGPXFile(sourceFile);

  if (targetFile) {
    // Output file provided, so output there
    const writeFileAsync = promisify(writeFile);
    await writeFileAsync(targetFile, JSON.stringify(data, null, 2));
  } else {
    // No output file, so output to console
    console.log(data);
  }
};

if (require.main === module) {
  exec();
}
