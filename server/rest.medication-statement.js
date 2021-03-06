
JsonRoutes.Middleware.use(
    '/api/*',
    oAuth2Server.oauthserver.authorise()   // OAUTH FLOW - A7.1
);




JsonRoutes.add("get", "/fhir/MedicationStatement/:id", function (req, res, next) { process.env.DEBUG && console.log('GET /fhir/MedicationStatement/' + req.params.id);
  res.setHeader("Access-Control-Allow-Origin", "*");

  var accessTokenStr = (req.params && req.params.access_token) || (req.query && req.query.access_token);
  var accessToken = oAuth2Server.collections.accessToken.findOne({accessToken: accessTokenStr});

  if (accessToken || process.env.NOAUTH) {
    process.env.TRACE && console.log('accessToken', accessToken);
    process.env.TRACE && console.log('accessToken.userId', accessToken.userId);

    if (typeof SiteStatistics === "object") {
      SiteStatistics.update({_id: "configuration"}, {$inc:{
        "MedicationStatements.count.read": 1 }});
    }

    var id = req.params.id;
    var medicationStatementData = MedicationStatements.findOne(id); delete medicationStatementData._document;
    process.env.TRACE && console.log('medicationStatementData', medicationStatementData);

    JsonRoutes.sendResult(res, {
      code: 200,
      data: medicationStatementData
    });
  } else {
    JsonRoutes.sendResult(res, {
      code: 401
    });
  }
});



JsonRoutes.add("get", "/fhir/MedicationStatement", function (req, res, next) { process.env.DEBUG && console.log('GET /fhir/MedicationStatement', req.query);
  res.setHeader("Access-Control-Allow-Origin", "*");

  var accessTokenStr = (req.params && req.params.access_token) || (req.query && req.query.access_token);
  var accessToken = oAuth2Server.collections.accessToken.findOne({accessToken: accessTokenStr});

  if (accessToken || process.env.NOAUTH) {
    process.env.TRACE && console.log('accessToken', accessToken);
    process.env.TRACE && console.log('accessToken.userId', accessToken.userId);

    if (typeof SiteStatistics === "object") {
      SiteStatistics.update({_id: "configuration"}, {$inc:{
        "MedicationStatements.count.search-type": 1 }});
    }

    var databaseQuery = {};

    process.env.DEBUG && console.log('databaseQuery', databaseQuery);
    process.env.DEBUG && console.log('MedicationStatements.find(id).count()', MedicationStatements.find(databaseQuery).count());

    // MedicationStatements returns an object instead of a pure JSON document
    // it stores a shadow reference of the original doc, which we're removing here
    var medicationStatementData = MedicationStatements.find(databaseQuery).fetch();
    medicationStatementData.forEach(function(medicationStatement){
      delete medicationStatement._document;
    });

    JsonRoutes.sendResult(res, {
      code: 200,
      data: medicationStatementData
    });
  } else {
    JsonRoutes.sendResult(res, {
      code: 401
    });
  }
});
