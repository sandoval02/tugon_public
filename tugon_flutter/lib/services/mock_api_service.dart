import '../models/mock_models.dart';

class MockApiService {
  static final List<MockIncident> _incidents = [
    MockIncident(
      id: "INC-DEMO-001",
      category: "MEDICAL",
      severity: "HIGH",
      description: "Resident requesting emergency assistance for respiratory distress.",
      barangay: "Rizal",
      status: "DISPATCHED",
      latitude: 14.1315,
      longitude: 121.4372,
      assignedUnit: "Ambulance Unit 01",
      eta: "3.8 mins",
    ),
  ];

  static List<MockIncident> getIncidents() => _incidents;

  static List<MockHotline> getHotlines() => [
    MockHotline(name: "Municipal Rescue", agency: "Emergency Action Team", number: "(049) 555-0101"),
    MockHotline(name: "Fire Protection Bureau", agency: "Fire Rescue Station", number: "(049) 555-0102"),
    MockHotline(name: "Municipal Police Station", agency: "Philippine National Police", number: "(049) 555-0103"),
    MockHotline(name: "Disaster Risk Office", agency: "MDRRMO Command Hub", number: "(049) 555-0104"),
  ];

  static Future<MockIncident> submitMockIncident({
    required String category,
    required String severity,
    required String description,
    required String barangay,
  }) async {
    final newInc = MockIncident(
      id: "INC-DEMO-${100 + _incidents.length + 1}",
      category: category,
      severity: severity,
      description: description,
      barangay: barangay,
      status: "PENDING",
      latitude: 14.1338,
      longitude: 121.4342,
      assignedUnit: "Standby Dispatch",
      eta: "Calculating...",
    );
    _incidents.insert(0, newInc);
    return newInc;
  }
}
