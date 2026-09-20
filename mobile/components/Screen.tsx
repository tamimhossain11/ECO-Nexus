/** Scrolling page shell: safe-area aware, themed, with a branded title block. */
import { ReactNode } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { space, type, useTheme } from '../lib/theme';

export function Screen({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow?: string;
  children: ReactNode;
}) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + space.lg,
          paddingBottom: space.xxl * 2,
          paddingHorizontal: space.lg,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.head}>
          {eyebrow ? (
            <Text style={[type.small, styles.eyebrow, { color: colors.accent }]}>
              {eyebrow.toUpperCase()}
            </Text>
          ) : null}
          <Text style={[type.display, { color: colors.fg }]}>{title}</Text>
        </View>
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  head: { marginBottom: space.lg },
  eyebrow: { letterSpacing: 1.6, fontSize: 11, marginBottom: 6 },
});
