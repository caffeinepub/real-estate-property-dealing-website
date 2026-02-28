import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface SearchFilters {
  propertyType: string;
  maxBudget: string;
  location: string;
}

interface SearchBarProps {
  initialValues?: Partial<SearchFilters>;
  onSearch: (filters: SearchFilters) => void;
  variant?: 'hero' | 'inline';
}

const budgetOptions = [
  { label: 'Any Budget', value: 'all' },
  { label: 'Under $200K', value: '200000' },
  { label: 'Under $500K', value: '500000' },
  { label: 'Under $1M', value: '1000000' },
  { label: 'Under $2M', value: '2000000' },
  { label: '$2M+', value: 'above' },
];

export default function SearchBar({ initialValues, onSearch, variant = 'hero' }: SearchBarProps) {
  const [propertyType, setPropertyType] = useState(initialValues?.propertyType || 'all');
  const [maxBudget, setMaxBudget] = useState(initialValues?.maxBudget || 'all');
  const [location, setLocation] = useState(initialValues?.location || '');

  const handleSearch = () => {
    onSearch({ propertyType, maxBudget, location });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  if (variant === 'inline') {
    return (
      <div className="flex flex-col sm:flex-row gap-3 p-4 bg-card rounded-xl border border-border shadow-card">
        <Select value={propertyType} onValueChange={setPropertyType}>
          <SelectTrigger className="sm:w-44 border-border">
            <SelectValue placeholder="Property Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Residential">Residential</SelectItem>
            <SelectItem value="Commercial">Commercial</SelectItem>
          </SelectContent>
        </Select>

        <Select value={maxBudget} onValueChange={setMaxBudget}>
          <SelectTrigger className="sm:w-44 border-border">
            <SelectValue placeholder="Max Budget" />
          </SelectTrigger>
          <SelectContent>
            {budgetOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          placeholder="Location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 border-border"
        />

        <Button
          onClick={handleSearch}
          className="bg-gold text-navy font-semibold hover:bg-gold-light shrink-0"
        >
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20 shadow-2xl">
      <div className="flex flex-col md:flex-row gap-2">
        <Select value={propertyType} onValueChange={setPropertyType}>
          <SelectTrigger className="md:w-48 bg-white text-navy border-0 font-medium h-12 rounded-xl">
            <SelectValue placeholder="Property Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Residential">Residential</SelectItem>
            <SelectItem value="Commercial">Commercial</SelectItem>
          </SelectContent>
        </Select>

        <Select value={maxBudget} onValueChange={setMaxBudget}>
          <SelectTrigger className="md:w-48 bg-white text-navy border-0 font-medium h-12 rounded-xl">
            <SelectValue placeholder="Max Budget" />
          </SelectTrigger>
          <SelectContent>
            {budgetOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          placeholder="Enter location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-white text-navy border-0 font-medium h-12 rounded-xl placeholder:text-navy/40"
        />

        <Button
          onClick={handleSearch}
          className="bg-gold text-navy font-bold hover:bg-gold-light h-12 px-8 rounded-xl shadow-gold text-base"
        >
          <Search className="w-5 h-5 mr-2" />
          Search
        </Button>
      </div>
    </div>
  );
}
