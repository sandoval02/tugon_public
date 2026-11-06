import 'package:flutter/material.dart';
import '../../config/theme.dart';

class GoBagChecklistScreen extends StatefulWidget {
  const GoBagChecklistScreen({Key? key}) : super(key: key);

  @override
  State<GoBagChecklistScreen> createState() => _GoBagChecklistScreenState();
}

class _GoBagChecklistScreenState extends State<GoBagChecklistScreen> {
  final Map<String, bool> _items = {
    "Bottled Drinking Water (3-Day Supply)": true,
    "Ready-to-Eat Non-Perishable Canned Food": true,
    "First Aid Kit & Maintenance Medications": true,
    "Flashlight & Extra Batteries": false,
    "Whistle & Multi-Tool Pocket Knife": false,
    "Waterproof Pouch for IDs & Important Documents": true,
    "Emergency Powerbank & Charging Cables": false,
  };

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Go-Bag Emergency Checklist"),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: _items.entries.map((entry) {
          return Container(
            margin: const EdgeInsets.only(bottom: 8),
            decoration: BoxDecoration(
              color: TugonTheme.surface,
              borderRadius: BorderRadius.circular(10),
              border: Border.all(color: TugonTheme.border),
            ),
            child: CheckboxListTile(
              activeColor: TugonTheme.primary,
              title: Text(entry.key, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w500)),
              value: entry.value,
              onChanged: (val) {
                setState(() => _items[entry.key] = val ?? false);
              },
            ),
          );
        }).toList(),
      ),
    );
  }
}

