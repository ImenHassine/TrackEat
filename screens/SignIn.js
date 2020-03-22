import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Block, Text,  theme } from 'galio-framework';
import * as Facebook from 'expo-facebook';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';



import { materialTheme } from '../constants/';

const { width } = Dimensions.get('screen');




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
        <Text h3 style={{marginBottom: theme.SIZES.BASE / 2}}>Inicia Sesión</Text>
        <Text style={{marginBottom: theme.SIZES.BASE / 2}}>Al iniciar sesión ....</Text>
      </Block>
    )
  }
  
  renderSocial = () => {
    return (
      <Block flex style={styles.group}>
        <Block >
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
       
          <Block flex >
              <Button
                type="outline"
                title="Iniciar Sesión"
                buttonStyle={{height: 45}}
                titleStyle = {{fontSize: 16}}
                buttonStyle={{marginTop: 20}}
              />
              <Button
                type="outline"
                icon = {
                  <Icon
                  name="facebook"
                  size={25}
                  color="#2089dc"
                  /> }
                title="    Iniciar Sesión con Facebook"
                buttonStyle={{height: 55}}
                onPress={this.onFBLogin}
                titleStyle = {{fontSize: 16}}
                buttonStyle={{marginTop: 20, marginBottom: 20}}
              />
          </Block>
        </Block>
      </Block>
    )
  }
  
  
  
  
  render() {
    return (
      <Block flex center style={styles.components}>
        <ScrollView
          style={styles.components}
          showsVerticalScrollIndicator={false}>
            {this.renderText()}
            {this.renderSocial()}
        </ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  components: {
    backgroundColor: "white"
  },
  title: {
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
  },
  group: {
    paddingTop: theme.SIZES.BASE * 3.75,
    backgroundColor: "white"

  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 2,
    backgroundColor: "white"

  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - (theme.SIZES.BASE * 2),
  },
  optionsText: {
    fontSize: theme.SIZES.BASE * 0.75,
    color: '#4A4A4A',
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: -0.29,
  },
  optionsButton: {
    width: 'auto',
    height: 34,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: 10,
  },
  
  inputDefault: {
    borderBottomColor: materialTheme.COLORS.PLACEHOLDER,
  },
  inputTheme: {
    borderBottomColor: materialTheme.COLORS.PRIMARY,
  },
  inputTheme: {
    borderBottomColor: materialTheme.COLORS.PRIMARY,
  },
  inputInfo: {
    borderBottomColor: materialTheme.COLORS.INFO,
  },
  inputSuccess: {
    borderBottomColor: materialTheme.COLORS.SUCCESS,
  },
  inputWarning: {
    borderBottomColor: materialTheme.COLORS.WARNING,
  },
  inputDanger: {
    borderBottomColor: materialTheme.COLORS.ERROR,
  },
  imageBlock: {
    overflow: 'hidden',
    borderRadius: 4,
  },
  rows: {
    height: theme.SIZES.BASE * 2,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
  },
  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE / 2,
    borderWidth: 0,
  },
  categoryTitle: {
    height: '100%',
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  input: {
    color: "#111",
    borderColor: "#9B9B9B",
    height: 40,
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingTop: 0,
    paddingBottom: 8,
    flex: 1,
  },
});
