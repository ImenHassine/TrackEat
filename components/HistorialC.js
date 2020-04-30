import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { DataNavigation } from 'react-data-navigation';

const { width } = Dimensions.get('screen');

class HistorialC extends React.Component {
  render() {
    const { navigation, order, horizontal, full, style, priceColor, imageStyle } = this.props;
    DataNavigation.setData('incomingOrder', order.productos); 
    const imageStyles = [styles.image, full ? styles.fullImage : styles.horizontalImage, imageStyle];
    //console.log(order)
    //console.log("hola")
    return (
      <Block row={horizontal} card flex style={[styles.product, styles.shadow, style]}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Tracking de Órdenes', { incomingOrder: order.productos })}>
          <Block flex style={[styles.imageContainer, styles.shadow]}>
            <Image source={{ uri: order.image }} style={imageStyles} />
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Tracking de Órdenes', { incomingOrder: order.productos })}>
          <Block flex space="between" style={styles.productDescription}>
            <Text size={16} style={styles.productTitle, {fontFamily:"Avenir"}}>{order.nombre}</Text>
            <Text size={16} style={{fontFamily:"Avenir"}} color={priceColor}>Total: {order.total} </Text>
            <Text size={16} style={{fontFamily:"Avenir"}} color={priceColor}>{order.fecha} </Text>
            <Text size={16} style={{fontFamily:"Avenir"}} muted color={priceColor}>{order.puntos} TrackPuntos</Text>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  }
}

export default withNavigation(HistorialC);

const styles = StyleSheet.create({
  product: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 130,
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
    marginTop: 4,
  },
  horizontalImage: {
    height: 122,
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