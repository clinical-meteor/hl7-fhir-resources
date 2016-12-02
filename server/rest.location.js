
JsonRoutes.Middleware.use(
  '/api/*',
  oAuth2Server.oauthserver.authorise()
);




JsonRoutes.add("get", "/fhir/Location/:id", function (req, res, next) {
  process.env.DEBUG && console.log('GET /fhir/Location/' + req.params.id);

  res.setHeader("Access-Control-Allow-Origin", "*");

  var accessTokenStr = (req.params && req.params.access_token) || (req.query && req.query.access_token);
  var accessToken = oAuth2Server.collections.accessToken.findOne({accessToken: accessTokenStr});

  if (accessToken || process.env.NOAUTH) {
    process.env.TRACE && console.log('accessToken', accessToken);
    process.env.TRACE && console.log('accessToken.userId', accessToken.userId);

    if (typeof SiteStatistics === "object") {
      SiteStatistics.update({_id: "configuration"}, {$inc:{
        "Locations.count.read": 1
      }});
    }

    var id = req.params.id;
    var locationData = Locations.findOne(id);
    delete locationData._document;
    process.env.TRACE && console.log('locationData', locationData);

    JsonRoutes.sendResult(res, {
      code: 200,
      data: locationData
    });
  } else {
    JsonRoutes.sendResult(res, {
      code: 401
    });
  }
});



JsonRoutes.add("get", "/fhir/Location", function (req, res, next) {
  process.env.DEBUG && console.log('GET /fhir/Location', req.query);

  res.setHeader("Access-Control-Allow-Origin", "*");

  var accessTokenStr = (req.params && req.params.access_token) || (req.query && req.query.access_token);
  var accessToken = oAuth2Server.collections.accessToken.findOne({accessToken: accessTokenStr});

  if (accessToken || process.env.NOAUTH) {
    process.env.TRACE && console.log('accessToken', accessToken);
    process.env.TRACE && console.log('accessToken.userId', accessToken.userId);

    if (typeof SiteStatistics === "object") {
      SiteStatistics.update({_id: "configuration"}, {$inc:{
        "Locations.count.search-type": 1
      }});
    }

    var databaseQuery = {};

    process.env.DEBUG && console.log('databaseQuery', databaseQuery);
    process.env.DEBUG && console.log('Locations.find(id).count()', Locations.find(databaseQuery).count());

    // Locations returns an object instead of a pure JSON document
    // it stores a shadow reference of the original doc, which we're removing here
    var locationData = Locations.find(databaseQuery).fetch();

    locationData.forEach(function(location){
      delete location._document;
    });

    JsonRoutes.sendResult(res, {
      code: 200,
      data: locationData
    });
  } else {
    JsonRoutes.sendResult(res, {
      code: 401
    });
  }
});
