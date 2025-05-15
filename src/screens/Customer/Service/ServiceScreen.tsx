import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Linking,
  FlatList,
  RefreshControl,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

import Spacer from '../../../components/common/Spacer';
import ServiceButton from '../../../components/service/ServiceButton';
import ServiceInformationModal from '../../../components/service/ServiceInformationModal';

import {globalColors} from '../../../styles/globalVariables';

import {useService} from '../../../hooks/useService';

import {relativeFontSize} from '../../../helper/relativeFontSize';

import {ServiceInterface} from '../../../interface/serviceInterface';

import {RootStackParams} from '../../../navigation/Customer/ServiceStackNavigator';

type ServiceScreenNavigationProp = StackNavigationProp<
  RootStackParams,
  'ServiceScreen'
>;

const ServiceScreen = () => {
  const {services, isLoading, getServices} = useService();
  const [showInfoService, setShowInfoService] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceInterface>();

  const navigation = useNavigation<ServiceScreenNavigationProp>();

  useEffect(() => {
    getServices();
  }, []);

  const handleClickAdd = () => {
    Linking.openURL('https://mastergas23.com/');
  };

  return (
    <View style={styles.container}>
      <ServiceInformationModal
        service={selectedService}
        visible={showInfoService}
        onChangeVisible={() => setShowInfoService(false)}
        onHandleAccept={() => {
          setShowInfoService(false);
          navigation.navigate('DirectionScreen', {
            serviceId: selectedService!._id,
          });
        }}
      />
      <TouchableOpacity style={styles.containerAdd} onPress={handleClickAdd}>
        <Image
          source={require('../../../../assets/Logo.png')}
          style={styles.imageLogo}
        />
        <Text style={styles.textCompany}>Visita nuestra página</Text>
      </TouchableOpacity>

      <Text style={styles.textTitle}>Servicios</Text>

      <Spacer />
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          style={styles.containerList}
          data={services}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={getServices} />
          }
          renderItem={({item}) => (
            <ServiceButton
              name={item.name}
              description={item.description}
              image={item.image}
              id={item._id}
              price={item.price}
              type={item.type}
              openModalServiceInformation={() => {
                setSelectedService(item);
                setShowInfoService(true);
              }}
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
    width: Dimensions.get('window').width * 0.35,
    height: Dimensions.get('window').width * 0.35,
    resizeMode: 'stretch',
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
    marginTop: -10,
  },
  textTitle: {
    marginTop: 35,
    fontSize: relativeFontSize(24),
    fontWeight: '500',
    color: globalColors.principalColor,
    alignSelf: 'flex-start',
  },
});

export default ServiceScreen;
