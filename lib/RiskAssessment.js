
// create the object using our BaseModel
RiskAssessment = BaseModel.extend();


//Assign a collection so the object knows how to perform CRUD operations
RiskAssessment.prototype._collection = RiskAssessments;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');
RiskAssessments = new Mongo.Collection('RiskAssessments');

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
RiskAssessments._transform = function (document) {
  return new RiskAssessment(document);
};


if (Meteor.isClient){
  Meteor.subscribe("RiskAssessments");
}

if (Meteor.isServer){
  Meteor.publish("RiskAssessments", function (argument){
    if (this.userId) {
      return RiskAssessments.find();
    } else {
      return [];
    }
  });
}



RiskAssessmentSchema = new SimpleSchema([
  BaseSchema,
  DomainResourceSchema,
  {
    "resourceType" : {
      type: String,
      defaultValue: "RiskAssessment"
    },
    "text" : {
      optional: true,
      type: String
     },
    "subject" : {
      optional: true,
      blackbox: true,
      type: ReferenceSchema
     },
    "date" : {
      optional: true,
      type: Date
    },
    "condition" : {
      optional: true,
      blackbox: true,
      type: ReferenceSchema
    },
    "encounter" : {
      optional: true,
      blackbox: true,
      type: ReferenceSchema
    },
    "performer" : {
      optional: true,
      blackbox: true,
      type: ReferenceSchema
    },
    "identifier" : {
      optional: true,
      type: IdentifierSchema
    },
    "method" : {
      optional: true,
      type: CodeableConceptSchema
    },
    "basis" : {
      optional: true,
      type: [ ReferenceSchema ]
    },
    "prediction.$.title" : {
      optional: true,
      type: String
    },

    "prediction.$.outcome" : {
      optional: true,
      type: CodeableConceptSchema
    },

    "prediction.$.probabilityDecimal" : {
      optional: true,
      decimal: true,
      type: Number
    },
    "prediction.$.probabilityRange" : {
      optional: true,
      type: RangeSchema
    },
    "prediction.$.probabilityCodeableConcept" : {
      optional: true,
      type: CodeableConceptSchema
    },
    "prediction.$.relativeRisk" : {
      optional: true,
      type: Number
    },

    "prediction.$.whenPeriod" : {
      optional: true,
      type: PeriodSchema
    },
    "prediction.$.whenRange" : {
      optional: true,
      type: RangeSchema
    },
    "prediction.$.rational" : {
      optional: true,
      type: String
    },
    "mitigation" : {
      optional: true,
      type: String
    }

  }]
);
RiskAssessments.attachSchema(RiskAssessmentSchema);
