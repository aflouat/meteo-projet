import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useProjet } from '../hooks/useProjet'
import { useHistorique } from '../hooks/useHistorique'

const METEO_ICONS = { soleil: '☀️', nuageux_partiel: '⛅', nuageux: '☁️', pluie: '🌧️' }
const METEO_LABELS = { soleil: 'Ensoleillé', nuageux_partiel: 'Partiellement nuageux', nuageux: 'Nuageux', pluie: 'Risque de pluie' }
const STATUT_COLOR = { ok: '#16a34a', warn: '#d97706', risk: '#dc2626', info: '#2563eb' }
const STATUT_BG = { ok: '#f0fdf4', warn: '#fffbeb', risk: '#fef2f2', info: '#eff6ff' }
const STATUT_LABEL = { ok: 'OK', warn: 'Attention', risk: 'Risque', info: 'Info' }
const AXE_NAMES = { perimetre: 'Périmètre', planning: 'Planning', qualite: 'Qualité', communication: 'Communication', ressources: 'Ressources', risques: 'Risques' }

function SnapshotDetail({ snapshot, onDelete }) {
  const { axes, ressources } = snapshot || {}

  return (
    <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border)', background: 'var(--bg)' }}>
      {axes && axes.length > 0 && (
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Axes</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {[...axes].sort((a, b) => a.ordre - b.ordre).filter(a => a.nom !== 'ressources').map(axe => (
              <div
                key={axe.id}
                style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  padding: '3px 10px', borderRadius: 20,
                  background: STATUT_BG[axe.statut] || '#f3f4f6',
                  fontSize: 12,
                }}
              >
                <span style={{ color: STATUT_COLOR[axe.statut], fontWeight: 700 }}>●</span>
                <span>{AXE_NAMES[axe.nom] || axe.nom}</span>
                <span style={{ color: STATUT_COLOR[axe.statut], fontSize: 11 }}>{STATUT_LABEL[axe.statut]}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {ressources && ressources.length > 0 && (
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Ressources</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {ressources.map(r => (
              <div
                key={r.id}
                style={{
                  fontSize: 12, padding: '3px 10px', borderRadius: 4,
                  background: r.alerte ? '#fef2f2' : 'var(--surface)',
                  border: '1px solid var(--border)',
                }}
              >
                {r.nom} — <strong>{r.occupation}%</strong>{r.alerte ? ' ⚠️' : ''}
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
        <button
          className="btn btn-ghost btn-sm"
          style={{ color: 'var(--r600)', fontSize: 11 }}
          onClick={onDelete}
        >
          🗑 Supprimer ce snapshot
        </button>
      </div>
    </div>
  )
}

export default function Historique() {
  const { projet, loading: loadingProjet } = useProjet()
  const { historique, loading, deleteSnapshot } = useHistorique(projet?.id)
  const [expanded, setExpanded] = useState(null)

  if (loadingProjet || loading) {
    return <div className="wrap" style={{ textAlign: 'center', padding: 40, color: 'var(--text-secondary)' }}>Chargement…</div>
  }

  return (
    <div className="wrap">
      <div className="editor-bar">
        <span>📅 Historique des météos</span>
        <div style={{ display: 'flex', gap: 8 }}>
          <Link to="/editor" className="btn btn-ghost btn-sm">✏️ Éditeur</Link>
          <Link to="/" className="btn btn-ghost btn-sm">← Dashboard</Link>
        </div>
      </div>

      <div className="sec-lbl">Météos hebdomadaires — {projet?.nom}</div>

      {historique.length === 0 ? (
        <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-secondary)', fontSize: '14px' }}>
          Aucun snapshot enregistré pour le moment.<br />
          <Link to="/editor" style={{ color: 'var(--b600)', marginTop: 8, display: 'inline-block' }}>
            Aller dans l'éditeur pour enregistrer le premier snapshot →
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {historique.map(h => (
            <div
              key={h.id}
              style={{ border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden', background: 'var(--surface)' }}
            >
              <div
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '12px 16px', cursor: 'pointer',
                  background: expanded === h.id ? 'var(--b50)' : 'var(--surface)',
                  transition: 'background 0.15s',
                }}
                onClick={() => setExpanded(expanded === h.id ? null : h.id)}
              >
                <span style={{ fontSize: 28, lineHeight: 1 }}>{METEO_ICONS[h.meteo] || '⛅'}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{h.semaine}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
                    {METEO_LABELS[h.meteo] || h.meteo}
                  </div>
                  {h.commentaire && (
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2, fontStyle: 'italic' }}>
                      {h.commentaire}
                    </div>
                  )}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', textAlign: 'right' }}>
                  {new Date(h.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                </div>
                <span style={{ fontSize: 12, color: 'var(--b600)', marginLeft: 4 }}>
                  {expanded === h.id ? '▲' : '▼'}
                </span>
              </div>

              {expanded === h.id && (
                <SnapshotDetail
                  snapshot={h.snapshot}
                  onDelete={() => {
                    deleteSnapshot(h.id)
                    setExpanded(null)
                  }}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
