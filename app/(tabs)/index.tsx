import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, Check } from 'lucide-react-native';
import * as Speech from 'expo-speech';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { NotoSansTelugu_400Regular } from '@expo-google-fonts/noto-sans-telugu';
import { sentences } from '@/data/sentences';
import { useTheme } from '@/hooks/useTheme';

interface SentenceProgress {
  id: number;
  viewCount: number;
  completed: boolean;
  mastered: boolean;
  lastViewed: Date;
}

export default function HomeScreen() {
  let [fontsLoaded] = useFonts({
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-Medium': Poppins_500Medium,
    'Poppins-SemiBold': Poppins_600SemiBold,
    'NotoSansTelugu-Regular': NotoSansTelugu_400Regular,
  });

  const { theme } = useTheme();
  const [currentDay, setCurrentDay] = useState(1);
  const [progress, setProgress] = useState<{ [key: number]: SentenceProgress }>({});
  const [showProgressPopup, setShowProgressPopup] = useState(false);

  useEffect(() => {
    // Initialize progress for available sentences
    const newProgress: { [key: number]: SentenceProgress } = {};
    sentences.slice(0, getCurrentDayLimit()).forEach((_, index) => {
      if (!progress[index]) {
        newProgress[index] = {
          id: index,
          viewCount: 0,
          completed: false,
          mastered: false,
          lastViewed: new Date(),
        };
      }
    });
    setProgress(prev => ({ ...prev, ...newProgress }));
  }, [currentDay]);

  const getCurrentDayLimit = () => currentDay * 50;
  const getTodaysSentences = () => {
    const startIndex = (currentDay - 1) * 50;
    const endIndex = currentDay * 50;
    return sentences.slice(startIndex, endIndex);
  };

  const handleSentenceView = (index: number) => {
    const actualIndex = (currentDay - 1) * 50 + index;
    setProgress(prev => {
      const current = prev[actualIndex] || {
        id: actualIndex,
        viewCount: 0,
        completed: false,
        mastered: false,
        lastViewed: new Date(),
      };
      
      const newViewCount = current.viewCount + 1;
      return {
        ...prev,
        [actualIndex]: {
          ...current,
          viewCount: newViewCount,
          completed: true,
          mastered: newViewCount >= 2,
          lastViewed: new Date(),
        }
      };
    });

  };

  const handleTextToSpeech = async (text: string, isEnglish: boolean = true) => {
    try {
      const language = isEnglish ? 'en-US' : 'te-IN';
      await Speech.speak(text, {
        language,
        pitch: 1.0,
        rate: 0.8,
      });
    } catch (error) {
      Alert.alert('Speech Error', 'Text-to-speech is not available on this device.');
    }
  };



  const getProgressStats = () => {
    const totalAvailable = getCurrentDayLimit();
    const completed = Object.values(progress).filter(p => p.completed).length;
    const mastered = Object.values(progress).filter(p => p.mastered).length;
    return { totalAvailable, completed, mastered };
  };

  if (!fontsLoaded) {
    return null;
  }

  const todaysSentences = getTodaysSentences();
  const { totalAvailable, completed, mastered } = getProgressStats();

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {/* Header */}
      <LinearGradient
        colors={['#2AA8A8', '#25999B']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Telugu Daily</Text>
        </View>
        <Text style={styles.headerSubtitle}>Day {currentDay} • 50 New Phrases</Text>
        
        {/* Progress Ring */}
        <View style={styles.progressContainer}>
          <View style={styles.progressRing}>
            <Text style={styles.progressText}>{completed}/{totalAvailable}</Text>
            <Text style={styles.progressLabel}>Learned</Text>
          </View>
          <View style={styles.masteredStats}>
            <Text style={styles.masteredCount}>🌳 {mastered}</Text>
            <Text style={styles.masteredLabel}>Mastered</Text>
          </View>
        </View>
      </LinearGradient>



      {/* Progress Popup */}
      {showProgressPopup && (
        <View style={styles.progressPopup}>
          <Text style={styles.popupTitle}>Your Progress</Text>
          <View style={styles.popupStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{completed}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{mastered}</Text>
              <Text style={styles.statLabel}>Mastered</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{currentDay}</Text>
              <Text style={styles.statLabel}>Days</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.closePopup}
            onPress={() => setShowProgressPopup(false)}
          >
            <Text style={styles.closePopupText}>Close</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Sentence Cards */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {todaysSentences.map((sentence, index) => {
          const actualIndex = (currentDay - 1) * 50 + index;
          const sentenceProgress = progress[actualIndex];
          const isCompleted = sentenceProgress?.completed || false;
          const isMastered = sentenceProgress?.mastered || false;
          
          return (
            <View key={index} style={[
              styles.sentenceCard,
              isCompleted && styles.completedCard,
              isMastered && styles.masteredCard
            ]}>
              <View style={styles.cardHeader}>
                <Text style={styles.sentenceNumber}>#{actualIndex + 1}</Text>
                <View style={styles.statusIndicators}>
                  {isCompleted && <Check size={16} color="#27AE60" />}
                  {isMastered && <Text style={styles.masteredIcon}>🌳</Text>}
                </View>
              </View>
              
              <TouchableOpacity 
                style={styles.teluguContainer}
                onPress={() => handleTextToSpeech(sentence.telugu, false)}
              >
                <Text style={styles.teluguText}>{sentence.telugu}</Text>
                <Play size={20} color="#2AA8A8" style={styles.playIcon} />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.englishContainer}
                onPress={() => handleTextToSpeech(sentence.english, true)}
              >
                <Text style={styles.englishText}>{sentence.english}</Text>
                <Play size={16} color="#F5A623" style={styles.playIcon} />
              </TouchableOpacity>
              
              <View style={styles.cardActions}>
                <TouchableOpacity 
                  style={[styles.actionButton, styles.knowButton, styles.fullWidthButton]}
                  onPress={() => handleSentenceView(index)}
                >
                  <Check size={16} color="#27AE60" />
                  <Text style={styles.knowButtonText}>Know It</Text>
                </TouchableOpacity>
              </View>
              
              {sentenceProgress && (
                <Text style={styles.viewCount}>
                  Viewed {sentenceProgress.viewCount} time{sentenceProgress.viewCount !== 1 ? 's' : ''}
                </Text>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingTop: 42,
    paddingBottom: 3,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  homeButton: {
    padding: 4,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerSubtitle: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressRing: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  progressLabel: {
    fontSize: 8,
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
    opacity: 0.8,
  },
  masteredStats: {
    alignItems: 'center',
  },
  masteredCount: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  masteredLabel: {
    fontSize: 8,
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
    opacity: 0.8,
  },
  progressPopup: {
    position: 'absolute',
    top: 120,
    right: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    zIndex: 1000,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  popupTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#2C3E50',
    marginBottom: 12,
  },
  popupStats: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: '#2AA8A8',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#2C3E50',
  },
  closePopup: {
    marginTop: 12,
    padding: 8,
    backgroundColor: '#2AA8A8',
    borderRadius: 6,
  },
  closePopupText: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sentenceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  completedCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#27AE60',
  },
  masteredCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#F5A623',
    backgroundColor: '#FFFEF7',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sentenceNumber: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#2AA8A8',
  },
  statusIndicators: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  masteredIcon: {
    fontSize: 16,
  },
  teluguContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  teluguText: {
    flex: 1,
    fontSize: 24,
    fontFamily: 'NotoSansTelugu-Regular',
    color: '#2C3E50',
    lineHeight: 36,
  },
  playIcon: {
    marginLeft: 8,
    marginTop: 8,
  },
  englishContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  englishText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#2C3E50',
    lineHeight: 24,
  },
  cardActions: {
    flexDirection: 'row',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 6,
  },
  fullWidthButton: {
    flex: 1,
  },
  knowButton: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#27AE60',
  },
  knowButtonText: {
    color: '#27AE60',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  viewCount: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#8E8E93',
    textAlign: 'center',
    marginTop: 8,
  },
});