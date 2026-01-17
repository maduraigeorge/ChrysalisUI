import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  useWindowDimensions,
  View,
} from 'react-native';
import Logo from '../../components/chrysalis_logo';

const { width, height } = Dimensions.get('window');

type IconName = React.ComponentProps<typeof Ionicons>['name'];

type ButtonProps = {
  icon: IconName;
  title: string;
  subtitle?: string;
  onPress?: () => void;
};

export default function WelcomeScreen() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const isNativeDark = isDark && Platform.OS !== 'web';

  // responsive padding helper (fix for 'containerPadding' undefined)
  const { width: winWidth, height: winHeight } = useWindowDimensions();
  const containerPadding = Math.max(16, Math.round(winWidth * 0.05));

  const scale = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.06, duration: 900, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(scale, { toValue: 0.98, duration: 900, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [scale]);

  return (
    <SafeAreaView style={[styles.container, (isDark && Platform.OS !== 'web') && styles.containerDark, { paddingHorizontal: containerPadding, paddingVertical: Math.round(Platform.OS === 'ios' ? Math.max(20, winHeight * 0.03) : 16) }]}>
      {/* Child-friendly background decorations */}
      <BackgroundShapes isDark={isNativeDark} />

      {/* Center content */}
      <View style={[styles.centerBlock, styles.content]}>
        <View style={[styles.logoCard, isNativeDark && styles.logoCardDark]}>
          <BlurView intensity={40} tint={isNativeDark ? 'dark' : 'light'} style={styles.logoBlur} />
          <Animated.View style={{ transform: [{ scale }] }}>
            <Logo size={120} />
          </Animated.View>
        </View>

        <Text style={[styles.title, { maxWidth: Math.min(540, width - 48) }, isNativeDark && styles.textDark]}>
          <Text style={styles.titleLight}>Welcome to </Text>
          <Text style={styles.primary}>Chrysalis</Text>
        </Text>
        <Text style={[styles.subtitle, isNativeDark && styles.textDark]}>Adaptive learning for every child.</Text>
        <View style={{ height: 28 }} />
      </View>

      {/* Bottom buttons */}
      <View style={[styles.bottomArea, styles.content]}>
        <PrimaryButton
          icon="business-outline"
          title="School Account"
          subtitle="Sign in with school credentials"
          onPress={() => console.log('School Account')}
        />

        <SecondaryButton
          icon="person-outline"
          title="Personal Account"
          subtitle="Sign in with a personal account"
          onPress={() => console.log('Personal Account')}
        />

        <GhostButton
          icon="add-circle-outline"
          title="Create Account"
          subtitle="New here? Set up your subscription"
          onPress={() => console.log('Create Account')}
        />

        <Text style={[styles.helpText, isNativeDark && { color: 'rgba(255,255,255,0.75)' }]}>Need help choosing?</Text>

      </View> 
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafaff',
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  containerDark: {
    backgroundColor: '#020617',
  },

  floatingIcon: {
    position: 'absolute',
    opacity: 0.15,
    zIndex: -1,
  },

  centerBlock: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 36,
    paddingBottom: 12,
    minHeight: 220,
  },

  logoCard: {
    width: 128,
    height: 128,
    borderRadius: 32,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    elevation: 10,
    // iOS shadow
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    transform: [{ translateY: 20 }],
  },
  logoCardDark: {
    backgroundColor: '#071129',
  },
  logoBlur: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 32,
  },

  content: {
    width: '100%',
    maxWidth: 540,
    alignSelf: 'center',
    paddingHorizontal: 12,
  },

  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#0f172a',
    textAlign: 'center',
  },
  titleLight: {
    fontSize: 36,
    fontWeight: '300',
  },
  textDark: {
    color: '#fff',
  },
  primary: {
    color: '#6366f1',
    fontSize: 44,
    fontWeight: '900',
    fontFamily: 'Futura',
  },
  subtitle: {
    fontSize: 18,
    color: '#64748b',
    textAlign: 'center',
    maxWidth: 280,
    marginTop: 12,
  },

  bottomArea: {
    paddingBottom: Platform.OS === 'ios' ? 28 : 12,
    gap: 0,
    width: '100%',
    paddingHorizontal: 4,
    alignSelf: 'stretch',
    marginTop: 6,
    minHeight: height * 0.40,
    justifyContent: 'flex-end',
    transform: [{ translateY: 16 }],
  },

  buttonBase: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 28,
    alignItems: 'center',
    width: '92%',
    alignSelf: 'center',
    marginVertical: 6,
  },

  helpText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
    paddingBottom: Platform.OS === 'ios' ? 8 : 6,
    marginBottom: Platform.OS === 'ios' ? 12 : 8,
  },

  primaryBtn: {
    // fallback color if gradient not supported
    backgroundColor: '#6366f1',
  },
  primaryGradient: {
    borderRadius: 28,
  },

  secondaryGradient: {
    borderRadius: 28,
  },

  secondaryBtn: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#6366f1',
  },

  createLink: {
    fontSize: 13,
    color: '#6366f1',
    fontWeight: '700',
  },

  line: {
    height: 1,
    flex: 1,
    backgroundColor: '#e5e7eb',
  },

  lineDark: {
    backgroundColor: 'rgba(255,255,255,0.06)',
  },

  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 0,
  },

  orText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '700',
    paddingHorizontal: 8,
  },

  ghostBtn: {
    backgroundColor: 'transparent',
  },

  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },

  btnTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  btnSubtitle: {
    fontSize: 12,
    opacity: 0.85,
  },

  titleSpacer: {
    height: 28,
  },
  /* Background shapes */
  bgContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  blob: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.85,
    width: 280,
    height: 280,
  },
  blobTopLeft: {
    top: -60,
    left: -60,
    transform: [{ scale: 0.9 }],
    opacity: 0.7,
  },
  blobBottomRight: {
    bottom: -100,
    right: -40,
    width: 220,
    height: 220,
    opacity: 0.6,
  },
  dot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 8,
    opacity: 0.95,
  },
  icon: {
    position: 'absolute',
    opacity: 0.92,
  },

  helpChoice: {
    textAlign: 'center',
    fontSize: 15,
    color: '#475569',
    marginTop: 10,
    fontWeight: '700',
  },
});

