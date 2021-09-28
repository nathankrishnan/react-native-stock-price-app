// Wait up to 5 seconds
const MAX_ELEMENT_WAIT_THRESHOLD_MS = 5000;

async function findElement(driver, elementSelector, timeout = MAX_ELEMENT_WAIT_THRESHOLD_MS) {
	const element = await driver.$(elementSelector);
	await element.waitForExist({ timeout });
	return element;
}

async function tapElement(driver, elementSelector, timeout = MAX_ELEMENT_WAIT_THRESHOLD_MS) {
	const element = await findElement(driver, elementSelector, timeout);
	return element.click();
}

async function setValueOnElement(driver, elementSelector, value, timeout = MAX_ELEMENT_WAIT_THRESHOLD_MS) {
	const element = await findElement(driver, elementSelector, timeout);
	await element.setValue(value);
}

export { findElement, tapElement, setValueOnElement};