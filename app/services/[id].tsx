import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';

import { services } from '@/constants/services';
import Colors from '@/constants/colors';
import { brandAssets } from '@/constants/brandAssets';

export default function ServiceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  
  const currentPath = `/services/${id}`;
  const service = services.find(s => s.route === currentPath);
  
  if (!service) {
    return (
      <View style={styles.container}>
        <Stack.Screen 
          options={{
            title: 'Service Not Found',
            headerStyle: {
              backgroundColor: Colors.primary,
            },
            headerTintColor: Colors.white,
          }} 
        />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Service not found</Text>
        </View>
      </View>
    );
  }

  const getServiceImage = () => {
    switch (service.icon) {
      case 'briefcase':
        return brandAssets.business.partnership;
      case 'calculator':
        return brandAssets.technology.analytics;
      case 'trending-up':
        return brandAssets.technology.charts;
      case 'monitor':
        return brandAssets.technology.data;
      case 'shield-check':
        return brandAssets.architecture.corporate;
      case 'bar-chart':
        return brandAssets.technology.trading;
      default:
        return brandAssets.architecture.modern;
    }
  };

  const getServiceContent = () => {
    const baseContent = [
      `Our ${service.title} service is designed to help businesses excel in today's complex global marketplace.`,
      `With extensive experience across multiple industries and jurisdictions, our expert team provides tailored solutions to meet your specific business needs.`,
      `We understand the unique challenges that modern businesses face and work closely with you to develop strategies that drive sustainable growth and profitability.`,
    ];

    switch (service.icon) {
      case 'briefcase':
        return [
          ...baseContent,
          `Our business consultancy services help companies navigate strategic challenges, optimize operations, and identify new growth opportunities in both local and international markets.`,
          `We provide comprehensive guidance on market entry strategies, operational efficiency, and digital transformation initiatives.`
        ];
      case 'calculator':
        return [
          ...baseContent,
          `Our tax optimization services help businesses minimize their tax burden while ensuring full compliance across all relevant jurisdictions.`,
          `We specialize in international tax planning, transfer pricing, and cross-border transaction structuring for maximum efficiency.`
        ];
      case 'trending-up':
        return [
          ...baseContent,
          `Our financial advisory services encompass investment planning, risk management, and strategic financial planning to secure your business future.`,
          `We help you make informed financial decisions that align with your business objectives and market conditions.`
        ];
      case 'monitor':
        return [
          ...baseContent,
          `Our digital transformation services help businesses leverage technology to streamline operations, improve efficiency, and enhance customer experience.`,
          `We provide end-to-end digital solutions including platform development, system integration, and process automation.`
        ];
      case 'shield-check':
        return [
          ...baseContent,
          `Our regulatory compliance services ensure your business meets all legal and regulatory requirements across different jurisdictions.`,
          `We provide ongoing compliance monitoring, risk assessment, and regulatory reporting to keep your business protected.`
        ];
      case 'bar-chart':
        return [
          ...baseContent,
          `Our investment management services provide professional portfolio management and asset optimization strategies for sustainable growth.`,
          `We offer comprehensive investment solutions tailored to your risk profile and business objectives.`
        ];
      default:
        return baseContent;
    }
  };

  const serviceContent = getServiceContent();

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: service.title,
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
        testID={`service-detail-${id}`}
      >
        <Image
          source={getServiceImage()}
          style={styles.headerImage}
          contentFit="cover"
        />
        
        <View style={styles.content}>
          <Text style={styles.title}>{service.title}</Text>
          <Text style={styles.description}>{service.description}</Text>
          
          {serviceContent.map((paragraph, index) => (
            <Text key={index} style={styles.paragraph}>
              {paragraph}
            </Text>
          ))}
          
          <View style={styles.featuresContainer}>
            <Text style={styles.featuresTitle}>Key Benefits</Text>
            
            <View style={styles.featureItem}>
              <Text style={styles.featureText}>• Customized solutions tailored to your business requirements</Text>
            </View>
            
            <View style={styles.featureItem}>
              <Text style={styles.featureText}>• Expert team with international experience and local knowledge</Text>
            </View>
            
            <View style={styles.featureItem}>
              <Text style={styles.featureText}>• Proven methodologies and best practices</Text>
            </View>
            
            <View style={styles.featureItem}>
              <Text style={styles.featureText}>• Ongoing support and strategic guidance</Text>
            </View>
            
            <View style={styles.featureItem}>
              <Text style={styles.featureText}>• Transparent communication and regular reporting</Text>
            </View>

            <View style={styles.featureItem}>
              <Text style={styles.featureText}>• Dubai-based with global reach and expertise</Text>
            </View>
          </View>

          <View style={styles.ctaContainer}>
            <Text style={styles.ctaTitle}>Ready to Transform Your Business?</Text>
            <Text style={styles.ctaText}>
              Contact us today to discuss how our {service.title} service can help optimize your business operations and drive sustainable growth.
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: Colors.error,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  headerImage: {
    width: '100%',
    height: 220,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: Colors.primary,
    marginBottom: 20,
    fontWeight: '500',
    lineHeight: 22,
  },
  paragraph: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 16,
    lineHeight: 24,
  },
  featuresContainer: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  featureItem: {
    marginBottom: 12,
  },
  featureText: {
    fontSize: 16,
    color: Colors.darkGray,
    lineHeight: 24,
  },
  ctaContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.white,
    marginBottom: 8,
  },
  ctaText: {
    fontSize: 16,
    color: Colors.white,
    textAlign: 'center',
    lineHeight: 22,
    opacity: 0.9,
  },
});