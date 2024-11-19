import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const faqs = [
  {
    question: 'How do I create an event?',
    answer: 'To create an event, go to the "My Events" tab and tap the "+" button. Follow the step-by-step wizard to set up your event details, location, and tickets.',
  },
  {
    question: 'How do I purchase tickets?',
    answer: 'Find the event you want to attend, tap on it to view details, then click the "Purchase Tickets" button. Follow the checkout process to complete your purchase.',
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'We accept major credit cards, debit cards, and in-app currency. All payments are processed securely through Stripe.',
  },
  {
    question: 'How do refunds work?',
    answer: 'Refund policies are set by event organizers. Generally, refunds are available up to 24 hours before the event starts. Check the event details for specific refund policies.',
  },
  {
    question: 'How do I contact an event organizer?',
    answer: 'On the event details page, scroll down to find the organizer profile section. You can send them a message directly through the app.',
  },
];

export function FAQSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <View style={styles.container}>
      {faqs.map((faq, index) => (
        <TouchableOpacity
          key={index}
          style={styles.faqItem}
          onPress={() => setExpandedIndex(expandedIndex === index ? null : index)}
        >
          <View style={styles.questionRow}>
            <Text style={styles.question}>{faq.question}</Text>
            <Ionicons
              name={expandedIndex === index ? 'chevron-up' : 'chevron-down'}
              size={20}
              color="#666"
            />
          </View>
          {expandedIndex === index && (
            <Text style={styles.answer}>{faq.answer}</Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  faqItem: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  questionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },
  answer: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});