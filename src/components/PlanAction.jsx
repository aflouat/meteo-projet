const ACTIONS = [
  {
    num: 1, cls: 'n1',
    title: 'Sécuriser le Lot 1', tag: 'tg', tagTxt: 'Exécution directe',
    obj: 'Finaliser Design AS IS · Verrouiller flux Talend · Documenter hors-scope · Revue hebdo 15 min DSI ↔ Talend',
    goal: 'Permettre le développement sans dépendre de D365', goalColor: 'var(--g600)',
  },
  {
    num: 2, cls: 'n2',
    title: 'Structurer le Lot 2', tag: 'tb', tagTxt: 'Pilotage coordination',
    obj: 'Recenser règles mapping manquantes avec BPO · Carte impacts D365→AS400 · Ateliers timebox',
    goal: 'Cadrer D365 sans retarder AS400', goalColor: 'var(--b600)',
  },
  {
    num: 3, cls: 'n3',
    title: "Cadrer le Prix d'achat", tag: 'tr', tagTxt: 'Blocage potentiel',
    obj: "Clarifier sources D365/OPEX/Legacy · Scénarios + impacts au métier · Arbitrage formel avant Lot 2",
    goal: 'Éviter une remise à plat tardive', goalColor: 'var(--r600)',
  },
  {
    num: 4, cls: 'n4',
    title: 'Aligner DSI ↔ Métier BPO', tag: 'ta', tagTxt: 'Zone de valeur',
    obj: '1 référentiel de suivi unique · Décisions métier → impact technique · Escalades ciblées uniquement',
    goal: 'Maîtrise des interfaces — éviter le chaos', goalColor: 'var(--a600)',
  },
  {
    num: 5, cls: 'n5',
    title: 'Contrôle hebdomadaire', tag: null, tagTxt: 'Reporting',
    obj: "Charge AS400 & Talend/DMF · Arbitrages métier (prix d'achat) · Avancement spec Articles · Météo mise à jour",
    goal: 'Reporting simple et technique — pas un PMO', goalColor: 'var(--gr600)',
  },
]

export default function PlanAction() {
  return (
    <>
      <div className="sec-lbl">Plan d'action — 5 chantiers</div>
      <div className="actions">
        {ACTIONS.map(a => (
          <div className="act" key={a.num}>
            <div className={`act-num ${a.cls}`}>{a.num}</div>
            <div>
              <div className="act-title">
                {a.title}{' '}
                <span className={`tag ${a.tag || ''}`} style={!a.tag ? {background:'var(--gr50)',color:'var(--gr600)',marginLeft:4} : {marginLeft:4}}>
                  {a.tagTxt}
                </span>
              </div>
              <div className="act-obj">{a.obj}</div>
              <div style={{fontSize:'11px',color:a.goalColor,marginTop:'3px'}}>🎯 {a.goal}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
