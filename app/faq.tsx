import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { ChevronDown, ChevronUp } from 'lucide-react-native';

import Colors from '@/constants/colors';
import { brandConfig } from '@/constants/brandConfig';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: '1',
    question: 'Cos\'è Creditly Global e cosa offre?',
    answer: `${brandConfig.name} è una società con sede a Dubai specializzata nella gestione, certificazione e acquisizione di crediti fiscali. Offriamo servizi per Superbonus 110%, Bonus Edilizi, Crediti Industria 4.0, Crediti IVA e crediti verso la Pubblica Amministrazione.`
  },
  {
    id: '2',
    question: 'Come funziona il processo di valutazione?',
    answer: 'Il processo inizia con una valutazione gratuita. Carichi i tuoi documenti sulla nostra piattaforma digitale, i nostri esperti analizzano la tua situazione e ti forniamo una proposta commerciale dettagliata per l\'acquisizione del credito.'
  },
  {
    id: '3',
    question: 'Quali documenti sono necessari?',
    answer: 'I documenti variano in base al tipo di credito. Generalmente servono: documentazione fiscale, certificazioni tecniche, fatture, contratti e attestazioni specifiche per ogni tipologia di bonus. Ti guideremo nella preparazione completa.'
  },
  {
    id: '4',
    question: 'Quanto tempo richiede il processo?',
    answer: 'I tempi variano in base alla complessità del caso. La valutazione iniziale richiede 3-5 giorni lavorativi. L\'intero processo di acquisizione può richiedere da 2 a 8 settimane, a seconda della tipologia di credito e della completezza della documentazione.'
  },
  {
    id: '5',
    question: 'Perché la sede è a Dubai?',
    answer: 'Dubai offre vantaggi fiscali e operativi significativi che trasmettiamo ai nostri clienti. La posizione strategica negli Emirati Arabi Uniti facilita le operazioni internazionali e garantisce efficienza operativa con costi ridotti.'
  },
  {
    id: '6',
    question: 'Il Superbonus 110% è ancora attivo?',
    answer: 'Sì, ma con aliquote decrescenti. Per i condomini: 110% fino al 31/12/2023, 70% fino al 31/12/2024, 65% fino al 31/12/2025. Per le villette unifamiliari ci sono condizioni specifiche e scadenze diverse.'
  },
  {
    id: '7',
    question: 'Cosa sono i Crediti Industria 4.0?',
    answer: 'Sono crediti d\'imposta per investimenti in beni strumentali tecnologici. Le percentuali vanno dal 10% al 50% dell\'investimento, fino a 20 milioni di euro, per macchinari, software e tecnologie 4.0.'
  },
  {
    id: '8',
    question: 'Come vengono gestiti i miei dati?',
    answer: 'Garantiamo massima sicurezza nella gestione dei dati con conformità alle normative internazionali GDPR. Tutti i documenti sono crittografati e conservati su server sicuri con accesso limitato solo al personale autorizzato.'
  },
  {
    id: '9',
    question: 'Quali sono i costi del servizio?',
    answer: 'La valutazione iniziale è sempre gratuita. I costi del servizio vengono comunicati in modo trasparente nella proposta commerciale e variano in base al tipo e valore del credito. Non ci sono costi nascosti.'
  },
  {
    id: '10',
    question: 'Posso monitorare lo stato della mia richiesta?',
    answer: 'Sì, attraverso la nostra piattaforma digitale puoi monitorare in tempo reale lo stato della tua richiesta, visualizzare i documenti caricati e ricevere aggiornamenti automatici via email.'
  }
];

interface FAQItemComponentProps {
  item: FAQItem;
  isExpanded: boolean;
  onToggle: () => void;
}

function FAQItemComponent({ item, isExpanded, onToggle }: FAQItemComponentProps) {
  return (
    <View style={styles.faqItem}>
      <TouchableOpacity 
        style={styles.questionContainer}
        onPress={onToggle}
        testID={`faq-question-${item.id}`}
      >
        <Text style={styles.question}>{item.question}</Text>
        {isExpanded ? (
          <ChevronUp size={20} color={Colors.primary} />
        ) : (
          <ChevronDown size={20} color={Colors.primary} />
        )}
      </TouchableOpacity>
      
      {isExpanded && (
        <View style={styles.answerContainer}>
          <Text style={styles.answer}>{item.answer}</Text>
        </View>
      )}
    </View>
  );
}

export default function FAQScreen() {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'FAQ',
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
        testID="faq-screen"
      >
        <View style={styles.content}>
          <Text style={styles.title}>Domande Frequenti</Text>
          <Text style={styles.subtitle}>
            Trova le risposte alle domande più comuni sui nostri servizi di gestione crediti fiscali.
          </Text>
          
          <View style={styles.faqContainer}>
            {faqData.map((item) => (
              <FAQItemComponent
                key={item.id}
                item={item}
                isExpanded={expandedItems.has(item.id)}
                onToggle={() => toggleItem(item.id)}
              />
            ))}
          </View>
          
          <View style={styles.contactSection}>
            <Text style={styles.contactTitle}>Non hai trovato la risposta?</Text>
            <Text style={styles.contactText}>
              Contattaci direttamente per ricevere assistenza personalizzata dal nostro team di esperti.
            </Text>
          </View>
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
  subtitle: {
    fontSize: 16,
    color: Colors.darkGray,
    marginBottom: 24,
    lineHeight: 22,
  },
  faqContainer: {
    marginBottom: 32,
  },
  faqItem: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
    marginRight: 12,
  },
  answerContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
  },
  answer: {
    fontSize: 14,
    color: Colors.darkGray,
    lineHeight: 20,
    marginTop: 12,
  },
  contactSection: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.white,
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    color: Colors.white,
    textAlign: 'center',
    lineHeight: 20,
    opacity: 0.9,
  },
});