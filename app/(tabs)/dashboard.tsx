import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Plus, FileText, Clock, CheckCircle, XCircle, Menu } from 'lucide-react-native';

import DrawerMenu from '@/components/DrawerMenu';
import Colors from '@/constants/colors';
import { useAuth } from '@/hooks/useAuth';

export default function DashboardScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleMenuPress = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const mockRequests = [
    {
      id: '1',
      type: 'Superbonus 110%',
      amount: 50000,
      status: 'reviewing' as const,
      date: '2024-01-15',
    },
    {
      id: '2',
      type: 'Bonus Edilizi',
      amount: 25000,
      status: 'approved' as const,
      date: '2024-01-10',
    },
    {
      id: '3',
      type: 'Crediti 4.0',
      amount: 75000,
      status: 'pending' as const,
      date: '2024-01-08',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={20} color={Colors.secondary} />;
      case 'reviewing':
        return <FileText size={20} color={Colors.primary} />;
      case 'approved':
        return <CheckCircle size={20} color={Colors.success} />;
      case 'rejected':
        return <XCircle size={20} color={Colors.error} />;
      default:
        return <Clock size={20} color={Colors.mediumGray} />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'In Attesa';
      case 'reviewing':
        return 'In Revisione';
      case 'approved':
        return 'Approvato';
      case 'rejected':
        return 'Rifiutato';
      default:
        return 'Sconosciuto';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return Colors.secondary;
      case 'reviewing':
        return Colors.primary;
      case 'approved':
        return Colors.success;
      case 'rejected':
        return Colors.error;
      default:
        return Colors.mediumGray;
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Dashboard',
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
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        testID="dashboard-screen"
      >
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Benvenuto, {user?.name || 'Utente'}!</Text>
          <Text style={styles.welcomeSubtext}>
            Gestisci le tue richieste di crediti fiscali
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Richieste Totali</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>1</Text>
            <Text style={styles.statLabel}>Approvate</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>€150K</Text>
            <Text style={styles.statLabel}>Valore Totale</Text>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.primaryAction}
            onPress={() => router.push('/credits')}
            testID="new-request-button"
          >
            <Plus size={24} color={Colors.white} />
            <Text style={styles.primaryActionText}>Nuova Richiesta</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.requestsContainer}>
          <Text style={styles.sectionTitle}>Le Tue Richieste</Text>
          
          {mockRequests.map((request) => (
            <TouchableOpacity 
              key={request.id}
              style={styles.requestCard}
              onPress={() => router.push(`/requests/${request.id}`)}
            >
              <View style={styles.requestHeader}>
                <Text style={styles.requestType}>{request.type}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(request.status) + '20' }]}>
                  {getStatusIcon(request.status)}
                  <Text style={[styles.statusText, { color: getStatusColor(request.status) }]}>
                    {getStatusText(request.status)}
                  </Text>
                </View>
              </View>
              
              <Text style={styles.requestAmount}>€{request.amount.toLocaleString()}</Text>
              <Text style={styles.requestDate}>Richiesta del {new Date(request.date).toLocaleDateString('it-IT')}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  welcomeContainer: {
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  welcomeSubtext: {
    fontSize: 16,
    color: Colors.darkGray,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.darkGray,
    textAlign: 'center',
  },
  actionsContainer: {
    marginBottom: 24,
  },
  primaryAction: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryActionText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  requestsContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  requestCard: {
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
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  requestType: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  requestAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 4,
  },
  requestDate: {
    fontSize: 14,
    color: Colors.mediumGray,
  },
  menuButton: {
    padding: 8,
    marginRight: 8,
  },
});