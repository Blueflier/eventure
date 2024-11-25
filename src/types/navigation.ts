export type RootStackParamList = {
  MainTabs: undefined;
  NotificationsScreen: undefined;
  EventQRScannerScreen: undefined;
  EventDetailsScreen: {
    event_id: string;
  };
  // Add other screens here...
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