import 'package:flutter/material.dart';
import 'package:flutter_mvvm_riverpod/users_list/view_models/users_view_model.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class AddUserScreen extends ConsumerWidget {
  const AddUserScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    bool toggleIcon = false;
    String message = '';
    UsersViewModel usersViewModel =
        ref.read<UsersViewModel>(usersViewModelProvider.notifier);
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
            TextButton(onPressed: () => show(context, toggleIcon, message), child: const Text('a'))
          ],
        ),
      ),
    );
  }

  Future show(BuildContext context, bool toggleIcon, String message) {
    return showModalBottomSheet(
        context: context,
        builder: (BuildContext context) {
          return StatefulBuilder(
            builder: (BuildContext context, StateSetter setState) {
              return Container(
                color: Colors.blue,
                child: Column(
                  children: [
                    IconButton(
                      onPressed: () {
                        setState(() {
                          toggleIcon = !toggleIcon;
                          message = 'aaaa';
                        });
                      },
                      icon: Icon(toggleIcon
                          ? Icons.check_box
                          : Icons.check_box_outline_blank),
                    ),
                    test(message),
                  ],
                ),
              );
            },
          );
        });
  }

  Widget test(String message) {
    return Text(message);
  }
}
