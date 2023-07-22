import 'dart:io';

import 'package:flutter_mvvm/users_list/models/users_model.dart';
import 'package:flutter_mvvm/users_list/repositories/api_status.dart';
import 'package:flutter_mvvm/utils/constant.dart';
import 'package:http/http.dart' as http;

class UsersService {
  static Future<Object> getUsers() async {
    try {
      var url = Uri.parse(USER_LIST);
      var response = await http.get(url);
      if (200 == response.statusCode) {
        return Success(response: usersModelFromJson(response.body));
      }
      return Failure(
          code: USER_INVALID_RESPONSE, errorResponse: 'Invalid Response');
    } on HttpException {
      return Failure(code: NO_INTERNET, errorResponse: 'No Internet');
    } on FormatException {
      return Failure(code: INVAVID_FORMAT, errorResponse: 'Invalid Format');
    } catch (e) {
      return Failure(code: UNKNOWN_ERROR, errorResponse: 'Unknown Error');
    }
  }
}
