---
title: How to Build a Beautiful Login Screen in Flutter
description: A step-by-step guide to a clean, modern login UI in Flutter with form validation, a password show/hide toggle and a gradient button.
date: 2026-10-11
tags: Flutter, UI, Login
---

Login screens are the most popular videos on my channel, and for good reason: it's the **first screen** your users see. A clean login screen makes the whole app feel trustworthy.

In this guide we'll build one step by step:

- A welcome header
- Email and password fields with **validation**
- A **show/hide password** button
- A gradient "Sign in" button with a loading state

## 1. Start with a StatefulWidget

We need state for two things: hiding the password and showing a loading spinner.

```dart
import 'package:flutter/material.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _email = TextEditingController();
  final _password = TextEditingController();
  bool _hidePassword = true;
  bool _loading = false;

  @override
  void dispose() {
    _email.dispose();
    _password.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const SizedBox(height: 40),
                _header(),
                const SizedBox(height: 32),
                _emailField(),
                const SizedBox(height: 16),
                _passwordField(),
                const SizedBox(height: 28),
                _signInButton(),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
```

> **Tip:** always wrap forms in `SingleChildScrollView`, otherwise the keyboard will cover your fields on small phones.

## 2. The header

```dart
Widget _header() {
  return Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: const [
      Text(
        'Welcome back 👋',
        style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
      ),
      SizedBox(height: 8),
      Text(
        'Sign in to continue',
        style: TextStyle(fontSize: 16, color: Colors.grey),
      ),
    ],
  );
}
```

## 3. Email and password fields with validation

A shared `InputDecoration` keeps both fields consistent:

```dart
InputDecoration _input(String hint, IconData icon) {
  return InputDecoration(
    hintText: hint,
    prefixIcon: Icon(icon),
    filled: true,
    fillColor: Colors.grey.shade100,
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(14),
      borderSide: BorderSide.none,
    ),
  );
}

Widget _emailField() {
  return TextFormField(
    controller: _email,
    keyboardType: TextInputType.emailAddress,
    decoration: _input('Email', Icons.email_outlined),
    validator: (value) {
      if (value == null || !value.contains('@')) {
        return 'Enter a valid email';
      }
      return null;
    },
  );
}

Widget _passwordField() {
  return TextFormField(
    controller: _password,
    obscureText: _hidePassword,
    decoration: _input('Password', Icons.lock_outline).copyWith(
      suffixIcon: IconButton(
        icon: Icon(_hidePassword ? Icons.visibility_off : Icons.visibility),
        onPressed: () => setState(() => _hidePassword = !_hidePassword),
      ),
    ),
    validator: (value) =>
        (value == null || value.length < 6) ? 'At least 6 characters' : null,
  );
}
```

## 4. A gradient button with a loading state

Flutter's `ElevatedButton` doesn't take a gradient directly, so we draw it with a `DecoratedBox` and make the button transparent:

```dart
Widget _signInButton() {
  return SizedBox(
    width: double.infinity,
    height: 54,
    child: DecoratedBox(
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0xFF1E6BFF), Color(0xFF3FB6FF)],
        ),
        borderRadius: BorderRadius.circular(14),
      ),
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          backgroundColor: Colors.transparent,
          shadowColor: Colors.transparent,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(14),
          ),
        ),
        onPressed: _loading ? null : _submit,
        child: _loading
            ? const SizedBox(
                width: 22,
                height: 22,
                child: CircularProgressIndicator(
                  strokeWidth: 2.5,
                  color: Colors.white,
                ),
              )
            : const Text(
                'Sign In',
                style: TextStyle(fontSize: 16, color: Colors.white),
              ),
      ),
    ),
  );
}

Future<void> _submit() async {
  if (!_formKey.currentState!.validate()) return;
  setState(() => _loading = true);
  await Future.delayed(const Duration(seconds: 2)); // call your API here
  if (mounted) setState(() => _loading = false);
}
```

## What's next?

You now have a login screen that validates input, hides the password and shows a loading state. To make it real, connect `_submit()` to Firebase Authentication. I explain that in [Flutter Firebase Email & Password Login](/blog/flutter-firebase-email-login/).

Want to see it built in seconds? Check out my [Flutter UI videos](/videos/).
