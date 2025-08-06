# Vaillant Wärmepumpen Visualizer

Eine interaktive React-Anwendung zur Visualisierung und Simulation von Vaillant Wärmepumpen-Systemen für verschiedene Zielgruppen.

## Features

### 🎯 Drei Zielgruppen
- **Kinder**: Spielerische Visualisierung mit Emojis und einfachen Erklärungen
- **Erwachsene**: Professionelle Darstellung mit Kosten-Nutzen-Analyse
- **Experten**: Detaillierte technische Analyse mit interaktiven Systemdiagrammen

### 🔧 Expertenvisualisierung Highlights
- **Interaktive Komponenten**: Hover-Effekte auf allen Wärmepumpen-Komponenten
- **Kältemittelfluss-Animation**: Echtzeitvisualisierung des R32-Kreislaufs
- **Druckanzeigen**: Hoch- und Niederdruckseite mit realistischen Werten
- **Fluss-Modi**: Umschaltbar zwischen Kältemittel-, Strom- und Wärmefluss
- **p-h Diagramm**: Vereinfachtes Druck-Enthalpie-Diagramm
- **Energiefluss-Analyse**: Sankey-ähnliche Darstellung der Energieströme
- **Smart Grid Integration**: SG Ready Visualisierung
- **Wartungsmonitoring**: Zustandsüberwachung und Prognosen

### 📊 Berechnungen
- **COP-Berechnung**: Temperatur-, Feuchtigkeits- und Windeinfluss
- **Kostenanalyse**: Tages-, Monats- und Jahreskosten
- **CO₂-Bilanz**: Umweltauswirkungen mit PV-Integration
- **Performance-Metriken**: SCOP, JAZ, Modulationsgrad

## Installation & Start

1. **Dependencies installieren**:
   \`\`\`bash
   npm install
   \`\`\`

2. **Entwicklungsserver starten**:
   \`\`\`bash
   npm start
   \`\`\`

3. **Browser öffnen**: http://localhost:3000

## Verwendung

### Parameter-Einstellungen
- **Außentemperatur**: -20°C bis +35°C
- **Wunschtemperatur**: 18°C bis 24°C
- **Wärmepumpen-Modell**: aroTHERM, geoTHERM, flexoTHERM
- **PV-Anlage**: Ein-/Ausschaltbar
- **Experten-Parameter**: Luftfeuchtigkeit, Wind, Heizlast, etc.

### Interaktive Features (Experten-Modus)
1. **Komponenten-Hover**: Fahren Sie mit der Maus über Verdampfer, Verdichter, Verflüssiger oder Expansionsventil
2. **Fluss-Auswahl**: Wählen Sie zwischen Kältemittel-, Strom- oder Wärmefluss
3. **Druckanzeigen**: Rote = Hochdruck, Blaue = Niederdruck
4. **p-h Diagramm**: Zeigt den thermodynamischen Kreisprozess

### Test-Szenarien
1. **Extreme Kälte**: Setzen Sie Außentemperatur auf -20°C
2. **PV-Integration**: Aktivieren Sie die PV-Anlage
3. **Verschiedene Modelle**: Testen Sie alle drei Wärmepumpen-Varianten
4. **Hohe Heizlast**: Erhöhen Sie Hausgröße auf 300m²

## Technische Details

### React Komponenten
- **VaillantHeatPumpVisualizer**: Hauptkomponente
- **KidsVisualization**: Kinderfreundliche Darstellung
- **AdultsVisualization**: Standard-Visualisierung
- **ExpertsVisualization**: Technische Detailansicht

### Berechnungslogik
- **calculateAdvancedCOP()**: Berücksichtigt alle Umweltfaktoren
- **calculatePower()**: Dynamische Leistungsberechnung
- **calculateDetailedCosts()**: Mehrstufige Kostenanalyse
- **getRefrigerantState()**: Kältemittelzustand an jeder Position

### Styling
- **Tailwind CSS**: Responsive Design
- **CSS Animationen**: Flüssigkeitsströme und Pulseffekte
- **Custom CSS**: Spezielle Tooltips und Hover-Effekte

## Optimierungsmöglichkeiten

### Performance
- React.memo für Komponenten-Optimierung
- useMemo für komplexe Berechnungen
- useCallback für Event-Handler

### Erweiterte Features
- 3D-Visualisierung mit Three.js
- Echte Wetterdaten-Integration
- Historische Leistungsdaten
- Export-Funktionen für Berichte

### Mobile Optimierung
- Touch-Events für Hover-Effekte
- Responsive Breakpoints
- Progressive Web App Features

## Browser-Kompatibilität
- Chrome/Edge: Vollständig unterstützt
- Firefox: Vollständig unterstützt
- Safari: Vollständig unterstützt
- Mobile Browser: Basis-Funktionalität

## Lizenz
© 2024 Vaillant Wärmepumpen Visualizer