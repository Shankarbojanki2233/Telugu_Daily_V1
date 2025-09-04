import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ExternalLink } from 'lucide-react-native';

interface BannerAdProps {
  position: number;
  adUnitId?: string;
  appId?: string;
}

export default function BannerAd({ position, adUnitId, appId }: BannerAdProps) {
  // TODO: Replace with actual ad implementation
  // Add your Ad Unit ID and App ID in the index.tsx file when calling this component
  
  const handleAdPress = () => {
    // TODO: Handle ad interaction
    console.log(`Banner ad ${position} clicked`);
  };

  return (
    <View style={styles.adContainer}>
      <TouchableOpacity style={styles.adBanner} onPress={handleAdPress}>
        <View style={styles.adContent}>
          <ExternalLink size={16} color="#8E8E93" />
          <Text style={styles.adText}>Advertisement</Text>
        </View>
        <Text style={styles.adPosition}>Banner Ad #{position}</Text>
        <Text style={styles.adPlaceholder}>
          Ad Unit ID: {adUnitId || 'Not Set'}
        </Text>
        <Text style={styles.adPlaceholder}>
          App ID: {appId || 'Not Set'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  adContainer: {
    marginVertical: 16,
    paddingHorizontal: 4,
  },
  adBanner: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E1E1E6',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 80,
  },
  adContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  adText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#8E8E93',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  adPosition: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#2C3E50',
    marginBottom: 2,
  },
  adPlaceholder: {
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    color: '#8E8E93',
    marginTop: 2,
  },
});