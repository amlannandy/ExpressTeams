import 'package:dio/dio.dart';

import 'package:express_teams/config.dart';
import 'package:express_teams/models/ApiResponse.dart';
import 'package:express_teams/services/TokenProvider.dart';

class ApiProvider {
  late Dio _dio;

  ApiProvider() {
    _dio = Dio();
    _dio.options.baseUrl = API_URL;
    _dio.interceptors.clear();
    _dio.interceptors.add(AccessTokenInterceptor());
  }

  Future<ApiResponse> login(String email, String password) async {
    try {
      final postData = {'email': email, 'password': password};
      final res = await _dio.post('/auth/login', data: postData);
      final data = res.data;
      return ApiResponse.fromJSON(data);
    } catch (e) {
      print(e);
      return ApiResponse(false, errors: ['Error during authentication']);
    }
  }
}

class AccessTokenInterceptor extends Interceptor {
  @override
  void onRequest(
      RequestOptions options, RequestInterceptorHandler handler) async {
    String? token = await TokenProvider.getAccessToken();
    if (token != null) {
      options.headers['Authorization'] = 'Bearer $token';
      handler.next(options);
    }
    super.onRequest(options, handler);
  }
}
