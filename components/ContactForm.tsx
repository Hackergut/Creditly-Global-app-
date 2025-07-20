import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import * as Haptics from 'expo-haptics';

import Colors from '@/constants/colors';
import { ContactFormData } from '@/types';

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    if (validateForm()) {
      // In a real app, you would send this data to your backend
      console.log('Form submitted:', formData);
      Alert.alert(
        'Success',
        'Your message has been sent. We will contact you shortly.',
        [{ text: 'OK' }]
      );
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  return (
    <View style={styles.container} testID="contact-form">
      <Text style={styles.label}>Name *</Text>
      <TextInput
        style={[styles.input, errors.name ? styles.inputError : null]}
        placeholder="Your name"
        value={formData.name}
        onChangeText={(text) => {
          setFormData({ ...formData, name: text });
          if (errors.name) setErrors({ ...errors, name: undefined });
        }}
        testID="name-input"
      />
      {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

      <Text style={styles.label}>Email *</Text>
      <TextInput
        style={[styles.input, errors.email ? styles.inputError : null]}
        placeholder="Your email address"
        keyboardType="email-address"
        autoCapitalize="none"
        value={formData.email}
        onChangeText={(text) => {
          setFormData({ ...formData, email: text });
          if (errors.email) setErrors({ ...errors, email: undefined });
        }}
        testID="email-input"
      />
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

      <Text style={styles.label}>Phone</Text>
      <TextInput
        style={styles.input}
        placeholder="Your phone number"
        keyboardType="phone-pad"
        value={formData.phone}
        onChangeText={(text) => setFormData({ ...formData, phone: text })}
        testID="phone-input"
      />

      <Text style={styles.label}>Message *</Text>
      <TextInput
        style={[
          styles.input, 
          styles.textArea, 
          errors.message ? styles.inputError : null
        ]}
        placeholder="How can we help you?"
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        value={formData.message}
        onChangeText={(text) => {
          setFormData({ ...formData, message: text });
          if (errors.message) setErrors({ ...errors, message: undefined });
        }}
        testID="message-input"
      />
      {errors.message ? <Text style={styles.errorText}>{errors.message}</Text> : null}

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleSubmit}
        testID="submit-button"
      >
        <Text style={styles.buttonText}>Send Message</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 20,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 6,
  },
  input: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  inputError: {
    borderColor: Colors.error,
  },
  textArea: {
    height: 120,
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
    marginTop: -12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});