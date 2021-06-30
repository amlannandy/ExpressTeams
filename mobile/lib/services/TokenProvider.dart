import 'package:shared_preferences/shared_preferences.dart';

class TokenProvider {
  static const ACCESS_TOKEN = "express-teams-token";

  static Future<String?> getAccessToken() async {
    try {
      SharedPreferences _preferences = await SharedPreferences.getInstance();
      String? token = await _preferences.getString(ACCESS_TOKEN);
      return token;
    } catch (e) {
      return null;
    }
  }
}
