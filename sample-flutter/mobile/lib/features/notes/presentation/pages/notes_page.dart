import 'package:flutter/material.dart';

import '../../../../core/theme/app_colors.dart';

class NotesPage extends StatefulWidget {
  const NotesPage({super.key});

  @override
  State<NotesPage> createState() => _NotesPageState();
}

class _NotesPageState extends State<NotesPage> {
  bool _isGridView = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Notes'),
        actions: [
          IconButton(
            icon: Icon(_isGridView ? Icons.view_list : Icons.grid_view),
            onPressed: () {
              setState(() {
                _isGridView = !_isGridView;
              });
            },
          ),
          IconButton(
            icon: const Icon(Icons.search),
            onPressed: () {},
          ),
        ],
      ),
      body: Column(
        children: [
          // Categories
          SizedBox(
            height: 50,
            child: ListView(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 16),
              children: [
                _buildCategoryChip('All', true),
                _buildCategoryChip('Personal', false),
                _buildCategoryChip('Work', false),
                _buildCategoryChip('Ideas', false),
                _buildCategoryChip('Journal', false),
              ],
            ),
          ),
          const SizedBox(height: 8),

          // Notes Grid/List
          Expanded(
            child: _isGridView ? _buildGridView() : _buildListView(),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => _showAddNoteDialog(context),
        child: const Icon(Icons.add),
      ),
    );
  }

  Widget _buildCategoryChip(String label, bool isSelected) {
    return Padding(
      padding: const EdgeInsets.only(right: 8),
      child: FilterChip(
        label: Text(label),
        selected: isSelected,
        onSelected: (_) {},
      ),
    );
  }

  Widget _buildGridView() {
    final notes = _getMockNotes();

    return GridView.builder(
      padding: const EdgeInsets.all(16),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        crossAxisSpacing: 12,
        mainAxisSpacing: 12,
        childAspectRatio: 0.85,
      ),
      itemCount: notes.length,
      itemBuilder: (context, index) {
        final note = notes[index];
        return _NoteCard(
          title: note['title']!,
          content: note['content']!,
          date: note['date']!,
          color: _getNoteColor(index),
          onTap: () => _showNoteDetail(context, note),
        );
      },
    );
  }

  Widget _buildListView() {
    final notes = _getMockNotes();

    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: notes.length,
      itemBuilder: (context, index) {
        final note = notes[index];
        return _NoteListItem(
          title: note['title']!,
          content: note['content']!,
          date: note['date']!,
          color: _getNoteColor(index),
          onTap: () => _showNoteDetail(context, note),
        );
      },
    );
  }

  Color _getNoteColor(int index) {
    final colors = [
      Colors.amber.shade100,
      Colors.blue.shade100,
      Colors.green.shade100,
      Colors.pink.shade100,
      Colors.purple.shade100,
      Colors.orange.shade100,
    ];
    return colors[index % colors.length];
  }

  List<Map<String, String>> _getMockNotes() {
    return [
      {
        'title': 'Meeting Notes',
        'content': 'Discussed project timeline and deliverables. Key points:\n- Sprint planning next week\n- API documentation due Friday\n- Code review process update',
        'date': 'Jan 15',
        'category': 'Work',
      },
      {
        'title': 'Shopping List',
        'content': '- Milk\n- Eggs\n- Bread\n- Fresh vegetables\n- Chicken\n- Rice',
        'date': 'Jan 14',
        'category': 'Personal',
      },
      {
        'title': 'App Ideas',
        'content': 'Features to consider:\n1. Dark mode support\n2. Offline sync\n3. Push notifications\n4. Widget support',
        'date': 'Jan 13',
        'category': 'Ideas',
      },
      {
        'title': 'Daily Journal',
        'content': 'Today was productive. Completed the main feature implementation and fixed several bugs. Need to focus on testing tomorrow.',
        'date': 'Jan 12',
        'category': 'Journal',
      },
      {
        'title': 'Book Recommendations',
        'content': '- Clean Code by Robert Martin\n- The Pragmatic Programmer\n- Design Patterns\n- Refactoring',
        'date': 'Jan 10',
        'category': 'Personal',
      },
      {
        'title': 'Project Architecture',
        'content': 'Clean Architecture layers:\n- Presentation (UI)\n- Domain (Business Logic)\n- Data (Repository)',
        'date': 'Jan 8',
        'category': 'Work',
      },
    ];
  }

  void _showAddNoteDialog(BuildContext context) {
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
              'New Note',
              style: Theme.of(context).textTheme.titleLarge,
            ),
            const SizedBox(height: 16),
            TextField(
              decoration: const InputDecoration(
                labelText: 'Title',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 12),
            TextField(
              decoration: const InputDecoration(
                labelText: 'Content',
                border: OutlineInputBorder(),
              ),
              maxLines: 5,
            ),
            const SizedBox(height: 12),
            DropdownButtonFormField<String>(
              decoration: const InputDecoration(
                labelText: 'Category',
                border: OutlineInputBorder(),
              ),
              items: ['Personal', 'Work', 'Ideas', 'Journal']
                  .map((e) => DropdownMenuItem(value: e, child: Text(e)))
                  .toList(),
              onChanged: (_) {},
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('Save Note'),
            ),
            const SizedBox(height: 16),
          ],
        ),
      ),
    );
  }

  void _showNoteDetail(BuildContext context, Map<String, String> note) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      builder: (context) => DraggableScrollableSheet(
        initialChildSize: 0.7,
        minChildSize: 0.5,
        maxChildSize: 0.95,
        expand: false,
        builder: (context, scrollController) => SingleChildScrollView(
          controller: scrollController,
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Center(
                child: Container(
                  width: 40,
                  height: 4,
                  decoration: BoxDecoration(
                    color: Colors.grey[300],
                    borderRadius: BorderRadius.circular(2),
                  ),
                ),
              ),
              const SizedBox(height: 16),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    note['title']!,
                    style: Theme.of(context).textTheme.titleLarge?.copyWith(
                          fontWeight: FontWeight.bold,
                        ),
                  ),
                  Row(
                    children: [
                      IconButton(
                        icon: const Icon(Icons.edit_outlined),
                        onPressed: () {},
                      ),
                      IconButton(
                        icon: const Icon(Icons.delete_outline),
                        onPressed: () {},
                      ),
                    ],
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Row(
                children: [
                  Icon(Icons.calendar_today, size: 14, color: AppColors.textSecondary),
                  const SizedBox(width: 4),
                  Text(
                    note['date']!,
                    style: TextStyle(color: AppColors.textSecondary),
                  ),
                  const SizedBox(width: 16),
                  Icon(Icons.folder_outlined, size: 14, color: AppColors.textSecondary),
                  const SizedBox(width: 4),
                  Text(
                    note['category']!,
                    style: TextStyle(color: AppColors.textSecondary),
                  ),
                ],
              ),
              const Divider(height: 32),
              Text(
                note['content']!,
                style: const TextStyle(height: 1.6, fontSize: 16),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _NoteCard extends StatelessWidget {
  final String title;
  final String content;
  final String date;
  final Color color;
  final VoidCallback onTap;

  const _NoteCard({
    required this.title,
    required this.content,
    required this.date,
    required this.color,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      color: color,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.all(12),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                ),
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              ),
              const SizedBox(height: 8),
              Expanded(
                child: Text(
                  content,
                  style: TextStyle(
                    color: Colors.black87,
                    fontSize: 13,
                  ),
                  maxLines: 5,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                date,
                style: TextStyle(
                  color: Colors.black54,
                  fontSize: 12,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _NoteListItem extends StatelessWidget {
  final String title;
  final String content;
  final String date;
  final Color color;
  final VoidCallback onTap;

  const _NoteListItem({
    required this.title,
    required this.content,
    required this.date,
    required this.color,
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
                  color: color,
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
                      style: const TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 16,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      content,
                      style: TextStyle(
                        color: AppColors.textSecondary,
                        fontSize: 13,
                      ),
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ],
                ),
              ),
              Text(
                date,
                style: TextStyle(
                  color: AppColors.textSecondary,
                  fontSize: 12,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
