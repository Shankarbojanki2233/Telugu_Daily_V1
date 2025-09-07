import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, Award, Target, Calendar } from 'lucide-react-native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { useTheme } from '@/hooks/useTheme';

export default function ProgressScreen() {
  let [fontsLoaded] = useFonts({
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-Medium': Poppins_500Medium,
    'Poppins-SemiBold': Poppins_600SemiBold,
  });

  const { theme } = useTheme();
  const [currentDay] = useState(5);
  const [totalSentences] = useState(250); // 5 days × 50 sentences
  const [completedSentences] = useState(180);
  const [masteredSentences] = useState(120);

  const progressData = {
    dailyStreak: 5,
    totalDays: currentDay,
    completionRate: Math.round((completedSentences / totalSentences) * 100),
    masteryRate: Math.round((masteredSentences / completedSentences) * 100),
    weeklyGoal: 350,
    currentProgress: totalSentences,
  };

  const milestones = [
    { id: 1, title: 'First Steps', description: '50 sentences learned', target: 50, completed: true, icon: '🌱', reward: 'Unlocked text zoom' },
    { id: 2, title: 'Getting Warmed Up', description: '100 sentences learned', target: 100, completed: true, icon: '🌿', reward: 'Unlocked night mode' },
    { id: 3, title: 'Making Progress', description: '250 sentences learned', target: 250, completed: true, icon: '🌳', reward: 'Achievement gallery' },
    { id: 4, title: 'Half Century', description: '500 sentences learned', target: 500, completed: false, icon: '🏆', reward: 'Custom themes' },
    { id: 5, title: 'Serious Learner', description: '1000 sentences learned', target: 1000, completed: false, icon: '🎯', reward: 'Advanced features' },
  ];

  const weeklyProgress = [
    { day: 'Mon', sentences: 50, completed: true },
    { day: 'Tue', sentences: 50, completed: true },
    { day: 'Wed', sentences: 50, completed: true },
    { day: 'Thu', sentences: 50, completed: true },
    { day: 'Fri', sentences: 50, completed: true },
    { day: 'Sat', sentences: 0, completed: false },
    { day: 'Sun', sentences: 0, completed: false },
  ];

  if (!fontsLoaded) {
    return null;
  }



  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {/* Header */}
      <LinearGradient
        colors={['#27AE60', '#229954']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Your Progress</Text>
        </View>
        <Text style={styles.headerSubtitle}>Keep up the great work!</Text>

        {/* Streak Display */}
        <View style={styles.streakContainer}>
          <Text style={styles.streakNumber}>{progressData.dailyStreak}</Text>
          <Text style={styles.streakLabel}>Day Streak 🔥</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Progress Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <TrendingUp size={24} color="#2AA8A8" />
            <Text style={styles.statNumber}>{progressData.completionRate}%</Text>
            <Text style={styles.statLabel}>Completion Rate</Text>
          </View>
          <View style={styles.statCard}>
            <Target size={24} color="#F5A623" />
            <Text style={styles.statNumber}>{masteredSentences}</Text>
            <Text style={styles.statLabel}>Mastered</Text>
          </View>
          <View style={styles.statCard}>
            <Calendar size={24} color="#27AE60" />
            <Text style={styles.statNumber}>{progressData.totalDays}</Text>
            <Text style={styles.statLabel}>Days Active</Text>
          </View>
        </View>

        {/* Weekly Progress */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>This Week</Text>
          <View style={styles.weeklyContainer}>
            {weeklyProgress.map((day, index) => (
              <View key={index} style={styles.dayColumn}>
                <View style={[
                  styles.dayBar,
                  { height: day.completed ? 60 : 20 },
                  day.completed ? styles.completedBar : styles.pendingBar
                ]} />
                <Text style={styles.dayLabel}>{day.day}</Text>
                <Text style={styles.dayNumber}>{day.sentences}</Text>
              </View>
            ))}
          </View>
          <View style={styles.weeklyGoal}>
            <Text style={styles.goalText}>
              Weekly Goal: {progressData.currentProgress}/{progressData.weeklyGoal}
            </Text>
            <View style={styles.goalBar}>
              <View 
                style={[
                  styles.goalProgress,
                  { width: `${(progressData.currentProgress / progressData.weeklyGoal) * 100}%` }
                ]} 
              />
            </View>
          </View>
        </View>

        {/* Memory Levels */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Memory Matrix</Text>
          <View style={styles.memoryLevels}>
            <View style={styles.memoryLevel}>
              <Text style={styles.memoryIcon}>🌱</Text>
              <View style={styles.memoryInfo}>
                <Text style={styles.memoryTitle}>New</Text>
                <Text style={styles.memoryDesc}>Daily review</Text>
                <Text style={styles.memoryCount}>70 sentences</Text>
              </View>
            </View>
            <View style={styles.memoryLevel}>
              <Text style={styles.memoryIcon}>🌿</Text>
              <View style={styles.memoryInfo}>
                <Text style={styles.memoryTitle}>Review</Text>
                <Text style={styles.memoryDesc}>Every 3 days</Text>
                <Text style={styles.memoryCount}>60 sentences</Text>
              </View>
            </View>
            <View style={styles.memoryLevel}>
              <Text style={styles.memoryIcon}>🌳</Text>
              <View style={styles.memoryInfo}>
                <Text style={styles.memoryTitle}>Master</Text>
                <Text style={styles.memoryDesc}>Weekly review</Text>
                <Text style={styles.memoryCount}>{masteredSentences} sentences</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Milestones */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Milestones</Text>
          {milestones.map((milestone) => (
            <View 
              key={milestone.id} 
              style={[
                styles.milestoneCard,
                milestone.completed && styles.completedMilestone
              ]}
            >
              <View style={styles.milestoneIcon}>
                <Text style={styles.milestoneEmoji}>{milestone.icon}</Text>
              </View>
              <View style={styles.milestoneContent}>
                <Text style={[
                  styles.milestoneTitle,
                  milestone.completed && styles.completedMilestoneTitle
                ]}>
                  {milestone.title}
                </Text>
                <Text style={styles.milestoneDescription}>
                  {milestone.description}
                </Text>
                <Text style={[
                  styles.milestoneReward,
                  milestone.completed && styles.completedReward
                ]}>
                  {milestone.completed ? '✅ ' : '🔒 '}{milestone.reward}
                </Text>
              </View>
              {milestone.completed && (
                <Award size={20} color="#27AE60" style={styles.completedIcon} />
              )}
            </View>
          ))}
        </View>

        {/* Progress Ring Detail */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Detailed Progress</Text>
          <View style={styles.progressDetails}>
            <View style={styles.progressRingLarge}>
              <Text style={styles.progressRingNumber}>{completedSentences}</Text>
              <Text style={styles.progressRingTotal}>/ {totalSentences}</Text>
              <Text style={styles.progressRingLabel}>Completed</Text>
            </View>
            <View style={styles.progressBreakdown}>
              <View style={styles.breakdownItem}>
                <View style={[styles.breakdownDot, { backgroundColor: '#27AE60' }]} />
                <Text style={styles.breakdownLabel}>Mastered: {masteredSentences}</Text>
              </View>
              <View style={styles.breakdownItem}>
                <View style={[styles.breakdownDot, { backgroundColor: '#F5A623' }]} />
                <Text style={styles.breakdownLabel}>Learning: {completedSentences - masteredSentences}</Text>
              </View>
              <View style={styles.breakdownItem}>
                <View style={[styles.breakdownDot, { backgroundColor: '#E74C3C' }]} />
                <Text style={styles.breakdownLabel}>Remaining: {totalSentences - completedSentences}</Text>
              </View>
            </View>
          </View>
        </View>
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
    paddingTop: 46,
    paddingBottom: 3,
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
  homeButton: {
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
  streakContainer: {
    alignItems: 'center',
  },
  streakNumber: {
    fontSize: 48,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  streakLabel: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
    opacity: 0.9,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: '#2C3E50',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#8E8E93',
    marginTop: 4,
    textAlign: 'center',
  },
  sectionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#2C3E50',
    marginBottom: 16,
  },
  weeklyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 100,
    marginBottom: 16,
  },
  dayColumn: {
    alignItems: 'center',
    gap: 4,
  },
  dayBar: {
    width: 20,
    borderRadius: 10,
    minHeight: 20,
  },
  completedBar: {
    backgroundColor: '#27AE60',
  },
  pendingBar: {
    backgroundColor: '#E1E1E6',
  },
  dayLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#8E8E93',
  },
  dayNumber: {
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    color: '#8E8E93',
  },
  weeklyGoal: {
    marginTop: 12,
  },
  goalText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#2C3E50',
    marginBottom: 8,
  },
  goalBar: {
    height: 8,
    backgroundColor: '#E1E1E6',
    borderRadius: 4,
  },
  goalProgress: {
    height: '100%',
    backgroundColor: '#27AE60',
    borderRadius: 4,
  },
  memoryLevels: {
    gap: 12,
  },
  memoryLevel: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
  },
  memoryIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  memoryInfo: {
    flex: 1,
  },
  memoryTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#2C3E50',
  },
  memoryDesc: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#8E8E93',
    marginTop: 2,
  },
  memoryCount: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#2AA8A8',
    marginTop: 4,
  },
  milestoneCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#E1E1E6',
  },
  completedMilestone: {
    backgroundColor: '#F0FDF4',
    borderLeftColor: '#27AE60',
  },
  milestoneIcon: {
    marginRight: 12,
  },
  milestoneEmoji: {
    fontSize: 24,
  },
  milestoneContent: {
    flex: 1,
  },
  milestoneTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#2C3E50',
  },
  completedMilestoneTitle: {
    color: '#27AE60',
  },
  milestoneDescription: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#8E8E93',
    marginTop: 2,
  },
  milestoneReward: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#F5A623',
    marginTop: 4,
  },
  completedReward: {
    color: '#27AE60',
  },
  completedIcon: {
    marginLeft: 8,
  },
  progressDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  progressRingLarge: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F0FDF4',
    borderWidth: 8,
    borderColor: '#27AE60',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressRingNumber: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: '#27AE60',
  },
  progressRingTotal: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#8E8E93',
  },
  progressRingLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#27AE60',
    marginTop: 4,
  },
  progressBreakdown: {
    flex: 1,
    gap: 8,
  },
  breakdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  breakdownDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  breakdownLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#2C3E50',
  },
});