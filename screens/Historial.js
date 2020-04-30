import React from 'react'

import { Text, Block, theme } from 'galio-framework'
import { HistorialC } from '../components/';
import {
    ScrollView,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    ImageBackground,
    Dimensions
  } from 'react-native';

const { width, height } = Dimensions.get('screen');

import { materialTheme, historialP, Images, products } from '../constants/';
const thumbMeasure = (width - 48 - 32) / 3;
import * as TrackWorker from '../TrackWorker';
import Spinner from 'react-native-loading-spinner-overlay';


class Warning extends React.Component {
  render() {
    // const { navigation, product, horizontal, full, style, priceColor, imageStyle } = this.props;
    const { horizontal, style, imageStyle } = this.props
    return (
      <Block row={horizontal} card flex style={[styles.shadow, styles.warningNotice]}>
        {/* <Text size={18} style={{fontFamily:"Avenir"}}>No se han registado productos</Text> */}
          <Block flex space="between" style={styles.warningNotice}>
            <Text size={18} style={{fontFamily:"Avenir", color:"white"}}>No se han registrado pedidos</Text>
          </Block>
      </Block>
    );
  }
}

class Historial extends React.Component {
    constructor() {
      super();
      this.state = { orders: null };
    }
    async componentDidMount() {
      try {
        const o = await this.getOrders()
        this.setState({ orders: o });
      }
      catch (error) {
        throw new Error(error);
      }
    }
    async getOrders(){
      try{
        // const user_orders = await TrackWorker.getUserOrders(global.IdLogged); 
        const user_orders = await TrackWorker.getUserOrders(97); //id estatico en lo que se termina lo de hacer una orden
        const order_cards = []
        let order_points = 0
        const products  = []
        for(let i = 0; i < user_orders.length; i++) {
          const p_id = Math.floor(Math.random() * Object.keys(user_orders[i].descripcion).length) + 1
          let image = ''
          for (let p = 1; p < Object.keys(user_orders[i].descripcion).length+1; p ++){
            const product_info = await (TrackWorker.getProductById(user_orders[i].descripcion[p]['productid']))
            if(p === parseInt(p_id))
              image = product_info.image
            order_points += parseInt(product_info.puntos)
            const prod = {
              producto: product_info.nombre,
              precio: product_info.precio,
              cantidad: user_orders[i].descripcion[p]['qty'],
              tiempo: product_info.tiempo_coccion,
            }
            products.push(prod)
          }
          const order = {
            codigo: user_orders[i].id,
            image: image, //jalar una imagen random para mientras
            nombre: "Orden No. " + user_orders[i].id,
            fecha: user_orders[i].fechaentrega.split("T")[0],
            total: user_orders[i].total,
            puntos: order_points,
            productos: products
          }
          order_cards.push(order)
        }
        return order_cards
      } catch(error) {
        throw new Error(error);
      }

    }
    renderCards() {
        const { orders } = this.state;
        if (orders === null) {
          return(
            <Spinner
              visible={!this.state.canInteract}
              textContent={'Cargando...'}
              textStyle={styles.spinnerTextStyle}
            />
          )
        }
        else {
          return (
            <Block flex style={styles.group}>
              <Text h4 style={{fontFamily:"Avenir", textAlign: "center"}} >Historial de órdenes</Text>
              <Block style={{ paddingHorizontal: theme.SIZES.BASE, width: width - (theme.SIZES.BASE * 2) }}>
                { orders.length === 0 ? 
                    <Warning /> :
                  orders.map((order) => (
                    <HistorialC key={order.codigo} order={order} horizontal />
                  ))}
              </Block>
            </Block>
          )
        }
      }
    render() {
        return (
          <Block style={[styles.content]}>
            <ScrollView
              showsVerticalScrollIndicator={false}
            >
             { this.renderCards() }
            </ScrollView>
          </Block>
        )
    }
}

const misPuntos = Math.floor((Math.random()*1000) + 100);
// const misPuntos = 100000000000000;

const styles = StyleSheet.create({
    content: {
        display: "flex",
        alignItems: "center",
    },
    panel: {
        display: "flex",
        alignItems: "center",
        borderRadius: 15,
        paddingHorizontal: "8%",
        backgroundColor: "#3C787E",
        marginVertical: "7.5%",
    },
    title: {
        backgroundColor: "black",
        color: "pink",
        display: "flex",
        flexDirection: "row",
        marginTop: "7%",
        alignItems: "centeri",
    },
    components: {
    },
    title: {
      paddingVertical: theme.SIZES.BASE,
      paddingHorizontal: theme.SIZES.BASE * 2,
    },
    group: {
      paddingTop: theme.SIZES.BASE,
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
    albumThumb: {
      borderRadius: 4,
      marginVertical: 4,
      alignSelf: 'center',
      width: thumbMeasure,
      height: thumbMeasure
    },
    warningNotice: {
      borderRadius: 4,
      marginVertical: 4,
      marginHorizontal: 10,
      alignSelf: 'center',
      backgroundColor: 'red',
      color: 'white',
      fontFamily:"Avenir"
    },

    spinnerTextStyle: {
      color: '#FFF',
      fontFamily: 'Avenir'
    }
})

export default Historial;