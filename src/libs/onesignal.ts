import { OneSignal } from 'react-native-onesignal';
import { Platform } from 'react-native';


function oneSignalInitialize() {
  OneSignal.initialize('dd4e9678-ad79-4297-9b94-b77b977138df');
  OneSignal.User.addTag('user_name', 'Gabriel');
  OneSignal.User.addTag('user_email', 'gabismerigo@gmail.com');
  

  if (Platform.OS === 'ios') {
    OneSignal.Notifications.canRequestPermission().then((response) => {
      if (response) {
        OneSignal.Notifications.requestPermission(true);
      }
    });
  }
}

export { oneSignalInitialize };