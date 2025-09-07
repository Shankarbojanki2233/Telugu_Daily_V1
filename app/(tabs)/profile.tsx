import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Settings, Volume2, Moon, Palette, Trophy } from 'lucide-react-native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { useTheme } from '@/hooks/useTheme';

export default function ProfileScreen() {
  let [fontsLoaded] = useFonts({
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-Medium': Poppins_500Medium,
    'Poppins-SemiBold': Poppins_600SemiBold,
  });

  const { isNightMode, toggleNightMode, theme } = useTheme();

  const [settings, setSettings] = useState({
    soundEnabled: true,
    autoPlay: true,
    textZoom: false,
    notifications: true,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const userStats = {
    name: 'English Learner',
    joinDate: 'January 2024',
    currentStreak: 5,
    longestStreak: 12,
    totalSentences: 250,
    masteredSentences: 120,
    daysActive: 5,
    level: 'Beginner',
  };

  const achievements = [
    { id: 1, title: 'First Steps', icon: '🌱', unlocked: true, description: 'Completed first 50 sentences' },
    { id: 2, title: 'Consistent Learner', icon: '🔥', unlocked: true, description: '5-day learning streak' },
    { id: 3, title: 'Quick Learner', icon: '⚡', unlocked: true, description: 'Mastered 100 sentences' },
    { id: 4, title: 'Night Owl', icon: '🌙', unlocked: false, description: 'Learn for 7 consecutive days' },
    { id: 5, title: 'Master Student', icon: '🎓', unlocked: false, description: 'Master 500 sentences' },
  ];

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {/* Header */}
      <LinearGradient
        colors={['#9B59B6', '#8E44AD']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
        
        {/* User Info */}
        <View style={styles.userInfo}>  
          <View style={styles.avatar}>
            <User size={32} color="#FFFFFF" />
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{userStats.name}</Text>
            <Text style={styles.userLevel}>{userStats.level} • Member since {userStats.joinDate}</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Stats */}
        <View style={[styles.statsContainer, { backgroundColor: theme.cardBackground }]}>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: theme.accent }]}>{userStats.currentStreak}</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Current Streak</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: theme.accent }]}>{userStats.totalSentences}</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Sentences Learned</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: theme.accent }]}>{userStats.masteredSentences}</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Mastered</Text>
          </View>
        </View>

        {/* Achievements */}
        <View style={[styles.sectionContainer, { backgroundColor: theme.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <Trophy size={20} color="#F5A623" />
            <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>Achievements</Text>
          </View>
          <View style={styles.achievementsGrid}>
            {achievements.map((achievement) => (
              <View 
                key={achievement.id}
                style={[
                  styles.achievementCard,
                  achievement.unlocked && styles.unlockedAchievement
                ]}
              >
                <Text style={[
                  styles.achievementIcon,
                  !achievement.unlocked && styles.lockedIcon
                ]}>
                  {achievement.unlocked ? achievement.icon : '🔒'}
                </Text>
                <Text style={[
                  styles.achievementTitle,
                  !achievement.unlocked && styles.lockedTitle
                ]}>
                  {achievement.title}
                </Text>
                <Text style={styles.achievementDescription}>
                  {achievement.description}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Settings */}
        <View style={[styles.sectionContainer, { backgroundColor: theme.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <Settings size={20} color="#2AA8A8" />
            <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>Settings</Text>
          </View>
          
          <View style={styles.settingsList}>
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Volume2 size={20} color="#2AA8A8" />
                <Text style={[styles.settingText, { color: theme.textPrimary }]}>Sound Effects</Text>
              </View>
              <Switch
                value={settings.soundEnabled}
                onValueChange={() => toggleSetting('soundEnabled')}
                trackColor={{ false: '#E1E1E6', true: '#2AA8A8' }}
                thumbColor={settings.soundEnabled ? '#FFFFFF' : '#FFFFFF'}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Moon size={20} color="#2AA8A8" />
                <Text style={[styles.settingText, { color: theme.textPrimary }]}>Night Mode</Text>
              </View>
              <Switch
                value={isNightMode}
                onValueChange={toggleNightMode}
                trackColor={{ false: '#E1E1E6', true: '#2AA8A8' }}
                thumbColor={isNightMode ? '#FFFFFF' : '#FFFFFF'}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Palette size={20} color="#2AA8A8" />
                <Text style={styles.settingText}>Text Zoom</Text>
              </View>
              <Switch
                value={settings.textZoom}
                onValueChange={() => toggleSetting('textZoom')}
                trackColor={{ false: '#E1E1E6', true: '#2AA8A8' }}
                thumbColor={settings.textZoom ? '#FFFFFF' : '#FFFFFF'}
              />
            </View>

          </View>
        </View>

        {/* Learning Stats Detail */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Detailed Statistics</Text>
          <View style={styles.detailedStats}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Longest Streak</Text>
              <Text style={styles.detailValue}>{userStats.longestStreak} days</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Days Active</Text>
              <Text style={styles.detailValue}>{userStats.daysActive} days</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Average Daily</Text>
              <Text style={styles.detailValue}>50 sentences</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Mastery Rate</Text>
              <Text style={styles.detailValue}>
                {Math.round((userStats.masteredSentences / userStats.totalSentences) * 100)}%
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Next Milestone</Text>
              <Text style={styles.detailValue}>500 sentences</Text>
            </View>
          </View>
        </View>

        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>Telugu Daily v1.0.0</Text>
          <Text style={styles.appInfoText}>Made with ❤️ for Telugu learners</Text>
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
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  homeButton: {
    padding: 4,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  userLevel: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
    opacity: 0.9,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    flex: 1,
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#2C3E50',
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  achievementCard: {
    width: '48%',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E1E1E6',
  },
  unlockedAchievement: {
    borderColor: '#F5A623',
    backgroundColor: '#FFFEF7',
  },
  achievementIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  lockedIcon: {
    opacity: 0.5,
  },
  achievementTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 4,
  },
  lockedTitle: {
    color: '#8E8E93',
  },
  achievementDescription: {
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    color: '#8E8E93',
    textAlign: 'center',
  },
  settingsList: {
    gap: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#2C3E50',
  },
  settingValue: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#8E8E93',
  },
  detailedStats: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#2C3E50',
  },
  detailValue: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#2AA8A8',
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 40,
  },
  appInfoText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#8E8E93',
    marginVertical: 2,
  },
});