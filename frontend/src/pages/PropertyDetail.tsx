import { useParams } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import { MapPin, Maximize2, Tag, ChevronRight, Map } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import ImageGallery from '../components/ImageGallery';
import InquiryForm from '../components/InquiryForm';
import { useGetProperty } from '../hooks/useQueries';

function formatPrice(price: bigint): string {
  const num = Number(price);
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);
}

export default function PropertyDetail() {
  const { id } = useParams({ strict: false }) as { id: string };
  const propertyId = id ? BigInt(id) : null;
  const { data: property, isLoading, isError } = useGetProperty(propertyId);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <Skeleton className="h-6 w-48 mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="aspect-[16/9] w-full rounded-xl" />
            <div className="flex gap-2">
              {[1, 2, 3].map(i => <Skeleton key={i} className="w-20 h-16 rounded-lg" />)}
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-40 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !property) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="font-display font-bold text-2xl text-foreground mb-3">Property Not Found</h2>
        <p className="text-muted-foreground mb-6">The property you're looking for doesn't exist or has been removed.</p>
        <Link to="/listings" className="text-gold hover:underline font-medium">← Back to Listings</Link>
      </div>
    );
  }

  const isResidential = String(property.propertyType) === 'Residential';

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-muted/30 border-b border-border py-3">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/listings" className="hover:text-gold transition-colors">Listings</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground font-medium line-clamp-1">{property.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Gallery + Details */}
          <div className="lg:col-span-2 space-y-8">
            <ImageGallery imageUrls={property.imageUrls} title={property.title} />

            {/* Property Info */}
            <div>
              <div className="flex flex-wrap items-start gap-3 mb-3">
                <Badge className={`${isResidential ? 'bg-navy text-white' : 'bg-gold text-navy'} border-0 text-sm px-3 py-1`}>
                  {isResidential ? 'Residential' : 'Commercial'}
                </Badge>
                {property.isFeatured && (
                  <Badge className="bg-gold/20 text-gold border-gold/30 text-sm px-3 py-1">Featured</Badge>
                )}
              </div>

              <h1 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-2">{property.title}</h1>

              <div className="flex items-center gap-1.5 text-muted-foreground mb-4">
                <MapPin className="w-4 h-4 text-gold" />
                <span>{property.location}</span>
              </div>

              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-gold" />
                  <span className="font-display font-bold text-2xl text-navy">{formatPrice(property.price)}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Maximize2 className="w-4 h-4 text-gold" />
                  <span>{Number(property.squareFootage).toLocaleString()} sq ft</span>
                </div>
              </div>

              <Separator className="mb-6" />

              <div className="mb-6">
                <h2 className="font-display font-semibold text-xl text-foreground mb-3">Description</h2>
                <p className="text-muted-foreground leading-relaxed">{property.description}</p>
              </div>

              {property.amenities.length > 0 && (
                <div className="mb-6">
                  <h2 className="font-display font-semibold text-xl text-foreground mb-3">Amenities</h2>
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="bg-gold/10 text-gold border border-gold/20 text-sm px-3 py-1.5 rounded-full font-medium"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Map Placeholder */}
            <div>
              <h2 className="font-display font-semibold text-xl text-foreground mb-3">Location Map</h2>
              <div className="rounded-xl overflow-hidden border border-border h-64 bg-gradient-to-br from-navy/10 to-navy/5 flex flex-col items-center justify-center gap-3">
                <div className="w-14 h-14 rounded-full bg-navy/10 flex items-center justify-center">
                  <Map className="w-7 h-7 text-navy/40" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-foreground/60">{property.location}</p>
                  <p className="text-sm text-muted-foreground">Map view coming soon</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Inquiry Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-card rounded-xl border border-border shadow-card p-6">
                <div className="mb-4">
                  <h2 className="font-display font-bold text-xl text-foreground">Book a Visit</h2>
                  <p className="text-muted-foreground text-sm mt-1">Interested? Send us an inquiry and we'll get back to you shortly.</p>
                </div>
                <Separator className="mb-5" />
                <InquiryForm propertyId={property.id} propertyTitle={property.title} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
