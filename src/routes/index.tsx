import { useEffect, useState } from 'react';
import { OSNotification } from 'react-native-onesignal';
import { useTheme } from 'native-base';
import { OneSignal } from 'react-native-onesignal';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import { Notification } from '../components/Notification';
import { NotificationEventTypeMap } from 'react-native-onesignal/dist/models/NotificationEvents';

import { AppRoutes } from './app.routes';

export function Routes() {
  const [notification, setNotification] = useState<OSNotification | null>();
  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  useEffect(() => {
    const unsubscribe = OneSignal.Notifications.addEventListener('foregroundWillDisplay', (notificationReceivedEvent: NotificationEventTypeMap['foregroundWillDisplay']) => {
      const response = notificationReceivedEvent.getNotification();

      setNotification(response);
    })

    return () => unsubscribe
  }, [])

  return (
    <NavigationContainer theme={theme}>
      <AppRoutes />

      {notification?.title && <Notification data={notification} onClose={() => setNotification(null)} />}
    </NavigationContainer>
  );
}