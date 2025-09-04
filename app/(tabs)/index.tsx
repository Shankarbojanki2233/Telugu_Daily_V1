import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, RotateCcw, CheckCircle, Circle, Trophy, Target } from 'lucide-react-native';
import * as Speech from 'expo-speech';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { NotoSansTelugu_400Regular } from '@expo-google-fonts/noto-sans-telugu';
import { getSentencesByDay } from '@/data/sentences';
import { useTheme } from '@/hooks/useTheme';
import BannerAd from '@/components/BannerAd';

export default function HomeScreen() {
  let [fontsLoaded] = useFonts({
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-Medium': Poppins_500Medium,
    'Poppins-SemiBold': Poppins_600SemiBold,
    'NotoSansTelugu-Regular': NotoSansTelugu_400Regular,
  });

  const { theme } = useTheme();
  const [currentDay] = useState(5);
  const [completedSentences, setCompletedSentences] = useState<{ [key: number]: boolean }>({});
  const [masteredSentences, setMasteredSentences] = useState<{ [key: number]: boolean }>({});
  
  const todaysSentences = getSentencesByDay(currentDay);
  const completedCount = Object.keys(completedSentences).length;
  const masteredCount = Object.keys(masteredSentences).length;

  const handleTextToSpeech = async (text: string, isEnglish: boolean = true) => {
    try {
      const language = isEnglish ? 'en-US' : 'te-IN';
      await Speech.speak(text, {
        language,
        pitch: 1.0,
        rate: 0.8,
      });
    } catch (error) {
      console.log('TTS Error:', error);
    }
  };

  const toggleSentenceCompletion = (sentenceId: number) => {
    setCompletedSentences(prev => ({
      ...prev,
      [sentenceId]: !prev[sentenceId]
    }));
  };

  const toggleSentenceMastery = (sentenceId: number) => {
    if (!completedSentences[sentenceId]) {
      Alert.alert('Complete First', 'Please mark the sentence as completed before mastering it.');
      return;
    }
    setMasteredSentences(prev => ({
      ...prev,
      [sentenceId]: !prev[sentenceId]
    }));
  };

  const resetProgress = () => {
    Alert.alert(
      'Reset Progress',
      'Are you sure you want to reset all progress for today?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset', 
          style: 'destructive',
          onPress: () => {
            setCompletedSentences({});
            setMasteredSentences({});
          }
        }
      ]
    );
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {/* Header */}
      <LinearGradient
        colors={['#2AA8A8', '#25999B']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Day {currentDay}</Text>
          <TouchableOpacity style={styles.resetButton} onPress={resetProgress}>
            <RotateCcw size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerSubtitle}>Today's Telugu Lessons</Text>
        
        {/* Progress Stats */}
        <View style={styles.progressContainer}>
          <View style={styles.progressStat}>
            <Text style={styles.progressNumber}>{completedCount}</Text>
            <Text style={styles.progressLabel}>Completed</Text>
          </View>
          <View style={styles.progressStat}>
            <Text style={styles.progressNumber}>{masteredCount}</Text>
            <Text style={styles.progressLabel}>Mastered</Text>
          </View>
          <View style={styles.progressStat}>
            <Text style={styles.progressNumber}>{50 - completedCount}</Text>
            <Text style={styles.progressLabel}>Remaining</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Daily Goal */}
        <View style={[styles.goalContainer, { backgroundColor: theme.cardBackground }]}>
          <View style={styles.goalHeader}>
            <Target size={20} color="#F5A623" />
            <Text style={[styles.goalTitle, { color: theme.textPrimary }]}>Daily Goal</Text>
          </View>
          <View style={styles.goalProgress}>
            <View style={styles.goalBar}>
              <View 
                style={[
                  styles.goalFill,
                  { width: `${(completedCount / 50) * 100}%` }
                ]} 
              />
            </View>
            <Text style={[styles.goalText, { color: theme.textSecondary }]}>
              {completedCount}/50 sentences completed
            </Text>
          </View>
        </View>

        {/* Sentences List */}
        <View style={styles.sentencesContainer}>
          {todaysSentences.map((sentence, index) => {
            const isCompleted = completedSentences[sentence.id];
            const isMastered = masteredSentences[sentence.id];
            const sentenceNumber = index + 1;
            
            return (
              <React.Fragment key={sentence.id}>
                <View style={[
                  styles.sentenceCard,
                  { backgroundColor: theme.cardBackground },
                  isCompleted && styles.completedCard,
                  isMastered && styles.masteredCard
                ]}>
                  <View style={styles.cardHeader}>
                    <Text style={[styles.sentenceNumber, { color: theme.accent }]}>
                      #{sentenceNumber}
                    </Text>
                    <View style={styles.actionButtons}>
                      <TouchableOpacity
                        style={[
                          styles.statusButton,
                          isCompleted && styles.completedButton
                        ]}
                        onPress={() => toggleSentenceCompletion(sentence.id)}
                      >
                        {isCompleted ? (
                          <CheckCircle size={20} color="#27AE60" />
                        ) : (
                          <Circle size={20} color="#8E8E93" />
                        )}
                      </TouchableOpacity>
                      
                      <TouchableOpacity
                        style={[
                          styles.statusButton,
                          isMastered && styles.masteredButton
                        ]}
                        onPress={() => toggleSentenceMastery(sentence.id)}
                      >
                        <Trophy 
                          size={18} 
                          color={isMastered ? "#F5A623" : "#C7C7CC"} 
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  
                  <TouchableOpacity 
                    style={styles.teluguContainer}
                    onPress={() => handleTextToSpeech(sentence.telugu, false)}
                  >
                    <Text style={styles.teluguText}>{sentence.telugu}</Text>
                    <Play size={18} color="#2AA8A8" style={styles.playIcon} />
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.englishContainer}
                    onPress={() => handleTextToSpeech(sentence.english, true)}
                  >
                    <Text style={[styles.englishText, { color: theme.textSecondary }]}>
                      {sentence.english}
                    </Text>
                    <Play size={14} color="#F5A623" style={styles.playIcon} />
                  </TouchableOpacity>
                </View>

                {/* Banner Ads after 10th, 20th, 30th, 40th sentences */}
                {(sentenceNumber === 10 || sentenceNumber === 20 || sentenceNumber === 30 || sentenceNumber === 40) && (
                  <BannerAd 
                    position={sentenceNumber / 10}
                    adUnitId={undefined} // Replace with your ad unit ID
                    appId={undefined} // Replace with your app ID
                  />
                )}
              </React.Fragment>
            );
          })}

          {/* Final Banner Ad after 50th sentence */}
          <BannerAd 
            position={5} 
            adUnitId={undefined} // Replace with your ad unit ID
            appId={undefined} // Replace with your app ID
          />
        </View>

        {/* Daily Summary */}
        <View style={[styles.summaryContainer, { backgroundColor: theme.cardBackground }]}>
          <Text style={[styles.summaryTitle, { color: theme.textPrimary }]}>
            Day {currentDay} Summary
          </Text>
          <View style={styles.summaryStats}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>{completedCount}</Text>
              <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
                Completed
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>{masteredCount}</Text>
              <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
                Mastered
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>
                {Math.round((completedCount / 50) * 100)}%
              </Text>
              <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
                Progress
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomPadding} />
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
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  resetButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  progressStat: {
    alignItems: 'center',
  },
  progressNumber: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  progressLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
    opacity: 0.9,
    marginTop: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  goalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  goalTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#2C3E50',
  },
  goalProgress: {
    gap: 8,
  },
  goalBar: {
    height: 8,
    backgroundColor: '#E1E1E6',
    borderRadius: 4,
  },
  goalFill: {
    height: '100%',
    backgroundColor: '#2AA8A8',
    borderRadius: 4,
  },
  goalText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#8E8E93',
  },
  sentencesContainer: {
    paddingBottom: 20,
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
    borderLeftWidth: 4,
    borderLeftColor: '#E1E1E6',
  },
  completedCard: {
    borderLeftColor: '#27AE60',
    backgroundColor: '#F0FDF4',
  },
  masteredCard: {
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
    fontFamily: 'Poppins-SemiBold',
    color: '#2AA8A8',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  statusButton: {
    padding: 4,
  },
  completedButton: {
    backgroundColor: 'rgba(39, 174, 96, 0.1)',
    borderRadius: 12,
  },
  masteredButton: {
    backgroundColor: 'rgba(245, 166, 35, 0.1)',
    borderRadius: 12,
  },
  teluguContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  teluguText: {
    flex: 1,
    fontSize: 20,
    fontFamily: 'NotoSansTelugu-Regular',
    color: '#2C3E50',
    lineHeight: 32,
  },
  playIcon: {
    marginLeft: 12,
    marginTop: 6,
  },
  englishContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  englishText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#8E8E93',
    lineHeight: 24,
  },
  summaryContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 16,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryNumber: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: '#2AA8A8',
  },
  summaryLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#8E8E93',
    marginTop: 4,
  },
  bottomPadding: {
    height: 40,
  },
});