
// create the object using our BaseModel
DiagnosticOrder = BaseModel.extend();


//Assign a collection so the object knows how to perform CRUD operations
DiagnosticOrder.prototype._collection = DiagnosticOrders;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');
DiagnosticOrders = new Mongo.Collection('DiagnosticOrders');

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
DiagnosticOrders._transform = function (document) {
  return new DiagnosticOrder(document);
};


if (Meteor.isClient){
  Meteor.subscribe("DiagnosticOrders");
}

if (Meteor.isServer){
  Meteor.publish("DiagnosticOrders", function (argument){
    if (this.userId) {
      return DiagnosticOrders.find();
    } else {
      return [];
    }
  });
}




// Write your package code here!
DiagnosticOrderSchema = new SimpleSchema([
  BaseSchema,
  DomainResourceSchema,
  {
    "resourceType" : {
      type: String,
      defaultValue: "DiagnosticOrder"
    },

    "createdAt" : {
      type: Date,
      defaultValue: new Date(),
      optional: true
    },

    "listId" : {
      type: String,
      optional: true
    },
    "public" : {
      type: Boolean,
      defaultValue: true,
      optional: true
    },
    "ordinal" : {
      type: Number,
      optional: true
    },

    // R!  Who and/or what test is about
    "subject" : {
      type: ReferenceSchema,
      optional: true
    },

    // Who ordered the test
    "orderer" : {
      type: ReferenceSchema,
      optional: true
    },

    // Identifiers assigned to this order
    "identifier" : {
      type: [ IdentifierSchema ],
      optional: true
    },

    // The encounter that this diagnostic order is associated with
    "encounter" : {
      type: ReferenceSchema,
      optional: true
    },

    // Explanation/Justification for test
    "reason" : {
      type: [ CodeableConceptSchema ],
      optional: true
    },

    // Additional clinical information
    "supportingInformation" : {
      type: [ ReferenceSchema ],
      optional: true
    },

    // If the whole order relates to specific specimens
    "specimen" : {
      type: [ ReferenceSchema ],
      optional: true
    },

    "status" : {
      type: String,
      allowedValues: [
        "proposed",
        "draft",
        "planned",
        "requested",
        "received",
        "accepted",
        "in-progress",
        "review",
        "completed",
        "cancelled",
        "suspended",
        "rejected",
        "failed"
      ],
      defaultValue: "planned"
    },

    //
    "priority" : {
      type: String,
      allowedValues: [
        "routine",
        "urgent",
        "stat",
        "asap"
      ],
      defaultValue: "routine"
    },

    "event.$.status" : {
      type: String,
      allowedValues: [
        "proposed",
        "draft",
        "planned",
        "requested",
        "received",
        "accepted",
        "in-progress",
        "review",
        "completed",
        "cancelled",
        "suspended",
        "rejected",
        "failed"
      ],
      defaultValue: "planned"
    },

    // More information about the event and its context
    "event.$.description" : {
      type: String,
      optional: true
    },

    // R!  The date at which the event happened
    "event.$.dateTime" : {
      type: Date,
      optional: true
    },

    // Who recorded or did this
    "event.$.actor" : {
      type: ReferenceSchema,
      optional: true
    },

    // R!  Code to indicate the item (test or panel) being ordered
    "item.$.code" : {
      type: CodeableConceptSchema,
      optional: true
    },

    // If this item relates to specific specimens
    "item.$.specimen" : {
      type: [ ReferenceSchema ],
      optional: true
    },

    // Location of requested test (if applicable)
    "item.$.bodySite" : {
      type: CodeableConceptSchema,
      optional: true
    },

    "item.$.status" : {
      type: String,
      allowedValues: [
        "proposed",
        "draft",
        "planned",
        "requested",
        "received",
        "accepted",
        "in-progress",
        "review",
        "completed",
        "cancelled",
        "suspended",
        "rejected",
        "failed"
      ],
      defaultValue: "planned",
      optional: true
    },

    // Events specific to this item
    "item.$.event" : {
      type: [ String ],
      optional: true
    },

    // Other notes and comments
    "note" : {
      type: [ String ],
      optional: true
    }
  }]
);
DiagnosticOrders.attachSchema(DiagnosticOrderSchema);
