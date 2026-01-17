import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
    Dimensions,
    LayoutAnimation,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    UIManager,
    View,
    useWindowDimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const baseSubjectColors: Record<string, any> = {
  Mathematics: { accent: '#FDEF01' },       // Bright Yellow
  'Environmental Studies': { accent: '#3AC359' }, // Green
  Social: { accent: '#FCBC0D' },           // Orange
  Science: { accent: '#5CB7E5' },          // Blue
  English: { accent: '#695894' },          // Purple
  Pink: { accent: '#B34A9A' },             // Magenta
  Coral: { accent: '#FC3654' },            // Red
};

function darkenHex(hex: string, amount = 0.06) {
  if (!hex) return hex;
  const h = hex.replace('#', '');
  if (h.length !== 6) return hex;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const factor = 1 - amount;
  const nr = Math.max(0, Math.min(255, Math.round(r * factor)));
  const ng = Math.max(0, Math.min(255, Math.round(g * factor)));
  const nb = Math.max(0, Math.min(255, Math.round(b * factor)));
  return ('#' + [nr, ng, nb].map(n => n.toString(16).padStart(2, '0')).join(''));
}

function lightenHex(hex: string, amount = 0.95) {
  if (!hex) return hex;
  const h = hex.replace('#', '');
  if (h.length !== 6) return hex;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const nr = Math.max(0, Math.min(255, Math.round(r + (255 - r) * amount)));
  const ng = Math.max(0, Math.min(255, Math.round(g + (255 - g) * amount)));
  const nb = Math.max(0, Math.min(255, Math.round(b + (255 - b) * amount)));
  return ('#' + [nr, ng, nb].map(n => n.toString(16).padStart(2, '0')).join(''));
}

// derive a more vibrant subject palette: keep accents vivid, compute lightBg as a near-white tint of the accent
const subjectColors: Record<string, any> = Object.fromEntries(
  Object.entries(baseSubjectColors).map(([k, v]) => [
    k,
    {
      accent: v.accent,
      lightBg: lightenHex(v.accent, 0.96),
      header: darkenHex(v.accent, 0.06),
    },
  ])
) as Record<string, any>;

function isHexLight(hex: string) {
  if (!hex) return false;
  const h = hex.replace('#', '');
  if (h.length !== 6) return false;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const lum = (r * 299 + g * 587 + b * 114) / 1000;
  return lum > 200;
}

