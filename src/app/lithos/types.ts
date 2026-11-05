export interface Expedition {
  id: string;
  code: string; // e.g. "EXP-01"
  title: string;
  location: string;
  region: string;
  coordinates: string; // e.g. "64.4222° N, 16.7844° W"
  depthMeters: number; // e.g. -380
  strata: string; // e.g. "Basal Glacier Conduit / Sub-volcanic Ash"
  frequencyBand: string; // e.g. "14 Hz - 68 Hz"
  hydrophoneSensitivity: string; // e.g. "-192 dB re 1V/µPa"
  dateRecorded: string;
  temperatureC: number;
  pressureBar: number;
  sampleRate: string; // e.g. "192 kHz / 32-bit Float"
  sensorSerial: string;
  description: string;
  fieldNotes: string;
  ambientType: "cryo-resonance" | "magma-infrasound" | "abyssal-subduction" | "cavern-reverb" | "strike-slip";
  imageUrl: string;
  baseFrequency: number; // Hz for synthesizer
  harmonicRatios: number[];
  noiseFloor: number;
}

export interface ComponentPart {
  id: string;
  name: string;
  partNumber: string;
  material: string;
  function: string;
  depthRating: string;
  frequencyTolerance: string;
  x: number;
  y: number;
  specs: Record<string, string>;
}

export interface HardwareSchematic {
  id: string;
  code: string;
  name: string;
  type: string;
  yearDeveloped: string;
  deploymentDepthMax: string;
  operatingTemp: string;
  casingMetallurgy: string;
  summary: string;
  dimensions: string;
  parts: ComponentPart[];
  schematicSvgType: "geophone" | "hydrophone" | "reel-to-reel";
}

export interface VinylEdition {
  id: string;
  catalogNumber: string; // e.g. "LITH-001"
  title: string;
  subtitle: string;
  format: string; // e.g. "2xLP 180g Heavyweight Vinyl"
  colorway: string; // e.g. "Glacier Ice Clear with Volcanic Ash Marble"
  jacketType: string;
  editionLimit: number;
  remainingCount: number;
  priceUSD: number;
  releaseDate: string;
  weightGrams: number;
  curatorNotes: string;
  tracklist: {
    side: string;
    title: string;
    duration: string;
    frequencyPeak: string;
    depthRecorded: string;
  }[];
  specifications: {
    lacquerCut: string;
    pressingPlant: string;
    masterFormat: string;
    packaging: string;
  };
  mockupTheme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    marbleStyle: string;
  };
}

export interface FieldLog {
  id: string;
  dispatchNumber: string;
  date: string;
  location: string;
  coordinates: string;
  depth: string;
  investigator: string;
  title: string;
  logText: string;
  readings: {
    label: string;
    value: string;
  }[];
  status: "ARCHIVED" | "VERIFIED" | "TELEMETRY SYNCHRONIZED";
}

export interface CartItem {
  edition: VinylEdition;
  quantity: number;
}
