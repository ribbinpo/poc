import 'package:flutter/material.dart';
import 'package:flutter_mvvm/components/app_title.dart';
import 'package:flutter_mvvm/users_list/models/users_model.dart';

class UsersListRow extends StatelessWidget {
  final UsersModel usersModel;
  final Function onTap;
  const UsersListRow({super.key, required this.usersModel, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () { onTap(); },
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [AppTitle(text: usersModel.name.toString()), Text(usersModel.email.toString())],
      ),
    );
  }
}
