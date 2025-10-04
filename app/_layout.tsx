import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { NotoSansTelugu_400Regular } from '@expo-google-fonts/noto-sans-telugu';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { ThemeProvider } from '@/hooks/useTheme';
import { initializeAds } from '@/utils/adInitializer';

export default function RootLayout() {
  useFrameworkReady();
  const [showSplash, setShowSplash] = useState(true);
  const fadeAnim = new Animated.Value(1);
  const scaleAnim = new Animated.Value(0.8);

  let [fontsLoaded] = useFonts({
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-SemiBold': Poppins_600SemiBold,
    'NotoSansTelugu-Regular': NotoSansTelugu_400Regular,
  });

  useEffect(() => {
    // Initialize ads (platform-specific)
    initializeAds().catch(error => {
      console.log('Ad initialization error:', error);
    });

    if (fontsLoaded) {
      // Start transition after fonts are loaded
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 800,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setShowSplash(false);
        });
      }, 1500); // Show splash for 1.5 seconds
    }
  }, [fontsLoaded]);

  if (!fontsLoaded || showSplash) {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <LinearGradient
          colors={['#2AA8A8', '#25999B']}
          style={styles.gradient}
        >
          <Animated.View 
            style={[
              styles.splashContent,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              }
            ]}
          >
            <Text style={styles.logo}>📚</Text>
            <Text style={styles.title}>Telugu Daily</Text>
            <Text style={styles.tagline}>Learn Telugu, One Day at a Time</Text>
          </Animated.View>
        </LinearGradient>
      </View>
    );
  }

  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 24,
    fontFamily: 'NotoSansTelugu-Regular',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  tagline: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
    opacity: 0.9,
  },
});


