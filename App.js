import React from 'react';
import { 
  ImageBackground, 
  StyleSheet, 
  Text, 
  View, 
  StatusBar,
  ActivityIndicator
} from 'react-native';

import StockView from './components/StockView';
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
            stockName: stockName,
            stockPrice: stockPrice,
            changeType: changeType,
            changeValue: changeValue
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
            <ActivityIndicator
              animating={loading}
              color="#007AFF"
              size="large"
            />

            {!loading && error &&
              <Text style={[styles.smallText, styles.textStyle]}>
                Could not load the stock price, please try again.
              </Text>
            }

            {!loading && !error &&
              <StockView 
                stockName={stockName}
                stockPrice={stockPrice}
                changeType={changeType}
                changeValue={changeValue}
                onSubmit={this.handleFetchStockPrice}
              />
            }
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  textStyle: {
    fontFamily: 'AvenirNext-Regular',
    textAlign: 'center',
    color: 'white',
  },
  smallText: {
    fontSize: 25,
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
