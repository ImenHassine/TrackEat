import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  Image
} from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import {Card} from 'react-native-elements';
const { width } = Dimensions.get('screen');
import { materialTheme } from '../constants/';
import Constants from 'expo-constants';
import StepIndicator from 'react-native-step-indicator';
import * as TrackWorker from '../TrackWorker';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Icon from 'react-native-vector-icons/FontAwesome';


import Spinner from 'react-native-loading-spinner-overlay';
import { DataNavigation } from 'react-data-navigation';

const thumbMeasure = (width - 48 - 32) / 3;
var userId = global.IdLogged;
const labels = ["Orden Puesta", "En preparación", "En cocción", "Lista para recoger"];
const customStyles = {
  stepIndicatorSize: 45,
  currentStepIndicatorSize: 65,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 2,
  stepStrokeCurrentColor: '#4686c8',
  stepStrokeWidth: 2,
  stepStrokeFinishedColor: ' #95bee0',
  stepStrokeUnFinishedColor: '#95bee0',
  separatorFinishedColor: '#95bee0',
  separatorUnFinishedColor: '#95bee0',
  stepIndicatorFinishedColor: '#95bee0',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#4686c8',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fff',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#333',
  labelSize: 13,
  currentStepLabelColor: '#333',
}

const steps = 4
let timeOut
let deadline
let currentLenght = 0
let currentPosition = 0
let total = 0
let totalTime = 0

let hasSend0 = false
let hasSend1 = false
let hasSend2 = false
let hasSend3 = false

