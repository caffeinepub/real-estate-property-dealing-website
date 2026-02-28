import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Order "mo:core/Order";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Option "mo:core/Option";

actor {
  type PropertyId = Nat;
  type PropertyType = {
    #Residential;
    #Commercial;
  };

  module PropertyType {
    public func compare(type1 : PropertyType, type2 : PropertyType) : Order.Order {
      switch (type1, type2) {
        case (#Residential, #Commercial) { #less };
        case (#Commercial, #Residential) { #greater };
        case (_, _) { #equal };
      };
    };
  };

  type Property = {
    id : PropertyId;
    title : Text;
    description : Text;
    price : Nat;
    squareFootage : Nat;
    location : Text;
    propertyType : PropertyType;
    amenities : [Text];
    imageUrls : [Text];
    isFeatured : Bool;
    createdAt : Int;
  };

  module Property {
    public func compareByPrice(property1 : Property, property2 : Property) : Order.Order {
      Nat.compare(property1.price, property2.price);
    };

    public func compareByCreatedAt(property1 : Property, property2 : Property) : Order.Order {
      Int.compare(property1.createdAt, property2.createdAt);
    };
  };

  type Inquiry = {
    propertyId : PropertyId;
    visitorName : Text;
    visitorEmail : Text;
    visitorPhone : Text;
    message : Text;
    submittedAt : Int;
  };

  var nextPropertyId : PropertyId = 0;
  let properties = Map.empty<PropertyId, Property>();
  let inquiries = List.empty<Inquiry>();

  // Helper function to check if location contains keyword (case insensitive)
  func locationContains(property : Property, keyword : Text) : Bool {
    let locationLower = property.location.toLower();
    let keywordLower = keyword.toLower();
    locationLower.contains(#text keywordLower);
  };

  // Property Management
  public shared ({ caller }) func addProperty(
    title : Text,
    description : Text,
    price : Nat,
    squareFootage : Nat,
    location : Text,
    propertyType : PropertyType,
    amenities : [Text],
    imageUrls : [Text],
    isFeatured : Bool,
  ) : async PropertyId {
    let id = nextPropertyId;
    let newProperty : Property = {
      id;
      title;
      description;
      price;
      squareFootage;
      location;
      propertyType;
      amenities;
      imageUrls;
      isFeatured;
      createdAt = Time.now();
    };

    properties.add(id, newProperty);
    nextPropertyId += 1;
    id;
  };

  public shared ({ caller }) func updateProperty(
    id : PropertyId,
    title : Text,
    description : Text,
    price : Nat,
    squareFootage : Nat,
    location : Text,
    propertyType : PropertyType,
    amenities : [Text],
    imageUrls : [Text],
    isFeatured : Bool,
  ) : async () {
    switch (properties.get(id)) {
      case (null) { Runtime.trap("Property does not exist") };
      case (?existingProperty) {
        let updatedProperty : Property = {
          id;
          title;
          description;
          price;
          squareFootage;
          location;
          propertyType;
          amenities;
          imageUrls;
          isFeatured;
          createdAt = existingProperty.createdAt;
        };
        properties.add(id, updatedProperty);
      };
    };
  };

  public shared ({ caller }) func deleteProperty(id : PropertyId) : async () {
    if (not properties.containsKey(id)) {
      Runtime.trap("Property does not exist");
    };
    properties.remove(id);
  };

  public query ({ caller }) func getProperty(id : PropertyId) : async Property {
    switch (properties.get(id)) {
      case (null) { Runtime.trap("Property does not exist") };
      case (?property) { property };
    };
  };

  public query ({ caller }) func getAllProperties() : async [Property] {
    properties.values().toArray();
  };

  public query ({ caller }) func getFeaturedProperties() : async [Property] {
    properties.values().toArray().filter(func(p) { p.isFeatured });
  };

  public query ({ caller }) func searchProperties(
    propertyType : ?PropertyType,
    maxBudget : ?Nat,
    locationKeyword : ?Text,
  ) : async [Property] {
    properties.values().toArray().filter(
      func(p) {
        let matchesType = switch (propertyType) {
          case (null) { true };
          case (?t) { p.propertyType == t };
        };
        let matchesBudget = switch (maxBudget) {
          case (null) { true };
          case (?max) { p.price < max };
        };
        let matchesLocation = switch (locationKeyword) {
          case (null) { true };
          case (?keyword) { locationContains(p, keyword) };
        };
        matchesType and matchesBudget and matchesLocation
      }
    );
  };

  // Inquiries/Leads
  public shared ({ caller }) func submitInquiry(
    propertyId : PropertyId,
    visitorName : Text,
    visitorEmail : Text,
    visitorPhone : Text,
    message : Text,
  ) : async () {
    if (not properties.containsKey(propertyId)) {
      Runtime.trap("Invalid property ID");
    };

    let newInquiry : Inquiry = {
      propertyId;
      visitorName;
      visitorEmail;
      visitorPhone;
      message;
      submittedAt = Time.now();
    };

    inquiries.add(newInquiry);
  };

  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    inquiries.toArray();
  };
};
