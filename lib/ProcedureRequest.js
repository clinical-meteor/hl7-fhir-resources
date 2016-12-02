
// create the object using our BaseModel
ProcedureRequest = BaseModel.extend();


//Assign a collection so the object knows how to perform CRUD operations
ProcedureRequest.prototype._collection = ProcedureRequests;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');
ProcedureRequests = new Mongo.Collection('ProcedureRequests');

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
ProcedureRequests._transform = function (document) {
  return new ProcedureRequest(document);
};


if (Meteor.isClient){
  Meteor.subscribe("ProcedureRequests");
}

if (Meteor.isServer){
  Meteor.publish("ProcedureRequests", function (argument){
    if (this.userId) {
      return ProcedureRequests.find();
    } else {
      return [];
    }
  });
}



ProcedureRequestSchema = new SimpleSchema([
  BaseSchema,
  DomainResourceSchema,
  {
    "resourceType" : {
      type: String,
      defaultValue: "ProcedureRequest"
    },
    "identifier" : {
      optional: true,
      type: [ IdentifierSchema ]
    },
    "subject" : {
      optional: true,
      type: ReferenceSchema
    },
    "code" : {
      optional: true,
      type: CodeableConceptSchema
    },
    "bodySite" : {
      optional: true,
      type: [ CodeableConceptSchema ]
    },

    "reasonCodeableConceptSchema" : {
      optional: true,
      type: CodeableConceptSchema
    },
    "reasonReferenceSchema" : {
      optional: true,
      type: ReferenceSchema
    },

    "scheduledDateTime" : {
      optional: true,
      type: Date
    },
    "scheduledPeriodSchema" : {
      optional: true,
      type: PeriodSchema
    },
    "scheduledTiming" : {
      optional: true,
      type: TimingSchema
    },
    "encounter" : {
      optional: true,
      type: ReferenceSchema
    },
    "performer" : {
      optional: true,
      type: ReferenceSchema
    },
    "status" : {
      optional: true,
      type: String
    },
    "notes" : {
      optional: true,
      type: [ AnnotationSchema ]
    },

    "asNeededBoolean" : {
      optional: true,
      type: Boolean
    },
    "asNeededCodeableConceptSchema" : {
      optional: true,
      type: CodeableConceptSchema
    },
    "orderedOn" : {
      optional: true,
      type: Date
    },
    "orderer" : {
      optional: true,
      type: ReferenceSchema
    },
    "priority" : {
      optional: true,
      type: String
    }
  }]
);

ProcedureRequests.attachSchema(ProcedureRequestSchema);
