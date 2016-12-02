
// create the object using our BaseModel
Organization = BaseModel.extend();


//Assign a collection so the object knows how to perform CRUD operations
Organization.prototype._collection = Organizations;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');
Organizations = new Mongo.Collection('Organizations');

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
Organizations._transform = function (document) {
  return new Organization(document);
};


if (Meteor.isClient){
  Meteor.subscribe("Organizations");
}

if (Meteor.isServer){
  Meteor.publish("Organizations", function (argument){
    if (this.userId) {
      return Organizations.find();
    } else {
      return [];
    }
  });
}



OrganizationSchema = new SimpleSchema([
  BaseSchema,
  DomainResourceSchema,
  {
    "resourceType" : {
      type: String,
      defaultValue: "Organization"
    },
    "identifier" : {
      optional: true,
      type: [ IdentifierSchema ]
    }, 
    "active" : {
      optional: true,
      type: Boolean
    }, 
    "type" : {
      optional: true,
      type: CodeableConceptSchema
    }, 
    "name" : {
      optional: true,
      type: String
    }, 
    "telecom" : {
      optional: true,
      type: [ ContactPointSchema ]
    }, 
    "address" : {
      optional: true,
      type: [ AddressSchema ]
    }, 
    "partOf" : {
      optional: true,
      type: ReferenceSchema
    }, 
    "contact.$.purpose" : {
      optional: true,
      type: CodeableConceptSchema
    }, 
    "contact.$.name" : {
      optional: true,
      type: HumanNameSchema
    }, 
    "contact.$.telecom" : {
      optional: true,
      type: [ ContactPointSchema ]
    }, 
    "contact.$.address" : {
      optional: true,
      type: AddressSchema
    } 
  }]
);
Organizations.attachSchema(OrganizationSchema);
