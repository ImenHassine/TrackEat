import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Button, Block, Text, Input, theme, Toast } from 'galio-framework';

import { Icon, Product } from '../components/';

const { width } = Dimensions.get('screen');
import products from '../constants/products';

import { getProductsName } from '../TrackWorker';

export default class Home extends React.Component {
  // renderSearch = () => {
  //   const { navigation } = this.props;
  //   const iconCamera = <Icon size={16} color={theme.COLORS.MUTED} name="zoom-in" family="material" />

  //   return (
  //     <Input
  //       right
  //       color="black"
  //       style={styles.search, {fontFamily: "Avenir"}}
  //       iconContent={iconCamera}
  //       placeholder="What are you looking for?"
  //       onFocus={() => navigation.navigate('Pro')}
  //     />
  //   )
  // }
  
  // renderTabs = () => {
  //   const { navigation } = this.props;

  //   return (
  //     <Block row style={styles.tabs}>
  //       <Button shadowless style={[styles.tab, styles.divider]} onPress={() => navigation.navigate('Pro')}>
  //         <Block row middle>
  //           <Icon name="grid" family="feather" style={{ paddingRight: 8 }} />
  //           <Text size={16} style={styles.tabTitle, {fontFamily: "Avenir"}}>Categories</Text>
  //         </Block>
  //       </Button>
  //       <Button shadowless style={styles.tab} onPress={() => navigation.navigate('Pro')}>
  //         <Block row middle>
  //           <Icon size={16} name="camera-18" family="GalioExtra" style={{ paddingRight: 8 }} />
  //           <Text size={16} style={styles.tabTitle, {fontFamily: "Avenir"}}>Best Deals</Text>
  //         </Block>
  //       </Button>
  //     </Block>
  //   )
  // }

  renderProducts = () => {
    const cards = [];

    for(let i = 1; i < products.length; i += 4) {
      cards.push(
        <Block flex row>
          {i < products.length ? <Product product={products[i]} style={{ marginRight: theme.SIZES.BASE }} /> : null }
          {i + 1 < products.length ? <Product product={products[i + 1]} /> : null }
        </Block>
      );
      if (i + 2 < products.length) 
        cards.push(
          <Product product={products[i + 2]} horizontal />
        );

      if (i + 3 < products.length)
        cards.push(
          <Product product={products[i + 3]} full />
        );
    }

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}>
        <Block flex>
          <Product product={products[0]} horizontal />
          { cards }
        </Block>
      </ScrollView>
    )
  }

  render() {
    let api;
    getProductsName().then(
      res => {
        api = JSON.stringify(res)
      }
    )
    return (
      <Block flex center style={styles.home}>
        {/* <Toast isShow={} */}
        {this.renderProducts()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,    
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
