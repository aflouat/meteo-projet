import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { AXES_INITIAL, ITEMS_INITIAL } from '../data/initialData'

export function useAxes(projetId) {
  const [axes, setAxes] = useState(AXES_INITIAL)
  const [items, setItems] = useState(ITEMS_INITIAL)
  const [loading, setLoading] = useState(!!supabase)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!supabase || !projetId || projetId === 'local') return
    fetchAxes(projetId)
  }, [projetId])

  async function fetchAxes(id) {
    setLoading(true)
    const { data: axesData, error: axesErr } = await supabase
      .from('axes')
      .select('*')
      .eq('projet_id', id)
      .order('ordre')

    if (axesErr) { setError(axesErr.message); setLoading(false); return }

    const axeIds = axesData.map(a => a.id)
    const { data: itemsData, error: itemsErr } = await supabase
      .from('items')
      .select('*')
      .in('axe_id', axeIds)
      .order('ordre')

    if (itemsErr) { setError(itemsErr.message); setLoading(false); return }

    setAxes(axesData)
    setItems(itemsData)
    setLoading(false)
  }

  async function updateStatut(axeId, statut) {
    setAxes(prev => prev.map(a => a.id === axeId ? { ...a, statut } : a))
    if (!supabase) return
    const axe = axes.find(a => a.id === axeId)
    if (!axe || axe.projet_id === 'local') return
    await supabase.from('axes').update({ statut, updated_at: new Date().toISOString() }).eq('id', axeId)
  }

  async function addItem(axeId, texte, couleur = 'bleu', lot = 'lot1') {
    const maxOrdre = items.filter(i => i.axe_id === axeId).reduce((m, i) => Math.max(m, i.ordre), 0)
    const newItem = { id: crypto.randomUUID(), axe_id: axeId, texte, couleur, lot, ordre: maxOrdre + 1 }

    if (supabase) {
      const axe = axes.find(a => a.id === axeId)
      if (axe && axe.projet_id !== 'local') {
        const { data, error } = await supabase.from('items').insert(newItem).select().single()
        if (!error && data) { setItems(prev => [...prev, data]); return }
      }
    }
    setItems(prev => [...prev, newItem])
  }

  async function deleteItem(itemId) {
    setItems(prev => prev.filter(i => i.id !== itemId))
    if (!supabase) return
    await supabase.from('items').delete().eq('id', itemId)
  }

  async function updateItem(itemId, changes) {
    setItems(prev => prev.map(i => i.id === itemId ? { ...i, ...changes } : i))
    if (!supabase) return
    await supabase.from('items').update(changes).eq('id', itemId)
  }

  return { axes, items, loading, error, updateStatut, addItem, deleteItem, updateItem }
}
