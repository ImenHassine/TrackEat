import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, theme } from 'galio-framework';

import { Product } from '../components/';

const { width } = Dimensions.get('screen');

import Spinner from 'react-native-loading-spinner-overlay';

import * as TrackWorker from '../TrackWorker';

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      productos: [],
      canInteract: false
    };
  }

  async componentDidMount() {
    try {
      const p = await this.getProducts()
      this.setState({
        productos: p
      });
      this.setState({
        canInteract: true
      })
    }
    catch (error) {
      throw new Error(error);
    }
  }

  async getProducts(){
    let productsInfo = [];

    try {
      let productsIds = [];

      const totalProducts = Math.floor(Math.random() * 5) + 5;

      let idProducto;
      for(let i = 0; i < totalProducts; i++) {

        while (true) {
          const someId = Math.random();
          idProducto = await TrackWorker.getRandomProduct(someId);

          if (!productsIds.includes(idProducto.getrandom)) break;
        }
        
        productsIds.push(idProducto.getrandom);

        const producto = await TrackWorker.getProductById(idProducto.getrandom);
        productsInfo.push(producto);
      }
      
      return productsInfo;

    } catch(error) {
      throw new Error(error);
    }

  }

  renderProducts = () => {
    const cards = [];

    for(let i = 1; i < this.state.productos.length; i += 4) {
      cards.push(
        <Block key={i + "_block"} flex row>
          {i < this.state.productos.length ? <Product key={this.state.productos[i].id} product={this.state.productos[i]} style={{ marginRight: theme.SIZES.BASE }} /> : null }
          {i + 1 < this.state.productos.length ? <Product key={this.state.productos[i + 1].id} product={this.state.productos[i + 1]} /> : null }
        </Block>
      );
      if (i + 2 < this.state.productos.length) 
        cards.push(
          <Product key={this.state.productos[i + 2].id} product={this.state.productos[i + 2]} horizontal />
        );

      if (i + 3 < this.state.productos.length)
        cards.push(
          <Product key={this.state.productos[i + 3].id} product={this.state.productos[i + 3]} full />
        );
    }

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}
      >
        <Spinner
          visible={!this.state.canInteract}
          textContent={'Cargando...'}
          textStyle={styles.spinnerTextStyle}
        />
        <Block flex>
          {this.state.productos.length > 0 ? <Product key={this.state.productos[0].id} product={this.state.productos[0]} horizontal /> : null}
          { cards }
        </Block>
      </ScrollView>
    )
  }

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderProducts()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,    
  },
  spinnerTextStyle: {
    color: '#FFF',
    fontFamily: 'Avenir'
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
    zIndex: 2,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.50,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '300'
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  products: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
  },
});
