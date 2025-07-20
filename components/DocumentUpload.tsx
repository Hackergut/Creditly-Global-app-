import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, FlatList, Platform } from 'react-native';
import { Upload, FileText, X, CheckCircle, AlertCircle } from 'lucide-react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';

import Colors from '@/constants/colors';

interface Document {
  id: string;
  name: string;
  uri: string;
  type: string;
  size: number;
  category: string;
  required: boolean;
}

interface DocumentUploadProps {
  creditType: string;
  onDocumentsChange: (documents: Document[]) => void;
  documents: Document[];
}

export default function DocumentUpload({ creditType, onDocumentsChange, documents }: DocumentUploadProps) {
  const [uploadingDocuments, setUploadingDocuments] = useState<string[]>([]);

  const getRequiredDocuments = (type: string) => {
    const commonDocs = [
      { category: 'identity', name: 'Documento di identità', required: true },
      { category: 'company', name: 'Visura camerale', required: true },
      { category: 'tax', name: 'Codice fiscale/P.IVA', required: true },
    ];

    const specificDocs = {
      'superbonus': [
        { category: 'technical', name: 'Asseverazione tecnica', required: true },
        { category: 'conformity', name: 'Visto di conformità', required: true },
        { category: 'invoices', name: 'Fatture degli interventi', required: true },
        { category: 'permits', name: 'Titoli abilitativi', required: false },
        { category: 'energy', name: 'APE ante e post intervento', required: true },
      ],
      'bonus-edilizi': [
        { category: 'technical', name: 'Asseverazione tecnica', required: true },
        { category: 'conformity', name: 'Visto di conformità', required: true },
        { category: 'invoices', name: 'Fatture e ricevute', required: true },
        { category: 'permits', name: 'Permessi/SCIA', required: false },
      ],
      'crediti-4-0': [
        { category: 'technical', name: 'Perizia tecnica', required: true },
        { category: 'invoices', name: 'Fatture di acquisto', required: true },
        { category: 'certificates', name: 'Certificati di conformità', required: true },
        { category: 'interconnection', name: 'Dichiarazione di interconnessione', required: false },
      ],
      'credito-iva': [
        { category: 'tax', name: 'Dichiarazione IVA', required: true },
        { category: 'balance', name: 'Bilancio aziendale', required: true },
        { category: 'invoices', name: 'Fatture di riferimento', required: true },
      ],
      'credito-pa': [
        { category: 'contract', name: 'Contratto con P.A.', required: true },
        { category: 'invoices', name: 'Fatture emesse', required: true },
        { category: 'certification', name: 'Certificato di credito', required: true },
      ]
    };

    return [...commonDocs, ...(specificDocs[type] || [])];
  };

  const requiredDocuments = getRequiredDocuments(creditType);

  const pickDocument = async (category: string) => {
    try {
      setUploadingDocuments(prev => [...prev, category]);

      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        const newDocument: Document = {
          id: Date.now().toString(),
          name: asset.name,
          uri: asset.uri,
          type: asset.mimeType || 'application/octet-stream',
          size: asset.size || 0,
          category,
          required: requiredDocuments.find(doc => doc.category === category)?.required || false,
        };

        const updatedDocuments = [...documents.filter(doc => doc.category !== category), newDocument];
        onDocumentsChange(updatedDocuments);
      }
    } catch (error) {
      console.error('Errore nel caricamento documento:', error);
      Alert.alert('Errore', 'Impossibile caricare il documento');
    } finally {
      setUploadingDocuments(prev => prev.filter(cat => cat !== category));
    }
  };

  const pickImage = async (category: string) => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert('Permesso richiesto', 'È necessario il permesso per accedere alla galleria');
        return;
      }

      setUploadingDocuments(prev => [...prev, category]);

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        const newDocument: Document = {
          id: Date.now().toString(),
          name: `${category}_${Date.now()}.jpg`,
          uri: asset.uri,
          type: 'image/jpeg',
          size: asset.fileSize || 0,
          category,
          required: requiredDocuments.find(doc => doc.category === category)?.required || false,
        };

        const updatedDocuments = [...documents.filter(doc => doc.category !== category), newDocument];
        onDocumentsChange(updatedDocuments);
      }
    } catch (error) {
      console.error('Errore nel caricamento immagine:', error);
      Alert.alert('Errore', 'Impossibile caricare l\'immagine');
    } finally {
      setUploadingDocuments(prev => prev.filter(cat => cat !== category));
    }
  };

  const removeDocument = (documentId: string) => {
    const updatedDocuments = documents.filter(doc => doc.id !== documentId);
    onDocumentsChange(updatedDocuments);
  };

  const showUploadOptions = (category: string) => {
    Alert.alert(
      'Carica Documento',
      'Scegli come caricare il documento',
      [
        { text: 'Annulla', style: 'cancel' },
        { text: 'Galleria', onPress: () => pickImage(category) },
        { text: 'File', onPress: () => pickDocument(category) },
      ]
    );
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getDocumentStatus = (category: string) => {
    const document = documents.find(doc => doc.category === category);
    const isRequired = requiredDocuments.find(doc => doc.category === category)?.required;
    
    if (document) return 'uploaded';
    if (isRequired) return 'required';
    return 'optional';
  };

  const renderDocumentItem = ({ item }: { item: any }) => {
    const status = getDocumentStatus(item.category);
    const uploadedDoc = documents.find(doc => doc.category === item.category);
    const isUploading = uploadingDocuments.includes(item.category);

    return (
      <View style={styles.documentItem}>
        <View style={styles.documentInfo}>
          <View style={styles.documentHeader}>
            <Text style={styles.documentName}>{item.name}</Text>
            {item.required && <Text style={styles.requiredLabel}>Obbligatorio</Text>}
          </View>
          
          {uploadedDoc ? (
            <View style={styles.uploadedInfo}>
              <View style={styles.uploadedDetails}>
                <CheckCircle size={16} color={Colors.success} />
                <Text style={styles.uploadedText}>{uploadedDoc.name}</Text>
                <Text style={styles.fileSizeText}>({formatFileSize(uploadedDoc.size)})</Text>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeDocument(uploadedDoc.id)}
              >
                <X size={16} color={Colors.error} />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={[
                styles.uploadButton,
                isUploading && styles.uploadButtonDisabled
              ]}
              onPress={() => showUploadOptions(item.category)}
              disabled={isUploading}
            >
              <Upload size={16} color={Colors.primary} />
              <Text style={styles.uploadButtonText}>
                {isUploading ? 'Caricamento...' : 'Carica documento'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        
        <View style={[
          styles.statusIndicator,
          status === 'uploaded' && styles.statusUploaded,
          status === 'required' && styles.statusRequired,
          status === 'optional' && styles.statusOptional,
        ]} />
      </View>
    );
  };

  const getCompletionStatus = () => {
    const requiredDocs = requiredDocuments.filter(doc => doc.required);
    const uploadedRequiredDocs = requiredDocs.filter(doc => 
      documents.some(uploaded => uploaded.category === doc.category)
    );
    
    return {
      completed: uploadedRequiredDocs.length,
      total: requiredDocs.length,
      isComplete: uploadedRequiredDocs.length === requiredDocs.length
    };
  };

  const completionStatus = getCompletionStatus();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Documenti Richiesti</Text>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {completionStatus.completed}/{completionStatus.total} obbligatori
          </Text>
          {completionStatus.isComplete ? (
            <CheckCircle size={20} color={Colors.success} />
          ) : (
            <AlertCircle size={20} color={Colors.secondary} />
          )}
        </View>
      </View>

      <Text style={styles.subtitle}>
        Carica tutti i documenti necessari per la valutazione del tuo credito fiscale.
      </Text>

      <FlatList
        data={requiredDocuments}
        keyExtractor={(item) => item.category}
        renderItem={renderDocumentItem}
        showsVerticalScrollIndicator={false}
        style={styles.documentsList}
      />

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Formati supportati:</Text>
        <Text style={styles.infoText}>PDF, JPG, PNG (max 10MB per file)</Text>
        
        <Text style={styles.infoTitle}>Suggerimenti:</Text>
        <Text style={styles.infoText}>
          • Assicurati che i documenti siano leggibili{'\n'}
          • Scansiona in alta qualità{'\n'}
          • Verifica che tutte le informazioni siano visibili
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    color: Colors.mediumGray,
    marginRight: 8,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.darkGray,
    marginBottom: 20,
    lineHeight: 20,
  },
  documentsList: {
    flex: 1,
  },
  documentItem: {
    flexDirection: 'row',
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
  documentInfo: {
    flex: 1,
  },
  documentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  documentName: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
    flex: 1,
  },
  requiredLabel: {
    fontSize: 12,
    color: Colors.error,
    backgroundColor: Colors.error + '20',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    fontWeight: '500',
  },
  uploadedInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  uploadedDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  uploadedText: {
    fontSize: 14,
    color: Colors.success,
    marginLeft: 8,
    flex: 1,
  },
  fileSizeText: {
    fontSize: 12,
    color: Colors.mediumGray,
    marginLeft: 4,
  },
  removeButton: {
    padding: 4,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
  },
  uploadButtonDisabled: {
    opacity: 0.5,
  },
  uploadButtonText: {
    fontSize: 14,
    color: Colors.primary,
    marginLeft: 8,
    fontWeight: '500',
  },
  statusIndicator: {
    width: 4,
    borderRadius: 2,
    marginLeft: 12,
  },
  statusUploaded: {
    backgroundColor: Colors.success,
  },
  statusRequired: {
    backgroundColor: Colors.error,
  },
  statusOptional: {
    backgroundColor: Colors.mediumGray,
  },
  infoContainer: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 12,
    color: Colors.darkGray,
    marginBottom: 12,
    lineHeight: 18,
  },
});