import React from 'react';
import {
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Block, Text, theme, Button} from 'galio-framework';
import * as Facebook from 'expo-facebook';
import Icon from 'react-native-vector-icons/FontAwesome';
import {  Input } from 'react-native-elements';
import * as TrackWorker from '../TrackWorker';
import { showMessage } from "react-native-flash-message";


const { width } = Dimensions.get('screen');

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
    const user = TrackWorker.createAcount(email, password, name, image);
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
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=email,name`);
        const userInfo = await response.json()
        const email = userInfo.email;
        const name = userInfo.name;
        const password = " ";
        const image = "default"
        const user = this.checkUser(email, password, image, name);
        console.log(user)
        if(user){
          navigation.navigate(
            'Profile',
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
      const user = await TrackWorker.createAcount(email, password, name, image);
      const email = user.email;
      const name = user.name;
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
          'Profile',
          { name, email },
        );
      } else {
        console.log("segui mañana")
      }
    } 

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
      <Block style={styles.content}>
          <Input
            leftIcon={
              <Icon
                name="user"
                color="#444"
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

          <Block style={{marginTop: 20}}>
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

          <Block style={{marginTop: 20}}>
            <Input
              leftIcon={
                <Icon
                  name="lock"
                  color="#444"
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

          <Block style={{marginTop: 20}}>
            <Input
              leftIcon={
                <Icon
                  name="lock"
                  color="#444"
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
        onPress = {this.createAccount}
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

            <Block style={{marginVertical: "2%", display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
              {this.renderCrearBtn()}
              <Text h5>o</Text>
              {this.renderFbBtn()}
            </Block>
            <Block style={{margin: "5%", display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
              <Text style={styles.link} onPress={() => navigation.navigate('Sign In')}>Ya tengo cuenta</Text>
            </Block>
          </Block>
          
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  components: {
    backgroundColor: "white",
    paddingHorizontal: theme.SIZES.BASE * 1.2
  },
  signup: {
    backgroundColor: "white",
    marginHorizontal: 10,
    borderRadius: 20,
    marginTop: 10,
    paddingHorizontal: 5,
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
    marginTop: 40
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 2,
  },
  containetInput: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15
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
    color: "#1E90FF",
    fontSize: 16
  }
});
