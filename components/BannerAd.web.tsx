import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface BannerAdProps {
  position: number;
  adUnitId?: string;
  appId?: string;
}

// Web platform dummy implementation
export default function BannerAdComponent({ position }: BannerAdProps) {
  return (
    <View style={styles.adContainer}>
      <Text style={styles.adPlaceholder}>Ad Placeholder (Web)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  adContainer: {
    marginVertical: 16,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
  },
  adPlaceholder: {
    fontSize: 12,
    color: '#666',
  },
});