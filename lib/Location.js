
// create the object using our BaseModel
Location = BaseModel.extend();


//Assign a collection so the object knows how to perform CRUD operations
Location.prototype._collection = Locations;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');
Locations = new Mongo.Collection('Locations');

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
Locations._transform = function (document) {
  return new Location(document);
};


if (Meteor.isClient){
  Meteor.subscribe("Locations");
}

if (Meteor.isServer){
  Meteor.publish("Locations", function (argument){
    if (this.userId) {
      return Locations.find();
    } else {
      return [];
    }
  });
}



LocationSchema = new SimpleSchema([
  BaseSchema,
  DomainResourceSchema,
  {
    "resourceType" : {
      type: String,
      defaultValue: "Location"
    },
    "identifier" : {
      optional: true,
      type: [ IdentifierSchema ]
    },
    "status" : {
      optional: true,
      type: Code
    },
    "name" : {
      optional: true,
      type: String
    },
    "description" : {
      optional: true,
      type: String
    },
    "mode" : {
      optional: true,
      type: Code
    },
    "type" : {
      optional: true,
      type: CodeableConceptSchema
    },
    "telecom" : {
      optional: true,
      type: [ ContactPointSchema ]
    },
    "address" : {
      optional: true,
      type: AddressSchema
    },
    "physicalType" : {
      optional: true,
      type: CodeableConceptSchema
    },
    "position.longitude" : {
      optional: true,
      type: Number
    },
    "position.latitude" : {
      optional: true,
      type: Number
    },
    "position.altitude" : {
      optional: true,
      type: Number
    },
    "managingOrganization" : {
      optional: true,
      type: ReferenceSchema
    },
    "partOf" : {
      optional: true,
      type: ReferenceSchema
    }
  }]
);
Locations.attachSchema(LocationSchema);
