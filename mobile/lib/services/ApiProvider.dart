import 'package:dio/dio.dart';
import 'package:express_teams/models/ApiResponse.dart';

class ApiProvider {
  Dio? dio;

  ApiProvider() {
    this.dio = Dio();
  }

  Future<ApiResponse> login(String email, String password) async {}
}
