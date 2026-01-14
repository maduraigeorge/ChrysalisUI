// src/components/Logo.tsx
import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

type LogoProps = {
  size?: number;
};

export default function Logo({ size = 96 }: LogoProps) {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Image
        source={require('../assets/images/chrysalis_logo.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
