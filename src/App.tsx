import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import { countryFacts, type CountryFact } from './data/countries'
import { AmbientPlayer } from './audio'

// ─── Types ───────────────────────────────────────────────────────────────────

type GameMode = 'explorer' | 'blitz' | 'flagrush'
type GameStatus = 'menu' | 'playing' | 'paused' | 'over'
type FeedbackType = 'neutral' | 'correct' | 'wrong'

type LeaderboardEntry = {
  name: string
  score: number
  mode: string
  date: string
}

// ─── Constants ────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'geo-leaderboard-v2'
const TIMER: Record<GameMode, number> = { explorer: 90, blitz: 60, flagrush: 90 }

// Explorer: points drop as more clues are revealed
const EXPLORER_PTS = [100, 80, 60, 40, 20]
const CLUE_LABELS = ['Region', 'Language', 'Population', 'Capital', 'Flag']
const CLUE_ICONS = ['🗺️', '💬', '👥', '🏛️', '🚩']

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (n: number) => n.toLocaleString('en-US')

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

const nextRoundFor = (current: string): CountryFact => {
  const pool = countryFacts.filter(c => c.name !== current)
  return pick(pool)
}

const blitzOptions = (correct: CountryFact): string[] => {
  const wrong = countryFacts
    .filter(c => c.name !== correct.name)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map(c => c.name)
  return [correct.name, ...wrong].sort(() => Math.random() - 0.5)
}

const clueValue = (c: CountryFact, i: number): string => {
  switch (i) {
    case 0: return c.region
    case 1: return c.language
    case 2: return fmt(c.population)
    case 3: return c.capital
    case 4: return c.flag
    default: return ''
  }
}

const isCorrectGuess = (guess: string, round: CountryFact): boolean => {
  const n = guess.trim().toLowerCase()
  if (!n) return false
  const accepted = [round.name, ...(round.aliases ?? [])].map(a => a.toLowerCase())
  return accepted.includes(n)
}

// singleton — lives for the session
const player = new AmbientPlayer()

// ─── Component ────────────────────────────────────────────────────────────────

