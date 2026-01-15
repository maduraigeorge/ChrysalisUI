import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Pressable,
  useColorScheme,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  return (
    <LinearGradient
      colors={['#DFF6FF', '#EAF9FF']}
      style={styles.container}
    >
      <BackgroundShapes isDark={isDark} />

      <Pressable
        onPress={() => console.log('Contact Help')}
        accessibilityRole="button"
        accessibilityLabel="Contact Help"
        style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1, position: 'absolute', top: Platform.OS === 'ios' ? 14 : 10, right: 14, zIndex: 20 }]}
      >
        <Ionicons name="help-circle-outline" size={26} color={isDark ? '#fff' : '#0f172a'} />
      </Pressable>

      {/* Decorative Sun */}
      <Image
        source={{
          uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqSaOZJdJzyL9U5a-CH4_njodwK_5Qi9RB7rZ7EefkB3IcBSS0t0OCuWAAhxEQXaNn9YaGRwd5aSlNtYII_M0PxfsOdYj-Pm5Al7JHqb7O4yEcpIjLA8FxmmmINI4N_xuCLCq28CI1q0042tsCQtgle9A_hEY_H5lKc4lmVisJhlIOajCz1Aoy0I8grOuhkTaQR6Y9c1sJB_EMj2uVWNGndM2oJNtwg-a-zJd0HTp1wIf0GRsiQgRXLdFq-_bkovbaLJhsTGcOKjo',
        }}
        style={styles.sun}
      />

      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAY6MHvbluxGZUeZTeI-1pPlSDq0q47lN79qBQ3meTyx8ALlZfeDTTRBrFRTllgJK0aE6d6REgdqracQ22nHFcw9_M0D2SyGaM7Ou5V-svEglO5VnSSBw_aIuPmr0fKedcXhnAyyEY2IQaIgfyB09lgmvnm6Bi6i_Eu1lntaZ-MpDNDNfH_fAjo8eT7PE1_M5gpsgIDoc2Nv2cPYTbC2601XvWrAWbfEpaSTsP9ogO_l47CrsGQiFqBwAMXudVlX9vl_F3rqbBwJ7U',
            }}
            style={styles.logo}
          />
          <Text style={styles.brand}>Chrysalis</Text>

          <Text style={styles.welcome}>
            Welcome to{'\n'}Inspired Kids!
          </Text>
        </View>

        {/* Hero */}
        <View style={styles.hero}>
          <Image
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfx2AmAvtXqXaOIz6Mqx7MulNSKvvJ1ojX8ofvFd8O2VHCtGAF2rwq7f6ENb94SXUi9gw9BWLObbTOQliAcXkYDUfn1ibQSatt7p0CQlpwJEm3srCydS1MlMVKh_lkZFKBbSTQYhafDuy59UWSnKPGqwbsWqqGnpRZa-48BaArJVAjBdB8ktvPT9F0NjnC5lZZrTUhjO7z9Ngl5j5a-E-Yr08UGPsaN7HpQC98Y_RXZLGnkxRCWdih0FolifXQIv5bWquMnj3Fa2o',
            }}
            style={styles.heroImage}
          />
          <Text style={styles.tagline}>
            Learn, Grow, and Discover with Fun!
          </Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttons}>
          <ActionButton
            colors={['#3B82F6', '#2563EB']}
            border="#1E40AF"
            icon="school"
            textTop="Login for"
            textBottom="School Account"
            textColor="#fff"
          />

          <ActionButton
            colors={['#FCD34D', '#F59E0B']}
            border="#A16207"
            icon="plus"
            textTop="Create Account"
            subText="New here? Set up your subscription"
            textColor="#422006"
          />

          <ActionButton
            colors={['#FB923C', '#EA580C']}
            border="#9A3412"
            icon="smile"
            textTop="Sign In"
            subText="Already have a personal account"
            textColor="#fff"
          />
        </View>
      </View>
    </LinearGradient>
  );
}

/* Background shapes from 3.tsx */
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
      <MaterialCommunityIcons name="balloon" size={26} color={accent} style={[styles.icon, { left: width * 0.18, top: 250 }]} />
    </View>
  );
}

/* BUTTON COMPONENT */
function ActionButton({
  colors,
  border,
  icon,
  textTop,
  textBottom,
  subText,
  textColor,
}: any) {
  return (
    <TouchableOpacity activeOpacity={0.9} style={[styles.btnWrapper, { borderBottomColor: border }]}>
      <LinearGradient colors={colors} style={styles.btn}>
        <View style={styles.iconCircle}>
          <FontAwesome5 name={icon} size={22} color={textColor} />
        </View>
        <View>
          <Text style={[styles.btnText, { color: textColor }]}>{textTop}</Text>
          {textBottom && (
            <Text style={[styles.btnText, { color: textColor }]}>
              {textBottom}
            </Text>
          )}
          {subText && (
            <Text style={[styles.subText, { color: textColor }]}>
              {subText}
            </Text>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  sun: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 80,
    height: 80,
    opacity: 0.9,
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
    justifyContent: 'space-between',
    maxWidth: 420,
    alignSelf: 'center',
    width: '100%',
  },

  header: {
    alignItems: 'center',
  },

  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 8,
  },

  brand: {
    fontSize: 32,
    fontWeight: '900',
    color: '#1F7AE0',
    fontFamily: 'Comic Sans MS',
  },

  welcome: {
    marginTop: 16,
    fontSize: 34,
    fontWeight: '900',
    color: '#123e7a',
    textAlign: 'center',
    lineHeight: 40,
    fontFamily: 'Comic Sans MS',
    textShadowColor: 'rgba(0,0,0,0.06)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 6,
  },

  hero: {
    alignItems: 'center',
    marginTop: -10,
  },

  heroImage: {
    width: 250,
    height: 250,
    borderRadius: 24,
    borderWidth: 4,
    borderColor: '#fff',
    backgroundColor: '#fff',
  },

  tagline: {
    marginTop: 16,
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
  },

  buttons: {
    gap: 16,
  },

  btnWrapper: {
    borderBottomWidth: 6,
    borderRadius: 26,
    overflow: 'hidden',
  },

  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 28,
    gap: 14,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },

  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },

  btnText: {
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 24,
    letterSpacing: 0.4,
  },

  subText: {
    fontSize: 12,
    opacity: 0.8,
    marginTop: 2,
  },

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
});

