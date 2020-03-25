import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { Block, Text, theme, Button } from 'galio-framework';
import * as Facebook from 'expo-facebook';
import {  Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Profile } from './Profile'

import { CommonActions } from '@react-navigation/native';


export default class SignIn extends React.Component {
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
        const json = await (response.json())
        const email = json.email
        const name = json.name
        //despues del sign in, navega directo al screen de perfil
        /*this.props.navigation.navigate({
          name: 'Profile',
          params: {
            nombre: name,
            correo: email,
          }
        });*/
        this.props.navigation.dispatch(
          CommonActions.navigate({
            name: 'Profile',
            params: {
              nombre: name,
            },
          })
        );
      } else {
      }
    } catch ({ message }) {
      console.log(`Facebook Login Error: ${message}`);
    }
  }
  
  renderText = () => {
    return (
      <Block style={styles.group}>
        <Text h3>Inicia sesión</Text>
      </Block>
    )
  }
  
  renderInputs = () => {
    return (
      <Block style={styles.content}>
          <Input
            leftIcon={
              <Icon
                name="envelope"
                color="#444"
                size={20}
              />
            }
            inputStyle={styles.input}
            inputContainerStyle={styles.containetInput}
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
            inputContainerStyle={styles.containetInput}
            inputStyle={styles.input}
            keyboardAppearance="light"
            autoFocus={false}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            returnKeyType="next"
            placeholder={'Contraseña'}
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
        size="small"
        icon="facebook"
        iconFamily="font-awesome"
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
        round
        uppercase
        size="small"
        color="success"
        style={[{width: "auto", paddingHorizontal: 20}, styles.shadow]}
      >
        Iniciar sesión
      </Button>
    )
  }
  
  render() {
    const { navigation } = this.props;

    return (
      <Block flex style={styles.components}>
          {this.renderText()}
          {this.renderInputs()}

          <Block style={{marginVertical: 20, flex: 1/3, flexDirection: "row",  alignItems: "center"}}>
            {this.renderCrearBtn()}
            <Text h5>o</Text>
            {this.renderFbBtn()}
          </Block>
          <Block style={{marginVertical: 80, display: "flex", flexDirection: "column",  alignItems: "center"}}>
            <Text  style={styles.link} onPress={() => navigation.navigate('Sign Up')}>¿Olvidaste tu contraseña?</Text>

            <Text  style={[styles.link, {marginTop: 20}]} onPress={() => navigation.navigate('Sign Up')}>Crear una cuenta</Text>
          </Block>
          
        
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  components: {
    backgroundColor: "white",
    paddingHorizontal: theme.SIZES.BASE * 2
  },
  inputs: {
    display: "flex",
    flexDirection: "column",
  },
  group: {
    marginTop: theme.SIZES.BASE * 3,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    marginTop: 60
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 2,
  },
  social: {
    width: theme.SIZES.BASE * 10,
    height: theme.SIZES.BASE * 3,
    justifyContent: 'center',
  },
  containetInput: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15
  },
  input: {
    color: "#111",
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 2,
  },
  link: {
    color: "#1E90FF", 
    fontSize: 16
  }
});
