import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Heart, Clock, User } from 'lucide-react-native';

type RecipeCardProps = {
  id: string;
  name: string;
  image: string;
  prepTime: string;
  rating: number;
  isFavorite: boolean;
  onPress?: () => void;
  onFavoritePress?: () => void;
  displayMode?: 'grid' | 'list';
};

export default function RecipeCard({
  id,
  name,
  image,
  prepTime,
  rating,
  isFavorite,
  onPress,
  onFavoritePress,
  displayMode = 'grid'
}: RecipeCardProps) {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    gridItem: {
      width: '100%',
      borderRadius: 16,
      overflow: 'hidden',
      backgroundColor: theme.card,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    listItem: {
      flexDirection: 'row',
      borderRadius: 16,
      overflow: 'hidden',
      backgroundColor: theme.card,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    gridImage: {
      width: '100%',
      height: 120,
      resizeMode: 'cover',
    },
    listImage: {
      width: 100,
      height: 100,
      resizeMode: 'cover',
    },
    favoriteButton: {
      position: 'absolute',
      top: 8,
      right: 8,
      backgroundColor: 'rgba(255,255,255,0.8)',
      width: 32,
      height: 32,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    gridContent: {
      padding: 12,
    },
    listContent: {
      flex: 1,
      padding: 12,
      justifyContent: 'center',
    },
    recipeName: {
      fontFamily: 'Roboto-Medium',
      fontSize: 14,
      color: theme.text,
      marginBottom: 8,
    },
    listRecipeName: {
      fontFamily: 'Roboto-Medium',
      fontSize: 16,
      color: theme.text,
      marginBottom: 8,
    },
    metaContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    metaItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 12,
      marginBottom: 4,
    },
    metaText: {
      fontFamily: 'Roboto-Regular',
      fontSize: 12,
      color: theme.textSecondary,
      marginLeft: 4,
    },
  });

  if (displayMode === 'grid') {
    return (
      <TouchableOpacity style={styles.gridItem} onPress={onPress}>
        <View>
          <Image source={{ uri: image }} style={styles.gridImage} />
          <TouchableOpacity 
            style={styles.favoriteButton}
            onPress={onFavoritePress}
          >
            <Heart 
              size={18} 
              color={isFavorite ? '#F44336' : '#757575'} 
              fill={isFavorite ? '#F44336' : 'none'} 
            />
          </TouchableOpacity>
        </View>
        <View style={styles.gridContent}>
          <Text style={styles.recipeName} numberOfLines={2}>{name}</Text>
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Clock size={12} color={theme.textSecondary} />
              <Text style={styles.metaText}>{prepTime}</Text>
            </View>
            <View style={styles.metaItem}>
              <User size={12} color={theme.textSecondary} />
              <Text style={styles.metaText}>{rating}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.listItem} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.listImage} />
      <View style={styles.listContent}>
        <Text style={styles.listRecipeName}>{name}</Text>
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <Clock size={14} color={theme.textSecondary} />
            <Text style={styles.metaText}>{prepTime}</Text>
          </View>
          <View style={styles.metaItem}>
            <User size={14} color={theme.textSecondary} />
            <Text style={styles.metaText}>{rating}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity 
        style={[styles.favoriteButton, { position: 'relative', alignSelf: 'center', marginRight: 12 }]}
        onPress={onFavoritePress}
      >
        <Heart 
          size={18} 
          color={isFavorite ? '#F44336' : '#757575'} 
          fill={isFavorite ? '#F44336' : 'none'} 
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}