import Ionicons from '@expo/vector-icons/Ionicons';
import * as Linking from 'expo-linking';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Body, Card, SectionHeader } from '../../components/ui';
import { Screen } from '../../components/Screen';
import { space, type, useTheme } from '../../lib/theme';
import { faqs, site } from '@shared/site';

type IconName = keyof typeof Ionicons.glyphMap;

export default function Contact() {
  const { colors } = useTheme();

  const open = (url: string) => {
    // A device without a mail or dialler app would otherwise throw.
    Linking.openURL(url).catch(() => {});
  };

  const rows: { icon: IconName; label: string; value: string; url: string }[] = [
    { icon: 'mail', label: 'Email', value: site.email, url: `mailto:${site.email}` },
    { icon: 'call', label: 'Phone', value: site.phone, url: `tel:${site.phone.replace(/\s/g, '')}` },
    {
      icon: 'location',
      label: 'Lab',
      value: site.address,
      url: `https://maps.google.com/?q=${encodeURIComponent(site.address)}`,
    },
  ];

  return (
    <Screen eyebrow="Get in touch" title="Contact">
      <Body style={{ marginBottom: space.lg }}>
        Sponsorships, field demos and research collaboration — we answer every message.
      </Body>

      <View style={{ gap: space.md }}>
        {rows.map((r) => (
          <Pressable key={r.label} onPress={() => open(r.url)}>
            <Card>
              <View style={styles.row}>
                <View style={[styles.iconWrap, { backgroundColor: colors.accent + '1f' }]}>
                  <Ionicons name={r.icon} size={19} color={colors.accent} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[type.small, { color: colors.muted, fontSize: 12 }]}>{r.label}</Text>
                  <Text style={[type.h2, { color: colors.fg, fontSize: 15 }]}>{r.value}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.muted} />
              </View>
            </Card>
          </Pressable>
        ))}
      </View>

      <SectionHeader eyebrow="Elsewhere" title="Follow the build" />
      <View style={styles.socials}>
        {site.socials.map((s) => (
          <Pressable
            key={s.label}
            onPress={() => open(s.href)}
            style={[styles.social, { borderColor: colors.border, backgroundColor: colors.surface }]}
          >
            <Text style={[type.small, { color: colors.fg }]}>{s.label}</Text>
          </Pressable>
        ))}
      </View>

      <SectionHeader eyebrow="Questions" title="FAQ" />
      <View style={{ gap: space.md }}>
        {faqs.map((f) => (
          <Card key={f.q}>
            <Text style={[type.h2, { color: colors.fg, fontSize: 15 }]}>{f.q}</Text>
            <Body style={{ fontSize: 14 }}>{f.a}</Body>
          </Card>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: space.md },
  iconWrap: { width: 38, height: 38, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  socials: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm },
  social: { paddingHorizontal: 16, paddingVertical: 9, borderRadius: 999, borderWidth: 1 },
});
