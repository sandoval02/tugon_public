class MockIncident {
  final String id;
  final String category;
  final String severity;
  final String description;
  final String barangay;
  final String status;
  final double latitude;
  final double longitude;
  final String assignedUnit;
  final String eta;

  MockIncident({
    required this.id,
    required this.category,
    required this.severity,
    required this.description,
    required this.barangay,
    required this.status,
    required this.latitude,
    required this.longitude,
    required this.assignedUnit,
    required this.eta,
  });
}

class MockHotline {
  final String name;
  final String agency;
  final String number;

  MockHotline({
    required this.name,
    required this.agency,
    required this.number,
  });
}

