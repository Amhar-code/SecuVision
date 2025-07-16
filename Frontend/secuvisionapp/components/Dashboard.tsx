import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  Bell,
  Video,
  VideoOff,
  Shield,
  Eye,
  MapPin
} from 'lucide-react-native';
import { colors } from '@/constants/colors';
import ActivityGraph from '@/components/ActivityGraph';

const { width } = Dimensions.get('window');

const FRONT_CAMERA = {
  name: 'Front Entrance',
  location: 'Main Building',
  streamUrl: 'https://images.pexels.com/photos/1117493/pexels-photo-1117493.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  isActive: true,
};

export default function DashboardScreen() {
  const [muted, setMuted] = useState(true);
  const [isConnected, setIsConnected] = useState(true);
  const activeCameras = 4;
  const totalCameras = 5;
  const activeAlerts = 0;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.brand}>SecuVision</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIconBtn}>
            <Bell size={22} color={colors.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconBtn}>
            <Image source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} style={styles.avatar} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Live Camera */}
        <View style={styles.mainCameraContainer}>
          <View style={styles.liveBadge}><Text style={styles.liveBadgeText}>● LIVE</Text></View>
          <Image source={{ uri: FRONT_CAMERA.streamUrl }} style={styles.mainCameraFeed} />
          <View style={styles.cameraOverlay}>
            <View>
              <Text style={styles.cameraName}>{FRONT_CAMERA.name}</Text>
              <View style={styles.locationRow}>
                <MapPin size={14} color="#fff" />
                <Text style={styles.locationText}>{FRONT_CAMERA.location}</Text>
              </View>
            </View>
            <View style={styles.cameraControls}>
              <TouchableOpacity style={styles.controlBtn} onPress={() => setMuted(!muted)}>
                {muted ? (
                  <VideoOff size={20} color="#fff" />
                ) : (
                  <Video size={20} color="#fff" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* System Status */}
        <Text style={styles.sectionTitle}>System Status</Text>
        <View style={styles.statusRow}>
          <View style={[styles.statusCard, styles.statusCardActive]}>
            <Eye size={22} color={colors.primary} />
            <Text style={styles.statusValue}>{activeCameras}/{totalCameras}</Text>
            <Text style={styles.statusLabel}>Active Cameras</Text>
          </View>
          <View style={styles.statusCard}>
            <Bell size={22} color={activeAlerts > 0 ? colors.alert : colors.textSecondary} />
            <Text style={styles.statusValue}>{activeAlerts}</Text>
            <Text style={styles.statusLabel}>Active Alerts</Text>
          </View>
          <View style={styles.statusCard}>
            <Shield size={22} color={isConnected ? colors.success : colors.warning} />
            <Text style={styles.statusValue}>{isConnected ? 'Online' : 'Offline'}</Text>
            <Text style={styles.statusLabel}>System Status</Text>
          </View>
        </View>
        {/* Activity Chart */}
        <Text style={styles.sectionTitle}>Activity</Text>
        <View style={styles.activityCard}>
          <Text style={styles.activityTitle}>Weekly Alert Activity</Text>
          <ActivityGraph />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 12,
  },
  brand: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#fff',
    letterSpacing: 0.5,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconBtn: {
    marginLeft: 16,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  mainCameraContainer: {
    width: '92%',
    alignSelf: 'center',
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 18,
    marginTop: 4,
    backgroundColor: colors.cardBackground,
  },
  mainCameraFeed: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  liveBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: colors.cardBackground,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 2,
    zIndex: 2,
  },
  liveBadgeText: {
    color: colors.alert,
    fontWeight: 'bold',
    fontSize: 13,
  },
  cameraOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
  },
  cameraName: {
    color: '#fff',
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 4,
    opacity: 0.8,
  },
  cameraControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sectionTitle: {
    color: '#fff',
    fontFamily: 'Inter-SemiBold',
    fontSize: 17,
    marginTop: 18,
    marginBottom: 8,
    marginLeft: 18,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 12,
    marginBottom: 18,
  },
  statusCard: {
    flex: 1,
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 18,
    marginHorizontal: 4,
  },
  statusCardActive: {
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  statusValue: {
    color: '#fff',
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    marginTop: 8,
    marginBottom: 2,
  },
  statusLabel: {
    color: colors.textSecondary,
    fontFamily: 'Inter-Medium',
    fontSize: 13,
  },
  activityCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 14,
    marginHorizontal: 14,
    padding: 16,
    marginBottom: 18,
  },
  activityTitle: {
    color: '#fff',
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
    marginBottom: 10,
  },
});