import mobileAds, { MaxAdContentRating } from 'react-native-google-mobile-ads';

export const initializeAds = async () => {
  try {
    await mobileAds().initialize();

    await mobileAds().setRequestConfiguration({
      maxAdContentRating: MaxAdContentRating.G,
      tagForChildDirectedTreatment: false,
      tagForUnderAgeOfConsent: false,
    });

    console.log('Google Mobile Ads initialized successfully');
    return { initialized: true };
  } catch (error) {
    console.error('Failed to initialize Google Mobile Ads:', error);
    return { initialized: false, error };
  }
};
