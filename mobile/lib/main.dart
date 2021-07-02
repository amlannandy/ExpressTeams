import 'package:fluro/fluro.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

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
        fontFamily: GoogleFonts.roboto().fontFamily,
        colorScheme: ThemeData().colorScheme.copyWith(
              primary: const Color(0xff4FE3C1),
              secondary: const Color(0xff262C3C),
            ),
        backgroundColor: const Color(0xff262C3C),
        scaffoldBackgroundColor: const Color(0xff262C3C),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            primary: Color(0xff4FE3C1),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(35),
            ),
            padding: EdgeInsets.symmetric(vertical: 10, horizontal: 15),
            minimumSize: Size(200, 50),
          ),
        ),
      ),
      onGenerateRoute: Application.router.generator,
    );
  }
}
