import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowUpRight, Camera, ChevronDown, Clock3, MapPin, MessageCircle, Sparkles } from 'lucide-react'
import './styles.css'

const FRAME_COUNT = 91
const WHATSAPP_URL = 'https://wa.me/6281234567890?text=Halo%20Risol%20Rumah%2C%20saya%20ingin%20memesan%20camilan.'

function Navbar() {
  return (
    <header className="site-nav">
    <a className="brand" href="#top" aria-label="Rumah Restu beranda">
        <span className="brand-mark">r</span>
        <span>rumah<span className="brand-light">restu</span></span>
      </a>
      <nav className="nav-links" aria-label="Navigasi utama">
        <a href="#cerita">Cerita kami</a>
        <a href="#menu">Menu</a>
        <a href="#cara-pesan">Cara pesan</a>
      </nav>
      <a className="nav-order" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
        Pesan sekarang <ArrowUpRight size={16} />
      </a>
    </header>
  )
}

function ProductFallback({ accent = 'gold' }) {
  return <div className={`product-fallback ${accent}`} aria-hidden="true"><span /><span /><span /></div>
}

function HeroScrollCanvas() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const imagesRef = useRef([])
  const rafRef = useRef(0)
  const lastFrameRef = useRef(-1)
  const resizeRef = useRef(null)
  const [loaded, setLoaded] = useState(0)
  const [hasFrames, setHasFrames] = useState(true)

  useEffect(() => {
    let cancelled = false
    const images = Array.from({ length: FRAME_COUNT }, (_, index) => {
      const image = new Image()
      image.decoding = 'async'
      image.src = `/frames/Risol/ezgif-frame-${String(index + 1).padStart(3, '0')}.jpg`
      image.onload = async () => {
        if (cancelled) return
        try { await image.decode() } catch { /* browser may already have decoded it */ }
        if (cancelled) return
        setLoaded((count) => count + 1)
        scheduleDraw()
      }
      image.onerror = () => !cancelled && setHasFrames(false)
      return image
    })
    imagesRef.current = images

    const resizeCanvas = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      if (canvas.width === width * dpr && canvas.height === height * dpr) return
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.getContext('2d').setTransform(dpr, 0, 0, dpr, 0, 0)
      lastFrameRef.current = -1
    }

    const getScrollProgress = () => {
      const section = sectionRef.current
      if (!section) return 0
      const rect = section.getBoundingClientRect()
      const maxScroll = Math.max(section.offsetHeight - window.innerHeight, 1)
      return Math.min(Math.max(-rect.top / maxScroll, 0), 1)
    }

    const draw = (progress) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const context = canvas.getContext('2d')
      const requestedFrame = Math.round(progress * (FRAME_COUNT - 1))
      const requestedImage = imagesRef.current[requestedFrame]
      let readyFrame = requestedImage?.complete && requestedImage.naturalWidth ? requestedFrame : -1
      for (let distance = 1; readyFrame < 0 && distance < FRAME_COUNT; distance += 1) {
        const nextFrame = requestedFrame + distance
        const previousFrame = requestedFrame - distance
        if (nextFrame < FRAME_COUNT && imagesRef.current[nextFrame]?.complete && imagesRef.current[nextFrame].naturalWidth) readyFrame = nextFrame
        else if (previousFrame >= 0 && imagesRef.current[previousFrame]?.complete && imagesRef.current[previousFrame].naturalWidth) readyFrame = previousFrame
      }
      const image = imagesRef.current[readyFrame]
      if (readyFrame < 0 || !image || readyFrame === lastFrameRef.current) return
      lastFrameRef.current = readyFrame
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      context.clearRect(0, 0, width, height)
      const visualScale = window.innerWidth > 800 ? 0.84 : 0.9
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight) * visualScale
      const drawWidth = image.naturalWidth * scale
      const drawHeight = image.naturalHeight * scale
      const horizontalOffset = window.innerWidth > 800 ? width * 0.16 : 0
      context.drawImage(image, (width - drawWidth) / 2 + horizontalOffset, (height - drawHeight) / 2, drawWidth, drawHeight)
    }

    const scheduleDraw = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0
        draw(getScrollProgress())
      })
    }
    const handleResize = () => {
      if (resizeRef.current) window.clearTimeout(resizeRef.current)
      resizeRef.current = window.setTimeout(() => {
        resizeCanvas()
        scheduleDraw()
      }, 100)
    }
    resizeCanvas()
    const handleScroll = scheduleDraw
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)
    const timer = window.setTimeout(scheduleDraw, 250)
    return () => {
      cancelled = true
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      window.clearTimeout(timer)
      if (resizeRef.current) window.clearTimeout(resizeRef.current)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <section ref={sectionRef} className="hero-scroll" id="top">
      <div className="hero-sticky">
        <div className="hero-glow" />
        <canvas ref={canvasRef} className={`hero-canvas ${hasFrames ? '' : 'is-empty'}`} aria-label="Animasi risol bergerak saat halaman di-scroll" />
        {!hasFrames && <ProductFallback accent="gold" />}
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> Dimasak setiap pagi, dari dapur keluarga</p>
          <h1>Hangatnya<br /><em>selalu pulang.</em></h1>
          <p className="hero-description">Camilan rumahan dengan isian melimpah, kulit renyah, dan rasa yang terasa seperti pelukan pertama di rumah.</p>
          <a className="button button-dark" href="#menu">Lihat menu <ArrowUpRight size={17} /></a>
        </div>
        <div className="hero-note"><Sparkles size={15} /><span>100% homemade<br /><strong>fresh setiap hari</strong></span></div>
        <div className="scroll-hint"><span>Scroll untuk mencicipi</span><ChevronDown size={17} /></div>
        <div className="frame-progress" aria-label={`${loaded} dari ${FRAME_COUNT} frame dimuat`}><span style={{ width: `${(loaded / FRAME_COUNT) * 100}%` }} /></div>
      </div>
    </section>
  )
}

