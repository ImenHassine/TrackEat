import React from 'react'

import { Text, Block, theme } from 'galio-framework'
import { Product } from '../components/';
import {
    ScrollView,
    StyleSheet,
    Dimensions
  } from 'react-native';

import Tarjeta from '../components/Tarjeta'
const { width } = Dimensions.get('screen');

import { materialTheme } from '../constants/';
const thumbMeasure = (width - 48 - 32) / 3;

import * as TrackWorker from '../TrackWorker';
import Spinner from 'react-native-loading-spinner-overlay';

export default class Puntos extends React.Component {

  constructor() {
    super();

    this.state = {
      productos: [],
      canInteract: false
    }
  }

  async componentDidMount() {
    try {
      const pro = await this.getProducts()

      this.setState({
        productos: pro,
        canInteract: true
      })
    } catch(error) {
      throw new Error(error);
    }
  }

  async getProducts() {
    let p = []

    try {
      let productsIds = [];

      const totalProducts = 4;

      let idProducto;
      for(let i = 0; i < totalProducts; i++) {

        while (true) {
          const someId = Math.random();
          idProducto = await TrackWorker.getRandomProduct(someId);

          if (!productsIds.includes(idProducto.getrandom)) break;
        }
        
        productsIds.push(idProducto.getrandom);

        const producto = await TrackWorker.getProductById(idProducto.getrandom);
        p.push(producto);
      }

      return p;

    } catch(error) {
      
    }
  }

  renderProducts = () => {
    return (
      <Tarjeta />
    )
  }

  renderCards = () => {
    return (
      <Block flex style={styles.group}>
        <Text h4 style={{fontFamily:"Avenir", textAlign: "center"}}>Promociones</Text>
        <Text>{"\n"}</Text>
        <Spinner
          visible={!this.state.canInteract}
          textContent={'Cargando...'}
          textStyle={styles.spinnerTextStyle}
        />
        <Block style={{ paddingHorizontal: theme.SIZES.BASE, width: width - (theme.SIZES.BASE * 2) }}>

          { this.state.canInteract ? 
            <Block>
              { this.state.productos.map((product) => {
                return(
                  <Product key={product.id} product={product} horizontal />
                )
              })}
            </Block> : null }
        </Block>
      </Block>
    )
  }

  renderInfo () {
    return (
      <Block shadow shadowColor="gray" style={[styles.panel, {zIndex: 1}]}>
        <Block style={{marginVertical: "5%"}}>
          <Block style={{marginVertical: "2%"}}>
            <Text h5 style={{fontFamily:"Avenir"}} color="white">
              Mis puntos:
            </Text>
          </Block>
          <Block style={{marginVertical: "2%", display: "flex", alignItems: "center"}}>
            <Text h4 style={{fontFamily:"Avenir"}} color="white">
              {misPuntos}
            </Text>
          </Block>
        </Block>
      </Block>
    )
  }

  render() {
    return (
      <Block style={[styles.content]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          {this.renderInfo()}
          {this.renderCards()}
        </ScrollView>
      </Block>
    );
  }
}

const misPuntos = Math.floor((Math.random()*1000) + 100);

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
})