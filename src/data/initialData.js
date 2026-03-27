export const PROJET_INITIAL = {
  id: 'local',
  nom: 'D365 / AS400 — Référentiel Articles & Fournisseurs',
  description: 'Coordinateur technique programme · Mars 2026 · Stratégie Lot 1 / Lot 2',
  meteo: 'nuageux_partiel',
  lot_actif: 'les_deux',
}

export const AXES_INITIAL = [
  { id: 'perimetre', projet_id: 'local', nom: 'perimetre', statut: 'info', ordre: 1 },
  { id: 'planning', projet_id: 'local', nom: 'planning', statut: 'warn', ordre: 2 },
  { id: 'qualite', projet_id: 'local', nom: 'qualite', statut: 'warn', ordre: 3 },
  { id: 'communication', projet_id: 'local', nom: 'communication', statut: 'info', ordre: 4 },
  { id: 'risques', projet_id: 'local', nom: 'risques', statut: 'risk', ordre: 6 },
]

export const ITEMS_INITIAL = [
  // Périmètre
  { id: 'p1', axe_id: 'perimetre', texte: 'Articles → AS400 via Talend / DMF', couleur: 'vert', lot: 'lot1', ordre: 1 },
  { id: 'p2', axe_id: 'perimetre', texte: 'Fournisseurs → AS400 via Talend / DMF', couleur: 'vert', lot: 'lot1', ordre: 2 },
  { id: 'p3', axe_id: 'perimetre', texte: "Prix d'achat (Lot 2 uniquement)", couleur: 'rouge', lot: 'lot1', ordre: 3 },
  { id: 'p4', axe_id: 'perimetre', texte: 'Flux D365 — reporté Lot 2', couleur: 'rouge', lot: 'lot1', ordre: 4 },
  // Planning
  { id: 'pl1', axe_id: 'planning', texte: 'Finaliser & publier Design AS IS', couleur: 'vert', lot: 'lot1', ordre: 1 },
  { id: 'pl2', axe_id: 'planning', texte: 'Verrouiller flux utilisables par Talend', couleur: 'vert', lot: 'lot1', ordre: 2 },
  { id: 'pl3', axe_id: 'planning', texte: 'Revue hebdo 15 min DSI ↔ Talend', couleur: 'vert', lot: 'lot1', ordre: 3 },
  { id: 'pl4', axe_id: 'planning', texte: 'Ateliers D365 en mode timebox', couleur: 'bleu', lot: 'lot2', ordre: 4 },
  { id: 'pl5', axe_id: 'planning', texte: 'Carte impacts D365 → AS400', couleur: 'bleu', lot: 'lot2', ordre: 5 },
  // Qualité
  { id: 'q1', axe_id: 'qualite', texte: 'Règles mapping articles — Lot 1 à formaliser', couleur: 'orange', lot: 'lot1', ordre: 1 },
  { id: 'q2', axe_id: 'qualite', texte: 'Règles mapping fournisseurs — Lot 1 à formaliser', couleur: 'orange', lot: 'lot1', ordre: 2 },
  { id: 'q3', axe_id: 'qualite', texte: 'Règles gestion D365 + BPO — Lot 2', couleur: 'bleu', lot: 'lot2', ordre: 3 },
  { id: 'q4', axe_id: 'qualite', texte: 'Cas de tests Lot 1 à rédiger', couleur: 'vert', lot: 'lot1', ordre: 4 },
  // Communication
  { id: 'c1', axe_id: 'communication', texte: 'Équipe projet — suivi hebdo Lot 1 / Lot 2', couleur: 'bleu', lot: 'les_deux', ordre: 1 },
  { id: 'c2', axe_id: 'communication', texte: 'Métiers — diffusion reste à faire & impacts', couleur: 'bleu', lot: 'les_deux', ordre: 2 },
  { id: 'c3', axe_id: 'communication', texte: 'COPIL — slide enjeux D365→AS400 à préparer', couleur: 'bleu', lot: 'les_deux', ordre: 3 },
  { id: 'c4', axe_id: 'communication', texte: '1 doc de suivi light orienté interfaces', couleur: 'teal', lot: 'les_deux', ordre: 4 },
  { id: 'c5', axe_id: 'communication', texte: 'Décisions métier → impact technique concret', couleur: 'teal', lot: 'les_deux', ordre: 5 },
  // Risques
  { id: 'r1', axe_id: 'risques', texte: 'AS400 multi-projets → capacité critique, créneau dev à sécuriser tôt', couleur: 'rouge', lot: 'les_deux', ordre: 1 },
  { id: 'r2', axe_id: 'risques', texte: 'Révision métier impactant périmètre Lot 2', couleur: 'rouge', lot: 'lot2', ordre: 2 },
  { id: 'r3', axe_id: 'risques', texte: 'Double design si périmètre instable', couleur: 'rouge', lot: 'lot2', ordre: 3 },
  { id: 'r4', axe_id: 'risques', texte: "Prix d'achat non arbitré → blocage Lot 2", couleur: 'rouge', lot: 'lot2', ordre: 4 },
  { id: 'r5', axe_id: 'risques', texte: 'Surcharge Talend/DMF → glissement Lot 1', couleur: 'orange', lot: 'lot1', ordre: 5 },
  { id: 'r6', axe_id: 'risques', texte: 'Dérive fonctionnelle ateliers D365', couleur: 'orange', lot: 'lot2', ordre: 6 },
]

