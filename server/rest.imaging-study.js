
JsonRoutes.Middleware.use(
  '/api/*',
  oAuth2Server.oauthserver.authorise()
);




JsonRoutes.add("get", "/fhir/ImagingStudy/:id", function (req, res, next) {
  process.env.DEBUG && console.log('GET /fhir/ImagingStudy/' + req.params.id);

  res.setHeader("Access-Control-Allow-Origin", "*");

  var accessTokenStr = (req.params && req.params.access_token) || (req.query && req.query.access_token);
  var accessToken = oAuth2Server.collections.accessToken.findOne({accessToken: accessTokenStr});

  if (accessToken || process.env.NOAUTH) {
    process.env.TRACE && console.log('accessToken', accessToken);
    process.env.TRACE && console.log('accessToken.userId', accessToken.userId);

    if (typeof SiteStatistics === "object") {
      SiteStatistics.update({_id: "configuration"}, {$inc:{
        "ImagingStudies.count.read": 1
      }});
    }

    var id = req.params.id;
    var imagingStudyData = ImagingStudies.findOne(id);
    delete imagingStudyData._document;
    process.env.TRACE && console.log('imagingStudyData', imagingStudyData);

    JsonRoutes.sendResult(res, {
      code: 200,
      data: imagingStudyData
    });
  } else {
    JsonRoutes.sendResult(res, {
      code: 401
    });
  }
});



JsonRoutes.add("get", "/fhir/ImagingStudy", function (req, res, next) {
  process.env.DEBUG && console.log('GET /fhir/ImagingStudy', req.query);

  res.setHeader("Access-Control-Allow-Origin", "*");

  var accessTokenStr = (req.params && req.params.access_token) || (req.query && req.query.access_token);
  var accessToken = oAuth2Server.collections.accessToken.findOne({accessToken: accessTokenStr});

  if (accessToken || process.env.NOAUTH) {
    process.env.TRACE && console.log('accessToken', accessToken);
    process.env.TRACE && console.log('accessToken.userId', accessToken.userId);

    if (typeof SiteStatistics === "object") {
      SiteStatistics.update({_id: "configuration"}, {$inc:{
        "ImagingStudies.count.search-type": 1
      }});
    }

    var databaseQuery = {};

    process.env.DEBUG && console.log('databaseQuery', databaseQuery);
    process.env.DEBUG && console.log('ImagingStudies.find(id).count()', ImagingStudies.find(databaseQuery).count());

    // ImagingStudies returns an object instead of a pure JSON document
    // it stores a shadow reference of the original doc, which we're removing here
    var imagingStudyData = ImagingStudies.find(databaseQuery).fetch();

    imagingStudyData.forEach(function(imagingStudy){
      delete imagingStudy._document;
    });

    JsonRoutes.sendResult(res, {
      code: 200,
      data: imagingStudyData
    });
  } else {
    JsonRoutes.sendResult(res, {
      code: 401
    });
  }
});
