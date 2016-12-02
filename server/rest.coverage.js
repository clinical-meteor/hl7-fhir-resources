
JsonRoutes.Middleware.use(
  '/api/*',
  oAuth2Server.oauthserver.authorise()
);




JsonRoutes.add("get", "/fhir/Coverage/:id", function (req, res, next) { process.env.DEBUG && console.log('GET /fhir/Coverage/' + req.params.id);
  res.setHeader("Access-Control-Allow-Origin", "*");

  var accessTokenStr = (req.params && req.params.access_token) || (req.query && req.query.access_token);
  var accessToken = oAuth2Server.collections.accessToken.findOne({accessToken: accessTokenStr});

  if (accessToken || process.env.NOAUTH) {
    process.env.TRACE && console.log('accessToken', accessToken);
    process.env.TRACE && console.log('accessToken.userId', accessToken.userId);

    if (typeof SiteStatistics === "object") {
      SiteStatistics.update({_id: "configuration"}, {$inc:{
        "Coverages.count.read": 1 }});
    }

    var id = req.params.id;
    var coverageData = Coverages.findOne(id); delete coverageData._document;
    process.env.TRACE && console.log('coverageData', coverageData);

    JsonRoutes.sendResult(res, {
      code: 200,
      data: coverageData
    });
  } else {
    JsonRoutes.sendResult(res, {
      code: 401
    });
  }
});



JsonRoutes.add("get", "/fhir/Coverage", function (req, res, next) { process.env.DEBUG && console.log('GET /fhir/Coverage', req.query);
  res.setHeader("Access-Control-Allow-Origin", "*");

  var accessTokenStr = (req.params && req.params.access_token) || (req.query && req.query.access_token);
  var accessToken = oAuth2Server.collections.accessToken.findOne({accessToken: accessTokenStr});

  if (accessToken || process.env.NOAUTH) {
    process.env.TRACE && console.log('accessToken', accessToken);
    process.env.TRACE && console.log('accessToken.userId', accessToken.userId);

    if (typeof SiteStatistics === "object") {
      SiteStatistics.update({_id: "configuration"}, {$inc:{
        "Coverages.count.search-type": 1 }});
    }

    var databaseQuery = {};
    process.env.DEBUG && console.log('databaseQuery', databaseQuery);
    process.env.DEBUG && console.log('Coverages.find(id).count()', Coverages.find(databaseQuery).count());


    // Coverages returns an object instead of a pure JSON document
    // it stores a shadow reference of the original doc, which we're removing here
    var coverageData = Coverages.find(databaseQuery).fetch();
    coverageData.forEach(function(coverage){
      delete coverage._document;
    });

    JsonRoutes.sendResult(res, {
      code: 200,
      data: coverageData
    });
  } else {
    JsonRoutes.sendResult(res, {
      code: 401
    });
  }
});
