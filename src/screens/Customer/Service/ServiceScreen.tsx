import React, {useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Linking,
  FlatList,
} from 'react-native';

import Spacer from '../../../components/common/Spacer';
import ServiceButton from '../../../components/ServiceButton';

import {globalColors} from '../../../styles/globalVariables';

import {useService} from '../../../hooks/useService';
import {PermissionContext} from '../../../context/PermissionsContext';

const ServiceScreen = () => {
  const {services, isLoading, getServices} = useService();

  useEffect(() => {
    getServices();
  }, []);

  const handleClickAdd = () => {
    Linking.openURL('https://mastergas23.com/');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.containerAdd} onPress={handleClickAdd}>
        <Image
          source={require('../../../../assets/Logo.png')}
          style={styles.imageLogo}
        />
        <Text style={styles.textCompany}>Visita nuestra página</Text>
      </TouchableOpacity>

      <Spacer />
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          style={styles.containerList}
          data={services}
          renderItem={({item}) => (
            <ServiceButton
              name={item.name}
              description={item.description}
              image={item.image}
              id={item._id}
              price={item.price}
              type={item.type}
            />
          )}
          keyExtractor={item => item._id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  containerAdd: {
    backgroundColor: globalColors.principalColor,
    borderRadius: 10,
    width: '100%',
    height: '30%',
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  imageLogo: {
    width: '50%',
    resizeMode: 'stretch',
    height: '100%',
  },
  textCompany: {
    color: 'white',
    fontSize: Dimensions.get('window').width * 0.05,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '45%',
  },
  containerList: {
    flex: 2,
    width: '100%',
  },
});

export default ServiceScreen;
