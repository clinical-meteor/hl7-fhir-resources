
// create the object using our BaseModel
HealthcareService = BaseModel.extend();


//Assign a collection so the object knows how to perform CRUD operations
HealthcareService.prototype._collection = HealthcareServices;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');
HealthcareServices = new Mongo.Collection('HealthcareServices');

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
HealthcareServices._transform = function (document) {
  return new HealthcareService(document);
};


if (Meteor.isClient){
  Meteor.subscribe("HealthcareServices");
}

if (Meteor.isServer){
  Meteor.publish("HealthcareServices", function (argument){
    if (this.userId) {
      return HealthcareServices.find();
    } else {
      return [];
    }
  });
}


HealthcareServiceSchema = new SimpleSchema([
  BaseSchema,
  DomainResourceSchema,
  {
    "resourceType" : {
      type: String,
      defaultValue: "HealthcareService"
    },


    "identifier" : {
      optional: true,
      type: [ IdentifierSchema ]
    },
    "providedBy" : {
      optional: true,
      type: [ ReferenceSchema ]
    },
    "serviceCategory" : {
      optional: true,
      type: CodeableConceptSchema
    },
    "serviceType.$.type" : {
      optional: true,
      type: CodeableConceptSchema
    },
    "serviceType.$.specialty" : {
      optional: true,
      type: [ CodeableConceptSchema ]
    },
    "location" : {
      optional: true,
      type: ReferenceSchema
    },
    "serviceName" : {
      optional: true,
      type: String
    },
    "comment" : {
      optional: true,
      type: String
    },
    "extraDetails" : {
      optional: true,
      type: String
    },
    "photo" : {
      optional: true,
      type: AttachmentSchema
    },
    "telecom" : {
      optional: true,
      type: ContactPointSchema
    },
    "coverageArea" : {
      optional: true,
      type: [ ReferenceSchema ]
    },
    "serviceProvisionCode" : {
      optional: true,
      type: [ CodeableConceptSchema ]
    },
    "eligibility" : {
      optional: true,
      type: CodeableConceptSchema
    },
    "eligibilityNote" : {
      optional: true,
      type: String
    },
    "programName" : {
      optional: true,
      type: [ String ]
    },
    "characteristic" : {
      optional: true,
      type: [ CodeableConceptSchema ]
    },
    "referralMethod" : {
      optional: true,
      type: [ CodeableConceptSchema ]
    },
    "publicKey" : {
      optional: true,
      type: String
    },
    "appointmentRequired" : {
      optional: true,
      type: Boolean
    },
    "availableTime.$.daysOfWeek" : {
      optional: true,
      type: [ Code ]
    },
    "availableTime.$.allDay" : {
      optional: true,
      type: Boolean
    },
    "availableTime.$.availableStartTime" : {
      optional: true,
      type: Date
    },
    "availableTime.$.availableEndTime" : {
      optional: true,
      type: Date
    },
    "notAvailable.$.description" : {
      optional: true,
      type: String
    },
    "notAvailable.$.during" : {
      optional: true,
      type: PeriodSchema
    },
    "availabilityExceptions" : {
      optional: true,
      type: String
    }
  }]
);
HealthcareServices.attachSchema(HealthcareServiceSchema);
