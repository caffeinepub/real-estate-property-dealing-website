import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Property {
    id: PropertyId;
    title: string;
    propertyType: PropertyType;
    imageUrls: Array<string>;
    createdAt: bigint;
    description: string;
    amenities: Array<string>;
    isFeatured: boolean;
    squareFootage: bigint;
    price: bigint;
    location: string;
}
export interface Inquiry {
    submittedAt: bigint;
    propertyId: PropertyId;
    visitorName: string;
    message: string;
    visitorEmail: string;
    visitorPhone: string;
}
export type PropertyId = bigint;
export enum PropertyType {
    Commercial = "Commercial",
    Residential = "Residential"
}
export interface backendInterface {
    addProperty(title: string, description: string, price: bigint, squareFootage: bigint, location: string, propertyType: PropertyType, amenities: Array<string>, imageUrls: Array<string>, isFeatured: boolean): Promise<PropertyId>;
    deleteProperty(id: PropertyId): Promise<void>;
    getAllInquiries(): Promise<Array<Inquiry>>;
    getAllProperties(): Promise<Array<Property>>;
    getFeaturedProperties(): Promise<Array<Property>>;
    getProperty(id: PropertyId): Promise<Property>;
    searchProperties(propertyType: PropertyType | null, maxBudget: bigint | null, locationKeyword: string | null): Promise<Array<Property>>;
    submitInquiry(propertyId: PropertyId, visitorName: string, visitorEmail: string, visitorPhone: string, message: string): Promise<void>;
    updateProperty(id: PropertyId, title: string, description: string, price: bigint, squareFootage: bigint, location: string, propertyType: PropertyType, amenities: Array<string>, imageUrls: Array<string>, isFeatured: boolean): Promise<void>;
}
