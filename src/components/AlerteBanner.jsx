export default function AlerteBanner() {
  return (
    <div className="alert alert-red">
      <div style={{fontSize:'15px',flexShrink:0}}>⚠️</div>
      <div>
        <div className="atitle">Points d'attention clés</div>
        <div className="aitem"><span>›</span><span>Risque de <strong>révision métier</strong> impactant Lot 2 → coordination renforcée DSI ↔ BPO</span></div>
        <div className="aitem"><span>›</span><span>Risque de <strong>double design</strong> si le périmètre évolue en cours de route</span></div>
        <div className="aitem"><span>›</span><span><strong>Prix d'achat</strong> à arbitrer formellement avant fin Lot 2</span></div>
        <div className="aitem"><span>›</span><span>Charge <strong>Talend / DMF</strong> sous tension · Équipe <strong>AS400 multi-projets</strong> → capacité critique</span></div>
      </div>
    </div>
  )
}
