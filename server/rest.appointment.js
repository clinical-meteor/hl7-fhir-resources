
JsonRoutes.Middleware.use(
  '/api/*',
  oAuth2Server.oauthserver.authorise()
);




JsonRoutes.add("get", "/fhir/Appointments/:id", function (req, res, next) {
  process.env.DEBUG && console.log('GET /fhir/Patient/' + req.params.id);

  res.setHeader("Access-Control-Allow-Origin", "*");

  var accessTokenStr = (req.params && req.params.access_token) || (req.query && req.query.access_token);
  var accessToken = oAuth2Server.collections.accessToken.findOne({accessToken: accessTokenStr});

  if (accessToken || process.env.NOAUTH) {
    process.env.TRACE && console.log('accessToken', accessToken);
    process.env.TRACE && console.log('accessToken.userId', accessToken.userId);

    if (typeof SiteStatistics === "object") {
      SiteStatistics.update({_id: "configuration"}, {$inc:{
        "Appointments.count.read": 1
      }});
    }

    var id = req.params.id;
    var appointmentData = Appointments.findOne(id);
    delete appointmentData._document;
    process.env.TRACE && console.log('appointmentData', appointmentData);

    JsonRoutes.sendResult(res, {
      code: 200,
      data: appointmentData
    });
  } else {
    JsonRoutes.sendResult(res, {
      code: 401
    });
  }
});



JsonRoutes.add("get", "/fhir/Patient", function (req, res, next) {
  process.env.DEBUG && console.log('GET /fhir/Patient', req.query);
  // console.log('GET /fhir/Patient', req.query);
  // console.log('process.env.DEBUG', process.env.DEBUG);

  res.setHeader("Access-Control-Allow-Origin", "*");

  var accessTokenStr = (req.params && req.params.access_token) || (req.query && req.query.access_token);
  var accessToken = oAuth2Server.collections.accessToken.findOne({accessToken: accessTokenStr});

  if (accessToken || process.env.NOAUTH) {
    process.env.TRACE && console.log('accessToken', accessToken);
    process.env.TRACE && console.log('accessToken.userId', accessToken.userId);

    if (typeof SiteStatistics === "object") {
      SiteStatistics.update({_id: "configuration"}, {$inc:{
        "Appointments.count.search-type": 1
      }});
    }

    var databaseQuery = {};

    process.env.DEBUG && console.log('databaseQuery', databaseQuery);
    process.env.DEBUG && console.log('Appointments.find(id).count()', Appointments.find(databaseQuery).count());

    // Appointments returns an object instead of a pure JSON document
    // it stores a shadow reference of the original doc, which we're removing here
    var appointmentData = Appointments.find(databaseQuery).fetch();

    appointmentData.forEach(function(appointment){
      delete appointment._document;
    });

    JsonRoutes.sendResult(res, {
      code: 200,
      data: appointmentData
    });
  } else {
    JsonRoutes.sendResult(res, {
      code: 401
    });
  }
});
