

// create the object using our BaseModel
Device = BaseModel.extend();

//Assign a collection so the object knows how to perform CRUD operations
Device.prototype._collection = Devices;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');
Devices = new Mongo.Collection('Devices');

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
Devices._transform = function (document) {
  return new Device(document);
};


if (Meteor.isClient){
  Meteor.subscribe('Devices');
}

if (Meteor.isServer){
  Meteor.publish('Devices', function (argument){
    if (this.userId) {
      return Devices.find();
    } else {
      return [];
    }
  });
}



DeviceSchema = new SimpleSchema([
  BaseSchema,
  DomainResourceSchema,
    {
    'resourceType' : {
      type: String,
      defaultValue: 'Device'
    },
    'identifier' : {
      optional: true,
      type: [ IdentifierSchema ]
    },
    'type' : {
      optional: true,
      type: CodeableConceptSchema
    },
    'note' : {
      optional: true,
      type: [ AnnotationSchema ]
    },
    'status' : {
      optional: true,
      type: Code
    },
    'manufacturer' : {
      optional: true,
      type: String
    },
    'model' : {
      optional: true,
      type: String
    },
    'version' : {
      optional: true,
      type: String
    },
    'manufactureDate' : {
      optional: true,
      type: Date
    },
    'expiry' : {
      optional: true,
      type: Date
    },
    'udi' : {
      optional: true,
      type: String
    },
    'lotNumber' : {
      optional: true,
      type: String
    },
    'owner' : {
      optional: true,
      type: ReferenceSchema
    }, 
    'location' : {
      optional: true,
      type: ReferenceSchema
    },
    'patient' : {
      optional: true,
      type: ReferenceSchema
    },
    'contact' : {
      optional: true,
      type: [ ContactPointSchema ]
    },
    'url' : {
      optional: true,
      type: String
    }
  }]
);
Devices.attachSchema(DeviceSchema);
