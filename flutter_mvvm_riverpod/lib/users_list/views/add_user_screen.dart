import 'package:flutter/material.dart';
import 'package:flutter_mvvm_riverpod/users_list/view_models/users_view_model.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class AddUserScreen extends ConsumerWidget {
  const AddUserScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    UsersViewModel usersViewModel = ref.read<UsersViewModel>(usersViewModelProvider.notifier);
    return Scaffold(
      appBar: AppBar(
        title: const Text('Add Users'),
        actions: [
          IconButton(
              onPressed: () async {
                bool userAdded = await usersViewModel.addUser();
                if (!userAdded) {
                  return;
                }
                Navigator.pop(context);
              },
              icon: const Icon(Icons.save))
        ],
      ),
      body: Container(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            TextFormField(
              decoration: const InputDecoration(hintText: 'Name'),
              onChanged: (val) async {
                usersViewModel.addingUser.name = val;
              },
            ),
            TextFormField(
              decoration: const InputDecoration(hintText: 'Email'),
              onChanged: (val) async {
                usersViewModel.addingUser.email = val;
              },
            ),
          ],
        ),
      ),
    );
  }
}
