import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Stack } from 'expo-router';

import Colors from '@/constants/colors';
import { brandConfig } from '@/constants/brandConfig';

export default function PrivacyScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Privacy Policy',
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
        testID="privacy-screen"
      >
        <View style={styles.content}>
          <Text style={styles.title}>Privacy Policy</Text>
          <Text style={styles.lastUpdated}>Ultimo aggiornamento: Gennaio 2025</Text>
          
          <Text style={styles.sectionTitle}>1. Introduzione</Text>
          <Text style={styles.paragraph}>
            {brandConfig.name} ("noi", "nostro" o "la Società") rispetta la privacy dei propri utenti e si impegna a proteggere le informazioni personali che ci vengono fornite. Questa Privacy Policy descrive come raccogliamo, utilizziamo e proteggiamo le tue informazioni quando utilizzi i nostri servizi.
          </Text>

          <Text style={styles.sectionTitle}>2. Informazioni che Raccogliamo</Text>
          <Text style={styles.paragraph}>
            Raccogliamo le seguenti tipologie di informazioni:
          </Text>
          <Text style={styles.bulletPoint}>• Dati di identificazione personale (nome, cognome, email, telefono)</Text>
          <Text style={styles.bulletPoint}>• Informazioni fiscali e finanziarie necessarie per la valutazione dei crediti</Text>
          <Text style={styles.bulletPoint}>• Documenti caricati sulla piattaforma (fatture, certificazioni, contratti)</Text>
          <Text style={styles.bulletPoint}>• Dati di utilizzo della piattaforma e log di accesso</Text>
          <Text style={styles.bulletPoint}>• Informazioni sui pagamenti e transazioni</Text>

          <Text style={styles.sectionTitle}>3. Come Utilizziamo le Tue Informazioni</Text>
          <Text style={styles.paragraph}>
            Utilizziamo le informazioni raccolte per:
          </Text>
          <Text style={styles.bulletPoint}>• Fornire i nostri servizi di gestione crediti fiscali</Text>
          <Text style={styles.bulletPoint}>• Valutare e processare le richieste di credito</Text>
          <Text style={styles.bulletPoint}>• Comunicare con te riguardo ai tuoi servizi</Text>
          <Text style={styles.bulletPoint}>• Migliorare i nostri servizi e l'esperienza utente</Text>
          <Text style={styles.bulletPoint}>• Rispettare gli obblighi legali e normativi</Text>

          <Text style={styles.sectionTitle}>4. Condivisione delle Informazioni</Text>
          <Text style={styles.paragraph}>
            Non vendiamo, affittiamo o condividiamo le tue informazioni personali con terze parti, eccetto nei seguenti casi:
          </Text>
          <Text style={styles.bulletPoint}>• Con il tuo consenso esplicito</Text>
          <Text style={styles.bulletPoint}>• Per adempiere agli obblighi legali</Text>
          <Text style={styles.bulletPoint}>• Con fornitori di servizi fidati che ci assistono nelle operazioni</Text>
          <Text style={styles.bulletPoint}>• In caso di fusione, acquisizione o vendita di asset aziendali</Text>

          <Text style={styles.sectionTitle}>5. Sicurezza dei Dati</Text>
          <Text style={styles.paragraph}>
            Implementiamo misure di sicurezza tecniche e organizzative appropriate per proteggere le tue informazioni personali contro accesso non autorizzato, alterazione, divulgazione o distruzione. Tutti i dati sono crittografati durante la trasmissione e l'archiviazione.
          </Text>

          <Text style={styles.sectionTitle}>6. Conservazione dei Dati</Text>
          <Text style={styles.paragraph}>
            Conserviamo le tue informazioni personali solo per il tempo necessario agli scopi per cui sono state raccolte, o come richiesto dalla legge. I documenti fiscali possono essere conservati per periodi più lunghi in conformità alle normative fiscali applicabili.
          </Text>

          <Text style={styles.sectionTitle}>7. I Tuoi Diritti</Text>
          <Text style={styles.paragraph}>
            In conformità al GDPR e alle normative sulla privacy applicabili, hai il diritto di:
          </Text>
          <Text style={styles.bulletPoint}>• Accedere alle tue informazioni personali</Text>
          <Text style={styles.bulletPoint}>• Correggere informazioni inesatte o incomplete</Text>
          <Text style={styles.bulletPoint}>• Richiedere la cancellazione dei tuoi dati</Text>
          <Text style={styles.bulletPoint}>• Limitare il trattamento dei tuoi dati</Text>
          <Text style={styles.bulletPoint}>• Portabilità dei dati</Text>
          <Text style={styles.bulletPoint}>• Opporti al trattamento dei tuoi dati</Text>

          <Text style={styles.sectionTitle}>8. Cookie e Tecnologie di Tracciamento</Text>
          <Text style={styles.paragraph}>
            Utilizziamo cookie e tecnologie simili per migliorare l'esperienza utente, analizzare l'utilizzo del sito e fornire contenuti personalizzati. Puoi gestire le preferenze dei cookie attraverso le impostazioni del tuo browser.
          </Text>

          <Text style={styles.sectionTitle}>9. Trasferimenti Internazionali</Text>
          <Text style={styles.paragraph}>
            Essendo una società con sede a Dubai, i tuoi dati possono essere trasferiti e processati negli Emirati Arabi Uniti. Garantiamo che tutti i trasferimenti avvengano in conformità alle normative sulla protezione dei dati applicabili.
          </Text>

          <Text style={styles.sectionTitle}>10. Modifiche alla Privacy Policy</Text>
          <Text style={styles.paragraph}>
            Ci riserviamo il diritto di aggiornare questa Privacy Policy periodicamente. Ti informeremo di eventuali modifiche significative tramite email o attraverso un avviso sulla nostra piattaforma.
          </Text>

          <Text style={styles.sectionTitle}>11. Contatti</Text>
          <Text style={styles.paragraph}>
            Per qualsiasi domanda riguardo a questa Privacy Policy o per esercitare i tuoi diritti, puoi contattarci a:
          </Text>
          <Text style={styles.contactInfo}>Email: {brandConfig.email}</Text>
          <Text style={styles.contactInfo}>Telefono: {brandConfig.phone}</Text>
          <Text style={styles.contactInfo}>
            Indirizzo: {brandConfig.address.street}, {brandConfig.address.city}, {brandConfig.address.country}
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
    paddingBottom: 40,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  lastUpdated: {
    fontSize: 14,
    color: Colors.mediumGray,
    marginBottom: 24,
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary,
    marginTop: 24,
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 16,
  },
  bulletPoint: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 8,
    marginLeft: 16,
  },
  contactInfo: {
    fontSize: 16,
    color: Colors.primary,
    lineHeight: 24,
    marginBottom: 4,
    fontWeight: '500',
  },
});