import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

// Guideline sizes based on a typical mobile device (iPhone 12 / 13 mini-ish)
const guidelineBaseWidth = 390; // reference width
const guidelineBaseHeight = 844; // reference height

export function scale(size: number) {
  return Math.round((width / guidelineBaseWidth) * size);
}

export function verticalScale(size: number) {
  return Math.round((height / guidelineBaseHeight) * size);
}

export function moderateScale(size: number, factor = 0.5) {
  const scaled = scale(size);
  return Math.round(size + (scaled - size) * factor);
}

export function fontScale(size: number) {
  // use PixelRatio for crisper text sizing
  return PixelRatio.roundToNearestPixel(scale(size));
}

export { height, width };

