import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import Constants from 'expo-constants';

interface BannerAdProps {
  position: number;
}

export default function BannerAdComponent({ position }: BannerAdProps) {
  if (Platform.OS === 'web') {
    return null;
  }

  const BannerAdNative = require('react-native-google-mobile-ads').BannerAd;
  const BannerAdSize = require('react-native-google-mobile-ads').BannerAdSize;
  const TestIds = require('react-native-google-mobile-ads').TestIds;

  const getAdUnitId = () => {
    const isAndroid = Platform.OS === 'android';
    const isDevelopment = __DEV__;

    if (isDevelopment) {
      return TestIds.BANNER;
    }

    if (isAndroid) {
      return Constants.expoConfig?.extra?.EXPO_PUBLIC_ADMOB_BANNER_AD_UNIT_ID_ANDROID ||
             process.env.EXPO_PUBLIC_ADMOB_BANNER_AD_UNIT_ID_ANDROID ||
             TestIds.BANNER;
    }

    return Constants.expoConfig?.extra?.EXPO_PUBLIC_ADMOB_BANNER_AD_UNIT_ID_IOS ||
           process.env.EXPO_PUBLIC_ADMOB_BANNER_AD_UNIT_ID_IOS ||
           TestIds.BANNER;
  };

  const adUnitId = getAdUnitId();

  return (
    <View style={styles.adContainer}>
      <BannerAdNative
        unitId={adUnitId}
        size={BannerAdSize.BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: false,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  adContainer: {
    marginVertical: 16,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
  },
});