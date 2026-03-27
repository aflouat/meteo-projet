export default function LotsGrid() {
  return (
    <div className="lots">
      <div className="lot lot1">
        <div className="lot-badge">✦ Lot 1 — Design AS IS Legacy</div>
        <div className="lot-title">Avancer immédiatement côté Talend / AS400</div>
        <div className="lot-item"><span className="check">✔</span><span>S'appuie sur les interfaces existantes</span></div>
        <div className="lot-item"><span className="check">✔</span><span>Démarrage immédiat — sans dépendances D365</span></div>
        <div className="lot-item"><span className="check">✔</span><span>Flux articles & fournisseurs → AS400 via Talend / DMF</span></div>
        <div className="lot-item"><span className="cross">✘</span><span>Prix d'achat volontairement exclu</span></div>
        <div style={{marginTop:'8px'}}><span className="tag tg">En exécution</span></div>
      </div>
      <div className="lot lot2">
        <div className="lot-badge">◈ Lot 2 — Design D365 + mapping complet</div>
        <div className="lot-title">Finaliser le modèle cible avec D365</div>
        <div className="lot-item"><span className="check">✔</span><span>Intègre flux D365, règles de gestion, harmonisation BPO</span></div>
        <div className="lot-item"><span className="check">✔</span><span>Finalise le modèle cible complet</span></div>
        <div className="lot-item"><span className="check">✔</span><span>Cadrage complet du prix d'achat</span></div>
        <div className="lot-item"><span className="cross">⚡</span><span>Dépend des arbitrages métier — à piloter</span></div>
        <div style={{marginTop:'8px'}}><span className="tag tb">À structurer</span></div>
      </div>
    </div>
  )
}
