import React, { useState } from 'react'
  import * as TrackWorker from '../TrackWorker';

  import {
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Image,
    ImageBackground,
    Dimensions,
    View,
    TextInput,
    Button
  } from 'react-native';
  import {Accordion, Block, Text, theme, Card } from 'galio-framework';
  const { width } = Dimensions.get('screen');
  import { materialTheme, products, Images } from '../constants/';

  const thumbMeasure = (width - 48 - 32) / 3;



  function Confirm(props){

    const [codigo, setCodigo] = useState('')
    //const { codigoqr } = route.params;
    /*console.log("route")
    console.log(route)
    console.log("Props")
    console.log(route.props)
    console.log("Params")
    console.log(route.params)
    console.log("Param codigos")
    console.log(route.params.codigoqr)
    console.log("Params json")
    console.log(route.params["itemId"])
    console.log("El codigo del QR ES")
    //console.log(codigoqr);

*/
    const _handlePress = async () => {
      console.log("Entra al boton")
      const {navigation} = props 

      console.log("El codigo de la orden es")
      console.log(codigo);
      await TrackWorker.joinUserOrder(parseInt(codigo),global.IdLogged);
      navigation.navigate('Tracking de Órdenes');
      console.log("El id del usuario es")
      console.log(global.IdLogged)

  }
  const renderText = () => {
    return (
      <Block flex style={styles.group}>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>

          <Text h4 style={{marginBottom: theme.SIZES.BASE / 2,   textAlign: "center", fontWeight: 'bold', color: 'black', fontFamily:"Avenir"}}>Confirma tu pedido</Text>

        </Block>
      </Block>
      )
    }

  const renderInputs = () => {
    return (
        <Block flex center style={styles.group}>
          <TextInput 
            style = {styles.input}
            placeholder="Ingresa tu Codigo"
            onChangeText={(text) => setCodigo(text)}
            >
        
          </TextInput>
        </Block>
      ) 
  }
  const renderButton = () => {
    return (
      <Block flex center style={{paddingTop:25}}>
        <Button style={styles.boton}
          title="Confirmar"
          onPress={() => _handlePress()}
        />
      </Block>
    )
  }

    return (
      <Block flex center style={styles.components }>
      <ScrollView
        
        showsVerticalScrollIndicator={false}>

        {renderText()}
        {renderInputs()}
        {renderButton()}
        
        
      </ScrollView>
      
    </Block>
    );
  }
  export default Confirm;
  /*
  export default class Confirm extends React.Component {
  
    constructor(props) {
      super(props)
      this.state = {
        codigo: ""
      }
    }
    componentDidMount(){
      
      //const codigo = this.props.navigation.getParam('codigo', {});
      //console.log(codigo)
    }
    _handlePress = async () => {
      const {navigation} = this.props 
      console.log(this.state.codigo);
      await TrackWorker.joinUserOrder(parseInt(this.state.codigo),global.IdLogged);
      navigation.navigate('Tracking de Órdenes');
      
  }

    renderText = () => {
      return (
        <Block flex style={styles.group}>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>

            <Text h4 style={{marginBottom: theme.SIZES.BASE / 2,   textAlign: "center", fontWeight: 'bold', color: 'black', fontFamily:"Avenir"}}>Confirma tu pedido</Text>

          </Block>
        </Block>
      )
    }

    renderInputs = () => {
      return (
          <Block flex center style={styles.group}>
            <TextInput 
              style = {styles.input}
              placeholder="Ingresa tu Codigo"
              onChangeText={(text) => this.setState({codigo:text})}
              >
          
            </TextInput>
          </Block>
        ) 
    }
    renderButton = () => {
      return (
        <Block flex center style={{paddingTop:25}}>
          <Button style={styles.boton}
            title="Confirmar"
            onPress={() => this._handlePress()}
          />
        </Block>
      )
    }
    
    render() {
      return (
          <Block flex center style={styles.components }>
            <ScrollView
              
              showsVerticalScrollIndicator={false}>

              {this.renderText()}
              {this.renderInputs()}
              {this.renderButton()}
              
              
            </ScrollView>
            
          </Block>
      );
    }
  }*/
  const styles = StyleSheet.create({
    components: {
      //No me convence el color jaja
      //backgroundColor: "#3C787E",
      //backgroundColor: "#911F1F",
      //backgroundColor: "#9FF9D2",
      //backgroundColor: "#FFCC00",
      //backgroundColor: "#46494C",
      paddingHorizontal: theme.SIZES.BASE * 1.2
    },
    boton:{
      marginTop: 50
    },
    item: {
      justifyContent:'space-between',
      paddingHorizontal: theme.SIZES.BASE * 1.2
    },
    title: {
      paddingVertical: theme.SIZES.BASE,
      paddingHorizontal: theme.SIZES.BASE * 2,
    },
    group: {
      paddingTop: theme.SIZES.BASE * 3.75,
    },
    shadow: {
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      shadowOpacity: 0.2,
      elevation: 2,
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
    input: {
      borderBottomWidth: 1,
      borderColor: '#777',
      padding: 8,
      margin:10,
      width:200,
      fontSize:20
    },
    inputDefault: {
      borderBottomColor: materialTheme.COLORS.PLACEHOLDER,
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
    albumThumb: {
      borderRadius: 4,
      marginVertical: 4,
      alignSelf: 'center',
      width: thumbMeasure,
      height: thumbMeasure
    },
    container: {
      flex: 1,
      justifyContent:'space-between',
      alignItems: 'center',
    },
    block: {
      alignItems: 'stretch',
      justifyContent:'space-between',
    },
  });