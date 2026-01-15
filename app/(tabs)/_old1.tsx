import { Image, View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      {/* BUBBLY BACKGROUND */}
      <View style={styles.bubblyBg}>
        <View style={[styles.blob, styles.blobBlue]} />
        <View style={[styles.blob, styles.blobTeal]} />
        <View style={[styles.blob, styles.blobPurple]} />
        <View style={[styles.blob, styles.blobDeepBlue]} />
        <View style={[styles.blob, styles.blobTurquoise]} />
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        {/* Icon Card */}
        <View style={styles.iconWrapper}>
          <BlurView intensity={40} tint="dark" style={styles.iconCard}>
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsRtqa-sDj2I8NqJJTOnxQaN3fm46LYKDYg4x-4Q_-P37a__wttODIHTcaofVr48d6lyuJD7U8Nr9tGwkTb7zCmWgUnLx4BbbdxIYv_y8sMuXQvTuftEtHgGdWAhRyy1QU-u6SZ0THTfrR_LwhTkFGmzLVT5jZWKIhmtJvAeVmVHVZdAhh75r_HJaUvb4IWdcYOPMoYRoF8DzCUNTWMY7C6_onrKBm6uO8ogy7OeyKkZ7hlHZ04zuN7hIinGiHoe1-nCpeYjNYWGk',
              }}
              style={styles.logo}
              resizeMode="contain"
            />
          </BlurView>
        </View>

        {/* Text */}
        <Text style={styles.title}>Welcome to Chrysalis</Text>
      </View>

      {/* BUTTONS */}
      <View style={styles.buttons}>
        <ActionButton
          color="#14b8a6"
          text="Login for School Account"
          icon="directions-bus"
        />
        <ActionButton
          color="#86198f"
          text="Create Account"
          icon="backpack"
        />
        <ActionButton
          color="#fefaf6"
          text="Sign In"
          icon="person"
          darkText
        />
      </View>
    </View>
  );
}

/* BUTTON COMPONENT */
function ActionButton({
  text,
  color,
  icon,
  darkText = false,
}: {
  text: string;
  color: string;
  icon: any;
  darkText?: boolean;
}) {
  return (
    <TouchableOpacity activeOpacity={0.9} style={[styles.button, { backgroundColor: color }]}>
      <MaterialIcons
        name={icon}
        size={28}
        color={darkText ? '#0a192f' : '#fff'}
      />
      <Text
        style={[
          styles.buttonText,
          { color: darkText ? '#0a192f' : '#fff' },
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a192f',
  },

  bubblyBg: {
    ...StyleSheet.absoluteFillObject,
  },

  blob: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.35,
  },

  blobBlue: {
    width: 320,
    height: 320,
    backgroundColor: '#1e40af',
    top: -40,
    left: -40,
  },
  blobTeal: {
    width: 260,
    height: 260,
    backgroundColor: '#115e59',
    top: height * 0.25,
    right: -80,
  },
  blobPurple: {
    width: 300,
    height: 300,
    backgroundColor: '#86198f',
    bottom: height * 0.25,
    left: -120,
    opacity: 0.2,
  },
  blobDeepBlue: {
    width: 380,
    height: 380,
    backgroundColor: '#1e3a8a',
    bottom: -140,
    right: -40,
  },
  blobTurquoise: {
    width: 160,
    height: 160,
    backgroundColor: '#14b8a6',
    top: height * 0.5,
    left: width * 0.25,
    opacity: 0.25,
  },

  content: {
    flex: 1,
    paddingTop: 140,
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  iconWrapper: {
    marginBottom: 32,
  },

  iconCard: {
    width: 112,
    height: 112,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 72,
    height: 72,
    borderRadius: 20,
  },

  title: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 12,
  },

  subtitle: {
    color: 'rgba(219,234,254,0.8)',
    fontSize: 18,
    textAlign: 'center',
    maxWidth: 300,
    lineHeight: 26,
  },

  buttons: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    gap: 16,
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 18,
    borderRadius: 64,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: '700',
  },
});
