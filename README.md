# EnergieExpert - Interaktive Energiedashboard-App

Eine interaktive und lehrreiche Web-App zum Verstehen von Energieverbrauch und -produktion, entwickelt mit React, TypeScript, Tailwind CSS und Recharts.

## Funktionen

Die App besteht aus drei Hauptmodulen:

1. **Haushaltsenergieverbrauch**
   - Visualisierung des Energieverbrauchs verschiedener Haushaltsgeräte
   - Möglichkeit, Geräte ein-/auszuschalten und Nutzungsdauer anzupassen
   - Echtzeit-Berechnung von Tages-, Wochen- und Monatsverbrauch

2. **Erneuerbare Energien**
   - Simulation der Energieproduktion von Solar- und Windkraft
   - Anpassbare Wetterbedingungen mit Auswirkungen auf die Energieerzeugung
   - Vergleich der verschiedenen Energiequellen

3. **Energievergleich**
   - Vergleich von Energieverbrauch in verschiedenen Maßstäben (Haushalt, Stadt, Land)
   - Darstellung des deutschen Energiemix
   - Veranschaulichung von Energieeinheiten und Größenordnungen

## Technologien

- **React** mit **TypeScript** für die UI und Logik
- **Tailwind CSS** für das responsive Design
- **Recharts** für interaktive Datenvisualisierungen
- **Framer Motion** für Animationen
- **Dark/Light Mode** für verbesserte Nutzererfahrung

## Installation

```bash
# Repository klonen
git clone https://github.com/yourusername/electricityexpert.git
cd electricityexpert

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev
```

## Projektstruktur

```
src/
├── components/
│   ├── charts/          # Wiederverwendbare Diagramm-Komponenten
│   ├── household/       # Haushaltsmodul-Komponenten
│   ├── renewable/       # Erneuerbare-Energien-Komponenten
│   ├── comparison/      # Vergleichsmodul-Komponenten
│   └── layout/          # Layout-Komponenten (Navbar, Dashboard, etc.)
├── context/             # React Context für appweite Zustände
├── data/                # Mock-Daten für die Anwendung
├── types/               # TypeScript-Typdefinitionen
├── utils/               # Hilfsfunktionen
└── hooks/               # Benutzerdefinierte React-Hooks
```

## Bildschirmfotos

[Hier könnten Screenshots der Anwendung stehen]

## Entwickelt von

[Dein Name]

## Lizenz

MIT