const products = [
  { name: 'Risol Ragout Ayam', detail: 'Ayam suwir, sayur segar, saus béchamel', price: 'Rp 4.500 / pcs', accent: 'gold', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85' },
  { name: 'Cilok Bumbu Kacang', detail: 'Kenyal lembut, bumbu kacang gurih pedas', price: 'Rp 15.000 / porsi', accent: 'terracotta', image: 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=85' },
  { name: 'Bolu Kukus Karamel', detail: 'Lembut, wangi karamel, manisnya pas', price: 'Rp 35.000 / box', accent: 'cream', image: 'https://images.unsplash.com/photo-1588195538326-c5b1e8f80a10?auto=format&fit=crop&w=900&q=85' },
]

function ProductCard({ product }) {
  return <article className="product-card">
    <div className="product-image"><img src={product.image} alt={product.name} loading="lazy" onError={(event) => { event.currentTarget.style.display = 'none'; event.currentTarget.nextElementSibling.style.display = 'block' }} /><ProductFallback accent={product.accent} /><span className="product-tag">favorit rumah</span></div>
    <div className="product-info"><div><h3>{product.name}</h3><p>{product.detail}</p></div><span className="price">{product.price}</span></div>
  </article>
}

function ProductCatalog() {
  return <section className="catalog section" id="menu">
    <div className="section-heading"><div><p className="eyebrow">Dari dapur, dengan cerita</p><h2>Yang bikin ingin<br /><em>tambah lagi.</em></h2></div><p className="section-intro">Menu kecil kami dibuat dalam batch terbatas supaya setiap gigitan tetap hangat, renyah, dan penuh perhatian.</p></div>
    <div className="product-grid">{products.map((product) => <ProductCard key={product.name} product={product} />)}</div>
    <div className="catalog-footer"><span>Pesan minimal H-1 untuk acara &amp; hampers</span><a href={WHATSAPP_URL} target="_blank" rel="noreferrer">Tanya ketersediaan <ArrowUpRight size={16} /></a></div>
  </section>
}

function StorySection() {
  return <section className="story section" id="cerita"><div className="story-panel"><div className="story-copy"><p className="eyebrow">Kenapa Rumah Restu?</p><h2>Rasa yang dimulai dari <em>meja makan.</em></h2><p>Kami percaya makanan enak tidak perlu rumit. Cukup bahan yang baik, tangan yang telaten, dan resep yang diwariskan dari satu generasi ke generasi berikutnya.</p><div className="story-meta"><span><Clock3 size={18} /> dibuat segar tiap pagi</span><span><MapPin size={18} /> Bandung &amp; sekitarnya</span></div></div><div className="story-stamp"><span>sejak</span><strong>2018</strong><span>dari rumah, untuk rumah</span></div></div></section>
}

function OrderSection() {
  return <section className="order section" id="cara-pesan"><div className="order-inner"><p className="eyebrow">Satu pesan, banyak cerita</p><h2>Siap menghangatkan<br /><em>hari ini?</em></h2><p>Chat kami untuk cek stok, pilih paket, dan atur waktu pengantaran.</p><a className="button button-light" href={WHATSAPP_URL} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Pesan via WhatsApp</a></div></section>
}

function Footer() {
  return <footer className="footer"><div className="brand"><span className="brand-mark">r</span><span>rumah<span className="brand-light">restu</span></span></div><p>Hangatnya selalu pulang.</p><a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram Rumah Restu"><Camera size={18} /></a><small>© 2026 Rumah Restu</small></footer>
}

function App() { return <><Navbar /><main><HeroScrollCanvas /><ProductCatalog /><StorySection /><OrderSection /></main><Footer /></> }

createRoot(document.getElementById('root')).render(<App />)
