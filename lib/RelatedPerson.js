
// create the object using our BaseModel
RelatedPerson = BaseModel.extend();


//Assign a collection so the object knows how to perform CRUD operations
RelatedPerson.prototype._collection = RelatedPersons;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');
RelatedPersons = new Mongo.Collection('RelatedPersons');

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
RelatedPersons._transform = function (document) {
  return new RelatedPerson(document);
};


if (Meteor.isClient){
  Meteor.subscribe("RelatedPersons");
}

if (Meteor.isServer){
  Meteor.publish("RelatedPersons", function (argument){
    if (this.userId) {
      return RelatedPersons.find();
    } else {
      return [];
    }
  });
}



RelatedPersonSchema = new SimpleSchema([
  BaseSchema,
  DomainResourceSchema,
  {
    "resourceType" : {
      type: String,
      defaultValue: "RelatedPerson"
    },
    "identifier" : {
      optional: true,
      type: [ IdentifierSchema ]
    }, 
    "patient" : {
      optional: true,
      type: ReferenceSchema
    }, 
    "relationship" : {
      optional: true,
      type: CodeableConceptSchema
    }, 
    "name" : {
      optional: true,
      type: HumanNameSchema
    }, 
    "telecom" : {
      optional: true,
      type: [ ContactPointSchema ]
    }, 
    "gender" : {
      optional: true,
      type: Code
    }, 
    "birthDate" : {
      optional: true,
      type: Date
    }, 
    "address" : {
      optional: true,
      type: [ AddressSchema ]
    }, 
    "photo" : {
      optional: true,
      type: [ AttachmentSchema ]
    }, 
    "period" : {
      optional: true,
      type: PeriodSchema
    } 
  }]
);
RelatedPersons.attachSchema(RelatedPersonSchema);
