import React from 'react';
import { ImageBackground, StyleSheet, Text, View, StatusBar} from 'react-native';

import SearchBar from './components/SearchBar';

export default class App extends React.Component {

  handleFetchStockPrice = () => {

  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ImageBackground 
          source={require('./assets/background.png')}
          style={styles.imageContainer}
          imageStyle={styles.image}
        >
          <View style={styles.detailsContainer}>
            <Text style={[styles.mediumText, styles.textStyle]}>Tesla, Inc</Text>
            <Text style={[styles.largeText, styles.textStyle]}>754.86</Text>
            <View style={styles.rectangleShapeContainer}>
              <Text style={[styles.smallText, styles.textStyle]}>+0.98</Text>
            </View>

            <SearchBar 
              placeholderTextInputLabelText="Enter a stock ticker symbol (e.g. AAPL)" 
              onSubmit={this.handleFetchStockPrice}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textStyle: {
    fontFamily: 'AvenirNext-Regular',
    textAlign: 'center',
    color: 'white',
  },
  largeText: {
    fontSize: 45,
  },
  mediumText: {
    fontSize: 35,
  },
  smallText: {
    fontSize: 25,
  },
  rectangleShapeContainer: {
    marginTop: 5,
    marginHorizontal: 160,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  }
});
