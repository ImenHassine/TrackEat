import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Image,
  View,
  Dimensions,
  Animated 
} from 'react-native';
import { Block, Text, theme} from 'galio-framework';
import {Card} from 'react-native-elements';
const { width } = Dimensions.get('screen');
import { materialTheme} from '../constants/';
import Constants from 'expo-constants';
import StepIndicator from 'react-native-step-indicator';

const thumbMeasure = (width - 48 - 32) / 3;

const labels = ["Orden Puesta","En preparación", "En cocción","Lista para recoger"];
const customStyles = {
  stepIndicatorSize: 45,
  currentStepIndicatorSize: 65,
  separatorStrokeWidth: 4,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#fe7013',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#fe7013',
  labelFontFamily:"Avenir"
}

export default class TrackingOrdenes extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        currentPosition: 1
    }
}
    
    renderText = () => {
        return (
          <Card
                title="panitos' tracker"
                titleStyle={styles.name}
                containerStyle={styles.car}
                image={require('../assets/images/planta-baja.jpg')}>

              <StepIndicator
                customStyles={customStyles}
                currentPosition={this.state.currentPosition}
                labels={labels}
                stepCount={4}
            />

              </Card>
        )
      }
    
      renderOrden = () => {
        return (
          <Block>
              
              <Text h4 style={{textAlign: "center", fontWeight: 'bold', fontFamily:"Avenir"}}> Orden </Text>
              <View
                style={{
                flexDirection: 'row',
                height: 500,
                padding: 20
                }}>
                <View style={{backgroundColor: '#FFCC00', flex: 1, borderRadius: 70, borderWidth: 0, height:300}}>
                  <View style={{paddingTop:45, paddingRight:40, justifyContent:"flex-end" , textAlign:"justify"}}>
                    <Text size={19} style={{textAlign: "right", fontFamily:"Avenir"}}>Sandwich 3 Quesos             Q24</Text>
                    <Text size={19} style={{textAlign: "right", fontFamily:"Avenir"}}>Ensalada Santa Fe               Q21</Text>
                    <Text size={19} style={{textAlign: "right", fontFamily:"Avenir"}}>Pan Chorizo y Queso           Q26</Text>
                    <Text size={19} style={{textAlign: "right", fontFamily:"Avenir"}}>Licuado de Banano              Q15</Text>
                  </View>
                  <View style={{paddingHorizontal:20}}>
                    <View style={{borderBottomColor: 'black',borderBottomWidth: 6, paddingTop:15}}/>
                  </View>
                  <View style={{paddingRight:40, paddingTop:20}}>
                    <Text size={19} style={{textAlign: "right", fontFamily:"Avenir"}}>   Total                     Q86</Text>
                  </View>
                </View>
              </View>
            </Block>
        )
      }

    render() {
    return (
         <Block  style={{backgroundColor:"white"}} >
           <ScrollView>
             {this.renderText()}
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
      backgroundColor: 'white',
      padding: 8,
    },
    car: {
      elevation: 0,
      borderColor: "white"
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
      backgroundColor: "white",
      paddingHorizontal: theme.SIZES.BASE * 1.2
    },
    colorsito: {
      backgroundColor: "white",
      paddingHorizontal: theme.SIZES.BASE * 1.2
    },
    colorsitoDentro: {
      backgroundColor: "white",
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
    name: {
      fontSize: 28,
      color: "#3C787E",
      fontWeight: "bold",
      textTransform: "uppercase",
      fontFamily:"Avenir"
    },
    albumThumb: {
      borderRadius: 4,
      marginVertical: 4,
      alignSelf: 'center',
      width: thumbMeasure,
      height: thumbMeasure
    },
  });
  