describe('FHIR Resources should exist on the client', function () {
  var server = meteor();
  var client = browser(server);

  before(function(){
    setTimeout(function(){
      console.log("Pausing to let app launch.");
    }, 10000)
  });


  it('AllergyIntolerances', function () {
    return client.execute(function () {
      expect(AllergyIntolerances).to.exist;
    });
  });

  it('AllergyIntolerances', function () {
    return client.execute(function () {
      expect(Appointments).to.exist;
    });
  });

  it('Binarys', function () {
    return client.execute(function () {
      expect(Binarys).to.exist;
    });
  });

  it('Bundles', function () {
    return client.execute(function () {
      expect(Bundles).to.exist;
    });
  });

  it('CarePlans', function () {
    return client.execute(function () {
      expect(CarePlans).to.exist;
    });
  });

  it('ClinicalImpressions', function () {
    return client.execute(function () {
      expect(ClinicalImpressions).to.exist;
    });
  });

  it('Conditions', function () {
    return client.execute(function () {
      expect(Conditions).to.exist;
    });
  });

  it('Coverages', function () {
    return client.execute(function () {
      expect(Coverages).to.exist;
    });
  });


  it('Datatypes - Address', function () {
    return client.execute(function () {
      expect(Address).to.exist;
    });
  });
  it('Datatypes - Annotation', function () {
    return client.execute(function () {
      expect(Annotation).to.exist;
    });
  });
  it('Datatypes - Attachment', function () {
    return client.execute(function () {
      expect(Attachment).to.exist;
    });
  });
  it('Datatypes - Code', function () {
    return client.execute(function () {
      expect(Code).to.exist;
    });
  });
  it('Datatypes - Quantity', function () {
    return client.execute(function () {
      expect(Quantity).to.exist;
    });
  });
  it('Datatypes - HumanName', function () {
    return client.execute(function () {
      expect(HumanName).to.exist;
    });
  });
  it('Datatypes - Reference', function () {
    return client.execute(function () {
      expect(Reference).to.exist;
    });
  });
  it('Datatypes - Period', function () {
    return client.execute(function () {
      expect(Period).to.exist;
    });
  });
  it('Datatypes - Coding', function () {
    return client.execute(function () {
      expect(Coding).to.exist;
    });
  });
  it('Datatypes - CodeableConcept', function () {
    return client.execute(function () {
      expect(CodeableConcept).to.exist;
    });
  });
  it('Datatypes - Identifier', function () {
    return client.execute(function () {
      expect(Identifier).to.exist;
    });
  });
  it('Datatypes - ContactPoint', function () {
    return client.execute(function () {
      expect(ContactPoint).to.exist;
    });
  });
  it('Datatypes - Group', function () {
    return client.execute(function () {
      expect(Group).to.exist;
    });
  });
  it('Datatypes - Conformance', function () {
    return client.execute(function () {
      expect(Conformance).to.exist;
    });
  });
  it('Datatypes - Range', function () {
    return client.execute(function () {
      expect(Range).to.exist;
    });
  });
  it('Datatypes - Ratio', function () {
    return client.execute(function () {
      expect(Ratio).to.exist;
    });
  });
  it('Datatypes - SampledData', function () {
    return client.execute(function () {
      expect(SampledData).to.exist;
    });
  });
  it('Datatypes - Signature', function () {
    return client.execute(function () {
      expect(Signature).to.exist;
    });
  });
  it('Datatypes - Timing', function () {
    return client.execute(function () {
      expect(Timing).to.exist;
    });
  });

  it('Devices', function () {
    return client.execute(function () {
      expect(Devices).to.exist;
    });
  });

  it('DiagnosticOrders', function () {
    return client.execute(function () {
      expect(DiagnosticOrders).to.exist;
    });
  });

  it('DiagnosticReports', function () {
    return client.execute(function () {
      expect(DiagnosticReports).to.exist;
    });
  });

  it('DocumentReferences', function () {
    return client.execute(function () {
      expect(DocumentReferences).to.exist;
    });
  });

  it('Encounters', function () {
    return client.execute(function () {
      expect(Encounters).to.exist;
    });
  });

  it('FamilyMemberHistories', function () {
    return client.execute(function () {
      expect(FamilyMemberHistories).to.exist;
    });
  });

  it('Goals', function () {
    return client.execute(function () {
      expect(Goals).to.exist;
    });
  });

  it('HealthcareServices', function () {
    return client.execute(function () {
      expect(HealthcareServices).to.exist;
    });
  });

  it('ImagingStudies', function () {
    return client.execute(function () {
      expect(ImagingStudies).to.exist;
    });
  });

  it('Immunizations', function () {
    return client.execute(function () {
      expect(Immunizations).to.exist;
    });
  });

  it('Locations', function () {
    return client.execute(function () {
      expect(Locations).to.exist;
    });
  });

  it('Medications', function () {
    return client.execute(function () {
      expect(Medications).to.exist;
    });
  });

  it('MedicationOrders', function () {
    return client.execute(function () {
      expect(MedicationOrders).to.exist;
    });
  });

  it('MedicationStatements', function () {
    return client.execute(function () {
      expect(MedicationStatements).to.exist;
    });
  });

  it('MessageHeaders', function () {
    return client.execute(function () {
      expect(MessageHeaders).to.exist;
    });
  });

  it('Observations', function () {
    return client.execute(function () {
      expect(Observations).to.exist;
    });
  });

  it('Orders', function () {
    return client.execute(function () {
      expect(Orders).to.exist;
    });
  });

  it('Organizations', function () {
    return client.execute(function () {
      expect(Organizations).to.exist;
    });
  });

  it('Patients', function () {
    return client.execute(function () {
      expect(Patients).to.exist;
    });
  });

  it('Practitioners', function () {
    return client.execute(function () {
      expect(Practitioners).to.exist;
    });
  });

  it('Procedures', function () {
    return client.execute(function () {
      expect(Procedures).to.exist;
    });
  });

  it('ProcedureRequests', function () {
    return client.execute(function () {
      expect(ProcedureRequests).to.exist;
    });
  });

  it('Questionnaires', function () {
    return client.execute(function () {
      expect(Questionnaires).to.exist;
    });
  });

  it('QuestionnaireResponses', function () {
    return client.execute(function () {
      expect(QuestionnaireResponses).to.exist;
    });
  });

  it('RelatedPersons', function () {
    return client.execute(function () {
      expect(RelatedPersons).to.exist;
    });
  });

  it('RiskAssessments', function () {
    return client.execute(function () {
      expect(RiskAssessments).to.exist;
    });
  });

  it('Schedules', function () {
    return client.execute(function () {
      expect(Schedules).to.exist;
    });
  });

  it('Sequences', function () {
    return client.execute(function () {
      expect(Sequences).to.exist;
    });
  });

  it('Slots', function () {
    return client.execute(function () {
      expect(Slots).to.exist;
    });
  });

  it('Specimens', function () {
    return client.execute(function () {
      expect(Specimens).to.exist;
    });
  });
});




