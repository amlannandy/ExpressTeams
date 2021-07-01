import 'package:express_teams/services/Router.dart';
import 'package:express_teams/widgets/CustomButton.dart';
import 'package:express_teams/widgets/CustomTextField.dart';
import 'package:flutter/material.dart';
import 'package:line_icons/line_icons.dart';

class LoginScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Icon(
              LineIcons.user,
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                CustomTextField(
                  icon: LineIcons.envelope,
                  hintText: 'Enter email',
                ),
                CustomTextField(
                  icon: LineIcons.lock,
                ),
                CustomButton('Login', () => _login()),
              ],
            ),
            Column(
              children: [
                Text('DONT\'T HAVE AN ACCOUNT?'),
                GestureDetector(
                  onTap: () => _goToRegister(context),
                  child: Text('Sign up'),
                )
              ],
            ),
          ],
        ),
      ),
    );
  }

  void _login() {
    print('Test login');
  }

  void _goToRegister(BuildContext context) {
    Application.router.navigateTo(context, '/register');
  }
}
