import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';
import { Badge, Body, Card, SectionHeader } from '../../components/ui';
import { Screen } from '../../components/Screen';
import { space, type, useTheme } from '../../lib/theme';
import { mentors, site, team, type Member } from '@shared/site';

/**
 * `Member.photo` holds a web public path (`/Rafsan.jpeg`). Metro needs a
 * static `require`, so the same images are bundled under assets/team and
 * matched here by filename. A member with no entry falls back to initials.
 */
const photos: Record<string, ReturnType<typeof require>> = {
  '/Rafsan.jpeg': require('../../assets/team/Rafsan.jpeg'),
  '/raiyan.jpeg': require('../../assets/team/raiyan.jpeg'),
};

export default function Team() {
  const { colors } = useTheme();

  return (
    <Screen eyebrow={site.competition} title="The Team">
      <Body style={{ marginBottom: space.sm }}>
        Students building autonomous environmental hardware out of {site.country}.
      </Body>

      <View style={{ gap: space.md, marginTop: space.lg }}>
        {team.map((m) => (
          <MemberCard key={m.name} member={m} />
        ))}
      </View>

      <SectionHeader eyebrow="Guidance" title="Mentors" />
      <View style={{ gap: space.md }}>
        {mentors.map((m) => (
          <Card key={m.name}>
            <Text style={[type.h2, { color: colors.fg, fontSize: 16 }]}>{m.name}</Text>
            <Text style={[type.small, { color: colors.muted }]}>{m.role}</Text>
          </Card>
        ))}
      </View>
    </Screen>
  );
}

function MemberCard({ member }: { member: Member }) {
  const { colors } = useTheme();
  const source = member.photo ? photos[member.photo] : undefined;

  return (
    <Card>
      <View style={styles.head}>
        {source ? (
          <Image source={source} style={styles.avatar} contentFit="cover" transition={200} />
        ) : (
          <View style={[styles.avatar, styles.initials, { backgroundColor: colors.accent + '22' }]}>
            <Text style={[type.h1, { color: colors.accent, fontSize: 20 }]}>{member.initials}</Text>
          </View>
        )}
        <View style={{ flex: 1, gap: 2 }}>
          <Text style={[type.h2, { color: colors.fg, fontSize: 17 }]}>{member.name}</Text>
          <Text style={[type.small, { color: colors.accent }]}>{member.role}</Text>
          <Text style={[type.small, { color: colors.muted, fontSize: 12 }]}>
            {member.grade} · {member.school}
          </Text>
        </View>
      </View>

      {member.bio ? <Body style={{ fontSize: 14, marginTop: space.sm }}>{member.bio}</Body> : null}

      {member.tags.length > 0 ? (
        <View style={styles.tags}>
          {member.tags.map((t) => (
            <Badge key={t} label={t} />
          ))}
        </View>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  head: { flexDirection: 'row', gap: space.lg, alignItems: 'center' },
  avatar: { width: 66, height: 66, borderRadius: 20 },
  initials: { alignItems: 'center', justifyContent: 'center' },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm, marginTop: space.md },
});
