// Generative ambient music using Web Audio API — zero copyright
export class AmbientPlayer {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private running = false

  start() {
    if (this.running) return
    this.ctx = new AudioContext()
    this.master = this.ctx.createGain()
    this.master.gain.value = 0.18
    this.master.connect(this.ctx.destination)
    this.running = true
    this.drones()
    this.melody()
  }

  stop() {
    this.running = false
    if (this.master && this.ctx) {
      this.master.gain.setTargetAtTime(0, this.ctx.currentTime, 0.4)
    }
    setTimeout(() => {
      this.ctx?.close()
      this.ctx = null
      this.master = null
    }, 1200)
  }

  setVolume(v: number) {
    if (this.master && this.ctx) {
      this.master.gain.setTargetAtTime(Math.max(0, Math.min(1, v)) * 0.18, this.ctx.currentTime, 0.1)
    }
  }

  private drones() {
    // Warm bass drones: C2, G2, C3
    ;[65.4, 98.0, 130.8].forEach((freq, i) => {
      if (!this.ctx || !this.master) return
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      const lp = this.ctx.createBiquadFilter()
      lp.type = 'lowpass'
      lp.frequency.value = 500
      osc.type = 'sine'
      osc.frequency.value = freq
      gain.gain.value = 0.07 / (i + 1)
      osc.connect(lp)
      lp.connect(gain)
      gain.connect(this.master)
      osc.start()
    })
  }

  private melody() {
    if (!this.running || !this.ctx || !this.master) return
    // C minor pentatonic — smooth and cinematic
    const scale = [261.6, 311.1, 349.2, 392.0, 466.2, 523.3, 622.3, 698.5]
    const freq = scale[Math.floor(Math.random() * scale.length)]
    const dur = 2.5 + Math.random() * 2

    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    const lp = this.ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 1400

    osc.type = 'triangle'
    osc.frequency.value = freq
    osc.detune.value = (Math.random() - 0.5) * 8

    const now = this.ctx.currentTime
    gain.gain.setValueAtTime(0, now)
    gain.gain.linearRampToValueAtTime(0.045, now + 0.4)
    gain.gain.setValueAtTime(0.045, now + dur - 0.8)
    gain.gain.linearRampToValueAtTime(0, now + dur)

    osc.connect(lp)
    lp.connect(gain)
    gain.connect(this.master)
    osc.start()
    osc.stop(now + dur + 0.1)

    const next = 1200 + Math.random() * 2800
    setTimeout(() => this.melody(), next)
  }
}
