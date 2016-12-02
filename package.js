Package.describe({
  name: 'clinical:hl7-fhir-resources',
  version: '1.0.1',
  summary: 'HL7 FHIR Resources',
  git: 'https://github.com/clinical-meteor/hl7-fhir-resources',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.3');

  api.use('meteor-platform');
  api.use('mongo');
  api.use('aldeed:simple-schema@1.3.3');
  api.use('aldeed:collection2@2.5.0');
  api.use('simple:json-routes@2.1.0');
  api.use('prime8consulting:meteor-oauth2-server@0.0.2');

  api.use('clinical:base-model@1.3.5');
  api.use('clinical:hl7-resource-datatypes@0.6.0');

  api.imply('clinical:hl7-resource-datatypes');

  api.addFiles('lib/AllergyIntolerance.js');
  api.addFiles('lib/Appointment.js');
  api.addFiles('lib/Binary.js');
  api.addFiles('lib/Bundle.js');
  api.addFiles('lib/CarePlan.js');
  api.addFiles('lib/ClinicalImpression.js');
  api.addFiles('lib/Condition.js');
  api.addFiles('lib/Coverage.js');
  api.addFiles('lib/Device.js');
  api.addFiles('lib/DiagnosticOrder.js');
  api.addFiles('lib/DiagnosticReport.js');
  api.addFiles('lib/DocumentReference.js');
  api.addFiles('lib/Encounter.js');
  api.addFiles('lib/FamilyMemberHistory.js');
  api.addFiles('lib/Goal.js');
  api.addFiles('lib/HealthcareService.js');
  api.addFiles('lib/ImagingStudy.js');
  api.addFiles('lib/Immunization.js');
  api.addFiles('lib/Location.js');
  api.addFiles('lib/Medication.js');
  api.addFiles('lib/MedicationOrder.js');
  api.addFiles('lib/MedicationStatement.js');
  api.addFiles('lib/MessageHeader.js');
  api.addFiles('lib/Observation.js');
  api.addFiles('lib/Order.js');
  api.addFiles('lib/Organization.js');
  api.addFiles('lib/Patient.js');
  api.addFiles('lib/Person.js');
  api.addFiles('lib/Practitioner.js');
  api.addFiles('lib/Procedure.js');
  api.addFiles('lib/ProcedureRequest.js');
  api.addFiles('lib/Questionnaire.js');
  api.addFiles('lib/QuestionnaireResponse.js');
  api.addFiles('lib/RelatedPerson.js');
  api.addFiles('lib/RiskAssessment.js');
  api.addFiles('lib/Schedule.js');
  api.addFiles('lib/Sequence.js');
  api.addFiles('lib/Slot.js');
  api.addFiles('lib/Specimen.js');

  api.export('AllergyIntolerance');
  api.export('Appointment');
  api.export('Binary');
  api.export('Bundle');
  api.export('CarePlan');
  api.export('ClinicalImpression');
  api.export('Condition');
  api.export('Coverage');
  api.export('Device');
  api.export('DiagnosticOrder');
  api.export('DiagnosticReport');
  api.export('DocumentReference');
  api.export('Encounter');
  api.export('FamilyMemberHistory');
  api.export('Goal');
  api.export('HealthcareService');
  api.export('ImagingStudy');
  api.export('Immunization');
  api.export('Location');
  api.export('Medication');
  api.export('MedicationOrder');
  api.export('MedicationStatement');
  api.export('MessageHeader');
  api.export('Observation');
  api.export('Order');
  api.export('Organization');
  api.export('Patient');
  api.export('Person');
  api.export('Practitioner');
  api.export('Procedure');
  api.export('ProcedureRequest');
  api.export('Questionnaire');
  api.export('QuestionnaireResponse');
  api.export('RelatedPerson');
  api.export('RiskAssessment');
  api.export('Schedule');
  api.export('Sequence');
  api.export('Slot');
  api.export('Specimen');

  api.export('AllergyIntolerances');
  api.export('Appointments');
  api.export('Binarys');
  api.export('Bundles');
  api.export('CarePlans');
  api.export('ClinicalImpressions');
  api.export('Conditions');
  api.export('Coverages');
  api.export('Devices');
  api.export('DiagnosticOrders');
  api.export('DiagnosticReports');
  api.export('DocumentReferences');
  api.export('Encounters');
  api.export('FamilyMemberHistories');
  api.export('Goals');
  api.export('HealthcareServices');
  api.export('ImagingStudies');
  api.export('Immunizations');
  api.export('Locations');
  api.export('Medications');
  api.export('MedicationOrders');
  api.export('MedicationStatements');
  api.export('MessageHeaders');
  api.export('Observations');
  api.export('Orders');
  api.export('Organizations');
  api.export('Patients');
  api.export('Persons');
  api.export('Practitioners');
  api.export('Procedures');
  api.export('ProcedureRequests');
  api.export('Questionnaires');
  api.export('QuestionnaireResponses');
  api.export('RelatedPersons');
  api.export('RiskAssessments');
  api.export('Schedules');
  api.export('Sequences');
  api.export('Slots');
  api.export('Specimens');

  api.export('AllergyIntoleranceSchema');
  api.export('AppointmentSchema');
  api.export('BinarySchema');
  api.export('BundleSchema');
  api.export('CarePlanSchema');
  api.export('ClinicalImpressionSchema');
  api.export('ConditionSchema');
  api.export('CoverageSchema');
  api.export('DeviceSchema');
  api.export('DiagnosticOrderSchema');
  api.export('DiagnosticReportSchema');
  api.export('DocumentReferenceSchema');
  api.export('EncounterSchema');
  api.export('FamilyMemberHistorySchema');
  api.export('GoalSchema');
  api.export('HealthcareServiceSchema');
  api.export('ImagingStudySchema');
  api.export('ImmunizationSchema');
  api.export('LocationSchema');
  api.export('MedicationSchema');
  api.export('MedicationOrderSchema');
  api.export('MedicationStatementSchema');
  api.export('MessageHeaderSchema');
  api.export('ObservationSchema');
  api.export('OrderSchema');
  api.export('OrganizationSchema');
  api.export('PatientSchema');
  api.export('PersonSchema');
  api.export('PractitionerSchema');
  api.export('ProcedureSchema');
  api.export('ProcedureRequestSchema');
  api.export('QuestionnaireSchema');
  api.export('QuestionnaireResponseSchema');
  api.export('RelatedPersonSchema');
  api.export('RiskAssessmentSchema');
  api.export('ScheduleSchema');
  api.export('SequenceSchema');
  api.export('SlotSchema');
  api.export('SpecimenSchema');

});
