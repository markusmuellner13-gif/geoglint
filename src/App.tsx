import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { countryFacts, type CountryFact } from './data/countries'

type GameMode = 'warmup' | 'rush'

type LeaderboardEntry = {
  name: string
  score: number
  mode: GameMode
  date: string
}

const STORAGE_KEY = 'geo-leaderboard-v1'
const TIMER_SECONDS = 90

const formatPopulation = (value: number) => value.toLocaleString('en-US')

const getInitialRound = () => {
  const index = Math.floor(Math.random() * countryFacts.length)
  return countryFacts[index]
}

function App() {
  const [mode, setMode] = useState<GameMode>('warmup')
  const [round, setRound] = useState<CountryFact>(getInitialRound)
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [status, setStatus] = useState<'ready' | 'playing' | 'paused' | 'over'>('ready')
  const [guess, setGuess] = useState('')
  const [isBooting, setIsBooting] = useState(true)
  const [feedback, setFeedback] = useState('Type the country name and press enter to lock it in.')
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(() => {
    if (typeof window === 'undefined') return []
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as LeaderboardEntry[]) : []
  })

  useEffect(() => {
    if (status !== 'playing') return
    const timer = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          window.clearInterval(timer)
          setStatus('over')
          return 0
        }
        return current - 1
      })
    }, 1000)

    return () => window.clearInterval(timer)
  }, [status, round.name])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(leaderboard))
  }, [leaderboard])

  useEffect(() => {
    const timer = window.setTimeout(() => setIsBooting(false), 1100)
    return () => window.clearTimeout(timer)
  }, [])

  const startGame = (selectedMode: GameMode) => {
    setMode(selectedMode)
    setRound(getInitialRound())
    setTimeLeft(TIMER_SECONDS)
    setScore(0)
    setStreak(0)
    setGuess('')
    setFeedback('Type the country name and press enter to lock it in.')
    setStatus('playing')
  }

  const pauseGame = () => {
    if (status === 'playing') {
      setStatus('paused')
      setFeedback('Paused. Hit resume when you are ready to keep the streak alive.')
    }
  }

  const resumeGame = () => {
    if (status === 'paused') {
      setStatus('playing')
      setFeedback('Back in the game. Keep the map buzzing.')
    }
  }

  const submitGuess = (event?: React.FormEvent) => {
    event?.preventDefault()
    if (status !== 'playing') return
    const normalized = guess.trim().toLowerCase()
    if (!normalized) {
      setFeedback('A country name is required, brave explorer.')
      return
    }

    const isCorrect = normalized === round.name.toLowerCase()
    if (isCorrect) {
      const earned = mode === 'rush' ? 25 : 15
      setScore((current) => current + earned + streak)
      setStreak((current) => current + 1)
      setFeedback(`Correct! ${round.funFact}`)
    } else {
      setStreak(0)
      setFeedback(`Close, but ${round.name} is the answer. Try another one.`)
    }
    setGuess('')
    setRound(getInitialRound())
  }

  const saveHighScore = () => {
    const name = window.prompt('Name yourself for the leaderboard')?.trim() || 'Anonymous'
    const entry: LeaderboardEntry = {
      name,
      score,
      mode,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }
    setLeaderboard((current) => [...current, entry].sort((a, b) => b.score - a.score).slice(0, 8))
    setStatus('ready')
  }

  const bestScore = useMemo(() => leaderboard[0]?.score ?? 0, [leaderboard])

  return (
    <main className="app-shell">
      {isBooting ? (
        <div className="boot-screen">
          <div className="boot-badge">🌍</div>
          <h1>GeoGlint</h1>
          <p>Loading the globe, the facts, and the fun…</p>
        </div>
      ) : null}
      <section className="hero-card">
        <div className="hero-copy">
          <p className="eyebrow">Geo Sprint • Play • Learn • Repeat</p>
          <h1>GeoGlint</h1>
          <p className="hero-text">
            A fast, funny geography sprint where each round teaches a capital, population, language, and a wild fact.
          </p>
          <div className="hero-actions">
            <button className="primary" onClick={() => startGame('warmup')}>Start Warmup</button>
            <button className="secondary" onClick={() => startGame('rush')}>Start Rush</button>
          </div>
        </div>
        <div className="stats-card">
          <div>
            <span>Timer</span>
            <strong>{timeLeft}s</strong>
          </div>
          <div>
            <span>Score</span>
            <strong>{score}</strong>
          </div>
          <div>
            <span>Streak</span>
            <strong>{streak}</strong>
          </div>
          <div>
            <span>Best</span>
            <strong>{bestScore}</strong>
          </div>
        </div>
      </section>

      <section className="game-card">
        <div className="round-header">
          <div>
            <p className="eyebrow">Current challenge</p>
            <h2>{round.name}</h2>
          </div>
          <div className="mode-pill">{mode === 'rush' ? 'Rush mode' : 'Warmup mode'}</div>
        </div>

        <div className="fact-grid">
          <div>
            <span>Capital</span>
            <strong>{round.capital}</strong>
          </div>
          <div>
            <span>Population</span>
            <strong>{formatPopulation(round.population)}</strong>
          </div>
          <div>
            <span>Language</span>
            <strong>{round.language}</strong>
          </div>
          <div>
            <span>Region</span>
            <strong>{round.region}</strong>
          </div>
        </div>

        <form onSubmit={submitGuess} className="guess-box">
          <input
            value={guess}
            onChange={(event) => setGuess(event.target.value)}
            placeholder="Type the country name"
            disabled={status !== 'playing'}
            autoComplete="off"
          />
          <button type="submit" disabled={status !== 'playing'}>Submit</button>
        </form>

        <div className="feedback-row">
          <p>{feedback}</p>
          {status === 'playing' ? (
            <button className="ghost" onClick={pauseGame}>Pause</button>
          ) : status === 'paused' ? (
            <button className="ghost" onClick={resumeGame}>Resume</button>
          ) : null}
        </div>

        {status === 'over' ? (
          <div className="overlay-card">
            <h3>Time’s up!</h3>
            <p>You hit {score} points and kept a streak of {streak}. Save your score and brag to your crew.</p>
            <button className="primary" onClick={saveHighScore}>Save to leaderboard</button>
          </div>
        ) : null}

        {status === 'paused' ? (
          <div className="overlay-card">
            <h3>Paused</h3>
            <p>Take a breath. The globe is still waiting.</p>
          </div>
        ) : null}
      </section>

      <section className="leaderboard-card">
        <div className="leaderboard-header">
          <div>
            <p className="eyebrow">Leaderboards</p>
            <h3>Top globe champions</h3>
          </div>
          <button
            className="ghost"
            onClick={() => {
              window.localStorage.removeItem(STORAGE_KEY)
              setLeaderboard([])
            }}
          >
            Clear
          </button>
        </div>
        {leaderboard.length ? (
          <ol>
            {leaderboard.map((entry, index) => (
              <li key={`${entry.name}-${entry.score}-${index}`}>
                <span>{index + 1}. {entry.name}</span>
                <strong>{entry.score} pts • {entry.mode} • {entry.date}</strong>
              </li>
            ))}
          </ol>
        ) : (
          <p className="empty-state">No scores yet. Be the first legend to conquer the map.</p>
        )}
      </section>
    </main>
  )
}

export default App
