import { Link } from '@tanstack/react-router';
import { MapPin, Maximize2, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { type Property } from '../backend';

interface PropertyCardProps {
  property: Property;
}

function formatPrice(price: bigint): string {
  const num = Number(price);
  if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `$${(num / 1_000).toFixed(0)}K`;
  return `$${num.toLocaleString()}`;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const imageUrl = property.imageUrls[0] || '/assets/generated/property-sample-1.dim_800x600.jpg';
  const isResidential = property.propertyType === 'Residential' || String(property.propertyType) === 'Residential';

  return (
    <div className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 border border-border flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={imageUrl}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src = '/assets/generated/property-sample-1.dim_800x600.jpg';
          }}
        />
        <div className="absolute top-3 left-3">
          <Badge
            className={`text-xs font-semibold px-2.5 py-1 ${
              isResidential
                ? 'bg-navy text-white border-0'
                : 'bg-gold text-navy border-0'
            }`}
          >
            {isResidential ? 'Residential' : 'Commercial'}
          </Badge>
        </div>
        {property.isFeatured && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-gold text-navy text-xs font-semibold border-0 px-2.5 py-1">
              Featured
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-semibold text-lg text-foreground mb-1 line-clamp-1 group-hover:text-gold transition-colors">
          {property.title}
        </h3>
        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
          <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
          <span className="line-clamp-1">{property.location}</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Maximize2 className="w-3.5 h-3.5 text-gold" />
            <span>{Number(property.squareFootage).toLocaleString()} sqft</span>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <span className="font-display font-bold text-2xl text-navy">
            {formatPrice(property.price)}
          </span>
          <Link to="/listings/$id" params={{ id: property.id.toString() }}>
            <Button
              size="sm"
              className="bg-gold text-navy font-semibold hover:bg-gold-light transition-colors group/btn"
            >
              View Details
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover/btn:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
