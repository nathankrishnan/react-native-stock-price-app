import { strict as assert } from 'assert';
import { remote } from 'webdriverio';
import TestConfig from './utils/testConfig';
import MainStockPriceView from './viewObjects/mainStockPriceView';

const targetPlatforms = [TestConfig.iosBaseCapabilities(), TestConfig.androidBaseCapabilities()];

targetPlatforms.forEach(function(platform) {
	describe(`Stock Price ${platform.capabilities.platformName} App Test`, function() {
		let driver;
		// Allow the entire test suite to take up to 60 seconds max to execute
		this.timeout(60000);
	
		beforeEach(async function() {
			const testOptions = platform;
			driver = await remote(testOptions);
		});
	
		it('Get the stock price of Twitter', async function() {
			const StockPriceView = new MainStockPriceView(driver);
			await StockPriceView.setStockTickerSymbol("TWTR");
			await StockPriceView.tapSearchBtn();
	
			const stockName = await StockPriceView.getStockName();
			const stockPrice = await StockPriceView.getStockPrice();
			const stockPriceChangeValue = await StockPriceView.getChangeValue();
	
			assert.equal(stockName, "Twitter, Inc.");
			assert.equal(typeof parseFloat(stockPrice), "number");
			assert.equal(typeof stockPriceChangeValue, "string");	
		});
	
		afterEach(async function() {
			await driver.deleteSession();
		});
	});
});


