import 'package:flutter/material.dart';
import 'package:flutter_mvvm/users_list/view_models/users_view_model.dart';
import 'package:provider/provider.dart';

import '../../components/app_title.dart';

class UserDetailsScreen extends StatelessWidget {
  const UserDetailsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    UsersViewModel usersViewModel = context.watch<UsersViewModel>();
    return Scaffold(
      appBar: AppBar(
        title: Text(usersViewModel.selectedUser.name.toString()),
      ),
      body: Container(
        padding: const EdgeInsets.all(20.0),
        child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              AppTitle(text: usersViewModel.selectedUser.name.toString()),
              Text(usersViewModel.selectedUser.email.toString())
            ]),
      ),
    );
  }
}
