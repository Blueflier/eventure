import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SupportTicketForm } from '../../components/support/SupportTicketForm';
import { SupportTicketList } from '../../components/support/SupportTicketList';
import { FAQSection } from '../../components/support/FAQSection';

const Tab = createMaterialTopTabNavigator();

export default function SupportScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="NewTicket"
        component={SupportTicketForm}
        options={{ title: 'New Ticket' }}
      />
      <Tab.Screen
        name="MyTickets"
        component={SupportTicketList}
        options={{ title: 'My Tickets' }}
      />
      <Tab.Screen
        name="FAQ"
        component={FAQSection}
        options={{ title: 'FAQ' }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});