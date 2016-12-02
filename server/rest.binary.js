
JsonRoutes.Middleware.use(
  '/api/*',
  oAuth2Server.oauthserver.authorise()
);




JsonRoutes.add("get", "/fhir/Binary/:id", function (req, res, next) { process.env.DEBUG && console.log('GET /fhir/Binary/' + req.params.id);
  res.setHeader("Access-Control-Allow-Origin", "*");

  var accessTokenStr = (req.params && req.params.access_token) || (req.query && req.query.access_token);
  var accessToken = oAuth2Server.collections.accessToken.findOne({accessToken: accessTokenStr});

  if (accessToken || process.env.NOAUTH) {
    process.env.TRACE && console.log('accessToken', accessToken);
    process.env.TRACE && console.log('accessToken.userId', accessToken.userId);

    if (typeof SiteStatistics === "object") {
      SiteStatistics.update({_id: "configuration"}, {$inc:{
        "Binarys.count.read": 1 }});
    }

    var id = req.params.id;
    var binaryData = Binarys.findOne(id); delete binaryData._document;
    process.env.TRACE && console.log('binaryData', binaryData);

    JsonRoutes.sendResult(res, {
      code: 200,
      data: binaryData
    });
  } else {
    JsonRoutes.sendResult(res, {
      code: 401
    });
  }
});



JsonRoutes.add("get", "/fhir/Binary", function (req, res, next) { process.env.DEBUG && console.log('GET /fhir/Binary', req.query);
  res.setHeader("Access-Control-Allow-Origin", "*");

  var accessTokenStr = (req.params && req.params.access_token) || (req.query && req.query.access_token);
  var accessToken = oAuth2Server.collections.accessToken.findOne({accessToken: accessTokenStr});

  if (accessToken || process.env.NOAUTH) {
    process.env.TRACE && console.log('accessToken', accessToken);
    process.env.TRACE && console.log('accessToken.userId', accessToken.userId);

    if (typeof SiteStatistics === "object") {
      SiteStatistics.update({_id: "configuration"}, {$inc:{
        "Binarys.count.search-type": 1 }});
    }

    var databaseQuery = {};

    process.env.DEBUG && console.log('databaseQuery', databaseQuery);
    process.env.DEBUG && console.log('Binarys.find(id).count()', Binarys.find(databaseQuery).count());

    // Binarys returns an object instead of a pure JSON document
    // it stores a shadow reference of the original doc, which we're removing here
    var binaryData = Binarys.find(databaseQuery).fetch();
    binaryData.forEach(function(binary){
      delete binary._document;
    });

    JsonRoutes.sendResult(res, {
      code: 200,
      data: binaryData
    });
  } else {
    JsonRoutes.sendResult(res, {
      code: 401
    });
  }
});
