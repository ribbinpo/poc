import 'package:flutter/material.dart';
import 'package:flutter_mvvm_riverpod/components/app_loading.dart';
import 'package:flutter_mvvm_riverpod/components/users_list_row.dart';
import 'package:flutter_mvvm_riverpod/users_list/models/users_model.dart';
import 'package:flutter_mvvm_riverpod/users_list/view_models/users_view_model.dart';
import 'package:flutter_mvvm_riverpod/utils/navigation.util.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class HomeScreen extends ConsumerWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
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
          _ui(ref),
        ]),
      ),
    );
  }

  _ui(WidgetRef ref) {
    UsersViewModel usersViewModel =
        ref.read<UsersViewModel>(usersViewModelProvider.notifier);
    final usersModel = ref.watch(usersViewModelProvider);
    return Expanded(
      child: usersModel.when(
          data: (users) => ListView.separated(
              itemBuilder: (context, index) {
                UsersModel _usersModel = users[index];
                return UsersListRow(
                  usersModel: _usersModel,
                  onTap: () async {
                    usersViewModel.setSelectedUser(_usersModel);
                    openUserDetails(context);
                  },
                );
              },
              separatorBuilder: (context, index) => const Divider(),
              itemCount: users.length),
          error: (Object error, StackTrace stackTrace) => Text("Error: $error",
              style: const TextStyle(color: Colors.white, fontSize: 15)),
          loading: () => const AppLoading()),
    );
  }
}
