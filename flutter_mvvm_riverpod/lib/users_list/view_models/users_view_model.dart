import 'package:flutter_mvvm_riverpod/users_list/models/users_error.dart';
import 'package:flutter_mvvm_riverpod/users_list/models/users_model.dart';
import 'package:flutter_mvvm_riverpod/users_list/repositories/api_status.dart';
import 'package:flutter_mvvm_riverpod/users_list/repositories/users_service.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'users_view_model.g.dart';

@riverpod
class UsersViewModel extends _$UsersViewModel {
  @override
  FutureOr<List<UsersModel>> build() {
    return getUsers();
  }

  bool _loading = false;
  UsersError? _userError;
  UsersModel _selectedUser = UsersModel();
  UsersModel _addingUser = UsersModel();

  bool get loading => _loading;
  UsersError? get userError => _userError;
  UsersModel get selectedUser => _selectedUser;
  UsersModel get addingUser => _addingUser;

  setLoading(bool loading) async {
    _loading = loading;
  }

  setUserListModel(List<UsersModel> userListModel) async {
    state = userListModel as AsyncValue<List<UsersModel>>;
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
    state = AsyncData([...?state.value, _addingUser]);
    _addingUser = UsersModel();
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

  Future<List<UsersModel>> getUsers() async {
    final response = await UsersService.getUsersN();
    final res = switch (response) {
      SuccessN(value: final data) => data,
      FailureN(exception: final exception) =>
        "something when wrong: $exception",
    };
    if (response is SuccessN) {
      return res as List<UsersModel>;
    }
    if (response is FailureN) {}
    return [];
  }
}
