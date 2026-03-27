import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

export function useHistorique(projetId) {
  const [historique, setHistorique] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!projetId || projetId === 'local' || !supabase) {
      setLoading(false)
      return
    }
    supabase
      .from('historique')
      .select('*')
      .eq('projet_id', projetId)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error) setHistorique(data || [])
        setLoading(false)
      })
  }, [projetId])

  async function deleteSnapshot(id) {
    setHistorique(prev => prev.filter(h => h.id !== id))
    if (supabase) await supabase.from('historique').delete().eq('id', id)
  }

  return { historique, loading, deleteSnapshot }
}
