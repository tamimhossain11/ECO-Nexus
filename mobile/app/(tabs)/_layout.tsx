import Ionicons from '@expo/vector-icons/Ionicons';
// SDK 57 deprecates the `Tabs` re-export from 'expo-router' itself.
import { Tabs } from 'expo-router/js-tabs';
import { useTheme } from '../../lib/theme';

type IconName = keyof typeof Ionicons.glyphMap;

const tabs: { name: string; title: string; icon: IconName }[] = [
  { name: 'index', title: 'Home', icon: 'home' },
  { name: 'drone', title: 'Drone', icon: 'navigate' },
  { name: 'live', title: 'Live', icon: 'pulse' },
  { name: 'team', title: 'Team', icon: 'people' },
  { name: 'contact', title: 'Contact', icon: 'mail' },
];

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: colors.bg,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      }}
    >
      {tabs.map(({ name, title, icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ color, size }) => <Ionicons name={icon} size={size} color={color} />,
          }}
        />
      ))}
    </Tabs>
  );
}
