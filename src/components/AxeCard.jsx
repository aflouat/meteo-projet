import { useState } from 'react'

const AXES_LABELS = {
  perimetre: 'Périmètre',
  planning: 'Planning',
  qualite: 'Qualité',
  communication: 'Communication',
  ressources: 'Ressources',
  risques: 'Risques',
}

const COULEUR_CLASS = {
  bleu: 'bbl',
  orange: 'bal',
  vert: 'bgl',
  rouge: 'brl',
  teal: 'btl',
  violet: 'bpl',
}

const COULEUR_OPTIONS = ['bleu', 'vert', 'orange', 'rouge', 'teal', 'violet']
const LOT_OPTIONS = ['lot1', 'lot2', 'les_deux']

export default function AxeCard({ axe, items, wide, editable, onStatutChange, onItemAdd, onItemDelete, onItemUpdate }) {
  const [newTexte, setNewTexte] = useState('')
  const [newCouleur, setNewCouleur] = useState('bleu')
  const [newLot, setNewLot] = useState('lot1')

  const axeItems = items.filter(i => i.axe_id === axe.id).sort((a, b) => a.ordre - b.ordre)

  function handleAdd(e) {
    e.preventDefault()
    if (!newTexte.trim()) return
    onItemAdd(axe.id, newTexte.trim(), newCouleur, newLot)
    setNewTexte('')
  }

  return (
    <div className="card" style={wide ? { gridColumn: 'span 2' } : {}}>
      <div className="ch">
        <span className="ct">{AXES_LABELS[axe.nom] || axe.nom}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          {editable ? (
            <select
              className="statut-select"
              value={axe.statut}
              onChange={e => onStatutChange(axe.id, e.target.value)}
            >
              <option value="ok">● OK</option>
              <option value="warn">● Attention</option>
              <option value="risk">● Risque</option>
              <option value="info">● Info</option>
            </select>
          ) : (
            <span className={`sd ${axe.statut}`}></span>
          )}
        </div>
      </div>

      {wide ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
          {[axeItems.slice(0, Math.ceil(axeItems.length / 2)), axeItems.slice(Math.ceil(axeItems.length / 2))].map((col, ci) => (
            <div key={ci}>
              {col.map(item => (
                <ItemRow key={item.id} item={item} editable={editable} onDelete={onItemDelete} onUpdate={onItemUpdate} />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div>
          {axeItems.map(item => (
            <ItemRow key={item.id} item={item} editable={editable} onDelete={onItemDelete} onUpdate={onItemUpdate} />
          ))}
        </div>
      )}

      {editable && (
        <form className="add-item-form" onSubmit={handleAdd}>
          <input
            value={newTexte}
            onChange={e => setNewTexte(e.target.value)}
            placeholder="Nouvel item…"
          />
          <select className="color-select" value={newCouleur} onChange={e => setNewCouleur(e.target.value)}>
            {COULEUR_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select className="lot-select" value={newLot} onChange={e => setNewLot(e.target.value)}>
            {LOT_OPTIONS.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          <button type="submit" className="btn btn-primary btn-sm">+</button>
        </form>
      )}
    </div>
  )
}

function ItemRow({ item, editable, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false)
  const [texte, setTexte] = useState(item.texte)

  if (editable) {
    return (
      <div className="item-edit">
        {editing ? (
          <input
            value={texte}
            onChange={e => setTexte(e.target.value)}
            onBlur={() => { onUpdate(item.id, { texte }); setEditing(false) }}
            onKeyDown={e => { if (e.key === 'Enter') { onUpdate(item.id, { texte }); setEditing(false) } }}
            autoFocus
          />
        ) : (
          <span
            className={`bul ${COULEUR_CLASS[item.couleur] || 'bbl'}`}
            style={{ marginTop: 5, flexShrink: 0 }}
          />
        )}
        {!editing && (
          <span style={{ flex: 1, fontSize: 12, color: 'var(--text-primary)', cursor: 'text' }} onClick={() => setEditing(true)}>
            {item.texte}
          </span>
        )}
        <button className="btn btn-danger btn-sm" onClick={() => onDelete(item.id)} title="Supprimer">×</button>
      </div>
    )
  }

  return (
    <div className="item">
      <span className={`bul ${COULEUR_CLASS[item.couleur] || 'bbl'}`}></span>
      <span>{item.texte}</span>
    </div>
  )
}
