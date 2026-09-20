/**
 * Admin dashboard data layer.
 *
 * There is no backend yet, so readings are SIMULATED here. Every value the
 * admin page renders comes from `sampleChannel` / `buildHistory` below. When a
 * real ground-station API exists, replace those two functions and the rest of
 * the dashboard keeps working unchanged.
 */

export type Status = 'good' | 'warning' | 'serious' | 'critical';

export type Channel = {
  id: string;
  label: string;
  unit: string;
  /** Which module on the aircraft supplies this reading. */
  sensor: string;
  /** Centre of the simulated signal, and how far it wanders. */
  base: number;
  spread: number;
  decimals: number;
  /**
   * Ascending thresholds. A reading below `warning` is good; at or above
   * `critical` it is critical. `invert: true` flips it for readings where a
   * LOW number is the dangerous one (oxygen depletion).
   */
  thresholds: { warning: number; serious: number; critical: number };
  invert?: boolean;
};

export const channels: Channel[] = [
  {
    id: 'oxygen',
    label: 'Oxygen',
    unit: '% vol',
    sensor: 'O₂ cell',
    base: 20.9,
    spread: 0.5,
    decimals: 1,
    // Oxygen is the inverted case: 19.5% is the confined-space alarm point.
    thresholds: { warning: 20.4, serious: 19.5, critical: 18.0 },
    invert: true,
  },
  {
    id: 'temperature',
    label: 'Temperature',
    unit: '°C',
    sensor: 'BME280',
    base: 31.4,
    spread: 2.6,
    decimals: 1,
    thresholds: { warning: 35, serious: 38, critical: 41 },
  },
  {
    id: 'humidity',
    label: 'Humidity',
    unit: '% RH',
    sensor: 'BME280',
    base: 68,
    spread: 9,
    decimals: 0,
    thresholds: { warning: 80, serious: 88, critical: 94 },
  },
  {
    id: 'pressure',
    label: 'Pressure',
    unit: 'hPa',
    sensor: 'BME280',
    base: 1008,
    spread: 3.5,
    decimals: 1,
    thresholds: { warning: 1016, serious: 1020, critical: 1024 },
  },
  {
    id: 'dewpoint',
    label: 'Dew Point',
    unit: '°C',
    sensor: 'Derived',
    base: 24.6,
    spread: 2.2,
    decimals: 1,
    thresholds: { warning: 26, serious: 28, critical: 30 },
  },
  {
    id: 'benzene',
    label: 'Benzene',
    unit: 'ppm',
    sensor: 'MQ-2',
    base: 0.9,
    spread: 0.6,
    decimals: 2,
    thresholds: { warning: 1.6, serious: 2.4, critical: 3.2 },
  },
  {
    id: 'ammonia',
    label: 'Ammonia',
    unit: 'ppm',
    sensor: 'MQ-2',
    base: 6.2,
    spread: 3.4,
    decimals: 1,
    thresholds: { warning: 12, serious: 18, critical: 25 },
  },
  {
    id: 'sulfide',
    label: 'Sulfide Gases',
    unit: 'ppm',
    sensor: 'MQ-2',
    base: 2.1,
    spread: 1.5,
    decimals: 2,
    thresholds: { warning: 4, serious: 6, critical: 9 },
  },
];

export const statusLabel: Record<Status, string> = {
  good: 'Normal',
  warning: 'Elevated',
  serious: 'High',
  critical: 'Critical',
};

/** Ascending severity, so two statuses can be compared. */
const severity: Record<Status, number> = {
  good: 0,
  warning: 1,
  serious: 2,
  critical: 3,
};

export function statusOf(channel: Channel, value: number): Status {
  const { warning, serious, critical } = channel.thresholds;
  if (channel.invert) {
    if (value <= critical) return 'critical';
    if (value <= serious) return 'serious';
    if (value <= warning) return 'warning';
    return 'good';
  }
  if (value >= critical) return 'critical';
  if (value >= serious) return 'serious';
  if (value >= warning) return 'warning';
  return 'good';
}

export function worstStatus(list: Status[]): Status {
  return list.reduce<Status>(
    (worst, s) => (severity[s] > severity[worst] ? s : worst),
    'good',
  );
}

/**
 * Deterministic pseudo-noise. A seeded generator keeps the first client render
 * stable instead of producing a new random walk on every re-render.
 */
function noise(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x); // 0..1
}

/** One simulated reading for `channel` at step `t`. */
export function sampleChannel(channel: Channel, t: number): number {
  const wave = Math.sin(t * 0.21 + channel.base) * 0.55;
  const swell = Math.sin(t * 0.055 + channel.spread) * 0.3;
  const jitter = (noise(t + channel.base * 7) - 0.5) * 0.3;
  const raw = channel.base + (wave + swell + jitter) * channel.spread;
  return Number(raw.toFixed(channel.decimals));
}

/** `points` readings ending at step `t`, oldest first. */
export function buildHistory(channel: Channel, t: number, points: number): number[] {
  return Array.from({ length: points }, (_, i) => sampleChannel(channel, t - (points - 1 - i)));
}

export type Range = { id: string; label: string; points: number; secondsPerPoint: number };

export const ranges: Range[] = [
  { id: '15m', label: '15 min', points: 30, secondsPerPoint: 30 },
  { id: '1h', label: '1 hour', points: 60, secondsPerPoint: 60 },
  { id: '6h', label: '6 hours', points: 72, secondsPerPoint: 300 },
];

/** Flight/airframe readouts that sit above the sensor grid. */
export function flightState(t: number) {
  return {
    battery: Math.max(8, 92 - (t % 240) * 0.18),
    satellites: 11 + Math.round(noise(t * 0.4) * 5),
    altitude: 42 + Math.sin(t * 0.13) * 11,
    link: 94 + Math.sin(t * 0.31) * 4,
    lat: 23.7639 + Math.sin(t * 0.04) * 0.0045,
    lon: 90.3889 + Math.cos(t * 0.04) * 0.0045,
  };
}
