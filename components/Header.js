import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { TouchableOpacity, StyleSheet, Platform, Dimensions } from 'react-native';
import { Button, Block, NavBar, Input, Text, theme } from 'galio-framework';

import Icon from './Icon';
import materialTheme from '../constants/Theme';

const { height, width } = Dimensions.get('window');
const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);

const ChatButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('Pro')}>
    <Icon
      family="GalioExtra"
      size={16}
      name="chat-33"
      color={theme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
    <Block middle style={styles.notify} />
  </TouchableOpacity>
);

const BasketButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('Pro')}>
    <Icon
      family="GalioExtra"
      size={16}
      name="basket-simple"
      color={theme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
    <Block middle style={styles.notify} />
  </TouchableOpacity>
);

const SearchButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('Pro')}>
    <Icon
      size={16}
      family="entypo"
      name="magnifying-glass"
      color={theme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
  </TouchableOpacity>
);

class Header extends React.Component {
  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return (back ? navigation.goBack() : navigation.openDrawer());
  }

  
  renderSearch = () => {
    const { navigation } = this.props;
    return (
      <Input
        right
        color="black"
        style={styles.search}
        placeholder="What are you looking for?"
        onFocus={() => navigation.navigate('Pro')}
        iconContent={<Icon size={16} color={theme.COLORS.MUTED} name="magnifying-glass" family="entypo" />}
      />
    )
  }

  renderTabs = () => {
    const { navigation, tabTitleLeft, tabTitleRight } = this.props;

    return (
      <Block row style={styles.tabs}>
        <Button shadowless style={[styles.tab, styles.divider]} onPress={() => navigation.navigate('Pro')}>
          <Block row middle>
            <Icon name="grid" family="feather" style={{ paddingRight: 8 }} />
            <Text size={16} style={styles.tabTitle}>{tabTitleLeft || 'Categories'}</Text>
          </Block>
        </Button>
        <Button shadowless style={styles.tab} onPress={() => navigation.navigate('Pro')}>
          <Block row middle>
            <Icon size={16} name="camera-18" family="GalioExtra" style={{ paddingRight: 8 }} />
            <Text size={16} style={styles.tabTitle}>{tabTitleRight || 'Best Deals'}</Text>
          </Block>
        </Button>
      </Block>
    )
  }

  renderHeader = () => {
    const { search, tabs } = this.props;
    if (search || tabs) {
      return (
        <Block center>
          {search ? this.renderSearch() : null}
          {tabs ? this.renderTabs() : null}
        </Block>
      )
    }
    return null;
  }

  render() {
    const { back, title, white, transparent, navigation } = this.props;
    // const { routeName } = navigation.state;
    const noShadow = ["Search", "Categories", "Deals", "Pro", "Profile"].includes(title);
    const headerStyles = [
      !noShadow ? styles.shadow : null,
      transparent ? { backgroundColor: 'rgba(0,0,0,0)' } : null,
    ];

    return (
      <Block style={headerStyles}>
        <NavBar
          back={back}
          title={title}
          style={styles.navbar}
          transparent={transparent}
          rightStyle={{ alignItems: 'center' }}
          leftStyle={{ flex: 0.3, paddingTop: 2  }}
          leftIconName={(back ? 'chevron-left' : 'navicon')}
          leftIconColor={"#FFF"}
          titleStyle={[
            styles.title,
            {color: "#FFF"},
          ]}
          onLeftPress={this.handleLeftPress}
        />
        {this.renderHeader()}
      </Block>
    );
  }
}

export default withNavigation(Header);

const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: 'relative',
  },
  title: {
    width: '100%',
    fontSize: 18,
    fontWeight: 'bold',
  },
  navbar: {
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 2 : 0,
    zIndex: 5,
    backgroundColor: "#0ab6ff"
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  notify: {
    backgroundColor: materialTheme.COLORS.LABEL,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: 'absolute',
    top: 8,
    right: 8,
  },
  header: {
    backgroundColor: "#0ab6ff",
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
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
})