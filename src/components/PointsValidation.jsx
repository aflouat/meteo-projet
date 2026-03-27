export default function PointsValidation() {
  return (
    <div className="val-box">
      <div className="val-box-title">🔍 Points à valider avant communication</div>
      <div className="val-box-item">
        <span className="vnum">1</span>
        <span>Valider officiellement le <strong>découpage Lot 1 / Lot 2</strong> comme stratégie programme</span>
      </div>
      <div className="val-box-item">
        <span className="vnum">2</span>
        <span>Confirmer que le <strong>prix d'achat reste hors Lot 1</strong> et traité uniquement dans Lot 2</span>
      </div>
      <div className="val-box-item">
        <span className="vnum">3</span>
        <span>Décider de l'ajout d'une slide <strong>enjeux D365 → AS400</strong> pour renforcer le positionnement COPIL</span>
      </div>
    </div>
  )
}
