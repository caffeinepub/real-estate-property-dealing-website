import { useState } from 'react';
import { Link, useRouter } from '@tanstack/react-router';
import { Menu, X, Home, Building2, Info, Phone, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';

const navLinks = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Listings', href: '/listings', icon: Building2 },
  { label: 'About', href: '/about', icon: Info },
  { label: 'Contact', href: '/contact', icon: Phone },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const currentPath = router.state.location.pathname;

  const isActive = (href: string) => {
    if (href === '/') return currentPath === '/';
    return currentPath.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-navy shadow-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img
            src="/assets/generated/prime-properties-logo.dim_400x120.png"
            alt="Prime Properties"
            className="h-10 w-auto object-contain"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          <span
            className="hidden items-center gap-1 text-white font-display font-bold text-xl"
            style={{ display: 'none' }}
          >
            <Building2 className="text-gold w-6 h-6" />
            <span>Prime <span className="text-gold">Properties</span></span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive(link.href)
                  ? 'text-gold bg-navy-light'
                  : 'text-white/80 hover:text-white hover:bg-navy-light'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA + Mobile Menu */}
        <div className="flex items-center gap-3">
          <Link to="/admin" className="hidden md:block">
            <Button
              size="sm"
              className="bg-gold text-navy font-semibold hover:bg-gold-light transition-colors shadow-gold"
            >
              <LayoutDashboard className="w-4 h-4 mr-1.5" />
              Admin
            </Button>
          </Link>

          {/* Mobile Hamburger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                className="md:hidden text-white p-2 rounded-md hover:bg-navy-light transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-navy border-navy-light w-72 p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-navy-light">
                  <span className="text-white font-display font-bold text-lg">
                    Prime <span className="text-gold">Properties</span>
                  </span>
                  <SheetClose asChild>
                    <button className="text-white/70 hover:text-white p-1">
                      <X className="w-5 h-5" />
                    </button>
                  </SheetClose>
                </div>
                <nav className="flex flex-col p-4 gap-1 flex-1">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <SheetClose asChild key={link.href}>
                        <Link
                          to={link.href}
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                            isActive(link.href)
                              ? 'text-gold bg-navy-light'
                              : 'text-white/80 hover:text-white hover:bg-navy-light'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          {link.label}
                        </Link>
                      </SheetClose>
                    );
                  })}
                  <SheetClose asChild>
                    <Link
                      to="/admin"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-navy-light transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Admin Dashboard
                    </Link>
                  </SheetClose>
                </nav>
                <div className="p-4 border-t border-navy-light">
                  <SheetClose asChild>
                    <Link to="/listings">
                      <Button className="w-full bg-gold text-navy font-semibold hover:bg-gold-light">
                        Browse Properties
                      </Button>
                    </Link>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
