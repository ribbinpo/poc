import 'package:flutter/material.dart';
import 'package:flutter_mvvm_riverpod/users_list/view_models/users_view_model.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../components/app_title.dart';

class UserDetailsScreen extends ConsumerStatefulWidget {
  const UserDetailsScreen({super.key});

  @override
  UserDetailsScreenState createState() => UserDetailsScreenState();
}

class UserDetailsScreenState extends ConsumerState<UserDetailsScreen> {
  final controller_1 = TextEditingController();
  final controller_2 = TextEditingController();

  final _formKey = GlobalKey<FormState>();

  @override
  void initState() {
    super.initState();
    ref.read(usersViewModelProvider);
  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    UsersViewModel usersViewModel =
        ref.read<UsersViewModel>(usersViewModelProvider.notifier);
    return keyboard(
      Scaffold(
        appBar: AppBar(
          title: Text(usersViewModel.selectedUser.name.toString()),
        ),
        body: SingleChildScrollView(
          padding: const EdgeInsets.all(20.0),
          keyboardDismissBehavior: ScrollViewKeyboardDismissBehavior.onDrag,
          child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                AppTitle(text: usersViewModel.selectedUser.name.toString()),
                Text(usersViewModel.selectedUser.email.toString()),
                Form(
                  key: _formKey,
                  child: Column(
                    children: [formWidget_1(), formWidget_2(), button()],
                  ),
                ),
              ]),
        ),
      ),
    );
  }

  // shrinkWrap: true,
  // keyboardDismissBehavior: ScrollViewKeyboardDismissBehavior.onDrag,
  Widget keyboard(Widget child) {
    return GestureDetector(
      onTap: () => FocusManager.instance.primaryFocus?.unfocus(),
      child: child,
    );
  }

  Widget button() {
    return FloatingActionButton(
      onPressed: () {
        if (_formKey.currentState!.validate()) {
          showDialog(
            context: context,
            builder: (context) {
              return AlertDialog(
                  content: Text("${controller_1.text} ${controller_2.text}"));
            },
          );
        }
      },
      tooltip: 'Show me the value!',
      child: const Icon(Icons.text_fields),
    );
  }

  Widget formWidget_1() {
    return TextFormField(
      controller: controller_1,
      autofocus: true,
      keyboardType: TextInputType.name,
      textCapitalization: TextCapitalization.characters,
      textInputAction: TextInputAction.next,
      validator: (value) {
        if (value == null || value.isEmpty) {
          return 'Please enter some text';
        }
        return null;
      },
      decoration: const InputDecoration(
        border: UnderlineInputBorder(),
        labelText: 'Enter your username',
      ),
    );
  }

  Widget formWidget_2() {
    return TextFormField(
      controller: controller_2,
      keyboardType: TextInputType.number,
      // textCapitalization: TextCapitalization.characters,
      // textInputAction: TextInputAction.go,
      validator: (value) {
        if (value == null || value.isEmpty) {
          return 'Please enter some text';
        }
        return null;
      },
      decoration: const InputDecoration(
        border: OutlineInputBorder(),
        labelText: 'Enter your username',
      ),
    );
  }
}
