// Version der Fink-Bibliothek aus dem installierten @fink-ui/components-Paket — die Website zeigt
// damit nach einem Lib-Update automatisch die richtige Versionsnummer, ohne sie nachzuführen.
import pkg from '@fink-ui/components/package.json';

export const FINK_VERSION: string = pkg.version;
