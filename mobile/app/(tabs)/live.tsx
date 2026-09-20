import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Badge, Body, Card, SectionHeader } from '../../components/ui';
import { Screen } from '../../components/Screen';
import { Sparkline } from '../../components/Sparkline';
import { space, type, useTheme } from '../../lib/theme';
import {
  buildHistory,
  channels,
  flightState,
  ranges,
  sampleChannel,
  statusLabel,
  statusOf,
  worstStatus,
} from '@shared/telemetry';

export default function Live() {
  const { colors } = useTheme();
  const [t, setT] = useState(0);
  const [rangeId, setRangeId] = useState(ranges[0].id);

  // The shared telemetry model is a deterministic function of `t`, so ticking
  // it forward is all that is needed to animate the feed.
  useEffect(() => {
    const id = setInterval(() => setT((v) => v + 1), 2000);
    return () => clearInterval(id);
  }, []);

  const range = ranges.find((r) => r.id === rangeId) ?? ranges[0];
  const flight = flightState(t);
  const readings = channels.map((c) => {
    const value = sampleChannel(c, t);
    return { channel: c, value, status: statusOf(c, value), history: buildHistory(c, t, range.points) };
  });
  const overall = worstStatus(readings.map((r) => r.status));

  return (
    <Screen eyebrow="Ground station" title="Live Telemetry">
      <Card style={{ borderColor: colors.status[overall] + '66' }}>
        <View style={styles.rowBetween}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.sm }}>
            <View style={[styles.pulse, { backgroundColor: colors.status[overall] }]} />
            <Text style={[type.h2, { color: colors.fg, fontSize: 16 }]}>
              Air status: {statusLabel[overall]}
            </Text>
          </View>
          <Badge label="Simulated" tone={colors.muted} />
        </View>
        <Body style={{ fontSize: 13 }}>
          No ground-station backend is connected yet — these readings come from the same simulated
          model the web dashboard uses.
        </Body>
      </Card>

      <SectionHeader eyebrow="Airframe" title="Flight state" />
      <View style={styles.grid}>
        <Readout icon="battery-half" label="Battery" value={`${flight.battery.toFixed(0)}%`} />
        <Readout icon="navigate-circle" label="Satellites" value={`${flight.satellites}`} />
        <Readout icon="trending-up" label="Altitude" value={`${flight.altitude.toFixed(0)} m`} />
        <Readout icon="wifi" label="Link" value={`${flight.link.toFixed(0)}%`} />
      </View>
      <Card style={{ marginTop: space.md }}>
        <Text style={[type.small, { color: colors.muted }]}>Position</Text>
        <Text style={[type.mono, { color: colors.fg, fontSize: 14 }]}>
          {flight.lat.toFixed(4)}° N, {flight.lon.toFixed(4)}° E
        </Text>
      </Card>

      <SectionHeader eyebrow="Sensors" title="Readings" />
      <View style={styles.ranges}>
        {ranges.map((r) => {
          const on = r.id === rangeId;
          return (
            <Pressable
              key={r.id}
              onPress={() => setRangeId(r.id)}
              style={[
                styles.rangeBtn,
                {
                  backgroundColor: on ? colors.accent : 'transparent',
                  borderColor: on ? colors.accent : colors.border,
                },
              ]}
            >
              <Text
                style={[type.small, { color: on ? colors.onAccent : colors.muted, fontSize: 12 }]}
              >
                {r.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={{ gap: space.md }}>
        {readings.map(({ channel, value, status, history }) => (
          <Card key={channel.id}>
            <View style={styles.rowBetween}>
              <View style={{ flex: 1 }}>
                <Text style={[type.h2, { color: colors.fg, fontSize: 15 }]}>{channel.label}</Text>
                <Text style={[type.small, { color: colors.muted, fontSize: 12 }]}>
                  {channel.sensor}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4, marginTop: 6 }}>
                  <Text style={[type.h1, { color: colors.status[status] }]}>
                    {value.toFixed(channel.decimals)}
                  </Text>
                  <Text style={[type.small, { color: colors.muted }]}>{channel.unit}</Text>
                </View>
                <View style={{ marginTop: 6 }}>
                  <Badge label={statusLabel[status]} tone={colors.status[status]} />
                </View>
              </View>
              <Sparkline data={history} color={colors.status[status]} />
            </View>
          </Card>
        ))}
      </View>
    </Screen>
  );
}

function Readout({ icon, label, value }: { icon: any; label: string; value: string }) {
  const { colors } = useTheme();
  return (
    <Card style={{ flex: 1, minWidth: 150 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.sm }}>
        <Ionicons name={icon} size={16} color={colors.accent} />
        <Text style={[type.small, { color: colors.muted }]}>{label}</Text>
      </View>
      <Text style={[type.h1, { color: colors.fg, fontSize: 21 }]}>{value}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: space.md },
  pulse: { width: 9, height: 9, borderRadius: 5 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: space.md },
  ranges: { flexDirection: 'row', gap: space.sm, marginBottom: space.lg },
  rangeBtn: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 999, borderWidth: 1 },
});
