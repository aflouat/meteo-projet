import { useState } from 'react'

function ActionEditor({ action, onSave, onCancel }) {
  const [draft, setDraft] = useState({ ...action })

  return (
    <div style={{ padding: '10px 12px', border: '1px solid var(--b300)', borderRadius: 6, display: 'flex', flexDirection: 'column', gap: 6, background: 'var(--surface)' }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <div className={`act-num ${draft.cls}`}>{draft.num}</div>
        <input
          value={draft.title}
          onChange={e => setDraft(p => ({ ...p, title: e.target.value }))}
          placeholder="Titre"
          style={{ flex: 1, fontWeight: 600, fontSize: '13px' }}
        />
      </div>
      <input
        value={draft.tagTxt}
        onChange={e => setDraft(p => ({ ...p, tagTxt: e.target.value }))}
        placeholder="Label tag"
        style={{ fontSize: '12px' }}
      />
      <input
        value={draft.obj}
        onChange={e => setDraft(p => ({ ...p, obj: e.target.value }))}
        placeholder="Objectif / tâches"
        style={{ fontSize: '12px' }}
      />
      <input
        value={draft.goal}
        onChange={e => setDraft(p => ({ ...p, goal: e.target.value }))}
        placeholder="Résultat attendu"
        style={{ fontSize: '12px' }}
      />
      <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
        <button className="btn btn-primary btn-sm" onClick={() => onSave(draft)}>Enregistrer</button>
        <button className="btn btn-ghost btn-sm" onClick={onCancel}>Annuler</button>
      </div>
    </div>
  )
}

export default function PlanAction({ data, editable, onUpdate }) {
  const [editingIdx, setEditingIdx] = useState(null)

  function saveAction(idx, updatedAction) {
    const newActions = data.actions.map((a, i) => i === idx ? updatedAction : a)
    onUpdate({ ...data, actions: newActions })
    setEditingIdx(null)
  }

  return (
    <>
      <div className="sec-lbl">Plan d'action — 5 chantiers</div>
      <div className="actions">
        {data.actions.map((a, idx) => (
          editingIdx === idx ? (
            <ActionEditor
              key={a.num}
              action={a}
              onSave={d => saveAction(idx, d)}
              onCancel={() => setEditingIdx(null)}
            />
          ) : (
            <div
              className="act"
              key={a.num}
              onClick={editable ? () => setEditingIdx(idx) : undefined}
              title={editable ? 'Cliquer pour éditer' : undefined}
              style={editable ? { cursor: 'pointer', outline: '1px dashed var(--b300)', borderRadius: 6 } : {}}
            >
              <div className={`act-num ${a.cls}`}>{a.num}</div>
              <div>
                <div className="act-title">
                  {a.title}{' '}
                  <span
                    className={`tag ${a.tag || ''}`}
                    style={!a.tag ? { background: 'var(--gr50)', color: 'var(--gr600)', marginLeft: 4 } : { marginLeft: 4 }}
                  >
                    {a.tagTxt}
                  </span>
                </div>
                <div className="act-obj">{a.obj}</div>
                <div style={{ fontSize: '11px', color: a.goalColor, marginTop: '3px' }}>🎯 {a.goal}</div>
                {editable && <span style={{ opacity: 0.4, fontSize: '10px' }}>✏️</span>}
              </div>
            </div>
          )
        ))}
      </div>
    </>
  )
}
