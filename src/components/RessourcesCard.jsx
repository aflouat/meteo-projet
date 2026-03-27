function occColor(pct) {
  if (pct >= 85) return 'var(--r600)'
  if (pct >= 75) return 'var(--a600)'
  return 'var(--b600)'
}

export default function RessourcesCard({ ressources, specs, editable, onRessourceChange, onSpecChange }) {
  return (
    <>
      <div className="sec-lbl">Ressources — capacité &amp; séquencement</div>
      <div className="card-wide">
        <div className="res-inner">

          {/* COL GAUCHE */}
          <div>
            <div className="sl" style={{marginTop:0}}>Occupation estimée</div>
            <div style={{background:'var(--r50)',border:'0.5px solid var(--r100)',borderRadius:'6px',padding:'6px 9px',marginBottom:'8px',fontSize:'11.5px',color:'var(--r800)'}}>
              ⚠️ <strong>Équipe AS400 multi-projets</strong> — capacité partagée. Aucun dev AS400 avant validation spec.
            </div>

            {ressources.map(r => (
              <div className="occ-row" key={r.id}>
                <span className="occ-label">{r.nom}</span>
                <div className="occ-bg">
                  <div className="occ-fill" style={{width:`${r.occupation}%`,background:occColor(r.occupation)}}></div>
                </div>
                {editable ? (
                  <input
                    type="number"
                    className="occ-input"
                    min={0} max={100}
                    value={r.occupation}
                    onChange={e => onRessourceChange(r.id, Number(e.target.value))}
                  />
                ) : (
                  <span className="occ-val" style={{color:occColor(r.occupation)}}>{r.occupation}%{r.alerte ? '+' : ''}</span>
                )}
              </div>
            ))}

            <div className="sl">Avancement specs — seuils déclencheurs dev AS400</div>
            {specs.map(s => {
              const isPret = s.avancement >= s.seuil_dev
              return (
                <div className="spec-row" key={s.id}>
                  <div className="spec-head">
                    <span className="spec-name">{s.nom}</span>
                    <span className="spec-status" style={{color: isPret ? 'var(--g600)' : 'var(--a600)'}}>
                      {s.avancement}% {isPret ? '✔ Dev AS400 débloqué' : '⚡ En cours'}
                    </span>
                  </div>
                  <div className="spec-bg">
                    <div className="spec-fill" style={{width:`${s.avancement}%`,background: isPret ? 'var(--g600)' : 'var(--a600)'}}></div>
                    <div className="spec-target" style={{left:`${s.seuil_dev}%`}}></div>
                  </div>
                  <div className="spec-hint">
                    Seuil requis {s.seuil_dev}% — {isPret ? 'atteint ✔' : `dev AS400 ${s.nom} bloqué jusqu'à atteinte`}
                  </div>
                  {editable && (
                    <input
                      type="range"
                      min={0} max={100}
                      value={s.avancement}
                      onChange={e => onSpecChange(s.id, Number(e.target.value))}
                      style={{width:'100%',marginTop:'4px'}}
                    />
                  )}
                </div>
              )
            })}
          </div>

          {/* COL DROITE */}
          <div>
            <div className="sl" style={{marginTop:0}}>Séquencement — prérequis &amp; déclencheurs</div>
            <div className="dep-chain">
              <div className="dep-step done">
                <div className="dep-num">1</div>
                <div className="dep-body">
                  <div className="dep-title">Spec Fournisseurs à 90% ✔</div>
                  <div className="dep-sub">Seuil atteint — champs AS400 prêts pour validation</div>
                </div>
              </div>
              <div className="dep-arrow">↓</div>
              <div className="dep-step validate">
                <div className="dep-num">2</div>
                <div className="dep-body">
                  <div className="dep-title">Validation champs AS400 — Data qualité &amp; Métier</div>
                  <div className="dep-sub">Revue croisée types / règles / valeurs · Matrice signée avant dev</div>
                </div>
              </div>
              <div className="dep-arrow">↓</div>
              <div className="dep-step inprog">
                <div className="dep-num">3</div>
                <div className="dep-body">
                  <div className="dep-title">Spec Articles → seuil 80% (en cours)</div>
                  <div className="dep-sub">Dev AS400 Articles bloqué jusqu'à atteinte du seuil</div>
                </div>
              </div>
              <div className="dep-arrow">↓</div>
              <div className="dep-step planned">
                <div className="dep-num">4</div>
                <div className="dep-body">
                  <div className="dep-title">Atelier Talend + création Jira — dès S18</div>
                  <div className="dep-sub">Stories, critères d'acceptation · Dev Talend après atelier</div>
                </div>
              </div>
              <div className="dep-arrow">↓</div>
              <div className="dep-step blocked">
                <div className="dep-num">5</div>
                <div className="dep-body">
                  <div className="dep-title">Dev AS400 — après spec ≥ 80% + champs validés</div>
                  <div className="dep-sub">Créneau à réserver selon capacité multi-projets</div>
                </div>
              </div>
            </div>

            <div className="tl-wrap">
              <div className="sl" style={{marginTop:0,marginBottom:'6px'}}>Séquence planning indicative</div>
              <div className="tl-head">
                <div></div>
                <div className="tl-weeks"><span>S15</span><span>S16</span><span>S17</span><span>S18</span><span>S19</span><span>S20+</span></div>
              </div>
              <div className="tl-row">
                <div className="tl-label">Spec Fournisseurs</div>
                <div className="tl-bar-wrap"><div className="tl-bar" style={{left:0,width:'55%',background:'var(--g100)',color:'var(--g800)'}}>Finalisée 90% ✔</div></div>
              </div>
              <div className="tl-row">
                <div className="tl-label">Spec Articles</div>
                <div className="tl-bar-wrap"><div className="tl-bar" style={{left:0,width:'45%',background:'var(--a100)',color:'var(--a800)'}}>En cours → 80%</div></div>
              </div>
              <div className="tl-row">
                <div className="tl-label">Valid. champs AS400</div>
                <div className="tl-bar-wrap"><div className="tl-bar" style={{left:'10%',width:'28%',background:'var(--p100)',color:'var(--p800)'}}>Data qualité</div></div>
              </div>
              <div className="tl-row">
                <div className="tl-label">Atelier + Jira Talend</div>
                <div className="tl-bar-wrap"><div className="tl-bar" style={{left:'50%',width:'48%',background:'var(--b100)',color:'var(--b800)'}}>Dès S18 →</div></div>
              </div>
              <div className="tl-row">
                <div className="tl-label">Dev AS400</div>
                <div className="tl-bar-wrap"><div className="tl-bar" style={{left:'62%',width:'37%',background:'var(--t100)',color:'var(--t800)'}}>Après valid. spec</div></div>
              </div>
            </div>

            <div className="val-strip">
              <div className="val-strip-title">🔍 Validation champs AS400 — Data qualité &amp; Métier</div>
              <div className="vs-item"><span className="vbul"></span><span>Valider type, longueur, valeurs autorisées, règles de gestion pour chaque champ</span></div>
              <div className="vs-item"><span className="vbul"></span><span>Impliquer Data qualité + référents Métier — pas uniquement l'équipe projet</span></div>
              <div className="vs-item"><span className="vbul"></span><span>Livrable : matrice de mapping validée &amp; signée avant tout dev AS400</span></div>
              <div className="vs-item"><span className="vbul"></span><span>Entrée en dev bloquée si champs non validés — éviter les allers-retours</span></div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
