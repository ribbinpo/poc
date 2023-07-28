import 'package:flutter_mvvm_riverpod/users_list/models/users_model.dart';
import 'package:flutter_mvvm_riverpod/users_list/repositories/api_status.dart';
import 'package:flutter_mvvm_riverpod/utils/constant.dart';
import 'package:http/http.dart' as http;

class UsersService {
  // static Future<Object> getUsers() async {
  //   try {
  //     var url = Uri.parse(USER_LIST);
  //     var response = await http.get(url);
  //     if (200 == response.statusCode) {
  //       return Success(response: usersModelFromJson(response.body));
  //     }
  //     return Failure(
  //         code: USER_INVALID_RESPONSE, errorResponse: 'Invalid Response');
  //   } on HttpException {
  //     return Failure(code: NO_INTERNET, errorResponse: 'No Internet');
  //   } on FormatException {
  //     return Failure(code: INVAVID_FORMAT, errorResponse: 'Invalid Format');
  //   } catch (e) {
  //     return Failure(code: UNKNOWN_ERROR, errorResponse: 'Unknown Error');
  //   }
  // }

  static Future<Result<List<UsersModel>, Exception>> getUsersN() async {
    try {
      final uri = Uri.parse(USER_LIST);
      final response = await http.get(uri);
      switch (response.statusCode) {
        case 200:
          final data = usersModelFromJson(response.body);
          return SuccessN(data);
        default:
          return FailureN(Exception(response.reasonPhrase));
      }
    } on Exception catch (e) {
      return FailureN(e);
    }
  }
}
