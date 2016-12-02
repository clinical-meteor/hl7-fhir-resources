
JsonRoutes.Middleware.use(
  '/api/*',
  oAuth2Server.oauthserver.authorise()
);




JsonRoutes.add("get", "/fhir/Device/:id", function (req, res, next) {
  process.env.DEBUG && console.log('GET /fhir/Device/' + req.params.id);

  res.setHeader("Access-Control-Allow-Origin", "*");

  var accessTokenStr = (req.params && req.params.access_token) || (req.query && req.query.access_token);
  var accessToken = oAuth2Server.collections.accessToken.findOne({accessToken: accessTokenStr});

  if (accessToken || process.env.NOAUTH) {
    process.env.TRACE && console.log('accessToken', accessToken);
    process.env.TRACE && console.log('accessToken.userId', accessToken.userId);

    if (typeof SiteStatistics === "object") {
      SiteStatistics.update({_id: "configuration"}, {$inc:{
        "Devices.count.read": 1
      }});
    }

    var id = req.params.id;
    var deviceData = Devices.findOne(id);
    delete deviceData._document;
    process.env.TRACE && console.log('deviceData', deviceData);

    JsonRoutes.sendResult(res, {
      code: 200,
      data: deviceData
    });
  } else {
    JsonRoutes.sendResult(res, {
      code: 401
    });
  }
});



JsonRoutes.add("get", "/fhir/Device", function (req, res, next) {
  process.env.DEBUG && console.log('GET /fhir/Device', req.query);

  res.setHeader("Access-Control-Allow-Origin", "*");

  var accessTokenStr = (req.params && req.params.access_token) || (req.query && req.query.access_token);
  var accessToken = oAuth2Server.collections.accessToken.findOne({accessToken: accessTokenStr});

  if (accessToken || process.env.NOAUTH) {
    process.env.TRACE && console.log('accessToken', accessToken);
    process.env.TRACE && console.log('accessToken.userId', accessToken.userId);

    if (typeof SiteStatistics === "object") {
      SiteStatistics.update({_id: "configuration"}, {$inc:{
        "Devices.count.search-type": 1
      }});
    }

    var databaseQuery = {};

    process.env.DEBUG && console.log('databaseQuery', databaseQuery);
    process.env.DEBUG && console.log('Devices.find(id).count()', Devices.find(databaseQuery).count());

    // Devices returns an object instead of a pure JSON document
    // it stores a shadow reference of the original doc, which we're removing here
    var deviceData = Devices.find(databaseQuery).fetch();

    deviceData.forEach(function(device){
      delete device._document;
    });

    JsonRoutes.sendResult(res, {
      code: 200,
      data: deviceData
    });
  } else {
    JsonRoutes.sendResult(res, {
      code: 401
    });
  }
});
