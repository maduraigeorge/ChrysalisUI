import { Tabs } from 'expo-router';
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons, MaterialIcons, MaterialCommunityIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';

import { HapticTab } from '@/components/haptic-tab';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  // Load icon fonts so vector icons are available before rendering the tabs
  const [fontsLoaded] = useFonts({
    ...Ionicons.font,
    ...MaterialIcons.font,
    ...MaterialCommunityIcons.font,
    ...FontAwesome.font,
    ...FontAwesome5.font,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

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

