import 'package:flutter/material.dart';

class CustomTextField extends StatefulWidget {
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
  _CustomTextFieldState createState() => _CustomTextFieldState();
}

class _CustomTextFieldState extends State<CustomTextField> {
  final focusNode = FocusNode();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(
        vertical: 12.5,
        horizontal: 20,
      ),
      child: TextFormField(
        focusNode: focusNode,
        decoration: InputDecoration(
          icon: Icon(
            widget.icon,
            color: focusNode.hasFocus
                ? Theme.of(context).colorScheme.primary
                : Colors.white24,
          ),
          hintText: widget.hintText,
          hintStyle: TextStyle(
            color: Colors.white24,
          ),
          focusColor: Colors.white,
          enabledBorder: UnderlineInputBorder(
            borderSide: BorderSide(
              color: Colors.white24,
            ),
          ),
        ),
        style: TextStyle(),
      ),
    );
  }
}
