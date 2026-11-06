import 'package:flutter/material.dart';

class TugonTheme {
  static const Color primary = Color(0xFFFF6B2C); // Emergency Vibrant Orange
  static const Color background = Color(0xFF0B0F14); // Dark Obsidian
  static const Color surface = Color(0xFF141B24); // Card Slate
  static const Color border = Color(0xFF243040);
  static const Color textLight = Color(0xFFE9EDF2);
  static const Color textMuted = Color(0xFF9AA7B4);
  static const Color green = Color(0xFF10B981);
  static const Color red = Color(0xFFEF4444);

  static ThemeData get darkTheme {
    return ThemeData(
      brightness: Brightness.dark,
      scaffoldBackgroundColor: background,
      primaryColor: primary,
      colorScheme: const ColorScheme.dark(
        primary: primary,
        surface: surface,
        background: background,
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: background,
        elevation: 0,
        centerTitle: false,
        titleTextStyle: TextStyle(
          color: textLight,
          fontSize: 18,
          fontWeight: FontWeight.bold,
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: primary,
          foregroundColor: Colors.black,
          textStyle: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
          padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 20),
        ),
      ),
    );
  }
}

