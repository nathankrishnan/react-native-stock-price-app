import React from 'react';
import { ImageBackground, StyleSheet, Text, View, StatusBar} from 'react-native';

import SearchBar from './components/SearchBar';
import fetchStockPrice from './utils/fetchStockPrice';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
      stockName: '',
      stockPrice: 0,
      changeType: '+',
      changeValue: 0,
    }
  }

  handleFetchStockPrice = async (stockTickerSymbol) => {
    if (stockTickerSymbol) {
      this.setState({
        loading: true
      }, async () => {
        try {
          const { changeType, changeValue, stockName, stockPrice } = await fetchStockPrice(stockTickerSymbol);

          this.setState({
            error: false,
            loading: false,
            stockName,
            stockPrice,
            changeType,
            changeValue
          });
        } catch (e) {
          this.setState({
            error: true,
            loading: false
          });
        }
      });
    } else {
      return;
    }
  }

  componentDidMount() {
    this.handleFetchStockPrice('TSLA')
  }

  render() {
    const {
      loading,
      error,
      stockName,
      stockPrice,
      changeType,
      changeValue
    } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ImageBackground 
          source={require('./assets/background.png')}
          style={styles.imageContainer}
          imageStyle={styles.image}
        >
          <View style={styles.detailsContainer}>
            <Text style={[styles.mediumText, styles.textStyle]}>{stockName}</Text>
            <Text style={[styles.largeText, styles.textStyle]}>{stockPrice}</Text>
            <View style={[styles.rectangleShapeContainer, changeType === "+" ? styles.positiveChange : styles.negativeChange]}>
              <Text style={[styles.smallText, styles.textStyle]}>{changeValue}</Text>
            </View>

            <SearchBar 
              placeholderTextInputLabelText="Search (e.g. AAPL)" 
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
  positiveChange: {
    backgroundColor: 'green',
  },
  negativeChange: {
    backgroundColor: 'red',
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
