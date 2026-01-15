import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing,
  useColorScheme,
  ScrollView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
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

  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  const subjects = [
    { key: 'Mathematics', count: 2, activities: [{ title: 'THINK AND INK 1.24' }, { title: 'ACTIVITY 1.17' }] },
    { key: 'Environmental Studies', count: 1, activities: [{ title: 'Activity 2.3' }] },
    { key: 'Social', count: 1, activities: [{ title: 'Look Beyond 2.1' }] },
    { key: 'Science', count: 2, activities: [{ title: 'Explore Matter 1.1' }, { title: 'Plants and Growth 2.4' }] },
    { key: 'English', count: 1, activities: [{ title: 'Storytelling 1.5' }] },
  ];

  const subjectColors: Record<string, any> = {
    Mathematics: { accent: '#FAF3A3', lightBg: '#FFFAE6', header: '#FAF3A3' },
    'Environmental Studies': { accent: '#C7E0F8', lightBg: '#F3F9FF', header: '#C7E0F8' },
    Social: { accent: '#F6D397', lightBg: '#FFF8EE', header: '#F6D397' },
    Science: { accent: '#C6E2C1', lightBg: '#F3FBF5', header: '#C6E2C1' },
    English: { accent: '#CAADCE', lightBg: '#F6EFF6', header: '#CAADCE' },
    Pink: { accent: '#F19CA4', lightBg: '#FFF0F2', header: '#F19CA4' },
    Coral: { accent: '#FC3654', lightBg: '#FFF1F3', header: '#FC3654' },
  };

  const [openSubjects, setOpenSubjects] = useState<Record<string, boolean>>({ [subjects[0].key]: true });
  const [activeTab, setActiveTab] = useState<'Activities' | 'Insights'>('Activities');

  const completed = [
    { title: 'Look Around 1.2', subject: 'Mathematics', submitted: 'Submitted 23/12/2025' },
    { title: 'Look Beyond 1.3', subject: 'Environmental Studies', submitted: 'Submitted 21/12/2025' },
  ];

  function toggleSubject(key: string) {
    setOpenSubjects(prev => {
      const isOpen = !!prev[key];
      if (isOpen) {
        // close it
        return { ...prev, [key]: false };
      }
      // open only this one, close others
      return { [key]: true } as Record<string, boolean>;
    });
  }

  return (
    <View style={styles.container}>
      {/* BLOBS */}
      <View style={[styles.blob, styles.blobPurple]} />
      <View style={[styles.blob, styles.blobBlue]} />
      <View style={[styles.blob, styles.blobLight]} />

      {/* STARS */}
      <MaterialIcons name="star-outline" size={32} style={styles.star1} />
      <MaterialIcons name="star-outline" size={20} style={styles.star2} />

      {/* Header */}
      <View style={[styles.headerBar, styles.headerBarSticky, isDark && styles.headerBarDark]}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="dashboard" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={[styles.headerTitle, isDark && styles.headerTitleDark]}>Parent Dashboard</Text>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => console.log('Settings')} accessibilityRole="button" accessibilityLabel="Settings">
            <Ionicons name="settings-outline" size={20} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => console.log('Home')} accessibilityRole="button" accessibilityLabel="Home" style={{ marginLeft: 12 }}>
            <Ionicons name="home-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsWrap}>
        <TouchableOpacity onPress={() => setActiveTab('Activities')} style={[styles.tab, activeTab === 'Activities' && styles.tabActive]}>
          <View style={styles.tabContent}>
            <Ionicons name="list-outline" size={16} color={activeTab === 'Activities' ? '#fff' : '#6b7280'} style={{ marginRight: 8 }} />
            <Text style={[styles.tabText, activeTab === 'Activities' && styles.tabTextActive]}>Activities</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('Insights')} style={[styles.tab, activeTab === 'Insights' && styles.tabActive]}>
          <View style={styles.tabContent}>
            <Ionicons name="bar-chart-outline" size={16} color={activeTab === 'Insights' ? '#fff' : '#6b7280'} style={{ marginRight: 8 }} />
            <Text style={[styles.tabText, activeTab === 'Insights' && styles.tabTextActive]}>Insights</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        {/* Dashboard sections */}
        {activeTab === 'Activities' ? (
          <View style={styles.bodyWrap}>
            <ScrollView style={styles.bodyScroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
              <View style={styles.sectionRow}>
                <Text style={styles.sectionTitle}>Assigned Activities</Text>
                <Text style={styles.sectionCount}>7 total</Text>
              </View>

              {subjects.map(sub => {
                const colors: Record<string, any> = {
              Mathematics: { bg: subjectColors.Mathematics.lightBg, headerBg: subjectColors.Mathematics.header, lightBg: subjectColors.Mathematics.lightBg, lightOverlay: 'rgba(23,43,62,0.08)', accent: subjectColors.Mathematics.accent, icon: 'calculate' },
              'Environmental Studies': { bg: subjectColors['Environmental Studies'].lightBg, headerBg: subjectColors['Environmental Studies'].header, lightBg: subjectColors['Environmental Studies'].lightBg, lightOverlay: 'rgba(23,43,62,0.08)', accent: subjectColors['Environmental Studies'].accent, icon: 'eco' },
              Social: { bg: subjectColors.Social.lightBg, headerBg: subjectColors.Social.header, lightBg: subjectColors.Social.lightBg, lightOverlay: 'rgba(23,43,62,0.08)', accent: subjectColors.Social.accent, icon: 'people' },
              Science: { bg: subjectColors.Science.lightBg, headerBg: subjectColors.Science.header, lightBg: subjectColors.Science.lightBg, lightOverlay: 'rgba(23,43,62,0.08)', accent: subjectColors.Science.accent, icon: 'science' },
              English: { bg: subjectColors.English.lightBg, headerBg: subjectColors.English.header, lightBg: subjectColors.English.lightBg, lightOverlay: 'rgba(23,43,62,0.08)', accent: subjectColors.English.accent, icon: 'menu-book' },
            };
            const col = colors[sub.key] || { bg: '#fff', headerBg: '#fff', lightBg: '#fff', lightOverlay: 'rgba(148,163,184,0.45)', accent: '#94A3B8', icon: 'folder' };
            const isOpen = !!openSubjects[sub.key];

                return (
                  <View key={sub.key} style={[styles.subjectCard]}>
                    <TouchableOpacity onPress={() => toggleSubject(sub.key)}>
                      <View style={[styles.subjectHeaderGradient, { backgroundColor: col.headerBg || col.bg }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                          <View style={[styles.subjectIcon, { backgroundColor: '#fff' }]}>
                            <MaterialIcons name={col.icon} size={18} color={col.accent} />
                          </View>
                          <Text style={styles.subjectTitle} numberOfLines={2}>{sub.key}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text style={[styles.counterPlain, { marginRight: 8 }]}>{sub.count}</Text>
                          <Ionicons name={isOpen ? 'chevron-down' : 'chevron-forward'} size={18} color="#0f172a" />
                        </View>
                      </View>
                    </TouchableOpacity>

                    {isOpen && (
                      <View style={[styles.activitiesList, { backgroundColor: 'transparent', padding: 4, borderRadius: 0, marginTop: 4 }]}>
                        {sub.activities.map((a, i) => (
                            <View key={i} style={[styles.activityItem, i < sub.activities.length - 1 && styles.activityDivider, { borderWidth: 1, borderColor: col.accent, borderRadius: 8, backgroundColor: '#fff', paddingVertical: 10, paddingHorizontal: 10 }]}>
                              <View style={{ flex: 1 }}>
                                <Text style={styles.activityTitle}>{a.title}</Text>
                                <Text style={styles.dueText}>Due Date: TBD</Text>
                              </View>

                              <View style={{ alignItems: 'center' }}>
                                <Ionicons name="camera" size={20} color="#000" />
                              </View>
                            </View>
                          ))}
                      </View>
                    )}  
                  </View>
                );
              })}

              <View style={{ height: 32 }} />

              <View style={styles.sectionRow}>
                <Text style={styles.sectionTitle}>Completed Activities</Text>
                <Text style={styles.sectionCount}>{completed.length} total</Text>
              </View>

              <View style={styles.subjectCardSmall}>
                {completed.map((c, i) => {
                  // robust lookup: try exact, case-insensitive, contains match, or fallback
                  const exact = subjectColors[c.subject];
                  const ciKey = Object.keys(subjectColors).find(k => k.toLowerCase() === c.subject.toLowerCase());
                  const partialKey = Object.keys(subjectColors).find(k => c.subject.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(c.subject.toLowerCase()));
                  const col = exact || (ciKey && subjectColors[ciKey]) || (partialKey && subjectColors[partialKey]) || { accent: '#E6E6E6', lightBg: '#fff' };
                  const bg = col.lightBg || col.accent;
                  return (
                    <View key={i} style={[styles.completedItem, { backgroundColor: bg, borderColor: col.accent, position: 'relative', paddingRight: 44 }] }>
                      <Text style={[styles.activityTitle, { fontWeight: '700', color: '#0f172a' }]}>{c.title}</Text>

                      <Text style={[styles.subjectTagText, { backgroundColor: 'transparent', color: '#0f172a', marginTop: 8 }]}>{c.subject}</Text>

                      <TouchableOpacity accessibilityRole="button" onPress={() => console.log('Star', c.title)} style={{ position: 'absolute', right: 12, top: 12 }}>
                        <Ionicons name="star-outline" size={18} color={col.accent} />
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View> 
            </ScrollView>
          </View>
        ) : (
          <View style={styles.insightsPlaceholder}><Text style={styles.insightsText}>Insights coming soon — visualizations and reports will appear here.</Text></View>
        )}
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



const styles = StyleSheet.create<any>({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
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
    alignItems: 'stretch',
    paddingHorizontal: 20,
    flex: 1,
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
  headerBar: {
    backgroundColor: '#0f9d58',
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderRadius: 10,
    marginBottom: 12,
  },
  headerBarDark: {
    backgroundColor: '#0b6b3f',
  },
  headerTitle: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 16,
  },
  headerTitleDark: {
    color: '#fff',
  },

  dashboardContent: {
    width: '100%',
    paddingBottom: 140,
    paddingTop: 140,
  },
  headerBarSticky: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 60,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    paddingBottom: 20,
  },
  scrollContent: {
    paddingBottom: 40,
    flexGrow: 1,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },
  sectionCount: {
    fontSize: 13,
    color: '#2563EB',
    fontWeight: '700',
  },
  subjectCard: {
    backgroundColor: 'transparent',
    borderRadius: 0,
    marginBottom: 12,
    padding: 0,
    elevation: 0,
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  subjectTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
    marginLeft: 8,
    flex: 1,
    flexWrap: 'wrap',
  },
  subjectIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subjectSub: {
    fontSize: 13,
    color: '#64748b',
    marginRight: 8,
  },

  subjectBadge: {
    backgroundColor: '#7c3aed',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterDot: {
    width: 34,
    height: 34,
    borderRadius: 18,
    backgroundColor: '#7c3aed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: {
    color: '#fff',
    fontWeight: '800',
  },
  counterPlain: {
    fontWeight: '800',
    fontSize: 14,
    color: '#0f172a',
  },
  activitiesList: {
    marginTop: 0,
  },
  activityItem: {
    backgroundColor: 'transparent',
    borderRadius: 0,
    paddingVertical: 12,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  activityDivider: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15,23,42,0.04)',
    paddingBottom: 6,
    marginBottom: 6,
  },
  activitiesCardInner: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    paddingVertical: 0,
    paddingHorizontal: 0,
    elevation: 0,
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  activityCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(15,23,42,0.04)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
  },
  activityTitle: {
    fontWeight: '400',
    fontSize: 14,
    color: '#0f172a',
    flex: 1,
    flexWrap: 'wrap',
    marginRight: 8,
  },
  dueText: {
    color: '#64748b',
    fontSize: 12,
    marginTop: 6,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  subjectHeaderGradient: {
    padding: 8,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  bodyWrap: {
    flex: 1,
    marginTop: 80,
    marginBottom: Platform.OS === 'ios' ? 86 : 76,
    backgroundColor: 'transparent',
    borderRadius: 0,
    padding: 0,
    elevation: 0,
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    overflow: 'visible',
  },
  bodyScroll: {
    width: '100%',
  },

  tabsWrap: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 18 : 12,
    left: 12,
    right: 12,
    zIndex: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    alignSelf: 'center',
    elevation: 12,
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 999,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e6e6f0',
  },
  tabActive: {
    backgroundColor: '#7c3aed',
    borderColor: '#7c3aed',
  },
  tabText: {
    color: '#6b7280',
    fontWeight: '700',
  },
  tabTextActive: {
    color: '#fff',
  },

  insightsPlaceholder: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  insightsText: {
    color: '#64748b',
    textAlign: 'center',
  },

  subjectCardSmall: {
    backgroundColor: 'transparent',
    borderRadius: 0,
    marginBottom: 8,
    padding: 0,
    elevation: 0,
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  completedItem: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(15,23,42,0.04)',
  },
  subjectTag: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  subjectTagText: {
    color: '#0f172a',
    fontWeight: '700',
    fontSize: 12,
  },
  badgeText: {
    color: '#fff',
    fontWeight: '700',
  },
  subMeta: {
    color: '#94a3b8',
    fontSize: 13,
    marginTop: 6,
  },});
