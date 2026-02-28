import { Link } from '@tanstack/react-router';
import { Home, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-background">
      <div className="text-center px-4">
        <div className="w-24 h-24 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
          <Building2 className="w-12 h-12 text-gold" />
        </div>
        <h1 className="font-display font-bold text-6xl text-navy mb-3">404</h1>
        <h2 className="font-display font-semibold text-2xl text-foreground mb-3">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button className="bg-gold text-navy font-semibold hover:bg-gold-light gap-2">
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <Link to="/listings">
            <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-navy gap-2">
              <Building2 className="w-4 h-4" />
              Browse Listings
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
