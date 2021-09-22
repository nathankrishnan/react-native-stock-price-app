import { Platform } from 'react-native';

const addTestIdentifiers = (idName) => {
	return Platform.OS === 'android'
    ? { accessibilityLabel: idName }
    : { testID: idName }
};

export default addTestIdentifiers;