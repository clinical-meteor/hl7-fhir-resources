
// create the object using our BaseModel
DiagnosticReport = BaseModel.extend();


//Assign a collection so the object knows how to perform CRUD operations
DiagnosticReport.prototype._collection = DiagnosticReports;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');
DiagnosticReports = new Mongo.Collection('DiagnosticReports');

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
DiagnosticReports._transform = function (document) {
  return new DiagnosticReport(document);
};


if (Meteor.isClient){
  Meteor.subscribe("DiagnosticReports");
}

if (Meteor.isServer){
  Meteor.publish("DiagnosticReports", function (argument){
    if (this.userId) {
      return DiagnosticReports.find();
    } else {
      return [];
    }
  });
}


DiagnosticReportSchema = new SimpleSchema([
  BaseSchema,
  DomainResourceSchema,
  {
    "resourceType" : {
      type: String,
      defaultValue: "DiagnosticReport"
    },
    "identifier" : {
      optional: true,
      type: [ IdentifierSchema ]
    }, 
    "status" : {
      optional: true,
      type: Code
    },
    "category" : {
      optional: true,
      type: CodeableConceptSchema
    },
    "code" : {
      optional: true,
      type: CodeableConceptSchema
    },
    "subject" : {
      optional: true,
      type: ReferenceSchema
    },
    "encounter" : {
      optional: true,
      type: ReferenceSchema
    },

    "effectiveDateTime" : {
      optional: true,
      type: Date
    },
    "effectivePeriod" : {
      optional: true,
      type: PeriodSchema
    },
    "issued" : {
      optional: true,
      type: Date
    },
    "performer" : {
      optional: true,
      type: [ ReferenceSchema ]
    },

    "request" : {
      optional: true,
      type: ReferenceSchema
    },
    "specimen" : {
      optional: true,
      type: ReferenceSchema
    },
    "result" : {
      optional: true,
      type: [ReferenceSchema]
    },
    "imagingStudy" : {
      optional: true,
      type: [ReferenceSchema]
    },
    "image.$.comment" : {
      optional: true,
      type: String
    },
    "image.$.link" : {
      optional: true,
      type: ReferenceSchema
    },
    "conclusion" : {
      optional: true,
      type: String
    },
    "codedDiagnosis" : {
      optional: true,
      type: [ CodeableConceptSchema ]
    },
    "presentedForm" : {
      optional: true,
      type: [ AttachmentSchema ]
    }
  }]
);
DiagnosticReports.attachSchema(DiagnosticReportSchema);
