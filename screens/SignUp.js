import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Block, Text,  theme, Button } from 'galio-framework';
import * as Facebook from 'expo-facebook';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import { materialTheme } from '../constants/';

const { width } = Dimensions.get('screen');

export default class SignUp extends React.Component {

  onFBLogin = async () => {
    try {
      await Facebook.initializeAsync('252387635776823');
      const {
        type,
        token
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=email,name`);
        console.log('Logged in!', `Hi ${(await response.json()).name}!`);
      } else {
      }
    } catch ({ message }) {
      console.log(`Facebook Login Error: ${message}`);
    }
  }

  renderText = () => {
    return (
      <Block flex style={styles.group}>
        <Text h3>
          Sign up
        </Text>
      </Block>
    )
  }

  renderInputs = () => {
    return (
      <Block style={styles.content}>
        <Input
          leftIcon={
            <Icon
              name="user"
              color="#444"
              size={25}
            />
          }
          inputStyle={styles.input}
          keyboardAppearance="light"
          autoFocus={false}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          returnKeyType="next"
          placeholder={'Nombre'}
        />

        <Input
          leftIcon={
            <Icon
              name="envelope"
              color="#444"
              size={20}
            />
          }
          inputStyle={styles.input}
          keyboardAppearance="light"
          autoFocus={false}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          returnKeyType="next"
          placeholder={'Correo electrónico'}
        />

        <Input
          leftIcon={
            <Icon
              name="lock"
              color="#444"
              size={30}
            />
          }
          blurOnSubmit={true}
          inputStyle={styles.input}
          keyboardAppearance="light"
          autoFocus={false}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          returnKeyType="next"
          placeholder={'Contraseña'}
        />

        <Input
          leftIcon={
            <Icon
              name="lock"
              color="#444"
              size={30}
            />
          }
          blurOnSubmit={true}
          inputStyle={styles.input}
          keyboardAppearance="light"
          autoFocus={false}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          returnKeyType="next"
          placeholder={'Confirmar contraseña'}
        />
      </Block>
    )
  }

  renderFbBtn = () => {
    return (
      <Button
        round
        onlyIcon
        shadowless
        icon="facebook"
        iconFamily="font-awesome"
        size="small"
        iconColor={theme.COLORS.WHITE}
        iconSize={theme.SIZES.BASE * 1.45}
        color={theme.COLORS.FACEBOOK}
        style={[styles.social, styles.shadow]}
        onPress={this.onFBLogin}
      />
    )
  }

  renderCrearBtn = () => {
    return (
      <Button
        size="small"
        round
        uppercase
        color="success"
        style={[{width: "auto", paddingHorizontal: "8%"}, styles.shadow]}
      >
        Crear cuenta
      </Button>
    )
  }

  render() {
    const { navigation } = this.props;

    return (
      <Block flex style={styles.components}>
        <Block flex style={styles.signup}>
          {this.renderText()}
          <Block flex style={styles.inputs}>
            {this.renderInputs()}

            <Block style={{margin: "5%", display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
              {this.renderCrearBtn()}
              <Text h5>o</Text>
              {this.renderFbBtn()}
            </Block>
            <Block style={{margin: "5%", display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
              <Text h6 style={styles.link} onPress={() => navigation.navigate('Sign In')}>Ya tengo cuenta</Text>
            </Block>
          </Block>
          
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  components: {
    backgroundColor: "#46494C",
    paddingHorizontal: theme.SIZES.BASE * 1.2
  },
  signup: {
    backgroundColor: "white",
    marginVertical: "40%",
    marginHorizontal: "10%",
    borderRadius: 20,
    paddingHorizontal: "5%"
  },
  inputs: {
    display: "flex",
    flexDirection: "column",
  },
  group: {
    paddingTop: theme.SIZES.BASE * 1.75,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 2,
  },
  social: {
    width: theme.SIZES.BASE * 3,
    height: theme.SIZES.BASE * 3,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
  },
  input: {
    color: "#111",
    borderColor: "#9B9B9B",
    height: 40,
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 2,
    paddingHorizontal: 10,
    // paddingTop: 15,
    paddingBottom: 8,
    flex: 1,
  },
  link: {
    textDecorationLine: "underline",
    color: "#1E90FF"
  }
});
