import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../services/mock_api_service.dart';
import '../../models/mock_models.dart';
import 'submit_incident_screen.dart';
import 'citizen_tracking_screen.dart';
import '../shared/emergency_hotlines_screen.dart';
import '../shared/go_bag_checklist_screen.dart';

class CitizenHomeScreen extends StatefulWidget {
  const CitizenHomeScreen({Key? key}) : super(key: key);

  @override
  State<CitizenHomeScreen> createState() => _CitizenHomeScreenState();
}

class _CitizenHomeScreenState extends State<CitizenHomeScreen> {
  final incidents = MockApiService.getIncidents();

  @override
  Widget build(BuildContext context) {
    final active = incidents.firstWhere((i) => i.status == "DISPATCHED", orElse: () => incidents.first);

    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(6),
              decoration: BoxDecoration(
                color: TugonTheme.primary,
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Text("T", style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold)),
            ),
            const SizedBox(width: 10),
            const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text("TUGON CITIZEN", style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold)),
                Text("Municipality of Liliw, Laguna", style: TextStyle(fontSize: 11, color: TugonTheme.textMuted)),
              ],
            ),
          ],
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Active Emergency Telemetry Card
            InkWell(
              onTap: () {
                Navigator.push(context, MaterialPageRoute(builder: (_) => CitizenTrackingScreen(incident: active)));
              },
              child: Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: TugonTheme.surface,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: TugonTheme.primary),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.between,
                      children: [
                        const Row(
                          children: [
                            Icon(Icons.radar, color: TugonTheme.primary, size: 20),
                            SizedBox(width: 8),
                            Text("ACTIVE EMERGENCY MISSION", style: TextStyle(color: TugonTheme.primary, fontWeight: FontWeight.bold, fontSize: 12)),
                          ],
                        ),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                          decoration: BoxDecoration(
                            color: TugonTheme.primary.withOpacity(0.2),
                            borderRadius: BorderRadius.circular(6),
                          ),
                          child: Text(active.status, style: const TextStyle(color: TugonTheme.primary, fontSize: 11, fontWeight: FontWeight.bold)),
                        )
                      ],
                    ),
                    const SizedBox(height: 12),
                    Text(active.description, style: const TextStyle(fontSize: 13, color: TugonTheme.textLight, fontWeight: FontWeight.w500)),
                    const SizedBox(height: 8),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.between,
                      children: [
                        Text("Assigned: ${active.assignedUnit}", style: const TextStyle(fontSize: 12, color: TugonTheme.textMuted)),
                        Text("ETA: ${active.eta}", style: const TextStyle(fontSize: 13, color: TugonTheme.primary, fontWeight: FontWeight.bold)),
                      ],
                    )
                  ],
                ),
              ),
            ),
            const SizedBox(height: 24),

            // 1-Tap SOS Emergency Report
            const Text("REPORT AN EMERGENCY", style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: TugonTheme.textMuted)),
            const SizedBox(height: 12),
            GestureDetector(
              onTap: () {
                Navigator.push(context, MaterialPageRoute(builder: (_) => const SubmitIncidentScreen()));
              },
              child: Container(
                width: double.infinity,
                padding: const EdgeInsets.symmetric(vertical: 20),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(colors: [Color(0xFFEF4444), Color(0xFFDC2626)]),
                  borderRadius: BorderRadius.circular(16),
                  boxShadow: [
                    BoxShadow(color: Colors.red.withOpacity(0.3), blurRadius: 15, offset: const Offset(0, 5)),
                  ],
                ),
                child: const Column(
                  children: [
                    Icon(Icons.warning_amber_rounded, size: 36, color: Colors.white),
                    SizedBox(height: 6),
                    Text("PRESS TO REPORT INCIDENT", style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 16)),
                    Text("Auto-attaches GPS location & dispatches MAT units", style: TextStyle(color: Colors.white70, fontSize: 11)),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 24),

            // Quick Resource Grid
            const Text("SAFETY RESOURCES", style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: TugonTheme.textMuted)),
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(
                  child: InkWell(
                    onTap: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const EmergencyHotlinesScreen())),
                    child: Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: TugonTheme.surface,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: TugonTheme.border),
                      ),
                      child: const Column(
                        children: [
                          Icon(Icons.phone_in_talk, color: TugonTheme.primary, size: 28),
                          SizedBox(height: 8),
                          Text("Hotlines", style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                          Text("MAT · Police · Fire", style: TextStyle(fontSize: 10, color: TugonTheme.textMuted)),
                        ],
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: InkWell(
                    onTap: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const GoBagChecklistScreen())),
                    child: Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: TugonTheme.surface,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: TugonTheme.border),
                      ),
                      child: const Column(
                        children: [
                          Icon(Icons.backpack_outlined, color: TugonTheme.green, size: 28),
                          SizedBox(height: 8),
                          Text("Go-Bag", style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                          Text("Emergency Checklist", style: TextStyle(fontSize: 10, color: TugonTheme.textMuted)),
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

