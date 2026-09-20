import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';
import { Badge, Body, Card, SectionHeader, Stat } from '../../components/ui';
import { Screen } from '../../components/Screen';
import { space, type, useTheme } from '../../lib/theme';
import { method, parameters, payload, project, specs } from '@shared/site';

const paramIcon = {
  thermometer: 'thermometer',
  droplets: 'water',
  gauge: 'speedometer',
  cloud: 'cloud',
  flask: 'flask',
  wind: 'navigate',
} as const;

export default function Drone() {
  const { colors } = useTheme();

  return (
    <Screen eyebrow="The aircraft" title={project.title}>
      <View style={{ gap: space.md }}>
        {project.intro.map((p, i) => (
          <Body key={i}>{p}</Body>
        ))}
      </View>

      <SectionHeader eyebrow="Airframe" title="Specifications" />
      <View style={styles.grid}>
        {specs.map((s) => (
          <Stat key={s.label} value={s.value} unit={s.unit} label={s.label} />
        ))}
      </View>

      <SectionHeader eyebrow="Sensing" title="What it measures" />
      <View style={{ gap: space.md }}>
        {parameters.map((p) => (
          <Card key={p.label}>
            <View style={styles.row}>
              <View style={[styles.iconWrap, { backgroundColor: colors.accent2 + '1f' }]}>
                <Ionicons name={paramIcon[p.icon]} size={19} color={colors.accent2} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[type.h2, { color: colors.fg, fontSize: 16 }]}>{p.label}</Text>
                <Text style={[type.small, { color: colors.muted }]}>
                  {p.unit ? `${p.unit} · ` : ''}
                  {p.source}
                </Text>
              </View>
            </View>
          </Card>
        ))}
      </View>

      <SectionHeader eyebrow="Payload" title="On-board modules" />
      <View style={{ gap: space.md }}>
        {payload.map((m) => (
          <Card key={m.part}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.sm }}>
              <Text style={[type.h2, { color: colors.fg, fontSize: 16 }]}>{m.part}</Text>
              <Badge label={m.role} tone={colors.accent2} />
            </View>
            <Body style={{ fontSize: 14 }}>{m.desc}</Body>
          </Card>
        ))}
      </View>

      <SectionHeader eyebrow="Method" title="How it was built" />
      <Card>
        <View style={{ gap: space.md }}>
          {method.map((m, i) => (
            <View key={m} style={styles.row}>
              <View style={[styles.step, { borderColor: colors.accent }]}>
                <Text style={[type.small, { color: colors.accent, fontSize: 12 }]}>{i + 1}</Text>
              </View>
              <Body style={{ flex: 1, fontSize: 14 }}>{m}</Body>
            </View>
          ))}
        </View>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: space.md },
  row: { flexDirection: 'row', alignItems: 'center', gap: space.md },
  iconWrap: { width: 38, height: 38, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  step: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
