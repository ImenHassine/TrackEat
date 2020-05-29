import React from 'react';
import {
  StyleSheet,
  View, 
  Image
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Block, Text, theme, Button} from 'galio-framework';
import * as Facebook from 'expo-facebook';
import Icon from 'react-native-vector-icons/FontAwesome';
import {  Input } from 'react-native-elements';
import * as TrackWorker from '../TrackWorker';
import { showMessage } from "react-native-flash-message";
import { FontAwesome } from '@expo/vector-icons';




export default class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      name: "",
      image: "default",
      confirmPassword: "",
      isPasswordValid: true,
      isEmailValid: true,
      isConfirmationPasswordValid: true
    }
  }

  validateInputs = (email, password, confirmPassword) => {
    if(email === "" || typeof(email) === "undefined"){ 
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      this.setState({isEmailValid: re.test(email)});
    }

    if(password === "" || typeof(password) === "undefined" || password.length < 0){
      this.setState({isPasswordValid: false});
    }

    if(confirmPassword === "" || typeof(confirmPassword) === "undefined" || confirmPassword != password){
      this.setState({isConfirmationPasswordValid: false});
    }
  }


  checkUser = async (email, password, image, name) => {
    const user = await TrackWorker.createAccount(email, password, image, name);
    return user;
  }

  onFBLogin = async () => {
    const {navigation} = this.props;
    try {
      await Facebook.initializeAsync('252387635776823');
      const {
        type,
        token
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=email,name,picture.type(normal)`);
        const userInfo = await response.json()
        const email = userInfo.email;
        const name = userInfo.name;
        const password = " ";
        const image = encodeURIComponent(userInfo.picture.data.url);
        const user = await this.checkUser(email, password, image, name);
        // const id = user.id
        if(user){
          global.isLogged = true;
          global.nameLogged = name;
          global.emailLogged = email;
          global.imageLogged =  userInfo.picture.data.url;
          global.password = password;
          global.IdLogged = user.id;
          global.user_orders = {};
          navigation.navigate(
            'App',
            { name, email },
          );
        } else {
          console.log("error");
        }
      } else {
      }
    } catch ({ message }) {
      showMessage({
        message: `Facebook Login Error: ${message}`,
        type: "danger",
        icon: "danger"
      });
    }
  }


  createAccount = async () => {
    const {navigation} = this.props;
    const {email, password, confirmPassword, image, name} = this.state;
    this.validateInputs(email, password, confirmPassword);
    const {isEmailValid, isPasswordValid, isConfirmationPasswordValid} = this.state

    if(isEmailValid && isPasswordValid && isConfirmationPasswordValid) {
      const user = await TrackWorker.createAccount(email, password, image, name);
      const userEmail = user.email;
      const userName = user.name;
      if(user){
        this.setState({
          email: "",
          password: "",
          image: "defaut",
          name: "",
          isEmailValid: true,
          isPasswordValid: true,
          isConfirmationPasswordValid: true
        });
        navigation.navigate(
          'Sign In',
          { userName, userEmail },
        );
      } else {
        console.log("segui mañana")
      }
    } 
  }

  renderImage = () => {
    return (
      <Block style={styles.group}>
        <Image
          source={require('../assets/images/trackeat.png')}
          style={{ height: 150, width: 210, bottom: 15 }} />
      </Block>
    )
  }

  renderText = () => {
    return (
      <Block style={styles.group}>
        <Text h3>
          Regístrate
        </Text>
      </Block>
    )
  }

  renderInputs = () => {
    const {name, email, password, confirmPassword, isEmailValid, isConfirmationPasswordValid, isPasswordValid} = this.state
    return (
      <Block style={styles.content, {bottom: 15}}>
          <Input
            leftIcon={
              <Icon
                name="user"
                color="#000"
                size={20}
              />
            }
            inputStyle={styles.input}
            inputContainerStyle={styles.containetInput}
            keyboardAppearance="light"
            autoFocus={false}
            autoCapitalize="none"
            value={name}
            autoCorrect={false}
            returnKeyType="next"
            placeholder={'Nombre'}
            onChangeText={name => this.setState({name})}
            maxLength={32}
          />

          <Block style={{marginTop: 10}}>
            <Input
              leftIcon={
                <Icon
                  name="envelope"
                  color="#000"
                  size={20}
                />
              }
              inputStyle={styles.input}
              inputContainerStyle={styles.containetInput}
              keyboardAppearance="light"
              autoFocus={false}
              autoCapitalize="none"
              value={email}
              autoCorrect={false}
              keyboardType="email-address"
              returnKeyType="next"
              placeholder={'Correo electrónico'}
              errorMessage={
                isEmailValid ? null : 'Ingresa un correo electronico'
              }
              onChangeText={email => this.setState({email})}
            />
          </Block>

          <Block style={{marginTop: 10}}>
            <Input
              leftIcon={
                <Icon
                  name="lock"
                  color="#000"
                  size={30}
                />
              }
              blurOnSubmit={true}
              secureTextEntry={true}
              inputContainerStyle={styles.containetInput}
              inputStyle={styles.input}
              keyboardAppearance="light"
              autoFocus={false}
              value={password}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              placeholder={'Contraseña'}
              onChangeText={password => this.setState({password})}
              errorMessage={
                isPasswordValid ? null : 'Ingresa una contraseña'
              }
             
            />
          </Block>

          <Block style={{marginTop: 10}}>
            <Input
              leftIcon={
                <Icon
                  name="lock"
                  color="#000"
                  size={30}
                />
              }
              blurOnSubmit={true}
              secureTextEntry={true}
              inputContainerStyle={styles.containetInput}
              inputStyle={styles.input}
              keyboardAppearance="light"
              autoFocus={false}
              value={confirmPassword}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              placeholder={'Confirmar Contraseña'}
              onChangeText={confirmPassword => this.setState({confirmPassword})}
              errorMessage={
                isConfirmationPasswordValid ? null : 'Ingresa una contraseña'
              }
             
            />
          </Block>
      </Block>
    )
  }

  renderFbBtn = () => {
    return (
      <FontAwesome.Button name="facebook" backgroundColor="#3b5998"  onPress={this.onFBLogin} style={styles.social}>
        Crear Cuenta con Facebook
      </FontAwesome.Button>
    )
  }

  renderCrearBtn = () => {
    return (
      <Button
        color="success"
        style={styles.shadow}
        onPress={this.createAccount}
      >
        Crear Cuenta
      </Button>
    )
  }

  render() {
    const { navigation } = this.props;

    return (
      <KeyboardAwareScrollView enableOnAndroid extraHeight = {50} style={styles.components}>
        <View>
          {this.renderImage()}
          {this.renderText()}

          <Block flex style={styles.inputs}>
            {this.renderInputs()}

            <Block style={{marginTop: "10%"}}>
              <Block style={{marginVertical: 30,  padding: 10, bottom: 70}}>
                {this.renderCrearBtn()}
                {this.renderFbBtn()}
              </Block>

              <Block style={{marginTop: 15, display: "flex", flexDirection: "column",  alignItems: "center", bottom: 120}}>
                <Text style={styles.link} onPress={() => navigation.navigate('Sign In')}>Ya tengo cuenta</Text>
              </Block>
            </Block>              
          </Block>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  components: {
    backgroundColor: "#f7f7f7",
    paddingHorizontal: theme.SIZES.BASE * 1.2,
    paddingVertical: theme.SIZES.BASE * 5,
  
  },
  inputs: {
    display: "flex",
    flexDirection: "column",
    marginTop: 30,
  },
  group: {
    marginTop: 13,
    flexDirection: "row",
    justifyContent: "center",
  },
  content: {
    marginTop: 40
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 2,
    marginBottom: 20,
    width: "auto",
    borderRadius: 5
  },
  containetInput: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15
  },
  social: {
    borderRadius: 20,
    justifyContent: 'center',
    paddingVertical: 11
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
    color: "#1E90FF",
    fontSize: 16,
    marginTop: 10
  }
});
