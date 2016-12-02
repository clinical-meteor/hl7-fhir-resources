
// create the object using our BaseModel
Condition = BaseModel.extend();


//Assign a collection so the object knows how to perform CRUD operations
Condition.prototype._collection = Conditions;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');
Conditions = new Mongo.Collection('Conditions');

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
Conditions._transform = function (document) {
  return new Condition(document);
};


if (Meteor.isClient){
  Meteor.subscribe("Conditions");
}

if (Meteor.isServer){
  Meteor.publish("Conditions", function (argument){
    if (this.userId) {
      return Conditions.find();
    } else {
      return [];
    }
  });
}



ConditionSchema = new SimpleSchema([
  BaseSchema,
  DomainResourceSchema,
  {
    "resourceType" : {
      type: String,
      defaultValue: "Condition"
    },
    "identifier" : {
      optional: true,
      type: [ IdentifierSchema ]
    },
    "patient" : {
      optional: true,
      type: ReferenceSchema
    },
    "encounter" : {
      optional: true,
      type: ReferenceSchema
    },
    "asserter" : {
      optional: true,
      type: ReferenceSchema
    },
    "dateRecorded" : {
      optional: true,
      type: Date
    },
    "code" : {
      optional: true,
      type: CodeableConceptSchema
    },
    "category" : {
      optional: true,
      type: CodeableConceptSchema
    },
    "clinicalStatus" : {
      optional: true,
      type: Code
    },
    "verificationStatus" : {
      optional: true,
      type: Code
    },
    "severity" : {
      optional: true,
      type: CodeableConceptSchema
    }, 
    "onsetDateTime" : {
      optional: true,
      type: Date
    },
    "onsetQuantity" : {
      optional: true,
      type: QuantitySchema
    },
    "onsetPeriod" : {
      optional: true,
      type: PeriodSchema
    },
    "onsetRange" : {
      optional: true,
      type: RangeSchema
    },
    "onsetString" : {
      optional: true,
      type: String
    },
    "abatementDateTime" : {
      optional: true,
      type: Date
    },
    "abatementQuantity" : {
      optional: true,
      type: QuantitySchema
    },
    "abatementBoolean" : {
      optional: true,
      type: Boolean
    },
    "abatementPeriod" : {
      optional: true,
      type: PeriodSchema
    },
    "abatementRange" : {
      optional: true,
      type: RangeSchema
    },
    "abatementString" : {
      optional: true,
      type: String
    },
    "stage.summary" : {
      optional: true,
      type: CodeableConceptSchema
    },
    "stage.assessment" : {
      optional: true,
      type: [ ReferenceSchema ]
    },
    "evidence.$.code" : {
      optional: true,
      type: CodeableConceptSchema
    },
    "evidence.$.detail" : {
      optional: true,
      type: [ ReferenceSchema ]
    },
    "bodySite" : {
      optional: true,
      type: [ CodeableConceptSchema ]
    },
    "notes" : {
      optional: true,
      type: String
    }
  }]
);


Conditions.attachSchema(ConditionSchema);
