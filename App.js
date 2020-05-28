/*!

 =========================================================
 * Material Kit React Native - v1.4.0
 =========================================================
 * Product Page: https://demos.creative-tim.com/material-kit-react-native/
 * Copyright 2019 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/material-kit-react-native/blob/master/LICENSE)
 =========================================================
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React, { useEffect, useState } from 'react';
import { Platform, StatusBar, Image } from 'react-native';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import { Block, GalioProvider } from 'galio-framework';
import FlashMessage from "react-native-flash-message";
import { Linking } from "expo";


import { Images, products, historialP, materialTheme } from './constants/';

import { NavigationContainer, useLinking } from '@react-navigation/native';
import Screens from './navigation/Screens';

// Before rendering any navigation stack
import { enableScreens } from 'react-native-screens';
enableScreens();

// cache app images
const assetImages = [
  Images.Pro,
  Images.Profile,
  Images.Avatar,
  Images.Onboarding,
];

const prefix = Linking.makeUrl("/");
// cache product images
products.map(product => assetImages.push(product.image));
historialP.map(product => assetImages.push(product.image));

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

const App = (props) =>{
  const ref = React.useRef();

  console.log(prefix)
  global.isLogged = false;
  const [isLoadingComplete, setisLoadingComplete] = useState(false);
  const [apiResponse, setapiResponse] = useState('');

  const { getInitialState } = useLinking(ref, {
    prefixes: [prefix],
    config: {
      Confirm: "confirm",
      FAQ: "FAQ"
    }
  });
  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();

  useEffect(()=>{
    fetch("http://localhost:9000/testAPI")
        .then(res=> res.text())
        .then(res=> setapiResponse( res ))
        .catch(err => err);
    
    getInitialState()
        .catch(() => {})
        .then(state => {
          if (state !== undefined) {
            setInitialState(state);
          }

          setIsReady(true);
        });
  },[[getInitialState]])

  if (!isReady) {
    return null;
  }

  const _loadResourcesAsync = async () => {
    return Promise.all([
      ...cacheImages(assetImages),
    ]);
  };

  const _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  const _handleFinishLoading = () => {
    setisLoadingComplete(true);
  };


  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={_loadResourcesAsync}
        onError={_handleLoadingError}
        onFinish={_handleFinishLoading}
      />
    );
  } else {
    return (
      <NavigationContainer initialState={initialState} ref={ref}>
        <GalioProvider theme={materialTheme}>
          <Block flex>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <Screens />
          </Block>
        </GalioProvider>
        <FlashMessage position="top" />
      </NavigationContainer>
    );
  }
}

export default App;