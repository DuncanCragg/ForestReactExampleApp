import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Forest from 'forest-react';

// ------------------------------------

class Min extends Forest {
  render(){
    return(
      <View>
        <View>
          <View>
            {this.Button('inc', {label: 'Increment', style: stylesMin.touchableText})}
            <Text style={stylesMin.touchableText}>
              Count: {this.object('counter')}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const uids = Forest.cacheObjects(
  [{ Evaluator: evalMin,
     is: 'minimal',
     counter: 17,
  }]
);

function mergeObjects(a, ...b){ // ReactNative breaks the spec
  return Object.assign(a, ...(b.map(x => x || {})));
}

function evalMin(object){
  const incrementPushed  = !object('inc') && object('userState.inc');
  return mergeObjects({},
    incrementPushed         && { counter: object('counter') + 1 },
    true                    && { inc: object('userState.inc') },
  );
}

export default class App extends Component {
  render() {
    return (
      <View style={stylesOuter.app}>
        <View style={stylesOuter.appHeader}>
          <Min uid={uids[0]} />
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
