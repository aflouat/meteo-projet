import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import Login from './Login'
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

export default function Editor() {
  const [user, setUser] = useState(null)
  const [authChecked, setAuthChecked] = useState(false)
  const [saveStatus, setSaveStatus] = useState(null)
  const [semaine, setSemaine] = useState(() => {
    const now = new Date()
    const startOfYear = new Date(now.getFullYear(), 0, 1)
    const week = Math.ceil(((now - startOfYear) / 86400000 + startOfYear.getDay() + 1) / 7)
    return `${now.getFullYear()}-S${String(week).padStart(2, '0')}`
  })

  const { projet, loading, updateMeteo } = useProjet()
  const { axes, items, updateStatut, addItem, deleteItem, updateItem } = useAxes(projet?.id)
  const { ressources, specs, updateRessource, updateSpec } = useRessources(projet?.id)

  useEffect(() => {
    if (!supabase) {
      setAuthChecked(true)
      return
    }
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setAuthChecked(true)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  async function handleLogout() {
    if (supabase) await supabase.auth.signOut()
    setUser(null)
  }

  async function handleSnapshot() {
    if (!supabase || projet.id === 'local') {
      setSaveStatus('Snapshot local (Supabase non configuré)')
      setTimeout(() => setSaveStatus(null), 3000)
      return
    }
    const snapshot = { projet, axes, items, ressources, specs }
    const { error } = await supabase.from('historique').insert({
      projet_id: projet.id,
      semaine,
      meteo: projet.meteo,
      snapshot,
      commentaire: null,
    })
    if (error) {
      setSaveStatus(`Erreur: ${error.message}`)
    } else {
      setSaveStatus(`Snapshot ${semaine} enregistré ✔`)
    }
    setTimeout(() => setSaveStatus(null), 3000)
  }

  if (!authChecked || loading) return (
    <div className="wrap" style={{textAlign:'center',padding:'40px',color:'var(--text-secondary)'}}>Chargement…</div>
  )

  if (!user && supabase) return <Login onLogin={setUser} />

  const axesOrdered = [...axes].sort((a, b) => a.ordre - b.ordre).filter(a => a.nom !== 'ressources')

  return (
    <div className="wrap">
      <div className="editor-bar">
        <span>✏️ Mode éditeur{!supabase ? ' · mode local (Supabase non configuré)' : ''}</span>
        <div style={{display:'flex',gap:8,alignItems:'center',flexWrap:'wrap'}}>
          <Link to="/" className="btn btn-ghost btn-sm">← Dashboard</Link>
          {user && supabase && (
            <button className="btn btn-ghost btn-sm" onClick={handleLogout}>Déconnexion</button>
          )}
        </div>
      </div>

      <MeteoHeader projet={projet} editable onMeteoChange={updateMeteo} />
      <ContexteBanner />
      <LotsGrid />
      <AlerteBanner />

      <div className="sec-lbl">Suivi par axe</div>
      <div className="grid">
        {axesOrdered.slice(0, 4).map(axe => (
          <AxeCard
            key={axe.id} axe={axe} items={items} editable
            onStatutChange={updateStatut}
            onItemAdd={addItem}
            onItemDelete={deleteItem}
            onItemUpdate={updateItem}
          />
        ))}
        {axesOrdered.slice(4).map(axe => (
          <AxeCard
            key={axe.id} axe={axe} items={items} wide editable
            onStatutChange={updateStatut}
            onItemAdd={addItem}
            onItemDelete={deleteItem}
            onItemUpdate={updateItem}
          />
        ))}
      </div>

      <RessourcesCard
        ressources={ressources} specs={specs} editable
        onRessourceChange={updateRessource}
        onSpecChange={updateSpec}
      />

      <PlanAction />
      <PointsValidation />

      <div className="snapshot-bar">
        <span style={{fontSize:'12px',fontWeight:500,color:'var(--g800)'}}>📸 Snapshot hebdomadaire</span>
        <input
          value={semaine}
          onChange={e => setSemaine(e.target.value)}
          placeholder="ex: 2026-S15"
          style={{width:100}}
        />
        <button className="btn btn-primary btn-sm" onClick={handleSnapshot}>Enregistrer le snapshot</button>
        {saveStatus && <span style={{fontSize:'12px',color:'var(--g600)'}}>{saveStatus}</span>}
      </div>

      <div className="ft">
        <div className="ft-txt">Météo projet · Mode éditeur · Programme D365 / AS400 · v1</div>
        <div className="leg">
          <div className="li"><span className="sd ok"></span> OK</div>
          <div className="li"><span className="sd warn"></span> Attention</div>
          <div className="li"><span className="sd risk"></span> Risque</div>
          <div className="li"><span className="sd info"></span> Info</div>
        </div>
      </div>
    </div>
  )
}
