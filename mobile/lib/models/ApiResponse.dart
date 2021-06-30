class ApiResponse {
  bool? success;
  String? message;
  List<String>? errors;

  ApiResponse(this.success, this.message, this.errors);

  ApiResponse.fromJSON(Map<String, dynamic> json) {
    this.success = json['success'] ?? false;
    if (this.success!) {
      this.message = json['msg'];
    } else {
      this.errors = json['errors'];
    }
  }
}
