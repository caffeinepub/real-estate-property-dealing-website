import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAddProperty, useUpdateProperty } from '../hooks/useQueries';
import { type Property, PropertyType } from '../backend';
import { toast } from 'sonner';

interface PropertyFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'add' | 'edit';
  initialData?: Property;
  onSuccess?: () => void;
}

interface FormData {
  title: string;
  description: string;
  price: string;
  squareFootage: string;
  location: string;
  propertyType: string;
  amenities: string;
  imageUrls: string;
  isFeatured: boolean;
}

const defaultForm: FormData = {
  title: '',
  description: '',
  price: '',
  squareFootage: '',
  location: '',
  propertyType: 'Residential',
  amenities: '',
  imageUrls: '',
  isFeatured: false,
};

export default function PropertyFormModal({
  open, onOpenChange, mode, initialData, onSuccess
}: PropertyFormModalProps) {
  const [form, setForm] = useState<FormData>(defaultForm);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const addProperty = useAddProperty();
  const updateProperty = useUpdateProperty();
  const isPending = addProperty.isPending || updateProperty.isPending;

  useEffect(() => {
    if (open) {
      if (mode === 'edit' && initialData) {
        setForm({
          title: initialData.title,
          description: initialData.description,
          price: Number(initialData.price).toString(),
          squareFootage: Number(initialData.squareFootage).toString(),
          location: initialData.location,
          propertyType: String(initialData.propertyType),
          amenities: initialData.amenities.join(', '),
          imageUrls: initialData.imageUrls.join('\n'),
          isFeatured: initialData.isFeatured,
        });
      } else {
        setForm(defaultForm);
      }
      setErrors({});
    }
  }, [open, mode, initialData]);

  const validate = () => {
    const newErrors: Partial<FormData> = {};
    if (!form.title.trim()) newErrors.title = 'Required';
    if (!form.description.trim()) newErrors.description = 'Required';
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0) newErrors.price = 'Valid price required';
    if (!form.squareFootage || isNaN(Number(form.squareFootage)) || Number(form.squareFootage) <= 0) newErrors.squareFootage = 'Valid sqft required';
    if (!form.location.trim()) newErrors.location = 'Required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const amenities = form.amenities.split(',').map(s => s.trim()).filter(Boolean);
    const imageUrls = form.imageUrls.split('\n').map(s => s.trim()).filter(Boolean);
    const propType = form.propertyType === 'Commercial' ? PropertyType.Commercial : PropertyType.Residential;

    try {
      if (mode === 'add') {
        await addProperty.mutateAsync({
          title: form.title.trim(),
          description: form.description.trim(),
          price: BigInt(Math.round(Number(form.price))),
          squareFootage: BigInt(Math.round(Number(form.squareFootage))),
          location: form.location.trim(),
          propertyType: propType,
          amenities,
          imageUrls,
          isFeatured: form.isFeatured,
        });
        toast.success('Property added successfully!');
      } else if (initialData) {
        await updateProperty.mutateAsync({
          id: initialData.id,
          title: form.title.trim(),
          description: form.description.trim(),
          price: BigInt(Math.round(Number(form.price))),
          squareFootage: BigInt(Math.round(Number(form.squareFootage))),
          location: form.location.trim(),
          propertyType: propType,
          amenities,
          imageUrls,
          isFeatured: form.isFeatured,
        });
        toast.success('Property updated successfully!');
      }
      onOpenChange(false);
      onSuccess?.();
    } catch (err) {
      toast.error('Failed to save property. Please try again.');
    }
  };

  const field = (key: keyof FormData, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: undefined }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {mode === 'add' ? 'Add New Property' : 'Edit Property'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2 space-y-1.5">
              <Label>Title <span className="text-destructive">*</span></Label>
              <Input value={form.title} onChange={e => field('title', e.target.value)}
                placeholder="e.g. Modern Luxury Villa" className={errors.title ? 'border-destructive' : ''} />
              {errors.title && <p className="text-destructive text-xs">{errors.title}</p>}
            </div>

            <div className="space-y-1.5">
              <Label>Price ($) <span className="text-destructive">*</span></Label>
              <Input type="number" value={form.price} onChange={e => field('price', e.target.value)}
                placeholder="e.g. 450000" className={errors.price ? 'border-destructive' : ''} />
              {errors.price && <p className="text-destructive text-xs">{errors.price}</p>}
            </div>

            <div className="space-y-1.5">
              <Label>Square Footage <span className="text-destructive">*</span></Label>
              <Input type="number" value={form.squareFootage} onChange={e => field('squareFootage', e.target.value)}
                placeholder="e.g. 2500" className={errors.squareFootage ? 'border-destructive' : ''} />
              {errors.squareFootage && <p className="text-destructive text-xs">{errors.squareFootage}</p>}
            </div>

            <div className="space-y-1.5">
              <Label>Location <span className="text-destructive">*</span></Label>
              <Input value={form.location} onChange={e => field('location', e.target.value)}
                placeholder="e.g. Beverly Hills, CA" className={errors.location ? 'border-destructive' : ''} />
              {errors.location && <p className="text-destructive text-xs">{errors.location}</p>}
            </div>

            <div className="space-y-1.5">
              <Label>Property Type</Label>
              <Select value={form.propertyType} onValueChange={v => field('propertyType', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Residential">Residential</SelectItem>
                  <SelectItem value="Commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <Label>Description <span className="text-destructive">*</span></Label>
              <Textarea value={form.description} onChange={e => field('description', e.target.value)}
                placeholder="Describe the property..." rows={3}
                className={errors.description ? 'border-destructive' : ''} />
              {errors.description && <p className="text-destructive text-xs">{errors.description}</p>}
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <Label>Amenities <span className="text-muted-foreground text-xs">(comma-separated)</span></Label>
              <Input value={form.amenities} onChange={e => field('amenities', e.target.value)}
                placeholder="e.g. Pool, Garage, Garden, Smart Home" />
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <Label>Image URLs <span className="text-muted-foreground text-xs">(one per line)</span></Label>
              <Textarea value={form.imageUrls} onChange={e => field('imageUrls', e.target.value)}
                placeholder="/assets/generated/property-sample-1.dim_800x600.jpg" rows={3} />
            </div>

            <div className="flex items-center gap-3">
              <Switch
                id="featured-toggle"
                checked={form.isFeatured}
                onCheckedChange={v => setForm(prev => ({ ...prev, isFeatured: v }))}
              />
              <Label htmlFor="featured-toggle" className="cursor-pointer">Featured Property</Label>
            </div>
          </div>

          <DialogFooter className="pt-2">
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-gold text-navy font-semibold hover:bg-gold-light"
            >
              {isPending ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</>
              ) : (
                mode === 'add' ? 'Add Property' : 'Save Changes'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
