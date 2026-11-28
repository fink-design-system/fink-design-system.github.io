# Beitragen

Änderungen an Website und Samples gehen per Pull Request nach `develop`; `ci.yml` muss grün sein. Feature-Branches heißen
`feat/…`, `fix/…` oder `docs/…`.

```bash
pnpm install
pnpm build    # Website und Samples
pnpm format   # Prettier
pnpm lint     # TypeScript, ESLint (jsx-a11y, Fink-Regeln), Typprüfung der Samples
```

- Commit-Nachrichten nach [Conventional Commits](https://www.conventionalcommits.org/de/).
- Jeder Pull Request bekommt eine Vorschau der Website; der Link steht als Kommentar am PR.
- Fehler oder Wünsche an den Komponenten selbst bitte als Issue melden.

## Lizenz

Beiträge stehen unter der [EUPL-1.2](LICENSE).
