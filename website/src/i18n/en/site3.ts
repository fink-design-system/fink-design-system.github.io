/** Englische Texte der erweiterten Komponenten (fink-more) und der Vergleichsseite. */
export const site3: Record<string, string> = {
	// Navigation und Vergleichsseite
	'Quellcode auf GitHub (öffnet in neuem Tab)': 'Source code on GitHub (opens in a new tab)',
	'Mit MUI & Co. vergleichen': 'Compare with MUI & co.',
	'Abdeckung ggü. MUI, Vuetify & Co.': 'Coverage vs. MUI, Vuetify & co.',
	'Hell + Dunkel': 'Light + dark',
	Vergleich: 'Comparison',
	'Wie viel von dem, was die großen Design-Systeme bieten, deckt Fink ab? Die Zeilen sind nach Verbreitung geordnet – von Bausteinen, die jede Anwendung braucht, bis zu Spezialfällen. KoliBri zuerst, Fink für die Lücken.':
		'How much of what the big design systems offer does Fink cover? Rows are ordered by how common a component is – from building blocks every application needs to special cases. KoliBri first, Fink for the gaps.',
	'Fink gesamt': 'Fink total',
	'{{kolibri}} Zeilen deckt KoliBri direkt ab, {{fink}} ergänzt Fink. Gezählt wird, ob ein System eine eigene Komponente dafür hat; Muster und Rezepte zählen nicht.':
		'KoliBri covers {{kolibri}} rows directly, Fink adds {{fink}}. A row counts if a system ships its own component; patterns and recipes do not count.',
	Anzeigen: 'Show',
	'Fink-Ergänzungen': 'Fink additions',
	Lücken: 'Gaps',
	Komponente: 'Component',
	'keine eigene Komponente': 'no dedicated component',
	Methode: 'Method',
	'Stand der Vergleichssysteme: MUI 7 (inklusive MUI X), Vuetify 3, Material Design 3, Carbon v11, Ant Design 5.':
		'Versions compared: MUI 7 (including MUI X), Vuetify 3, Material Design 3, Carbon v11, Ant Design 5.',
	'„Teilweise“ heißt: Die Aufgabe ist lösbar, aber nicht mit gleichem Umfang (z. B. Tooltips nur an KoliBri-Bedienelementen).':
		'“Partial” means the task can be solved, but not to the same extent (e.g. tooltips only on KoliBri controls).',
	'„Fehlt“ markiert bewusst offene Punkte für die nächsten Ausbaustufen.': '“Missing” deliberately marks open items for the next expansion steps.',
	'Stufe 1: Grundbausteine': 'Tier 1: Essentials',
	'Komponenten, die in fast jeder Anwendung vorkommen.': 'Components found in almost every application.',
	'Stufe 2: Verbreitet': 'Tier 2: Common',
	'Häufig in Fach- und Bürgeranwendungen, aber nicht überall nötig.': 'Frequent in case-management and citizen services, but not needed everywhere.',
	'Stufe 3: Spezialisiert': 'Tier 3: Specialised',
	'Seltener gebraucht; hier unterscheiden sich die Systeme am stärksten.': 'Needed less often; this is where the systems differ most.',
	teilweise: 'partial',
	fehlt: 'missing',
	'_variant="switch"': '_variant="switch"',
	'nur an KoliBri-Bedienelementen (_hideLabel)': 'only on KoliBri controls (_hideLabel)',
	'nur Sparkline': 'sparkline only',

	// Zeilen der Vergleichsmatrix
	Textfeld: 'Text field',
	Auswahlliste: 'Select',
	Radiobuttons: 'Radio buttons',
	Schalter: 'Switch',
	'Hinweis / Banner': 'Alert / banner',
	'Snackbar / Toast': 'Snackbar / toast',
	Tabelle: 'Table',
	Karte: 'Card',
	Menü: 'Menu',
	Liste: 'List',
	'Fortschritt / Spinner': 'Progress / spinner',
	Akkordeon: 'Accordion',
	Brotkrumen: 'Breadcrumbs',
	Paginierung: 'Pagination',
	'Drawer / Seitenleiste': 'Drawer / side sheet',
	'App-Rahmen / App Bar': 'App shell / app bar',
	Trennlinie: 'Divider',
	Schieberegler: 'Slider',
	'Mehrzeiliges Textfeld': 'Text area',
	'Datum / Uhrzeit (Eingabe)': 'Date / time input',
	'Layout-Raster': 'Layout grid',
	'Segmentierte Auswahl': 'Segmented control',
	'Mehrfachauswahl (Tags)': 'Multi-select (tags)',
	Bewertung: 'Rating',
	Leerzustand: 'Empty state',
	'Datei-Upload': 'File upload',
	Baum: 'Tree',
	Zeitleiste: 'Timeline',
	'Avatar-Gruppe': 'Avatar group',
	Bereichsregler: 'Range slider',
	Kalender: 'Calendar',
	Karussell: 'Carousel',
	Kennzahl: 'Statistic',
	Ergebnisseite: 'Result page',
	'Schlüssel-Wert-Liste': 'Key-value list',
	Fußzeile: 'Footer',
	Zahlenfeld: 'Number field',
	Farbauswahl: 'Colour picker',
	'Transfer-Liste': 'Transfer list',
	'Einmalcode (OTP)': 'One-time code (OTP)',
	Inhaltsverzeichnis: 'Table of contents',
	'Nach oben': 'Back to top',
	Tastenkürzel: 'Keyboard shortcut',
	'Code-Block': 'Code block',
	Aufgabenliste: 'Task list',
	Massenaktionen: 'Bulk actions',
	'Cookie-Einwilligung': 'Cookie consent',
	Seitenfeedback: 'Page feedback',
	Sprunglinks: 'Skip links',
	Messanzeige: 'Meter',
	Bildergalerie: 'Image gallery',
	'Geführte Tour': 'Guided tour',
	Diagramme: 'Charts',
	'Virtuelles Scrollen': 'Virtual scrolling',

	// Kompositionen
	'Code erneut senden': 'Resend code',
	'Zeitraum: {{days}} Tage': 'Period: {{days}} days',
	'Beginn im Kalender wählen': 'Choose the start in the calendar',
	'Mitglieder von {{team}}': 'Members of {{team}}',
	'Code aus der Authenticator-App': 'Code from your authenticator app',
	'Scannen Sie den QR-Code mit Ihrer App und geben Sie den angezeigten Code ein. Demo-Code: 123456':
		'Scan the QR code with your app and enter the code shown. Demo code: 123456',
	'Der Code ist nicht korrekt. Bitte prüfen Sie die App.': 'The code is not correct. Please check the app.',
	'Zwei-Faktor-Anmeldung aktiv': 'Two-factor sign-in active',
	'Zwei-Faktor-Anmeldung deaktiviert': 'Two-factor sign-in turned off',

	// List
	'Ein- oder zweizeilige Listeneinträge mit Icon oder Avatar, Zusatzinfo und Zähler; statisch, als Links oder auswählbar. Vorbild: MUI List, Vuetify v-list, Material 3 Lists.':
		'One- or two-line list items with icon or avatar, meta text and counter; static, as links or selectable. Inspired by MUI List, Vuetify v-list, Material 3 Lists.',
	'Für Navigation innerhalb eines Bereichs (Ordner, Filter) _selectable nutzen.': 'Use _selectable for navigation within an area (folders, filters).',
	'Für tabellarische Daten mit mehreren Spalten die Tabelle verwenden.': 'Use the table for tabular data with several columns.',
	'Navigationsliste und Nachrichtenliste': 'Navigation list and message list',
	'Postfach-Ordner': 'Mailbox folders',
	Entwürfe: 'Drafts',
	Gesendet: 'Sent',
	Papierkorb: 'Bin',
	Nachrichten: 'Messages',
	'Rückfrage zu FD-2026-0142': 'Query about FD-2026-0142',
	'Bitte reichen Sie den Kostenvoranschlag als PDF nach, damit wir den Antrag prüfen können.':
		'Please submit the cost estimate as a PDF so that we can review the application.',
	'Bescheid verfügbar': 'Decision available',
	'Ihr Bescheid zum Förderprogramm Klimaschutz steht zum Download bereit.': 'Your decision for the climate protection programme is ready to download.',
	Gestern: 'Yesterday',
	'Termin bestätigt': 'Appointment confirmed',
	'Wohnsitz anmelden am 21. November, 09:30 Uhr im Bürgeramt Musterstadt.': 'Register your address on 21 November, 9:30 am at Bürgeramt Musterstadt.',

	// Menu
	'Aktionsmenü mit Gruppen, Trennlinien, Tastenkürzeln, Checkbox-Einträgen und destruktiven Aktionen; Tastatur nach ARIA-Menü-Muster. Vorbild: MUI Menu, Vuetify v-menu, Material 3 Menus.':
		'Action menu with groups, dividers, shortcuts, checkbox items and destructive actions; keyboard support following the ARIA menu pattern. Inspired by MUI Menu, Vuetify v-menu, Material 3 Menus.',
	'Höchstens sieben Einträge, sonst gruppieren.': 'At most seven items, otherwise group them.',
	'Häufigste Aktion als eigene Schaltfläche zeigen, nicht im Menü verstecken.':
		'Show the most frequent action as its own button instead of hiding it in the menu.',
	'Aktionen und Ansichtsoptionen': 'Actions and view options',
	'Als PDF exportieren': 'Export as PDF',
	'Mit allen Anlagen': 'With all attachments',
	'Ansicht anpassen': 'Customise view',
	'Kompakte Zeilen': 'Compact rows',
	'Archivierte anzeigen': 'Show archived',
	'Kompakt: {{a}} · Archiv: {{b}}': 'Compact: {{a}} · Archive: {{b}}',
	an: 'on',
	aus: 'off',

	// Tag Input
	'Mehrfachauswahl als entfernbare Tags mit Vorschlägen und freier Eingabe. Vorbild: MUI Autocomplete (multiple), Vuetify v-combobox (chips), Ant Select (tags).':
		'Multi-select as removable tags with suggestions and free input. Inspired by MUI Autocomplete (multiple), Vuetify v-combobox (chips), Ant Select (tags).',
	'Für wenige feste Optionen Checkboxen bevorzugen.': 'Prefer checkboxes for a few fixed options.',
	'Mit _allowCustom={false} sind nur Vorschläge erlaubt.': 'With _allowCustom={false} only suggestions are allowed.',
	'Schlagworte mit Vorschlägen': 'Keywords with suggestions',
	Schlagworte: 'Keywords',

	// Avatar Group
	'Überlappende Avatare mit „+N“ für weitere Personen; der Gruppenname nennt alle. Vorbild: MUI AvatarGroup, Ant Avatar.Group.':
		'Overlapping avatars with “+N” for more people; the group name lists everyone. Inspired by MUI AvatarGroup, Ant Avatar.Group.',
	'Bearbeitende eines Vorgangs': 'People working on a case',
	Bearbeitende: 'Assignees',
	'Team Förderung': 'Funding team',

	// Divider
	'Trennlinie horizontal oder vertikal, mit optionaler Beschriftung und Einrückung. Vorbild: MUI Divider, Vuetify v-divider, Material 3 Divider.':
		'Horizontal or vertical divider with optional label and inset. Inspired by MUI Divider, Vuetify v-divider, Material 3 Divider.',
	oder: 'or',
	'Ältere Einträge': 'Older entries',
	Kopieren: 'Copy',
	Teilen: 'Share',

	// FAB
	'Schwebende Hauptaktion einer Ansicht, als Icon, mit Text (Extended) oder als Speed Dial mit sichtbar beschrifteten Unteraktionen. Vorbild: MUI Fab/SpeedDial, Vuetify v-fab, Material 3 FAB.':
		'Floating primary action of a view, icon-only, with text (extended) or as a speed dial with visibly labelled sub-actions. Inspired by MUI Fab/SpeedDial, Vuetify v-fab, Material 3 FAB.',
	'Nur eine FAB pro Ansicht, für die wichtigste positive Aktion.': 'Only one FAB per view, for the most important positive action.',
	'Am Desktop meist besser als normale Primärschaltfläche im Seitenkopf.': 'On desktop usually better as a regular primary button in the page header.',
	'FAB, Extended FAB und Speed Dial': 'FAB, extended FAB and speed dial',
	Erstellen: 'Create',
	Nachricht: 'Message',
	Termin: 'Appointment',

	// Range Slider
	'Von-bis-Bereich mit zwei Griffen, Einheit, Skala und optionalen Zahlenfeldern. Vorbild: Vuetify v-range-slider, MUI Slider (range), Carbon Slider.':
		'From–to range with two handles, unit, scale and optional number fields. Inspired by Vuetify v-range-slider, MUI Slider (range), Carbon Slider.',
	'Für einen einzelnen Wert fink-input-range verwenden.': 'Use fink-input-range for a single value.',
	'Bei genauen Beträgen _showInputs aktivieren.': 'Enable _showInputs for exact amounts.',
	'Fördersumme und Bearbeitungszeit': 'Funding amount and processing time',
	'Zeigt Programme in diesem Förderrahmen.': 'Shows programmes within this funding range.',
	Bearbeitungszeit: 'Processing time',
	Tage: 'days',

	// Calendar
	'Monatsansicht zur Datumsauswahl mit Grenzen, gesperrten Wochenenden und markierten Tagen; volle Tastaturbedienung. Vorbild: MUI DateCalendar, Vuetify v-date-picker, Material 3 Date picker.':
		'Month view for picking a date with limits, disabled weekends and marked days; full keyboard support. Inspired by MUI DateCalendar, Vuetify v-date-picker, Material 3 Date picker.',
	'Für bekannte Daten wie Geburtsdaten fink-input-date nutzen; der Kalender lohnt sich bei Terminwahl.':
		'Use fink-input-date for known dates such as birthdays; the calendar pays off for booking appointments.',
	'Markierungen immer mit _markerLabel erklären.': 'Always explain markers with _markerLabel.',
	'Termin mit freien Tagen': 'Appointment with available days',
	'Termin wählen': 'Choose an appointment',
	'freie Termine': 'available slots',

	// Carousel
	'Folien mit Zurück/Weiter, Folienwahl, Wischen und optionalem Autoplay mit Pause-Schaltfläche. Vorbild: Vuetify v-carousel, Material 3 Carousel, Ant Carousel.':
		'Slides with previous/next, slide picker, swiping and optional autoplay with a pause button. Inspired by Vuetify v-carousel, Material 3 Carousel, Ant Carousel.',
	'Wichtige Inhalte nie nur in späteren Folien verstecken.': 'Never hide important content only in later slides.',
	'Autoplay nur mit Pause; es stoppt bei Fokus und Zeiger.': 'Autoplay only with pause; it stops on focus and hover.',
	Förderprogramme: 'Funding programmes',
	'Aktuelle Förderprogramme': 'Current funding programmes',
	'Bis zu 50.000 € für digitale Prozesse und IT-Sicherheit.': 'Up to €50,000 for digital processes and IT security.',
	'Klimaschutz in Kommunen': 'Climate protection in municipalities',
	'Zuschüsse für Energieeffizienz und erneuerbare Wärme.': 'Grants for energy efficiency and renewable heat.',
	'Kultur vor Ort': 'Local culture',
	'Projektförderung für Vereine und freie Träger.': 'Project funding for associations and independent organisations.',
	'Innovation & Forschung': 'Innovation & research',
	'Verbundprojekte mit Hochschulen ab 100.000 €.': 'Joint projects with universities from €100,000.',

	// Kbd
	'Tastenkürzel als Tastenkappen, z. B. in Hilfetexten und Menüs. Vorbild: Vuetify v-kbd, Atlassian Keyboard shortcut.':
		'Keyboard shortcuts as keycaps, e.g. in help texts and menus. Inspired by Vuetify v-kbd, Atlassian Keyboard shortcut.',
	'Tastenkürzel im Text': 'Shortcuts in running text',
	'Suche öffnen mit': 'Open search with',
	'Strg+K': 'Ctrl+K',
	'speichern mit': 'save with',
	'Strg+S': 'Ctrl+S',
	'und Hilfe mit': 'and help with',

	// Back to top
	'Erscheint nach einer Scrollstrecke, scrollt nach oben und setzt den Fokus auf die Überschrift. Vorbild: Ant FloatButton.BackTop, GOV.UK Back to top.':
		'Appears after scrolling a distance, scrolls to the top and moves focus to the heading. Inspired by Ant FloatButton.BackTop, GOV.UK Back to top.',
	'Im Fluss (Demo)': 'Inline (demo)',

	// Transfer List
	'Zwei Listen mit Suche, „Alle auswählen“ und Zählern; Einträge werden per Schaltfläche verschoben und angesagt. Vorbild: MUI Transfer List, Ant Transfer.':
		'Two lists with search, “select all” and counters; items are moved with buttons and announced. Inspired by MUI Transfer List, Ant Transfer.',
	'Lohnt sich ab etwa zehn Optionen; darunter Checkboxen verwenden.': 'Worth it from about ten options; below that use checkboxes.',
	'Auf schmalen Flächen stehen die Listen untereinander.': 'On narrow areas the lists stack vertically.',
	'Programme einem Referat zuordnen': 'Assign programmes to a unit',
	'Programme für das Referat': 'Programmes for the unit',
	'Alle Programme': 'All programmes',
	'Referat 1': 'Unit 1',
	'ab 100.000 €': 'from €100,000',
	'Bildung digital': 'Digital education',
	'bis 30.000 €': 'up to €30,000',
	'Mobilität im ländlichen Raum': 'Rural mobility',
	'bis 80.000 €': 'up to €80,000',
	'Gesundheit im Quartier': 'Neighbourhood health',
	'bis 40.000 €': 'up to €40,000',

	// OTP
	'Einmalcode in Einzelfeldern mit Einfügen, SMS-Autofill, automatischem Weiterspringen und Fehlermeldung. Vorbild: Vuetify v-otp-input, Ant Input.OTP.':
		'One-time code in single fields with paste, SMS autofill, auto-advance and error message. Inspired by Vuetify v-otp-input, Ant Input.OTP.',
	'Immer sagen, wohin der Code geschickt wurde, und einen Weg zum erneuten Senden anbieten.':
		'Always say where the code was sent and offer a way to resend it.',
	'SMS-Code und Wiederherstellungscode': 'SMS code and recovery code',
	Bestätigungscode: 'Verification code',
	'Wir haben einen sechsstelligen Code an +49 151 ••• 42 gesendet. Demo-Code: 123456': 'We sent a six-digit code to +49 151 ••• 42. Demo code: 123456',
	'Der Code ist nicht korrekt. Bitte prüfen Sie die SMS.': 'The code is not correct. Please check the text message.',
	Wiederherstellungscode: 'Recovery code',

	// TOC
	'Inhaltsverzeichnis langer Seiten mit Hervorhebung des sichtbaren Abschnitts; Einträge übergeben oder aus Überschriften lesen. Vorbild: Ant Anchor, GOV.UK Contents list.':
		'Table of contents for long pages that highlights the visible section; pass entries or read them from headings. Inspired by Ant Anchor, GOV.UK Contents list.',
	'Seitenverzeichnis mit Scrollspy': 'Page contents with scrollspy',
	Voraussetzungen: 'Requirements',
	Unterlagen: 'Documents',
	'Antrag stellen': 'Apply',
	'Nach dem Bescheid': 'After the decision',
	'Beispieltext zum Abschnitt. Das Inhaltsverzeichnis hebt den Abschnitt hervor, der gerade im sichtbaren Bereich liegt.':
		'Sample text for the section. The table of contents highlights the section currently in view.',

	// Sparkline
	'Kleiner Verlaufsgraph für Tabellen und Kennzahlen als Linie, Fläche oder Balken; der Name fasst den Verlauf in Worten zusammen. Vorbild: Vuetify v-sparkline, MUI X SparkLineChart.':
		'Small trend chart for tables and statistics as line, area or bars; its name summarises the trend in words. Inspired by Vuetify v-sparkline, MUI X SparkLineChart.',
	'Zeigt Tendenzen, keine exakten Werte; exakte Zahlen daneben oder in einer Tabelle nennen.':
		'Shows trends, not exact values; give exact numbers next to it or in a table.',
	'Verlauf in einer Tabelle': 'Trend inside a table',
	'Anträge pro Woche': 'Applications per week',
	'Verlauf (8 Wochen)': 'Trend (8 weeks)',
	Balken: 'Bars',
	'Anträge pro Woche, {{label}}': 'Applications per week, {{label}}',
	Kultur: 'Culture',

	// Welle 4
	'Balken und Sparkline, keine Linien-/Kreisdiagramme': 'bars and sparkline, no line or pie charts',
	Anordnung: 'Layout',
	Raster: 'Grid',
	'Projekte aus der Förderung': 'Funded projects',
	'Hügel im Morgenlicht': 'Hills in the morning light',
	Rathausplatz: 'Town hall square',
	'Eröffnung 2026': 'Opening 2026',
	'Grüne Hügel': 'Green hills',
	Stadtpark: 'City park',
	Klimaschutz: 'Climate protection',
	Abendstimmung: 'Evening mood',
	Kulturnacht: 'Night of culture',
	'Violette Landschaft': 'Violet landscape',
	Innovationszentrum: 'Innovation centre',
	Forschung: 'Research',
	'Blaue Berge': 'Blue mountains',
	Hafen: 'Harbour',
	Mobilität: 'Mobility',
	'Rote Hügel': 'Red hills',
	Service: 'Service',
	'Bildergalerie als Raster, Masonry oder „quilted“ mit Bildunterschriften und Lightbox (fink-dialog) samt Pfeiltasten. Vorbild: MUI Image List, Ant Image.PreviewGroup.':
		'Image gallery as grid, masonry or quilted with captions and a lightbox (fink-dialog) with arrow keys. Inspired by MUI Image List, Ant Image.PreviewGroup.',
	'Jedes Bild braucht einen Alternativtext, der den Inhalt beschreibt.': 'Every image needs alternative text that describes its content.',
	'Für Produktbilder mit Aktionen besser Karten verwenden.': 'Use cards for product images with actions.',
	'Galerie mit drei Anordnungen': 'Gallery with three layouts',
	'Geführte Tour, die Elemente nacheinander hervorhebt und erklärt; Escape beendet, der Fokus folgt der Karte. Vorbild: Ant Tour, Atlassian Spotlight.':
		'Guided tour that highlights and explains elements one after another; Escape ends it and focus follows the card. Inspired by Ant Tour, Atlassian Spotlight.',
	'Nur für wirklich neue Bereiche, höchstens fünf Schritte.': 'Only for genuinely new areas, five steps at most.',
	'Immer überspringbar; nie automatisch bei jedem Besuch starten.': 'Always skippable; never start automatically on every visit.',
	'Einführung in drei Schritten': 'Introduction in three steps',
	'Tour starten': 'Start tour',
	'Neu im Förderportal': 'New in the funding portal',
	'Alles finden': 'Find everything',
	'Suchen Sie nach Aktenzeichen, Antragstellern oder Programmen.': 'Search for reference numbers, applicants or programmes.',
	'Antrag anlegen': 'Create an application',
	'Hier starten Sie einen neuen Antrag – der Assistent führt Schritt für Schritt.': 'Start a new application here – the wizard guides you step by step.',
	'Rückfragen im Blick': 'Keep track of queries',
	'Neue Nachrichten und Rückfragen landen im Postfach.': 'New messages and queries arrive in the inbox.',
	'Tour abgeschlossen': 'Tour completed',
	'Sehr lange Listen, von denen nur die sichtbaren Zeilen gerendert werden; Gesamtlänge per aria-setsize. Vorbild: Vuetify v-virtual-scroll, Ant List (virtual).':
		'Very long lists that only render the visible rows; total length via aria-setsize. Inspired by Vuetify v-virtual-scroll, Ant List (virtual).',
	'Erst ab mehreren Tausend Einträgen nötig; darunter Paginierung bevorzugen.': 'Only needed from several thousand items; below that prefer pagination.',
	'Browser-Suche (Strg+F) findet nur gerenderte Zeilen – eine eigene Suche anbieten.':
		'Browser search (Ctrl+F) only finds rendered rows – offer your own search.',
	'10.000 Anträge': '10,000 applications',
	'Alle Anträge': 'All applications',
	'10.000 Einträge, flüssig scrollbar.': '10,000 items, smooth scrolling.',
	'Balkendiagramm, das zugleich eine echte Datentabelle ist; Werte stehen immer als Zahl daneben. Vorbild: MUI X BarChart, Carbon Simple bar chart.':
		'Bar chart that is also a real data table; values are always shown as numbers. Inspired by MUI X BarChart, Carbon Simple bar chart.',
	'Für Vergleiche weniger Kategorien; Verläufe über die Zeit als Sparkline zeigen.': 'For comparing a few categories; show trends over time as a sparkline.',
	'Bewilligte Mittel nach Programm': 'Approved funds by programme',
	'Bewilligte Mittel 2026': 'Approved funds 2026',
	'Tsd. €': 'k€',
	Bearbeitungsstand: 'Processing status',

	// Welle 5
	'Bestätigungs-Popover': 'Confirmation popover',
	'Endloses Laden': 'Infinite loading',
	'Geteilte Ansicht': 'Split view',
	Kaskadenauswahl: 'Cascader',
	Erwähnungen: 'Mentions',
	'QR-Code': 'QR code',
	'Entwurf wirklich löschen?': 'Really delete the draft?',
	'Der Entwurf kann danach nicht wiederhergestellt werden.': 'The draft cannot be restored afterwards.',
	'Entwurf gelöscht': 'Draft deleted',
	Archivieren: 'Archive',
	'Antrag archivieren?': 'Archive the application?',
	Archiviert: 'Archived',
	'Leichte Rückfrage direkt an der Schaltfläche, z. B. vor dem Löschen eines Entwurfs. Vorbild: Ant Popconfirm.':
		'Lightweight confirmation right at the button, e.g. before deleting a draft. Inspired by Ant Popconfirm.',
	'Für folgenreiche oder unumkehrbare Aktionen mit Daten anderer Personen fink-dialog verwenden.':
		'Use fink-dialog for consequential or irreversible actions affecting other people’s data.',
	'Löschen und Archivieren': 'Delete and archive',
	'Lädt beim Erreichen des Endes nach, bietet aber immer auch „Mehr laden“ und sagt Ladezustand und Ende an. Vorbild: Vuetify v-infinite-scroll.':
		'Loads more when the end is reached, but always offers “Load more” and announces loading and the end. Inspired by Vuetify v-infinite-scroll.',
	'Nicht für Seiten mit Fußzeile, die erreichbar bleiben muss – dann _auto={false}.':
		'Not for pages whose footer must stay reachable – use _auto={false} there.',
	'Für Suchergebnisse mit Sprungzielen ist Paginierung meist besser.': 'For search results you want to return to, pagination is usually better.',
	'Meldungen nachladen': 'Load more notifications',
	Meldungen: 'Notifications',
	'Meldung {{n}}': 'Notification {{n}}',
	'Zwei Bereiche mit verschiebbarer, per Tastatur bedienbarer Trennlinie; auf schmalen Flächen untereinander. Vorbild: Ant Splitter.':
		'Two panes with a draggable, keyboard-operable divider; stacked on narrow areas. Inspired by Ant Splitter.',
	'Liste und Detail': 'List and detail',
	'Breite der Liste': 'List width',
	'Detailansicht neben der Liste. Ziehen Sie die Trennlinie oder nutzen Sie die Pfeiltasten.':
		'Detail view next to the list. Drag the divider or use the arrow keys.',
	'Listenbreite: {{size}} %': 'List width: {{size}}%',
};
