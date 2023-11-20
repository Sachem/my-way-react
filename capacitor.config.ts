import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'co.uk.01solutions.myway',
  appName: 'My Way',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    GoogleAuth: {
      scopes: ["profile","email"],
      serverClientId: "115573134563-ivq857r42h71gnqr8cbcujohi46n58ip.apps.googleusercontent.com",
      forceCodeForRefreshToken: true
    }
  }
};

export default config;
