import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import * as Haptics from 'expo-haptics';

import Colors from '@/constants/colors';
import { brandAssets } from '@/constants/brandAssets';
import { brandConfig } from '@/constants/brandConfig';

const { width } = Dimensions.get('window');

export default function Hero() {
  const router = useRouter();

  const handleCreditsPress = () => {
    console.log('Credits button pressed');
    
    if (Platform.OS !== 'web') {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch (error) {
        console.log('Haptics not available:', error);
      }
    }
    
    try {
      router.push('/credits');
    } catch (error) {
      console.error('Navigation error:', error);
      Alert.alert('Navigation Error', 'Could not navigate to credits page');
    }
  };

  const handleContactPress = () => {
    console.log('Contact button pressed');
    
    if (Platform.OS !== 'web') {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch (error) {
        console.log('Haptics not available:', error);
      }
    }
    
    try {
      router.push('/contact');
    } catch (error) {
      console.error('Navigation error:', error);
      Alert.alert('Navigation Error', 'Could not navigate to contact page');
    }
  };

  return (
    <View style={styles.container} testID="hero-section">
      <LinearGradient
        colors={[Colors.primary, '#0D2B4D']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Image
            source={brandAssets.hero.primary}
            style={styles.backgroundImage}
            contentFit="cover"
            onError={(error) => {
              console.log('Image load error:', error);
            }}
          />
          <View style={styles.overlay} />
          
          <View style={styles.textContainer}>
            <Text style={styles.title}>{brandConfig.name}</Text>
            <Text style={styles.subtitle}>
              {brandConfig.tagline}
            </Text>
            <Text style={styles.description}>
              Con sede a Dubai, offriamo soluzioni digitali per la certificazione e acquisizione di crediti IVA, Bonus Edilizi e Industria 4.0. Valutazione gratuita e processo completamente digitalizzato.
            </Text>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.primaryButton} 
                onPress={handleCreditsPress}
                testID="credits-button"
                activeOpacity={0.8}
              >
                <Text style={styles.primaryButtonText}>Richiedi Valutazione</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.secondaryButton} 
                onPress={handleContactPress}
                testID="contact-button"
                activeOpacity={0.8}
              >
                <Text style={styles.secondaryButtonText}>Contattaci</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 550,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(26, 77, 143, 0.8)',
  },
  textContainer: {
    width: '90%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 26,
    fontWeight: '500',
  },
  description: {
    fontSize: 16,
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
    opacity: 0.9,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    flexWrap: 'wrap',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: Colors.secondary,
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 8,
    minWidth: width < 380 ? '100%' : 150,
    alignItems: 'center',
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  primaryButtonText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.white,
    minWidth: width < 380 ? '100%' : 150,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});