# Contexte projet — Météo Projet D365 / AS400

## Rôle et objectif

Tu travailles sur une **application web React + Supabase** permettant à un coordinateur technique de gérer dynamiquement un tableau de bord "météo projet" pour un programme D365 en cohabitation avec AS400.

L'application remplace un fichier HTML statique (déjà produit, disponible dans le repo : `meteo_projet_d365_as400_v3.html`) par une interface éditable, persistée en base de données, partageable par URL.

---

## Contexte métier

**Programme** : Migration / cohabitation Microsoft D365 + AS400  
**Périmètre** : Import base de données centrale Articles et Fournisseurs vers AS400 CP via Talend et DMF  
**Géographies** : Togo (mise en conformité prioritaire) + FSA (déploiement global 2026–2027)  
**Rôle utilisateur** : Coordinateur technique programme — interface DSI ↔ Métier BPO

### Stratégie Lot 1 / Lot 2

**Lot 1 — Design AS IS Legacy** (en exécution)
- S'appuie sur les interfaces existantes
- Flux articles & fournisseurs → AS400 via Talend / DMF
- Sans dépendances D365
- Prix d'achat volontairement exclu

**Lot 2 — Design D365 + mapping complet** (à structurer)
- Intègre flux D365, règles de gestion, harmonisation BPO
- Cadrage complet du prix d'achat
- Dépend des arbitrages métier encore ouverts

---

## Structure de la météo projet

La météo est organisée en **6 axes** + **1 indicateur global** :

### Indicateur global
- 4 niveaux : ☀️ Ensoleillé / ⛅ Partiellement nuageux / ☁️ Nuageux / 🌧️ Risque de pluie
- Météo actuelle : ⛅ Partiellement nuageux

### Axe 1 — Périmètre
- Statut : info (bleu)
- Items : flux in-scope Lot 1, hors-scope Lot 1, géographies

### Axe 2 — Planning
- Statut : warn (orange)
- Items : tâches Lot 1 immédiates, tâches Lot 2 court terme

### Axe 3 — Qualité
- Statut : warn (orange)
- Items : règles mapping articles/fournisseurs, cas de tests

### Axe 4 — Communication
- Statut : info (bleu)
- Items : parties prenantes, référentiel unique de suivi

