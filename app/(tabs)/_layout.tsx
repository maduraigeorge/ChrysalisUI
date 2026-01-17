import { Tabs } from 'expo-router';
import React from 'react';
import * as Haptics from 'expo-haptics';
import { View, ActivityIndicator, TouchableOpacity, Text, ScrollView } from 'react-native';
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

  // Custom tab bar: filters out hidden routes (names starting with '_'), sorts numerically when possible or falls back to alphabetical,
  // and renders only the current valid tabs. Adds a small haptic tap on press.
  function CustomTabBar({ state, descriptors, navigation, tabBarBackground }: any) {
    // toggle to show tabs under the _Old folder (and other hidden ones)
    const [showOld, setShowOld] = React.useState(false);

    // base routes: exclude hidden ones by default
    const baseRoutes = state.routes.filter((r: any) => !(r.name || '').startsWith('_') && descriptors[r.key]);

    // when toggled, include routes from the `_Old` folder or any hidden routes
    let validRoutes = baseRoutes;
    if (showOld) {
      const oldRoutes = state.routes.filter((r: any) => ((r.name || '').includes('_Old') || (r.name || '').startsWith('_')) && descriptors[r.key]);
      // merge while keeping baseRoutes order, then append old routes that aren't already included
      const appended = oldRoutes.filter((or: any) => !baseRoutes.some((br: any) => br.key === or.key));
      validRoutes = [...baseRoutes, ...appended];
    }

    // determine if numeric ordering is appropriate across the visible set
    const hasNumericPrefix = validRoutes.some((r: any) => /^\d+/.test(r.name));

    const sortedRoutes = [...validRoutes].sort((a: any, b: any) => {
      if (hasNumericPrefix) {
        const na = parseInt((a.name.match(/^\d+/) || [''])[0] || '0', 10) || 0;
        const nb = parseInt((b.name.match(/^\d+/) || [''])[0] || '0', 10) || 0;
        if (na !== nb) return na - nb;
        return String(a.name).localeCompare(String(b.name));
      }
      return String(a.name).localeCompare(String(b.name));
    });

    // helper to format label — strip numeric prefixes/counters so only the name shows
    function formatLabel(route: any) {
      const raw = String(route.name || '');
      const customLabel = descriptors[route.key]?.options?.tabBarLabel;

      // detect if this route is part of the old set (starts with _ or includes _Old)
      const isOld = raw.startsWith('_') || raw.includes('_Old');

      if (isOld) {
        // get filename part
        const seg = raw.split('/').pop() || raw;
        // strip leading underscores
        let name = seg.replace(/^_+/, '');
        // strip leading numeric counters like 1., 01-, 2_, etc
        name = name.replace(/^[\d\.\-_ ]+/, '');
        // replace dashes/underscores with spaces
        name = name.replace(/[_\-]+/g, ' ').trim();
        return name || seg;
      }

      // default behaviour: strip any leading numeric counters and punctuation, show rest
      const m = raw.match(/^(?:\d+[\.\-_ ]*)?(.*)$/);
      const restFromName = (m && m[1]) ? (m[1] as string).trim() : raw;
      const rest = (customLabel && String(customLabel)) || restFromName || raw;
      // if rest is empty fallback to raw
      return rest;
    }

    return (
      <View style={{ paddingVertical: 8, backgroundColor: tabBarBackground, borderTopWidth: 0, elevation: 0, shadowOpacity: 0 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 8 }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {sortedRoutes.map((route: any) => {
              const isFocused = state.routes[state.index]?.key === route.key;
              const label = formatLabel(route);

              const onPress = () => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                navigation.navigate(route.name);
              };

              return (
                <TouchableOpacity
                  key={route.key}
                  accessibilityRole="button"
                  accessibilityState={isFocused ? { selected: true } : {}}
                  onPress={onPress}
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 14,
                    borderRadius: 999,
                    marginHorizontal: 6,
                    minWidth: 64,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isFocused ? 'rgba(107,114,128,0.1)' : 'transparent',
                  }}
                >
                  <Text style={{ color: isFocused ? '#6b7280' : '#374151', fontWeight: isFocused ? '700' : '600' }}>{label}</Text>
                </TouchableOpacity>
              );
            })}

            {/* plus / toggle control at end to reveal _Old tabs */}
            <TouchableOpacity
              onPress={() => setShowOld(prev => !prev)}
              accessibilityRole="button"
              accessibilityLabel="Toggle old tabs"
              style={{ paddingVertical: 8, paddingHorizontal: 12, marginLeft: 6, borderRadius: 999, backgroundColor: showOld ? 'rgba(107,114,128,0.1)' : 'transparent' }}
            >
              <Text style={{ color: showOld ? '#6b7280' : '#374151', fontWeight: '700' }}>{showOld ? '×' : '+'}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

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
        });
      }}
      tabBar={(props) => <CustomTabBar {...props} tabBarBackground={tabBarBackground} />}
    />
  );
}

