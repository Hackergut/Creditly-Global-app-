import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { BarChart, Briefcase, Calculator, Monitor, ShieldCheck, TrendingUp } from 'lucide-react-native';

import Colors from '@/constants/colors';
import { Service } from '@/types';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const router = useRouter();

  const getIcon = () => {
    switch (service.icon) {
      case 'briefcase':
        return <Briefcase size={24} color={Colors.primary} />;
      case 'calculator':
        return <Calculator size={24} color={Colors.primary} />;
      case 'trending-up':
        return <TrendingUp size={24} color={Colors.primary} />;
      case 'monitor':
        return <Monitor size={24} color={Colors.primary} />;
      case 'shield-check':
        return <ShieldCheck size={24} color={Colors.primary} />;
      case 'bar-chart':
        return <BarChart size={24} color={Colors.primary} />;
      default:
        return <Briefcase size={24} color={Colors.primary} />;
    }
  };

  const handlePress = () => {
    router.push(service.route);
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={handlePress}
      testID={`service-card-${service.id}`}
    >
      <View style={styles.iconContainer}>
        {getIcon()}
      </View>
      <Text style={styles.title}>{service.title}</Text>
      <Text style={styles.description}>{service.description}</Text>
      <View style={styles.learnMoreContainer}>
        <Text style={styles.learnMore}>Learn more</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: Colors.darkGray,
    marginBottom: 16,
    lineHeight: 20,
  },
  learnMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  learnMore: {
    color: Colors.primary,
    fontWeight: '500',
  },
});