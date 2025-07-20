import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { Bell, Moon, Globe, Shield, HelpCircle, Info } from 'lucide-react-native';

import Colors from '@/constants/colors';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleNotificationToggle = () => {
    setNotifications(!notifications);
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    Alert.alert('Info', 'Modalità scura in arrivo in una prossima versione');
  };

  const handleLanguagePress = () => {
    Alert.alert('Lingua', 'Supporto multilingua in arrivo');
  };

  const handlePrivacyPress = () => {
    Alert.alert('Privacy', 'Impostazioni privacy in arrivo');
  };

  const handleHelpPress = () => {
    Alert.alert('Aiuto', 'Centro assistenza in arrivo');
  };

  const handleAboutPress = () => {
    Alert.alert('Info App', 'Creditly Global v1.0.0\nSviluppato con React Native');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Impostazioni',
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
        }} 
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        testID="settings-screen"
      >
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Preferenze</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={styles.settingIcon}>
                <Bell size={20} color={Colors.primary} />
              </View>
              <View>
                <Text style={styles.settingTitle}>Notifiche</Text>
                <Text style={styles.settingDescription}>Ricevi aggiornamenti sulle tue richieste</Text>
              </View>
            </View>
            <Switch
              value={notifications}
              onValueChange={handleNotificationToggle}
              trackColor={{ false: Colors.lightGray, true: Colors.primary }}
              thumbColor={notifications ? Colors.white : Colors.mediumGray}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={styles.settingIcon}>
                <Moon size={20} color={Colors.primary} />
              </View>
              <View>
                <Text style={styles.settingTitle}>Modalità Scura</Text>
                <Text style={styles.settingDescription}>Attiva il tema scuro</Text>
              </View>
            </View>
            <Switch
              value={darkMode}
              onValueChange={handleDarkModeToggle}
              trackColor={{ false: Colors.lightGray, true: Colors.primary }}
              thumbColor={darkMode ? Colors.white : Colors.mediumGray}
            />
          </View>

          <TouchableOpacity style={styles.settingItem} onPress={handleLanguagePress}>
            <View style={styles.settingLeft}>
              <View style={styles.settingIcon}>
                <Globe size={20} color={Colors.primary} />
              </View>
              <View>
                <Text style={styles.settingTitle}>Lingua</Text>
                <Text style={styles.settingDescription}>Italiano</Text>
              </View>
            </View>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Privacy e Sicurezza</Text>

          <TouchableOpacity style={styles.settingItem} onPress={handlePrivacyPress}>
            <View style={styles.settingLeft}>
              <View style={styles.settingIcon}>
                <Shield size={20} color={Colors.primary} />
              </View>
              <View>
                <Text style={styles.settingTitle}>Privacy</Text>
                <Text style={styles.settingDescription}>Gestisci le tue impostazioni privacy</Text>
              </View>
            </View>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Supporto</Text>

          <TouchableOpacity style={styles.settingItem} onPress={handleHelpPress}>
            <View style={styles.settingLeft}>
              <View style={styles.settingIcon}>
                <HelpCircle size={20} color={Colors.primary} />
              </View>
              <View>
                <Text style={styles.settingTitle}>Centro Assistenza</Text>
                <Text style={styles.settingDescription}>FAQ e supporto tecnico</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={handleAboutPress}>
            <View style={styles.settingLeft}>
              <View style={styles.settingIcon}>
                <Info size={20} color={Colors.primary} />
              </View>
              <View>
                <Text style={styles.settingTitle}>Informazioni App</Text>
                <Text style={styles.settingDescription}>Versione e dettagli</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 20,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: Colors.mediumGray,
  },
});