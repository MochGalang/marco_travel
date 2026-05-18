import { MapPin, Phone, Mail } from 'lucide-react';

const navLinks = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Paket Haji', href: '#paket' },
  { label: 'Tentang Kami', href: '#tentang' },
  { label: 'Testimoni', href: '#testimoni' },
  { label: 'Kontak', href: '#kontak' },
];

const paketLinks = [
  { label: 'Haji Khusus 2026', href: '#paket' },
  { label: 'Umroh Reguler', href: '#paket' },
  { label: 'Umroh Ramadhan', href: '#paket' },
  { label: 'Umroh Plus Turki', href: '#paket' },
  { label: 'Umroh Plus Eropa', href: '#paket' },
];

export default function Footer() {
  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="kontak" className="bg-[#0a2018] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-5">
              <div className="hexagon w-11 h-11 bg-gradient-to-br from-[#1a5c3a] to-[#2d7a50] flex items-center justify-center shadow-lg">
                <span
                  className="font-bold text-white text-xl leading-none"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  M
                </span>
              </div>
              <div>
                <p className="font-bold text-white text-lg leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>MARCO</p>
                <p className="text-[#c9a84c] text-xs tracking-widest uppercase">Tour . Travel</p>
              </div>
            </div>

            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Agen resmi haji khusus &amp; umroh terpercaya sejak 2003. Melayani perjalanan ibadah dengan profesionalisme dan ketulusan hati.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              {[
                { label: 'IG', href: '#' },
                { label: 'FB', href: '#' },
                { label: 'YT', href: '#' },
                { label: 'TT', href: '#' },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#1a5c3a] text-white/60 hover:text-white flex items-center justify-center transition-all duration-200 text-xs font-bold"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-white mb-5 text-sm tracking-wide uppercase">Navigasi</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                    className="text-white/60 hover:text-[#c9a84c] text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-[#c9a84c] group-hover:w-4 transition-all duration-200" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Paket */}
          <div>
            <h4 className="font-bold text-white mb-5 text-sm tracking-wide uppercase">Paket Wisata</h4>
            <ul className="space-y-3">
              {paketLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                    className="text-white/60 hover:text-[#c9a84c] text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-[#c9a84c] group-hover:w-4 transition-all duration-200" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-5 text-sm tracking-wide uppercase">Kontak Kami</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-white/60 hover:text-white/90 transition-colors text-sm"
                >
                  <MapPin size={16} className="text-[#c9a84c] mt-0.5 flex-shrink-0" />
                  <span>Jl. Sudirman No. 88, Lantai 12<br />Jakarta Pusat, DKI Jakarta 10220</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+6281234567890"
                  className="flex items-center gap-3 text-white/60 hover:text-white/90 transition-colors text-sm"
                >
                  <Phone size={16} className="text-[#c9a84c] flex-shrink-0" />
                  +62 812-3456-7890
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@marcotour.co.id"
                  className="flex items-center gap-3 text-white/60 hover:text-white/90 transition-colors text-sm"
                >
                  <Mail size={16} className="text-[#c9a84c] flex-shrink-0" />
                  info@marcotour.co.id
                </a>
              </li>
            </ul>

            {/* WA Button */}
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-white/40 text-xs">
                © 2026 PT. Marco Tour &amp; Travel. Seluruh hak cipta dilindungi.
              </p>
              <p className="text-white/30 text-xs mt-1">
                No. Izin Kemenag RI: PHU.HK.07/2/1/3156/2003 • SK Menag No. D/333 Tahun 2003
              </p>
            </div>
            <div className="flex items-center gap-4 text-white/40 text-xs">
              <a href="#" className="hover:text-white/70 transition-colors">Kebijakan Privasi</a>
              <span>•</span>
              <a href="#" className="hover:text-white/70 transition-colors">Syarat &amp; Ketentuan</a>
              <span>•</span>
              <a href="#" className="hover:text-white/70 transition-colors">FAQ</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
