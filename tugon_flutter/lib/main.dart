import 'package:flutter/material.dart';
import 'config/theme.dart';
import 'features/citizen/citizen_home_screen.dart';
import 'features/responder/responder_home_screen.dart';

void main() {
  runApp(const TugonApp());
}

class TugonApp extends StatelessWidget {
  const TugonApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'TUGON Emergency Response',
      theme: TugonTheme.darkTheme,
      debugShowCheckedModeBanner: false,
      home: const RoleSelectorScreen(),
    );
  }
}

class RoleSelectorScreen extends StatelessWidget {
  const RoleSelectorScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                width: 72,
                height: 72,
                decoration: BoxDecoration(
                  color: TugonTheme.primary,
                  borderRadius: BorderRadius.circular(18),
                ),
                child: const Center(
                  child: Text("T", style: TextStyle(color: Colors.black, fontSize: 36, fontWeight: FontWeight.bold)),
                ),
              ),
              const SizedBox(height: 16),
              const Text(
                "TUGON",
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, letterSpacing: 1.2),
              ),
              const Text(
                "Municipal Emergency Response · Liliw, Laguna",
                style: TextStyle(fontSize: 12, color: TugonTheme.textMuted),
              ),
              const SizedBox(height: 36),
              const Text(
                "SELECT SIMULATION ROLE",
                style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: TugonTheme.textMuted, fontFamily: 'monospace'),
              ),
              const SizedBox(height: 16),

              // Citizen Portal
              SizedBox(
                width: double.infinity,
                child: ElevatedButton.icon(
                  onPressed: () {
                    Navigator.push(context, MaterialPageRoute(builder: (_) => const CitizenHomeScreen()));
                  },
                  icon: const Icon(Icons.person, color: Colors.black),
                  label: const Text("Enter as Resident / Citizen"),
                ),
              ),
              const SizedBox(height: 12),

              // Responder Portal
              SizedBox(
                width: double.infinity,
                child: OutlinedButton.icon(
                  onPressed: () {
                    Navigator.push(context, MaterialPageRoute(builder: (_) => const ResponderHomeScreen()));
                  },
                  style: OutlinedButton.styleFrom(
                    foregroundColor: Colors.white,
                    side: const BorderSide(color: TugonTheme.border),
                    padding: const EdgeInsets.symmetric(vertical: 14),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                  ),
                  icon: const Icon(Icons.shield, color: TugonTheme.primary),
                  label: const Text("Enter as MAT Field Responder", style: TextStyle(fontWeight: FontWeight.bold)),
                ),
              ),
              const SizedBox(height: 36),
              const Text(
                "LSPU College of Computer Studies · Academic Showcase",
                style: TextStyle(fontSize: 10, color: TugonTheme.textMuted),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

