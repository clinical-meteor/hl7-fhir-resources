



// create the object using our BaseModel
Specimen = BaseModel.extend();


//Assign a collection so the object knows how to perform CRUD operations
Specimen.prototype._collection = Specimens;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');
Specimens = new Mongo.Collection('Specimens');

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
Specimens._transform = function (document) {
  return new Specimen(document);
};


if (Meteor.isClient){
  Meteor.subscribe("Specimens");
}

if (Meteor.isServer){
  Meteor.publish("Specimens", function (argument){
    if (this.userId) {
      return Specimens.find();
    } else {
      return [];
    }
  });
}




SpecimenSchema = new SimpleSchema([
  BaseSchema,
  DomainResourceSchema,
  {
    "resourceType" : {
      type: String,
      defaultValue: "Specimen"
      },
    "identifier" : {
      optional: true,
      type: [ IdentifierSchema ]
      },
    "status" : {
      optional: true,
      type: String
      },
    "type" : {
      optional: true,
      type: CodeableConceptSchema
      },
    "parent" : {
      optional: true,
      type: [ ReferenceSchema ] 
      },
    "subject" : {
      optional: true,
      type: ReferenceSchema 
      },
    "accessionIdentifier" : {
      optional: true,
      type: IdentifierSchema
      },
    "receivedTime" : {
      optional: true,
      type: Date
      },
    "collection.collector" : {
      optional: true,
      type: ReferenceSchema 
      },
    "collection.comment" : {
      optional: true,
      type: [String]
      },
    "collection.collectedDateTime" : {
      optional: true,
      type: Date
      },
    "collection.collectedPeriod" : {
      optional: true,
      type: PeriodSchema
      },
    "collection.quantity" : {
      optional: true,
      type: QuantitySchema 
      },
    "collection.method" : {
      optional: true,
      type: CodeableConceptSchema
      },
    "collection.bodySite" : {
      optional: true,
      type: CodeableConceptSchema
      },
    "treatment.$.description" : {
      optional: true,
      type: String
      },
    "treatment.$.procedure" : {
      optional: true,
      type: CodeableConceptSchema
      },
    "treatment.$.additive" : {
      optional: true,
      type: [ ReferenceSchema ]  
      },
    "container.$.identifier" : {
      optional: true,
      type: [ IdentifierSchema ]
      },
    "container.$.description" : {
      optional: true,
      type: String
      },
    "container.$.type" : {
      optional: true,
      type: CodeableConceptSchema
      },
    "container.$.capacity" : {
      optional: true,
      type: QuantitySchema 
      },
    "container.$.specimenQuantity" : {
      optional: true,
      type: QuantitySchema 
      },
    "container.$.additiveCodeableConcept" : {
      optional: true,
      type: CodeableConceptSchema
      },
    "container.$.additiveReference" : {
      optional: true,
      type: ReferenceSchema 
      }
    }]
);
Specimens.attachSchema(SpecimenSchema);
