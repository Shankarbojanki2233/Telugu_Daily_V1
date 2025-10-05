# Google AdMob Setup Instructions

## Complete AdMob Integration

Your Telugu Daily app now has Google AdMob fully integrated with banner ads displaying at sentences 10, 20, 30, 40, and 50.

## Setup Steps

### 1. Get Your AdMob IDs

You need to obtain the following from your Google AdMob account:

- **Android App ID**: Format `ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy`
- **iOS App ID**: Format `ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy`
- **Banner Ad Unit ID (Android)**: Format `ca-app-pub-xxxxxxxxxxxxxxxx/zzzzzzzzzz`
- **Banner Ad Unit ID (iOS)**: Format `ca-app-pub-xxxxxxxxxxxxxxxx/zzzzzzzzzz`

### 2. Update Configuration Files

#### Update `.env` File

Replace the placeholder IDs with your actual AdMob IDs:

```env
EXPO_PUBLIC_ADMOB_ANDROID_APP_ID=ca-app-pub-YOUR-ANDROID-APP-ID
EXPO_PUBLIC_ADMOB_IOS_APP_ID=ca-app-pub-YOUR-IOS-APP-ID
EXPO_PUBLIC_ADMOB_BANNER_AD_UNIT_ID_ANDROID=ca-app-pub-YOUR-ANDROID-BANNER-UNIT-ID
EXPO_PUBLIC_ADMOB_BANNER_AD_UNIT_ID_IOS=ca-app-pub-YOUR-IOS-BANNER-UNIT-ID
```

#### Update `app.json` File

Replace the placeholder App IDs in the plugins section:

```json
[
  "react-native-google-mobile-ads",
  {
    "android_app_id": "ca-app-pub-YOUR-ANDROID-APP-ID",
    "ios_app_id": "ca-app-pub-YOUR-IOS-APP-ID"
  }
]
```

### 3. How It Works

- **AdMob SDK**: Initialized automatically when the app starts
- **Banner Ads**: Display after sentences 10, 20, 30, 40, and 50
- **Test Ads**: In development mode, test ads are shown automatically
- **Production Ads**: Your real ads will show once you build for production with your actual Ad Unit IDs

### 4. Implementation Details

#### Files Modified:
- `package.json`: Added `react-native-google-mobile-ads` dependency
- `app.json`: Added AdMob plugin configuration
- `.env`: Added AdMob environment variables
- `components/BannerAd.tsx`: Implemented native AdMob banner component
- `utils/adInitializer.ts`: Added AdMob SDK initialization
- `app/(tabs)/index.tsx`: Integrated banner ads at specific sentence positions

#### Ad Placement Logic:
Banner ads appear after every 10th sentence (10, 20, 30, 40, 50) in the home screen.

### 5. Testing

#### Development Mode (Test Ads):
- Run the app in development mode
- You'll see test banner ads at the specified positions
- Test ads are provided by Google and don't require your actual Ad Unit IDs

#### Production Mode (Real Ads):
1. Update all placeholder IDs in `.env` and `app.json` with your real AdMob IDs
2. Build the app for production:
   - Android: `expo build:android` or `eas build --platform android`
   - iOS: `expo build:ios` or `eas build --platform ios`
3. Your real ads will start showing based on your AdMob account configuration

### 6. Important Notes

- **Native Build Required**: AdMob requires native code. The ads will NOT work in Expo Go or web preview.
- **Development Build**: Create a development build with `npx expo run:android` or `npx expo run:ios` to test ads on a device.
- **EAS Build**: For production, use EAS Build for creating standalone apps.

### 7. Next Steps

1. Get your AdMob App IDs and Ad Unit IDs from https://admob.google.com/
2. Replace all placeholder IDs in `.env` and `app.json`
3. Create a development build to test on a real device
4. Verify ads are displaying correctly at sentences 10, 20, 30, 40, and 50
5. Build for production when ready

## Support

For AdMob setup help, visit:
- Google AdMob Documentation: https://admob.google.com/
- React Native Google Mobile Ads: https://docs.page/invertase/react-native-google-mobile-ads
