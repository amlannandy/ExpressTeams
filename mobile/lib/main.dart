import 'package:fluro/fluro.dart';
import 'package:flutter/material.dart';

import 'package:express_teams/services/Router.dart';

void main() => runApp(ExpressTeamsApp());

class ExpressTeamsApp extends StatelessWidget {
  ExpressTeamsApp() {
    final router = FluroRouter();
    Routes.configureRouter(router);
    Application.router = router;
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        primaryColor: Color(0xff262C3C),
        accentColor: Color(0xff4FE3C1),
      ),
      onGenerateRoute: Application.router.generator,
    );
  }
}
