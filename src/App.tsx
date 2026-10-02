import { useState } from 'react'
import Home from './game/Home'
import Mode1, { type Cert1 } from './game/Mode1'
import Mode2, { type Cert2 } from './game/Mode2'
import Certificate from './game/Certificate'

type Screen = 'home' | 'm1' | 'm2' | 'cert1' | 'cert2'

export default function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [name, setNameState] = useState(() => {
    try {
      return localStorage.getItem('norma_class_player_name') || ''
    } catch {
      return ''
    }
  })

  const setName = (val: string) => {
    setNameState(val)
    try {
      localStorage.setItem('norma_class_player_name', val)
    } catch {}
  }

  const [c1, setC1] = useState<Cert1>()
  const [c2, setC2] = useState<Cert2>()
  const home = () => { setScreen('home'); window.scrollTo(0, 0) }

  if (screen === 'm1') return <Mode1 key="m1" playerName={name} onExit={home} onDone={(c) => { setC1(c); setScreen('cert1') }} />
  if (screen === 'm2') return <Mode2 key="m2" playerName={name} onExit={home} onDone={(c) => { setC2(c); setScreen('cert2') }} />
  if (screen === 'cert1' && c1) return <Certificate name={name} c1={c1} onHome={home} />
  if (screen === 'cert2' && c2) return <Certificate name={name} c2={c2} onHome={home} />
  return <Home name={name} setName={setName} earned={Number(!!c1) + Number(!!c2)} onPick={(m) => setScreen(m === 1 ? 'm1' : 'm2')} />
}
