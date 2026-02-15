import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../src/components/ui';
import { colors, spacing, fontSize } from '../../src/theme';

const quickActions = [
  { icon: 'checkmark-circle', label: 'Tasks', color: colors.primary, route: '/tasks' },
  { icon: 'document-text', label: 'Notes', color: colors.secondary, route: '/notes' },
  { icon: 'calendar', label: 'Events', color: colors.warning, route: '/(tabs)/events' },
];

const recentTasks = [
  { title: 'Complete project documentation', category: 'Work', priority: 'High', dueDate: 'Today' },
  { title: 'Review pull requests', category: 'Work', priority: 'Medium', dueDate: 'Tomorrow' },
];

const recentNotes = [
  { title: 'Meeting Notes', preview: 'Discussed project timeline and deliverables...', date: 'Jan 15' },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.welcomeText}>Welcome back!</Text>

      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.quickActionsRow}>
        {quickActions.map((action, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.quickActionCard, { backgroundColor: `${action.color}15` }]}
            onPress={() => router.push(action.route as any)}
          >
            <Ionicons name={action.icon as any} size={32} color={action.color} />
            <Text style={[styles.quickActionLabel, { color: action.color }]}>
              {action.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Tasks</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      {recentTasks.map((task, index) => (
        <Card key={index} style={styles.taskCard}>
          <View style={styles.taskContent}>
            <View
              style={[
                styles.priorityIndicator,
                {
                  backgroundColor:
                    task.priority === 'High' ? colors.priorityHigh : colors.priorityMedium,
                },
              ]}
            />
            <View style={styles.taskInfo}>
              <Text style={styles.taskTitle}>{task.title}</Text>
              <View style={styles.taskMeta}>
                <Text style={styles.taskMetaText}>{task.category}</Text>
                <Text style={styles.taskMetaText}> • {task.dueDate}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.checkbox}>
              <Ionicons name="square-outline" size={24} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </Card>
      ))}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Notes</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      {recentNotes.map((note, index) => (
        <Card key={index} style={styles.noteCard}>
          <View style={styles.noteHeader}>
            <Text style={styles.noteTitle}>{note.title}</Text>
            <Text style={styles.noteDate}>{note.date}</Text>
          </View>
          <Text style={styles.notePreview} numberOfLines={2}>
            {note.preview}
          </Text>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
  },
  welcomeText: {
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  seeAllText: {
    color: colors.primary,
    fontSize: fontSize.sm,
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderRadius: 12,
    marginHorizontal: spacing.xs,
  },
  quickActionLabel: {
    marginTop: spacing.xs,
    fontWeight: '600',
    fontSize: fontSize.sm,
  },
  taskCard: {
    marginBottom: spacing.sm,
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityIndicator: {
    width: 4,
    height: 50,
    borderRadius: 2,
    marginRight: spacing.sm,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  taskMeta: {
    flexDirection: 'row',
  },
  taskMetaText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  checkbox: {
    padding: spacing.xs,
  },
  noteCard: {
    marginBottom: spacing.sm,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  noteTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
  },
  noteDate: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  notePreview: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
