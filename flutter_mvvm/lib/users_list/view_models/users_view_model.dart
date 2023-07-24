import 'package:flutter/widgets.dart';
import 'package:flutter_mvvm/users_list/models/users_error.dart';
import 'package:flutter_mvvm/users_list/models/users_model.dart';
import 'package:flutter_mvvm/users_list/repositories/api_status.dart';
import 'package:flutter_mvvm/users_list/repositories/users_service.dart';

class UsersViewModel extends ChangeNotifier {
  bool _loading = false;
  List<UsersModel> _userListModel = [];
  UsersError? _userError;
  UsersModel _selectedUser = UsersModel();
  UsersModel _addingUser = UsersModel();

  bool get loading => _loading;
  List<UsersModel> get userListModel => _userListModel;
  UsersError? get userError => _userError;
  UsersModel get selectedUser => _selectedUser;
  UsersModel get addingUser => _addingUser;

  // Constructor
  UsersViewModel() {
    getUsers();
  }

  setLoading(bool loading) async {
    _loading = loading;
    notifyListeners();
  }

  setUserListModel(List<UsersModel> userListModel) async {
    _userListModel = userListModel;
  }

  setUserError(UsersError userError) {
    _userError = userError;
  }

  setSelectedUser(UsersModel usersModel) {
    _selectedUser = usersModel;
  }

  Future<bool> addUser() async {
    if (!isValid()) {
      return false;
    }
    _userListModel.add(addingUser);
    _addingUser = UsersModel();
    notifyListeners();
    return true;
  }

  bool isValid() {
    if (addingUser.name == null || addingUser.name!.isEmpty) {
      return false;
    }
    if (addingUser.email == null || addingUser.email!.isEmpty) {
      return false;
    }
    return true;
  }

  Future<void> getUsers() async {
    setLoading(true);
    var response = await UsersService.getUsers();
    if (response is Success) {
      setUserListModel(response.response as List<UsersModel>);
    }
    if (response is Failure) {
      UsersError userError = UsersError(
        code: response.code,
        message: response.errorResponse,
      );
      setUserError(userError);
    }
    setLoading(false);
  }
}
