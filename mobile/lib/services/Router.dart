import 'package:fluro/fluro.dart';
import 'package:flutter/material.dart';

import 'package:express_teams/screens/HomeScreen.dart';
import 'package:express_teams/screens/LoginScreen.dart';
import 'package:express_teams/screens/RegisterScreen.dart';

// Instantiated class
class Application {
  static late FluroRouter router;
}

// Route handlers
var homeHandler = Handler(
    handlerFunc: (BuildContext? context, Map<String, List<String>> params) {
  return HomeScreen();
});

var loginHandler = Handler(
    handlerFunc: (BuildContext? context, Map<String, List<String>> params) {
  return LoginScreen();
});

var registerHandler = Handler(
    handlerFunc: (BuildContext? context, Map<String, List<String>> params) {
  return RegisterScreen();
});

// Routes class
class Routes {
  // Route names
  static const HOME = '/';
  static const LOGIN = '/login';
  static const REGISTER = '/register';
  static const PROFILE = '/profile';
  static const CHAT = '/chat/:chatId';

  // Configure routes
  static void configureRouter(FluroRouter router) {
    router.define(
      HOME,
      handler: homeHandler,
      transitionType: TransitionType.native,
    );
    router.define(
      LOGIN,
      handler: loginHandler,
      transitionType: TransitionType.native,
    );
    router.define(
      REGISTER,
      handler: registerHandler,
      transitionType: TransitionType.native,
    );
  }
}
