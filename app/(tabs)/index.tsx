import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Logo from '../../components/chrysalis_logo';

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

  return (
    <View style={styles.container}>
      {/* BLOBS */}
      <View style={[styles.blob, styles.blobPurple]} />
      <View style={[styles.blob, styles.blobBlue]} />
      <View style={[styles.blob, styles.blobLight]} />

      {/* STARS */}
      <MaterialIcons name="star-outline" size={32} style={styles.star1} />
      <MaterialIcons name="star-outline" size={20} style={styles.star2} />

      <View style={styles.card}>
        {/* LOGO */}
        <View style={styles.logoBox}>
          <Animated.View style={{ transform: [{ scale }, { rotate: rotation }] }}>
            <Logo size={120} />
          </Animated.View>
        </View>

        {/* TEXT */}
        <Text style={styles.welcome}>Welcome to</Text>
        <Text style={styles.brand}>Chrysalis</Text>
        <Text style={styles.subtitle}>
          Adaptive learning for every child.
        </Text>

        <View style={{ height: 28 }} />

        {/* BUTTONS */}
        <View style={styles.buttons}>
          <GradientButton
            colors={['#8B5CF6', '#5D5FEF']}
            icon="domain"
            title="School Account"
            subtitle="Sign in with school credentials"
            light
          />

          <SolidButton
            color="#FBBF24"
            icon="person"
            title="Personal Account"
            subtitle="Sign in with a personal account"
          />

          <OutlineButton
            icon="add"
            title="Create Account"
            subtitle="New here? Set up your subscription"
          />
        </View>

        <Text style={styles.help}>Need help choosing?</Text>
      </View>
    </View>
  );
}

/* ───────── BUTTONS ───────── */

function GradientButton({ colors, icon, title, subtitle }: any) {
  return (
    <TouchableOpacity activeOpacity={0.9}>
      <LinearGradient colors={colors} style={styles.pill}>
        <IconBox>
          <MaterialIcons name={icon} size={22} color="#fff" />
        </IconBox>
        <ButtonText title={title} subtitle={subtitle} light />
      </LinearGradient>
    </TouchableOpacity>
  );
}

function SolidButton({ color, icon, title, subtitle }: any) {
  return (
    <TouchableOpacity activeOpacity={0.9}>
      <View style={[styles.pill, { backgroundColor: color }]}>
        <IconBox light>
          <MaterialIcons name={icon} size={22} color="#92400e" />
        </IconBox>
        <ButtonText title={title} subtitle={subtitle} dark />
      </View>
    </TouchableOpacity>
  );
}

function OutlineButton({ icon, title, subtitle }: any) {
  return (
    <TouchableOpacity activeOpacity={0.9}>
      <View style={[styles.pill, styles.outline]}>
        <IconBox outline>
          <MaterialIcons name={icon} size={22} color="#5D5FEF" />
        </IconBox>
        <ButtonText title={title} subtitle={subtitle} />
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
  return (
    <View>
      <Text
        style={[
          styles.btnTitle,
          light && { color: '#fff' },
          dark && { color: '#1e293b' },
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          styles.btnSub,
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
});