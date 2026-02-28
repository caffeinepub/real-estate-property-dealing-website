import { Map, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import InquiryForm from '../components/InquiryForm';

// General inquiry uses a fixed propertyId of 0 (we'll use BigInt(0) as a convention)
// Note: The backend requires a valid propertyId. See backend-gaps.
const GENERAL_INQUIRY_ID = BigInt(0);

const officeInfo = [
  { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
  { icon: Mail, label: 'Email', value: 'contact@primeproperties.com' },
  { icon: MapPin, label: 'Address', value: '123 Main Street, Suite 100\nLos Angeles, CA 90001' },
  { icon: Clock, label: 'Office Hours', value: 'Mon–Fri: 9AM – 6PM\nSat: 10AM – 4PM' },
];

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-navy py-16 text-center">
        <div className="container mx-auto px-4">
          <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-3">Get in Touch</p>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-white mb-3">Contact Us</h1>
          <p className="text-white/65 text-lg max-w-xl mx-auto">
            Have a question or ready to start your property journey? We'd love to hear from you.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl border border-border shadow-card p-6 sm:p-8">
              <h2 className="font-display font-bold text-2xl text-foreground mb-1">Send Us a Message</h2>
              <p className="text-muted-foreground text-sm mb-5">Fill out the form below and our team will respond within 24 hours.</p>
              <Separator className="mb-6" />
              <InquiryForm propertyId={GENERAL_INQUIRY_ID} propertyTitle="General Inquiry" />
            </div>
          </div>

          {/* Office Info + Map */}
          <div className="space-y-6">
            {/* Office Info Card */}
            <div className="bg-card rounded-xl border border-border shadow-card p-6">
              <h2 className="font-display font-semibold text-xl text-foreground mb-4">Office Information</h2>
              <div className="space-y-4">
                {officeInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-4 h-4 text-gold" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">{item.label}</p>
                        <p className="text-foreground text-sm whitespace-pre-line">{item.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="rounded-xl overflow-hidden border border-border h-52 bg-gradient-to-br from-navy/10 to-navy/5 flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-navy/10 flex items-center justify-center">
                <Map className="w-6 h-6 text-navy/40" />
              </div>
              <div className="text-center px-4">
                <p className="font-medium text-foreground/60 text-sm">123 Main Street, Suite 100</p>
                <p className="text-xs text-muted-foreground">Los Angeles, CA 90001</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
