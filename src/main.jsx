import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowUpRight, BadgePercent, Clock3, MapPin, MessageCircle, Sparkles } from 'lucide-react'
import './styles.css'

const WHATSAPP_URL = 'https://wa.me/6285842817255?text=Halo%20Rumah%20Restu%2C%20saya%20ingin%20memesan%20camilan.'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`site-nav ${scrolled ? 'is-scrolled' : ''}`}>
    <a className="brand" href="#top" aria-label="Rumah Restu beranda">
        <img className="brand-logo" src="/products/logo.png" alt="" aria-hidden="true" draggable="false" />
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

function InstagramIcon() {
  return <svg className="instagram-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="17.5" cy="6.7" r="1.1" fill="currentColor" /></svg>
}

function HeroSection() {
  return (
    <section className="hero-scroll" id="top">
      <div className="hero-sticky">
        <div className="hero-glow" />
        <img className="hero-static-image" src="/products/Risol-BG.jpg" alt="Risol Rumah Restu yang renyah dan hangat" draggable="false" onError={(event) => { event.currentTarget.style.display = 'none'; event.currentTarget.nextElementSibling.style.display = 'block' }} />
        <ProductFallback accent="gold" />
        <div className="hero-copy">
          {/* <p className="eyebrow"><span className="eyebrow-dot" /> Dimasak setiap pagi, dari dapur keluarga</p> */}
          <h1>Hangatnya<br /><em>selalu pulang.</em></h1>
          <p className="hero-description">Camilan rumahan dengan isian melimpah, kulit renyah, dan rasa yang terasa seperti pelukan pertama di rumah.</p>
          <a className="button button-dark" href="#menu">Lihat menu <ArrowUpRight size={17} /></a>
        </div>
        <div className="hero-note"><Sparkles size={15} /><span>100% homemade<br /><strong>fresh setiap hari</strong></span></div>
      </div>
    </section>
  )
}

const products = [
  { name: 'Bolu Kukus Karamel', detail: 'Lembut, wangi karamel, tanpa pemanis buatan', price: 'Rp 35.000 / box', accent: 'cream', image: '/products/Bolu.jpg', bestSeller: true },
  { name: 'Risol Sayur dan Ayam', detail: 'Ayam suwir, sayur segar', price: 'Rp 2.500 / pcs', accent: 'gold', image: '/products/Risol.jpg' },
  { name: 'Cilok Bumbu Kacang', detail: 'Kenyal lembut, bumbu kacang gurih pedas', price: 'Rp 15.000 / porsi', accent: 'terracotta', image: '/products/Cilok.jpg' },
  { name: 'Gorengan Renyah', detail: 'Gurih, renyah, cocok untuk teman ngobrol', price: 'Rp 18.000 / box', accent: 'gold', image: '/products/Gorengan.jpg' },
  { name: 'Nugget Singkong', detail: 'Renyah di luar, lembut di dalam', price: 'Rp 20.000 / box', accent: 'terracotta', image: '/products/Nugetsingkong.jpg' },
]

function ProductCard({ product }) {
  return <article className="product-card">
    <div className="product-image"><img src={product.image} alt={product.name} loading="lazy" onError={(event) => { event.currentTarget.style.display = 'none'; event.currentTarget.nextElementSibling.style.display = 'block' }} /><ProductFallback accent={product.accent} /><span className={`product-tag ${product.bestSeller ? 'best-seller' : ''}`}>{product.bestSeller ? 'best seller' : 'favorit rumah'}</span></div>
    <div className="product-info"><div><h3>{product.name}</h3><p>{product.detail}</p></div><span className="price">{product.price}</span></div>
  </article>
}

function ProductCatalog() {
  return <section className="catalog section" id="menu">
    <div className="section-heading"><div><p className="eyebrow">Dari dapur, dengan cerita</p><h2>Yang bikin ingin<br /><em>tambah lagi.</em></h2></div><p className="section-intro">Menu kecil kami dibuat dalam batch terbatas supaya setiap gigitan tetap hangat, renyah, dan penuh perhatian.</p></div>
    <div className="product-grid">{products.map((product) => <ProductCard key={product.name} product={product} />)}</div>
    <div className="catalog-footer"><span>Pesan minimal H-2 untuk acara &amp; hampers  I Pesanan anda dibuat dadakan setelah anda memesan</span><a href={WHATSAPP_URL} target="_blank" rel="noreferrer">Tanya ketersediaan <ArrowUpRight size={16} /></a></div>
  </section>
}

function StorySection() {
  return <section className="story section" id="cerita"><div className="story-panel"><div className="story-copy"><p className="eyebrow">Kenapa Rumah Restu?</p><h2>Rasa yang dimulai dari <em>meja makan.</em></h2><p>Kami percaya makanan enak tidak perlu rumit. Cukup bahan yang baik, tangan yang telaten, dan resep yang diwariskan dari satu generasi ke generasi berikutnya.</p><div className="story-meta"><span><Clock3 size={18} /> dibuat segar tiap pagi</span><span><MapPin size={18} /> Cianjur &amp; sekitarnya</span></div></div><div className="story-stamp"><span>sejak</span><strong>2018</strong><span>dari rumah, untuk rumah</span></div></div></section>
}

function OrderSection() {
  return <section className="order section" id="cara-pesan"><div className="order-inner"><p className="eyebrow">Satu pesan, banyak cerita</p><h2>Siap menghangatkan<br /><em>hari ini?</em></h2><p>Chat kami untuk cek stok, pilih paket, dan atur waktu pengantaran.</p><div className="occasion-note"><Sparkles size={18} /><span><strong>Cocok untuk segala kebutuhan anda</strong><small>Syukuran, pengajian, acara keluarga, rapat kecil, atau sekadar stok camilan di rumah—semuanya boleh.</small></span></div><a className="button button-light" href={WHATSAPP_URL} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Pesan via WhatsApp</a><div className="payment-note"><BadgePercent size={21} /><span><strong>Pesanan dikonfirmasi dengan DP 50%</strong><small>Pelunasan dilakukan saat pesanan siap diambil atau dikirim.</small></span></div></div></section>
}

function Footer() {
  return <footer className="footer"><div className="brand"><img className="brand-logo" src="/products/logo.png" alt="" aria-hidden="true" draggable="false" /><span>rumah<span className="brand-light">restu</span></span></div><p>Setiap Pesanan Berarti.</p><a href="https://www.instagram.com/rumahrestu" target="_blank" rel="noreferrer" aria-label="Instagram Rumah Restu"><InstagramIcon /></a><small>© 2026 Rumah Restu</small></footer>
}

function App() { return <><Navbar /><main><HeroSection /><ProductCatalog /><StorySection /><OrderSection /></main><Footer /></> }

createRoot(document.getElementById('root')).render(<App />)
