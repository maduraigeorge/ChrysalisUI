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
  ScrollView,
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
      {/* Decorative background */}
      <BackgroundShapes isDark={isDark} />

      {/* Header bar */}
      <View style={styles.headerBar}>
        <Pressable onPress={() => console.log('Home')} accessibilityRole="button" accessibilityLabel="Home">
          <Ionicons name="home-outline" size={26} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>Parent Dashboard</Text>
        <Pressable onPress={() => console.log('Settings')} accessibilityRole="button" accessibilityLabel="Settings">
          <Ionicons name="settings-outline" size={22} color="#fff" />
        </Pressable>
      </View>

      <View style={styles.containerInner}>
        <Animated.View style={{ transform: [{ scale }] }} />

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Activities</Text>
            <Text style={styles.sectionCount}>8 total</Text>
          </View>

          <View style={styles.subjectCard}>
            <View style={[styles.leftAccent, { backgroundColor: '#60A5FA' }]} />

            <View style={styles.subjectHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.subjectIcon}><MaterialCommunityIcons name="shape" size={20} color="#1e3a8a" /></View>
                <View style={{ marginLeft: 12 }}>
                  <Text style={styles.subjectTitle}>Mathematics</Text>
                  <Text style={styles.subjectSub}>7 activities</Text>
                </View>
              </View>

              <View style={styles.subjectBadge}><Text style={styles.badgeText}>7</Text></View>
            </View>

            <View style={styles.activitiesList}>
              <View style={styles.activityItem}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.activityTitle}>THINK AND INK  1.24</Text>
                </View>

                <View style={{ alignItems: 'center' }}>
                  <View style={styles.redDot} />
                  <Ionicons name="camera-outline" size={20} color="#60A5FA" style={{ marginTop: 6 }} />
                  <Text style={styles.uploadText}>Upload</Text>
                </View>
              </View>

              <View style={styles.activityItem}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.activityTitle}>ACTIVITY  1.17</Text>
                </View>

                <View style={{ alignItems: 'center' }}>
                  <View style={styles.redDot} />
                  <Ionicons name="camera-outline" size={20} color="#60A5FA" style={{ marginTop: 6 }} />
                  <Text style={styles.uploadText}>Upload</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.subjectCardSmall}>
            <View style={[styles.leftAccent, { backgroundColor: '#34D399' }]} />
            <View style={styles.subjectHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.subjectIcon}><MaterialCommunityIcons name="leaf" size={20} color="#059669" /></View>
                <View style={{ marginLeft: 12 }}>
                  <Text style={styles.subjectTitle}>Environmental Studies</Text>
                  <Text style={styles.subjectSub}>1 activity</Text>
                </View>
              </View>
              <View style={styles.subjectBadgeSmall}><Text style={styles.badgeText}>1</Text></View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Completed Submissions</Text>
          <View style={styles.submissionCard}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                <Text style={styles.subTitle}>Look Deep 2.4</Text>
                <Text style={styles.subMeta}>Mathematics</Text>
                <Text style={styles.subMeta}>Submitted 23/12/2025</Text>
              </View>

            </View>
          </View>

          <View style={{ height: 32 }} />
        </ScrollView>
      </View>

      <View style={styles.bottomTabs}>
        <Pressable style={styles.tabActive} onPress={() => console.log('Upcoming') }>
          <Ionicons name="calendar-outline" size={20} color="#7c3aed" />
          <Text style={styles.tabTextActive}>Upcoming</Text>
        </Pressable>

        <Pressable style={styles.tab} onPress={() => console.log('Insights') }>
          <Ionicons name="bar-chart-outline" size={20} color="#9ca3af" />
          <Text style={styles.tabText}>Insights</Text>
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
    transform: [{ translateY: 0 }],
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
    fontSize: 13,
    color: '#475569',
    marginTop: 10,
    fontWeight: '600',
  },

  /* Dashboard styles */
  headerBar: {
    backgroundColor: '#0f9d58',
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    marginBottom: 12,
  },
  headerTitle: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 20,
    fontFamily: 'Comic Sans MS',
  },
  containerInner: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 12,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0f172a',
    fontFamily: 'Comic Sans MS',
  },
  sectionCount: {
    fontSize: 13,
    color: '#2563EB',
    fontWeight: '700',
  },
  subjectCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
  },
  subjectCardSmall: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  leftAccent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 6,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  subjectIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  subjectTitle: {
    fontSize: 17,
    fontWeight: '900',
    fontFamily: 'Comic Sans MS',
    color: '#0f172a',
  },
  subjectSub: {
    fontSize: 13,
    color: '#64748b',
  },
  subjectBadge: {
    backgroundColor: '#7c3aed',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subjectBadgeSmall: {
    backgroundColor: '#7c3aed',
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontWeight: '700',
  },
  activitiesList: {
    marginTop: 6,
    gap: 8,
  },
  activityItem: {
    backgroundColor: '#FFF3F3',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
  },
  activityTitle: {
    fontWeight: '900',
    fontSize: 15,
    color: '#0f172a',
  },
  tag: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '700',
  },
  redDot: {
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: '#ef4444',
  },
  uploadText: {
    color: '#7c3aed',
    fontWeight: '800',
    fontSize: 12,
    marginTop: 6,
  },
  submissionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '900',
  },
  subMeta: {
    color: '#94a3b8',
    fontSize: 13,
    marginTop: 6,
  },
  statusPill: {
    backgroundColor: '#E6F0FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: '#3b82f6',
    fontWeight: '700',
  },
  bottomTabs: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: Platform.OS === 'ios' ? 18 : 8,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
  },
  tab: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  tabTextActive: {
    color: '#7c3aed',
    fontWeight: '900',
    marginLeft: 6,
  },
  tabText: {
    color: '#94a3b8',
    marginLeft: 6,
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
        <Ionicons name={icon} size={22} color={isDark ? '#c7b4ff' : '#6366f1'} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.btnTitle, isDark ? { color: '#fff' } : { color: '#111827' }]}>{title}</Text>
        <Text style={[styles.btnSubtitle, isDark ? { color: 'rgba(255,255,255,0.85)' } : { color: '#374151' }]}>{subtitle}</Text>
      </View>
    </Pressable>
  );
}
