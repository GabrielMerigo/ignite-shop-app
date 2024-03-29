import { OneSignal } from "react-native-onesignal";


export function tagUserInfoCreate() {
  OneSignal.User.addTags({
    'user_name': 'Rennan',
    'user_email': 'rennan.douglas@rocketseat.team'
  });
}

export function tagCartUpdate(itemsCount: string) {
  OneSignal.User.addTag('cart_items_count', itemsCount)
}