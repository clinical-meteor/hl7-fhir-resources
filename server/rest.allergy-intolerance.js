
JsonRoutes.Middleware.use(
  '/api/*',
  oAuth2Server.oauthserver.authorise()
);




JsonRoutes.add("get", "/fhir/AllergyIntolerance/:id", function (req, res, next) {
  process.env.DEBUG && console.log('GET /fhir/AllergyIntolerance/' + req.params.id);
  res.setHeader("Access-Control-Allow-Origin", "*");

  var accessTokenStr = (req.params && req.params.access_token) || (req.query && req.query.access_token);
  var accessToken = oAuth2Server.collections.accessToken.findOne({accessToken: accessTokenStr});

  if (accessToken || process.env.NOAUTH) {
    process.env.TRACE && console.log('accessToken', accessToken);
    process.env.TRACE && console.log('accessToken.userId', accessToken.userId);

    if (typeof SiteStatistics === "object") {
      SiteStatistics.update({_id: "configuration"}, {$inc:{
        "AllergyIntolerances.count.read": 1 }});
    }

    var id = req.params.id;
    var allergyIntoleranceData = AllergyIntolerances.findOne(id);
    delete allergyIntoleranceData._document;

    process.env.TRACE && console.log('allergyIntoleranceData', allergyIntoleranceData);

    JsonRoutes.sendResult(res, {
      code: 200,
      data: allergyIntoleranceData
    });
  } else {
    JsonRoutes.sendResult(res, {
      code: 401
    });
  }
});



JsonRoutes.add("get", "/fhir/AllergyIntolerance", function (req, res, next) {
  process.env.DEBUG && console.log('GET /fhir/AllergyIntolerance', req.query);
  res.setHeader("Access-Control-Allow-Origin", "*");

  var accessTokenStr = (req.params && req.params.access_token) || (req.query && req.query.access_token);
  var accessToken = oAuth2Server.collections.accessToken.findOne({accessToken: accessTokenStr});

  if (accessToken || process.env.NOAUTH) {
    process.env.TRACE && console.log('accessToken', accessToken);
    process.env.TRACE && console.log('accessToken.userId', accessToken.userId);

    if (typeof SiteStatistics === "object") {
      SiteStatistics.update({_id: "configuration"}, {$inc:{
        "AllergyIntolerances.count.search-type": 1 }});
    }

    var databaseQuery = {};

    // TODO:  Replace with Appointment specificy query parameters

    if (req.query.criticality) {
      databaseQuery['criticality'] = req.query.criticality;
    }


    process.env.DEBUG && console.log('databaseQuery', databaseQuery);
    process.env.DEBUG && console.log('AllergyIntolerances.find(id).count()', AllergyIntolerances.find(databaseQuery).count());

    // AllergyIntolerances returns an object instead of a pure JSON document
    // it stores a shadow reference of the original doc, which we're removing here
    var allergyIntoleranceData = AllergyIntolerances.find(databaseQuery).fetch();
    allergyIntoleranceData.forEach(function(allergy){
      delete allergy._document;
    });

    JsonRoutes.sendResult(res, {
      code: 200,
      data: allergyIntoleranceData
    });
  } else {
    JsonRoutes.sendResult(res, {
      code: 401
    });
  }
});
