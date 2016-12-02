
// create the object using our BaseModel
Coverage = BaseModel.extend();


//Assign a collection so the object knows how to perform CRUD operations
Coverage.prototype._collection = Coverages;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');
Coverages = new Mongo.Collection('Coverages');

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
Coverages._transform = function (document) {
  return new Coverage(document);
};


if (Meteor.isClient){
  Meteor.subscribe("Coverages");
}

if (Meteor.isServer){
  Meteor.publish("Coverages", function (argument){
    if (this.userId) {
      return Coverages.find();
    } else {
      return [];
    }
  });
}



CoverageSchema = new SimpleSchema([
  BaseSchema,
  DomainResourceSchema,
  {
    "resourceType" : {
      type: String,
      defaultValue: "Coverage"
    },
    "issuer" : {
      optional: true,
      type: ReferenceSchema
    },
    "bin" : {
      optional: true,
      type: IdentifierSchema
    },
    "period" : {
      optional: true,
      type: PeriodSchema
    },
    "type" : {
      optional: true,
      type: CodingSchema
    },
    "subscriberId" : {
      optional: true,
      type: IdentifierSchema
    },
    "identifier" : {
      optional: true,
      type: [ IdentifierSchema ]
    },
    "group" : {
      optional: true,
      type: String
    },
    "plan" : {
      optional: true,
      type: String
    },
    "subPlan" : {
      optional: true,
      type: String
    },
    "dependent" : {
      optional: true,
      type: Number
    },
    "sequence" : {
      optional: true,
      type: Number
    },
    "subscriber" : {
      optional: true,
      type: ReferenceSchema
    },
    "network" : {
      optional: true,
      type: IdentifierSchema
    },
    "contract" : {
      optional: true,
      type: [ ReferenceSchema ]
    }
  }]
);

Coverages.attachSchema(CoverageSchema);
