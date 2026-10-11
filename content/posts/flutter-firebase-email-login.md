---
title: "Flutter Firebase Login: Email & Password in 10 Minutes"
description: Connect your Flutter app to Firebase Authentication: setup with FlutterFire, sign up, sign in, sign out, and keeping users logged in.
date: 2026-10-10
tags: Flutter, Firebase, Authentication
---

A login screen only looks good until someone actually tries to log in. In this guide we connect a Flutter app to **Firebase Authentication** with email and password. It's the same setup I use in client apps.

## 1. Create a Firebase project

1. Go to the [Firebase console](https://console.firebase.google.com) and create a project.
2. Open **Build → Authentication → Sign-in method** and enable **Email/Password**.

## 2. Connect Flutter with FlutterFire

Install the FlutterFire CLI once:

```bash
dart pub global activate flutterfire_cli
```

Then, inside your Flutter project:

```bash
flutter pub add firebase_core firebase_auth
flutterfire configure
```

`flutterfire configure` creates `lib/firebase_options.dart` for every platform you choose. Now start Firebase in `main.dart`:

```dart
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'firebase_options.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  runApp(const MyApp());
}
```

## 3. A small AuthService

Keeping Firebase calls in one class keeps your screens clean:

```dart
import 'package:firebase_auth/firebase_auth.dart';

class AuthService {
  final _auth = FirebaseAuth.instance;

  Stream<User?> get userChanges => _auth.authStateChanges();

  Future<void> signUp(String email, String password) {
    return _auth.createUserWithEmailAndPassword(
      email: email,
      password: password,
    );
  }

  Future<void> signIn(String email, String password) {
    return _auth.signInWithEmailAndPassword(
      email: email,
      password: password,
    );
  }

  Future<void> signOut() => _auth.signOut();
}
```

## 4. Show friendly error messages

Firebase throws a `FirebaseAuthException` with a `code`. Turn those codes into messages your users understand:

```dart
String authMessage(FirebaseAuthException e) {
  switch (e.code) {
    case 'invalid-email':
      return 'That email address looks wrong.';
    case 'invalid-credential':
    case 'wrong-password':
    case 'user-not-found':
      return 'Email or password is incorrect.';
    case 'email-already-in-use':
      return 'An account already exists for that email.';
    case 'weak-password':
      return 'Please choose a stronger password.';
    default:
      return 'Something went wrong. Please try again.';
  }
}
```

> Newer Firebase projects return `invalid-credential` instead of `wrong-password` / `user-not-found` (a security setting called email enumeration protection), so handle all three.

Use it in your login button:

```dart
try {
  await AuthService().signIn(_email.text.trim(), _password.text);
} on FirebaseAuthException catch (e) {
  if (!mounted) return;
  ScaffoldMessenger.of(context).showSnackBar(
    SnackBar(content: Text(authMessage(e))),
  );
}
```

## 5. Keep users logged in

Firebase remembers the signed-in user. Listen to `authStateChanges()` and choose the first screen automatically:

```dart
class AuthGate extends StatelessWidget {
  const AuthGate({super.key});

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<User?>(
      stream: AuthService().userChanges,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Scaffold(
            body: Center(child: CircularProgressIndicator()),
          );
        }
        return snapshot.hasData ? const HomeScreen() : const LoginScreen();
      },
    );
  }
}
```

Set `home: const AuthGate()` in your `MaterialApp`, and you're done: users who already signed in go straight to the home screen.

## Wrap-up

You now have real sign up, sign in, sign out and auto-login. Pair it with the UI from [How to Build a Beautiful Login Screen in Flutter](/blog/flutter-login-screen-ui/) and you have a production-ready auth flow.

Need Firebase set up in your own app? I offer a fixed-price [Firebase Setup](/shop/) service.
