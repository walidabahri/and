import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Check, Trash2, CreditCard as Edit2, X } from 'lucide-react-native';

type GroceryItemProps = {
  id: string;
  name: string;
  amount: string;
  unit: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newName: string) => void;
};

export default function GroceryItem({
  id,
  name,
  amount,
  unit,
  completed,
  onToggle,
  onDelete,
  onEdit,
}: GroceryItemProps) {
  const { theme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState(name);

  const styles = StyleSheet.create({
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
  });

  const startEditing = () => {
    setIsEditing(true);
    setEditingText(name);
  };

  const saveEdit = () => {
    if (editingText.trim()) {
      onEdit(id, editingText);
    }
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditingText(name);
  };

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={[
          styles.checkboxContainer,
          completed && styles.checkedBox,
        ]}
        onPress={() => onToggle(id)}
      >
        {completed && <Check size={16} color="#FFFFFF" />}
      </TouchableOpacity>

      {isEditing ? (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.editInput}
            value={editingText}
            onChangeText={setEditingText}
            autoFocus
            onSubmitEditing={saveEdit}
          />
          <TouchableOpacity style={styles.editButton} onPress={saveEdit}>
            <Check size={20} color={theme.success} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editButton}
            onPress={cancelEdit}
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
                completed && styles.completedItemName,
              ]}
            >
              {name}
            </Text>
            <Text style={styles.itemDetails}>
              {amount} {unit}
            </Text>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={startEditing}
            >
              <Edit2 size={20} color={theme.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => onDelete(id)}
            >
              <Trash2 size={20} color={theme.error} />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}