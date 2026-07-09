import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.blackjacktrainer.app',
  appName: 'Blackjack Trainer',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  ios: {
    contentInset: 'automatic',
    preferredContentMode: 'mobile',
    scheme: 'Blackjack Trainer',
    backgroundColor: '#030712'
  },
  plugins: {
    StatusBar: {
      style: 'dark',
      backgroundColor: '#030712'
    },
    Haptics: {
      // Enable haptic feedback for button presses
    },
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#030712',
      showSpinner: false,
      androidScaleType: 'CENTER_CROP',
      splashFullScreen: true,
      splashImmersive: true
    }
  }
};

export default config;
