import { useState } from 'react'

export default function AlerteBanner({ data, editable, onUpdate }) {
  const [editing, setEditing] = useState(false)
  const [draftItems, setDraftItems] = useState([])
  const [newItem, setNewItem] = useState('')

  function startEdit() {
    setDraftItems([...data.items])
    setEditing(true)
  }

  function save() {
    onUpdate({ ...data, items: draftItems })
    setEditing(false)
  }

  function updateItem(i, v) {
    setDraftItems(prev => prev.map((it, idx) => idx === i ? v : it))
  }

  function removeItem(i) {
    setDraftItems(prev => prev.filter((_, idx) => idx !== i))
  }

  function addItem() {
    if (newItem.trim()) {
      setDraftItems(prev => [...prev, newItem.trim()])
      setNewItem('')
    }
  }

  if (editable && editing) {
    return (
      <div className="alert alert-red">
        <div style={{ fontSize: '15px', flexShrink: 0 }}>⚠️</div>
        <div style={{ width: '100%' }}>
          <div className="atitle" style={{ marginBottom: 8 }}>{data.titre}</div>
          {draftItems.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 4 }}>
              <input
                value={item}
                onChange={e => updateItem(i, e.target.value)}
                style={{ flex: 1, fontSize: '12px' }}
              />
              <button className="btn btn-ghost btn-sm" onClick={() => removeItem(i)}>✕</button>
            </div>
          ))}
          <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
            <input
              value={newItem}
              onChange={e => setNewItem(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addItem()}
              placeholder="Ajouter un point…"
              style={{ flex: 1, fontSize: '12px' }}
            />
            <button className="btn btn-ghost btn-sm" onClick={addItem}>+</button>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <button className="btn btn-primary btn-sm" onClick={save}>Enregistrer</button>
            <button className="btn btn-ghost btn-sm" onClick={() => setEditing(false)}>Annuler</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="alert alert-red"
      onClick={editable ? startEdit : undefined}
      title={editable ? 'Cliquer pour éditer' : undefined}
      style={editable ? { cursor: 'pointer', outline: '1px dashed var(--b300)', borderRadius: 4 } : {}}
    >
      <div style={{ fontSize: '15px', flexShrink: 0 }}>⚠️</div>
      <div>
        <div className="atitle">{data.titre}</div>
        {data.items.map((item, i) => (
          <div key={i} className="aitem"><span>›</span><span>{item}</span></div>
        ))}
        {editable && <span style={{ opacity: 0.4, fontSize: '11px', marginTop: 4, display: 'block' }}>✏️ Cliquer pour éditer</span>}
      </div>
    </div>
  )
}
