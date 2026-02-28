import { PropertyType } from '../backend';

export const seedProperties = [
  {
    title: 'Modern Luxury Villa',
    description: 'A stunning modern villa featuring open-plan living spaces, floor-to-ceiling windows, and premium finishes throughout. Perfect for families seeking luxury and comfort in a prime location.',
    price: BigInt(1250000),
    squareFootage: BigInt(3200),
    location: 'Beverly Hills, CA',
    propertyType: PropertyType.Residential,
    amenities: ['Swimming Pool', 'Home Theater', 'Smart Home', 'Garage', 'Garden', 'Security System'],
    imageUrls: [
      '/assets/generated/property-sample-1.dim_800x600.jpg',
      '/assets/generated/property-sample-2.dim_800x600.jpg',
    ],
    isFeatured: true,
  },
  {
    title: 'Contemporary Suburban Home',
    description: 'A beautifully designed suburban home with a manicured garden, spacious interiors, and modern amenities. Ideal for families looking for a peaceful neighborhood with excellent schools nearby.',
    price: BigInt(485000),
    squareFootage: BigInt(2100),
    location: 'Pasadena, CA',
    propertyType: PropertyType.Residential,
    amenities: ['Backyard', 'Garage', 'Updated Kitchen', 'Hardwood Floors', 'Central AC'],
    imageUrls: [
      '/assets/generated/property-sample-2.dim_800x600.jpg',
      '/assets/generated/property-sample-1.dim_800x600.jpg',
    ],
    isFeatured: true,
  },
  {
    title: 'Premium Office Tower Suite',
    description: 'A sleek, modern office suite in a prestigious glass-facade tower in the heart of the business district. Features state-of-the-art facilities, high-speed connectivity, and stunning city views.',
    price: BigInt(890000),
    squareFootage: BigInt(4500),
    location: 'Downtown Los Angeles, CA',
    propertyType: PropertyType.Commercial,
    amenities: ['Conference Rooms', 'Reception Area', 'Parking', 'High-Speed Internet', 'Security', 'Elevator Access'],
    imageUrls: [
      '/assets/generated/property-sample-3.dim_800x600.jpg',
      '/assets/generated/property-sample-4.dim_800x600.jpg',
    ],
    isFeatured: true,
  },
  {
    title: 'Retail Commercial Space',
    description: 'Bright, open-plan commercial retail space with polished floors and high ceilings. Perfect for retail businesses, showrooms, or creative studios in a high-foot-traffic area.',
    price: BigInt(320000),
    squareFootage: BigInt(1800),
    location: 'Santa Monica, CA',
    propertyType: PropertyType.Commercial,
    amenities: ['High Ceilings', 'Display Windows', 'Loading Dock', 'Parking', 'HVAC'],
    imageUrls: [
      '/assets/generated/property-sample-4.dim_800x600.jpg',
      '/assets/generated/property-sample-3.dim_800x600.jpg',
    ],
    isFeatured: false,
  },
];
