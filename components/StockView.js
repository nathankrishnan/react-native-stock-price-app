import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import SearchBar from './SearchBar';

export default function StockView(props) {
	return (
		<View>
			<Text style={[styles.mediumText, styles.textStyle]}>{props.stockName}</Text>
			<Text style={[styles.largeText, styles.textStyle]}>{props.stockPrice}</Text>
			<View style={[styles.rectangleShapeContainer, props.changeType === "+" ? styles.positiveChange : styles.negativeChange]}>
				<Text style={[styles.smallText, styles.textStyle]}>{props.changeValue}</Text>
			</View>
			<SearchBar 
				placeholderTextInputLabelText="Search (e.g. AAPL)" 
				onSubmit={props.onSubmit}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
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
});