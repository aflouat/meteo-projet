import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { PROJET_INITIAL } from '../data/initialData'

export function useProjet() {
  const [projet, setProjet] = useState(PROJET_INITIAL)
  const [loading, setLoading] = useState(!!supabase)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!supabase) return
    fetchProjet()
  }, [])

  async function fetchProjet() {
    setLoading(true)
    const { data, error } = await supabase
      .from('projets')
      .select('*')
      .limit(1)
      .single()
    if (error) {
      setError(error.message)
    } else if (data) {
      setProjet(data)
    }
    setLoading(false)
  }

  async function updateMeteo(meteo) {
    setProjet(p => ({ ...p, meteo }))
    if (!supabase || projet.id === 'local') return
    await supabase.from('projets').update({ meteo, updated_at: new Date().toISOString() }).eq('id', projet.id)
  }

  return { projet, loading, error, updateMeteo, refetch: fetchProjet }
}
