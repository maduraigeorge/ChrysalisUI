import { StyleSheet, Text, type TextProps } from 'react-native';
import { fontScale, verticalScale } from './responsive';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: fontScale(16),
    lineHeight: verticalScale(24),
  },
  defaultSemiBold: {
    fontSize: fontScale(16),
    lineHeight: verticalScale(24),
    fontWeight: '600',
  },
  title: {
    fontSize: fontScale(32),
    fontWeight: 'bold',
    lineHeight: verticalScale(32),
  },
  subtitle: {
    fontSize: fontScale(20),
    fontWeight: 'bold',
  },
  link: {
    lineHeight: verticalScale(30),
    fontSize: fontScale(16),
    color: '#0a7ea4',
  },
});
