/** Minimal trend line for a telemetry channel's recent history. */
import Svg, { Path, Circle } from 'react-native-svg';

export function Sparkline({
  data,
  color,
  width = 120,
  height = 36,
}: {
  data: number[];
  color: string;
  width?: number;
  height?: number;
}) {
  if (data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  // A flat series would divide by zero; pin it to the middle of the box.
  const span = max - min || 1;
  const stepX = width / (data.length - 1);

  const points = data.map((v, i) => ({
    x: i * stepX,
    y: height - ((v - min) / span) * (height - 4) - 2,
  }));

  const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');
  const last = points[points.length - 1];

  return (
    <Svg width={width} height={height}>
      <Path d={d} stroke={color} strokeWidth={1.8} fill="none" strokeLinejoin="round" />
      <Circle cx={last.x} cy={last.y} r={2.6} fill={color} />
    </Svg>
  );
}
