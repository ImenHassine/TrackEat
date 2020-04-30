import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View
} from 'react-native';
import {Accordion, Block, Text, theme } from 'galio-framework';
const { width } = Dimensions.get('screen');
import { faq } from '../constants/';

export default class FAQ extends React.Component {

  renderText = () => {
    return (
      <Block flex style={styles.group}>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Text h4 style={{marginBottom: 10, textAlign: "center", fontWeight: 'bold', color: 'white', fontFamily:"Avenir"}}>Preguntas Frecuentes</Text>
        </Block>
      </Block>
    )
  }
  renderAlgo = () => {
    return (
      <View style={{flex: 1, padding:30}}> 
        <Block flex center style={styles.block}>
          <Accordion flex style={styles.item} dataArray={faq} opened={null} headerStyle={{paddingVertical:20, paddingHorizontal:15, margin: 5, fontFamily:"Avenir"}} contentStyle={{fontWeight:'bold',  textAlign: 'justify', color:"#46494C", fontFamily:"Avenir"}}/>
        </Block>
      </View>
    )
  }

  render() {
    return (
      <Block style={styles.components }>

        <Block style={{ paddingHorizontal: theme.SIZES.BASE, marginTop: 20 }}>
          <Text h4 style={{marginBottom: 10, textAlign: "center", fontWeight: 'bold', color: 'white', fontFamily:"Avenir"}}>Preguntas Frecuentes</Text>
        </Block>

        <View style={{flex: 1, padding:30}}> 
          <Block flex center style={styles.block}>
            <Accordion flex style={styles.item} dataArray={faq} opened={null} headerStyle={{paddingVertical:20, paddingHorizontal:15, margin: 5, fontFamily:"Avenir"}} contentStyle={{fontWeight:'bold',  textAlign: 'justify', color:"#46494C", fontFamily:"Avenir"}}/>
          </Block>
        </View>

      </Block>
    );
  }
}

const styles = StyleSheet.create({
  components: {
    backgroundColor: "#3C787E",
    paddingHorizontal: theme.SIZES.BASE * 1.2,
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  item: {
    justifyContent:'space-between',
    paddingHorizontal: theme.SIZES.BASE * 1.2
  },
  container: {
    flex: 1,
    justifyContent:'space-between',
    alignItems: 'center',
  },
  faqs: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
  },
});
