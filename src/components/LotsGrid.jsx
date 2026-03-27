import { useState } from 'react'

function LotEditor({ lot, onSave, onCancel }) {
  const [draft, setDraft] = useState({ ...lot, items: lot.items.map(i => ({ ...i })) })

  function updateItem(i, field, value) {
    setDraft(prev => ({
      ...prev,
      items: prev.items.map((it, idx) => idx === i ? { ...it, [field]: value } : it),
    }))
  }

  function addItem() {
    setDraft(prev => ({ ...prev, items: [...prev.items, { check: true, texte: '' }] }))
  }

  function removeItem(i) {
    setDraft(prev => ({ ...prev, items: prev.items.filter((_, idx) => idx !== i) }))
  }

  return (
    <div style={{ padding: 12, border: '1px solid var(--b300)', borderRadius: 6, display: 'flex', flexDirection: 'column', gap: 8, background: 'var(--surface)' }}>
      <input value={draft.badge} onChange={e => setDraft(p => ({ ...p, badge: e.target.value }))} placeholder="Badge" style={{ fontSize: '12px', fontWeight: 600 }} />
      <input value={draft.titre} onChange={e => setDraft(p => ({ ...p, titre: e.target.value }))} placeholder="Titre" style={{ fontSize: '12px' }} />
      <input value={draft.tag} onChange={e => setDraft(p => ({ ...p, tag: e.target.value }))} placeholder="Tag (ex: En exécution)" style={{ fontSize: '12px' }} />
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 6 }}>
        {draft.items.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 4, alignItems: 'center' }}>
            <input type="checkbox" checked={item.check} onChange={e => updateItem(i, 'check', e.target.checked)} />
            <input value={item.texte} onChange={e => updateItem(i, 'texte', e.target.value)} style={{ flex: 1, fontSize: '11px' }} />
            <button className="btn btn-ghost btn-sm" onClick={() => removeItem(i)}>✕</button>
          </div>
        ))}
        <button className="btn btn-ghost btn-sm" onClick={addItem} style={{ marginTop: 4 }}>+ Ajouter</button>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button className="btn btn-primary btn-sm" onClick={() => onSave(draft)}>Enregistrer</button>
        <button className="btn btn-ghost btn-sm" onClick={onCancel}>Annuler</button>
      </div>
    </div>
  )
}

function LotCard({ cls, tagCls, lot, editable, onEdit }) {
  return (
    <div
      className={`lot ${cls}`}
      onClick={editable ? onEdit : undefined}
      title={editable ? 'Cliquer pour éditer' : undefined}
      style={editable ? { cursor: 'pointer', outline: '1px dashed var(--b300)' } : {}}
    >
      <div className="lot-badge">{lot.badge}</div>
      <div className="lot-title">{lot.titre}</div>
      {lot.items.map((item, i) => (
        <div key={i} className="lot-item">
          <span className={item.check ? 'check' : 'cross'}>{item.check ? '✔' : '✘'}</span>
          <span>{item.texte}</span>
        </div>
      ))}
      <div style={{ marginTop: '8px' }}>
        <span className={`tag ${tagCls}`}>{lot.tag}</span>
      </div>
      {editable && <span style={{ opacity: 0.4, fontSize: '11px', marginTop: 4, display: 'block' }}>✏️ Cliquer pour éditer</span>}
    </div>
  )
}

export default function LotsGrid({ data, editable, onUpdate }) {
  const [editingLot, setEditingLot] = useState(null)

  function saveLot(key, lotData) {
    onUpdate({ ...data, [key]: lotData })
    setEditingLot(null)
  }

  return (
    <div className="lots">
      {editingLot === 'lot1' ? (
        <LotEditor lot={data.lot1} onSave={d => saveLot('lot1', d)} onCancel={() => setEditingLot(null)} />
      ) : (
        <LotCard cls="lot1" tagCls="tg" lot={data.lot1} editable={editable} onEdit={() => setEditingLot('lot1')} />
      )}
      {editingLot === 'lot2' ? (
        <LotEditor lot={data.lot2} onSave={d => saveLot('lot2', d)} onCancel={() => setEditingLot(null)} />
      ) : (
        <LotCard cls="lot2" tagCls="tb" lot={data.lot2} editable={editable} onEdit={() => setEditingLot('lot2')} />
      )}
    </div>
  )
}
