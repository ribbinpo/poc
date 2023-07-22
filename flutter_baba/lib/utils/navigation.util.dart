import 'package:flutter/material.dart';
import 'package:flutter_baba/users_list/views/add_user_screen.dart';
import 'package:flutter_baba/users_list/views/user_details_screen.dart';

void openUserDetails(BuildContext context) async {
  Navigator.push(context,
      MaterialPageRoute(builder: (context) => const UserDetailsScreen()));
}

void openAddUsers(BuildContext context) async {
  Navigator.push(context,
      MaterialPageRoute(builder: (context) => const AddUserScreen()));
}
