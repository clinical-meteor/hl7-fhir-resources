
// create the object using our BaseModel
Encounter = BaseModel.extend();


//Assign a collection so the object knows how to perform CRUD operations
Encounter.prototype._collection = Encounters;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');
Encounters = new Mongo.Collection('Encounters');

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
Encounters._transform = function (document) {
  return new Encounter(document);
};


if (Meteor.isClient){
  Meteor.subscribe("Encounters");
}

if (Meteor.isServer){
  Meteor.publish("Encounters", function (argument){
    if (this.userId) {
      return Encounters.find();
    } else {
      return [];
    }
  });
}



EncounterSchema = new SimpleSchema([
  BaseSchema,
  DomainResourceSchema,
  {
    "resourceType" : {
      type: String,
      defaultValue: "Encounter"
    },
    "identifier" : {
      optional: true,
      type: [ IdentifierSchema ]
    },
    "status" : {
      optional: true,
      type: Code
    },
    "statusHistory.$.status" : {
      optional: true,
      type: Code
    },
    "statusHistory.$.period" : {
      optional: true,
      type: PeriodSchema
    },
    "class" : {
      optional: true,
      type: Code
    },
    "type" : {
      optional: true,
      type: [ CodeableConceptSchema ]
    },
    "priority" : {
      optional: true,
      type: CodeableConceptSchema
    },
    "patient" : {
      optional: true,
      type: ReferenceSchema
    },
    "episodeOfCare" : {
      optional: true,
      type: [ ReferenceSchema ]
    },
    "incomingReferral" : {
      optional: true,
      type: [ ReferenceSchema ]
    },
    "participant.$.type" : {
      optional: true,
      type: [ CodeableConceptSchema ]
    },
    "participant.$.period" : {
      optional: true,
      type: PeriodSchema
    },
    "participant.$.individual" : {
      optional: true,
      type:  ReferenceSchema
    },
    "appointment" : {
      optional: true,
      type: ReferenceSchema
    },
    "period" : {
      optional: true,
      type: PeriodSchema
    },
    "length" : {
      optional: true,
      type: QuantitySchema
    },
    "reason" : {
      optional: true,
      type: [ CodeableConceptSchema ]
    },
    "indication" : {
      optional: true,
      type: [ ReferenceSchema ]
    },
    "hospitalization.preAdmissionIdentifier" : {
      optional: true,
      type: IdentifierSchema
    },
    "hospitalization.origin" : {
      optional: true,
      type: ReferenceSchema
    },
    "hospitalization.admitSource" : {
      optional: true,
      type: CodeableConceptSchema
    },
    "hospitalization.admittingDiagnosis" : {
      optional: true,
      type: [ ReferenceSchema ]
    },
    "hospitalization.reAdmission" : {
      optional: true,
      type: CodeableConceptSchema
    },
    "hospitalization.dietPreference" : {
      optional: true,
      type: [ CodeableConceptSchema ]
    },
    "hospitalization.specialCourtesy" : {
      optional: true,
      type: [ CodeableConceptSchema ]
    },
    "hospitalization.specialArrangement" : {
      optional: true,
      type: [ CodeableConceptSchema ]
    },
    "hospitalization.destination" : {
      optional: true,
      type:  ReferenceSchema
    },
    "hospitalization.dischargeDisposition" : {
      optional: true,
      type: CodeableConceptSchema
    },
    "hospitalization.dischargeDiagnosis" : {
      optional: true,
      type: [ ReferenceSchema ]
    },
    "location.$.location" : {
      optional: true,
      type: ReferenceSchema
    },
    "location.$.status" : {
      optional: true,
      type: Code
    },
    "location.$.period" : {
      optional: true,
      type: PeriodSchema
    },
    "serviceProvider" : {
      optional: true,
      type: ReferenceSchema
    },
    "partOf" : {
      optional: true,
      type: ReferenceSchema
    }
  }]
);
Encounters.attachSchema(EncounterSchema);
