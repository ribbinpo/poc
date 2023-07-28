import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_mvvm_riverpod/users_list/views/home_screen.dart';
import 'package:connectivity_plus/connectivity_plus.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  late StreamSubscription subscription;
  @override
  void initState() {
    super.initState();

    subscription = Connectivity().onConnectivityChanged.listen(_showConnectivitySnackBar);


    Timer(const Duration(seconds: 3), () {
      Navigator.pushReplacement(
          context, MaterialPageRoute(builder: (context) => const HomeScreen()));
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
          color: Colors.blue,
          child: const Center(
            child: Text(
              'Flutter MVVM',
              style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.w700,
                  color: Colors.white),
            ),
          )),
    );
  }

  void _showConnectivitySnackBar(ConnectivityResult result) {
    final hasInternet = result != ConnectivityResult.none;

    final message = hasInternet
      ? result == ConnectivityResult.mobile 
        ? 'You are connected to Mobile Network'
        : 'You are connected to Wifi Network'
      : 'You have no internet';
    final color = hasInternet ? Colors.green : Colors.red;
    print(message);
  } 
}
