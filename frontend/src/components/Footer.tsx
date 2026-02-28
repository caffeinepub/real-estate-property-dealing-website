import { Link } from '@tanstack/react-router';
import { Building2, Phone, Mail, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'prime-properties');

  return (
    <footer className="bg-navy text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="text-gold w-6 h-6" />
              <span className="font-display font-bold text-xl">
                Prime <span className="text-gold">Properties</span>
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Your trusted partner in finding the perfect property. Expert guidance, verified listings, and exceptional service.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gold mb-4 uppercase tracking-wider text-xs">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', href: '/' },
                { label: 'All Listings', href: '/listings' },
                { label: 'About Us', href: '/about' },
                { label: 'Contact', href: '/contact' },
                { label: 'Admin Dashboard', href: '/admin' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-white/60 hover:text-gold text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h4 className="font-semibold text-gold mb-4 uppercase tracking-wider text-xs">Property Types</h4>
            <ul className="space-y-2">
              {['Residential Homes', 'Commercial Spaces', 'Luxury Villas', 'Office Suites', 'Retail Spaces'].map((type) => (
                <li key={type}>
                  <Link
                    to="/listings"
                    className="text-white/60 hover:text-gold text-sm transition-colors duration-200"
                  >
                    {type}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-gold mb-4 uppercase tracking-wider text-xs">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-white/60 text-sm">
                <Phone className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2 text-white/60 text-sm">
                <Mail className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <span>contact@primeproperties.com</span>
              </li>
              <li className="flex items-start gap-2 text-white/60 text-sm">
                <MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <span>123 Main Street, Suite 100<br />Los Angeles, CA 90001</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-sm">
            © {year} Prime Properties. All rights reserved.
          </p>
          <p className="text-white/40 text-sm flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-gold fill-gold" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold-light transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
