import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Award, CheckCircle, Globe, Shield, CreditCard, Zap } from 'lucide-react-native';
import { Image } from 'expo-image';

import Colors from '@/constants/colors';
import { brandAssets } from '@/constants/brandAssets';
import { brandConfig } from '@/constants/brandConfig';

interface ReasonProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function Reason({ icon, title, description }: ReasonProps) {
  return (
    <View style={styles.reasonContainer} testID={`reason-${title.toLowerCase().replace(/\s/g, '-')}`}>
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.reasonTitle}>{title}</Text>
        <Text style={styles.reasonDescription}>{description}</Text>
      </View>
    </View>
  );
}

export default function WhyChooseUs() {
  return (
    <View style={styles.container} testID="why-choose-us-section">
      <Text style={styles.title}>Perché Scegliere {brandConfig.name}</Text>
      <Text style={styles.subtitle}>
        Specializzati nella gestione di crediti fiscali con sede a Dubai, offriamo soluzioni innovative per massimizzare i tuoi benefici fiscali.
      </Text>
      
      <View style={styles.imageContainer}>
        <Image
          source={brandAssets.technology.analytics}
          style={styles.brandImage}
          contentFit="cover"
        />
      </View>
      
      <View style={styles.reasonsContainer}>
        <Reason
          icon={<CreditCard size={24} color={Colors.primary} />}
          title="Gestione Completa"
          description="Dalla valutazione iniziale all'acquisizione finale, gestiamo tutto il processo per i tuoi crediti fiscali."
        />
        
        <Reason
          icon={<Zap size={24} color={Colors.primary} />}
          title="Processo Digitale"
          description="Piattaforma completamente digitalizzata per caricare documenti e monitorare lo stato delle richieste."
        />
        
        <Reason
          icon={<Globe size={24} color={Colors.primary} />}
          title="Sede a Dubai"
          description="Vantaggi fiscali e operativi della sede negli Emirati Arabi Uniti per ottimizzare le operazioni."
        />
        
        <Reason
          icon={<Shield size={24} color={Colors.primary} />}
          title="Sicurezza Garantita"
          description="Massima sicurezza nella gestione dei dati e conformità alle normative internazionali."
        />

        <Reason
          icon={<Award size={24} color={Colors.primary} />}
          title="Esperienza Consolidata"
          description="Team di esperti specializzati in Superbonus, Bonus Edilizi, Crediti 4.0 e IVA."
        />
        
        <Reason
          icon={<CheckCircle size={24} color={Colors.primary} />}
          title="Valutazione Gratuita"
          description="Analisi preliminare gratuita per valutare la fattibilità e il valore dei tuoi crediti."
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.darkGray,
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 22,
  },
  imageContainer: {
    marginBottom: 24,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  brandImage: {
    width: '100%',
    height: 160,
  },
  reasonsContainer: {
    gap: 16,
  },
  reasonContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  textContainer: {
    flex: 1,
  },
  reasonTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  reasonDescription: {
    fontSize: 14,
    color: Colors.darkGray,
    lineHeight: 20,
  },
});