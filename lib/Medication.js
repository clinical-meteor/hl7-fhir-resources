
// create the object using our BaseModel
Medication = BaseModel.extend();


//Assign a collection so the object knows how to perform CRUD operations
Medication.prototype._collection = Medications;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');
Medications = new Mongo.Collection('Medications');

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
Medications._transform = function (document) {
  return new Medication(document);
};


if (Meteor.isClient){
  Meteor.subscribe("Medications");
}

if (Meteor.isServer){
  Meteor.publish("Medications", function (argument){
    if (this.userId) {
      return Medications.find();
    } else {
      return [];
    }
  });
}



MedicationSchema = new SimpleSchema([
  BaseSchema,
  DomainResourceSchema,
  {
    "resourceType" : {
      type: String,
      defaultValue: "Medication"
    },
    "code" :  {
      optional: true,
      type: CodeableConceptSchema
    },
    "isBrand" :  {
      optional: true,
      type: Boolean
    },
    "manufacturer" :  {
      optional: true,
      type: ReferenceSchema
    },
    "product.form" :  {
      optional: true,
      type: CodeableConceptSchema
    },
    "product.ingredient" :  {
      type: [Object],
      optional: true,
      blackbox: true
    },
    "product.batch.$.lotNumber" :  {
      optional: true,
      type: String
    },
    "product.batch.$.expirationDate" :  {
      optional: true,
      type: Date
    },
    "package.container" :  {
      optional: true,
      type: CodeableConceptSchema
     },
    "package.content.$.item" :  {
      optional: true,
      type: ReferenceSchema
    }, 
    "package.content.$.amount" :  {
      optional: true,
      type: QuantitySchema
    },
    "url": {
      optional: true,
      type: String
    }
  }]
);

Medications.attachSchema(MedicationSchema);
