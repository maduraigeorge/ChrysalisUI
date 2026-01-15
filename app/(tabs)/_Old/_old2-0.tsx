import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{
            uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsRtqa-sDj2I8NqJJTOnxQaN3fm46LYKDYg4x-4Q_-P37a__wttODIHTcaofVr48d6lyuJD7U8Nr9tGwkTb7zCmWgUnLx4BbbdxIYv_y8sMuXQvTuftEtHgGdWAhRyy1QU-u6SZ0THTfrR_LwhTkFGmzLVT5jZWKIhmtJvAeVmVHVZdAhh75r_HJaUvb4IWdcYOPMoYRoF8DzCUNTWMY7C6_onrKBm6uO8ogy7OeyKkZ7hlHZ04zuN7hIinGiHoe1-nCpeYjNYWGk',
          }}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Chrysalis</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttons}>
        {/* School Login */}
        <TouchableOpacity activeOpacity={0.85}>
          <LinearGradient
            colors={['#5d9cec', '#4a90e2']}
            style={styles.button}
          >
            <FontAwesome5 name="school" size={28} color="#fff" />
            <Text style={styles.buttonTextWhite}>
              Login for{'\n'}School Account
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Create Account */}
        <TouchableOpacity activeOpacity={0.85}>
          <LinearGradient
            colors={['#ffe082', '#fbc02d']}
            style={styles.button}
          >
            <View style={styles.iconCircle}>
              <Ionicons name="add" size={22} color="#fbc02d" />
            </View>
            <View>
              <Text style={styles.buttonTextDark}>Create Account</Text>
              <Text style={styles.subText}>
                New here? Set up your subscription
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Personal Sign In */}
        <TouchableOpacity activeOpacity={0.85}>
          <LinearGradient
            colors={['#ffcc80', '#ff8a65']}
            style={styles.button}
          >
            <View style={styles.iconCircle}>
              <Ionicons name="happy" size={22} color="#ff7043" />
            </View>
            <View>
              <Text style={styles.buttonTextWhite}>Sign In</Text>
              <Text style={styles.subTextDark}>
                Already have a personal account
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef9fc',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    color: '#1565c0',
    marginTop: -10,
  },
  buttons: {
    width: '100%',
    gap: 16,
    alignItems: 'center',
  },
  button: {
    width: 350,
    maxWidth: '100%',
    padding: 16,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    elevation: 4,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextWhite: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  buttonTextDark: {
    color: '#212121',
    fontSize: 18,
    fontWeight: '700',
  },
  subText: {
    fontSize: 13,
    color: '#424242',
    marginTop: 2,
  },
  subTextDark: {
    fontSize: 13,
    color: '#5d4037',
    marginTop: 2,
    opacity: 0.8,
  },
});
