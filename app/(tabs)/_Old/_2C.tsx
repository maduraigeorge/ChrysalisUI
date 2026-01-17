import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    Easing,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    useWindowDimensions,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Logo from '@/components/chrysalis_logo';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const scale = useRef(new Animated.Value(1)).current;
  const rot = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(scale, { toValue: 1.06, duration: 1600, easing: Easing.inOut(Easing.sin), useNativeDriver: true, isInteraction: false }),
          Animated.timing(scale, { toValue: 0.98, duration: 1600, easing: Easing.inOut(Easing.sin), useNativeDriver: true, isInteraction: false }),
        ]),
        Animated.sequence([
          Animated.timing(rot, { toValue: 1, duration: 1600, easing: Easing.inOut(Easing.sin), useNativeDriver: true, isInteraction: false }),
          Animated.timing(rot, { toValue: -1, duration: 1600, easing: Easing.inOut(Easing.sin), useNativeDriver: true, isInteraction: false }),
        ]),
      ]),
      { iterations: -1 }
    );

    // start after tiny delay to avoid initial layout jank
    const timeout = setTimeout(() => anim.start(), 40);
    return () => {
      clearTimeout(timeout);
      anim.stop();
    };
  }, [scale, rot]);

  const rotation = rot.interpolate({ inputRange: [-1, 1], outputRange: ['-1deg', '1deg'] });

  // Responsive helpers
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const isNativeDark = isDark && Platform.OS !== 'web';
  const { width: winWidth, height: winHeight } = useWindowDimensions();
  const isPortrait = winHeight >= winWidth;
  const containerPadding = Math.max(16, Math.round(winWidth * 0.05));
  const maxContentWidth = Math.min(720, Math.max(320, winWidth - containerPadding * 2));
  const fontScale = Math.max(0.8, Math.min(1.25, winWidth / 375));
  const logoSize = Math.min(180, Math.max(56, Math.round(winWidth * (isPortrait ? 0.22 : 0.14))));
  const localSpacing = Math.round(12 * fontScale);
  const insets = useSafeAreaInsets();
  const username = 'Kabir';

  return (
    <View style={[styles.container, { paddingHorizontal: containerPadding }]}> 
      {/* BLOBS */}
      <View style={[styles.blob, styles.blobPurple, { top: isPortrait ? -80 : -120, left: isPortrait ? -80 : -40, width: isPortrait ? 260 : Math.round(winWidth * 0.45), height: isPortrait ? 260 : Math.round(winHeight * 0.6) }]} />
      <View style={[styles.blob, styles.blobBlue, { top: isPortrait ? winHeight * 0.45 : winHeight * 0.25, right: isPortrait ? -40 : -80, width: isPortrait ? 200 : Math.round(winWidth * 0.3), height: isPortrait ? 200 : Math.round(winHeight * 0.5) }]} />
      <View style={[styles.blob, styles.blobLight, { bottom: isPortrait ? -40 : -20, left: isPortrait ? winWidth * 0.25 : winWidth * 0.42, width: isPortrait ? 140 : Math.round(winWidth * 0.2), height: isPortrait ? 140 : Math.round(winWidth * 0.18) }]} />

      {/* STARS */}
      <MaterialIcons name="star-outline" size={32} style={styles.star1} />
      <MaterialIcons name="star-outline" size={20} style={styles.star2} />

      {isPortrait ? (
        <View style={[styles.card, { paddingHorizontal: Math.round(containerPadding / 2), maxWidth: maxContentWidth, paddingVertical: isPortrait ? 24 : 12, alignItems: 'center', justifyContent: 'space-between', minHeight: Math.round(isPortrait ? winHeight * 0.68 : winHeight * 0.82), paddingBottom: Math.round((isPortrait ? 16 * fontScale : 12 * fontScale) + (insets.bottom || 0)), flex: 1 }]}>
          {/* Logo aligned to top */}
          <View style={{ alignSelf: 'stretch', flexGrow: 1, justifyContent: 'flex-start', alignItems: 'center', paddingVertical: Math.round(6 * fontScale) }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: Math.round(8 * fontScale) }}>
              <View style={[styles.logoBox, { width: Math.round(logoSize * 0.72), height: Math.round(logoSize * 0.72), borderRadius: Math.round(logoSize * 0.18), marginBottom: 0 }] }>
                <Animated.View style={{ transform: [{ scale }, { rotate: rotation }] }}>
                  <Logo size={Math.round(logoSize * 0.65)} />
                </Animated.View>
              </View>

              <View style={{ marginLeft: 8, justifyContent: 'center' }}>
                <Text style={[styles.brand, { fontSize: Math.round(32 * fontScale), marginTop: 0, includeFontPadding: false }]}>Chrysalis</Text>
              </View>
            </View>

            {/* Middle large greeting */}
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={[styles.greetingLarge, { fontSize: Math.round(40 * fontScale) }]}>Hello {username}</Text>
              <Text style={[styles.greetingSubtitle, { fontSize: Math.round(14 * fontScale), marginTop: Math.round(8 * fontScale) }]}>Welcome back — pick an option</Text>
            </View>
          </View>

          {/* Bottom-aligned tiles + help */}
          <View style={{ alignSelf: 'stretch', marginTop: 'auto', paddingBottom: Math.round(Math.max(insets.bottom, 12 * fontScale)) }}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 }}>
              <View style={{ width: '48%', marginVertical: 6 }}>
                <TileButton color="#10B981" icon="supervisor-account" title="Parent Dashboard" subtitle="See your child's progress" onPress={() => console.log('Parent Dashboard')} />
              </View>

              <View style={{ width: '48%', marginVertical: 6 }}>
                <TileButton color="#8B5CF6" icon="account-circle" title={"Kabir's Dashboard"} subtitle="Personalized learning view" onPress={() => console.log("Kabir's Dashboard")} />
              </View>

              <View style={{ width: '48%', marginVertical: 6 }}>
                <TileButton color="#3B82F6" icon="library-books" title="Activity Library" subtitle="Browse activities & resources" onPress={() => console.log('Activity Library')} />
              </View>

              <View style={{ width: '48%', marginVertical: 6 }}>
                <TileButton color="#FBBF24" icon="school" title="Courseware" subtitle="Organized curriculum modules" onPress={() => console.log('Courseware')} />
              </View>
            </View>
          </View>
        </View>
      ) : (
        <ScrollView
          horizontal
          pagingEnabled
          snapToInterval={winWidth}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}
        >
          {/* Left: full-viewport panel with logo at top */}
          <View style={{ width: winWidth, justifyContent: 'flex-start', alignItems: 'center', paddingVertical: Math.round(12 * fontScale) }}>
            <View style={{ width: maxContentWidth, alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: Math.round(8 * fontScale) }}>
                <View style={[styles.logoBox, { width: Math.round(logoSize * 0.72), height: Math.round(logoSize * 0.72), borderRadius: Math.round(logoSize * 0.18), marginBottom: 0 }]}>
                  <Animated.View style={{ transform: [{ scale }, { rotate: rotation }] }}>
                    <Logo size={Math.round(logoSize * 0.65)} />
                  </Animated.View>
                </View>

                <View style={{ marginLeft: 8, justifyContent: 'center' }}>
                  <Text style={[styles.brand, { fontSize: Math.round(32 * fontScale), marginTop: 0, includeFontPadding: false }]}>Chrysalis</Text>
                </View>
              </View>

              {/* Middle large greeting for landscape */}
              <View style={{ height: Math.round(winHeight * 0.2), justifyContent: 'center', alignItems: 'center' }}>
                <Text style={[styles.greetingLarge, { fontSize: Math.round(36 * fontScale) }]}>Hello {username}</Text>
                <Text style={[styles.greetingSubtitle, { fontSize: Math.round(13 * fontScale), marginTop: Math.round(6 * fontScale) }]}>Welcome back — pick an option</Text>
              </View>
            </View>
          </View>

          {/* Right: full-viewport panel containing 2x2 tile buttons */}
          <View style={{ width: winWidth, justifyContent: 'center', alignItems: 'center', paddingVertical: Math.round(12 * fontScale) }}>
            <View style={{ width: maxContentWidth, alignItems: 'center', paddingBottom: Math.round(Math.max(insets.bottom, 12 * fontScale)) }}>
              <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 }}>
                <View style={{ width: '48%', marginVertical: 6 }}>
                  <TileButton color="#10B981" icon="supervisor-account" title="Parent Dashboard" subtitle="See your child's progress" onPress={() => console.log('Parent Dashboard')} />
                </View>

                <View style={{ width: '48%', marginVertical: 6 }}>
                  <TileButton color="#8B5CF6" icon="account-circle" title={"Kabir's Dashboard"} subtitle="Personalized learning view" onPress={() => console.log("Kabir's Dashboard")} />
                </View>

                <View style={{ width: '48%', marginVertical: 6 }}>
                  <TileButton color="#3B82F6" icon="library-books" title="Activity Library" subtitle="Browse activities & resources" onPress={() => console.log('Activity Library')} />
                </View>

                <View style={{ width: '48%', marginVertical: 6 }}>
                  <TileButton color="#FBBF24" icon="school" title="Courseware" subtitle="Organized curriculum modules" onPress={() => console.log('Courseware')} />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