//==================================================================================================

describe('FHIR Resources should exist on the server', function () {
  var server = meteor();
  var client = browser(server);

    it('AllergyIntolerances', function () {
      return server.execute(function () {
        expect(AllergyIntolerances).to.exist;
      });
    });

    it('AllergyIntolerances', function () {
      return server.execute(function () {
        expect(Appointments).to.exist;
      });
    });

    it('Binarys', function () {
      return server.execute(function () {
        expect(Binarys).to.exist;
      });
    });

    it('Bundles', function () {
      return server.execute(function () {
        expect(Bundles).to.exist;
      });
    });

    it('CarePlans', function () {
      return server.execute(function () {
        expect(CarePlans).to.exist;
      });
    });

    it('ClinicalImpressions', function () {
      return server.execute(function () {
        expect(ClinicalImpressions).to.exist;
      });
    });

    it('Conditions', function () {
      return server.execute(function () {
        expect(Conditions).to.exist;
      });
    });

    it('Coverages', function () {
      return server.execute(function () {
        expect(Coverages).to.exist;
      });
    });


    it('Datatypes - Address', function () {
      return server.execute(function () {
        expect(Address).to.exist;
      });
    });
    it('Datatypes - Annotation', function () {
      return server.execute(function () {
        expect(Annotation).to.exist;
      });
    });
    it('Datatypes - Attachment', function () {
      return server.execute(function () {
        expect(Attachment).to.exist;
      });
    });
    it('Datatypes - Code', function () {
      return server.execute(function () {
        expect(Code).to.exist;
      });
    });
    it('Datatypes - Quantity', function () {
      return server.execute(function () {
        expect(Quantity).to.exist;
      });
    });
    it('Datatypes - HumanName', function () {
      return server.execute(function () {
        expect(HumanName).to.exist;
      });
    });
    it('Datatypes - Reference', function () {
      return server.execute(function () {
        expect(Reference).to.exist;
      });
    });
    it('Datatypes - Period', function () {
      return server.execute(function () {
        expect(Period).to.exist;
      });
    });
    it('Datatypes - Coding', function () {
      return server.execute(function () {
        expect(Coding).to.exist;
      });
    });
    it('Datatypes - CodeableConcept', function () {
      return server.execute(function () {
        expect(CodeableConcept).to.exist;
      });
    });
    it('Datatypes - Identifier', function () {
      return server.execute(function () {
        expect(Identifier).to.exist;
      });
    });
    it('Datatypes - ContactPoint', function () {
      return server.execute(function () {
        expect(ContactPoint).to.exist;
      });
    });
    it('Datatypes - Group', function () {
      return server.execute(function () {
        expect(Group).to.exist;
      });
    });
    it('Datatypes - Conformance', function () {
      return server.execute(function () {
        expect(Conformance).to.exist;
      });
    });
    it('Datatypes - Range', function () {
      return server.execute(function () {
        expect(Range).to.exist;
      });
    });
    it('Datatypes - Ratio', function () {
      return server.execute(function () {
        expect(Ratio).to.exist;
      });
    });
    it('Datatypes - SampledData', function () {
      return server.execute(function () {
        expect(SampledData).to.exist;
      });
    });
    it('Datatypes - Signature', function () {
      return server.execute(function () {
        expect(Signature).to.exist;
      });
    });
    it('Datatypes - Timing', function () {
      return server.execute(function () {
        expect(Timing).to.exist;
      });
    });

    it('Devices', function () {
      return server.execute(function () {
        expect(Devices).to.exist;
      });
    });

    it('DiagnosticOrders', function () {
      return server.execute(function () {
        expect(DiagnosticOrders).to.exist;
      });
    });

    it('DiagnosticReports', function () {
      return server.execute(function () {
        expect(DiagnosticReports).to.exist;
      });
    });

    it('DocumentReferences', function () {
      return server.execute(function () {
        expect(DocumentReferences).to.exist;
      });
    });

    it('Encounters', function () {
      return server.execute(function () {
        expect(Encounters).to.exist;
      });
    });

    it('FamilyMemberHistories', function () {
      return server.execute(function () {
        expect(FamilyMemberHistories).to.exist;
      });
    });

    it('Goals', function () {
      return server.execute(function () {
        expect(Goals).to.exist;
      });
    });

    it('HealthcareServices', function () {
      return server.execute(function () {
        expect(HealthcareServices).to.exist;
      });
    });

    it('ImagingStudies', function () {
      return server.execute(function () {
        expect(ImagingStudies).to.exist;
      });
    });

    it('Immunizations', function () {
      return server.execute(function () {
        expect(Immunizations).to.exist;
      });
    });

    it('Locations', function () {
      return server.execute(function () {
        expect(Locations).to.exist;
      });
    });

    it('Medications', function () {
      return server.execute(function () {
        expect(Medications).to.exist;
      });
    });

    it('MedicationOrders', function () {
      return server.execute(function () {
        expect(MedicationOrders).to.exist;
      });
    });

    it('MedicationStatements', function () {
      return server.execute(function () {
        expect(MedicationStatements).to.exist;
      });
    });

    it('MessageHeaders', function () {
      return server.execute(function () {
        expect(MessageHeaders).to.exist;
      });
    });

    it('Observations', function () {
      return server.execute(function () {
        expect(Observations).to.exist;
      });
    });

    it('Orders', function () {
      return server.execute(function () {
        expect(Orders).to.exist;
      });
    });

    it('Organizations', function () {
      return server.execute(function () {
        expect(Organizations).to.exist;
      });
    });

    it('Patients', function () {
      return server.execute(function () {
        expect(Patients).to.exist;
      });
    });

    it('Practitioners', function () {
      return server.execute(function () {
        expect(Practitioners).to.exist;
      });
    });

    it('Procedures', function () {
      return server.execute(function () {
        expect(Procedures).to.exist;
      });
    });

    it('ProcedureRequests', function () {
      return server.execute(function () {
        expect(ProcedureRequests).to.exist;
      });
    });

    it('Questionnaires', function () {
      return server.execute(function () {
        expect(Questionnaires).to.exist;
      });
    });

    it('QuestionnaireResponses', function () {
      return server.execute(function () {
        expect(QuestionnaireResponses).to.exist;
      });
    });

    it('RelatedPersons', function () {
      return server.execute(function () {
        expect(RelatedPersons).to.exist;
      });
    });

    it('RiskAssessments', function () {
      return server.execute(function () {
        expect(RiskAssessments).to.exist;
      });
    });

    it('Schedules', function () {
      return server.execute(function () {
        expect(Schedules).to.exist;
      });
    });

    it('Sequences', function () {
      return server.execute(function () {
        expect(Sequences).to.exist;
      });
    });

    it('Slots', function () {
      return server.execute(function () {
        expect(Slots).to.exist;
      });
    });

    it('Specimens', function () {
      return server.execute(function () {
        expect(Specimens).to.exist;
      });
    });
});
