import {Dimensions} from 'react-native';

const {width: windowWidth} = Dimensions.get('window');

export const relativeFontSize = (fontSize: number) => {
  return fontSize * (windowWidth / 375);
};
