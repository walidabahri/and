import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Check, Plus, Trash2, CreditCard as Edit2, X } from 'lucide-react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export default function GroceryListScreen() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [editingItemId, setEditingItemId] = useState(null);
  const [editingText, setEditingText] = useState('');

  // Sample grocery data by categories
  const groceryCategories = [
    { id: 'all', name: 'All' },
    { id: 'fruits', name: 'Fruits & Vegetables' },
    { id: 'dairy', name: 'Dairy & Eggs' },
    { id: 'meat', name: 'Meat & Seafood' },
    { id: 'pantry', name: 'Pantry Items' },
    { id: 'frozen', name: 'Frozen Foods' },
    { id: 'bakery', name: 'Bakery' },
    { id: 'beverages', name: 'Beverages' },
  ];

  // Sample grocery items
  const [groceryItems, setGroceryItems] = useState([
    { id: '1', name: 'Apples', amount: '6', unit: 'pcs', category: 'fruits', completed: false },
    { id: '2', name: 'Spinach', amount: '1', unit: 'bunch', category: 'fruits', completed: true },
    { id: '3', name: 'Milk', amount: '1', unit: 'gallon', category: 'dairy', completed: false },
    { id: '4', name: 'Eggs', amount: '12', unit: 'pcs', category: 'dairy', completed: false },
    { id: '5', name: 'Chicken Breast', amount: '2', unit: 'lbs', category: 'meat', completed: false },
    { id: '6', name: 'Rice', amount: '1', unit: 'bag', category: 'pantry', completed: true },
    { id: '7', name: 'Pasta', amount: '2', unit: 'boxes', category: 'pantry', completed: false },
    { id: '8', name: 'Frozen Berries', amount: '1', unit: 'bag', category: 'frozen', completed: false },
    { id: '9', name: 'Bread', amount: '1', unit: 'loaf', category: 'bakery', completed: true },
    { id: '10', name: 'Coffee', amount: '1', unit: 'bag', category: 'beverages', completed: false },
  ]);

  const progress = Math.round((groceryItems.filter(item => item.completed).length / groceryItems.length) * 100);

  const filteredItems = groceryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const toggleItemCompletion = (id) => {
    setGroceryItems(
      groceryItems.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const deleteItem = (id) => {
    setGroceryItems(groceryItems.filter(item => item.id !== id));
  };

  const startEditing = (id, name) => {
    setEditingItemId(id);
    setEditingText(name);
  };

  const saveEdit = (id) => {
    if (editingText.trim()) {
      setGroceryItems(
        groceryItems.map(item =>
          item.id === id ? { ...item, name: editingText } : item
        )
      );
    }
    setEditingItemId(null);
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
    progressContainer: {
      marginHorizontal: 20,
      marginTop: 16,
      marginBottom: 16,
    },
    progressHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    progressText: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: 16,
      color: theme.text,
    },
    progressPercentage: {
      fontFamily: 'Roboto-Medium',
      fontSize: 14,
      color: theme.primary,
    },
    progressBarContainer: {
      height: 8,
      backgroundColor: theme.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
      borderRadius: 4,
      overflow: 'hidden',
    },
    progressBar: {
      height: '100%',
      backgroundColor: theme.primary,
      borderRadius: 4,
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
    },
    searchInput: {
      flex: 1,
      fontFamily: 'Roboto-Regular',
      fontSize: 16,
      color: theme.text,
      marginLeft: 8,
      height: '100%',
    },
    categoriesContainer: {
      paddingLeft: 20,
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
    listContainer: {
      flex: 1,
      paddingHorizontal: 20,
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    checkboxContainer: {
      width: 24,
      height: 24,
      borderRadius: 6,
      borderWidth: 2,
      borderColor: theme.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    checkedBox: {
      backgroundColor: theme.primary,
    },
    itemContent: {
      flex: 1,
    },
    itemName: {
      fontFamily: 'Roboto-Medium',
      fontSize: 16,
      color: theme.text,
    },
    completedItemName: {
      textDecorationLine: 'line-through',
      color: theme.textSecondary,
    },
    itemDetails: {
      fontFamily: 'Roboto-Regular',
      fontSize: 14,
      color: theme.textSecondary,
      marginTop: 2,
    },
    actionButtons: {
      flexDirection: 'row',
    },
    actionButton: {
      padding: 8,
      marginLeft: 8,
    },
    editInput: {
      fontFamily: 'Roboto-Medium',
      fontSize: 16,
      color: theme.text,
      flex: 1,
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderWidth: 1,
      borderColor: theme.primary,
      borderRadius: 4,
    },
    editContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    editButton: {
      padding: 8,
      marginLeft: 8,
    },
    emptyList: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 32,
    },
    emptyListText: {
      fontFamily: 'Roboto-Medium',
      fontSize: 16,
      color: theme.textSecondary,
      textAlign: 'center',
      marginTop: 16,
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

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          style={[
            styles.checkboxContainer,
            item.completed && styles.checkedBox,
          ]}
          onPress={() => toggleItemCompletion(item.id)}
        >
          {item.completed && <Check size={16} color="#FFFFFF" />}
        </TouchableOpacity>

        {editingItemId === item.id ? (
          <View style={styles.editContainer}>
            <TextInput
              style={styles.editInput}
              value={editingText}
              onChangeText={setEditingText}
              autoFocus
              onSubmitEditing={() => saveEdit(item.id)}
            />
            <TouchableOpacity style={styles.editButton} onPress={() => saveEdit(item.id)}>
              <Check size={20} color={theme.success} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setEditingItemId(null)}
            >
              <X size={20} color={theme.error} />
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.itemContent}>
              <Text
                style={[
                  styles.itemName,
                  item.completed && styles.completedItemName,
                ]}
              >
                {item.name}
              </Text>
              <Text style={styles.itemDetails}>
                {item.amount} {item.unit}
              </Text>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => startEditing(item.id, item.name)}
              >
                <Edit2 size={20} color={theme.primary} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => deleteItem(item.id)}
              >
                <Trash2 size={20} color={theme.error} />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Grocery List</Text>
        <Text style={styles.headerSubtitle}>Manage your shopping list</Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressText}>Shopping Progress</Text>
          <Text style={styles.progressPercentage}>{progress}%</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <Animated.View
            style={[
              styles.progressBar,
              { width: `${progress}%` },
            ]}
          />
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color={theme.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search items..."
            placeholderTextColor={theme.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <FlatList
        horizontal
        data={groceryCategories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryButton,
              {
                backgroundColor: selectedCategory === item.name ? theme.primary : 'transparent',
                borderColor: selectedCategory === item.name ? theme.primary : theme.border,
              },
            ]}
            onPress={() => setSelectedCategory(item.name)}
          >
            <Text
              style={[
                styles.categoryText,
                {
                  color: selectedCategory === item.name ? '#FFFFFF' : theme.text,
                },
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      />

      {filteredItems.length > 0 ? (
        <FlatList
          data={filteredItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyList}>
          <Text style={styles.emptyListText}>
            No items found. Add items to your grocery list or try a different search.
          </Text>
        </View>
      )}

      <TouchableOpacity style={styles.fab}>
        <Plus size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}