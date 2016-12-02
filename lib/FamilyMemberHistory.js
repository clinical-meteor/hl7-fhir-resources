
// create the object using our BaseModel
FamilyMemberHistory = BaseModel.extend();


//Assign a collection so the object knows how to perform CRUD operations
FamilyMemberHistory.prototype._collection = FamilyMemberHistories;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');
FamilyMemberHistories = new Mongo.Collection('FamilyMemberHistories');

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
FamilyMemberHistories._transform = function (document) {
  return new FamilyMemberHistory(document);
};


if (Meteor.isClient){
  Meteor.subscribe("FamilyMemberHistories");
}

if (Meteor.isServer){
  Meteor.publish("FamilyMemberHistories", function (argument){
    if (this.userId) {
      return FamilyMemberHistories.find();
    } else {
      return [];
    }
  });
}


FamilyMemberHistorySchema = new SimpleSchema([
  BaseSchema,
  DomainResourceSchema,
  {
    "resourceType" : {
      type: String,
      defaultValue: "FamilyMemberHistory"
    },

    "identifier" : {
      optional: true,
      type: [IdentifierSchema]
    },
    "patient" : {
      optional: true,
      type: ReferenceSchema
    },
    "date" : {
      optional: true,
      type: Date
    },
    "status" : {
      optional: true,
      type: Code
    },
    "name" : {
      optional: true,
      type: String
    },
    "relationship" : {
      optional: true,
      type: CodeableConceptSchema
    },
    "gender" : {
      optional: true,
      type: Code
    },
    "bornPeriod" : {
      optional: true,
      type: PeriodSchema
    },
    "bornDate" : {
      optional: true,
      type: Date
    },
    "bornString" : {
      optional: true,
      type: String
    },
    "ageQuantity" : {
      optional: true,
      type: QuantitySchema
    },
    "ageRange" : {
      optional: true,
      type: RangeSchema
    },
    "ageString" : {
      optional: true,
      type: String
    },
    "deceasedBoolean" : {
      optional: true,
      type: Boolean
    },
    "deceasedQuantity" : {
      optional: true,
      type: QuantitySchema
    },
    "deceasedRange" : {
      optional: true,
      type: RangeSchema
    },
    "deceasedDate" : {
      optional: true,
      type: Date
    },
    "deceasedString" : {
      optional: true,
      type: String
    },
    "note" : {
      optional: true,
      type: AnnotationSchema
    },
    "condition.$.code" : {
      optional: true,
      type: CodeableConceptSchema
    },
    "condition.$.outcome" : {
      optional: true,
      type: CodeableConceptSchema
    },
    "condition.$.onsetQuantity" : {
      optional: true,
      type: QuantitySchema
    },
    "condition.$.onsetRange" : {
      optional: true,
      type: RangeSchema
    },
    "condition.$.onsetPeriod" : {
      optional: true,
      type: PeriodSchema
    },
    "condition.$.onsetString" : {
      optional: true,
      type: String
    },
    "condition.$.note" : {
      optional: true,
      type: AnnotationSchema
    }
  }]
);
FamilyMemberHistories.attachSchema(FamilyMemberHistorySchema);
