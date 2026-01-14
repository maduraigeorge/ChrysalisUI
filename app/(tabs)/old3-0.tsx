import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useColorScheme,
  Dimensions,
  SafeAreaView,
  Platform,
  Animated,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
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
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>

      {/* Background decorations removed for cleaner layout */}

      {/* Center content */}
      <View style={[styles.centerBlock, styles.content]}>
        <View style={[styles.logoCard, isDark && styles.logoCardDark]}>
          <BlurView intensity={40} tint={isDark ? 'dark' : 'light'} style={styles.logoBlur} />
          <Animated.View style={{ transform: [{ scale }] }}>
            <Logo size={120} />
          </Animated.View>
        </View>

        <Text style={[styles.title, { maxWidth: Math.min(540, width - 48) }, isDark && styles.textDark]}>
          Welcome to <Text style={styles.primary}>Chrysalis</Text>
        </Text>
        <Text style={[styles.subtitle, isDark && styles.textDark]}>Growing together through learning.</Text>
        <View style={{ height: 28 }} />
      </View>

      {/* Bottom buttons */}
      <View style={[styles.bottomArea, styles.content]}>
        <PrimaryButton
          icon="business-outline"
          title="School Account Login"
          subtitle="Sign in with school credentials"
          onPress={() => console.log('School Account')}
        />

        <SecondaryButton
          icon="person-outline"
          title="Personal Account"
          subtitle="Sign in with a personal account"
          onPress={() => console.log('Personal Account')}
        />

        <Pressable onPress={() => console.log('Create Account')} accessibilityRole="link" accessibilityLabel="Create Account" style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1, marginTop: 8, alignSelf: 'center' }]}> 
          <Text style={[styles.createLink, isDark && { color: '#cbd5e1' }]}>New to Chrysalis? Create an Account</Text>
        </Pressable>

        <Pressable onPress={() => console.log('Contact Help')} accessibilityRole="link" accessibilityLabel="Need help choosing" style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1, marginTop: 6, alignSelf: 'center' }]}> 
          <Text style={[styles.helpText, isDark && { color: 'rgba(255,255,255,0.75)' }]}>Need help choosing? Contact us at help@chrysalis.one</Text>
        </Pressable>
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
  textDark: {
    color: '#fff',
  },
  primary: {
    color: '#6366f1',
    fontSize: 44,
    fontWeight: '900',
  },
  subtitle: {
    fontSize: 18,
    color: '#64748b',
    textAlign: 'center',
    maxWidth: 280,
    marginTop: 12,
  },

  bottomArea: {
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    gap: 4,
    width: '100%',
    paddingHorizontal: 4,
    alignSelf: 'stretch',
    marginTop: 6,
    minHeight: height * 0.45,
    justifyContent: 'flex-end',
  },

  buttonBase: {
    flexDirection: 'row',
    gap: 12,
    padding: 14,
    borderRadius: 28,
    alignItems: 'center',
    width: '100%',
    marginVertical: 0,
  },

  helpText: {
    textAlign: 'center',
    fontSize: 13,
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
    paddingVertical: 12,
    paddingHorizontal: 16,
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

function SecondaryButton({ icon, title, subtitle, onPress }: ButtonProps) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      style={({ pressed }) => [
        styles.buttonBase,
        styles.secondaryBtn,
        { opacity: pressed ? 0.96 : 1, transform: [{ scale: pressed ? 0.998 : 1 }] },
      ]}
    >
      <View style={[styles.iconWrapper, { backgroundColor: isDark ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.06)' }]}>
        <Ionicons name={icon} size={20} color={isDark ? '#c7b4ff' : '#6366f1'} />
      </View>
      <View>
        <Text style={[styles.btnTitle, isDark && { color: '#fff' }]}>{title}</Text>
        <Text style={[styles.btnSubtitle, isDark && { color: 'rgba(255,255,255,0.8)' }]}>{subtitle}</Text>
      </View>
    </Pressable>
  );
}

function GhostButton({ icon, title, subtitle, onPress }: ButtonProps) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      style={({ pressed }) => [
        styles.buttonBase,
        styles.ghostBtn,
        { opacity: pressed ? 0.95 : 1, transform: [{ scale: pressed ? 0.998 : 1 }] },
      ]}
    >
      <View style={[styles.iconWrapper, { backgroundColor: isDark ? 'rgba(251,191,36,0.08)' : '#fef3c7' }]}>
        <Ionicons name={icon} size={24} color={isDark ? '#ffd873' : '#fbbf24'} />
      </View>
      <View>
        <Text style={[styles.btnTitle, isDark && { color: '#fff' }]}>{title}</Text>
        <Text style={[styles.btnSubtitle, isDark && { color: 'rgba(255,255,255,0.85)' }]}>{subtitle}</Text>
      </View>
    </Pressable>
  );
}
