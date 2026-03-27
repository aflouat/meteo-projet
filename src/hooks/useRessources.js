import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { RESSOURCES_INITIAL, SPECS_INITIAL } from '../data/initialData'

export function useRessources(projetId) {
  const [ressources, setRessources] = useState(RESSOURCES_INITIAL)
  const [specs, setSpecs] = useState(SPECS_INITIAL)
  const [loading, setLoading] = useState(!!supabase)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!supabase || !projetId || projetId === 'local') return
    fetchRessources(projetId)
  }, [projetId])

  async function fetchRessources(id) {
    setLoading(true)
    const [{ data: resData, error: resErr }, { data: specData, error: specErr }] = await Promise.all([
      supabase.from('ressources').select('*').eq('projet_id', id),
      supabase.from('specs').select('*').eq('projet_id', id),
    ])
    if (resErr || specErr) { setError((resErr || specErr).message); setLoading(false); return }
    if (resData?.length) setRessources(resData)
    if (specData?.length) setSpecs(specData)
    setLoading(false)
  }

  async function updateRessource(id, occupation) {
    setRessources(prev => prev.map(r => r.id === id ? { ...r, occupation } : r))
    if (!supabase) return
    const r = ressources.find(r => r.id === id)
    if (!r || r.projet_id === 'local') return
    await supabase.from('ressources').update({ occupation, updated_at: new Date().toISOString() }).eq('id', id)
  }

  async function updateSpec(id, avancement) {
    setSpecs(prev => prev.map(s => {
      if (s.id !== id) return s
      const statut = avancement >= s.seuil_dev ? 'pret' : avancement === 0 ? 'bloque' : 'en_cours'
      return { ...s, avancement, statut }
    }))
    if (!supabase) return
    const s = specs.find(s => s.id === id)
    if (!s || s.projet_id === 'local') return
    const statut = avancement >= s.seuil_dev ? 'pret' : avancement === 0 ? 'bloque' : 'en_cours'
    await supabase.from('specs').update({ avancement, statut, updated_at: new Date().toISOString() }).eq('id', id)
  }

  return { ressources, specs, loading, error, updateRessource, updateSpec }
}