/* ───────── BUTTONS ───────── */

function GradientButton({ colors, icon, title, subtitle }: any) {
  const { width: winWidth } = useWindowDimensions();
  const localScale = Math.max(0.85, Math.min(1.25, winWidth / 375));
  return (
    <TouchableOpacity activeOpacity={0.9}>
      <LinearGradient colors={colors} style={[styles.pill, { paddingVertical: Math.round(14 * localScale), paddingHorizontal: Math.round(18 * localScale), borderRadius: Math.round(999 * localScale) }]}>
        <View style={[styles.iconBox, { padding: Math.round(12 * localScale), borderRadius: Math.round(14 * localScale), backgroundColor: 'rgba(255,255,255,0.18)', width: Math.round(48 * localScale), height: Math.round(48 * localScale), justifyContent: 'center', alignItems: 'center' }]}>
          <MaterialIcons name={icon} size={Math.round(18 * localScale)} color="#fff" />
        </View>
        <ButtonText title={title} subtitle={subtitle} light />
      </LinearGradient>
    </TouchableOpacity>
  );
}

function SolidButton({ color, icon, title, subtitle }: any) {
  const { width: winWidth } = useWindowDimensions();
  const localScale = Math.max(0.85, Math.min(1.25, winWidth / 375));
  return (
    <TouchableOpacity activeOpacity={0.9}>
      <View style={[styles.pill, { backgroundColor: color, paddingVertical: Math.round(14 * localScale), paddingHorizontal: Math.round(18 * localScale), borderRadius: Math.round(999 * localScale) }]}>
        <View style={[styles.iconBox, { padding: Math.round(12 * localScale), borderRadius: Math.round(14 * localScale), backgroundColor: '#fff', width: Math.round(48 * localScale), height: Math.round(48 * localScale), justifyContent: 'center', alignItems: 'center' }]}>
          <MaterialIcons name={icon} size={Math.round(18 * localScale)} color="#92400e" />
        </View>
        <ButtonText title={title} subtitle={subtitle} dark />
      </View>
    </TouchableOpacity>
  );
}

