import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FAQSection } from '../../components/help/FAQSection';
import { SupportTicket } from '../../components/help/SupportTicket';
import { TutorialList } from '../../components/help/TutorialList';

export default function HelpSupportScreen() {
  const [activeSection, setActiveSection] = useState('faq');

  const sections = [
    { id: 'faq', title: 'FAQ', icon: 'help-circle-outline' },
    { id: 'contact', title: 'Contact Support', icon: 'mail-outline' },
    { id: 'tutorials', title: 'Tutorials', icon: 'play-circle-outline' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'faq':
        return <FAQSection />;
      case 'contact':
        return <SupportTicket />;
      case 'tutorials':
        return <TutorialList />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {sections.map((section) => (
          <TouchableOpacity
            key={section.id}
            style={[
              styles.tab,
              activeSection === section.id && styles.activeTab,
            ]}
            onPress={() => setActiveSection(section.id)}
          >
            <Ionicons
              name={section.icon as any}
              size={24}
              color={activeSection === section.id ? '#2e6ddf' : '#666'}
            />
            <Text
              style={[
                styles.tabText,
                activeSection === section.id && styles.activeTabText,
              ]}
            >
              {section.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content}>{renderContent()}</ScrollView>

      <TouchableOpacity
        style={styles.chatButton}
        onPress={() => Linking.openURL('YOUR_LIVE_CHAT_URL')}
      >
        <Ionicons name="chatbubbles-outline" size={24} color="white" />
        <Text style={styles.chatButtonText}>Live Chat</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingHorizontal: 16,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#2e6ddf',
  },
  tabText: {
    marginLeft: 8,
    color: '#666',
    fontSize: 14,
  },
  activeTabText: {
    color: '#2e6ddf',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  chatButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#2e6ddf',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  chatButtonText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: 'bold',
  },
});