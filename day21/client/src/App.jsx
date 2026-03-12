import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState(() => localStorage.getItem('token') || '')
  const [me, setMe] = useState(null)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
      fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(r => r.ok ? r.json() : Promise.reject())
        .then(data => setMe(data.user))
        .catch(() => setMe(null))
    } else {
      localStorage.removeItem('token')
      setMe(null)
    }
  }, [token])

  const submit = async (e) => {
    e.preventDefault()
    setMsg('')
    try {
      const res = await fetch(`/api/auth/${mode === 'login' ? 'login' : 'register'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (!res.ok) {
        setMsg(data.message || '發生錯誤')
        return
      }
      setToken(data.token)
      setMsg(mode === 'login' ? '登入成功' : '註冊成功')
    } catch {
      setMsg('連線失敗')
    }
  }

  const logout = () => {
    setToken('')
    setEmail('')
    setPassword('')
    setMsg('已登出')
  }

  return (
    <>
      <h1>Login System (React + Node + MongoDB)</h1>
      <div style={{ marginBottom: 12 }}>
        <button onClick={() => setMode('login')} disabled={mode==='login'}>登入</button>
        <button onClick={() => setMode('register')} disabled={mode==='register'} style={{ marginLeft: 8 }}>註冊</button>
        {token && <button onClick={logout} style={{ marginLeft: 8 }}>登出</button>}
      </div>

      {!me && (
        <form onSubmit={submit} style={{ display: 'inline-block', padding: 12, border: '1px solid #ccc' }}>
          <div>
            <label style={{ display: 'block', marginBottom: 4 }}>Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com" />
          </div>
          <div style={{ marginTop: 8 }}>
            <label style={{ display: 'block', marginBottom: 4 }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="至少 6 碼" />
          </div>
          <button type="submit" style={{ marginTop: 12 }}>
            {mode === 'login' ? '登入' : '註冊'}
          </button>
        </form>
      )}

      {me && (
        <div style={{ marginTop: 12 }}>
          <div>目前登入：{me.email}</div>
        </div>
      )}

      {msg && <div style={{ marginTop: 12, color: '#555' }}>{msg}</div>}
    </>
  )
}

export default App
