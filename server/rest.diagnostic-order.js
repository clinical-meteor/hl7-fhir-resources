
JsonRoutes.Middleware.use(
  '/api/*',
  oAuth2Server.oauthserver.authorise()
);



JsonRoutes.add("get", "/fhir/DiagnosticOrder/:id", function (req, res, next) {
  process.env.DEBUG && console.log('GET /fhir/DiagnosticOrder/' + req.params.id);

  res.setHeader("Access-Control-Allow-Origin", "*");

  var accessTokenStr = (req.params && req.params.access_token) || (req.query && req.query.access_token);
  var accessToken = oAuth2Server.collections.accessToken.findOne({accessToken: accessTokenStr});

  if (accessToken || process.env.NOAUTH) {
    process.env.TRACE && console.log('accessToken', accessToken);
    process.env.TRACE && console.log('accessToken.userId', accessToken.userId);

    if (typeof SiteStatistics === "object") {
      SiteStatistics.update({_id: "configuration"}, {$inc:{
        "DiagnosticOrders.count.read": 1
      }});
    }

    var id = req.params.id;
    var diagnosticOrderData = DiagnosticOrders.findOne(id);
    delete diagnosticOrderData._document;
    process.env.TRACE && console.log('diagnosticOrderData', diagnosticOrderData);

    JsonRoutes.sendResult(res, {
      code: 200,
      data: diagnosticOrderData
    });
  } else {
    JsonRoutes.sendResult(res, {
      code: 401
    });
  }
});



JsonRoutes.add("get", "/fhir/DiagnosticOrder", function (req, res, next) {
  process.env.DEBUG && console.log('GET /fhir/DiagnosticOrder', req.query);

  res.setHeader("Access-Control-Allow-Origin", "*");

  var accessTokenStr = (req.params && req.params.access_token) || (req.query && req.query.access_token);
  var accessToken = oAuth2Server.collections.accessToken.findOne({accessToken: accessTokenStr});

  if (accessToken || process.env.NOAUTH) {
    process.env.TRACE && console.log('accessToken', accessToken);
    process.env.TRACE && console.log('accessToken.userId', accessToken.userId);

    if (typeof SiteStatistics === "object") {
      SiteStatistics.update({_id: "configuration"}, {$inc:{
        "DiagnosticOrders.count.search-type": 1
      }});
    }

    var databaseQuery = {};

    process.env.DEBUG && console.log('databaseQuery', databaseQuery);
    process.env.DEBUG && console.log('DiagnosticOrders.find(id).count()', DiagnosticOrders.find(databaseQuery).count());

    // DiagnosticOrders returns an object instead of a pure JSON document
    // it stores a shadow reference of the original doc, which we're removing here
    var diagnosticOrderData = DiagnosticOrders.find(databaseQuery).fetch();

    diagnosticOrderData.forEach(function(diagnosticOrder){
      delete diagnosticOrder._document;
    });

    JsonRoutes.sendResult(res, {
      code: 200,
      data: diagnosticOrderData
    });
  } else {
    JsonRoutes.sendResult(res, {
      code: 401
    });
  }
});
