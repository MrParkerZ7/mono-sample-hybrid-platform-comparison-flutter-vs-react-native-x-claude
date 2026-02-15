import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../../../app/routes/app_routes.dart';
import '../../../../core/theme/app_colors.dart';

class TasksPage extends StatefulWidget {
  const TasksPage({super.key});

  @override
  State<TasksPage> createState() => _TasksPageState();
}

class _TasksPageState extends State<TasksPage> with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Tasks'),
        actions: [
          IconButton(
            icon: const Icon(Icons.filter_list),
            onPressed: () => _showFilterBottomSheet(context),
          ),
          IconButton(
            icon: const Icon(Icons.search),
            onPressed: () {},
          ),
        ],
        bottom: TabBar(
          controller: _tabController,
          tabs: const [
            Tab(text: 'All'),
            Tab(text: 'In Progress'),
            Tab(text: 'Completed'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _TaskList(filter: 'all'),
          _TaskList(filter: 'in_progress'),
          _TaskList(filter: 'completed'),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => _showAddTaskDialog(context),
        child: const Icon(Icons.add),
      ),
    );
  }

  void _showFilterBottomSheet(BuildContext context) {
    showModalBottomSheet(
      context: context,
      builder: (context) => Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Filter by Priority',
              style: Theme.of(context).textTheme.titleMedium,
            ),
            const SizedBox(height: 12),
            Wrap(
              spacing: 8,
              children: [
                FilterChip(label: const Text('High'), onSelected: (_) {}),
                FilterChip(label: const Text('Medium'), onSelected: (_) {}),
                FilterChip(label: const Text('Low'), onSelected: (_) {}),
              ],
            ),
            const SizedBox(height: 16),
            Text(
              'Filter by Category',
              style: Theme.of(context).textTheme.titleMedium,
            ),
            const SizedBox(height: 12),
            Wrap(
              spacing: 8,
              children: [
                FilterChip(label: const Text('Work'), onSelected: (_) {}),
                FilterChip(label: const Text('Personal'), onSelected: (_) {}),
                FilterChip(label: const Text('Shopping'), onSelected: (_) {}),
              ],
            ),
          ],
        ),
      ),
    );
  }

  void _showAddTaskDialog(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      builder: (context) => Padding(
        padding: EdgeInsets.only(
          bottom: MediaQuery.of(context).viewInsets.bottom,
          left: 16,
          right: 16,
          top: 16,
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(
              'Add New Task',
              style: Theme.of(context).textTheme.titleLarge,
            ),
            const SizedBox(height: 16),
            TextField(
              decoration: const InputDecoration(
                labelText: 'Task Title',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 12),
            TextField(
              decoration: const InputDecoration(
                labelText: 'Description',
                border: OutlineInputBorder(),
              ),
              maxLines: 3,
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(
                  child: DropdownButtonFormField<String>(
                    decoration: const InputDecoration(
                      labelText: 'Priority',
                      border: OutlineInputBorder(),
                    ),
                    items: ['High', 'Medium', 'Low']
                        .map((e) => DropdownMenuItem(value: e, child: Text(e)))
                        .toList(),
                    onChanged: (_) {},
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: DropdownButtonFormField<String>(
                    decoration: const InputDecoration(
                      labelText: 'Category',
                      border: OutlineInputBorder(),
                    ),
                    items: ['Work', 'Personal', 'Shopping']
                        .map((e) => DropdownMenuItem(value: e, child: Text(e)))
                        .toList(),
                    onChanged: (_) {},
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('Add Task'),
            ),
            const SizedBox(height: 16),
          ],
        ),
      ),
    );
  }
}

class _TaskList extends StatelessWidget {
  final String filter;

  const _TaskList({required this.filter});

  @override
  Widget build(BuildContext context) {
    // Mock data - would be replaced with actual data from BLoC
    final tasks = _getMockTasks(filter);

    if (tasks.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.task_alt,
              size: 64,
              color: AppColors.textSecondary,
            ),
            const SizedBox(height: 16),
            Text(
              'No tasks found',
              style: TextStyle(color: AppColors.textSecondary),
            ),
          ],
        ),
      );
    }

    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: tasks.length,
      itemBuilder: (context, index) {
        final task = tasks[index];
        return _TaskItem(
          title: task['title']!,
          description: task['description']!,
          priority: task['priority']!,
          category: task['category']!,
          dueDate: task['dueDate']!,
          isCompleted: task['isCompleted'] == 'true',
          onTap: () => context.go('${AppRoutes.tasks}/task-$index'),
        );
      },
    );
  }

  List<Map<String, String>> _getMockTasks(String filter) {
    final allTasks = [
      {
        'title': 'Complete project documentation',
        'description': 'Write comprehensive docs for the API',
        'priority': 'High',
        'category': 'Work',
        'dueDate': 'Today',
        'isCompleted': 'false',
      },
      {
        'title': 'Review pull requests',
        'description': 'Review and merge pending PRs',
        'priority': 'Medium',
        'category': 'Work',
        'dueDate': 'Tomorrow',
        'isCompleted': 'false',
      },
      {
        'title': 'Buy groceries',
        'description': 'Milk, eggs, bread, vegetables',
        'priority': 'Low',
        'category': 'Personal',
        'dueDate': 'Today',
        'isCompleted': 'true',
      },
      {
        'title': 'Team meeting preparation',
        'description': 'Prepare slides for sprint review',
        'priority': 'High',
        'category': 'Work',
        'dueDate': 'Wed',
        'isCompleted': 'false',
      },
    ];

    switch (filter) {
      case 'in_progress':
        return allTasks.where((t) => t['isCompleted'] == 'false').toList();
      case 'completed':
        return allTasks.where((t) => t['isCompleted'] == 'true').toList();
      default:
        return allTasks;
    }
  }
}

class _TaskItem extends StatelessWidget {
  final String title;
  final String description;
  final String priority;
  final String category;
  final String dueDate;
  final bool isCompleted;
  final VoidCallback onTap;

  const _TaskItem({
    required this.title,
    required this.description,
    required this.priority,
    required this.category,
    required this.dueDate,
    required this.isCompleted,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Row(
            children: [
              Container(
                width: 4,
                height: 60,
                decoration: BoxDecoration(
                  color: _getPriorityColor(),
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: TextStyle(
                        fontWeight: FontWeight.w600,
                        decoration: isCompleted ? TextDecoration.lineThrough : null,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      description,
                      style: TextStyle(
                        color: AppColors.textSecondary,
                        fontSize: 13,
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                    const SizedBox(height: 8),
                    Row(
                      children: [
                        _buildChip(category, AppColors.primary),
                        const SizedBox(width: 8),
                        _buildChip(priority, _getPriorityColor()),
                        const Spacer(),
                        Text(
                          dueDate,
                          style: TextStyle(
                            color: AppColors.textSecondary,
                            fontSize: 12,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              Checkbox(
                value: isCompleted,
                onChanged: (_) {},
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildChip(String label, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Text(
        label,
        style: TextStyle(
          color: color,
          fontSize: 11,
          fontWeight: FontWeight.w500,
        ),
      ),
    );
  }

  Color _getPriorityColor() {
    switch (priority) {
      case 'High':
        return AppColors.priorityHigh;
      case 'Medium':
        return AppColors.priorityMedium;
      default:
        return AppColors.priorityLow;
    }
  }
}
