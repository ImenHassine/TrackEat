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

export default class Historial extends React.Component {

  

    renderCards = () => {
        return (
          <Block flex style={styles.group}>
            <Text h4 style={{fontFamily:"Avenir"}} >Tus pedidos xd</Text>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE, width: width - (theme.SIZES.BASE * 2) }}>
              { historialP.map((product) => {
                return(
                  <HistorialC product={product} horizontal />
                    
                )
              })}
              
              {/* <Product product={products[0]} horizontal />
              <Product product={products[0]} horizontal /> */}
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