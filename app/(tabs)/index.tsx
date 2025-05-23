import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, ShoppingCart } from 'lucide-react-native';
import { Calendar } from 'react-native-calendars';

export default function MealPlanScreen() {
  const { theme, isDark } = useTheme();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showCalendar, setShowCalendar] = useState(false);

  // Sample meal data
  const meals = {
    breakfast: [
      { id: '1', name: 'Greek Yogurt Bowl', calories: 320, protein: 24, carbs: 36, fat: 12 }
    ],
    lunch: [
      { id: '2', name: 'Chicken Salad Wrap', calories: 480, protein: 32, carbs: 42, fat: 18 }
    ],
    dinner: [
      { id: '3', name: 'Salmon with Roasted Vegetables', calories: 520, protein: 38, carbs: 24, fat: 28 }
    ],
    snacks: [
      { id: '4', name: 'Apple with Almond Butter', calories: 210, protein: 5, carbs: 22, fat: 12 }
    ]
  };

  const totalNutrition = {
    calories: Object.values(meals).flat().reduce((sum, meal) => sum + meal.calories, 0),
    protein: Object.values(meals).flat().reduce((sum, meal) => sum + meal.protein, 0),
    carbs: Object.values(meals).flat().reduce((sum, meal) => sum + meal.carbs, 0),
    fat: Object.values(meals).flat().reduce((sum, meal) => sum + meal.fat, 0)
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
      backgroundColor: theme.primary,
    },
    headerTitle: {
      fontFamily: 'Poppins-Bold',
      fontSize: 24,
      color: '#FFFFFF',
      marginBottom: 4,
    },
    headerSubtitle: {
      fontFamily: 'Roboto-Regular',
      fontSize: 14,
      color: 'rgba(255, 255, 255, 0.8)',
    },
    dateSelector: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 16,
      backgroundColor: theme.background,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    dateText: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: 16,
      color: theme.text,
    },
    dateNavigation: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    dateButton: {
      padding: 8,
      borderRadius: 8,
      backgroundColor: 'rgba(0,0,0,0.05)',
      marginHorizontal: 4,
    },
    content: {
      flex: 1,
      paddingTop: 16,
    },
    calendarContainer: {
      marginHorizontal: 20,
      marginBottom: 16,
      borderRadius: 16,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: theme.border,
    },
    mealSection: {
      marginBottom: 24,
      paddingHorizontal: 20,
    },
    mealTypeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    mealTypeTitle: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: 18,
      color: theme.text,
    },
    addButton: {
      padding: 4,
    },
    mealCard: {
      backgroundColor: theme.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderLeftWidth: 4,
      borderLeftColor: theme.primary,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    mealName: {
      fontFamily: 'Roboto-Medium',
      fontSize: 16,
      color: theme.text,
      marginBottom: 8,
    },
    nutritionInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    nutritionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 16,
      marginBottom: 4,
    },
    nutritionLabel: {
      fontFamily: 'Roboto-Regular',
      fontSize: 12,
      color: theme.textSecondary,
      marginRight: 4,
    },
    nutritionValue: {
      fontFamily: 'Roboto-Medium',
      fontSize: 12,
      color: theme.text,
    },
    emptyMeal: {
      backgroundColor: theme.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      justifyContent: 'center',
      height: 80,
      borderStyle: 'dashed',
      borderWidth: 1,
      borderColor: theme.border,
    },
    emptyMealText: {
      fontFamily: 'Roboto-Regular',
      fontSize: 14,
      color: theme.textSecondary,
      textAlign: 'center',
    },
    summaryContainer: {
      backgroundColor: theme.card,
      margin: 20,
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: theme.border,
    },
    summaryTitle: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: 16,
      color: theme.text,
      marginBottom: 12,
    },
    summaryContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    summaryItem: {
      alignItems: 'center',
    },
    summaryValue: {
      fontFamily: 'Poppins-Bold',
      fontSize: 20,
      color: theme.text,
    },
    summaryLabel: {
      fontFamily: 'Roboto-Regular',
      fontSize: 12,
      color: theme.textSecondary,
      marginTop: 4,
    },
    groceryButton: {
      backgroundColor: theme.secondary,
      marginHorizontal: 20,
      marginBottom: 20,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    groceryButtonText: {
      fontFamily: 'Roboto-Bold',
      fontSize: 16,
      color: '#FFFFFF',
      marginLeft: 8,
    },
    fab: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: theme.primary,
      width: 56,
      height: 56,
      borderRadius: 28,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
  });

  const renderMealSection = (title, mealList) => {
    return (
      <View style={styles.mealSection}>
        <View style={styles.mealTypeContainer}>
          <Text style={styles.mealTypeTitle}>{title}</Text>
          <TouchableOpacity style={styles.addButton}>
            <Plus size={20} color={theme.primary} />
          </TouchableOpacity>
        </View>
        
        {mealList && mealList.length > 0 ? (
          mealList.map((meal) => (
            <View key={meal.id} style={styles.mealCard}>
              <Text style={styles.mealName}>{meal.name}</Text>
              <View style={styles.nutritionInfo}>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionLabel}>Calories:</Text>
                  <Text style={styles.nutritionValue}>{meal.calories}</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionLabel}>Protein:</Text>
                  <Text style={styles.nutritionValue}>{meal.protein}g</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionLabel}>Carbs:</Text>
                  <Text style={styles.nutritionValue}>{meal.carbs}g</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionLabel}>Fat:</Text>
                  <Text style={styles.nutritionValue}>{meal.fat}g</Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyMeal}>
            <Text style={styles.emptyMealText}>Tap + to add a {title.toLowerCase()}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meal Planner</Text>
        <Text style={styles.headerSubtitle}>Plan your meals for better nutrition</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.dateSelector}
        onPress={() => setShowCalendar(!showCalendar)}
      >
        <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
        <View style={styles.dateNavigation}>
          <TouchableOpacity 
            style={styles.dateButton}
            onPress={() => {
              const date = new Date(selectedDate);
              date.setDate(date.getDate() - 1);
              setSelectedDate(date.toISOString().split('T')[0]);
            }}
          >
            <ChevronLeft size={20} color={theme.text} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.dateButton}
            onPress={() => {
              const date = new Date(selectedDate);
              date.setDate(date.getDate() + 1);
              setSelectedDate(date.toISOString().split('T')[0]);
            }}
          >
            <ChevronRight size={20} color={theme.text} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.dateButton, {marginLeft: 8}]}
            onPress={() => setShowCalendar(!showCalendar)}
          >
            <CalendarIcon size={20} color={theme.text} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      
      {showCalendar && (
        <View style={styles.calendarContainer}>
          <Calendar
            onDayPress={(day) => {
              setSelectedDate(day.dateString);
              setShowCalendar(false);
            }}
            markedDates={{
              [selectedDate]: {selected: true, selectedColor: theme.primary}
            }}
            theme={{
              backgroundColor: theme.background,
              calendarBackground: theme.background,
              textSectionTitleColor: theme.text,
              selectedDayBackgroundColor: theme.primary,
              selectedDayTextColor: '#ffffff',
              todayTextColor: theme.primary,
              dayTextColor: theme.text,
              textDisabledColor: theme.disabled,
              dotColor: theme.primary,
              selectedDotColor: '#ffffff',
              arrowColor: theme.primary,
              monthTextColor: theme.text,
              textDayFontFamily: 'Roboto-Regular',
              textMonthFontFamily: 'Poppins-SemiBold',
              textDayHeaderFontFamily: 'Roboto-Medium',
            }}
          />
        </View>
      )}
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderMealSection('Breakfast', meals.breakfast)}
        {renderMealSection('Lunch', meals.lunch)}
        {renderMealSection('Dinner', meals.dinner)}
        {renderMealSection('Snacks', meals.snacks)}
        
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Daily Nutrition Summary</Text>
          <View style={styles.summaryContent}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{totalNutrition.calories}</Text>
              <Text style={styles.summaryLabel}>Calories</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{totalNutrition.protein}g</Text>
              <Text style={styles.summaryLabel}>Protein</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{totalNutrition.carbs}g</Text>
              <Text style={styles.summaryLabel}>Carbs</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{totalNutrition.fat}g</Text>
              <Text style={styles.summaryLabel}>Fat</Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity style={styles.groceryButton}>
          <ShoppingCart size={20} color="#FFFFFF" />
          <Text style={styles.groceryButtonText}>Generate Grocery List</Text>
        </TouchableOpacity>
      </ScrollView>
      
      <TouchableOpacity style={styles.fab}>
        <Plus size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}