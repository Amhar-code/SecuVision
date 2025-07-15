import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ChevronLeft, BellRing, Shield } from 'lucide-react-native';
import { router, usePathname } from 'expo-router';
import { colors } from '@/constants/Colors';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  showProfile?: boolean;
  showBranding?: boolean;
}

export default function Header({ title, showBack, showProfile = false, showBranding = false }: HeaderProps) {
  const pathname = usePathname();
  
  const renderBackButton = () => (
    <TouchableOpacity 
      style={styles.backButton}
      onPress={() => router.back()}
    >
      <ChevronLeft size={24} color={colors.textPrimary} />
    </TouchableOpacity>
  );
  
  const renderNotificationButton = () => (
    <TouchableOpacity style={styles.notificationButton}>
      <BellRing size={24} color={colors.textPrimary} />
      <View style={styles.notificationBadge} />
    </TouchableOpacity>
  );
  
  const renderProfileButton = () => (
    <TouchableOpacity style={styles.profileButton}>
      <Image 
        source={{ uri: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }} 
        style={styles.profileImage}
      />
    </TouchableOpacity>
  );

  const renderBranding = () => (
    <View style={styles.brandingContainer}>
      <Shield size={28} color={colors.primary} />
      <Text style={styles.brandingText}>SecuVision</Text>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {showBack && renderBackButton()}
        {showBranding ? renderBranding() : <Text style={styles.title}>{title}</Text>}
        <View style={styles.rightContainer}>
          {renderNotificationButton()}
          {showProfile && renderProfileButton()}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingTop: 40,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: colors.textPrimary,
    flex: 1,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.alert,
    borderWidth: 2,
    borderColor: colors.cardBackground,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    marginLeft: 8,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  brandingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  brandingText: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: colors.textPrimary,
    marginLeft: 8,
  },
});