import { useState } from 'react'

export default function ContexteBanner({ data, editable, onUpdate }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState('')

  function startEdit() {
    setDraft(data.texte)
    setEditing(true)
  }

  function save() {
    onUpdate({ ...data, texte: draft })
    setEditing(false)
  }

  if (editable && editing) {
    return (
      <div className="ctx">
        <textarea
          value={draft}
          onChange={e => setDraft(e.target.value)}
          rows={4}
          style={{ width: '100%', boxSizing: 'border-box', marginBottom: 8, fontSize: '13px' }}
        />
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-primary btn-sm" onClick={save}>Enregistrer</button>
          <button className="btn btn-ghost btn-sm" onClick={() => setEditing(false)}>Annuler</button>
        </div>
      </div>
    )
  }

  return (
    <div
      className="ctx"
      onClick={editable ? startEdit : undefined}
      title={editable ? 'Cliquer pour éditer' : undefined}
      style={editable ? { cursor: 'pointer', outline: '1px dashed var(--b300)', borderRadius: 4 } : {}}
    >
      {data.texte}
      {editable && <span style={{ marginLeft: 8, opacity: 0.4, fontSize: '11px' }}>✏️</span>}
    </div>
  )
}
