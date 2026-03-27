const METEO_OPTIONS = [
  { value: 'soleil', label: '☀️ Ensoleillé' },
  { value: 'nuageux_partiel', label: '⛅ Partiellement nuageux' },
  { value: 'nuageux', label: '☁️ Nuageux' },
  { value: 'pluie', label: '🌧️ Risque de pluie' },
]

export default function MeteoHeader({ projet, editable, onMeteoChange }) {
  return (
    <div className="hd">
      <div>
        <div className="ttl">Météo projet — {projet.nom}</div>
        <div className="sub">{projet.description || 'Coordinateur technique programme · Mars 2026 · Stratégie Lot 1 / Lot 2'}</div>
      </div>
      <div className="meteo-pills">
        {METEO_OPTIONS.map(opt => (
          <button
            key={opt.value}
            className={`mp${projet.meteo === opt.value ? ' active' : ''}`}
            onClick={() => editable && onMeteoChange && onMeteoChange(opt.value)}
            style={!editable ? { cursor: 'default' } : {}}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
