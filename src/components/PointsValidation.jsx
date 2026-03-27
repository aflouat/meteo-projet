import { useState } from 'react'

export default function PointsValidation({ data, editable, onUpdate }) {
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

  function addItem() {
    if (newItem.trim()) {
      setDraftItems(prev => [...prev, newItem.trim()])
      setNewItem('')
    }
  }

  if (editable && editing) {
    return (
      <div className="val-box">
        <div className="val-box-title">{data.titre}</div>
        {draftItems.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 6, alignItems: 'center' }}>
            <span className="vnum">{i + 1}</span>
            <input
              value={item}
              onChange={e => setDraftItems(prev => prev.map((it, idx) => idx === i ? e.target.value : it))}
              style={{ flex: 1, fontSize: '12px' }}
            />
            <button className="btn btn-ghost btn-sm" onClick={() => setDraftItems(prev => prev.filter((_, idx) => idx !== i))}>✕</button>
          </div>
        ))}
        <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
          <input
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addItem()}
            placeholder="Ajouter un point…"
            style={{ flex: 1, fontSize: '12px' }}
          />
          <button className="btn btn-ghost btn-sm" onClick={addItem}>+</button>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-primary btn-sm" onClick={save}>Enregistrer</button>
          <button className="btn btn-ghost btn-sm" onClick={() => setEditing(false)}>Annuler</button>
        </div>
      </div>
    )
  }

  return (
    <div
      className="val-box"
      onClick={editable ? startEdit : undefined}
      title={editable ? 'Cliquer pour éditer' : undefined}
      style={editable ? { cursor: 'pointer', outline: '1px dashed var(--b300)', borderRadius: 6 } : {}}
    >
      <div className="val-box-title">{data.titre}</div>
      {data.items.map((item, i) => (
        <div key={i} className="val-box-item">
          <span className="vnum">{i + 1}</span>
          <span>{item}</span>
        </div>
      ))}
      {editable && <span style={{ opacity: 0.4, fontSize: '11px', marginTop: 4, display: 'block' }}>✏️ Cliquer pour éditer</span>}
    </div>
  )
}
