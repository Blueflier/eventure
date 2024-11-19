import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { AnalyticsTrend } from '../../../types/EventAnalytics';
import { format } from 'date-fns';

interface Props {
  trends: AnalyticsTrend[];
}

export function AnalyticsTrends({ trends }: Props) {
  const chartData = {
    labels: trends.map(t => format(new Date(t.date), 'MMM d')),
    datasets: [
      {
        data: trends.map(t => t.views),
        color: () => '#2e6ddf',
        strokeWidth: 2,
      },
      {
        data: trends.map(t => t.rsvps),
        color: () => '#4caf50',
        strokeWidth: 2,
      },
      {
        data: trends.map(t => t.attendance),
        color: () => '#ff9800',
        strokeWidth: 2,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trends</Text>

      <LineChart
        data={chartData}
        width={Dimensions.get('window').width - 32}
        height={220}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={styles.chart}
      />

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#2e6ddf' }]} />
          <Text style={styles.legendText}>Views</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#4caf50' }]} />
          <Text style={styles.legendText}>RSVPs</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#ff9800' }]} />
          <Text style={styles.legendText}>Attendees</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    gap: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 4,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
});