import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image,
  TextInput,
  Dimensions
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Search, Calendar, Image as ImageIcon, Video, SlidersHorizontal, X } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import Header from '@/components/Header';
import { mockMedia } from '@/data/mockData';
import MediaViewer from '@/components/MediaViewer';
import DateFilterPicker from '@/components/DateFilterPicker';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 3;
const ITEM_WIDTH = (width - 48) / COLUMN_COUNT;

export default function GalleryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [mediaType, setMediaType] = useState<'all' | 'image' | 'video'>('all');
  const [selectedMedia, setSelectedMedia] = useState<any | null>(null);
  
  const filteredMedia = mockMedia.filter(item => {
    // Filter by search query
    if (searchQuery && !item.location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by media type
    if (mediaType === 'image' && item.type !== 'image') {
      return false;
    }
    if (mediaType === 'video' && item.type !== 'video') {
      return false;
    }
    
    return true;
  });
  
  const groupedByDate = filteredMedia.reduce((groups, item) => {
    const date = new Date(item.timestamp).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item);
    return groups;
  }, {});
  
  const renderMediaItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.mediaItem}
      onPress={() => setSelectedMedia(item)}
    >
      <Image source={{ uri: item.thumbnailUrl }} style={styles.mediaThumbnail} />
      {item.type === 'video' && (
        <View style={styles.videoIndicator}>
          <Video size={16} color="#FFFFFF" />
        </View>
      )}
    </TouchableOpacity>
  );
  
  const renderDateSection = ({ item }) => (
    <View style={styles.dateSection}>
      <Text style={styles.dateSectionTitle}>{item.date}</Text>
      <FlatList
        data={item.media}
        renderItem={renderMediaItem}
        keyExtractor={(item) => item.id}
        numColumns={COLUMN_COUNT}
        scrollEnabled={false}
        contentContainerStyle={styles.mediaSectionContent}
      />
    </View>
  );
  
  const sections = Object.keys(groupedByDate).map(date => ({
    date,
    media: groupedByDate[date]
  }));
  
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Header title="Media Gallery" />
      
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color={colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by location..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity 
              style={styles.clearButton}
              onPress={() => setSearchQuery('')}
            >
              <X size={16} color={colors.textSecondary} />
            </TouchableOpacity>
          ) : null}
        </View>
        
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Calendar size={20} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.typeFilterContainer}>
        <TouchableOpacity 
          style={[
            styles.typeFilterButton, 
            mediaType === 'all' && styles.typeFilterButtonActive
          ]}
          onPress={() => setMediaType('all')}
        >
          <Text style={[
            styles.typeFilterText,
            mediaType === 'all' && styles.typeFilterTextActive
          ]}>All</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.typeFilterButton, 
            mediaType === 'image' && styles.typeFilterButtonActive
          ]}
          onPress={() => setMediaType('image')}
        >
          <ImageIcon size={16} color={mediaType === 'image' ? colors.primary : colors.textSecondary} />
          <Text style={[
            styles.typeFilterText,
            mediaType === 'image' && styles.typeFilterTextActive
          ]}>Images</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.typeFilterButton, 
            mediaType === 'video' && styles.typeFilterButtonActive
          ]}
          onPress={() => setMediaType('video')}
        >
          <Video size={16} color={mediaType === 'video' ? colors.primary : colors.textSecondary} />
          <Text style={[
            styles.typeFilterText,
            mediaType === 'video' && styles.typeFilterTextActive
          ]}>Videos</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={sections}
        renderItem={renderDateSection}
        keyExtractor={(item) => item.date}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <ImageIcon size={64} color={colors.textSecondary} style={styles.emptyIcon} />
            <Text style={styles.emptyTitle}>No Media Found</Text>
            <Text style={styles.emptyDescription}>
              There are no media items matching your current filters.
            </Text>
          </View>
        }
      />
      
      {selectedMedia && (
        <MediaViewer 
          media={selectedMedia}
          onClose={() => setSelectedMedia(null)}
        />
      )}
      
      <DateFilterPicker 
        visible={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        onApplyFilter={(startDate, endDate) => {
          console.log('Date filter:', startDate, endDate);
          setShowDatePicker(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.textPrimary,
  },
  clearButton: {
    padding: 8,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  typeFilterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  typeFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: colors.cardBackground,
  },
  typeFilterButtonActive: {
    backgroundColor: colors.primaryLight,
  },
  typeFilterText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  typeFilterTextActive: {
    color: colors.primary,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  dateSection: {
    marginBottom: 24,
  },
  dateSectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  mediaSectionContent: {
    marginLeft: -4,
    marginRight: -4,
  },
  mediaItem: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    margin: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  mediaThumbnail: {
    width: '100%',
    height: '100%',
  },
  videoIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 4,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    marginTop: 60,
  },
  emptyIcon: {
    marginBottom: 16,
    opacity: 0.5,
  },
  emptyTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  emptyDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});