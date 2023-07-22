import 'package:flutter/material.dart';
import 'package:flutter_mvvm/components/app_error.dart';
import 'package:flutter_mvvm/components/app_loading.dart';
import 'package:flutter_mvvm/components/users_list_row.dart';
import 'package:flutter_mvvm/users_list/models/users_model.dart';
import 'package:flutter_mvvm/users_list/view_models/users_view_model.dart';
import 'package:flutter_mvvm/utils/navigation.util.dart';
import 'package:provider/provider.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    UsersViewModel usersViewModel = context.watch<UsersViewModel>();
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: const Text('Users'),
        actions: [
          IconButton(
              onPressed: () async {
                openAddUsers(context);
              },
              icon: const Icon(Icons.add))
        ],
      ),
      body: Container(
        padding: const EdgeInsets.all(20),
        child: Column(children: [
          _ui(usersViewModel),
        ]),
      ),
    );
  }

  _ui(UsersViewModel usersViewModel) {
    if (usersViewModel.loading) {
      return const AppLoading();
    }
    if (usersViewModel.userError != null) {
      return AppError(
        errorText: usersViewModel.userError.toString(),
      );
    }
    return Expanded(
        child: ListView.separated(
            itemBuilder: (context, index) {
              UsersModel usersModel = usersViewModel.userListModel[index];
              return UsersListRow(
                usersModel: usersModel,
                onTap: () async {
                  usersViewModel.setSelectedUser(usersModel);
                  openUserDetails(context);
                },
              );
            },
            separatorBuilder: (context, index) => const Divider(),
            itemCount: usersViewModel.userListModel.length));
  }
}
