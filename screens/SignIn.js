import React from 'react';
import {
  StyleSheet,
  Image,
} from 'react-native';
import { Block, Text, theme, Button } from 'galio-framework';
import * as Facebook from 'expo-facebook';
import {  Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as TrackWorker from '../TrackWorker';
import { showMessage } from "react-native-flash-message";


export default class SignIn extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      isEmailValid: true,
      isPasswordValid: true,
    }
  }

  checkUser = async (email, password) => {
    const user = await TrackWorker.getUserInfo(email, password);
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
        const image = userInfo.picture.data.url;
        const password = " ";
        const user = await this.checkUser(email,password)
        if (user) {
          global.isLogged = true;
          global.nameLogged = name;
          global.emailLogged = email;
          global.imageLogged =  image;
          global.password = password;
          global.IdLogged = user.id;
          global.user_orders = {};
          navigation.navigate(
            'App',
            { name, email },
          );
        } else {
          showMessage({
            message: "Correo electrónico o contraseña incorrectos",
            type: "danger",
            icon: "danger"
          });
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
  
  renderImage = () => {
    return (
      <Block style={styles.group}>
        <Image
          source={require('../assets/images/trackeat.png')}
          style={{ height: 150, width: 210, bottom: 20 }} />
      </Block>
    )
  }

  renderText = () => {
    return (
      <Block style={styles.group}>
        <Text h3>Inicia sesión</Text>
      </Block>
    )
  }

  validateEmail = (email) => {
    if(email === "" || typeof(email) === "undefined"){ 
      this.setState({isEmailValid: false});
    }
  }

  validatePassword = (password) => { 
    if(password === "" || typeof(password) === "undefined"){
      this.setState({isPasswordValid: false});
    }
  }
  
  onLogin = async () => {
    //se realiza la llamada al api del método login 
    //si respuesta fue true que haga el login de lo contrario que muestre el mensaje del api
    const {navigation} = this.props
    const {email, password} = this.state
    this.validateEmail(email);
    this.validatePassword(password);
    const {isEmailValid, isPasswordValid} = this.state
    console.log(isEmailValid, isPasswordValid)
    if(isEmailValid && isPasswordValid) {
      const user = await TrackWorker.getUserInfo(email, password);
      if(user) {
       const name = user.nombre;
        const email = user.email;
        const id = user.id;
        const image = user.image;
        global.isLogged = true;
        global.nameLogged = name;
        global.emailLogged = email;
        global.imageLogged =  image;
        global.password = password;
        global.IdLogged = id;
        navigation.navigate(
          'App',
          { name, email },
        ); 
        this.setState({
          email: "",
          password: "",
          isEmailValid: true,
          isPasswordValid: true
        });
      } else {
        showMessage({
          message: "Correo electrónico o contraseña incorrectos",
          type: "danger",
          icon: "danger"
        });
        this.setState({
          email: "",
          password: "",
          isEmailValid: true,
          isPasswordValid: true
        });
      }
      
    }
  }


  renderInputs = () => {
    const {email, password, isEmailValid, isPasswordValid} = this.state
    return (
      <Block style={styles.content, {top: 10}}>
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

          <Block style={{marginTop: 20}}>
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
        iconSize={theme.SIZES.BASE * 2.2}
        color={theme.COLORS.FACEBOOK}
        style={[styles.social, styles.shadow, {margin: 20}]}
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
        onPress={this.onLogin}
      >
        Iniciar sesión
      </Button>
    )
  }
  
  render() {
    const { navigation } = this.props;

    return (
      <Block flex style={styles.components}>
        <Block flex >
        {this.renderImage()}
          {this.renderText()}

          <Block flex style={styles.inputs}>
            {this.renderInputs()}

              <Block style={{marginVertical: 30, display: "inline-block", justifyContent: "space-around", alignItems: "center", padding: 10}}>
                {this.renderCrearBtn()}
                {this.renderFbBtn()}
              </Block>

              <Block style={{marginVertical: 40, bottom:70, display: "flex", flexDirection: "column",  alignItems: "center"}}>
                <Text  style={styles.link} onPress={() => navigation.navigate('Sign Up')}>¿Olvidaste tu contraseña?</Text>
                <Text  style={[styles.link, {marginTop: 20}]} onPress={() => navigation.navigate('Sign Up')}>Crear una cuenta nueva</Text>
              </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  components: {
    paddingHorizontal: theme.SIZES.BASE * 1.2,
    paddingVertical: theme.SIZES.BASE * 6,
    backgroundColor: "#f7f7f7",
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
  },
  inputs: {
    display: "flex",
    flexDirection: "column",
  },
  group: {
    bottom: 20,
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
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    justifyContent: 'center',
  },
  containetInput: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15
  },
  input: {
    color: "black",
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 2,
  },
  link: {
    color: "#1E90FF", 
    fontSize: 16
  }
});
