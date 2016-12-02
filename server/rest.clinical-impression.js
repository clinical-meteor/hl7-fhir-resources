
JsonRoutes.Middleware.use(
  '/api/*',
  oAuth2Server.oauthserver.authorise()
);



JsonRoutes.add("get", "/fhir/ClinicalImpression/:id", function (req, res, next) {
  process.env.DEBUG && console.log('GET /fhir/ClinicalImpression/' + req.params.id);

  res.setHeader("Access-Control-Allow-Origin", "*");

  var accessTokenStr = (req.params && req.params.access_token) || (req.query && req.query.access_token);
  var accessToken = oAuth2Server.collections.accessToken.findOne({accessToken: accessTokenStr});

  if (accessToken || process.env.NOAUTH) {
    process.env.TRACE && console.log('accessToken', accessToken);
    process.env.TRACE && console.log('accessToken.userId', accessToken.userId);

    if (typeof SiteStatistics === "object") {
      SiteStatistics.update({_id: "configuration"}, {$inc:{
        "ClinicalImpressions.count.read": 1
      }});
    }

    var id = req.params.id;
    var clinicalImpressionData = ClinicalImpressions.findOne(id);
    delete clinicalImpressionData._document;
    process.env.TRACE && console.log('clinicalImpressionData', clinicalImpressionData);

    JsonRoutes.sendResult(res, {
      code: 200,
      data: clinicalImpressionData
    });
  } else {
    JsonRoutes.sendResult(res, {
      code: 401
    });
  }
});



JsonRoutes.add("get", "/fhir/ClinicalImpression", function (req, res, next) {
  process.env.DEBUG && console.log('GET /fhir/ClinicalImpression', req.query);

  res.setHeader("Access-Control-Allow-Origin", "*");

  var accessTokenStr = (req.params && req.params.access_token) || (req.query && req.query.access_token);
  var accessToken = oAuth2Server.collections.accessToken.findOne({accessToken: accessTokenStr});

  if (accessToken || process.env.NOAUTH) {
    process.env.TRACE && console.log('accessToken', accessToken);
    process.env.TRACE && console.log('accessToken.userId', accessToken.userId);

    if (typeof SiteStatistics === "object") {
      SiteStatistics.update({_id: "configuration"}, {$inc:{
        "ClinicalImpressions.count.search-type": 1
      }});
    }

    var databaseQuery = {};

    process.env.DEBUG && console.log('databaseQuery', databaseQuery);
    process.env.DEBUG && console.log('ClinicalImpressions.find(id).count()', ClinicalImpressions.find(databaseQuery).count());

    // ClinicalImpressions returns an object instead of a pure JSON document
    // it stores a shadow reference of the original doc, which we're removing here
    var clinicalImpressionData = ClinicalImpressions.find(databaseQuery).fetch();

    clinicalImpressionData.forEach(function(impression){
      delete impression._document;
    });

    JsonRoutes.sendResult(res, {
      code: 200,
      data: clinicalImpressionData
    });
  } else {
    JsonRoutes.sendResult(res, {
      code: 401
    });
  }
});
