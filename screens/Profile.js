import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

//import { Icon } from '../components';
import { Images, materialTheme } from '../constants';
import { HeaderHeight } from "../constants/utils";

import Spinner from 'react-native-loading-spinner-overlay';
import * as TrackWorker from '../TrackWorker';


const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

class ProfileOrder extends React.Component {
  
  render() {
    const { navigation, order, horizontal, full, style, priceColor, imageStyle } = this.props;
    return(
      <Block row={horizontal} card flex style={[styles.product, styles.shadow, style]}>
          <Block flex style={[styles.imageContainer, styles.shadow]}>
            <Image source={{ uri: order.image }} style={styles.imageStyle} />
          </Block>
          <Block flex space="between" style={styles.productDescription}>
            <Text size={16} style={styles.productTitle}>{order.nombre}</Text>
            <Text size={16}  color={priceColor}>Total: Q {order.total} </Text>
            <Text size={16} color={priceColor}>Fecha: {order.fecha} </Text>
          </Block>
      </Block>
    )
  }
}
export default class Profile extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      orders: null,
      points: 0,
      orders_qty: 0
    }
  }

  async componentDidMount() {
    try {
      const o = await this.getOrders()
      const user = await TrackWorker.getUserInfo(global.emailLogged, global.password)
      const p = user.puntos
      this.setState({ 
        orders: o,
        points: p
      });
    }
    catch (error) {
      throw new Error(error);
    }
  }
  async getOrders(){
    try{
      const user_orders = await TrackWorker.getUserOrders(global.IdLogged); 
      // const user_orders = await TrackWorker.getUserOrders(97); //id estatico en lo que se termina lo de hacer una orden
      this.setState({
        orders_qty: user_orders.length
      })
      const order_cards = []
      let order_points = 0
      const products  = []
      let orders_displayed = 0 //cantidad de ordenes para hacer display (max 3)
      if(user_orders.length > 3){
        orders_displayed = 3
      }
      else{
        orders_displayed = user_orders.length
      }
      for(let i = 0; i < orders_displayed; i++) { // solo se presentan las últimas 3 órdenes
        const p = await (TrackWorker.getProductById(user_orders[i].descripcion[1]['productid']))
        const order = {
          codigo: user_orders[i].id,
          image: p.image, //jalar una imagen random para mientras
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

  logout = () => {
    global.isLogged = false;
    this.props.navigation.navigate('Sign In')
  }

  render() {
    const { orders, points, orders_qty } = this.state
    if(orders === null){
      return(
        <Spinner
          visible={!this.state.canInteract}
          textContent={'Cargando...'}
          textStyle={styles.spinnerTextStyle}
        />
      )
    }
    else{
      return (
        <Block flex style={styles.profile}>
          <Block flex>
            <ImageBackground
              source={{uri: global.imageLogged}}
              style={styles.profileContainer}
              >
              
            </ImageBackground>
          </Block>
          <Block flex style={styles.options}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Block row space="evenly" style={{ padding: theme.SIZES.BASE, }}>
                <Block middle>
                  <Text bold size={12} style={{marginBottom: 8}}>{orders_qty}</Text>
                  <Text muted  size={12}>Órdenes</Text>
                </Block>
                <Block middle>
                  <Text bold size={12} style={{marginBottom: 8}}>{points}</Text>
                  <Text muted  size={12}>Puntos</Text>
                </Block>
              </Block>
              <Block row space="between" style={{ paddingVertical: 16, alignItems: 'baseline' }}>
                <Text size={16} >Órdenes recientes</Text>
                <Text size={14}  color={"#4686c8"} onPress={() => this.props.navigation.navigate('Historial')}>Ver todas</Text>
              </Block>
              <Block style={{ paddingBottom: -HeaderHeight}}>
                { orders.length === 0 ? 
                        <Text> No se han registrado órdenes </Text> :
                      orders.map((order) => (
                        <ProfileOrder key={order.codigo} order={order} horizontal />
                      ))}
              </Block>
            </ScrollView>
          </Block>
        </Block>
      );
    }
    
  }
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
    marginBottom: -HeaderHeight * 2,
  },
  profileContainer: {
    height: height/2 ,
  },
  profileDetails: {
    paddingTop: theme.SIZES.BASE * 4,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  profileTexts: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    zIndex: 2
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginRight: theme.SIZES.BASE / 2,
    borderRadius: 4,
    height: 19,
    width: 38,
  },
  seller: {
    marginRight: theme.SIZES.BASE / 2,
  },
  options: {
    position: 'relative',
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: -theme.SIZES.BASE * 7,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure
  },
  gradient: {
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    height: '30%',
    position: 'absolute',
  },

  product: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 90,
    maxHeight: 110,
  },
  productTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6,
  },
  productDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    elevation: 1,
  },
  image: {
    borderRadius: 5,
    marginHorizontal: theme.SIZES.BASE / 2,
    margin: 4,
  },
  horizontalImage: {
    height: 90,
    width: 'auto',
  },
  fullImage: {
    height: 215,
    width: width - theme.SIZES.BASE * 3,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});
