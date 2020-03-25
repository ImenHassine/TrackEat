import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions
} from 'react-native';
import {Accordion, Block, Text, theme, Card } from 'galio-framework';
const { width } = Dimensions.get('screen');
import { materialTheme, products, Images } from '../constants/';

const thumbMeasure = (width - 48 - 32) / 3;

export default class FAQ extends React.Component {

  renderText = () => {
    return (
      <Block flex style={styles.group}>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>

          <Text h4 style={{marginBottom: theme.SIZES.BASE / 2,   textAlign: "center", fontWeight: 'bold'}}>Preguntas Frecuentes</Text>

        </Block>
      </Block>
    )
  }
  renderAlgo = (props) => {
    return (
      <Block style={{flex:2,padding:30}}> 
        <Block flex center>
          <Accordion  style={styles.colorsito} dataArray={data1} opened={50} headerStyle={{padding:20}} contentStyle={{fontWeight:'bold',  textAlign: 'justify', color:"#46494C"}}/>
        </Block>
      </Block>
    )
  }

  render() {
    return (
         <Block flex center style={styles.components }>
          <ScrollView
            
            showsVerticalScrollIndicator={false}>

            {this.renderText()}
            {this.renderAlgo()}

            
          </ScrollView>
          
        </Block>
    );
  }
}
const data1 = [
  { title: "¿Cómo gasto mis puntos?                      ", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id libero pharetra, mollis sapien id, scelerisque arcu. Nullam turpis ipsum, tristique eu leo sit amet, ultrices luctus urna. Etiam lacinia aliquet maximus. Aenean vitae magna massa. Fusce vel ligula nec purus dictum porta sed eget diam. Sed a porta ipsum, sit amet venenatis arcu. Mauris blandit id quam sed laoreet. Nullam in arcu eleifend, eleifend diam vel, convallis quam. Nulla eleifend faucibus ullamcorper. Fusce quis massa nisi. Fusce interdum magna eget nisl vehicula, ut congue nisl scelerisque. " },
  { title: "¿Que pasa si no recibo una notificacion?    ", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id libero pharetra, mollis sapien id, scelerisque arcu. Nullam turpis ipsum, tristique eu leo sit amet, ultrices luctus urna. Etiam lacinia aliquet maximus. Aenean vitae magna massa. Fusce vel ligula nec purus dictum porta sed eget diam. Sed a porta ipsum, sit amet venenatis arcu. Mauris blandit id quam sed laoreet. Nullam in arcu eleifend, eleifend diam vel, convallis quam. Nulla eleifend faucibus ullamcorper. Fusce quis massa nisi. Fusce interdum magna eget nisl vehicula, ut congue nisl scelerisque. " },
  { title: "¿Qué restaurantes usan esta app?            ", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id libero pharetra, mollis sapien id, scelerisque arcu. Nullam turpis ipsum, tristique eu leo sit amet, ultrices luctus urna. Etiam lacinia aliquet maximus. Aenean vitae magna massa. Fusce vel ligula nec purus dictum porta sed eget diam. Sed a porta ipsum, sit amet venenatis arcu. Mauris blandit id quam sed laoreet. Nullam in arcu eleifend, eleifend diam vel, convallis quam. Nulla eleifend faucibus ullamcorper. Fusce quis massa nisi. Fusce interdum magna eget nisl vehicula, ut congue nisl scelerisque. " },
  { title: "¿Como gano puntos?                           ", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id libero pharetra, mollis sapien id, scelerisque arcu. Nullam turpis ipsum, tristique eu leo sit amet, ultrices luctus urna. Etiam lacinia aliquet maximus. Aenean vitae magna massa. Fusce vel ligula nec purus dictum porta sed eget diam. Sed a porta ipsum, sit amet venenatis arcu. Mauris blandit id quam sed laoreet. Nullam in arcu eleifend, eleifend diam vel, convallis quam. Nulla eleifend faucibus ullamcorper. Fusce quis massa nisi. Fusce interdum magna eget nisl vehicula, ut congue nisl scelerisque. " },
  { title: "¿Puedo ver las ordenes que hice en otra fecha?", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id libero pharetra, mollis sapien id, scelerisque arcu. Nullam turpis ipsum, tristique eu leo sit amet, ultrices luctus urna. Etiam lacinia aliquet maximus. Aenean vitae magna massa. Fusce vel ligula nec purus dictum porta sed eget diam. Sed a porta ipsum, sit amet venenatis arcu. Mauris blandit id quam sed laoreet. Nullam in arcu eleifend, eleifend diam vel, convallis quam. Nulla eleifend faucibus ullamcorper. Fusce quis massa nisi. Fusce interdum magna eget nisl vehicula, ut congue nisl scelerisque. " },
  { title: "¿Funciona sin internet?                      ", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id libero pharetra, mollis sapien id, scelerisque arcu. Nullam turpis ipsum, tristique eu leo sit amet, ultrices luctus urna. Etiam lacinia aliquet maximus. Aenean vitae magna massa. Fusce vel ligula nec purus dictum porta sed eget diam. Sed a porta ipsum, sit amet venenatis arcu. Mauris blandit id quam sed laoreet. Nullam in arcu eleifend, eleifend diam vel, convallis quam. Nulla eleifend faucibus ullamcorper. Fusce quis massa nisi. Fusce interdum magna eget nisl vehicula, ut congue nisl scelerisque. " },
  { title: "¿Y si no voy a recoger rápido mi comida?     ", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id libero pharetra, mollis sapien id, scelerisque arcu. Nullam turpis ipsum, tristique eu leo sit amet, ultrices luctus urna. Etiam lacinia aliquet maximus. Aenean vitae magna massa. Fusce vel ligula nec purus dictum porta sed eget diam. Sed a porta ipsum, sit amet venenatis arcu. Mauris blandit id quam sed laoreet. Nullam in arcu eleifend, eleifend diam vel, convallis quam. Nulla eleifend faucibus ullamcorper. Fusce quis massa nisi. Fusce interdum magna eget nisl vehicula, ut congue nisl scelerisque. " },
  { title: "¿Puedo pagar desde la app?                   ", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id libero pharetra, mollis sapien id, scelerisque arcu. Nullam turpis ipsum, tristique eu leo sit amet, ultrices luctus urna. Etiam lacinia aliquet maximus. Aenean vitae magna massa. Fusce vel ligula nec purus dictum porta sed eget diam. Sed a porta ipsum, sit amet venenatis arcu. Mauris blandit id quam sed laoreet. Nullam in arcu eleifend, eleifend diam vel, convallis quam. Nulla eleifend faucibus ullamcorper. Fusce quis massa nisi. Fusce interdum magna eget nisl vehicula, ut congue nisl scelerisque. " },
  { title: "Otro telefono puede escanear mi codigo QR?", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id libero pharetra, mollis sapien id, scelerisque arcu. Nullam turpis ipsum, tristique eu leo sit amet, ultrices luctus urna. Etiam lacinia aliquet maximus. Aenean vitae magna massa. Fusce vel ligula nec purus dictum porta sed eget diam. Sed a porta ipsum, sit amet venenatis arcu. Mauris blandit id quam sed laoreet. Nullam in arcu eleifend, eleifend diam vel, convallis quam. Nulla eleifend faucibus ullamcorper. Fusce quis massa nisi. Fusce interdum magna eget nisl vehicula, ut congue nisl scelerisque. " },
  { title: "¿Cuánto tiempo duran los puntos?             ", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id libero pharetra, mollis sapien id, scelerisque arcu. Nullam turpis ipsum, tristique eu leo sit amet, ultrices luctus urna. Etiam lacinia aliquet maximus. Aenean vitae magna massa. Fusce vel ligula nec purus dictum porta sed eget diam. Sed a porta ipsum, sit amet venenatis arcu. Mauris blandit id quam sed laoreet. Nullam in arcu eleifend, eleifend diam vel, convallis quam. Nulla eleifend faucibus ullamcorper. Fusce quis massa nisi. Fusce interdum magna eget nisl vehicula, ut congue nisl scelerisque. " },
  { title: "¿Hay alguna promoción extra?                 ", content: "Lorem ipsum dolor sit amet" }
];
const data2 = [
  { title: "¿Que pasa si no recibo una notificacion?", content: "Lorem ipsum dolor sit amet" }
];
const styles = StyleSheet.create({
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
