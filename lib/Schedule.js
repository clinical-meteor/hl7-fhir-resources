
// create the object using our BaseModel
Schedule = BaseModel.extend();


//Assign a collection so the object knows how to perform CRUD operations
Schedule.prototype._collection = Schedules;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');
Schedules = new Mongo.Collection('Schedules');

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
Schedules._transform = function (document) {
  return new Schedule(document);
};


if (Meteor.isClient){
  Meteor.subscribe("Schedules");
}

if (Meteor.isServer){
  Meteor.publish("Schedules", function (argument){
    if (this.userId) {
      return Schedules.find();
    } else {
      return [];
    }
  });
}



ScheduleSchema = new SimpleSchema([
  BaseSchema,
  DomainResourceSchema,
  {
    "resourceType" : {
      type: String,
      defaultValue: "Schedule"
    },
    "identifier" : {
      optional: true,
      type: [ IdentifierSchema ]
    },
    "type" : {
      optional: true,
      type: [ CodeableConceptSchema ]
    },
    "actor" : {
      optional: true,
      type: ReferenceSchema
    },
    "planningHorizon" : {
      optional: true,
      type: PeriodSchema
    },
    "comment" : {
      optional: true,
      type: String
    }
  }]
);

Schedules.attachSchema(ScheduleSchema);
