import React from 'react';
import { StyleSheet } from 'react-native';
import { Card } from 'galio-framework';
import { Text, theme } from 'galio-framework';

import materialTheme from '../constants/Theme';

export default class Tarjeta extends React.Component {
  render() {

    return (
      <Card
        flex
        borderless
        style={styles.card}
        title="Christopher Moon"
        caption="139 minutes ago"
        // avatar="http://i.pravatar.cc/100?id=skater"
        imageStyle={styles.cardImageRadius}
        imageBlockStyle={{ padding: theme.SIZES.BASE / 2 }}
        image="https://images.unsplash.com/photo-1497802176320-541c8e8de98d?&w=1600&h=900&fit=crop&crop=entropy&q=300"
        footerStyle={styles.footer}
      />
    )
  }
}

const styles = StyleSheet.create({
    card: {
      width: "50%",
      minHeight: "200%",
      backgroundColor: "#9DD9D2",
      margin: "5%"
    },
    cardImageRadius: {
      borderRadius: 5,
      width: "100%"
    },
    footer: {
      backgroundColor: "#9DD9D2",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      borderRadius: 5,
    }
});