import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Funnel, ArrowUpDown, Bell, AlertTriangle } from 'lucide-react-native';
import { colors } from '@/constants/colors';

interface AlertItem {
  id: string;
  location: string;
  dateTime: string;
  area: string;
  confidence: number;
  status: 'new' | 'reviewing' | 'resolved';
}

const alerts: AlertItem[] = [
  { id: '1', location: 'Front Entrance', dateTime: '10/05/2025, 14:32:10', area: 'Main Building', confidence: 89, status: 'new' },
  { id: '2', location: 'Warehouse', dateTime: '10/05/2025, 12:15:45', area: 'Storage Area', confidence: 76, status: 'reviewing' },
  { id: '3', location: 'Parking Lot', dateTime: '09/05/2025, 18:22:33', area: 'North Side', confidence: 92, status: 'resolved' },
  { id: '4', location: 'Office Area', dateTime: '09/05/2025, 10:05:12', area: 'Admin Building', confidence: 45, status: 'resolved' },
];

export default function AlertScreen() {
  const renderAlertItem = ({ item }: { item: AlertItem }) => {
    const statusColor =
      item.status === 'new'
        ? colors.alert
        : item.status === 'reviewing'
        ? colors.warning
        : colors.success;
    const statusLabel =
      item.status === 'new'
        ? 'new'
        : item.status === 'reviewing'
        ? 'reviewing'
        : 'resolved';

    return (
      <TouchableOpacity style={styles.alertCard}>
        <View style={styles.alertHeader}>
          <Text style={styles.alertTitle}>{item.location}</Text>
          <View style={[styles.statusBadge, { backgroundColor: statusColor + '20' }]}> 
            <Text style={{ color: statusColor, fontWeight: '600', fontSize: 12 }}>{statusLabel}</Text>
          </View>
        </View>
        <View style={styles.alertDetails}>
          <AlertTriangle size={16} color={statusColor} />
          <Text style={styles.alertInfo}> {item.dateTime}  •  {item.area}</Text>
        </View>
        <Text style={[styles.confidenceText, { color: statusColor }]}>% {item.confidence}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Alerts & History</Text>
        <TouchableOpacity>
          <Bell size={22} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Summary Cards */}
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>5</Text>
            <Text style={styles.summaryLabel}>Total</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>1</Text>
            <Text style={styles.summaryLabel}>New</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>3</Text>
            <Text style={styles.summaryLabel}>High Confidence</Text>
          </View>
        </View>

        {/* Filter & Sort icons */}
        <View style={styles.filterRow}>
          <Text style={styles.sectionTitle}>Recent Alerts</Text>
          <View style={{ flexDirection: 'row' }}>
            <Funnel size={20} color={colors.textPrimary} style={{ marginRight: 16 }} />
            <ArrowUpDown size={20} color={colors.textPrimary} />
          </View>
        </View>

        {/* Alert List */}
        <FlatList
          data={alerts}
          keyExtractor={(item) => item.id}
          renderItem={renderAlertItem}
          scrollEnabled={false}
        />
      </ScrollView>

      {/* Panic Button */}
      <TouchableOpacity style={styles.panicButton}>
        <AlertTriangle size={18} color="#fff" />
        <Text style={styles.panicText}> Panic Button </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 32,
    paddingBottom: 12,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    color: '#fff',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: colors.cardBackground,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  summaryNumber: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#fff',
  },
  summaryLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 17,
    color: '#fff',
  },
  alertCard: {
    backgroundColor: colors.cardBackground,
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alertTitle: {
    fontSize: 15,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  alertDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  alertInfo: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  confidenceText: {
    fontSize: 12,
    marginTop: 4,
  },
  panicButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.alert,
    paddingVertical: 14,
    borderRadius: 50,
  },
  panicText: {
    color: '#fff',
    fontFamily: 'Inter-Bold',
    marginLeft: 8,
  },
});
