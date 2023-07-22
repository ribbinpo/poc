import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class AppError extends StatelessWidget {
  final String errorText;
  const AppError({super.key, required this.errorText});

  @override
  Widget build(BuildContext context) {
    return Visibility(
      visible: null!=errorText && errorText.isNotEmpty,
      child: Container(
        padding: const EdgeInsets.all(20),
        child: Text(
          errorText,
          style: const TextStyle(color: Colors.red, fontSize: 18),
        ),
      ),
    );
  }
}
