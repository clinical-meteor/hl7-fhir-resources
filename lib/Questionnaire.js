
// create the object using our BaseModel
Questionnaire = BaseModel.extend();


//Assign a collection so the object knows how to perform CRUD operations
Questionnaire.prototype._collection = Questionnaires;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');
Questionnaires = new Mongo.Collection('Questionnaires');

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
Questionnaires._transform = function (document) {
  return new Questionnaire(document);
};


if (Meteor.isClient){
  Meteor.subscribe("Questionnaires");
}

if (Meteor.isServer){
  Meteor.publish("Questionnaires", function (argument){
    if (this.userId) {
      return Questionnaires.find();
    } else {
      return [];
    }
  });
}


QuestionnaireSchema = new SimpleSchema([
  BaseSchema,
  DomainResourceSchema,
  {
    "resourceType" : {
      type: String,
      defaultValue: "Questionnaire"
      },
    "identifier" : {
      optional: true,
      type: [ IdentifierSchema ]
      },
    "version" : {
      optional: true,
      type: String
      },
    "status" : {
      optional: true,
      type: String
      },
    "date" : {
      optional: true,
      type: Date
      },
    "publisher" : {
      optional: true,
      type: String
      },
    "telecom" : {
      optional: true,
      type: [ ContactPointSchema ]
      },
    "subjectType" : {
      optional: true,
      type: [ String ]
      },
    "group" : {
      blackbox: true,
      optional: true,
      type: GroupSchema
      }
  }]
);
Questionnaires.attachSchema(QuestionnaireSchema);