export const RESSOURCES_INITIAL = [
  { id: 'res1', projet_id: 'local', nom: 'AS400', occupation: 85, alerte: true, note: 'Multi-projets' },
  { id: 'res2', projet_id: 'local', nom: 'Talend / DMF', occupation: 80, alerte: false, note: null },
  { id: 'res3', projet_id: 'local', nom: 'Fonctionnel', occupation: 65, alerte: false, note: null },
  { id: 'res4', projet_id: 'local', nom: 'Data qualité', occupation: 55, alerte: false, note: null },
  { id: 'res5', projet_id: 'local', nom: 'Coordination', occupation: 70, alerte: false, note: null },
]

export const SPECS_INITIAL = [
  { id: 'spec1', projet_id: 'local', nom: 'Fournisseurs', avancement: 90, seuil_dev: 80, statut: 'pret' },
  { id: 'spec2', projet_id: 'local', nom: 'Articles', avancement: 37, seuil_dev: 80, statut: 'en_cours' },
]

export const BLOCS_DEFAULTS = {
  contexte: {
    texte: "Le chantier Référentiel (Articles / Fournisseurs) nécessite d'avancer simultanément côté AS400/Talend et côté D365, malgré des arbitrages métier encore ouverts (dont le prix d'achat). Pour éviter un blocage global, un découpage en deux lots successifs est proposé et soumis à validation.",
  },
  alerte: {
    titre: "Points d'attention clés",
    items: [
      "Risque de révision métier impactant Lot 2 → coordination renforcée DSI ↔ BPO",
      "Risque de double design si le périmètre évolue en cours de route",
      "Prix d'achat à arbitrer formellement avant fin Lot 2",
      "Charge Talend / DMF sous tension · Équipe AS400 multi-projets → capacité critique",
    ],
  },
  lots: {
    lot1: {
      badge: '✦ Lot 1 — Design AS IS Legacy',
      titre: 'Avancer immédiatement côté Talend / AS400',
      tag: 'En exécution',
      items: [
        { check: true, texte: "S'appuie sur les interfaces existantes" },
        { check: true, texte: 'Démarrage immédiat — sans dépendances D365' },
        { check: true, texte: 'Flux articles & fournisseurs → AS400 via Talend / DMF' },
        { check: false, texte: "Prix d'achat volontairement exclu" },
      ],
    },
    lot2: {
      badge: '◈ Lot 2 — Design D365 + mapping complet',
      titre: 'Finaliser le modèle cible avec D365',
      tag: 'À structurer',
      items: [
        { check: true, texte: 'Intègre flux D365, règles de gestion, harmonisation BPO' },
        { check: true, texte: 'Finalise le modèle cible complet' },
        { check: true, texte: 'Cadrage complet du prix d\'achat' },
        { check: false, texte: 'Dépend des arbitrages métier — à piloter' },
      ],
    },
  },
  plan_actions: {
    actions: [
      { num: 1, cls: 'n1', title: 'Sécuriser le Lot 1', tag: 'tg', tagTxt: 'Exécution directe', obj: 'Finaliser Design AS IS · Verrouiller flux Talend · Documenter hors-scope · Revue hebdo 15 min DSI ↔ Talend', goal: 'Permettre le développement sans dépendre de D365', goalColor: 'var(--g600)' },
      { num: 2, cls: 'n2', title: 'Structurer le Lot 2', tag: 'tb', tagTxt: 'Pilotage coordination', obj: 'Recenser règles mapping manquantes avec BPO · Carte impacts D365→AS400 · Ateliers timebox', goal: 'Cadrer D365 sans retarder AS400', goalColor: 'var(--b600)' },
      { num: 3, cls: 'n3', title: "Cadrer le Prix d'achat", tag: 'tr', tagTxt: 'Blocage potentiel', obj: "Clarifier sources D365/OPEX/Legacy · Scénarios + impacts au métier · Arbitrage formel avant Lot 2", goal: 'Éviter une remise à plat tardive', goalColor: 'var(--r600)' },
      { num: 4, cls: 'n4', title: 'Aligner DSI ↔ Métier BPO', tag: 'ta', tagTxt: 'Zone de valeur', obj: '1 référentiel de suivi unique · Décisions métier → impact technique · Escalades ciblées uniquement', goal: 'Maîtrise des interfaces — éviter le chaos', goalColor: 'var(--a600)' },
      { num: 5, cls: 'n5', title: 'Contrôle hebdomadaire', tag: null, tagTxt: 'Reporting', obj: "Charge AS400 & Talend/DMF · Arbitrages métier (prix d'achat) · Avancement spec Articles · Météo mise à jour", goal: 'Reporting simple et technique — pas un PMO', goalColor: 'var(--gr600)' },
    ],
  },
  points_validation: {
    titre: '🔍 Points à valider avant communication',
    items: [
      'Valider officiellement le découpage Lot 1 / Lot 2 comme stratégie programme',
      "Confirmer que le prix d'achat reste hors Lot 1 et traité uniquement dans Lot 2",
      "Décider de l'ajout d'une slide enjeux D365 → AS400 pour renforcer le positionnement COPIL",
    ],
  },
}
