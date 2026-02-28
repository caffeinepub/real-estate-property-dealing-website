import { useState } from 'react';
import { Plus, Pencil, Trash2, Loader2, AlertCircle, Building2, MessageSquare, RefreshCw } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import PropertyFormModal from '../components/PropertyFormModal';
import { useGetAllProperties, useDeleteProperty, useGetAllInquiries } from '../hooks/useQueries';
import { type Property } from '../backend';
import { toast } from 'sonner';

function formatPrice(price: bigint): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(price));
}

function formatDate(ts: bigint): string {
  const ms = Number(ts) / 1_000_000;
  return new Date(ms).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function AdminDashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editingProperty, setEditingProperty] = useState<Property | undefined>(undefined);

  const { data: properties, isLoading: propsLoading, isError: propsError, refetch: refetchProps } = useGetAllProperties();
  const { data: inquiries, isLoading: inqLoading, isError: inqError, refetch: refetchInq } = useGetAllInquiries();
  const deleteProperty = useDeleteProperty();

  const handleAddNew = () => {
    setModalMode('add');
    setEditingProperty(undefined);
    setModalOpen(true);
  };

  const handleEdit = (property: Property) => {
    setModalMode('edit');
    setEditingProperty(property);
    setModalOpen(true);
  };

  const handleDelete = async (id: bigint) => {
    try {
      await deleteProperty.mutateAsync(id);
      toast.success('Property deleted successfully.');
    } catch {
      toast.error('Failed to delete property.');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-navy py-10">
        <div className="container mx-auto px-4">
          <h1 className="font-display font-bold text-3xl text-white mb-1">Admin Dashboard</h1>
          <p className="text-white/60">Manage your property listings and view inquiries</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="listings">
          <TabsList className="mb-6 bg-muted border border-border">
            <TabsTrigger value="listings" className="gap-2 data-[state=active]:bg-navy data-[state=active]:text-white">
              <Building2 className="w-4 h-4" />
              Manage Listings
              {properties && (
                <Badge className="ml-1 bg-gold text-navy text-xs border-0 px-1.5 py-0">
                  {properties.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="inquiries" className="gap-2 data-[state=active]:bg-navy data-[state=active]:text-white">
              <MessageSquare className="w-4 h-4" />
              Inquiries
              {inquiries && (
                <Badge className="ml-1 bg-gold text-navy text-xs border-0 px-1.5 py-0">
                  {inquiries.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Listings Tab */}
          <TabsContent value="listings">
            <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-border">
                <h2 className="font-display font-semibold text-xl text-foreground">All Properties</h2>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => refetchProps()}
                    className="border-border"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleAddNew}
                    className="bg-gold text-navy font-semibold hover:bg-gold-light"
                  >
                    <Plus className="w-4 h-4 mr-1.5" />
                    Add Property
                  </Button>
                </div>
              </div>

              {propsLoading ? (
                <div className="p-6 space-y-3">
                  {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-12 w-full" />)}
                </div>
              ) : propsError ? (
                <div className="p-10 text-center">
                  <AlertCircle className="w-10 h-10 text-destructive mx-auto mb-3" />
                  <p className="text-destructive font-medium">Failed to load properties</p>
                  <Button variant="outline" size="sm" onClick={() => refetchProps()} className="mt-3">Retry</Button>
                </div>
              ) : !properties || properties.length === 0 ? (
                <div className="p-12 text-center">
                  <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="font-medium text-foreground mb-1">No properties yet</p>
                  <p className="text-muted-foreground text-sm mb-4">Add your first property to get started.</p>
                  <Button onClick={handleAddNew} className="bg-gold text-navy hover:bg-gold-light">
                    <Plus className="w-4 h-4 mr-1.5" /> Add First Property
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/30">
                        <TableHead className="font-semibold">Title</TableHead>
                        <TableHead className="font-semibold">Price</TableHead>
                        <TableHead className="font-semibold hidden sm:table-cell">Location</TableHead>
                        <TableHead className="font-semibold hidden md:table-cell">Type</TableHead>
                        <TableHead className="font-semibold hidden lg:table-cell">Featured</TableHead>
                        <TableHead className="font-semibold text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {properties.map((property) => (
                        <TableRow key={property.id.toString()} className="hover:bg-muted/20 transition-colors">
                          <TableCell className="font-medium max-w-[200px]">
                            <span className="line-clamp-1">{property.title}</span>
                          </TableCell>
                          <TableCell className="text-gold font-semibold">{formatPrice(property.price)}</TableCell>
                          <TableCell className="hidden sm:table-cell text-muted-foreground text-sm">
                            <span className="line-clamp-1">{property.location}</span>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Badge
                              className={`text-xs border-0 ${
                                String(property.propertyType) === 'Residential'
                                  ? 'bg-navy text-white'
                                  : 'bg-gold text-navy'
                              }`}
                            >
                              {String(property.propertyType)}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            {property.isFeatured ? (
                              <Badge className="bg-gold/20 text-gold border-gold/30 text-xs">Yes</Badge>
                            ) : (
                              <span className="text-muted-foreground text-sm">No</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit(property)}
                                className="border-border hover:border-gold hover:text-gold h-8 px-2.5"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-border hover:border-destructive hover:text-destructive h-8 px-2.5"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Property</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete "{property.title}"? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDelete(property.id)}
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      {deleteProperty.isPending ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                      ) : 'Delete'}
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Inquiries Tab */}
          <TabsContent value="inquiries">
            <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-border">
                <h2 className="font-display font-semibold text-xl text-foreground">All Inquiries</h2>
                <Button variant="outline" size="sm" onClick={() => refetchInq()} className="border-border">
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>

              {inqLoading ? (
                <div className="p-6 space-y-3">
                  {[1, 2, 3].map(i => <Skeleton key={i} className="h-12 w-full" />)}
                </div>
              ) : inqError ? (
                <div className="p-10 text-center">
                  <AlertCircle className="w-10 h-10 text-destructive mx-auto mb-3" />
                  <p className="text-destructive font-medium">Failed to load inquiries</p>
                  <Button variant="outline" size="sm" onClick={() => refetchInq()} className="mt-3">Retry</Button>
                </div>
              ) : !inquiries || inquiries.length === 0 ? (
                <div className="p-12 text-center">
                  <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="font-medium text-foreground mb-1">No inquiries yet</p>
                  <p className="text-muted-foreground text-sm">Inquiries from property pages will appear here.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/30">
                        <TableHead className="font-semibold">Visitor</TableHead>
                        <TableHead className="font-semibold hidden sm:table-cell">Email</TableHead>
                        <TableHead className="font-semibold hidden md:table-cell">Phone</TableHead>
                        <TableHead className="font-semibold hidden lg:table-cell">Property ID</TableHead>
                        <TableHead className="font-semibold">Message</TableHead>
                        <TableHead className="font-semibold hidden xl:table-cell">Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {inquiries.map((inquiry, idx) => (
                        <TableRow key={idx} className="hover:bg-muted/20 transition-colors">
                          <TableCell className="font-medium">{inquiry.visitorName}</TableCell>
                          <TableCell className="hidden sm:table-cell text-muted-foreground text-sm">
                            {inquiry.visitorEmail}
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                            {inquiry.visitorPhone || '—'}
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <Badge variant="outline" className="text-xs">
                              #{inquiry.propertyId.toString()}
                            </Badge>
                          </TableCell>
                          <TableCell className="max-w-[200px]">
                            <span className="line-clamp-2 text-sm text-muted-foreground">{inquiry.message}</span>
                          </TableCell>
                          <TableCell className="hidden xl:table-cell text-muted-foreground text-sm">
                            {formatDate(inquiry.submittedAt)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <PropertyFormModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        mode={modalMode}
        initialData={editingProperty}
      />
    </div>
  );
}