function TrackingOrdenes({ navigation }) {
  const [currentOrden, setCurrentOrden] = useState([])
  const [canInteract, setCanInteract] = useState(false)
  const [coccion, setCoccion] = useState(0)
  const [position, setPosition] = useState(0)
  const [hayOrden, setHayOrden] = useState(false)

  React.useEffect(
    () => navigation.addListener('focus', () =>  start()),
    []
  )

  const sendNotification = (title, body) => {
    const localNotification = { title: title, body: body };
    const schedulingOptions = {
      time: new Date().getTime() + Number(1),
    };
    Notifications.scheduleLocalNotificationAsync(
      localNotification,
      schedulingOptions,
    );
  };

  const start = async() => {
    let incoming = []
    let incoming_order_id = undefined
    try {
      incoming = DataNavigation.getData('incomingOrder')
      // console.log(incoming_order_id)
    } catch(error) {
      incoming = []
    }

    try {
      incoming_order_id = DataNavigation.getData('orderId')
    } catch(err) {
      console.log(err)
    }

    try {
      // console.log(incoming)
      if (incoming_order_id != undefined) {
        incomingOrder = await getOrderFromHistorial(incoming_order_id)
        incoming = incomingOrder

        setCurrentOrden(incoming)
        currentLenght = incoming.length
        setCanInteract(true)

        DataNavigation.setData('incomingOrder', undefined);
        DataNavigation.setData('orderId', undefined);
        setHayOrden(true)
        totalTime = getTotalTime(incoming)

        // deadline = new Date().getTime() + 60000 + (incoming.length * totalTime * 100 + 120000) + (totalTime * 3000) + 60000
        deadline = new Date().getTime() + 60000
        if (!Object.keys(global.user_orders).includes('Orden' + incoming_order_id)) {
          console.log('ORDEN AGREGADA:', incoming_order_id)
        // const interval_num = Object.keys(global.user_orders).length
          timeOut = setInterval(() => {
            increment(incoming_order_id)
          }, 1000)
        }
      } else {
        let current = []
        current = await getLastOrder();

        if (current.length > 0) {
          currentLenght = current.length
          setCurrentOrden(current)
          setCanInteract(true)
          setHayOrden(true)

          totalTime = getTotalTime(current)

          // deadline = new Date().getTime() + 60000 + (current.length * totalTime * 100 + 120000) + (totalTime * 3000) + 60000
          deadline = new Date().getTime() + 60000

          const interval_num = Object.keys(global.user_orders).length
          timeOut = setInterval(() => {
            increment(interval_num)
          }, 1000)
        } else {
          setCanInteract(true)
          setHayOrden(false)
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  const getOrderFromHistorial = async (orderId) => {
    try {
      const lastOrder = await TrackWorker.getOrderById(orderId);
      if (lastOrder != '') {
        const something = Object.keys(lastOrder.descripcion)

        const promises = something.map(async key => {
          const idP = lastOrder.descripcion[key].productid;

          const p = await TrackWorker.getProductById(idP)

          const prod = {
            producto: p.nombre,
            precio: p.precio,
            cantidad: lastOrder.descripcion[key].qty,
            tiempo: p.tiempo_coccion
          }
          return prod;
        })

        const algo = await Promise.all(promises);
        return algo;
      } else {
        return []
      }
      
    } catch(error) {
      throw new Error(error);
    } 
  }

  const getLastOrder = async () => {
    try {
      const lastOrder = await TrackWorker.getLastOrder(global.IdLogged);
      if (lastOrder != '') {
        const something = Object.keys(lastOrder.descripcion)

        const promises = something.map(async key => {
          const idP = lastOrder.descripcion[key].productid;

          const p = await TrackWorker.getProductById(idP)

          const prod = {
            producto: p.nombre,
            precio: p.precio,
            cantidad: lastOrder.descripcion[key].qty,
            tiempo: p.tiempo_coccion
          }
          return prod;
        })

        const algo = await Promise.all(promises);
        return algo;
      } else {
        return []
      }
      
    } catch(error) {
      throw new Error(error);
    }
  }

  const getTotalTime = (order) => {
    return order.reduce((tot, prod) => tot + prod.tiempo, 0);
  }

  const getTotal = () => {
    return currentOrden.reduce((tot, prod) => tot + prod.cantidad * prod.precio, 0);
  }
  
  const increment = (order_id) => {
    // const user_json_length = Object.keys(global.user_orders).length
    if(!global.user_orders.hasOwnProperty('Orden' + order_id)){
      global.user_orders['Orden' + order_id] = timeOut
    }
    const today = new Date()
    const deltaTime = deadline - today
    // console.log(global.user_orders)
    if (deltaTime >= 50000) {
      currentPosition = 0
      setPosition(0)
      if (!hasSend0) {
        sendNotification('Orden puesta', 'Tu orden ha sido puesta para su preparación.')
        hasSend0 = true
      }
    } else if (deltaTime >= 35000) {
      currentPosition = 1
      setPosition(1)
      if (!hasSend1) {
        sendNotification('En preparación', 'Tu orden se encuentra en preparación pronto sera puesta en cocción')
        
        hasSend1 = true
      }
    } else if (deltaTime >= 20000) {
      currentPosition = 2
      setPosition(2)
      if (!hasSend2) {
        sendNotification('Tu orden se esta cocinando', 'Tu orden ya se esta cocinando pronto estara lista para recoger')
        hasSend2 = true
      }
    } else {
      currentPosition = 3
      setPosition(3)
      if(!hasSend3) {
        sendNotification('Lista', 'Tu orden se encuentra lista para ser recogida')
        hasSend3 = true
      }
      console.log("Lista")
    }

    if (deltaTime < 0) {
      console.log('termine', global.user_orders['Orden' + order_id])
      clearInterval(global.user_orders['Orden' + order_id])
      currentPosition = 4
      setPosition(4)
    }
  }
      
  const renderText = () => {
    return (
      <Block>
        <Image
          source={require('../assets/images/planta-baja.jpg')}
          style={{ height: 220, bottom: 20 }}
           />
        <Text h3 style={{marginHorizontal: 20, marginBottom: 5}}>Panitos - Zona 10</Text>
        <Text style={{marginHorizontal: 25, marginBottom: 10, color: "#696969"}}>Comida Rápida - Latina</Text>
        <Text style={{marginHorizontal: 25, marginBottom: 20, color: "#696969"}}> <Icon
        name='clock-o' />  20 - 30 min</Text>

        <StepIndicator
          customStyles={customStyles}
          currentPosition={currentPosition}
          labels={labels}
          stepCount={steps}
        />
      </Block>
    )
  }
      
  const renderOrden = () => {
    return (
      <Block style={{ borderWidth: 1, borderRadius: 8, borderColor: "#DCDCDC", paddingTop: 30, paddingBottom: 30, paddingHorizontal: 10, marginHorizontal: 10, marginTop: 10 }}>

        <Text h5 style={{ marginHorizontal: 10}}> Detalles de Orden </Text>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 20,
            marginVertical: 10
          }}
        >
          <Block>
            <Block >
              { currentOrden.length > 0 ? <Block>
                {
                  currentOrden.map((product, index) => {
                    return (
                      <Block key={product + "_" + index} style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Block style={{width: '70%', wordBreak: 'break-all'}}>
                          <Text size={19} >{product.cantidad} x {product.producto}</Text>
                        </Block>
                        <Block style={{width: '30%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                          <Text size={19} >Q.</Text>
                          <Text size={19} >{Math.floor(product.precio * product.cantidad)}.00</Text>
                        </Block>
                      </Block>
                    )
                  })
                }
              </Block> : null 
            }
            
              <View style={{paddingHorizontal:0}}>
                <View style={{borderBottomColor: 'black', borderBottomWidth: 6, paddingTop:15 }}/>
              </View>
              <View style={{paddingRight: 40, paddingTop:20}}>
                <Block style={{display: 'flex', flexDirection: 'row', paddingLeft: 50, justifyContent: 'space-around' }}>
                  <Block style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <Text size={19} style={{ fontFamily:"Avenir" }}>Total</Text>
                  </Block>
                  <Block style={{ textAlign: 'right'}}>
                    {canInteract ? <Text size={19} style={{ fontFamily:"Avenir" }}>Q. {Math.floor(getTotal())}.00</Text> : null}
                  </Block>
                </Block>
              </View>
            </Block>
          </Block>
        </View>
      </Block>
    )
  }

  return (
    <Block  style={{backgroundColor:"white"}} >
      <ScrollView>
        <Spinner
          visible={!canInteract}
          textContent={'Cargando...'}
          textStyle={styles.spinnerTextStyle}
        />
        {renderText()}
        {renderOrden()}
      </ScrollView>
    </Block>
  );
}

export default TrackingOrdenes;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: 'white',
      padding: 8,
    },
    spinnerTextStyle: {
      color: '#FFF',
      fontFamily: 'Avenir'
    },
    car: {
      elevation: 1,
      borderColor: "white"
    },
    progressBar: {
      height: 20,
      width: '100%',
      backgroundColor: 'white',
      borderColor: '#000',
      borderWidth: 2,
      borderRadius: 5,
      flexDirection: 'row'
    },
    components: {
      //No me convence el color jaja
      backgroundColor: "white",
      paddingHorizontal: theme.SIZES.BASE * 1.2
    },
    colorsito: {
      backgroundColor: "white",
      paddingHorizontal: theme.SIZES.BASE * 1.2
    },
    colorsitoDentro: {
      backgroundColor: "white",
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
    name: {
      fontSize: 28,
      color: "#3C787E",
      fontWeight: "bold",
      textTransform: "uppercase",
      fontFamily:"Avenir"
    },
    albumThumb: {
      borderRadius: 4,
      marginVertical: 4,
      alignSelf: 'center',
      width: thumbMeasure,
      height: thumbMeasure
    },
  });
  