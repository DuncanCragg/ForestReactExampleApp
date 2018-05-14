import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Forest from 'forest-react';

// ------------------------------------

function renderMin(state, userState){
  return(
    <View>
      <View>
        <View>
          {userState.Button('inc', {label: 'Increment', style: stylesMin.touchableText})}
          <Text style={stylesMin.touchableText}>
            Count: {state('counter')}
          </Text>
        </View>
      </View>
    </View>
  );
}

function mergeObjects(a, b, c){ // ReactNative breaks the spec
  return Object.assign(a, b || {}, c || {});
}

function evalMin(state){
  const incrementPushed  = !state('inc') && state('userState.inc');
  return mergeObjects({},
    incrementPushed         && { counter: state('counter') + 1 },
    true                    && { inc: state('userState.inc') },
  );
}

const renderers = {
  'minimal': renderMin
};

const ForestApp = Forest.storeObjectsInComponent(
  [{ evaluate: evalMin,
     is: 'minimal',
     counter: 17,
  }],
  renderers
);

export default class App extends Component {
  render() {
    return (
      <View style={stylesOuter.app}>
        <View style={stylesOuter.appHeader}>
          {ForestApp}
        </View>
      </View>
    )
  }
}

const stylesMin = StyleSheet.create({
  touchableText: {
    borderRadius: 8,
    padding: 5,
    borderWidth: 1,
    borderColor: 'black',
    color: '#007AFF',
    borderStyle: 'solid',
    textAlign: 'center'
  }
});

const stylesOuter = StyleSheet.create({
  app: {
    flex: 1
  },
  appHeader: {
    flex: 1,
    backgroundColor: '#222',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  appTitle: {
    fontSize: 16,
    color: 'white'
  },
  appIntro: {
    flex: 2,
    fontSize: 30,
    textAlign: 'center'
  }
})
