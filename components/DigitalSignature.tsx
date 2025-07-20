import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { PenTool, RotateCcw, Check } from 'lucide-react-native';
import SignatureScreen from 'react-native-signature-canvas';

import Colors from '@/constants/colors';

interface DigitalSignatureProps {
  onSignatureChange: (signature: string | null) => void;
  signature: string | null;
  requestData: any;
}

const { width } = Dimensions.get('window');

export default function DigitalSignature({ onSignatureChange, signature, requestData }: DigitalSignatureProps) {
  const [isSignaturePadVisible, setIsSignaturePadVisible] = useState(false);
  const signatureRef = useRef<any>(null);

  const handleSignature = (signature: string) => {
    onSignatureChange(signature);
    setIsSignaturePadVisible(false);
  };

  const handleClear = () => {
    if (signatureRef.current) {
      signatureRef.current.clearSignature();
    }
  };

  const handleEmpty = () => {
    Alert.alert('Firma richiesta', 'Per favore, firma nel riquadro prima di continuare.');
  };

  const clearSignature = () => {
    onSignatureChange(null);
  };

  const generateContractText = () => {
    const { credit, formData } = requestData;
    const currentDate = new Date().toLocaleDateString('it-IT');
    
    return `
CONTRATTO DI CESSIONE CREDITO FISCALE

Data: ${currentDate}

Il sottoscritto ${formData.legalRepresentative || '[Nome]'}, in qualità di legale rappresentante di ${formData.companyName || '[Ragione Sociale]'}, con sede legale in [Indirizzo], Codice Fiscale/P.IVA ${formData.vatNumber || '[P.IVA]'}, 

DICHIARA

di voler cedere a Creditly Global il credito fiscale derivante da ${credit?.name || '[Tipo Credito]'} per un importo nominale di €${formData.amount || '[Importo]'}.

ACCETTA

- Le condizioni economiche proposte
- I termini e le modalità di cessione
- Le tempistiche di pagamento concordate
- Le clausole di garanzia e responsabilità

AUTORIZZA

Creditly Global a procedere con tutte le pratiche necessarie per la cessione del credito presso l'Agenzia delle Entrate e gli enti competenti.

Il presente contratto è regolato dalla normativa italiana vigente in materia di cessione dei crediti fiscali.

Luogo e data: Dubai, ${currentDate}

Firma digitale del Cedente:
    `;
  };

  const signatureStyle = `
    .m-signature-pad {
      box-shadow: none;
      border: 2px dashed ${Colors.primary};
      border-radius: 8px;
    }
    .m-signature-pad--body {
      border: none;
    }
    .m-signature-pad--footer {
      display: none;
    }
    body, html {
      background-color: ${Colors.background};
    }
  `;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Firma Digitale del Contratto</Text>
      <Text style={styles.subtitle}>
        Rivedi i dettagli del contratto e apponi la tua firma digitale per completare la richiesta.
      </Text>

      <View style={styles.contractContainer}>
        <Text style={styles.contractTitle}>Riepilogo Contratto</Text>
        <View style={styles.contractDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Tipo di credito:</Text>
            <Text style={styles.detailValue}>{requestData.credit?.name}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Importo nominale:</Text>
            <Text style={styles.detailValue}>€{requestData.formData?.amount}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Valore di cessione:</Text>
            <Text style={styles.detailValue}>
              €{requestData.formData?.calculatedValues?.saleValue?.toLocaleString()}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Azienda:</Text>
            <Text style={styles.detailValue}>{requestData.formData?.companyName}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Rappresentante:</Text>
            <Text style={styles.detailValue}>{requestData.formData?.legalRepresentative}</Text>
          </View>
        </View>
      </View>

      <View style={styles.contractTextContainer}>
        <Text style={styles.contractTextTitle}>Testo del Contratto</Text>
        <Text style={styles.contractText}>{generateContractText()}</Text>
      </View>

      <View style={styles.signatureContainer}>
        <Text style={styles.signatureTitle}>Firma qui sotto per accettare i termini</Text>
        
        {signature ? (
          <View style={styles.signedContainer}>
            <View style={styles.signaturePreview}>
              <Text style={styles.signedText}>✓ Documento firmato digitalmente</Text>
              <Text style={styles.signedDate}>
                {new Date().toLocaleDateString('it-IT')} alle {new Date().toLocaleTimeString('it-IT')}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.clearButton}
              onPress={clearSignature}
            >
              <RotateCcw size={16} color={Colors.error} />
              <Text style={styles.clearButtonText}>Rifirma</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.signButton}
            onPress={() => setIsSignaturePadVisible(true)}
          >
            <PenTool size={20} color={Colors.white} />
            <Text style={styles.signButtonText}>Apponi Firma Digitale</Text>
          </TouchableOpacity>
        )}
      </View>

      {isSignaturePadVisible && (
        <View style={styles.signaturePadContainer}>
          <View style={styles.signaturePadHeader}>
            <Text style={styles.signaturePadTitle}>Firma nel riquadro sottostante</Text>
            <View style={styles.signaturePadControls}>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={handleClear}
              >
                <RotateCcw size={16} color={Colors.mediumGray} />
                <Text style={styles.controlButtonText}>Cancella</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={() => setIsSignaturePadVisible(false)}
              >
                <Text style={styles.controlButtonText}>Annulla</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.signaturePad}>
            <SignatureScreen
              ref={signatureRef}
              onOK={handleSignature}
              onEmpty={handleEmpty}
              onClear={() => console.log('Signature cleared')}
              autoClear={false}
              descriptionText=""
              clearText="Cancella"
              confirmText="Conferma"
              webStyle={signatureStyle}
              imageType="image/png"
            />
          </View>
        </View>
      )}

      <View style={styles.legalNotice}>
        <Text style={styles.legalTitle}>Valore Legale della Firma Digitale</Text>
        <Text style={styles.legalText}>
          La firma digitale apposta ha pieno valore legale secondo il Codice dell'Amministrazione Digitale (CAD) 
          e le normative europee eIDAS. Il documento firmato costituisce prova dell'accettazione dei termini contrattuali.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.darkGray,
    marginBottom: 20,
    lineHeight: 20,
  },
  contractContainer: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contractTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 12,
  },
  contractDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: Colors.mediumGray,
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  contractTextContainer: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    maxHeight: 200,
  },
  contractTextTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  contractText: {
    fontSize: 12,
    color: Colors.darkGray,
    lineHeight: 16,
    fontFamily: 'monospace',
  },
  signatureContainer: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  signatureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  signedContainer: {
    alignItems: 'center',
  },
  signaturePreview: {
    backgroundColor: Colors.success + '20',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    width: '100%',
  },
  signedText: {
    fontSize: 16,
    color: Colors.success,
    fontWeight: '600',
    marginBottom: 4,
  },
  signedDate: {
    fontSize: 12,
    color: Colors.mediumGray,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  clearButtonText: {
    fontSize: 14,
    color: Colors.error,
    marginLeft: 4,
  },
  signButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  signaturePadContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.white,
    zIndex: 1000,
  },
  signaturePadHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  signaturePadTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  signaturePadControls: {
    flexDirection: 'row',
    gap: 12,
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  controlButtonText: {
    fontSize: 14,
    color: Colors.mediumGray,
    marginLeft: 4,
  },
  signaturePad: {
    flex: 1,
    margin: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  legalNotice: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
  },
  legalTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  legalText: {
    fontSize: 12,
    color: Colors.darkGray,
    lineHeight: 18,
  },
});