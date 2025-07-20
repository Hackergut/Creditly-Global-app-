import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, ScrollView, Dimensions, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  X, 
  User, 
  Info, 
  HelpCircle, 
  Shield, 
  Phone, 
  Settings, 
  LogOut,
  ChevronRight,
  Briefcase 
} from 'lucide-react-native';
import { Image } from 'expo-image';
import * as Haptics from 'expo-haptics';

import Colors from '@/constants/colors';
import { brandConfig } from '@/constants/brandConfig';
import { useAuth } from '@/hooks/useAuth';

const { width } = Dimensions.get('window');

interface DrawerMenuProps {
  isVisible: boolean;
  onClose: () => void;
}

interface MenuItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  route: string;
  requiresAuth?: boolean;
}

export default function DrawerMenu({ isVisible, onClose }: DrawerMenuProps) {
  const router = useRouter();
  const { user, logout } = useAuth();

  const menuItems: MenuItem[] = [
    {
      id: 'services',
      title: 'Servizi',
      icon: <Briefcase size={20} color={Colors.darkGray} />,
      route: '/services',
    },
    {
      id: 'profile',
      title: 'Profilo',
      icon: <User size={20} color={Colors.darkGray} />,
      route: '/profile',
      requiresAuth: true,
    },
    {
      id: 'about',
      title: 'Chi Siamo',
      icon: <Info size={20} color={Colors.darkGray} />,
      route: '/about',
    },
    {
      id: 'faq',
      title: 'FAQ',
      icon: <HelpCircle size={20} color={Colors.darkGray} />,
      route: '/faq',
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      icon: <Shield size={20} color={Colors.darkGray} />,
      route: '/privacy',
    },
    {
      id: 'contact',
      title: 'Contatti',
      icon: <Phone size={20} color={Colors.darkGray} />,
      route: '/contact',
    },
    {
      id: 'settings',
      title: 'Impostazioni',
      icon: <Settings size={20} color={Colors.darkGray} />,
      route: '/settings',
      requiresAuth: true,
    },
  ];

  const handleMenuItemPress = (item: MenuItem) => {
    console.log('Menu item pressed:', item.title);
    
    if (Platform.OS !== 'web') {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch (error) {
        console.log('Haptics not available:', error);
      }
    }

    onClose();
    
    // Piccolo delay per permettere l'animazione di chiusura
    setTimeout(() => {
      router.push(item.route);
    }, 100);
  };

  const handleLogout = async () => {
    console.log('Logout pressed');
    
    if (Platform.OS !== 'web') {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      } catch (error) {
        console.log('Haptics not available:', error);
      }
    }

    onClose();
    await logout();
  };

  const filteredMenuItems = menuItems.filter(item => {
    if (item.requiresAuth && !user) {
      return false;
    }
    return true;
  });

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      presentationStyle="overFullScreen"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity 
          style={styles.backdrop} 
          activeOpacity={1} 
          onPress={onClose}
        />
        
        <View style={styles.drawerContainer}>
          <View style={styles.header}>
            <View style={styles.brandContainer}>
              <Image
                source={brandConfig.logo.primary}
                style={styles.logo}
                contentFit="contain"
                placeholder="CG"
              />
              <View>
                <Text style={styles.brandName}>{brandConfig.name}</Text>
                <Text style={styles.brandTagline}>Dubai, UAE</Text>
              </View>
            </View>
            
            <TouchableOpacity 
              onPress={onClose}
              style={styles.closeButton}
              testID="close-drawer-button"
            >
              <X size={24} color={Colors.darkGray} />
            </TouchableOpacity>
          </View>

          {user && (
            <View style={styles.userSection}>
              <View style={styles.userAvatar}>
                <Text style={styles.userInitial}>
                  {user.name.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
              </View>
            </View>
          )}

          <ScrollView style={styles.menuContainer} showsVerticalScrollIndicator={false}>
            {filteredMenuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={() => handleMenuItemPress(item)}
                testID={`drawer-menu-${item.id}`}
              >
                <View style={styles.menuItemLeft}>
                  <View style={styles.menuItemIcon}>
                    {item.icon}
                  </View>
                  <Text style={styles.menuItemText}>{item.title}</Text>
                </View>
                <ChevronRight size={16} color={Colors.mediumGray} />
              </TouchableOpacity>
            ))}

            {user && (
              <>
                <View style={styles.divider} />
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={handleLogout}
                  testID="drawer-logout-button"
                >
                  <View style={styles.menuItemLeft}>
                    <View style={styles.menuItemIcon}>
                      <LogOut size={20} color={Colors.error} />
                    </View>
                    <Text style={[styles.menuItemText, { color: Colors.error }]}>
                      Logout
                    </Text>
                  </View>
                </TouchableOpacity>
              </>
            )}
          </ScrollView>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              © 2025 {brandConfig.name}
            </Text>
            <Text style={styles.footerSubtext}>
              Versione 1.0.0
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawerContainer: {
    width: width * 0.85,
    maxWidth: 320,
    backgroundColor: Colors.white,
    flex: 1,
    shadowColor: Colors.text,
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 12,
    borderRadius: 8,
    backgroundColor: Colors.background,
  },
  brandName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  brandTagline: {
    fontSize: 12,
    color: Colors.mediumGray,
  },
  closeButton: {
    padding: 8,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.background,
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userInitial: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  userEmail: {
    fontSize: 14,
    color: Colors.mediumGray,
  },
  menuContainer: {
    flex: 1,
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemIcon: {
    width: 32,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginRight: 16,
  },
  menuItemText: {
    fontSize: 16,
    color: Colors.text,
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.lightGray,
    marginVertical: 8,
    marginHorizontal: 20,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: Colors.mediumGray,
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 10,
    color: Colors.mediumGray,
  },
});