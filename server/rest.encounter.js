
JsonRoutes.Middleware.use(
  '/api/*',
  oAuth2Server.oauthserver.authorise()
);




JsonRoutes.add("get", "/fhir/Encounter/:id", function (req, res, next) {
  process.env.DEBUG && console.log('GET /fhir/Encounter/' + req.params.id);

  res.setHeader("Access-Control-Allow-Origin", "*");

  var accessTokenStr = (req.params && req.params.access_token) || (req.query && req.query.access_token);
  var accessToken = oAuth2Server.collections.accessToken.findOne({accessToken: accessTokenStr});

  if (accessToken || process.env.NOAUTH) {
    process.env.TRACE && console.log('accessToken', accessToken);
    process.env.TRACE && console.log('accessToken.userId', accessToken.userId);

    if (typeof SiteStatistics === "object") {
      SiteStatistics.update({_id: "configuration"}, {$inc:{
        "Encounters.count.read": 1
      }});
    }

    var id = req.params.id;
    var encounterData = Encounters.findOne(id);
    delete encounterData._document;
    process.env.TRACE && console.log('encounterData', encounterData);

    JsonRoutes.sendResult(res, {
      code: 200,
      data: encounterData
    });
  } else {
    JsonRoutes.sendResult(res, {
      code: 401
    });
  }
});



JsonRoutes.add("get", "/fhir/Encounter", function (req, res, next) {
  process.env.DEBUG && console.log('GET /fhir/Encounter', req.query);

  res.setHeader("Access-Control-Allow-Origin", "*");

  var accessTokenStr = (req.params && req.params.access_token) || (req.query && req.query.access_token);
  var accessToken = oAuth2Server.collections.accessToken.findOne({accessToken: accessTokenStr});

  if (accessToken || process.env.NOAUTH) {
    process.env.TRACE && console.log('accessToken', accessToken);
    process.env.TRACE && console.log('accessToken.userId', accessToken.userId);

    if (typeof SiteStatistics === "object") {
      SiteStatistics.update({_id: "configuration"}, {$inc:{
        "Encounters.count.search-type": 1
      }});
    }

    var databaseQuery = {};

    process.env.DEBUG && console.log('databaseQuery', databaseQuery);
    process.env.DEBUG && console.log('Encounters.find(id)', Encounters.find(databaseQuery).fetch());

    // Encounters returns an object instead of a pure JSON document
    // it stores a shadow reference of the original doc, which we're removing here
    var encounterData = Encounters.find(databaseQuery).fetch();

    encounterData.forEach(function(encounter){
      delete encounter._document;
    });

    JsonRoutes.sendResult(res, {
      code: 200,
      data: encounterData
    });
  } else {
    JsonRoutes.sendResult(res, {
      code: 401
    });
  }
});
