import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function ParentDashboardScreen() {
  React.useEffect(() => {
    if (Platform.OS === 'android' && (UIManager as any)?.setLayoutAnimationEnabledExperimental) {
      (UIManager as any).setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

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
        {/* HEADER CHIP */}
        <View style={styles.topChip}>
          <Text style={styles.topChipText}>Parent Dashboard</Text>
        </View>

        {/* UPCOMING SECTION HEADER */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Upcoming Activities</Text>
          <Text style={styles.sectionMeta}>8 total</Text>
        </View>

        {/* MATHEMATICS CARD */}
        <SubjectCard
          color="#5D5FEF"
          icon="water-drop"
          title="Mathematics"
          meta="7 activities"
          badge="7"
        >
          <ActivityRow title="THINK AND INK 1.24" />
          <ActivityRow title="ACTIVITY 1.17" />
        </SubjectCard>

        {/* ENVIRONMENTAL STUDIES CARD */}
        <SubjectCard
          color="#22C55E"
          icon="eco"
          title="Environmental Studies"
          meta="1 activity"
          badge="1"
        />

        {/* COMPLETED SECTION HEADER */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>
          Completed Submissions
        </Text>

        {/* COMPLETED CARD */}
        <View style={styles.completedCard}>
          <Text style={styles.completedTitle}>Look Deep 2.4</Text>
          <Text style={styles.completedMeta}>Mathematics</Text>
          <Text style={styles.completedDate}>Submitted 23/12/2025</Text>
        </View>

        {/* TABS */}
        <View style={styles.tabBar}>
          <View style={[styles.tabPill, styles.tabActive]}>
            <MaterialIcons name="event" size={18} color="#fff" />
            <Text style={styles.tabActiveText}>Upcoming</Text>
          </View>
          <TouchableOpacity style={styles.tabPill} activeOpacity={0.8}>
            <MaterialIcons name="insights" size={18} color="#64748B" />
            <Text style={styles.tabText}>Insights</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

/* ───────── COMPONENTS ───────── */

function SubjectCard({ color, icon, title, meta, badge, children }: any) {
  const [expanded, setExpanded] = React.useState(true);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(v => !v);
  };

  return (
    <View style={styles.subjectCard}>
      <View style={subjectLeftStripe(color)} />
      <View style={styles.subjectContent}>
        <TouchableOpacity
          onPress={toggle}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel={`${title} section`}
        >
          <View style={styles.subjectHeaderRow}>
            <View style={styles.subjectIconBox}>
              <MaterialIcons name={icon} size={20} color={color} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.subjectTitle}>{title}</Text>
              <Text style={styles.subjectMeta}>{meta}</Text>
            </View>
            {badge && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{badge}</Text>
              </View>
            )}
            <MaterialIcons
              name={expanded ? 'expand-less' : 'expand-more'}
              size={22}
              color="#64748B"
              style={styles.expandIcon}
            />
          </View>
        </TouchableOpacity>

        {expanded && <View>{children}</View>}
      </View>
    </View>
  );
}

function ActivityRow({ title }: any) {
  return (
    <View style={styles.activityRow}>
      <Text style={styles.activityTitle}>{title}</Text>
      <View style={styles.activityRight}>
        <View style={styles.statusDot} />
        <MaterialIcons name="photo-camera" size={18} color="#5D5FEF" />
        <Text style={styles.uploadText}>Upload</Text>
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
    justifyContent: 'center',
    overflow: 'hidden',
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

  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
  },
  sectionMeta: {
    fontSize: 12,
    color: '#5D5FEF',
  },

  /* SUBJECT CARD */
  subjectCard: {
    flexDirection: 'row',
    borderRadius: 24,
    backgroundColor: '#fff',
    marginTop: 16,
    shadowColor: '#93C5FD',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  subjectContent: {
    flex: 1,
    padding: 16,
  },
  subjectHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    columnGap: 12,
  },
  subjectIconBox: {
    padding: 10,
    borderRadius: 16,
    backgroundColor: '#EFF6FF',
  },
  subjectTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  subjectMeta: {
    fontSize: 12,
    color: '#64748B',
  },
  badge: {
    minWidth: 24,
    height: 24,
    borderRadius: 999,
    backgroundColor: '#5D5FEF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },

  expandIcon: {
    marginLeft: 8,
  },

  /* ACTIVITY ROW */
  activityRow: {
    borderRadius: 20,
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  activityTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  activityRight: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: '#EF4444',
  },
  uploadText: {
    fontSize: 12,
    color: '#EC4899',
    fontWeight: '600',
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
  tabText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
  },
  tabActiveText: {
    fontSize: 13,
    color: '#fff',
    fontWeight: '700',
  },
});
