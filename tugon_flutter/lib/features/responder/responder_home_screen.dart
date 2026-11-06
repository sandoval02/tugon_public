import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../services/mock_api_service.dart';

class ResponderHomeScreen extends StatefulWidget {
  const ResponderHomeScreen({Key? key}) : super(key: key);

  @override
  State<ResponderHomeScreen> createState() => _ResponderHomeScreenState();
}

class _ResponderHomeScreenState extends State<ResponderHomeScreen> {
  bool _isOnDuty = true;
  String _missionStatus = "DISPATCHED";

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text("TUGON RESPONDER", style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold)),
            Text("Field Emergency Unit · Duty Responder", style: TextStyle(fontSize: 11, color: TugonTheme.textMuted)),
          ],
        ),
        actions: [
          Row(
            children: [
              Text(_isOnDuty ? "ON DUTY" : "OFF DUTY", style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: _isOnDuty ? TugonTheme.green : Colors.grey)),
              Switch(
                value: _isOnDuty,
                activeColor: TugonTheme.green,
                onChanged: (val) => setState(() => _isOnDuty = val),
              ),
            ],
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Active Mission Alert Box
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: TugonTheme.surface,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: Colors.red),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Row(
                    children: [
                      Icon(Icons.warning, color: Colors.red, size: 22),
                      SizedBox(width: 8),
                      Text("ASSIGNED EMERGENCY MISSION", style: TextStyle(color: Colors.red, fontWeight: FontWeight.bold, fontSize: 13)),
                    ],
                  ),
                  const SizedBox(height: 10),
                  const Text("INC-2026-1042 · MEDICAL", style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 4),
                  const Text("Brgy. Rizal, Zone 2 · Senior citizen with respiratory distress.", style: TextStyle(fontSize: 12, color: TugonTheme.textMuted)),
                  const SizedBox(height: 16),

                  // Mission Stage Progression
                  Wrap(
                    spacing: 8,
                    runSpacing: 8,
                    children: [
                      _statusButton("ACCEPTED", "Accept Mission"),
                      _statusButton("EN_ROUTE", "En Route"),
                      _statusButton("ARRIVED", "Arrived Scene"),
                      _statusButton("RESOLVED", "Mark Resolved"),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            // Geofenced Attendance Card
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: TugonTheme.surface,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: TugonTheme.border),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Row(
                    children: [
                      Icon(Icons.fingerprint, color: TugonTheme.primary, size: 22),
                      SizedBox(width: 8),
                      Text("GEOFENCED ATTENDANCE", style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                    ],
                  ),
                  const SizedBox(height: 8),
                  const Text("Proximity to MAT HQ: 18.4m (Within 50m geofence)", style: TextStyle(fontSize: 11, color: TugonTheme.green, fontFamily: 'monospace')),
                  const SizedBox(height: 14),
                  SizedBox(
                    width: double.infinity,
                    child: OutlinedButton.icon(
                      onPressed: () {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text("Face ID Verified! Attendance Timed In.")),
                        );
                      },
                      icon: const Icon(Icons.face, size: 18, color: TugonTheme.primary),
                      label: const Text("Face ID Check-in", style: TextStyle(color: TugonTheme.primary)),
                      style: OutlinedButton.styleFrom(side: const BorderSide(color: TugonTheme.primary)),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _statusButton(String status, String label) {
    final isActive = _missionStatus == status;
    return ElevatedButton(
      onPressed: () {
        setState(() => _missionStatus = status);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text("Mission status updated to $status")),
        );
      },
      style: ElevatedButton.styleFrom(
        backgroundColor: isActive ? TugonTheme.primary : TugonTheme.surface,
        foregroundColor: isActive ? Colors.black : Colors.white,
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        textStyle: const TextStyle(fontSize: 11),
      ),
      child: Text(label),
    );
  }
}

