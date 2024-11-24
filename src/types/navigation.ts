export type RootStackParamList = {
  Auth: undefined;
  MainTabs: undefined;
  NotificationsScreen: undefined;
  EventQRScannerScreen: undefined;
  EventDetailsScreen: { eventId: string };
};

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

export type TabParamList = {
  Home: undefined;
  Search: undefined;
  MyEvents: undefined;
};

export type DrawerParamList = {
  HomeContent: undefined;
  Profile: undefined;
  Wallet: undefined;
  Settings: undefined;
  HelpSupport: undefined;
};