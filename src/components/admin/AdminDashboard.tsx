'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  BatteryCharging,
  CheckCircle2,
  CircleAlert,
  MapPin,
  OctagonAlert,
  Pause,
  Play,
  Satellite,
  Signal,
  TriangleAlert,
  type LucideIcon,
} from 'lucide-react';
import TrendChart from '@/components/admin/TrendChart';
import {
  buildHistory,
  channels,
  flightState,
  ranges,
  statusLabel,
  statusOf,
  worstStatus,
  type Status,
} from '@/lib/telemetry';

/** Status never rides on colour alone — every use pairs the hue with an icon and a word. */
const statusIcon: Record<Status, LucideIcon> = {
  good: CheckCircle2,
  warning: CircleAlert,
  serious: TriangleAlert,
  critical: OctagonAlert,
};

const statusToken: Record<Status, string> = {
  good: 'var(--status-good)',
  warning: 'var(--status-warning)',
  serious: 'var(--status-serious)',
  critical: 'var(--status-critical)',
};

function StatusPill({ status }: { status: Status }) {
  const Icon = statusIcon[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em]"
      style={{
        background: `rgb(${statusToken[status]} / 0.14)`,
        color: `rgb(${statusToken[status]})`,
      }}
    >
      <Icon className="h-3 w-3" aria-hidden />
      {statusLabel[status]}
    </span>
  );
}

/** Clock labels for a window ending now, oldest first. */
function clockLabels(points: number, secondsPerPoint: number, epoch: number): string[] {
  return Array.from({ length: points }, (_, i) => {
    const d = new Date(epoch - (points - 1 - i) * secondsPerPoint * 1000);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  });
}

