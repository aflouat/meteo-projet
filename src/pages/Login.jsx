import { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!supabase) {
      // Mode local sans Supabase
      onLogin({ email, id: 'local' })
      setLoading(false)
      return
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
    } else {
      onLogin(data.user)
    }
    setLoading(false)
  }

  return (
    <div className="login-wrap">
      <div className="login-card">
        <h2>🌤️ Météo Projet — Éditeur</h2>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required autoFocus />
          </div>
          <div className="field">
            <label>Mot de passe</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          {error && <div className="err">{error}</div>}
          <button type="submit" className="btn btn-primary" style={{width:'100%',marginTop:16}} disabled={loading}>
            {loading ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  )
}
