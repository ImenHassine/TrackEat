import React from 'react'

import { Text, Block, theme } from 'galio-framework'
import { Product } from '../components/';
import {
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Image,
    ImageBackground,
    Dimensions
  } from 'react-native';

import Tarjeta from '../components/Tarjeta'
const { width, height } = Dimensions.get('screen');

import { materialTheme, products, Images } from '../constants/';
const thumbMeasure = (width - 48 - 32) / 3;

export default class Historial extends React.Component {

    renderProducts = () => {
        return (
            <Tarjeta />
        )
    }

    renderCards = () => {
        return (
            <Block flex style={styles.group}>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE, width: width - (theme.SIZES.BASE * 2) }}>
                    <Product product={products[0]} horizontal />
                    <Product product={products[0]} horizontal />
                    <Product product={products[0]} horizontal />
                </Block>
          </Block>
        )
    }

    renderInfo () {
        return (
            <Block shadow shadowColor="gray" style={[styles.panel, {zIndex: 1}]}>
                <Block style={{marginVertical: "5%"}}>
                    <Block style={{marginVertical: "2%"}}>
                        <Text h5 color="white">
                            Mis puntos:
                        </Text>
                    </Block>
                    <Block style={{marginVertical: "2%", display: "flex", alignItems: "center"}}>
                        <Text h4 color="white">
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
                {this.renderInfo()}
                <Block style={{marginBottom: "2%"}}>
                    <Text h4>Promociones</Text>
                </Block>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    {this.renderCards()}
                </ScrollView>
            </Block>
        );
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
        alignItems: "center",
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