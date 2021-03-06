# Hiking Data Tools

This repo is to store some personal utilities and notes I have about GIS.

GPX and GeoJSON files are generated by [CalTopo](https://caltopo.com/).

GPX data is preferred because [tools already exist](http://www.gpsvisualizer.com/convert_input?convert_format=gpx) to add missing elevation data from DEM sources.

## CLI Tools

Tools are run from the `/dist` folder, so they need to be compiled (`tsc`) before typescript updates take effect.

### `gpx-to-hg`

Convert GPX data from CalTopo to my own JSON format used in other tools. If `target-file.json` is not provided this logs to standard output.

```
gpx-to-hg source-file.gpx target-file.json
```

## Development

This project is written in Typescript (`/src`) and compiled to Javascript (`/dist`).

### Compilation

```
npm run build
```

### Testing

Testing is done with Jest. Some sample data is provided in the `/src` directory in GeoJSON and GPX format.

#### Run tests

```
npm test
```

#### Test files on every change

```
npm run watch
```
