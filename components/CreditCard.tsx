import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Home, Wrench, Cpu, Receipt, Building } from 'lucide-react-native';

import Colors from '@/constants/colors';
import { CreditType } from '@/constants/creditTypes';

interface CreditCardProps {
  credit: CreditType;
}

export default function CreditCard({ credit }: CreditCardProps) {
  const router = useRouter();

  const getIcon = () => {
    switch (credit.icon) {
      case 'home':
        return <Home size={24} color={Colors.primary} />;
      case 'wrench':
        return <Wrench size={24} color={Colors.primary} />;
      case 'cpu':
        return <Cpu size={24} color={Colors.primary} />;
      case 'receipt':
        return <Receipt size={24} color={Colors.primary} />;
      case 'building':
        return <Building size={24} color={Colors.primary} />;
      default:
        return <Home size={24} color={Colors.primary} />;
    }
  };

  const handlePress = () => {
    router.push(`/credits/${credit.id}`);
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={handlePress}
      testID={`credit-card-${credit.id}`}
    >
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          {getIcon()}
        </View>
        <View style={styles.percentageContainer}>
          <Text style={styles.percentage}>{credit.percentage}</Text>
        </View>
      </View>
      
      <Text style={styles.title}>{credit.name}</Text>
      <Text style={styles.description}>{credit.description}</Text>
      
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Scadenza</Text>
          <Text style={styles.infoValue}>{credit.deadline}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Importo Max</Text>
          <Text style={styles.infoValue}>{credit.maxAmount}</Text>
        </View>
      </View>
      
      <View style={styles.actionContainer}>
        <Text style={styles.actionText}>Richiedi Valutazione</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageContainer: {
    backgroundColor: Colors.accent,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  percentage: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: Colors.darkGray,
    marginBottom: 16,
    lineHeight: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: Colors.mediumGray,
    marginBottom: 4,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '600',
  },
  actionContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  actionText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
});