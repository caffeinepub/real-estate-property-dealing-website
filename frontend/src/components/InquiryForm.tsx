import { useState } from 'react';
import { CheckCircle, Loader2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useSubmitInquiry } from '../hooks/useQueries';
import { toast } from 'sonner';

interface InquiryFormProps {
  propertyId: bigint;
  propertyTitle?: string;
  onSuccess?: () => void;
}

export default function InquiryForm({ propertyId, propertyTitle, onSuccess }: InquiryFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const submitInquiry = useSubmitInquiry();

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Invalid email address';
    if (!message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await submitInquiry.mutateAsync({
        propertyId,
        visitorName: name.trim(),
        visitorEmail: email.trim(),
        visitorPhone: phone.trim(),
        message: message.trim(),
      });
      setSubmitted(true);
      toast.success('Inquiry submitted successfully!');
      onSuccess?.();
    } catch (err) {
      toast.error('Failed to submit inquiry. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-gold" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-xl text-foreground mb-1">Inquiry Sent!</h3>
          <p className="text-muted-foreground text-sm">
            Thank you for your interest{propertyTitle ? ` in ${propertyTitle}` : ''}. Our team will contact you shortly.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setSubmitted(false);
            setName(''); setEmail(''); setPhone(''); setMessage('');
          }}
          className="border-gold text-gold hover:bg-gold hover:text-navy"
        >
          Send Another Inquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="inq-name" className="text-sm font-medium">
            Full Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="inq-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Smith"
            className={errors.name ? 'border-destructive' : ''}
          />
          {errors.name && <p className="text-destructive text-xs">{errors.name}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="inq-email" className="text-sm font-medium">
            Email Address <span className="text-destructive">*</span>
          </Label>
          <Input
            id="inq-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
            className={errors.email ? 'border-destructive' : ''}
          />
          {errors.email && <p className="text-destructive text-xs">{errors.email}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="inq-phone" className="text-sm font-medium">Phone Number</Label>
        <Input
          id="inq-phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+1 (555) 000-0000"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="inq-message" className="text-sm font-medium">
          Message <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="inq-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="I'm interested in this property and would like to schedule a visit..."
          rows={4}
          className={errors.message ? 'border-destructive' : ''}
        />
        {errors.message && <p className="text-destructive text-xs">{errors.message}</p>}
      </div>

      <Button
        type="submit"
        disabled={submitInquiry.isPending}
        className="w-full bg-gold text-navy font-semibold hover:bg-gold-light h-11 text-base"
      >
        {submitInquiry.isPending ? (
          <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</>
        ) : (
          <><Send className="w-4 h-4 mr-2" /> Send Inquiry</>
        )}
      </Button>
    </form>
  );
}