export default function App() {
  const [mode, setMode] = useState<GameMode>('explorer')
  const [status, setStatus] = useState<GameStatus>('menu')
  const [round, setRound] = useState<CountryFact>(() => pick(countryFacts))
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [timeLeft, setTimeLeft] = useState(90)
  const [gameKey, setGameKey] = useState(0) // bump to restart timer
  const [guess, setGuess] = useState('')
  const [clueLevel, setClueLevel] = useState(0) // explorer: 0 = only region shown
  const [options, setOptions] = useState<string[]>([]) // blitz choices
  const [feedback, setFeedback] = useState<{ text: string; type: FeedbackType }>({ text: '', type: 'neutral' })
  const [answered, setAnswered] = useState(false)
  const [flash, setFlash] = useState<'' | 'flash-correct' | 'flash-wrong'>('')
  const [musicOn, setMusicOn] = useState(false)
  const [showSave, setShowSave] = useState(false)
  const [playerName, setPlayerName] = useState('')
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') } catch { return [] }
  })

  const inputRef = useRef<HTMLInputElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const totalTime = TIMER[mode]

  // ── Boot animation ──────────────────────────────────────────────────────────
  const [booting, setBooting] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setBooting(false), 2000)
    return () => clearTimeout(t)
  }, [])

  // ── Persist leaderboard ─────────────────────────────────────────────────────
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leaderboard))
  }, [leaderboard])

  // ── Timer ───────────────────────────────────────────────────────────────────
  // gameKey resets timer on new game; pausing simply stops the interval via status check
  useEffect(() => {
    if (status !== 'playing') return
    const t = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(t); setStatus('over'); return 0 }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(t)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, gameKey])

  // ── Focus input on play ─────────────────────────────────────────────────────
  useEffect(() => {
    if (status === 'playing' && mode !== 'blitz') {
      setTimeout(() => inputRef.current?.focus(), 80)
    }
  }, [status, mode, round])

  useEffect(() => {
    if (showSave) setTimeout(() => nameInputRef.current?.focus(), 80)
  }, [showSave])

  // ── Game control ────────────────────────────────────────────────────────────

  const startGame = useCallback((m: GameMode) => {
    const first = pick(countryFacts)
    setMode(m)
    setRound(first)
    setScore(0)
    setStreak(0)
    setTimeLeft(TIMER[m])
    setGuess('')
    setClueLevel(0)
    setOptions(m === 'blitz' ? blitzOptions(first) : [])
    setFeedback({ text: '', type: 'neutral' })
    setAnswered(false)
    setFlash('')
    setGameKey(k => k + 1)
    setStatus('playing')
  }, [])

  const advance = useCallback((currentName: string, currentMode: GameMode) => {
    const next = nextRoundFor(currentName)
    setRound(next)
    setGuess('')
    setClueLevel(0)
    setOptions(currentMode === 'blitz' ? blitzOptions(next) : [])
    setAnswered(false)
    setFeedback({ text: '', type: 'neutral' })
  }, [])

  const triggerCorrect = (pts: number, fact: string, currentStreak: number) => {
    setScore(s => s + pts + currentStreak * 5)
    setStreak(s => s + 1)
    setFeedback({ text: `✓ +${pts + currentStreak * 5} pts — ${fact}`, type: 'correct' })
    setFlash('flash-correct')
    setTimeout(() => setFlash(''), 700)
  }

  const triggerWrong = (answer: string) => {
    setStreak(0)
    setFeedback({ text: `It was ${answer}. Keep going!`, type: 'wrong' })
    setFlash('flash-wrong')
    setTimeout(() => setFlash(''), 700)
  }

  // Explorer + Flag Rush: type the answer
  const submitGuess = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (status !== 'playing' || answered) return
    setAnswered(true)
    if (isCorrectGuess(guess, round)) {
      const pts = mode === 'flagrush' ? 30 : (EXPLORER_PTS[clueLevel] ?? 20)
      triggerCorrect(pts, round.funFact, streak)
    } else {
      triggerWrong(round.name)
    }
    setTimeout(() => advance(round.name, mode), 1600)
  }

  // Blitz: pick an option
  const selectOption = (opt: string) => {
    if (status !== 'playing' || answered) return
    setAnswered(true)
    if (opt === round.name) {
      triggerCorrect(15, round.funFact, streak)
    } else {
      triggerWrong(round.name)
    }
    setTimeout(() => advance(round.name, mode), 1400)
  }

  const revealClue = () => {
    if (clueLevel < 4) setClueLevel(l => l + 1)
  }

  const pauseGame = () => setStatus('paused')
  const resumeGame = () => setStatus('playing')

  const toggleMusic = () => {
    if (musicOn) { player.stop(); setMusicOn(false) }
    else { player.start(); setMusicOn(true) }
  }

  const saveScore = () => {
    const name = playerName.trim() || 'Explorer'
    const entry: LeaderboardEntry = {
      name, score, mode,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    }
    setLeaderboard(prev => [...prev, entry].sort((a, b) => b.score - a.score).slice(0, 10))
    setShowSave(false)
    setPlayerName('')
    setStatus('menu')
  }

  const bestScore = leaderboard[0]?.score ?? 0
  const timerPct = (timeLeft / totalTime) * 100
  const timerColor = timeLeft < 10 ? '#ef4444' : timeLeft < 20 ? '#f59e0b' : '#06b6d4'

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className={`app-root ${flash}`}>
      {/* Animated background */}
      <div className="bg-canvas" aria-hidden="true">
        <div className="bg-orb orb-a" />
        <div className="bg-orb orb-b" />
        <div className="bg-orb orb-c" />
        <div className="bg-grid" />
      </div>

      {/* Boot screen */}
      {booting && (
        <div className="boot">
          <div className="boot-globe">🌍</div>
          <h1 className="boot-title">GeoGlint</h1>
          <p className="boot-sub">Mapping the world, one fact at a time</p>
          <div className="boot-bar"><div className="boot-fill" /></div>
        </div>
      )}

      <div className="content">

        {/* Header */}
        <header className="top-bar">
          <div className="logo">
            <span className="logo-globe">🌍</span>
            <span className="logo-name">GeoGlint</span>
          </div>
          <div className="top-controls">
            <button className="icon-btn" onClick={toggleMusic} title={musicOn ? 'Mute music' : 'Play music'}>
              {musicOn ? '🔊' : '🔇'}
            </button>
            {status === 'playing' && (
              <button className="icon-btn" onClick={pauseGame} title="Pause">⏸</button>
            )}
          </div>
        </header>

        {/* ── MENU ─────────────────────────────────────────────────────────── */}
        {status === 'menu' && (
          <section className="menu">
            <div className="menu-hero">
              <h2 className="menu-title">Choose Your Mode</h2>
              <p className="menu-sub">
                Test your knowledge across {countryFacts.length} countries from every continent
              </p>
            </div>

            <div className="mode-grid">
              <button className="mode-card" onClick={() => startGame('explorer')}>
                <span className="mode-icon">🧭</span>
                <span className="mode-name">Explorer</span>
                <span className="mode-desc">
                  Clues revealed one by one. Guess early for up to 100 pts. Think fast!
                </span>
                <span className="mode-timer">90 seconds</span>
              </button>

              <button className="mode-card" onClick={() => startGame('blitz')}>
                <span className="mode-icon">⚡</span>
                <span className="mode-name">Blitz</span>
                <span className="mode-desc">
                  See all clues, pick from 4 options. Speed through as many as you can.
                </span>
                <span className="mode-timer">60 seconds</span>
              </button>

              <button className="mode-card" onClick={() => startGame('flagrush')}>
                <span className="mode-icon">🚩</span>
                <span className="mode-name">Flag Rush</span>
                <span className="mode-desc">
                  Just a flag. Name the country. No other hints. Pure geography knowledge.
                </span>
                <span className="mode-timer">90 seconds</span>
              </button>
            </div>

            {bestScore > 0 && (
              <div className="personal-best">
                🏆 Personal best: <strong>{bestScore} pts</strong>
              </div>
            )}
          </section>
        )}

        {/* ── HUD ──────────────────────────────────────────────────────────── */}
        {(status === 'playing' || status === 'paused') && (
          <div className="hud">
            <div className="hud-stat">
              <span className="hud-label">Score</span>
              <span className="hud-val">{score}</span>
            </div>
            <div className="hud-stat">
              <span className="hud-label">Streak</span>
              <span className="hud-val">
                {streak > 0 ? `${streak}${streak >= 3 ? ' 🔥' : ''}` : '0'}
              </span>
            </div>
            <div className="hud-center">
              <div className="timer-num" style={{ color: timerColor }}>{timeLeft}s</div>
              <div className="timer-track">
                <div className="timer-fill" style={{ width: `${timerPct}%`, background: timerColor }} />
              </div>
            </div>
            <div className="hud-stat">
              <span className="hud-label">Mode</span>
              <span className="hud-val hud-mode">{mode}</span>
            </div>
            <div className="hud-stat">
              <span className="hud-label">Best</span>
              <span className="hud-val">{bestScore}</span>
            </div>
          </div>
        )}

        {/* ── GAME AREA ────────────────────────────────────────────────────── */}
        {(status === 'playing' || status === 'paused') && (
          <div className={`game-area ${status === 'paused' ? 'is-paused' : ''}`}>

            {/* Explorer mode */}
            {mode === 'explorer' && (
              <div className="explorer">
                <div className="explorer-header">
                  <span className="explorer-label">Identify the country</span>
                  <span className="pts-pill">{EXPLORER_PTS[clueLevel] ?? 20} pts</span>
                </div>

                <div className="clue-grid">
                  {Array.from({ length: clueLevel + 1 }).map((_, i) => (
                    <div key={CLUE_LABELS[i]} className="clue-card">
                      <span className="clue-icon">{CLUE_ICONS[i]}</span>
                      <span className="clue-label">{CLUE_LABELS[i]}</span>
                      <span className={`clue-val${i === 4 ? ' flag-val' : ''}`}>
                        {clueValue(round, i)}
                      </span>
                    </div>
                  ))}

                  {clueLevel < 4 && (
                    <button className="reveal-btn" onClick={revealClue} disabled={answered}>
                      <span className="clue-icon">{CLUE_ICONS[clueLevel + 1]}</span>
                      <span>Reveal {CLUE_LABELS[clueLevel + 1]}</span>
                      <span className="reveal-cost">
                        −{EXPLORER_PTS[clueLevel] - (EXPLORER_PTS[clueLevel + 1] ?? 20)} pts
                      </span>
                    </button>
                  )}
                </div>

                <form className="guess-form" onSubmit={submitGuess}>
                  <input
                    ref={inputRef}
                    className="guess-input"
                    value={guess}
                    onChange={e => setGuess(e.target.value)}
                    placeholder="Type the country name…"
                    disabled={status !== 'playing' || answered}
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck={false}
                  />
                  <button type="submit" className="btn-submit" disabled={status !== 'playing' || answered}>
                    Lock In
                  </button>
                </form>
              </div>
            )}

            {/* Blitz mode */}
            {mode === 'blitz' && (
              <div className="blitz">
                <div className="blitz-clues">
                  {CLUE_LABELS.slice(0, 4).map((label, i) => (
                    <div key={label} className="blitz-clue">
                      <span className="clue-icon">{CLUE_ICONS[i]}</span>
                      <span className="clue-label">{label}</span>
                      <span className="clue-val">{clueValue(round, i)}</span>
                    </div>
                  ))}
                </div>
                <div className="blitz-options">
                  {options.map(opt => (
                    <button
                      key={opt}
                      className={`option-btn${answered ? (opt === round.name ? ' opt-correct' : ' opt-dim') : ''}`}
                      onClick={() => selectOption(opt)}
                      disabled={answered || status !== 'playing'}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Flag Rush mode */}
            {mode === 'flagrush' && (
              <div className="flagrush">
                <div className="flag-display">{round.flag}</div>
                <div className="flag-region">📍 {round.region}</div>
                <form className="guess-form" onSubmit={submitGuess}>
                  <input
                    ref={inputRef}
                    className="guess-input"
                    value={guess}
                    onChange={e => setGuess(e.target.value)}
                    placeholder="Name this country…"
                    disabled={status !== 'playing' || answered}
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck={false}
                  />
                  <button type="submit" className="btn-submit" disabled={status !== 'playing' || answered}>
                    Lock In
                  </button>
                </form>
              </div>
            )}

            {/* Feedback strip */}
            {feedback.text && (
              <div className={`feedback-strip feedback-${feedback.type}`}>
                {feedback.text}
              </div>
            )}

            {/* Paused overlay */}
            {status === 'paused' && (
              <div className="pause-overlay">
                <div className="pause-card">
                  <div className="pause-icon">⏸</div>
                  <h3>Paused</h3>
                  <p>Take a breath — the globe isn't going anywhere.</p>
                  <button className="btn-primary" onClick={resumeGame}>Resume</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── GAME OVER ────────────────────────────────────────────────────── */}
        {status === 'over' && (
          <section className="over">
            <div className="over-card">
              <div className="over-globe">🌍</div>
              <h2 className="over-title">Time's Up!</h2>
              <div className="over-stats">
                <div className="over-stat">
                  <span>Score</span>
                  <strong>{score}</strong>
                </div>
                <div className="over-stat">
                  <span>Mode</span>
                  <strong>{mode}</strong>
                </div>
                <div className="over-stat">
                  <span>Best</span>
                  <strong>{Math.max(score, bestScore)}</strong>
                </div>
              </div>
              <p className="over-msg">
                {score >= 300 ? '🔥 Legendary! You\'re a world-class geographer!' :
                 score >= 150 ? '⚡ Solid run! The globe respects you.' :
                 score >= 60  ? '🌱 Good start — keep exploring!' :
                 '🗺️ The world awaits — give it another shot!'}
              </p>
              <div className="over-actions">
                <button className="btn-primary" onClick={() => setShowSave(true)}>Save Score</button>
                <button className="btn-secondary" onClick={() => startGame(mode)}>Play Again</button>
                <button className="btn-ghost" onClick={() => setStatus('menu')}>Menu</button>
              </div>
            </div>
          </section>
        )}

        {/* ── LEADERBOARD ──────────────────────────────────────────────────── */}
        <section className="leaderboard">
          <div className="lb-head">
            <h3>🏆 Leaderboard</h3>
            <button
              className="btn-ghost sm"
              onClick={() => { localStorage.removeItem(STORAGE_KEY); setLeaderboard([]) }}
            >
              Clear
            </button>
          </div>
          {leaderboard.length ? (
            <ol className="lb-list">
              {leaderboard.map((e, i) => (
                <li key={`${e.name}-${e.score}-${i}`} className={i === 0 ? 'lb-top' : ''}>
                  <span className="lb-rank">
                    {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}.`}
                  </span>
                  <span className="lb-name">{e.name}</span>
                  <span className="lb-mode">{e.mode}</span>
                  <span className="lb-score">{e.score} pts</span>
                  <span className="lb-date">{e.date}</span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="lb-empty">No scores yet — be the first legend. 🌟</p>
          )}
        </section>
      </div>

      {/* ── SAVE MODAL ───────────────────────────────────────────────────────── */}
      {showSave && (
        <div className="modal-backdrop" onClick={() => setShowSave(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3 className="modal-title">Save Your Score</h3>
            <div className="modal-score">{score} pts</div>
            <input
              ref={nameInputRef}
              className="modal-input"
              value={playerName}
              onChange={e => setPlayerName(e.target.value)}
              placeholder="Your name…"
              maxLength={20}
              onKeyDown={e => e.key === 'Enter' && saveScore()}
            />
            <div className="modal-actions">
              <button className="btn-primary" onClick={saveScore}>Save</button>
              <button className="btn-ghost" onClick={() => setShowSave(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
