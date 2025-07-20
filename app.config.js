import { brandConfig } from './constants/brandConfig';

export default {
  expo: {
    name: brandConfig.name,
    slug: "creditly-global",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#1A4D8F"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.creditlyglobal.app"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#1A4D8F"
      },
      package: "com.creditlyglobal.app"
    },
    web: {
      favicon: "./assets/favicon.png",
      bundler: "metro"
    },
    extra: {
      apiBaseUrl: process.env.EXPO_PUBLIC_RORK_API_BASE_URL || `https://${brandConfig.domain}`,
      appEnv: process.env.EXPO_PUBLIC_APP_ENV || "production",
      openaiApiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY
    }
  }
};