### Axe 5 — Ressources ⚠️ (axe le plus complexe)
- Statut : warn (orange)
- Équipe AS400 : multi-projets, capacité 85%+
- Spec Fournisseurs : 90% ✔ (dev AS400 débloqué)
- Spec Articles : 25–50% (dev AS400 bloqué jusqu'à 80%)
- Séquencement : validation champs AS400 par Data qualité/Métier avant tout dev
- Atelier + Jira Talend : dès semaine 18
- Timeline : S15 → S20+

### Axe 6 — Risques
- Statut : risk (rouge)
- Risques majeurs : proposition HSO non satisfaisante, AS400 multi-projets, prix d'achat non arbitré
- Risques secondaires : double design, surcharge Talend/DMF, dérive ateliers D365

---

## Plan d'action (5 chantiers)

1. **Sécuriser Lot 1** — exécution directe (Design AS IS, flux Talend, revue hebdo 15 min)
2. **Structurer Lot 2** — pilotage coordination (mapping BPO, carte impacts D365→AS400, ateliers timebox)
3. **Cadrer le Prix d'achat** — blocage potentiel (sources, scénarios, arbitrage formel)
4. **Aligner DSI ↔ Métier BPO** — zone de valeur (1 référentiel, décisions → impact technique)
5. **Contrôle hebdomadaire** — reporting simple et technique, pas un PMO

---

## Stack technique

```
Frontend  : React 18 + Vite
BDD + Auth: Supabase (PostgreSQL)
Hosting   : Vercel
Client SDK: @supabase/supabase-js
```

### Variables d'environnement (`.env.local`)
```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

---

## Schéma base de données Supabase

### Table `projets`
```sql
create table projets (
  id uuid default gen_random_uuid() primary key,
  nom text not null,
  description text,
  meteo text check (meteo in ('soleil','nuageux_partiel','nuageux','pluie')) default 'nuageux_partiel',
  lot_actif text check (lot_actif in ('lot1','lot2','les_deux')) default 'lot1',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

### Table `axes`
```sql
create table axes (
  id uuid default gen_random_uuid() primary key,
  projet_id uuid references projets(id) on delete cascade,
  nom text not null,         -- 'perimetre','planning','qualite','communication','ressources','risques'
  statut text check (statut in ('ok','warn','risk','info')) default 'info',
  ordre int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

### Table `items`
```sql
create table items (
  id uuid default gen_random_uuid() primary key,
  axe_id uuid references axes(id) on delete cascade,
  texte text not null,
  couleur text check (couleur in ('bleu','vert','orange','rouge','teal','violet')) default 'bleu',
  lot text check (lot in ('lot1','lot2','les_deux')) default 'lot1',
  ordre int default 0,
  created_at timestamptz default now()
);
```

### Table `ressources`
```sql
create table ressources (
  id uuid default gen_random_uuid() primary key,
  projet_id uuid references projets(id) on delete cascade,
  nom text not null,          -- 'AS400','Talend/DMF','Fonctionnel','Data qualité','Coordination'
  occupation int check (occupation between 0 and 100) default 0,
  alerte boolean default false,
  note text,
  updated_at timestamptz default now()
);
```

### Table `specs`
```sql
create table specs (
  id uuid default gen_random_uuid() primary key,
  projet_id uuid references projets(id) on delete cascade,
  nom text not null,          -- 'Fournisseurs','Articles'
  avancement int check (avancement between 0 and 100) default 0,
  seuil_dev int default 80,
  statut text check (statut in ('bloque','en_cours','pret')) default 'en_cours',
  updated_at timestamptz default now()
);
```

### Table `historique`
```sql
create table historique (
  id uuid default gen_random_uuid() primary key,
  projet_id uuid references projets(id) on delete cascade,
  semaine text not null,      -- ex: '2026-S15'
  meteo text not null,
  snapshot jsonb,             -- snapshot complet de la météo à cette date
  commentaire text,
  created_at timestamptz default now()
);
```

---

## Structure de fichiers cible

```
meteo-projet/
├── public/
├── src/
│   ├── components/
│   │   ├── MeteoHeader.jsx       -- titre, indicateur météo, sélecteur
│   │   ├── ContexteBanner.jsx    -- bandeau contexte Lot 1 / Lot 2
│   │   ├── LotsGrid.jsx          -- 2 cartes Lot 1 / Lot 2
│   │   ├── AlerteBanner.jsx      -- bandeau points d'attention
│   │   ├── AxeCard.jsx           -- carte générique pour chaque axe
│   │   ├── RessourcesCard.jsx    -- carte ressources étendue (occupation + specs + timeline)
│   │   ├── PlanAction.jsx        -- liste des 5 chantiers
│   │   └── PointsValidation.jsx  -- encart points à valider
│   ├── pages/
│   │   ├── Dashboard.jsx         -- vue lecture (partageable par URL)
│   │   └── Editor.jsx            -- vue édition (authentifiée)
│   ├── hooks/
│   │   ├── useProjet.js          -- fetch/update projet
│   │   ├── useAxes.js            -- fetch/update axes et items
│   │   └── useRessources.js      -- fetch/update ressources et specs
│   ├── supabaseClient.js
│   ├── App.jsx
│   └── main.jsx
├── .env.local
├── CLAUDE.md                     -- ce fichier
└── package.json
```

---

## Comportement attendu de l'application

### Vue Dashboard (publique, `/dashboard`)
- Affichage complet de la météo en lecture seule
- Identique visuellement au fichier `meteo_projet_d365_as400_v3.html`
- URL partageable pour COPIL / parties prenantes

### Vue Éditeur (authentifiée, `/editor`)
- Modifier l'indicateur météo global (clic sur les 4 icônes)
- Modifier le statut de chaque axe (ok / warn / risk / info)
- Ajouter / modifier / supprimer des items dans chaque axe
- Modifier les pourcentages d'occupation ressources
- Modifier les avancements specs (Fournisseurs / Articles)
- Sauvegarder un snapshot hebdomadaire dans `historique`
- Bouton "Exporter HTML" pour générer une version statique

### Authentification
- Login simple email/password via Supabase Auth
- 1 seul compte admin dans un premier temps
- Pas de gestion multi-rôles pour la V1

---

## Conventions de code

- Composants en PascalCase, hooks en camelCase prefixés `use`
- CSS : Tailwind CSS (à installer) ou CSS modules — à décider
- Pas de Redux — état local React + hooks Supabase suffisent
- Commits en français, conventionnel : `feat:`, `fix:`, `refactor:`, `chore:`
- Toujours créer le `.env.local` avant de tester en local

---

## Commandes utiles

```bash
npm run dev          # démarrage local
npm run build        # build production
npm run preview      # prévisualisation du build
git add . && git commit -m "feat: ..." && git push   # commit + push
```

---

## Priorité de développement (V1)

1. `supabaseClient.js` + connexion testée
2. Schéma SQL créé dans Supabase
3. `useProjet.js` — lecture du projet depuis Supabase
4. `Dashboard.jsx` — affichage statique branché sur les données réelles
5. `Editor.jsx` — modification météo globale + statuts axes
6. Modification items (ajout / suppression)
7. Modification ressources (occupation + specs)
8. Snapshot historique
9. Export HTML
10. Déploiement Vercel
