
// create the object using our BaseModel
Binary = BaseModel.extend();


//Assign a collection so the object knows how to perform CRUD operations
Binary.prototype._collection = Binarys;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');
Binarys = new Mongo.Collection('Binarys');

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
Binarys._transform = function (document) {
  return new Binary(document);
};


if (Meteor.isClient){
  Meteor.subscribe("Binarys");
}

if (Meteor.isServer){
  Meteor.publish("Binarys", function (argument){
    if (this.userId) {
      return Binarys.find();
    } else {
      return [];
    }
  });
}



BinarySchema = new SimpleSchema([
  BaseSchema,
  DomainResourceSchema,
  {
    "resourceType" : {
      type: String,
      defaultValue: "Binary"
    },
    "contentType" : {
      optional: true,
      type: String
    },
    "content" : {
      type: Object,
      optional: true,
      blackbox: true
    }
  }]
);

Binarys.attachSchema(BinarySchema);
