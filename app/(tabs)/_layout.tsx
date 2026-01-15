import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const tabBarBackground = colorScheme === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.9)';

  return (
    <Tabs
      // Let the file-system router generate tabs under this folder dynamically.
      // Tab labels are set from the filename via the route name.
      screenOptions={({ route }) => {
        const isHidden = route?.name?.startsWith?.('_');
        return ({
          headerShown: false,
          tabBarLabel: isHidden ? undefined : route.name,
          tabBarActiveTintColor: '#0f172a',
          tabBarInactiveTintColor: '#374151',
          tabBarStyle: { backgroundColor: tabBarBackground, borderTopWidth: 0, elevation: 0, shadowOpacity: 0 },
          tabBarButton: isHidden ? () => null : HapticTab,
        });
      }}
    />
  );
}

