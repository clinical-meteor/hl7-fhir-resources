
// create the object using our BaseModel
Bundle = BaseModel.extend();


//Assign a collection so the object knows how to perform CRUD operations
Bundle.prototype._collection = Bundles;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');
Bundles = new Mongo.Collection('Bundles');

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
Bundles._transform = function (document) {
  return new Bundle(document);
};


if (Meteor.isClient){
  Meteor.subscribe("Bundles");
}

if (Meteor.isServer){
  Meteor.publish("Bundles", function (argument){
    if (this.userId) {
      return Bundles.find();
    } else {
      return [];
    }
  });
}



BundleSchema = new SimpleSchema([
  BaseSchema,
  DomainResourceSchema,
  {
    "resourceType" : {
      type: String,
      defaultValue: "Bundle"
    },
    "timestamp" : {
      optional: true,
      type: Date
    },
    "event" : {
      optional: true,
      type: CodingSchema
    },
    "response.identifier" : {
      optional: true,
      type: String
    },
    "response.code" : {
      optional: true,
      type: String
    },
    "response.details" : {
      optional: true,
      type: ReferenceSchema
    },
    "source.name" : {
      optional: true,
      type: String
    },
    "source.software" : {
      optional: true,
      type: String
    },
    "source.version" : {
      optional: true,
      type: String
    },
    "source.contact" : {
      optional: true,
      type: ContactPointSchema
    },
    "source.endpoint" : {
      optional: true,
      type: String
    },
    "destination.$.name" : {
      optional: true,
      type: String
    },
    "destination.$.target" : {
      optional: true,
      type: ReferenceSchema
    },
    "destination.$.endpoint" : {
      optional: true,
      type: String
    },
    "enterer" : {
      optional: true,
      type: ReferenceSchema
    },
    "author" : {
      optional: true,
      type: ReferenceSchema
    },
    "receiver" : {
      optional: true,
      type: ReferenceSchema
    },
    "responsible" : {
      optional: true,
      type: ReferenceSchema
    },
    "reason" : {
      optional: true,
      type: CodeableConceptSchema
    },
    "data" : {
      optional: true,
      type: [ ReferenceSchema ]
    }
  }]
);

Bundles.attachSchema(BundleSchema);
