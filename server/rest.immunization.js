
JsonRoutes.Middleware.use(
  '/api/*',
  oAuth2Server.oauthserver.authorise()
);




JsonRoutes.add("get", "/fhir/Immunization/:id", function (req, res, next) { process.env.DEBUG && console.log('GET /fhir/Immunization/' + req.params.id);
  res.setHeader("Access-Control-Allow-Origin", "*");

  var accessTokenStr = (req.params && req.params.access_token) || (req.query && req.query.access_token);
  var accessToken = oAuth2Server.collections.accessToken.findOne({accessToken: accessTokenStr});

  if (accessToken || process.env.NOAUTH) {
    process.env.TRACE && console.log('accessToken', accessToken);
    process.env.TRACE && console.log('accessToken.userId', accessToken.userId);

    if (typeof SiteStatistics === "object") {
      SiteStatistics.update({_id: "configuration"}, {$inc:{
        "Immunizations.count.read": 1 }});
    }

    var id = req.params.id;
    var immunizationData = Immunizations.findOne(id); delete immunizationData._document;
    process.env.TRACE && console.log('immunizationData', immunizationData);

    JsonRoutes.sendResult(res, {
      code: 200,
      data: immunizationData
    });
  } else {
    JsonRoutes.sendResult(res, {
      code: 401
    });
  }
});



JsonRoutes.add("get", "/fhir/Immunization", function (req, res, next) { process.env.DEBUG && console.log('GET /fhir/Immunization', req.query);
  res.setHeader("Access-Control-Allow-Origin", "*");

  var accessTokenStr = (req.params && req.params.access_token) || (req.query && req.query.access_token);
  var accessToken = oAuth2Server.collections.accessToken.findOne({accessToken: accessTokenStr});

  if (accessToken || process.env.NOAUTH) {
    process.env.TRACE && console.log('accessToken', accessToken);
    process.env.TRACE && console.log('accessToken.userId', accessToken.userId);

    if (typeof SiteStatistics === "object") {
      SiteStatistics.update({_id: "configuration"}, {$inc:{
        "Immunizations.count.search-type": 1 }});
    }

    var databaseQuery = {};


    process.env.DEBUG && console.log('databaseQuery', databaseQuery);
    process.env.DEBUG && console.log('Immunizations.find(id).count()', Immunizations.find(databaseQuery).count());

    // Immunizations returns an object instead of a pure JSON document
    // it stores a shadow reference of the original doc, which we're removing here
    var immunizationData = Immunizations.find(databaseQuery).fetch();
    immunizationData.forEach(function(immunization){
      delete immunization._document;
    });

    JsonRoutes.sendResult(res, {
      code: 200,
      data: immunizationData
    });
  } else {
    JsonRoutes.sendResult(res, {
      code: 401
    });
  }
});
