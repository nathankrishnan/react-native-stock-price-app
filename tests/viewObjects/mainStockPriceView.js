import { findElement, tapElement, setValueOnElement } from "../utils/elementActions"

export default class MainStockPriceView {
	selectors = {
		stockNameText: "~stockNameText",
		stockPriceText: "~stockPriceText",
		stockChangeValueText: "~stockChangeValueText",
		stockTickerSymbolSearchInput: "~stockTickerSymbolSearchInput",
		stockTickerSymbolSearchBtn: "~stockTickerSymbolSearchBtn"
	}

	constructor(driver) {
		this.driver = driver;
	}

	async getStockName() {
		const stockName = await findElement(this.driver, this.selectors.stockNameText);
		return stockName.getText();
	}

	async getStockPrice() {
		const stockPrice = await findElement(this.driver, this.selectors.stockPriceText);
		return stockPrice.getText();
	}

	async getChangeValue() {
		const changeValue = await findElement(this.driver, this.selectors.stockChangeValueText);
		return changeValue.getText();
	}

	async setStockTickerSymbol(stockTickerSymbolString) {
		await setValueOnElement(this.driver, this.selectors.stockTickerSymbolSearchInput, stockTickerSymbolString);
	}

	async tapSearchBtn() {
		await tapElement(this.driver, this.selectors.stockTickerSymbolSearchBtn);
	}
}