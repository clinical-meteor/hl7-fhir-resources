
// create the object using our BaseModel
Order = BaseModel.extend();


//Assign a collection so the object knows how to perform CRUD operations
Order.prototype._collection = Orders;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');
Orders = new Mongo.Collection('Orders');

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
Orders._transform = function (document) {
  return new Order(document);
};


if (Meteor.isClient){
  Meteor.subscribe("Orders");
}

if (Meteor.isServer){
  Meteor.publish("Orders", function (argument){
    if (this.userId) {
      return Orders.find();
    } else {
      return [];
    }
  });
}


OrderSchema = new SimpleSchema([
  BaseSchema,
  DomainResourceSchema,
  {
    "resourceType" : {
      type: String,
      defaultValue: "Order"
    },
    "identifier" : {
      optional: true,
      type: [ IdentifierSchema ]
    },
    "date" : {
      optional: true,
      type: Date
    },
    "subject" : {
      optional: true,
      type: ReferenceSchema
    },
    "source" : {
      optional: true,
      type: ReferenceSchema
    },
    "target" : {
      optional: true,
      type: ReferenceSchema
    }, 
    "reasonCodeableConcept" : {
      optional: true,
      type: CodeableConceptSchema
    },
    "reasonReference" : {
      optional: true,
      type: ReferenceSchema
    },
    "when.code" : {
      optional: true,
      type: CodeableConceptSchema
    },
    "when.schedule" : {
      optional: true,
      type: TimingSchema
    },
    "detail" : {
      optional: true,
      type: [ ReferenceSchema ]
    }
  }]
);
Orders.attachSchema(OrderSchema);
