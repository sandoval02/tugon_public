import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../services/mock_api_service.dart';

class SubmitIncidentScreen extends StatefulWidget {
  const SubmitIncidentScreen({Key? key}) : super(key: key);

  @override
  State<SubmitIncidentScreen> createState() => _SubmitIncidentScreenState();
}

class _SubmitIncidentScreenState extends State<SubmitIncidentScreen> {
  String _category = "MEDICAL";
  String _severity = "HIGH";
  final _descController = TextEditingController();
  String _barangay = "Rizal";
  bool _isSubmitting = false;

  final List<String> _barangays = ["Rizal", "Calumpang", "Poblacion", "Daniw", "Tuy-Baanan", "Dagatan"];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Report Emergency Incident"),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Category Selector
            const Text("SELECT EMERGENCY TYPE", style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: TugonTheme.textMuted)),
            const SizedBox(height: 8),
            Wrap(
              spacing: 8,
              children: ["MEDICAL", "FIRE", "TRAFFIC_ACCIDENT", "FLOOD"].map((cat) {
                final isSelected = _category == cat;
                return ChoiceChip(
                  label: Text(cat, style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: isSelected ? Colors.black : Colors.white)),
                  selected: isSelected,
                  selectedColor: TugonTheme.primary,
                  backgroundColor: TugonTheme.surface,
                  onSelected: (val) => setState(() => _category = cat),
                );
              }).toList(),
            ),
            const SizedBox(height: 20),

            // Description Form
            const Text("INCIDENT DETAILS", style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: TugonTheme.textMuted)),
            const SizedBox(height: 8),
            TextField(
              controller: _descController,
              maxLines: 4,
              decoration: InputDecoration(
                hintText: "Describe the emergency (e.g. May aksidente po sa highway kailangan ng ambulansya)...",
                hintStyle: const TextStyle(fontSize: 12, color: TugonTheme.textMuted),
                filled: true,
                fillColor: TugonTheme.surface,
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: const BorderSide(color: TugonTheme.border)),
                enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: const BorderSide(color: TugonTheme.border)),
              ),
            ),
            const SizedBox(height: 20),

            // Barangay Dropdown
            const Text("BARANGAY LOCATION (LILIW)", style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: TugonTheme.textMuted)),
            const SizedBox(height: 8),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              decoration: BoxDecoration(
                color: TugonTheme.surface,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: TugonTheme.border),
              ),
              child: DropdownButtonHideUnderline(
                child: DropdownButton<String>(
                  value: _barangay,
                  isExpanded: true,
                  dropdownColor: TugonTheme.surface,
                  items: _barangays.map((b) => DropdownMenuItem(value: b, child: Text("Brgy. $b"))).toList(),
                  onChanged: (val) => setState(() => _barangay = val!),
                ),
              ),
            ),
            const SizedBox(height: 20),

            // Simulated GPS Tag
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: TugonTheme.surface,
                borderRadius: BorderRadius.circular(10),
                border: Border.all(color: TugonTheme.border),
              ),
              child: const Row(
                children: [
                  Icon(Icons.gps_fixed, color: TugonTheme.green, size: 20),
                  SizedBox(width: 10),
                  Text("GPS Attached: 14.1338° N, 121.4342° E (±4m)", style: TextStyle(fontSize: 11, color: TugonTheme.textMuted, fontFamily: 'monospace')),
                ],
              ),
            ),
            const SizedBox(height: 30),

            // Submit Button
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: _isSubmitting ? null : () async {
                  setState(() => _isSubmitting = true);
                  await MockApiService.submitMockIncident(
                    category: _category,
                    severity: _severity,
                    description: _descController.text.isNotEmpty ? _descController.text : "Emergency assistance requested in Brgy. $_barangay",
                    barangay: _barangay,
                  );
                  if (mounted) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text("Mock Incident Submitted! Responders Notified.")),
                    );
                    Navigator.pop(context);
                  }
                },
                child: _isSubmitting 
                  ? const CircularProgressIndicator(color: Colors.black)
                  : const Text("TRANSMIT EMERGENCY REPORT"),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

