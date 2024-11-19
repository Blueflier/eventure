import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useEventPromotion } from '../../hooks/useEventPromotion';
import { PromotionPackageCard } from '../../components/promotions/PromotionPackageCard';
import { ActivePromotions } from '../../components/promotions/ActivePromotions';
import { PromotionPackage } from '../../types/EventPromotion';
import { Button } from '../../components/common/Button';

export default function PromoteEventScreen() {
  const route = useRoute();
  const eventId = route.params?.eventId;
  const [packages, setPackages] = useState<PromotionPackage[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<PromotionPackage | null>(null);
  const [activePromotions, setActivePromotions] = useState([]);
  const {
    loading,
    getPromotionPackages,
    createPromotion,
    getActivePromotions,
    cancelPromotion,
  } = useEventPromotion();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [packagesData, promotionsData] = await Promise.all([
      getPromotionPackages(),
      getActivePromotions(eventId),
    ]);
    setPackages(packagesData);
    setActivePromotions(promotionsData);
  };

  const handlePromote = async () => {
    if (!selectedPackage) return;

    const promotion = await createPromotion({
      event_id: eventId,
      promotion_type: selectedPackage.type,
      duration: selectedPackage.duration,
    });

    if (promotion) {
      Alert.alert('Success', 'Event promotion created successfully');
      setSelectedPackage(null);
      fetchData();
    } else {
      Alert.alert('Error', 'Failed to create promotion');
    }
  };

  const handleCancelPromotion = async (promotionId: string) => {
    Alert.alert(
      'Cancel Promotion',
      'Are you sure you want to cancel this promotion?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: async () => {
            const success = await cancelPromotion(promotionId);
            if (success) {
              fetchData();
            } else {
              Alert.alert('Error', 'Failed to cancel promotion');
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <ActivePromotions
          promotions={activePromotions}
          onCancel={handleCancelPromotion}
          loading={loading}
        />
      </View>

      <View style={styles.section}>
        {packages.map((pkg) => (
          <PromotionPackageCard
            key={pkg.type}
            package={pkg}
            selected={selectedPackage?.type === pkg.type}
            onSelect={() => setSelectedPackage(pkg)}
          />
        ))}
      </View>

      {selectedPackage && (
        <View style={styles.footer}>
          <Button
            title="Promote Event"
            onPress={handlePromote}
            loading={loading}
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    marginBottom: 20,
  },
  footer: {
    padding: 16,
  },
});