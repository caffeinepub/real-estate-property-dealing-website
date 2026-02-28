import { Award, Users, Home, Globe, Shield, Lightbulb, Heart, Target } from 'lucide-react';

const stats = [
  { value: '10+', label: 'Years in Business' },
  { value: '500+', label: 'Properties Sold' },
  { value: '1,000+', label: 'Happy Clients' },
  { value: '5+', label: 'Cities Covered' },
];

const team = [
  {
    name: 'James Mitchell',
    title: 'Senior Real Estate Agent',
    image: '/assets/generated/agent-male-1.dim_400x400.jpg',
    bio: '15 years of experience in luxury residential properties.',
  },
  {
    name: 'Sarah Chen',
    title: 'Commercial Property Specialist',
    image: '/assets/generated/agent-female-1.dim_400x400.jpg',
    bio: 'Expert in commercial real estate and investment properties.',
  },
  {
    name: 'Emily Rodriguez',
    title: 'Residential Sales Manager',
    image: '/assets/generated/agent-female-2.dim_400x400.jpg',
    bio: 'Dedicated to helping families find their perfect home.',
  },
];

const values = [
  { icon: Shield, title: 'Trust & Integrity', desc: 'We operate with complete transparency and honesty in every transaction.' },
  { icon: Award, title: 'Expertise', desc: 'Our team brings deep market knowledge and professional excellence to every deal.' },
  { icon: Lightbulb, title: 'Innovation', desc: 'We leverage the latest technology to streamline your property search and purchase.' },
  { icon: Heart, title: 'Client Focus', desc: 'Your satisfaction is our priority — we go above and beyond to exceed expectations.' },
];

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-navy py-20 text-center">
        <div className="container mx-auto px-4">
          <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-3">About Us</p>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-white mb-4">
            Your Trusted Real Estate Partner
          </h1>
          <p className="text-white/65 text-lg max-w-2xl mx-auto">
            Prime Properties has been connecting buyers, sellers, and investors with exceptional properties for over a decade.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-3">Our Story</p>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-5">
                Built on a Foundation of Trust
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Prime Properties was founded with a simple mission: to make the process of buying, selling, and renting property as seamless and rewarding as possible. What started as a small boutique agency has grown into one of the region's most respected real estate firms.
                </p>
                <p>
                  Over the past decade, we've helped thousands of clients navigate the complex world of real estate — from first-time homebuyers to seasoned investors. Our deep local market knowledge, combined with a commitment to personalized service, sets us apart from the competition.
                </p>
                <p>
                  We believe that finding the right property is about more than just square footage and price — it's about finding a place where life happens. That's why we take the time to truly understand each client's unique needs and aspirations.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-navy rounded-2xl p-6 text-center">
                <Home className="w-8 h-8 text-gold mx-auto mb-3" />
                <p className="font-display font-bold text-3xl text-white">500+</p>
                <p className="text-white/60 text-sm mt-1">Properties Sold</p>
              </div>
              <div className="bg-gold/10 border border-gold/20 rounded-2xl p-6 text-center">
                <Users className="w-8 h-8 text-gold mx-auto mb-3" />
                <p className="font-display font-bold text-3xl text-foreground">1,000+</p>
                <p className="text-muted-foreground text-sm mt-1">Happy Clients</p>
              </div>
              <div className="bg-gold/10 border border-gold/20 rounded-2xl p-6 text-center">
                <Award className="w-8 h-8 text-gold mx-auto mb-3" />
                <p className="font-display font-bold text-3xl text-foreground">10+</p>
                <p className="text-muted-foreground text-sm mt-1">Years Experience</p>
              </div>
              <div className="bg-navy rounded-2xl p-6 text-center">
                <Globe className="w-8 h-8 text-gold mx-auto mb-3" />
                <p className="font-display font-bold text-3xl text-white">5+</p>
                <p className="text-white/60 text-sm mt-1">Cities Covered</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Row */}
      <section className="py-12 bg-navy">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display font-bold text-4xl text-gold mb-1">{stat.value}</p>
                <p className="text-white/60 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-2">Our People</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-3">Meet the Team</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Our experienced agents are passionate about real estate and dedicated to your success.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-card rounded-xl overflow-hidden border border-border shadow-card hover:shadow-card-hover transition-all duration-300 text-center"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = '/assets/generated/agent-male-1.dim_400x400.jpg';
                    }}
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display font-semibold text-lg text-foreground">{member.name}</h3>
                  <p className="text-gold text-sm font-medium mb-2">{member.title}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-2">What We Stand For</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-3">Our Core Values</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="bg-card rounded-xl p-6 border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-navy text-center">
        <div className="container mx-auto px-4">
          <Target className="w-10 h-10 text-gold mx-auto mb-4" />
          <h2 className="font-display font-bold text-3xl text-white mb-3">Ready to Work With Us?</h2>
          <p className="text-white/65 mb-7 max-w-lg mx-auto">
            Let our expert team guide you through your next real estate journey.
          </p>
          <a href="/contact">
            <button className="bg-gold text-navy font-bold px-8 py-3 rounded-lg hover:bg-gold-light transition-colors shadow-gold text-base">
              Get in Touch
            </button>
          </a>
        </div>
      </section>
    </div>
  );
}
