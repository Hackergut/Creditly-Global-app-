import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { Menu } from 'lucide-react-native';

import CreditCard from '@/components/CreditCard';
import DrawerMenu from '@/components/DrawerMenu';
import { creditTypes } from '@/constants/creditTypes';
import Colors from '@/constants/colors';

export default function CreditsScreen() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleMenuPress = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Crediti Fiscali',
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
          headerRight: () => (
            <TouchableOpacity 
              onPress={handleMenuPress}
              style={styles.menuButton}
              testID="menu-button"
            >
              <Menu size={24} color={Colors.white} />
            </TouchableOpacity>
          ),
        }} 
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>Gestione Crediti Fiscali</Text>
        <Text style={styles.subtitle}>
          Scopri tutti i crediti fiscali disponibili e richiedi una valutazione gratuita per la tua situazione.
        </Text>
        
        <FlatList
          data={creditTypes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CreditCard credit={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          testID="credits-list"
        />
      </View>

      <DrawerMenu 
        isVisible={isDrawerOpen} 
        onClose={handleDrawerClose} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.darkGray,
    marginBottom: 24,
    lineHeight: 22,
  },
  listContent: {
    paddingBottom: 20,
  },
  menuButton: {
    padding: 8,
    marginRight: 8,
  },
});