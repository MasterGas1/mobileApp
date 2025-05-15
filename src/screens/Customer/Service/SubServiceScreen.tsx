import {useEffect, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Dimensions,
  RefreshControl,
  Image,
} from 'react-native';

import ServiceButton from '../../../components/service/ServiceButton';

import {RootStackParams} from '../../../navigation/Customer/ServiceStackNavigator';
import {useService} from '../../../hooks/useService';

import {globalColors} from '../../../styles/globalVariables';
import ServiceInformationModal from '../../../components/service/ServiceInformationModal';
import {ServiceInterface} from '../../../interface/serviceInterface';
import {relativeFontSize} from '../../../helper/relativeFontSize';

type Props = StackScreenProps<RootStackParams, 'SubServiceScreen'>;

const SubServiceScreen = ({route, navigation}: Props) => {
  const {isLoading, services, getAllSubservices} = useService();
  const [selectedService, setSelectedService] = useState<ServiceInterface>();
  const [showInfoService, setShowInfoService] = useState(false);

  const {name, id, description, image} = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: name,
    });

    getAllSubservices(id);
  }, [name]);

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
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 10,
        }}>
        <Image source={{uri: image}} style={styles.image} />
        <View
          style={{
            marginLeft: 10,
          }}>
          <Text
            style={{
              color: globalColors.principalColor,
              fontWeight: 'bold',
              fontSize: relativeFontSize(17),
            }}>
            Descripción:{' '}
          </Text>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>
      </View>

      <View
        style={{
          borderBottomColor: globalColors.secondaryColor,
          borderBottomWidth: 2,
          marginBottom: 10,
        }}
      />

      <Text style={styles.textTitle}>Servicios</Text>
      {isLoading ? (
        <ActivityIndicator size={'large'} color={globalColors.principalColor} />
      ) : (
        <FlatList
          style={styles.containerList}
          data={services}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => getAllSubservices(id)}
            />
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
                if (item.type === 'price') {
                  setShowInfoService(true);
                  setSelectedService(item);
                }
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
    padding: 20,
  },
  descriptionText: {
    color: globalColors.secondaryColor,
    width: '100%',
    fontSize: relativeFontSize(15),
    marginBottom: 10,
    fontWeight: '500',
  },
  containerList: {
    flex: 1,
    width: '100%',
  },
  image: {
    width: Dimensions.get('window').width * 0.23,
    height: Dimensions.get('window').width * 0.23,
    resizeMode: 'stretch',
    borderRadius: 10,
  },
  textTitle: {
    marginTop: 10,
    fontSize: relativeFontSize(23),
    fontWeight: '500',
    color: globalColors.principalColor,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
});

export default SubServiceScreen;
