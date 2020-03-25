import React, { useEffect, useState, useRef } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  View,
  Dimensions,
  Animated 
} from 'react-native';
import {Accordion, Block, Text, theme, Card } from 'galio-framework';
const { width } = Dimensions.get('screen');
import { materialTheme, products, Images } from '../constants/';
import Constants from 'expo-constants';

const thumbMeasure = (width - 48 - 32) / 3;

export default class TrackingOrdenes extends React.Component {
    
    renderText = () => {
        return (
          <Block style={{paddingTop: 15}}>
              <View style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly"}}>
                <View>
                  <Image source={{uri: 'https://media-cdn.tripadvisor.com/media/photo-s/14/32/b9/7b/planta-baja.jpg'}} style={{width: 100, height: 100, borderWidth: 0.5, borderRadius: 40}} />  
                </View>
                <View>
                  <Text>Restaurante: Panitos </Text>
                  <Text>Ubicación: Universidad del Valle</Text>
                  <Text>Fecha: 24/03/2020 </Text>
                  <Text>Hora: 04:42 PM </Text>
                </View>
                
              </View>
                <View style={{borderBottomColor: 'black',borderBottomWidth: 6, paddingTop:15}}/>
              
            </Block>
        )
      }
      renderProgreso = () => {
        return (
          <View style={{padding: 15}} >
            <View style={{alignItems: 'center', paddingBottom: 5}}>
              <Text size={20}>
              Estado de tu órden
            </Text> 
            </View>
            
            <View style={styles.progressBar}>
              <Animated.View style={[StyleSheet.absoluteFill], {backgroundColor: "green", flex: 0.125}}/>
            </View>
            <View style={{display:"flex", flexDirection: "row", justifyContent:"space-between", paddingHorizontal: 20}}>
              <Text>Inicio </Text>
              <Text>Cocinando </Text>
              <Text>Listo </Text>
            </View>
            
          </View>
        )

      }
      renderOrden = () => {
        return (
          <Block>
              <Text h4 style={{textAlign: "center", fontWeight: 'bold'}}> Orden </Text>
              <View
                style={{
                flexDirection: 'row',
                height: 500,
                padding: 20
                }}>
                <View style={{backgroundColor: '#FFCC00', flex: 1, borderRadius: 70, borderWidth: 0, height:300}}>
                  <View style={{paddingTop:45, paddingRight:40, justifyContent:"flex-end" , textAlign:"justify"}}>
                    <Text size={19} style={{textAlign: "right"}}>Sandwich 3 Quesos             Q24</Text>
                    <Text size={19} style={{textAlign: "right"}}>Ensalada Santa Fe               Q21</Text>
                    <Text size={19} style={{textAlign: "right"}}>Pan Chorizo y Queso           Q26</Text>
                    <Text size={19} style={{textAlign: "right"}}>Licuado de Banano              Q15</Text>
                  </View>
                  <View style={{paddingHorizontal:20}}>
                    <View style={{borderBottomColor: 'black',borderBottomWidth: 6, paddingTop:15}}/>
                  </View>
                  <View style={{paddingRight:40, paddingTop:20}}>
                    <Text size={19} style={{textAlign: "right"}}>   Total                     Q86</Text>
                  </View>
                </View>
              </View>
            </Block>
        )
      }

    render() {
    return (
         <Block  style={{backgroundColor:"#9DD9D2"}} >
           <ScrollView>
            {this.renderText()}
             {this.renderProgreso()}
             {this.renderOrden()}
           </ScrollView>
         </Block>
    );
  }
}
const styles = StyleSheet.create({
    
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ecf0f1',
      padding: 8,
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
      backgroundColor: "#9DD9D2",
      paddingHorizontal: theme.SIZES.BASE * 1.2
    },
    colorsito: {
      backgroundColor: "#FFCC00",
      paddingHorizontal: theme.SIZES.BASE * 1.2
    },
    colorsitoDentro: {
      backgroundColor: "#d4dfe9",
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
    albumThumb: {
      borderRadius: 4,
      marginVertical: 4,
      alignSelf: 'center',
      width: thumbMeasure,
      height: thumbMeasure
    },
  });
  