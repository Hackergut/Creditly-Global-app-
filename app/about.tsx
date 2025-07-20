import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { Image } from 'expo-image';

import Colors from '@/constants/colors';
import { brandAssets } from '@/constants/brandAssets';
import { brandConfig } from '@/constants/brandConfig';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Chi Siamo',
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
        testID="about-screen"
      >
        <Image
          source={brandAssets.hero.secondary}
          style={styles.headerImage}
          contentFit="cover"
        />
        
        <View style={styles.content}>
          <Text style={styles.title}>{brandConfig.name}: Il Tuo Partner per i Crediti Fiscali</Text>
          
          <Text style={styles.paragraph}>
            Con sede a Dubai negli Emirati Arabi Uniti, {brandConfig.name} è una società specializzata nella gestione, certificazione e acquisizione di crediti fiscali per aziende e privati.
          </Text>
          
          <Text style={styles.paragraph}>
            La nostra piattaforma digitale semplifica il processo di richiesta e gestione dei crediti fiscali, offrendo un servizio completo dalla valutazione iniziale all'acquisizione finale.
          </Text>

          <View style={styles.imageContainer}>
            <Image
              source={brandAssets.technology.analytics}
              style={styles.inlineImage}
              contentFit="cover"
            />
          </View>
          
          <Text style={styles.sectionTitle}>I Nostri Servizi</Text>
          
          <View style={styles.serviceItem}>
            <Text style={styles.serviceTitle}>Superbonus 110%</Text>
            <Text style={styles.serviceText}>
              Gestione completa delle pratiche per il Superbonus, dalla verifica dei requisiti alla cessione del credito, con aliquote decrescenti fino al 2025.
            </Text>
          </View>
          
          <View style={styles.serviceItem}>
            <Text style={styles.serviceTitle}>Bonus Edilizi</Text>
            <Text style={styles.serviceText}>
              Acquisizione di crediti derivanti da ecobonus, bonus ristrutturazioni, sismabonus e bonus facciate con detrazioni dal 50% al 90%.
            </Text>
          </View>
          
          <View style={styles.serviceItem}>
            <Text style={styles.serviceTitle}>Crediti Industria 4.0</Text>
            <Text style={styles.serviceText}>
              Ottimizzazione dei crediti d'imposta per investimenti in beni strumentali tecnologici, con percentuali fino al 50% dell'investimento.
            </Text>
          </View>

          <View style={styles.serviceItem}>
            <Text style={styles.serviceTitle}>Crediti IVA e P.A.</Text>
            <Text style={styles.serviceText}>
              Recupero e cessione di crediti IVA maturati e crediti verso la Pubblica Amministrazione con valutazione al valore nominale.
            </Text>
          </View>

          <View style={styles.imageContainer}>
            <Image
              source={brandAssets.business.partnership}
              style={styles.inlineImage}
              contentFit="cover"
            />
            <Text style={styles.imageCaption}>La nostra sede a Dubai - Gateway per il business internazionale</Text>
          </View>

          <Text style={styles.sectionTitle}>Perché Dubai?</Text>
          
          <Text style={styles.paragraph}>
            La scelta di Dubai come sede operativa ci permette di operare in un ambiente fiscale ottimizzato, con vantaggi significativi che trasmettiamo ai nostri clienti. La posizione strategica negli Emirati Arabi Uniti facilita le operazioni internazionali e garantisce efficienza operativa.
          </Text>

          <Text style={styles.paragraph}>
            Il nostro team di esperti combina competenze tecniche specializzate con una profonda conoscenza delle normative fiscali italiane ed internazionali, garantendo un servizio professionale e risultati concreti.
          </Text>
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
  },
  headerImage: {
    width: '100%',
    height: 220,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 16,
    lineHeight: 24,
  },
  imageContainer: {
    marginVertical: 20,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inlineImage: {
    width: '100%',
    height: 180,
  },
  imageCaption: {
    fontSize: 14,
    color: Colors.mediumGray,
    textAlign: 'center',
    padding: 12,
    backgroundColor: Colors.white,
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 16,
    marginBottom: 16,
  },
  serviceItem: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 8,
  },
  serviceText: {
    fontSize: 14,
    color: Colors.darkGray,
    lineHeight: 20,
  },
});