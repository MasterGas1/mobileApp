import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

import {globalColors} from '../../styles/globalVariables';
import {RootStackParams} from '../../navigation/Customer/ServiceStackNavigator';
import {relativeFontSize} from '../../helper/relativeFontSize';

interface ServiceButtonProps {
  name: string;
  description: string;
  image: string;
  id: string;
  price?: number;
  type: string;
  openModalServiceInformation: () => void;
}

type ServiceScreenNavigationProp = StackNavigationProp<
  RootStackParams,
  'ServiceScreen'
>;

const ServiceButton = ({
  name,
  description,
  image,
  id,
  price,
  type,
  openModalServiceInformation,
}: ServiceButtonProps) => {
  const navigation = useNavigation<ServiceScreenNavigationProp>();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        if (type === 'root service' || type === 'subservice') {
          navigation.push('SubServiceScreen', {
            name,
            id,
            description,
            price,
            image,
          });
        } else {
          openModalServiceInformation!();
          // navigation.navigate('DirectionScreen', {serviceId: id});
        }
      }}>
      <View style={styles.imageContainer}>
        <Image source={{uri: image}} style={styles.image} />
      </View>
      <View>
        <Text style={styles.nameText} numberOfLines={2}>
          {name}
        </Text>
        {type === 'price' || type === 'root service price' ? (
          <Text style={styles.priceText}>${price}</Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height * 0.15,
    width: '100%',
    borderRadius: 10,
    borderColor: globalColors.principalColor,
    borderWidth: relativeFontSize(1),
    padding: 10,
    flexDirection: 'row',
    marginBottom: 10,
  },
  nameText: {
    color: globalColors.principalColor,
    fontWeight: '600',
    fontSize: Dimensions.get('window').width * 0.04,
    width: relativeFontSize(200),
  },
  priceText: {
    color: globalColors.secondaryColor,
    width: relativeFontSize(200),
    fontWeight: '500',
    fontSize: Dimensions.get('window').width * 0.04,
    marginTop: Dimensions.get('window').height * 0.04,
  },
  image: {
    width: Dimensions.get('window').width * 0.23,
    height: Dimensions.get('window').width * 0.23,
    resizeMode: 'stretch',
    backgroundColor: 'white',
    borderRadius: 10,
    marginRight: 10,
  },
  imageContainer: {
    width: '30%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ServiceButton;
