class ApiResponse {
  bool? success;
  String? message;
  List<String>? errors;

  ApiResponse(bool success, {String? message, List<String>? errors}) {
    this.success = success;
    if (this.success == true) {
      this.message = message;
    } else {
      this.errors = errors;
    }
  }

  ApiResponse.fromJSON(Map<String, dynamic> json) {
    this.success = json['success'] ?? false;
    if (this.success!) {
      this.message = json['msg'];
    } else {
      this.errors = json['errors'];
    }
  }
}
