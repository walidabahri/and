import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, TextInput } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, Plus, Grid2x2 as Grid, List, Heart, Clock, User } from 'lucide-react-native';

export default function RecipesScreen() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Sample recipe data
  const recipes = [
    {
      id: '1',
      name: 'Avocado Toast with Poached Egg',
      image: 'https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg',
      prepTime: '15 mins',
      category: 'Breakfast',
      rating: 4.8,
      isFavorite: true,
    },
    {
      id: '2',
      name: 'Greek Yogurt Bowl with Berries',
      image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg',
      prepTime: '5 mins',
      category: 'Breakfast',
      rating: 4.5,
      isFavorite: false,
    },
    {
      id: '3',
      name: 'Chicken Caesar Salad',
      image: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg',
      prepTime: '20 mins',
      category: 'Lunch',
      rating: 4.3,
      isFavorite: true,
    },
    {
      id: '4',
      name: 'Salmon with Roasted Vegetables',
      image: 'https://images.pexels.com/photos/842142/pexels-photo-842142.jpeg',
      prepTime: '30 mins',
      category: 'Dinner',
      rating: 4.9,
      isFavorite: true,
    },
    {
      id: '5',
      name: 'Vegetable Stir Fry with Tofu',
      image: 'https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg',
      prepTime: '25 mins',
      category: 'Dinner',
      rating: 4.2,
      isFavorite: false,
    },
    {
      id: '6',
      name: 'Berry Smoothie',
      image: 'https://images.pexels.com/photos/1346063/pexels-photo-1346063.jpeg',
      prepTime: '5 mins',
      category: 'Snacks',
      rating: 4.7,
      isFavorite: false,
    },
  ];

  const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Desserts'];

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 12,
      backgroundColor: theme.background,
    },
    searchInputContainer: {
      flex: 1,
      height: 46,
      backgroundColor: theme.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      marginRight: 12,
    },
    searchInput: {
      flex: 1,
      fontFamily: 'Roboto-Regular',
      fontSize: 16,
      color: theme.text,
      marginLeft: 8,
      height: '100%',
    },
    filterButton: {
      width: 46,
      height: 46,
      backgroundColor: theme.primary,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    categoriesContainer: {
      paddingLeft: 20,
      marginTop: 8,
      marginBottom: 16,
    },
    categoryButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      marginRight: 8,
      borderWidth: 1,
    },
    categoryText: {
      fontFamily: 'Roboto-Medium',
      fontSize: 14,
    },
    viewToggleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      marginBottom: 16,
    },
    resultsText: {
      fontFamily: 'Roboto-Regular',
      fontSize: 14,
      color: theme.textSecondary,
    },
    viewToggleButtons: {
      flexDirection: 'row',
      backgroundColor: theme.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
      borderRadius: 8,
      padding: 4,
    },
    viewToggleButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 6,
    },
    gridContainer: {
      paddingHorizontal: 16,
      marginBottom: 20,
    },
    gridItem: {
      width: '48%',
      marginHorizontal: '1%',
      marginBottom: 16,
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
      marginHorizontal: 20,
      marginBottom: 16,
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

  const renderGridItem = ({ item }) => (
    <TouchableOpacity style={styles.gridItem}>
      <View>
        <Image source={{ uri: item.image }} style={styles.gridImage} />
        <TouchableOpacity style={styles.favoriteButton}>
          <Heart 
            size={18} 
            color={item.isFavorite ? '#F44336' : '#757575'} 
            fill={item.isFavorite ? '#F44336' : 'none'} 
          />
        </TouchableOpacity>
      </View>
      <View style={styles.gridContent}>
        <Text style={styles.recipeName} numberOfLines={2}>{item.name}</Text>
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <Clock size={12} color={theme.textSecondary} />
            <Text style={styles.metaText}>{item.prepTime}</Text>
          </View>
          <View style={styles.metaItem}>
            <User size={12} color={theme.textSecondary} />
            <Text style={styles.metaText}>{item.rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderListItem = ({ item }) => (
    <TouchableOpacity style={styles.listItem}>
      <Image source={{ uri: item.image }} style={styles.listImage} />
      <View style={styles.listContent}>
        <Text style={styles.listRecipeName}>{item.name}</Text>
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <Clock size={14} color={theme.textSecondary} />
            <Text style={styles.metaText}>{item.prepTime}</Text>
          </View>
          <View style={styles.metaItem}>
            <User size={14} color={theme.textSecondary} />
            <Text style={styles.metaText}>{item.rating}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={[styles.favoriteButton, { position: 'relative', alignSelf: 'center', marginRight: 12 }]}>
        <Heart 
          size={18} 
          color={item.isFavorite ? '#F44336' : '#757575'} 
          fill={item.isFavorite ? '#F44336' : 'none'} 
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recipes</Text>
        <Text style={styles.headerSubtitle}>Discover delicious meal ideas</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color={theme.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search recipes..."
            placeholderTextColor={theme.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryButton,
              {
                backgroundColor: selectedCategory === item ? theme.primary : 'transparent',
                borderColor: selectedCategory === item ? theme.primary : theme.border,
              },
            ]}
            onPress={() => setSelectedCategory(item)}
          >
            <Text
              style={[
                styles.categoryText,
                {
                  color: selectedCategory === item ? '#FFFFFF' : theme.text,
                },
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      />

      <View style={styles.viewToggleContainer}>
        <Text style={styles.resultsText}>
          {filteredRecipes.length} {filteredRecipes.length === 1 ? 'recipe' : 'recipes'} found
        </Text>
        <View style={styles.viewToggleButtons}>
          <TouchableOpacity
            style={[
              styles.viewToggleButton,
              {
                backgroundColor: viewMode === 'grid' ? theme.primary : 'transparent',
              },
            ]}
            onPress={() => setViewMode('grid')}
          >
            <Grid size={20} color={viewMode === 'grid' ? '#FFFFFF' : theme.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.viewToggleButton,
              {
                backgroundColor: viewMode === 'list' ? theme.primary : 'transparent',
              },
            ]}
            onPress={() => setViewMode('list')}
          >
            <List size={20} color={viewMode === 'list' ? '#FFFFFF' : theme.text} />
          </TouchableOpacity>
        </View>
      </View>

      {viewMode === 'grid' ? (
        <FlatList
          data={filteredRecipes}
          renderItem={renderGridItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={styles.gridContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          data={filteredRecipes}
          renderItem={renderListItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      )}

      <TouchableOpacity style={styles.fab}>
        <Plus size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}