export default function ParentDashboardScreen() {
  React.useEffect(() => {
    if (Platform.OS === 'android' && (UIManager as any)?.setLayoutAnimationEnabledExperimental) {
      (UIManager as any).setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const subjects = [
    { key: 'Mathematics', count: 2, activities: [{ title: 'THINK AND INK 1.24', dueDate: '10/02/2026' }, { title: 'ACTIVITY 1.17', dueDate: '15/02/2026' }] },
    { key: 'Environmental Studies', count: 1, activities: [{ title: 'Activity 2.3', dueDate: '12/02/2026' }] },
    { key: 'Social', count: 1, activities: [{ title: 'Look Beyond 2.1', dueDate: '18/02/2026' }] },
    { key: 'Science', count: 2, activities: [{ title: 'Explore Matter 1.1', dueDate: '09/02/2026' }, { title: 'Plants and Growth 2.4', dueDate: '20/02/2026' }] },
    { key: 'English', count: 1, activities: [{ title: 'Storytelling 1.5', dueDate: '14/02/2026' }] },
  ];

  const completed = [
    { title: 'Look Around 1.2', subject: 'Mathematics', submitted: 'Submitted 23/12/2025' },
    { title: 'Look Beyond 1.3', subject: 'Environmental Studies', submitted: 'Submitted 21/12/2025' },
  ];

  const colorMap: Record<string, string> = {
    Mathematics: '#5D5FEF',
    'Environmental Studies': '#22C55E',
    Social: '#F59E0B',
    Science: '#10B981',
    English: '#8B5CF6',
  };

  const iconMap: Record<string, string> = {
    Mathematics: 'calculate',
    'Environmental Studies': 'eco',
    Social: 'people',
    Science: 'science',
    English: 'menu-book',
  };

  // subjectColors moved to module scope (above)

  const [activeTab, setActiveTab] = React.useState<'Activities' | 'Insights'>('Activities');
  const [openSubjects, setOpenSubjects] = React.useState<Record<string, boolean>>({ [subjects[0].key]: true });

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

  // Responsive helpers — compute runtime sizes so layout adapts across screen widths
  const { width: winWidth } = useWindowDimensions();
  // slightly reduced horizontal padding for a tighter layout
  const containerPadding = Math.max(16, Math.round(winWidth * 0.05)); // 5% min 16
  const maxCardWidth = Math.min(920, Math.max(360, winWidth - 32));
  // fontScale: keeps type readable on small and large screens
  const fontScale = Math.max(0.9, Math.min(1.25, winWidth / 375));


  return (
    <View style={styles.container}>
      {/* BLOBS */}
      <View style={[styles.blob, styles.blobPurple]} />
      <View style={[styles.blob, styles.blobBlue]} />
      <View style={[styles.blob, styles.blobLight]} />

      {/* STARS */}
      <MaterialIcons name="star-outline" size={32} style={styles.star1} />
      <MaterialIcons name="star-outline" size={20} style={styles.star2} />

      <View style={[styles.headerBar, styles.headerBarSticky]}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="person" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.headerTitle}>Parent Dashboard</Text>
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

      <View style={[styles.card, { paddingHorizontal: containerPadding, maxWidth: maxCardWidth, alignSelf: 'center' }]}>

        {/* SECTION (Activities / Insights) */}
        {activeTab === 'Activities' ? (
          <>
            <ScrollView style={{ width: '100%', flex: 1 }} contentContainerStyle={{ paddingBottom: 140, flexGrow: 1 }} showsVerticalScrollIndicator={false}>
              <View style={styles.sectionRow}>
                <Text style={[styles.sectionTitle, { fontSize: Math.round(18 * fontScale) }]}>Assigned Activities</Text>
                <Text style={[styles.sectionCount, { fontSize: Math.round(13 * fontScale) }]}>{subjects.reduce((n, s) => n + (s.count || (s.activities?.length || 0)), 0)} total</Text>
              </View>

              {subjects.map(s => (
                <SubjectCard
                  key={s.key}
                  color={colorMap[s.key] || '#5D5FEF'}
                  icon={iconMap[s.key] || 'book'}
                  title={s.key}
                  badge={`${s.count}`}
                  expanded={!!openSubjects[s.key]}
                  onToggle={() => toggleSubject(s.key)}
                  fontScale={fontScale}
                >
                  {s.activities?.map((a: any, i: number) => (
                    <ActivityRow
                      key={i}
                      title={a.title}
                      dueDate={a.dueDate}
                      bg={'#fff'}
                      accent={subjectColors[s.key]?.accent ?? (colorMap[s.key] || '#5D5FEF')}
                      fontScale={fontScale}
                    />
                  ))} 
                </SubjectCard>
              ))} 

              <View style={{ height: 20 }} />

              <View style={styles.sectionRow}>
                <Text style={[styles.sectionTitle, { fontSize: Math.round(18 * fontScale) }]}>Completed Activities</Text>
                <Text style={[styles.sectionCount, { fontSize: Math.round(13 * fontScale) }]}>{completed.length} total</Text>
              </View>

              {completed.map((c, i) => {
                const exact = subjectColors[c.subject];
                const ciKey = Object.keys(subjectColors).find(k => k.toLowerCase() === c.subject.toLowerCase());
                const partialKey = Object.keys(subjectColors).find(k => c.subject.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(c.subject.toLowerCase()));
                const col = exact || (ciKey && subjectColors[ciKey]) || (partialKey && subjectColors[partialKey]) || { accent: '#E6E6E6', lightBg: '#fff' };
                const bg = col.lightBg || col.accent;
                const textColor = isHexLight(bg) ? '#0f172a' : '#0f172a';

                return (
                  <View key={i} style={[styles.completedCard, { marginTop: 12, backgroundColor: bg, borderColor: col.accent, padding: Math.round(16 * fontScale), borderRadius: Math.round(20 * fontScale) }]}> 
                    <Text style={[styles.completedTitle, { color: textColor, fontSize: Math.round(16 * fontScale) }]}>{c.title}</Text>
                    <Text style={[styles.completedMeta, { color: textColor, marginTop: 8, fontSize: Math.round(13 * fontScale) }]}>{c.subject}</Text>
                  </View>
                );
              })}

            </ScrollView>
          </>
        ) : (
          <View style={{ marginTop: 16 }}>
            <Text style={styles.insightsText}>Insights coming soon — visualizations and reports will appear here.</Text>
          </View>
        )}

      </View>

      {/* FOOTER TABS (fixed at bottom - from 3.tsx) */}
      <View style={styles.footerContainer} pointerEvents="box-none">
        <View style={styles.tabsWrap} pointerEvents="box-none">
          <TouchableOpacity onPress={() => setActiveTab('Activities')}>
            {activeTab === 'Activities' ? (
              <LinearGradient colors={["#8B5CF6", "#5D5FEF"]} style={styles.tabGradient}>
                <View style={styles.tabContent}>
                  <Ionicons name="list-outline" size={18} color="#fff" style={{ marginRight: 10 }} />
                  <Text style={styles.tabActiveText}>Activities</Text>
                </View>
              </LinearGradient>
            ) : (
              <View style={[styles.tab, { borderColor: '#8B5CF6' }]}>
                <View style={styles.tabContent}>
                  <Ionicons name="list-outline" size={18} color="#6b7280" style={{ marginRight: 10 }} />
                  <Text style={styles.tabText}>Activities</Text>
                </View>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setActiveTab('Insights')}>
            {activeTab === 'Insights' ? (
              <LinearGradient colors={["#8B5CF6", "#5D5FEF"]} style={styles.tabGradient}>
                <View style={styles.tabContent}>
                  <Ionicons name="bar-chart-outline" size={18} color="#fff" style={{ marginRight: 10 }} />
                  <Text style={styles.tabActiveText}>Insights</Text>
                </View>
              </LinearGradient>
            ) : (
              <View style={[styles.tab, { borderColor: '#8B5CF6' }]}>
                <View style={styles.tabContent}>
                  <Ionicons name="bar-chart-outline" size={18} color="#6b7280" style={{ marginRight: 10 }} />
                  <Text style={styles.tabText}>Insights</Text>
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}

/* ───────── COMPONENTS ───────── */

function SubjectCard({ color, icon, title, meta, badge, children, expanded, onToggle, fontScale = 1 }: any) {
  const isExpanded = typeof expanded === 'boolean' ? expanded : true;
  const handleToggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (onToggle) onToggle();
  };

  // derive per-subject colors, falling back to `color` prop
  const sc = (subjectColors && subjectColors[title]) || null;
  const stripeColor = sc?.header ?? color;
  const accent = sc?.accent ?? color;
  const iconBoxBg = sc?.lightBg ?? '#EFF6FF';
  const badgeBg = accent;
  const badgeTextColor = isHexLight(badgeBg) ? '#0f172a' : '#fff';

  return (
    <View style={[styles.subjectCard, { width: '100%' }]}>
      <View style={subjectLeftStripe(stripeColor)} />
      <View style={[styles.subjectContent, { padding: Math.round(8 * fontScale) }]}>
        <TouchableOpacity
          onPress={handleToggle}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel={`${title} section`}
        >
          <View style={[styles.subjectHeaderRow, { alignItems: 'center' }]}>
            <View style={[styles.subjectIconBox, { backgroundColor: iconBoxBg, padding: Math.round(8 * fontScale), borderRadius: Math.round(12 * fontScale) }]}>
              <MaterialIcons name={icon} size={Math.round(20 * fontScale)} color={accent} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.subjectTitle, { fontSize: Math.round(16 * fontScale) }]}>{title}</Text>
              {meta ? <Text style={[styles.subjectMeta, { fontSize: Math.round(12 * fontScale), marginTop: 2 }]}>{meta}</Text> : null}
            </View>
            {badge && (
              <View style={[styles.badge, { backgroundColor: badgeBg, minWidth: Math.round(18 * fontScale), height: Math.round(18 * fontScale), borderRadius: Math.round(9 * fontScale) }]}>
                <Text style={[styles.badgeText, { color: badgeTextColor, fontSize: Math.round(10 * fontScale) }]}>{badge}</Text>
              </View>
            )}
            <MaterialIcons
              name={isExpanded ? 'expand-less' : 'expand-more'}
              size={Math.round(18 * fontScale)}
              color="#64748B"
              style={styles.expandIcon}
            />
          </View>
        </TouchableOpacity>

        {isExpanded && (
          <View style={[styles.accordion, { backgroundColor: iconBoxBg, padding: Math.round(6 * fontScale), borderRadius: Math.round(10 * fontScale) }]}> 
            <View style={[styles.accordionInner, { paddingVertical: Math.round(2 * fontScale) }]}>
              {children}
            </View>
          </View>
        )}
      </View>
    </View>
  );
}


// Helper: robust date parsing for dd/mm/yyyy, ISO strings, or Date objects
function parseDateInput(input: any): Date | null {
  if (!input) return null;
  if (input instanceof Date) return new Date(input.getFullYear(), input.getMonth(), input.getDate());
  if (typeof input === 'number') return new Date(input);
  if (typeof input === 'string') {
    // try ISO first
    const iso = Date.parse(input);
    if (!isNaN(iso)) return new Date(iso);
    // try DD/MM/YYYY or D/M/YYYY
    const m = input.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
    if (m) {
      const d = parseInt(m[1], 10);
      const mo = parseInt(m[2], 10) - 1;
      const y = parseInt(m[3], 10);
      return new Date(y, mo, d);
    }
  }
  return null;
}

function daysBetween(a: Date, b: Date) {
  const msPerDay = 24 * 60 * 60 * 1000;
  const a0 = new Date(a.getFullYear(), a.getMonth(), a.getDate());
  const b0 = new Date(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.round((b0.getTime() - a0.getTime()) / msPerDay);
}

function formatDateShort(date: Date) {
  return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
}

function ActivityRow({ title, dueDate, bg, accent, fontScale = 1 }: any) {
  const background = bg ?? '#fff';
  const border = accent || '#5D5FEF';

  const parsed = parseDateInput(dueDate);
  const today = new Date();
  let dueLabel = 'Due: TBD';
  let dueColor = '#94A3B8';

  if (parsed) {
    const diff = daysBetween(today, parsed);
    if (diff < 0) {
      dueLabel = `Overdue: ${formatDateShort(parsed)}`;
      dueColor = '#ef4444'; // red
    } else if (diff === 0) {
      dueLabel = 'Due Today';
      dueColor = '#f97316'; // orange
    } else if (diff === 1) {
      dueLabel = 'Due Tomorrow';
      dueColor = '#f59e0b'; // amber
    } else if (diff <= 7) {
      dueLabel = `Due in ${diff} days`;
      dueColor = '#94A3B8';
    } else {
      dueLabel = `Due: ${formatDateShort(parsed)}`;
      dueColor = '#94A3B8';
    }
  }

  return (
    <View
      style={[
        styles.activityRow,
        {
          backgroundColor: background,
          borderWidth: 1,
          borderColor: border,
          borderRadius: Math.round(14 * fontScale),
          paddingHorizontal: Math.round(12 * fontScale),
          paddingVertical: Math.round(8 * fontScale),
        },
      ]}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.activityTitle, { color: '#0f172a', fontSize: Math.round(13 * fontScale), fontWeight: '600' }]} numberOfLines={2}>
          {title}
        </Text>
        <Text style={[styles.dueText, { color: dueColor, fontSize: Math.round(12 * fontScale) }]}>{dueLabel}</Text>
      </View>

      <View style={styles.activityRight}>
        <MaterialIcons name="photo-camera" size={Math.round(16 * fontScale)} color="#0f172a" />
      </View>
    </View>
  );
}

/* ───────── STYLES ───────── */

const subjectLeftStripe = (color: string) => ({
  width: 4,
  borderRadius: 999,
  backgroundColor: color,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    paddingTop: 18,
  },

  /* BLOBS */
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

  /* STARS */
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

  /* CARD */
  card: {
    width: '100%',
    maxWidth: 360,
    paddingHorizontal: 20,
    flex: 1,
    minHeight: 0,
    marginTop: 60, // start sections just below header
  },

  /* make overall layout slightly tighter */
  subjectCard: {
    flexDirection: 'row',
    borderRadius: 12,
    backgroundColor: '#fff',
    marginTop: 6,
    shadowColor: '#93C5FD',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  /* HEADER CHIP */
  topChip: {
    alignSelf: 'flex-start',
    backgroundColor: '#16A34A',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginBottom: 16,
  },
  topChipText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  tabsWrap: {
    position: 'relative',
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

  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  sectionMeta: {
    fontSize: 12,
    color: '#5D5FEF',
  },

  /* SUBJECT CARD */
  subjectContent: {
    flex: 1,
    padding: 8,
  },
  subjectHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    columnGap: 6,
  },
  subjectIconBox: {
    padding: 6,
    borderRadius: 10,
    backgroundColor: '#EFF6FF',
  },
  subjectTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  subjectMeta: {
    fontSize: 12,
    color: '#64748B',
  },
  badge: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#5D5FEF',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },

  expandIcon: {
    marginLeft: 4,
  },

  /* ACTIVITY ROW */
  activityRow: {
    borderRadius: 14,
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  activityTitle: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
  },

  /* Accordion container (subject background) */
  accordion: {
    marginTop: 6,
    padding: 6,
    borderRadius: 10,
    overflow: 'hidden',
  },
  accordionInner: {
    paddingVertical: 2,
  },
  activityRight: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
  },


  /* COMPLETED CARD */
  completedCard: {
    marginTop: 16,
    borderRadius: 24,
    backgroundColor: '#fff',
    padding: 16,
    shadowColor: '#93C5FD',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  completedTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  completedMeta: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
  },
  completedDate: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },

  dueText: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 6,
  },

  insightsText: {
    color: '#64748b',
    textAlign: 'center',
  },

  /* TABS */
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  tabPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#E5E7EB',
    columnGap: 6,
    marginHorizontal: 4,
  },
  tabActive: {
    backgroundColor: '#5D5FEF',
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 999,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e6e6f0',
  },
  tabText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#fff',
  },
  tabActiveText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '700',
  },
  tabGradient: {
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
  },

  footerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    zIndex: 999,
    paddingBottom: Platform.OS === 'ios' ? 12 : 8,
  },
});