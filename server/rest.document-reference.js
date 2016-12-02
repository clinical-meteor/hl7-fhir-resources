
JsonRoutes.Middleware.use(
  '/api/*',
  oAuth2Server.oauthserver.authorise()
);




JsonRoutes.add("get", "/fhir/DocumentReference/:id", function (req, res, next) { process.env.DEBUG && console.log('GET /fhir/DocumentReference/' + req.params.id);
  res.setHeader("Access-Control-Allow-Origin", "*");

  var accessTokenStr = (req.params && req.params.access_token) || (req.query && req.query.access_token);
  var accessToken = oAuth2Server.collections.accessToken.findOne({accessToken: accessTokenStr});

  if (accessToken || process.env.NOAUTH) {
    process.env.TRACE && console.log('accessToken', accessToken);
    process.env.TRACE && console.log('accessToken.userId', accessToken.userId);

    if (typeof SiteStatistics === "object") {
      SiteStatistics.update({_id: "configuration"}, {$inc:{
        "DocumentReferences.count.read": 1 }});
    }

    var id = req.params.id;
    var DocumentReferenceData = DocumentReferences.findOne(id); delete DocumentReferenceData._document;
    process.env.TRACE && console.log('DocumentReferenceData', DocumentReferenceData);

    JsonRoutes.sendResult(res, {
      code: 200,
      data: DocumentReferenceData
    });
  } else {
    JsonRoutes.sendResult(res, {
      code: 401
    });
  }
});



JsonRoutes.add("get", "/fhir/DocumentReference", function (req, res, next) { process.env.DEBUG && console.log('GET /fhir/DocumentReference', req.query);
  res.setHeader("Access-Control-Allow-Origin", "*");

  var accessTokenStr = (req.params && req.params.access_token) || (req.query && req.query.access_token);
  var accessToken = oAuth2Server.collections.accessToken.findOne({accessToken: accessTokenStr});

  if (accessToken || process.env.NOAUTH) {
    process.env.TRACE && console.log('accessToken', accessToken);
    process.env.TRACE && console.log('accessToken.userId', accessToken.userId);

    if (typeof SiteStatistics === "object") {
      SiteStatistics.update({_id: "configuration"}, {$inc:{
        "DocumentReferences.count.search-type": 1 }});
    }

    var databaseQuery = {};

    process.env.DEBUG && console.log('databaseQuery', databaseQuery);
    process.env.DEBUG && console.log('DocumentReferences.find(id).count()', DocumentReferences.find(databaseQuery).count());


    // DocumentReferences returns an object instead of a pure JSON document
    // it stores a shadow reference of the original doc, which we're removing here
    var DocumentReferenceData = DocumentReferences.find(databaseQuery).fetch();
    DocumentReferenceData.forEach(function(documentReference){
      delete documentReference._document;
    });

    JsonRoutes.sendResult(res, {
      code: 200,
      data: DocumentReferenceData
    });
  } else {
    JsonRoutes.sendResult(res, {
      code: 401
    });
  }
});
