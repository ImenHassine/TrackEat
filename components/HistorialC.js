import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { DataNavigation } from 'react-data-navigation';

const { width } = Dimensions.get('screen');

class HistorialC extends React.Component {
  changeScreen = (navigation, order) => {
    DataNavigation.setData('incomingOrder', order.productos); 
    DataNavigation.setData('orderId', order.codigo); 
    navigation.navigate('Tracking de Órdenes', { incomingOrder: order.productos, id: order.codigo })
  }
  
  render() {
    const { navigation, order, horizontal, full, style, priceColor, imageStyle } = this.props;

    const imageStyles = [styles.image, full ? styles.fullImage : styles.horizontalImage, imageStyle];

    return (
      <Block row={horizontal} card flex style={[styles.product, styles.shadow, style]}>
        <TouchableWithoutFeedback onPress={() => this.changeScreen(navigation, order)}>
          <Block flex style={[styles.imageContainer, styles.shadow]}>
            <Image source={{ uri: order.image }} style={imageStyles} />
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.changeScreen(navigation, order)}>
          <Block flex space="between" style={styles.productDescription}>
            <Text size={16} style={styles.productTitle}>{order.nombre}</Text>
            <Text size={16}  color={priceColor}>Total: Q{order.total} </Text>
            <Text size={16}  color={priceColor}>Fecha: {order.fecha} </Text>
            <Text size={16}  muted color={priceColor}>{order.puntos} TrackPuntos</Text>
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
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
  },
  horizontalImage: {
    height: 131,
  },
  fullImage: {
    resizeMode: 'contain',
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