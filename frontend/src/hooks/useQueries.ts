import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { type Property, type Inquiry, PropertyType } from '../backend';

// ─── Properties ───────────────────────────────────────────────────────────────

export function useGetAllProperties() {
  const { actor, isFetching } = useActor();
  return useQuery<Property[]>({
    queryKey: ['properties'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProperties();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetFeaturedProperties() {
  const { actor, isFetching } = useActor();
  return useQuery<Property[]>({
    queryKey: ['properties', 'featured'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFeaturedProperties();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetProperty(id: bigint | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Property>({
    queryKey: ['property', id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) throw new Error('No actor or id');
      return actor.getProperty(id);
    },
    enabled: !!actor && !isFetching && id !== null,
    retry: false,
  });
}

export function useSearchProperties(
  propertyType: PropertyType | null,
  maxBudget: bigint | null,
  locationKeyword: string | null
) {
  const { actor, isFetching } = useActor();
  return useQuery<Property[]>({
    queryKey: ['properties', 'search', propertyType, maxBudget?.toString(), locationKeyword],
    queryFn: async () => {
      if (!actor) return [];
      return actor.searchProperties(propertyType, maxBudget, locationKeyword || null);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddProperty() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      title: string;
      description: string;
      price: bigint;
      squareFootage: bigint;
      location: string;
      propertyType: PropertyType;
      amenities: string[];
      imageUrls: string[];
      isFeatured: boolean;
    }) => {
      if (!actor) throw new Error('No actor');
      return actor.addProperty(
        data.title, data.description, data.price, data.squareFootage,
        data.location, data.propertyType, data.amenities, data.imageUrls, data.isFeatured
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });
}

export function useUpdateProperty() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      id: bigint;
      title: string;
      description: string;
      price: bigint;
      squareFootage: bigint;
      location: string;
      propertyType: PropertyType;
      amenities: string[];
      imageUrls: string[];
      isFeatured: boolean;
    }) => {
      if (!actor) throw new Error('No actor');
      return actor.updateProperty(
        data.id, data.title, data.description, data.price, data.squareFootage,
        data.location, data.propertyType, data.amenities, data.imageUrls, data.isFeatured
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });
}

export function useDeleteProperty() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('No actor');
      return actor.deleteProperty(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });
}

// ─── Inquiries ─────────────────────────────────────────────────────────────────

export function useSubmitInquiry() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      propertyId: bigint;
      visitorName: string;
      visitorEmail: string;
      visitorPhone: string;
      message: string;
    }) => {
      if (!actor) throw new Error('No actor');
      return actor.submitInquiry(
        data.propertyId, data.visitorName, data.visitorEmail, data.visitorPhone, data.message
      );
    },
  });
}

export function useGetAllInquiries() {
  const { actor, isFetching } = useActor();
  return useQuery<Inquiry[]>({
    queryKey: ['inquiries'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllInquiries();
    },
    enabled: !!actor && !isFetching,
  });
}
