
// create the object using our BaseModel
Observation = BaseModel.extend();


//Assign a collection so the object knows how to perform CRUD operations
Observation.prototype._collection = Observations;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');
Observations = new Mongo.Collection('Observations');

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
Observations._transform = function (document) {
  return new Observation(document);
};


if (Meteor.isClient){
  Meteor.subscribe('Observations');
}

if (Meteor.isServer){
  Meteor.publish('Observations', function (argument){
    if (this.userId) {
      return Observations.find();
    } else {
      return [];
    }
  });
}


ObservationSchema = new SimpleSchema([
  BaseSchema,
  DomainResourceSchema,
  {
    'resourceType' : {
      type: String,
      defaultValue: 'Observation'
    },
    'identifier' : {
      optional: true,
      type: [IdentifierSchema]
    },
    'status' : {
      optional: true,
      type: Code
    },
    'category' : {
      optional: true,
      type: CodeableConceptSchema
    },
    'code' : {
      optional: true,
      type: CodeableConceptSchema
    },
    'subject' : {
      optional: true,
      type: ReferenceSchema
    },
    'encounter' : {
      optional: true,
      type: ReferenceSchema
    },
    'effectiveDateTime' : {
      optional: true,
      type: Date
    },
    'effectivePeriod' : {
      optional: true,
      type: PeriodSchema
    },
    'issued' : {
      optional: true,
      type: Date
    },
    'performer' : {
      optional: true,
      type: ReferenceSchema
    },

    'valueQuantity' : {
      optional: true,
      type: QuantitySchema
    },
    'valueCodeableConcept' : {
      optional: true,
      type: CodeableConceptSchema
    },
    'valueString' : {
      optional: true,
      type: String
    },
    'valueRange' : {
      optional: true,
      type: RangeSchema
    },
    'valueRatio' : {
      optional: true,
      type: RatioSchema
    },
    'valueSampledData' : {
      optional: true,
      type: SampledDataSchema
    },
    'valueAttachment' : {
      optional: true,
      type: AttachmentSchema
    },
    'valueTime' : {
      optional: true,
      type: Date
    },
    'valueDateTime' : {
      optional: true,
      type: Date
    },
    'valuePeriod' : {
      optional: true,
      type: PeriodSchema
    },
    'dataAbsentReason' : {
      optional: true,
      type: CodeableConceptSchema
    },
    'interpretation' : {
      optional: true,
      type: CodeableConceptSchema
    },
    'comments' : {
      optional: true,
      type: String
    },
    'bodySite' : {
      optional: true,
      type: CodeableConceptSchema
    },
    'method' : {
      optional: true,
      type: CodeableConceptSchema
    },
    'specimen' : {
      optional: true,
      type: ReferenceSchema
    },
    'device' : {
      optional: true,
      type: ReferenceSchema
    },

    'referenceRange.$.low' : {
      optional: true,
      type: QuantitySchema
    },
    'referenceRange.$.high' : {
      optional: true,
      type: QuantitySchema
    },
    'referenceRange.$.meaning' : {
      optional: true,
      type: CodeableConceptSchema
    },
    'referenceRange.$.age' : {
      optional: true,
      type: RangeSchema
    },
    'referenceRange.$.text' : {
      optional: true,
      type: String
    },

    'related.$.type' : {
      optional: true,
      type: Code
    },
    'related.$.target' : {
      optional: true,
      type: ReferenceSchema
    },

    'component.$.code' : {
      optional: true,
      type: CodeableConceptSchema
    },
    'component.$.valueQuantity' : {
      optional: true,
      type: QuantitySchema
    },
    'component.$.valueCodeableConcept' : {
      optional: true,
      type: CodeableConceptSchema
    },
    'component.$.valueString' : {
      optional: true,
      type: String
    },
    'component.$.valueRange' : {
      optional: true,
      type: RangeSchema
    },
    'component.$.valueRatio' : {
      optional: true,
      type: RatioSchema
    },
    'component.$.valueSampledData' : {
      optional: true,
      type: SampledDataSchema
    },
    'component.$.valueAttachment' : {
      optional: true,
      type: AttachmentSchema
    },
    'component.$.valueTime' : {
      optional: true,
      type: Date
    },
    'component.$.valueDateTime' : {
      optional: true,
      type: Date
    },
    'component.$.valuePeriod' : {
      optional: true,
      type: PeriodSchema
    },
    'component.$.dataAbsentReason' : {
      optional: true,
      type: CodeableConceptSchema
    }
  }]
);
Observations.attachSchema(ObservationSchema);
