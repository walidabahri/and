import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Switch } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Settings, Bell, Shield, CircleHelp as HelpCircle, LogOut, ChevronRight, Moon, Share2, Heart, Award } from 'lucide-react-native';

export default function ProfileScreen() {
  const { theme, toggleTheme, isDark } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      paddingTop: 20,
      paddingBottom: 24,
      paddingHorizontal: 20,
      backgroundColor: theme.primary,
      alignItems: 'center',
    },
    profileImageContainer: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    profileImage: {
      width: 96,
      height: 96,
      borderRadius: 48,
    },
    profileName: {
      fontFamily: 'Poppins-Bold',
      fontSize: 20,
      color: '#FFFFFF',
      marginBottom: 4,
    },
    profileEmail: {
      fontFamily: 'Roboto-Regular',
      fontSize: 14,
      color: 'rgba(255, 255, 255, 0.8)',
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 16,
      backgroundColor: theme.card,
      borderRadius: 16,
      marginTop: -20,
      marginHorizontal: 20,
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    statItem: {
      alignItems: 'center',
    },
    statValue: {
      fontFamily: 'Poppins-Bold',
      fontSize: 18,
      color: theme.primary,
    },
    statLabel: {
      fontFamily: 'Roboto-Regular',
      fontSize: 12,
      color: theme.textSecondary,
      marginTop: 4,
    },
    section: {
      marginTop: 24,
      paddingHorizontal: 20,
    },
    sectionTitle: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: 16,
      color: theme.text,
      marginBottom: 16,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    menuItemFirst: {
      borderTopWidth: 1,
      borderTopColor: theme.border,
    },
    menuItemLast: {
      borderBottomWidth: 0,
    },
    menuIcon: {
      width: 40,
      alignItems: 'center',
    },
    menuContent: {
      flex: 1,
      marginLeft: 8,
    },
    menuLabel: {
      fontFamily: 'Roboto-Medium',
      fontSize: 16,
      color: theme.text,
    },
    menuDescription: {
      fontFamily: 'Roboto-Regular',
      fontSize: 12,
      color: theme.textSecondary,
      marginTop: 2,
    },
    menuAction: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    logoutButton: {
      marginHorizontal: 20,
      paddingVertical: 16,
      borderRadius: 12,
      backgroundColor: theme.error,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 24,
      marginBottom: 40,
    },
    logoutText: {
      fontFamily: 'Roboto-Medium',
      fontSize: 16,
      color: '#FFFFFF',
      marginLeft: 8,
    },
  });

  const renderMenuItem = (icon, label, description, action, isFirst = false, isLast = false) => (
    <TouchableOpacity 
      style={[
        styles.menuItem, 
        isFirst && styles.menuItemFirst,
        isLast && styles.menuItemLast
      ]}
    >
      <View style={styles.menuIcon}>
        {icon}
      </View>
      <View style={styles.menuContent}>
        <Text style={styles.menuLabel}>{label}</Text>
        {description && <Text style={styles.menuDescription}>{description}</Text>}
      </View>
      <View style={styles.menuAction}>
        {action}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.profileImageContainer}>
            <User size={48} color={theme.primary} />
          </View>
          <Text style={styles.profileName}>Alex Johnson</Text>
          <Text style={styles.profileEmail}>alex.johnson@example.com</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>Meal Plans</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>38</Text>
            <Text style={styles.statLabel}>Recipes</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          {renderMenuItem(
            <User size={24} color={theme.primary} />,
            'Personal Information',
            'Update your profile details',
            <ChevronRight size={20} color={theme.textSecondary} />,
            true
          )}
          {renderMenuItem(
            <Bell size={24} color={theme.primary} />,
            'Notifications',
            'Configure your alerts and reminders',
            <ChevronRight size={20} color={theme.textSecondary} />
          )}
          {renderMenuItem(
            <Shield size={24} color={theme.primary} />,
            'Privacy & Security',
            'Manage your privacy settings',
            <ChevronRight size={20} color={theme.textSecondary} />,
            false,
            true
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          {renderMenuItem(
            <Moon size={24} color={theme.primary} />,
            'Dark Mode',
            'Switch between light and dark themes',
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: '#767577', true: theme.primaryLight }}
              thumbColor={isDark ? theme.primary : '#f4f3f4'}
            />,
            true
          )}
          {renderMenuItem(
            <Share2 size={24} color={theme.primary} />,
            'Sharing Preferences',
            'Manage how you share meal plans',
            <ChevronRight size={20} color={theme.textSecondary} />
          )}
          {renderMenuItem(
            <Heart size={24} color={theme.primary} />,
            'Dietary Preferences',
            'Set your dietary restrictions and preferences',
            <ChevronRight size={20} color={theme.textSecondary} />,
            false,
            true
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          {renderMenuItem(
            <HelpCircle size={24} color={theme.primary} />,
            'Help & Support',
            'Get help or contact us',
            <ChevronRight size={20} color={theme.textSecondary} />,
            true
          )}
          {renderMenuItem(
            <Award size={24} color={theme.primary} />,
            'About MealMaster',
            'Learn more about our app',
            <ChevronRight size={20} color={theme.textSecondary} />,
            false,
            true
          )}
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <LogOut size={20} color="#FFFFFF" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}