function PrimaryButton({ icon, title, subtitle, onPress }: ButtonProps) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      style={({ pressed }) => [{ opacity: pressed ? 0.92 : 1, transform: [{ scale: pressed ? 0.996 : 1 }] }]}
    >
      <LinearGradient colors={['#7c3aed', '#6366f1']} start={[0, 0]} end={[1, 1]} style={[styles.buttonBase, styles.primaryGradient]}>
        <View style={[styles.iconWrapper, { backgroundColor: 'rgba(255,255,255,0.18)' }]}> 
          <Ionicons name={icon} size={20} color="#fff" />
        </View>
        <View>
          <Text style={[styles.btnTitle, { color: '#fff' }]}>{title}</Text>
          <Text style={[styles.btnSubtitle, { color: 'rgba(255,255,255,0.9)' }]}>{subtitle}</Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

function BackgroundShapes({ isDark }: { isDark: boolean }) {
  const blob1 = isDark ? 'rgba(99,102,241,0.08)' : 'rgba(124,58,237,0.12)';
  const blob2 = isDark ? 'rgba(14,165,233,0.06)' : 'rgba(14,165,233,0.08)';
  const accent = isDark ? 'rgba(99,102,241,0.14)' : 'rgba(99,102,241,0.18)';

  return (
    <View pointerEvents="none" style={styles.bgContainer}>
      <View style={[styles.blob, styles.blobTopLeft, { backgroundColor: blob1 }]} />
      <View style={[styles.blob, styles.blobBottomRight, { backgroundColor: blob2 }]} />

      <View style={[styles.dot, { left: 28, top: 120, backgroundColor: accent }]} />
      <View style={[styles.dot, { right: 48, top: 200, backgroundColor: accent }]} />

      <MaterialCommunityIcons name="star-outline" size={28} color={accent} style={[styles.icon, { left: width * 0.72, top: 140 }]} />
      <MaterialCommunityIcons name="balloon" size={26} color={accent} style={[styles.icon, { left: width * 0.18, top: height * 0.56 }]} />
    </View>
  );
}

function SecondaryButton({ icon, title, subtitle, onPress }: ButtonProps) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      style={({ pressed }) => [{ opacity: pressed ? 0.92 : 1, transform: [{ scale: pressed ? 0.996 : 1 }] }]}
    >
      <LinearGradient colors={['#FDE68A', '#F9C74F']} start={[0, 0]} end={[1, 1]} style={[styles.buttonBase, styles.secondaryGradient]}>
        <View style={[styles.iconWrapper, { backgroundColor: '#fff' }]}> 
          <Ionicons name={icon} size={22} color="#F59E0B" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.btnTitle, { color: '#111827' }]}>{title}</Text>
          <Text style={[styles.btnSubtitle, { color: '#374151' }]}>{subtitle}</Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

function GhostButton({ icon, title, subtitle, onPress }: ButtonProps) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const isNativeDark = isDark && Platform.OS !== 'web';

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      style={({ pressed }) => [
        styles.buttonBase,
        isNativeDark
          ? { backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' }
          : styles.secondaryBtn,
        { opacity: pressed ? 0.96 : 1, transform: [{ scale: pressed ? 0.998 : 1 }] },
      ]}
    >
      <View style={[styles.iconWrapper, { backgroundColor: isNativeDark ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.06)' }]}> 
        <Ionicons name={icon} size={22} color={isNativeDark ? '#c7b4ff' : '#6366f1'} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.btnTitle, isNativeDark ? { color: '#fff' } : { color: '#111827' }]}>{title}</Text>
        <Text style={[styles.btnSubtitle, isNativeDark ? { color: 'rgba(255,255,255,0.85)' } : { color: '#374151' }]}>{subtitle}</Text>
      </View>
    </Pressable>
  );
}