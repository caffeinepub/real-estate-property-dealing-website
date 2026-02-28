import { useNavigate } from '@tanstack/react-router';
import { ArrowRight, Shield, Star, Clock, MapPin, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import SearchBar, { type SearchFilters } from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import { useGetFeaturedProperties } from '../hooks/useQueries';
import { Link } from '@tanstack/react-router';

const whyChooseUs = [
  {
    icon: Shield,
    title: 'Verified Listings',
    desc: 'Every property is thoroughly verified and inspected before listing, ensuring you only see genuine opportunities.',
  },
  {
    icon: Star,
    title: 'Expert Agents',
    desc: 'Our team of seasoned real estate professionals brings decades of combined market expertise to every transaction.',
  },
  {
    icon: Clock,
    title: 'Fast Deals',
    desc: 'Streamlined processes and dedicated support mean faster closings and less stress for buyers and sellers alike.',
  },
  {
    icon: MapPin,
    title: 'Local Market Knowledge',
    desc: 'Deep roots in the local market give us unparalleled insight into neighborhoods, pricing trends, and hidden gems.',
  },
];

export default function Home() {
  const navigate = useNavigate();
  const { data: featuredProperties, isLoading } = useGetFeaturedProperties();

  const handleSearch = (filters: SearchFilters) => {
    const params: Record<string, string> = {};
    if (filters.propertyType !== 'all') params.type = filters.propertyType;
    if (filters.maxBudget !== 'all') params.budget = filters.maxBudget;
    if (filters.location) params.location = filters.location;
    navigate({ to: '/listings', search: params });
  };

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative min-h-[85vh] flex items-center justify-center bg-navy"
        style={{
          backgroundImage: `url('/assets/generated/hero-banner.dim_1920x900.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-navy/65" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/40 text-gold text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Star className="w-3.5 h-3.5 fill-gold" />
            Trusted by 1,000+ Happy Clients
          </div>
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-4 leading-tight">
            Find Your Dream<br />
            <span className="text-gold">Property Today</span>
          </h1>
          <p className="text-white/75 text-lg sm:text-xl mb-10 max-w-2xl mx-auto">
            Discover premium residential and commercial properties with expert guidance from Prime Properties — your trusted real estate partner.
          </p>

          <div className="max-w-3xl mx-auto">
            <SearchBar onSearch={handleSearch} variant="hero" />
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-10 text-white/60 text-sm">
            <span className="flex items-center gap-1.5"><span className="text-gold font-bold text-lg">500+</span> Properties Sold</span>
            <span className="w-px bg-white/20 hidden sm:block" />
            <span className="flex items-center gap-1.5"><span className="text-gold font-bold text-lg">10+</span> Years Experience</span>
            <span className="w-px bg-white/20 hidden sm:block" />
            <span className="flex items-center gap-1.5"><span className="text-gold font-bold text-lg">1000+</span> Happy Clients</span>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-2">Handpicked for You</p>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground">Featured Properties</h2>
            </div>
            <Link to="/listings">
              <Button variant="outline" className="hidden sm:flex border-gold text-gold hover:bg-gold hover:text-navy gap-2">
                View All <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="rounded-xl overflow-hidden border border-border">
                  <Skeleton className="aspect-[4/3] w-full" />
                  <div className="p-5 space-y-3">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : featuredProperties && featuredProperties.length > 0 ? (
            <Carousel opts={{ align: 'start', loop: false }} className="w-full">
              <CarouselContent className="-ml-4">
                {featuredProperties.map((property) => (
                  <CarouselItem key={property.id.toString()} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <PropertyCard property={property} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              {featuredProperties.length > 3 && (
                <>
                  <CarouselPrevious className="border-gold text-gold hover:bg-gold hover:text-navy -left-4" />
                  <CarouselNext className="border-gold text-gold hover:bg-gold hover:text-navy -right-4" />
                </>
              )}
            </Carousel>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-lg mb-4">No featured properties yet.</p>
              <Link to="/admin">
                <Button className="bg-gold text-navy hover:bg-gold-light">Add Properties in Admin</Button>
              </Link>
            </div>
          )}

          <div className="text-center mt-8 sm:hidden">
            <Link to="/listings">
              <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-navy gap-2">
                View All Listings <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-2">Our Advantage</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-4">Why Choose Prime Properties</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We combine local expertise with modern technology to deliver an exceptional real estate experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-card rounded-xl p-6 border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-navy">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
            Ready to Find Your Perfect Property?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
            Browse our extensive listings or get in touch with our expert team today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/listings">
              <Button className="bg-gold text-navy font-bold hover:bg-gold-light px-8 h-12 text-base shadow-gold">
                Browse All Properties
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-navy px-8 h-12 text-base">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
