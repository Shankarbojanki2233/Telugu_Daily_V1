import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

interface BannerAdProps {
  position: number;
  adUnitId?: string;
  appId?: string;
}

export default function BannerAdComponent({ position, adUnitId, appId }: BannerAdProps) {
  // Use test ad unit ID if no real ID provided, or in development
  const adId = adUnitId || TestIds.BANNER;

  return (
    <View style={styles.adContainer}>
      <BannerAd
        unitId={adId}
        size={BannerAdSize.BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdLoaded={() => {
          console.log(`Banner ad ${position} loaded successfully`);
        }}
        onAdFailedToLoad={(error) => {
          console.log(`Banner ad ${position} failed to load:`, error);
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
  },
});