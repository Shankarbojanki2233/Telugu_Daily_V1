import mobileAds from 'react-native-google-mobile-ads';

export const initializeAds = async () => {
  try {
    const adapterStatuses = await mobileAds().initialize();
    console.log('Google Mobile Ads initialized:', adapterStatuses);
    return adapterStatuses;
  } catch (error) {
    console.log('Google Mobile Ads initialization failed:', error);
    throw error;
  }
};