export default function AdminDashboard() {
  const [rangeId, setRangeId] = useState(ranges[1].id);
  const [live, setLive] = useState(true);
  const [tick, setTick] = useState(0);
  // Rendered only after mount: the clock and the simulated walk would not
  // match between server and client otherwise.
  const [epoch, setEpoch] = useState<number | null>(null);

  useEffect(() => setEpoch(Date.now()), []);

  useEffect(() => {
    if (!live) return;
    const id = setInterval(() => {
      setTick((t) => t + 1);
      setEpoch(Date.now());
    }, 4000);
    return () => clearInterval(id);
  }, [live]);

  const range = ranges.find((r) => r.id === rangeId) ?? ranges[1];

  const readings = useMemo(
    () =>
      channels.map((c) => {
        const history = buildHistory(c, tick, range.points);
        const value = history[history.length - 1];
        return { channel: c, history, value, status: statusOf(c, value) };
      }),
    [tick, range.points],
  );

  const overall = worstStatus(readings.map((r) => r.status));
  const flight = flightState(tick);
  const times = epoch === null ? [] : clockLabels(range.points, range.secondsPerPoint, epoch);

  const flightReadouts = [
    { icon: BatteryCharging, label: 'Battery', value: `${flight.battery.toFixed(0)}%` },
    { icon: Satellite, label: 'GNSS', value: `${flight.satellites} sats` },
    { icon: Activity, label: 'Altitude', value: `${flight.altitude.toFixed(1)} m` },
    { icon: Signal, label: 'Link', value: `${flight.link.toFixed(0)}%` },
  ];

  // Hold the pre-mount render: no skeleton flash, no layout jump.
  const pending = epoch === null;

  return (
    <div className={`transition-opacity duration-300 ${pending ? 'opacity-60' : 'opacity-100'}`}>
      {/* simulated-data notice — this dashboard has no backend behind it */}
      <div
        className="flex items-start gap-3 rounded-2xl px-4 py-3"
        style={{
          background: 'rgb(var(--status-warning) / 0.12)',
          border: '1px solid rgb(var(--status-warning) / 0.35)',
        }}
      >
        <AlertTriangle
          className="mt-0.5 h-4 w-4 shrink-0"
          style={{ color: 'rgb(var(--status-warning))' }}
          aria-hidden
        />
        <p className="text-[13px] leading-relaxed text-muted">
          <span className="font-semibold" style={{ color: 'rgb(var(--fg))' }}>
            Simulated data.
          </span> No ground station is
          connected — every reading below is generated in the browser for layout and demo
          purposes. Point <code className="font-mono text-[12px]">src/lib/telemetry.ts</code> at
          the real telemetry feed to make this live.
        </p>
      </div>

      {/* header */}
      <div className="mt-6 flex flex-wrap items-end justify-between gap-5">
        <div>
          <span className="eyebrow">
            <Activity className="h-3.5 w-3.5" />
            Drone overview
          </span>
          <h1 className="h2 mt-3">
            Air quality <span className="gradient-text">console</span>
          </h1>
        </div>

        <div className="flex flex-col items-start gap-2 sm:items-end">
          <StatusPill status={overall} />
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            {pending
              ? 'Connecting…'
              : `Mission EN-042 · updated ${new Date(epoch).toLocaleTimeString()}`}
          </p>
        </div>
      </div>

      {/* one filter row, above everything it scopes */}
      <div className="mt-7 flex flex-wrap items-center gap-2">
        <span className="mr-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
          Window
        </span>
        {ranges.map((r) => (
          <button
            key={r.id}
            onClick={() => setRangeId(r.id)}
            aria-pressed={r.id === rangeId}
            className="glass rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-all duration-300"
            style={
              r.id === rangeId
                ? {
                    borderColor: 'rgb(var(--accent) / 0.6)',
                    color: 'rgb(var(--accent))',
                  }
                : undefined
            }
          >
            {r.label}
          </button>
        ))}

        <button
          onClick={() => setLive((v) => !v)}
          className="glass ml-auto inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12px] font-medium"
        >
          {live ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          {live ? 'Pause' : 'Resume'}
        </button>
      </div>

      {/* flight state */}
      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_auto]">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {flightReadouts.map((r) => (
            <div key={r.label} className="glass-card p-5">
              <r.icon className="h-3.5 w-3.5 text-accent" aria-hidden />
              <p className="mt-2.5 font-display text-2xl font-semibold">{r.value}</p>
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                {r.label}
              </p>
            </div>
          ))}
        </div>
        <div className="glass-card flex items-center gap-3 p-5">
          <MapPin className="h-4 w-4 shrink-0 text-accent" aria-hidden />
          <div>
            <p className="font-mono text-sm font-semibold tabular-nums">
              {flight.lat.toFixed(4)}°N, {flight.lon.toFixed(4)}°E
            </p>
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
              GPS position
            </p>
          </div>
        </div>
      </div>

      {/* sensor small multiples — each keeps its own scale */}
      <h2 className="mt-12 font-display text-lg font-semibold tracking-tight">
        Sensor channels
      </h2>
      <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {readings.map(({ channel, history, value, status }) => (
          <div key={channel.id} className="glass-card p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold">{channel.label}</h3>
                <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                  {channel.sensor}
                </p>
              </div>
              <StatusPill status={status} />
            </div>

            <p className="mt-4 font-display text-3xl font-semibold">
              {value.toFixed(channel.decimals)}
              <span className="ml-1.5 text-sm font-medium text-muted">{channel.unit}</span>
            </p>

            {times.length > 0 && (
              <TrendChart
                values={history}
                unit={channel.unit}
                decimals={channel.decimals}
                times={times}
                label={channel.label}
              />
            )}
          </div>
        ))}
      </div>

      {/* table view — the WCAG-clean twin of every chart above */}
      <h2 className="mt-12 font-display text-lg font-semibold tracking-tight">
        Readings table
      </h2>
      <p className="mt-1.5 text-[13px] text-muted">
        The same values as the charts, latest first.
      </p>
      <div className="glass-card mt-5 overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-[13px]">
          <caption className="sr-only">
            Latest sensor readings with unit, source module and status
          </caption>
          <thead>
            <tr className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
              <th scope="col" className="px-6 py-4 font-medium">Channel</th>
              <th scope="col" className="px-6 py-4 font-medium">Reading</th>
              <th scope="col" className="px-6 py-4 font-medium">Window min</th>
              <th scope="col" className="px-6 py-4 font-medium">Window max</th>
              <th scope="col" className="px-6 py-4 font-medium">Source</th>
              <th scope="col" className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {readings.map(({ channel, history, value, status }) => (
              <tr
                key={channel.id}
                style={{ borderTop: '1px solid rgb(var(--glass-border) / 0.16)' }}
              >
                <th scope="row" className="px-6 py-3.5 font-medium">
                  {channel.label}
                </th>
                <td className="px-6 py-3.5 font-mono tabular-nums">
                  {value.toFixed(channel.decimals)} {channel.unit}
                </td>
                <td className="px-6 py-3.5 font-mono tabular-nums text-muted">
                  {Math.min(...history).toFixed(channel.decimals)}
                </td>
                <td className="px-6 py-3.5 font-mono tabular-nums text-muted">
                  {Math.max(...history).toFixed(channel.decimals)}
                </td>
                <td className="px-6 py-3.5 text-muted">{channel.sensor}</td>
                <td className="px-6 py-3.5">
                  <StatusPill status={status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
