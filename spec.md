# Specification

## Summary
**Goal:** Build a professional real estate website called "Prime Properties" with a Motoko backend for property and inquiry management, and a multi-page React frontend with an admin dashboard.

**Planned changes:**

### Backend (Motoko - single actor)
- Property data model: id, title, description, price, squareFootage, location, propertyType, amenities, imageUrls, isFeatured, createdAt
- CRUD functions: `addProperty`, `updateProperty`, `deleteProperty`, `getProperty`, `getAllProperties`, `getFeaturedProperties`, `searchProperties` (filter by type, maxBudget, location keyword)
- Inquiry data model: propertyId, visitorName, visitorEmail, visitorPhone, message, submittedAt
- Functions: `submitInquiry`, `getAllInquiries`

### Frontend (React, client-side routing)
- **Home (/):** Full-width hero banner with search bar (Property Type, Max Budget, Location), Featured Properties carousel, "Why Choose Us" section
- **All Listings (/listings):** Filter panel (type, budget, location), responsive property card grid, URL-synced filter state
- **Property Detail (/listings/:id):** Multi-image gallery, full property details, map placeholder, Book a Visit / Inquiry form
- **About Us (/about):** Hero banner, Our Story paragraph, stats row, Meet the Team (3 agent cards), Our Values section
- **Contact (/contact):** Contact form (submits as general inquiry), office info block, map placeholder
- **Admin Dashboard (/admin):** "Manage Listings" tab (table with add/edit/delete via modal form) and "Inquiries" tab (leads table)
- **Global:** Sticky header with logo, nav links, "List Your Property" CTA, mobile hamburger menu; footer with quick links and contact info
- **Design system:** Deep Navy (#0A1628), White (#FFFFFF), Gold (#C9A84C) accent, light gray (#F5F5F5) backgrounds; clean sans-serif font; fully responsive (mobile, tablet, desktop)
- Static generated images served from `frontend/public/assets/generated` and used in hero, header logo, About team section, and seed/demo property data

**User-visible outcome:** A fully functional, responsive real estate website where visitors can browse and search property listings, view property details and submit inquiries, and the site owner can manage listings and view leads via an admin dashboard.
