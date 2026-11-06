import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../models/mock_models.dart';

class CitizenTrackingScreen extends StatelessWidget {
  final MockIncident incident;

  const CitizenTrackingScreen({Key? key, required this.incident}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Tracking: ${incident.id}"),
      ),
      body: Column(
        children: [
          // Simulated Map Canvas
          Expanded(
            child: Container(
              color: const Color(0xFF070B10),
              child: Stack(
                children: [
                  Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Icon(Icons.emergency, color: TugonTheme.primary, size: 54),
                        const SizedBox(height: 12),
                        Text(incident.assignedUnit, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                        const SizedBox(height: 4),
                        Text("En route to Brgy. ${incident.barangay}", style: const TextStyle(fontSize: 12, color: TugonTheme.textMuted)),
                        const SizedBox(height: 8),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                          decoration: BoxDecoration(
                            color: TugonTheme.primary.withOpacity(0.2),
                            borderRadius: BorderRadius.circular(20),
                            border: Border.all(color: TugonTheme.primary),
                          ),
                          child: Text("ESTIMATED ARRIVAL: ${incident.eta}", style: const TextStyle(color: TugonTheme.primary, fontWeight: FontWeight.bold, fontSize: 12)),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),

          // Details Drawer
          Container(
            padding: const EdgeInsets.all(20),
            decoration: const BoxDecoration(
              color: TugonTheme.surface,
              borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
              border: Border(top: BorderSide(color: TugonTheme.border)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.between,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(incident.category, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                        Text("Status: ${incident.status}", style: const TextStyle(color: TugonTheme.primary, fontSize: 12)),
                      ],
                    ),
                    ElevatedButton.icon(
                      onPressed: () {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text("Mock Call Placed to Assigned Responder")),
                        );
                      },
                      icon: const Icon(Icons.call, size: 16, color: Colors.black),
                      label: const Text("Call Responder"),
                    )
                  ],
                ),
                const SizedBox(height: 12),
                Text(incident.description, style: const TextStyle(fontSize: 12, color: TugonTheme.textLight)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

