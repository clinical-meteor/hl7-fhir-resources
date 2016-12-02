
// create the object using our BaseModel
Slot = BaseModel.extend();


//Assign a collection so the object knows how to perform CRUD operations
Slot.prototype._collection = Slots;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');
Slots = new Mongo.Collection('Slots');

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
Slots._transform = function (document) {
  return new Slot(document);
};


if (Meteor.isClient){
  Meteor.subscribe("Slots");
}

if (Meteor.isServer){
  Meteor.publish("Slots", function (argument){
    if (this.userId) {
      return Slots.find();
    } else {
      return [];
    }
  });
}



SlotSchema = new SimpleSchema([
  BaseSchema,
  DomainResourceSchema,
  {
    "resourceType" : {
      type: String,
      defaultValue: "Slot"
    },
    "identifier" : {
      optional: true,
      type: [ IdentifierSchema ]
    },
    "type" : {
      optional: true,
      type: CodeableConceptSchema
    },
    "schedule" : {
      optional: true,
      type: ReferenceSchema
    },
    "freeBusyType" : {
      optional: true,
      type: String
    },
    "start" : {
      optional: true,
      type: Date
    },
    "end" : {
      optional: true,
      type: Date
    },
    "overbooked" : {
      optional: true,
      type: Boolean
    },
    "comment" : {
      optional: true,
      type: String
    }
  }]
);

Slots.attachSchema(SlotSchema);
