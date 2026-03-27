import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { BLOCS_DEFAULTS } from '../data/initialData'

export function useBlocs(projetId) {
  const [blocs, setBlocs] = useState(BLOCS_DEFAULTS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!projetId || projetId === 'local' || !supabase) {
      setLoading(false)
      return
    }
    supabase
      .from('blocs')
      .select('*')
      .eq('projet_id', projetId)
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          const merged = { ...BLOCS_DEFAULTS }
          data.forEach(b => { merged[b.cle] = b.contenu })
          setBlocs(merged)
        }
        setLoading(false)
      })
  }, [projetId])

  async function updateBloc(cle, contenu) {
    setBlocs(prev => ({ ...prev, [cle]: contenu }))
    if (!supabase || !projetId || projetId === 'local') return
    await supabase
      .from('blocs')
      .upsert(
        { projet_id: projetId, cle, contenu, updated_at: new Date().toISOString() },
        { onConflict: 'projet_id,cle' }
      )
  }

  return { blocs, loading, updateBloc }
}