function OutlineButton({ icon, title, subtitle }: any) {
  const { width: winWidth } = useWindowDimensions();
  const localScale = Math.max(0.85, Math.min(1.25, winWidth / 375));
  return (
    <TouchableOpacity activeOpacity={0.9}>
      <View style={[styles.pill, styles.outline, { paddingVertical: Math.round(14 * localScale), paddingHorizontal: Math.round(18 * localScale), borderRadius: Math.round(999 * localScale) }]}>
        <View style={[styles.iconBox, { padding: Math.round(12 * localScale), borderRadius: Math.round(14 * localScale), backgroundColor: '#EFF6FF', width: Math.round(48 * localScale), height: Math.round(48 * localScale), justifyContent: 'center', alignItems: 'center' }]}>
          <MaterialIcons name={icon} size={Math.round(18 * localScale)} color="#5D5FEF" />
        </View>
        <ButtonText title={title} subtitle={subtitle} />
      </View>
    </TouchableOpacity>
  );
}

function TileButton({ icon, title, subtitle, onPress, color }: any) {
  const { width: winWidth } = useWindowDimensions();
  const localScale = Math.max(0.85, Math.min(1.25, winWidth / 375));
  const borderColor = color ? `${color}22` : '#E6E6E6';
  return (
    <TouchableOpacity activeOpacity={0.92} onPress={onPress} accessibilityRole="button" accessibilityLabel={title}>
      <View style={[styles.tileButton, { padding: Math.round(18 * localScale), borderWidth: 1, borderColor: borderColor, backgroundColor: '#fff', borderRadius: 14 }]}>
        <View style={[styles.tileIcon, { width: Math.round(48 * localScale), height: Math.round(48 * localScale), borderRadius: Math.round(12 * localScale), backgroundColor: color || '#5D5FEF', shadowColor: color || '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.08, shadowRadius: 10, elevation: 4 }]}>
          <MaterialIcons name={icon} size={Math.round(24 * localScale)} color="#fff" />
        </View>
        <View style={{ marginTop: 12 }}>
          <Text style={[styles.tileTitle, { fontSize: Math.round(16 * localScale), fontWeight: '700' }]} numberOfLines={2}>{title}</Text>
          {subtitle ? <Text style={[styles.tileSub, { fontSize: Math.round(13 * localScale), color: '#6b7280' }]}>{subtitle}</Text> : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}

function IconBox({ children, light, outline }: any) {
  return (
    <View
      style={[
        styles.iconBox,
        light && { backgroundColor: 'rgba(255,255,255,0.2)' },
        outline && { backgroundColor: '#EFF6FF' },
      ]}
    >
      {children}
    </View>
  );
}

function ButtonText({ title, subtitle, light, dark }: any) {
  const { width: winWidth } = useWindowDimensions();
  const localScale = Math.max(0.85, Math.min(1.25, winWidth / 375));
  return (
    <View>
      <Text
        style={[
          styles.btnTitle,
          { fontSize: Math.round(16 * localScale) },
          light && { color: '#fff' },
          dark && { color: '#1e293b' },
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          styles.btnSub,
          { fontSize: Math.round(12 * localScale) },
          light && { color: 'rgba(255,255,255,0.8)' },
        ]}
      >
        {subtitle}
      </Text>
    </View>
  );
}

/* ───────── BUTTERFLY SVG ───────── */



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  blob: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.15,
  },
  blobPurple: {
    width: 260,
    height: 260,
    backgroundColor: '#C4B5FD',
    top: -80,
    left: -80,
  },
  blobBlue: {
    width: 200,
    height: 200,
    backgroundColor: '#93C5FD',
    top: height * 0.45,
    right: -40,
  },
  blobLight: {
    width: 140,
    height: 140,
    backgroundColor: '#BFDBFE',
    bottom: -40,
    left: width * 0.25,
  },

  star1: {
    position: 'absolute',
    top: height * 0.25,
    right: 40,
    color: 'rgba(93,95,239,0.2)',
  },
  star2: {
    position: 'absolute',
    top: height * 0.33,
    left: 48,
    color: 'rgba(93,95,239,0.2)',
  },

  card: {
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  logoBox: {
    width: 176,
    height: 176,
    backgroundColor: '#fff',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#93C5FD',
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 8,
    transform: [{ translateY: 20 }],
  },

  welcome: {
    fontSize: 20,
    color: '#64748B',
  },
  brand: {
    fontSize: 52,
    fontWeight: '800',
    color: '#5D5FEF',
    marginTop: -4,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
  },

  buttons: {
    width: '100%',
    marginTop: 28,
    gap: 8,
  },

  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 999,
    gap: 16,
  },

  outline: {
    borderWidth: 2,
    borderColor: '#5D5FEF',
    backgroundColor: '#fff',
  },

  iconBox: {
    padding: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },

  btnTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
  },
  btnSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },

  help: {
    marginTop: 14,
    fontSize: 14,
    color: '#94A3B8',
  },

  greetingLarge: {
    fontWeight: '900',
    textAlign: 'center',
  },

  titleBar: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'flex-start',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
  },

  tileButton: {
    backgroundColor: '#fff',
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 4,
    padding: 16,
    alignItems: 'flex-start',
  },
  tileIcon: {
    backgroundColor: '#5D5FEF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  tileTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    width: '100%'
  },
  tileSub: {
    color: '#6b7280',
    marginTop: 4,
  },
  greetingSubtitle: {
    color: '#64748B',
  }
});