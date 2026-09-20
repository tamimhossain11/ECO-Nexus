/** Small shared primitives that give every screen the site's glass-card look. */
import { ReactNode } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { space, type, useTheme } from '../lib/theme';

export function Card({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.surface, borderColor: colors.border },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export function Badge({ label, tone }: { label: string; tone?: string }) {
  const { colors } = useTheme();
  const c = tone ?? colors.accent;
  return (
    <View style={[styles.badge, { backgroundColor: c + '22', borderColor: c + '55' }]}>
      <Text style={[type.small, { color: c, fontSize: 12 }]}>{label}</Text>
    </View>
  );
}

export function SectionHeader({ eyebrow, title }: { eyebrow?: string; title: string }) {
  const { colors } = useTheme();
  return (
    <View style={{ marginBottom: space.lg, marginTop: space.xl }}>
      {eyebrow ? (
        <Text style={[type.small, styles.eyebrow, { color: colors.accent }]}>
          {eyebrow.toUpperCase()}
        </Text>
      ) : null}
      <Text style={[type.h1, { color: colors.fg }]}>{title}</Text>
    </View>
  );
}

export function Body({ children, style }: { children: ReactNode; style?: StyleProp<TextStyle> }) {
  const { colors } = useTheme();
  return <Text style={[type.body, { color: colors.muted }, style]}>{children}</Text>;
}

/** A labelled figure — used for drone specs and flight readouts. */
export function Stat({ value, unit, label }: { value: string; unit?: string; label: string }) {
  const { colors } = useTheme();
  return (
    <Card style={{ flex: 1, minWidth: 150 }}>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 3 }}>
        <Text style={[type.h1, { color: colors.fg }]}>{value}</Text>
        {unit ? <Text style={[type.small, { color: colors.accent }]}>{unit}</Text> : null}
      </View>
      <Text style={[type.small, { color: colors.muted, marginTop: 2 }]}>{label}</Text>
    </Card>
  );
}

/** Bulleted point with the brand dot, matching the site's pillar lists. */
export function Bullet({ children }: { children: ReactNode }) {
  const { colors } = useTheme();
  return (
    <View style={styles.bulletRow}>
      <View style={[styles.dot, { backgroundColor: colors.accent }]} />
      <Text style={[type.body, { color: colors.muted, flex: 1, fontSize: 14 }]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    borderWidth: 1,
    padding: space.lg,
    gap: 6,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  eyebrow: { letterSpacing: 1.4, fontSize: 11, marginBottom: 6 },
  bulletRow: { flexDirection: 'row', gap: space.md, alignItems: 'flex-start' },
  dot: { width: 6, height: 6, borderRadius: 3, marginTop: 8 },
});
