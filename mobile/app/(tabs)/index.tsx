import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Badge, Body, Bullet, Card, SectionHeader } from '../../components/ui';
import { Screen } from '../../components/Screen';
import { space, type, useTheme } from '../../lib/theme';
import { pillars, site, timeline, values } from '@shared/site';

const pillarIcon = {
  shield: 'shield-checkmark',
  leaf: 'leaf',
  radar: 'radio',
} as const;

export default function Home() {
  const { colors } = useTheme();

  return (
    <Screen eyebrow={site.competition} title={site.name}>
      <Body style={{ fontSize: 17, lineHeight: 26, marginBottom: space.lg }}>{site.tagline}</Body>

      <Link href="/drone" asChild>
        <Pressable style={[styles.cta, { backgroundColor: colors.accent }]}>
          <Text style={[type.h2, { color: colors.onAccent, fontSize: 15 }]}>Explore the drone</Text>
          <Ionicons name="arrow-forward" size={18} color={colors.onAccent} />
        </Pressable>
      </Link>

      <SectionHeader eyebrow="Capabilities" title="Three missions, one airframe" />
      <View style={{ gap: space.md }}>
        {pillars.map((p) => (
          <Card key={p.title}>
            <View style={styles.pillarHead}>
              <View style={[styles.iconWrap, { backgroundColor: colors.accent + '1f' }]}>
                <Ionicons name={pillarIcon[p.icon]} size={20} color={colors.accent} />
              </View>
              <Text style={[type.h2, { color: colors.fg, flex: 1 }]}>{p.title}</Text>
            </View>
            <Body style={{ fontSize: 14 }}>{p.desc}</Body>
            <View style={{ gap: space.sm, marginTop: space.sm }}>
              {p.points.map((pt) => (
                <Bullet key={pt}>{pt}</Bullet>
              ))}
            </View>
          </Card>
        ))}
      </View>

      <SectionHeader eyebrow="Principles" title="What we optimise for" />
      <View style={{ gap: space.md }}>
        {values.map((v) => (
          <Card key={v.title}>
            <Text style={[type.h2, { color: colors.fg, fontSize: 16 }]}>{v.title}</Text>
            <Body style={{ fontSize: 14 }}>{v.desc}</Body>
          </Card>
        ))}
      </View>

      <SectionHeader eyebrow="Roadmap" title="How we got here" />
      <View>
        {timeline.map((t, i) => (
          <View key={t.period} style={styles.timelineRow}>
            <View style={styles.rail}>
              <View style={[styles.node, { backgroundColor: colors.accent }]} />
              {i < timeline.length - 1 ? (
                <View style={[styles.line, { backgroundColor: colors.border }]} />
              ) : null}
            </View>
            <View style={{ flex: 1, paddingBottom: space.xl }}>
              <Badge label={t.period} />
              <Text style={[type.h2, { color: colors.fg, fontSize: 16, marginTop: 6 }]}>
                {t.title}
              </Text>
              <Body style={{ fontSize: 14 }}>{t.desc}</Body>
            </View>
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.sm,
    paddingVertical: 14,
    borderRadius: 14,
  },
  pillarHead: { flexDirection: 'row', alignItems: 'center', gap: space.md, marginBottom: 2 },
  iconWrap: { width: 38, height: 38, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  timelineRow: { flexDirection: 'row', gap: space.lg },
  rail: { alignItems: 'center', width: 12 },
  node: { width: 12, height: 12, borderRadius: 6, marginTop: 4 },
  line: { width: 2, flex: 1, marginTop: 4 },
});
