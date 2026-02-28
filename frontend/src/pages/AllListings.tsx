import { useEffect, useState } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { SlidersHorizontal, Building2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import SearchBar, { type SearchFilters } from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import { useSearchProperties } from '../hooks/useQueries';
import { PropertyType } from '../backend';

function parsePropertyType(val: string | undefined): PropertyType | null {
  if (val === 'Residential') return PropertyType.Residential;
  if (val === 'Commercial') return PropertyType.Commercial;
  return null;
}

function parseBudget(val: string | undefined): bigint | null {
  if (!val || val === 'all' || val === 'above') return null;
  const num = parseInt(val, 10);
  return isNaN(num) ? null : BigInt(num);
}

export default function AllListings() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as Record<string, string>;

  const [filters, setFilters] = useState<SearchFilters>({
    propertyType: search.type || 'all',
    maxBudget: search.budget || 'all',
    location: search.location || '',
  });

  useEffect(() => {
    setFilters({
      propertyType: search.type || 'all',
      maxBudget: search.budget || 'all',
      location: search.location || '',
    });
  }, [search.type, search.budget, search.location]);

  const propertyType = parsePropertyType(filters.propertyType);
  const maxBudget = parseBudget(filters.maxBudget);
  const locationKeyword = filters.location || null;

  const { data: properties, isLoading, isError } = useSearchProperties(propertyType, maxBudget, locationKeyword);

  const handleSearch = (newFilters: SearchFilters) => {
    setFilters(newFilters);
    const params: Record<string, string> = {};
    if (newFilters.propertyType !== 'all') params.type = newFilters.propertyType;
    if (newFilters.maxBudget !== 'all') params.budget = newFilters.maxBudget;
    if (newFilters.location) params.location = newFilters.location;
    navigate({ to: '/listings', search: params });
  };

  const hasActiveFilters = filters.propertyType !== 'all' || filters.maxBudget !== 'all' || !!filters.location;

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-navy py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-gold/70 text-sm mb-2">
            <Building2 className="w-4 h-4" />
            <span>All Properties</span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-white mb-2">Property Listings</h1>
          <p className="text-white/60">Discover your perfect property from our curated collection</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-muted/30 border-b border-border py-4">
        <div className="container mx-auto px-4">
          <SearchBar
            initialValues={filters}
            onSearch={handleSearch}
            variant="inline"
          />
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-10">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
            {isLoading ? (
              <Skeleton className="h-5 w-32" />
            ) : (
              <span className="text-muted-foreground text-sm">
                {properties?.length ?? 0} {properties?.length === 1 ? 'property' : 'properties'} found
                {hasActiveFilters && ' (filtered)'}
              </span>
            )}
          </div>
          {hasActiveFilters && (
            <button
              onClick={() => handleSearch({ propertyType: 'all', maxBudget: 'all', location: '' })}
              className="text-gold text-sm hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
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
        ) : isError ? (
          <div className="text-center py-20">
            <p className="text-destructive text-lg">Failed to load properties. Please try again.</p>
          </div>
        ) : properties && properties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id.toString()} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="font-display font-semibold text-xl text-foreground mb-2">No Properties Found</h3>
            <p className="text-muted-foreground mb-6">
              {hasActiveFilters
                ? 'No properties match your current filters. Try adjusting your search criteria.'
                : 'No properties are listed yet. Check back soon!'}
            </p>
            {hasActiveFilters && (
              <button
                onClick={() => handleSearch({ propertyType: 'all', maxBudget: 'all', location: '' })}
                className="text-gold hover:underline font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
