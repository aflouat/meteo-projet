import { Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import MeteoHeader from '../components/MeteoHeader'
import ContexteBanner from '../components/ContexteBanner'
import LotsGrid from '../components/LotsGrid'
import AlerteBanner from '../components/AlerteBanner'
import AxeCard from '../components/AxeCard'
import RessourcesCard from '../components/RessourcesCard'
import PlanAction from '../components/PlanAction'
import PointsValidation from '../components/PointsValidation'
import { useProjet } from '../hooks/useProjet'
import { useAxes } from '../hooks/useAxes'
import { useRessources } from '../hooks/useRessources'

export default function Dashboard() {
  const { projet, loading } = useProjet()
  const { axes, items } = useAxes(projet?.id)
  const { ressources, specs } = useRessources(projet?.id)

  if (loading) return <div className="wrap" style={{textAlign:'center',padding:'40px',color:'var(--text-secondary)'}}>Chargement…</div>

  const axesOrdered = [...axes].sort((a, b) => a.ordre - b.ordre).filter(a => a.nom !== 'ressources')

  return (
    <div className="wrap">
      <MeteoHeader projet={projet} editable={false} />
      <ContexteBanner />
      <LotsGrid />
      <AlerteBanner />

      <div className="sec-lbl">Suivi par axe</div>
      <div className="grid">
        {axesOrdered.slice(0, 4).map(axe => (
          <AxeCard key={axe.id} axe={axe} items={items} editable={false} />
        ))}
        {axesOrdered.slice(4).map(axe => (
          <AxeCard key={axe.id} axe={axe} items={items} wide editable={false} />
        ))}
      </div>

      <RessourcesCard ressources={ressources} specs={specs} editable={false} />
      <PlanAction />
      <PointsValidation />

      <div className="ft">
        <div className="ft-txt">Météo projet · Mars 2026 · Programme D365 / AS400 · Coordinateur technique · v1</div>
        <div style={{display:'flex',gap:12,alignItems:'center',flexWrap:'wrap'}}>
          <div className="leg">
            <div className="li"><span className="sd ok"></span> OK</div>
            <div className="li"><span className="sd warn"></span> Attention</div>
            <div className="li"><span className="sd risk"></span> Risque</div>
            <div className="li"><span className="sd info"></span> Info</div>
          </div>
          <Link to="/editor" style={{fontSize:'11px',color:'var(--b600)',textDecoration:'none'}}>✏️ Éditer</Link>
          {supabase && (
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => supabase.auth.signOut()}
            >Déconnexion</button>
          )}
        </div>
      </div>
    </div>
  )
}
