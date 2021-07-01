import 'package:flutter/material.dart';

class CustomTextField extends StatelessWidget {
  final String? hintText;
  final TextEditingController? controller;
  final IconData? icon;
  final bool hideText;

  CustomTextField({
    this.hintText,
    this.controller,
    this.icon,
    this.hideText = false,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(
        vertical: 12.5,
        horizontal: 20,
      ),
      child: TextFormField(
        decoration: InputDecoration(
          icon: Icon(icon),
          hintText: hintText,
        ),
        style: TextStyle(),
      ),
    );
  }
}
