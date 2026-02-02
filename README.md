# SAVQonnect Web Intro v1

> Présentation scrollytelling offline pour SAVQonnect/Amalgame  
> Toutes les affirmations sont vérifiables dans le code source

## Ouvrir la présentation

### Option 1 : Double-clic (recommandé)

```
Double-cliquez sur index.html
```

**Note** : Certains navigateurs bloquent `fetch()` pour les fichiers locaux. Si la page affiche une erreur de chargement, utilisez l'Option 2.

### Option 2 : Serveur local

```bash
# Python 3
cd demo_web_intro_v1
python -m http.server 8000
# Ouvrir http://localhost:8000

# Node.js (avec npx)
npx serve .
# Ouvrir http://localhost:3000

# PHP
php -S localhost:8000
```

### Option 3 : Extension VS Code

Installez "Live Server" dans VS Code, puis clic droit sur `index.html` → "Open with Live Server".

---

## Structure des fichiers

```
demo_web_intro_v1/
├── index.html        # Page HTML principale
├── styles.css        # Styles CSS (variables, responsive, animations)
├── app.js            # JavaScript (charge truth_pack.json et rend les sections)
├── truth_pack.json   # Source de vérité avec preuves du code
└── README.md         # Ce fichier
```

---

## Truth Pack : Source de vérité

Le fichier `truth_pack.json` contient toutes les affirmations de la présentation avec leurs preuves :

### Structure

```json
{
  "meta": { /* infos projet, date génération */ },
  "elevator_pitch": { /* pitch et bullets */ },
  "problem_space": { /* pain points */ },
  "pillars": [ /* 3 piliers */ ],
  "capabilities": [ /* fonctionnalités avec evidence[] */ ],
  "integrations": [ /* intégrations avec evidence[] */ ],
  "architecture": { /* couches et flux */ },
  "demo_story": { /* scénario démo en 3 étapes */ },
  "future": [ /* items planifiés, clairement séparés */ ]
}
```

### Format d'une preuve (evidence)

```json
{
  "type": "code|route|config|frontend|handlers|store|component|migrations",
  "path": "chemin/vers/fichier.go",
  "anchor": "Fonction ou section pertinente"
}
```

---

## Rafraîchir le Truth Pack

Quand le code change, mettez à jour `truth_pack.json` :

### 1. Mettre à jour la date de génération

```json
"meta": {
  "generated_at": "2026-XX-XXTXX:XX:XXZ"
}
```

### 2. Vérifier les capacités existantes

Pour chaque `capability`, vérifiez que les fichiers dans `evidence[]` existent toujours :

```bash
# Exemple : vérifier qu'un fichier existe
ls internal/monitoring/metrics.go
```

### 3. Ajouter de nouvelles capacités

1. Trouvez le code correspondant (grep, recherche)
2. Créez un nouvel objet dans `capabilities[]` avec :
   - `id` unique
   - `status: "implemented"` (seulement si le code existe)
   - `evidence[]` avec au moins 2 preuves

### 4. Déplacer vers "future" si nécessaire

Si une fonctionnalité n'est plus implémentée ou en développement :
- Changez `status` en `"planned"` ou `"in_progress"`
- Ou déplacez l'item dans le tableau `future[]`

---

## Sections de la présentation

| Section | Description | Source JSON |
|---------|-------------|-------------|
| Hero | Pitch, stats, badges | `elevator_pitch`, `stats` |
| Problème | Pain points | `problem_space.pain_points` |
| Piliers | 3 piliers (Observabilité, Intelligence, Action) | `pillars[]` |
| Capacités | Fonctionnalités implémentées | `capabilities[]` (status=implemented) |
| Intégrations | Grille filtrable avec modals | `integrations[]` |
| Architecture | Couches et flux de données | `architecture` |
| Démo | Timeline en 3 étapes | `demo_story.steps[]` |
| Reality Check | Implémenté vs Planifié | `capabilities[]` + `future[]` |

---

## Fonctionnalités techniques

### Offline

- Aucune dépendance CDN
- Tous les styles inline ou locaux
- Icônes SVG inline dans `app.js`

### Responsive

- Mobile first
- Breakpoints : 768px, 1024px, 1366px, 1920px
- Testé sur 1366x768 et 1920x1080

### Accessibilité

- Contraste suffisant (WCAG AA)
- Navigation clavier
- Support `prefers-reduced-motion`
- Support `prefers-contrast: high`

### Animations

- Scroll reveal via IntersectionObserver
- Transitions CSS légères
- Timeline séquentielle pour la démo

---

## Ce qui a été exclu (pas de preuve)

Les éléments suivants n'apparaissent PAS car non vérifiables dans le code :

- Claims marketing sans implémentation
- Fonctionnalités théoriques non codées
- Intégrations tierces non connectées
- Métriques business (adoption, satisfaction)

---

## Maintenance

### Ajouter une intégration

1. Éditez `truth_pack.json`
2. Ajoutez un objet dans `integrations[]`
3. Incluez au moins 2 éléments dans `evidence[]`
4. Rafraîchissez la page

### Modifier le style

1. Éditez `styles.css`
2. Les variables CSS sont dans `:root`
3. Les couleurs principales : `--color-primary`, `--color-secondary`

### Ajouter une section

1. Ajoutez le HTML dans `index.html`
2. Ajoutez le renderer dans `app.js` (pattern `Renderer.maSection(data)`)
3. Appelez le renderer dans `DOMContentLoaded`

---

## Crédits

- **Projet** : SAVQonnect v6.1-BETA
- **Organisation** : UQAM - Service de l'audiovisuel
- **Générateur** : OpenSpec create-web-intro-v1
- **Date** : 2026-02-02

---

*Toutes les fonctionnalités présentées sont vérifiables dans le code source du repository.*
