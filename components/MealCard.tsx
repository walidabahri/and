import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Clock, ChevronRight } from 'lucide-react-native';

type MealCardProps = {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  prepTime?: string;
  onPress?: () => void;
};

export default function MealCard({ 
  name, 
  calories, 
  protein, 
  carbs, 
  fat,
  prepTime,
  onPress 
}: MealCardProps) {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    card: {
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
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    name: {
      fontFamily: 'Roboto-Medium',
      fontSize: 16,
      color: theme.text,
      flex: 1,
    },
    prepTimeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    prepTime: {
      fontFamily: 'Roboto-Regular',
      fontSize: 12,
      color: theme.textSecondary,
      marginLeft: 4,
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
  });

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        {prepTime && (
          <View style={styles.prepTimeContainer}>
            <Clock size={12} color={theme.textSecondary} />
            <Text style={styles.prepTime}>{prepTime}</Text>
          </View>
        )}
      </View>
      <View style={styles.nutritionInfo}>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionLabel}>Calories:</Text>
          <Text style={styles.nutritionValue}>{calories}</Text>
        </View>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionLabel}>Protein:</Text>
          <Text style={styles.nutritionValue}>{protein}g</Text>
        </View>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionLabel}>Carbs:</Text>
          <Text style={styles.nutritionValue}>{carbs}g</Text>
        </View>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionLabel}>Fat:</Text>
          <Text style={styles.nutritionValue}>{fat}g</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}