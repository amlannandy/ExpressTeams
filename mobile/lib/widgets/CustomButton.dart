import 'package:flutter/material.dart';

class CustomButton extends StatelessWidget {
  final String text;
  final Function onPressed;
  final String type;
  final bool isDisabled;

  CustomButton(this.text, this.onPressed,
      {this.type = 'primary', this.isDisabled = false});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 15),
      child: ElevatedButton(
        onPressed: () => onPressed(),
        child: Text(text.toUpperCase()),
      ),
    );
  }
}
