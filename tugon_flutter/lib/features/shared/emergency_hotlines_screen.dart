import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../services/mock_api_service.dart';

class EmergencyHotlinesScreen extends StatelessWidget {
  const EmergencyHotlinesScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final hotlines = MockApiService.getHotlines();

    return Scaffold(
      appBar: AppBar(
        title: const Text("Emergency Hotlines · Liliw"),
      ),
      body: ListView.separated(
        padding: const EdgeInsets.all(16),
        itemCount: hotlines.length,
        separatorBuilder: (_, __) => const SizedBox(height: 12),
        itemBuilder: (context, index) {
          final h = hotlines[index];
          return Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: TugonTheme.surface,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: TugonTheme.border),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.between,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(h.name, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                    Text(h.agency, style: const TextStyle(fontSize: 11, color: TugonTheme.textMuted)),
                    const SizedBox(height: 4),
                    Text(h.number, style: const TextStyle(color: TugonTheme.primary, fontWeight: FontWeight.bold, fontSize: 13, fontFamily: 'monospace')),
                  ],
                ),
                IconButton(
                  onPressed: () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text("Mock Call Dialed: ${h.number}")),
                    );
                  },
                  icon: const Icon(Icons.phone, color: TugonTheme.green),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}

