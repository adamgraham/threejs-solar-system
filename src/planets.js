const unitScale = 1 / 1_000_000; // 1 unit = 1 million km
const planets = [
  {
    name: 'Sun',
    resource: 'sun.glb',
    diameter: (1_391_400 * unitScale) / 20,
    semiMajorAxis: 0,
    eccentricity: 0,
    inclination: 0,
    longitudeOfAscendingNode: 0,
    argumentOfPerihelion: 0,
    meanAnomaly: 0,
    axialTilt: 0,
    color: 0xfff180,
  },
  {
    name: 'Mercury',
    resource: 'mercury.glb',
    diameter: 4_879 * unitScale,
    semiMajorAxis: 57_909_050 * unitScale,
    eccentricity: 0.20563,
    inclination: 7.005,
    longitudeOfAscendingNode: 48.331,
    argumentOfPerihelion: 29.124,
    meanAnomaly: 174.796,
    axialTilt: 0.04,
    color: 0x999999,
  },
  {
    name: 'Venus',
    resource: 'venus.glb',
    diameter: 12_104 * unitScale,
    semiMajorAxis: 108_208_000 * unitScale,
    eccentricity: 0.006772,
    inclination: 3.39458,
    longitudeOfAscendingNode: 76.68,
    argumentOfPerihelion: 54.884,
    meanAnomaly: 50.115,
    axialTilt: 177.3,
    color: 0xe6cc73,
  },
  {
    name: 'Earth',
    resource: 'earth.glb',
    diameter: 12_756 * unitScale,
    semiMajorAxis: 149_598_023 * unitScale,
    eccentricity: 0.0167086,
    inclination: 0.00005,
    longitudeOfAscendingNode: -11.26064,
    argumentOfPerihelion: 114.20783,
    meanAnomaly: 358.617,
    axialTilt: 23.44,
    color: 0x0099cc,
  },
  {
    name: 'Mars',
    resource: 'mars.glb',
    diameter: 6_792 * unitScale,
    semiMajorAxis: 227_939_366 * unitScale,
    eccentricity: 0.0934,
    inclination: 1.85,
    longitudeOfAscendingNode: 49.57854,
    argumentOfPerihelion: 286.5,
    meanAnomaly: 19.412,
    axialTilt: 25.19,
    color: 0xe38259,
  },
  {
    name: 'Jupiter',
    resource: 'jupiter.glb',
    diameter: 142_984 * unitScale,
    semiMajorAxis: 778_477_400 * unitScale,
    eccentricity: 0.0489,
    inclination: 1.303,
    longitudeOfAscendingNode: 100.464,
    argumentOfPerihelion: 273.867,
    meanAnomaly: 20.02,
    axialTilt: 3.13,
    color: 0xf2b5a3,
  },
  {
    name: 'Saturn',
    resource: 'saturn.glb',
    diameter: 120_536 * unitScale,
    semiMajorAxis: 1_433_537_000 * unitScale,
    eccentricity: 0.0565,
    inclination: 2.485,
    longitudeOfAscendingNode: 113.665,
    argumentOfPerihelion: 339.392,
    meanAnomaly: 317.02,
    axialTilt: 26.73,
    color: 0xb7a685,
  },
  {
    name: 'Uranus',
    resource: 'uranus.glb',
    diameter: 51_118 * unitScale,
    semiMajorAxis: 2_870_971_632 * unitScale,
    eccentricity: 0.04717,
    inclination: 0.773,
    longitudeOfAscendingNode: 74.006,
    argumentOfPerihelion: 96.998857,
    meanAnomaly: 142.2386,
    axialTilt: 97.77,
    color: 0xabeaff,
  },
  {
    name: 'Neptune',
    resource: 'neptune.glb',
    diameter: 49_528 * unitScale,
    semiMajorAxis: 4_498_410_000 * unitScale,
    eccentricity: 0.008678,
    inclination: 1.77,
    longitudeOfAscendingNode: 131.783,
    argumentOfPerihelion: 273.187,
    meanAnomaly: 256.228,
    axialTilt: 28.32,
    color: 0x7ab0ff,
  },
];

export default planets;
