import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../src/components/ui';
import { colors, spacing, fontSize } from '../../src/theme';

interface Event {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  attendees: number;
  category: string;
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Flutter Meetup',
    location: 'Tech Hub Conference Center',
    date: 'Jan 20',
    time: '6:00 PM',
    attendees: 45,
    category: 'Tech',
  },
  {
    id: '2',
    title: 'Jazz Night',
    location: 'Downtown Music Hall',
    date: 'Jan 22',
    time: '8:00 PM',
    attendees: 120,
    category: 'Music',
  },
  {
    id: '3',
    title: 'Morning Run Club',
    location: 'Central Park',
    date: 'Jan 23',
    time: '7:00 AM',
    attendees: 28,
    category: 'Sports',
  },
  {
    id: '4',
    title: 'Startup Networking',
    location: 'Innovation Center',
    date: 'Jan 25',
    time: '5:30 PM',
    attendees: 85,
    category: 'Social',
  },
];

const { width } = Dimensions.get('window');

export default function EventsScreen() {
  const [isMapView, setIsMapView] = useState(true);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Tech':
        return colors.primary;
      case 'Music':
        return '#A855F7';
      case 'Sports':
        return colors.success;
      case 'Social':
        return colors.warning;
      default:
        return colors.primary;
    }
  };

  const renderEvent = ({ item }: { item: Event }) => (
    <Card style={styles.eventCard}>
      <View style={styles.eventContent}>
        <View style={styles.dateBox}>
          <Text style={styles.dateDay}>{item.date.split(' ')[1]}</Text>
          <Text style={styles.dateMonth}>{item.date.split(' ')[0]}</Text>
        </View>
        <View style={styles.eventInfo}>
          <View style={styles.eventHeader}>
            <Text style={styles.eventTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <View
              style={[
                styles.categoryBadge,
                { backgroundColor: `${getCategoryColor(item.category)}20` },
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  { color: getCategoryColor(item.category) },
                ]}
              >
                {item.category}
              </Text>
            </View>
          </View>
          <View style={styles.eventMeta}>
            <Ionicons name="location-outline" size={14} color={colors.textSecondary} />
            <Text style={styles.eventMetaText} numberOfLines={1}>
              {item.location}
            </Text>
          </View>
          <View style={styles.eventMeta}>
            <Ionicons name="time-outline" size={14} color={colors.textSecondary} />
            <Text style={styles.eventMetaText}>{item.time}</Text>
            <Ionicons
              name="people-outline"
              size={14}
              color={colors.textSecondary}
              style={{ marginLeft: spacing.md }}
            />
            <Text style={styles.eventMetaText}>{item.attendees}</Text>
          </View>
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      {isMapView && (
        <View style={styles.mapPlaceholder}>
          <Ionicons name="map" size={64} color={colors.textTertiary} />
          <Text style={styles.mapPlaceholderText}>Map View</Text>
          <Text style={styles.mapPlaceholderSubtext}>
            Google Maps integration required
          </Text>
        </View>
      )}

      <View style={[styles.eventsList, !isMapView && styles.eventsListFull]}>
        <View style={styles.eventsHeader}>
          <Text style={styles.eventsTitle}>
            {isMapView ? 'Nearby Events' : 'All Events'}
          </Text>
          <TouchableOpacity onPress={() => setIsMapView(!isMapView)}>
            <Ionicons
              name={isMapView ? 'list' : 'map'}
              size={24}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={mockEvents}
          renderItem={renderEvent}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>

      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={24} color="#FFFFFF" />
        <Text style={styles.fabText}>New Event</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  mapPlaceholder: {
    height: 250,
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  mapPlaceholderText: {
    fontSize: fontSize.lg,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
  mapPlaceholderSubtext: {
    fontSize: fontSize.sm,
    color: colors.textTertiary,
    marginTop: spacing.xs,
  },
  eventsList: {
    flex: 1,
    backgroundColor: colors.background,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginTop: -16,
    paddingHorizontal: spacing.md,
  },
  eventsListFull: {
    marginTop: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  eventsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  eventsTitle: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: colors.text,
  },
  listContent: {
    paddingBottom: 100,
  },
  eventCard: {
    marginBottom: spacing.sm,
  },
  eventContent: {
    flexDirection: 'row',
  },
  dateBox: {
    width: 60,
    height: 60,
    backgroundColor: `${colors.primary}15`,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  dateDay: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: colors.primary,
  },
  dateMonth: {
    fontSize: fontSize.xs,
    color: colors.primary,
  },
  eventInfo: {
    flex: 1,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  eventTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  categoryBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: spacing.xs,
  },
  categoryText: {
    fontSize: fontSize.xs,
    fontWeight: '500',
  },
  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  eventMetaText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginLeft: 4,
    flex: 1,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  fabText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: spacing.xs,
  },
});
