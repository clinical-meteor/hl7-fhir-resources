
// create the object using our BaseModel
Practitioner = BaseModel.extend();


//Assign a collection so the object knows how to perform CRUD operations
Practitioner.prototype._collection = Practitioners;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');
Practitioners = new Mongo.Collection('Practitioners');

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
Practitioners._transform = function (document) {
  return new Practitioner(document);
};


if (Meteor.isClient){
  Meteor.subscribe("Practitioners");
}

if (Meteor.isServer){
  Meteor.publish("Practitioners", function (argument){
    if (this.userId) {
      return Practitioners.find();
    } else {
      return [];
    }
  });
}



PractitionerSchema = new SimpleSchema([
  BaseSchema,
  DomainResourceSchema,
  {
  "resourceType" : {
    type: String,
    defaultValue: "Practitioner"
  },
  "identifier" : {
    optional: true,
    type: [ IdentifierSchema ]
  },
  "active" : {
    optional: true,
    type: Boolean
  },
  "name" : {
    optional: true,
    type:  HumanNameSchema
  },
  "telecom" : {
    optional: true,
    type: [ ContactPointSchema ]
  },
  "address" : {
    optional: true,
    type: [ AddressSchema ]
  },
  "gender" : {
    optional: true,
    type: String
  },
  "birthDate" : {
    optional: true,
    type: Date
  },
  "photo" : {
    optional: true,
    type: [ AttachmentSchema ]
  },
  "practitionerRole.$.managingOrganization" : {
    optional: true,
    type: ReferenceSchema
  },
  "practitionerRole.$.role" : {
    optional: true,
    type: CodeableConceptSchema
  },
  "practitionerRole.$.specialty" : {
    optional: true,
    type: [ CodeableConceptSchema ]
  },
  "practitionerRole.$.period" : {
    optional: true,
    type: PeriodSchema
  },
  "practitionerRole.$.location" : {
    optional: true,
    type: [ ReferenceSchema ]
  }, // (Location) ],
  "practitionerRole.$.healthcareService" : {
    optional: true,
    type: [ ReferenceSchema ]
  }, //(HealthcareService) }]
  "qualification.$.identifier" : {
    optional: true,
    type: [ IdentifierSchema ]
  },
  "qualification.$.code" : {
    optional: true,
    type: CodeableConceptSchema
  },
  "qualification.$.period" : {
    optional: true,
    type: PeriodSchema
  },
  "qualification.$.issuer" : {
    optional: true,
    type: ReferenceSchema
  }, // Organization)
  "communication" : {
    optional: true,
    type: [ CodeableConceptSchema ]
  }
}]);
Practitioners.attachSchema(PractitionerSchema);



/**
 * @summary The displayed name of the patient.
 * @memberOf Patient
 * @name displayName
 * @version 1.2.3
 * @returns {Boolean}
 * @example
 * ```js
 * ```
 */

Practitioner.prototype.displayName = function () {
  if (this.name) {
    return this.name.text;
  }
};



/**
 * @summary The displayed Meteor.userId() of the practitioner.
 * @memberOf Practitioner
 * @name userId
 * @version 1.2.3
 * @returns {Boolean}
 * @example
 * ```js
 * ```
 */

Practitioner.prototype.userId = function () {
  var result = null;
  if (this.extension) {
    this.extension.forEach(function(extension){
      if (extension.url === "Meteor.userId()") {
        result = extension.valueString;
      }
    });
  }
  return result;
};
