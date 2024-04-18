import { useEffect } from 'react'
import {StackScreenProps } from '@react-navigation/stack'
import { View, Text, ActivityIndicator, FlatList, StyleSheet, Dimensions } from 'react-native'

import ServiceButton from '../../../components/ServiceButton'

import { RootStackParams } from '../../../navigation/Customer/ServiceStackNavigator'
import { useService } from '../../../hooks/useService'

import { globalColors } from '../../../styles/globalVariables'

type Props = StackScreenProps<RootStackParams, 'SubServiceScreen'>

const SubServiceScreen = ({route, navigation}:Props) => {

  const {isLoading, services, getAllSubservices} = useService();

  const {name,id, description} = route.params;

  useEffect(() => {
    navigation.setOptions({
        title: name
    })

    getAllSubservices(id);
  },[name])

  return (
    <View style={styles.container}>
      <Text style={styles.descriptionText}>{description}</Text>
        {
          isLoading
          ? <ActivityIndicator size={'large'} color={globalColors.principalColor}/>
          : <FlatList
              style={styles.containerList}
              data={services}
              renderItem={({item}) => <ServiceButton
                name={item.name}
                description={item.description}
                image={item.image}
                id={item._id}
                price={item.price}
              />}
              keyExtractor={item => item._id}
            />
        }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  descriptionText: {
    color: globalColors.secondaryColor,
    width: "100%",
    fontSize: Dimensions.get('window').width * 0.045,
    marginBottom: 10,
    fontWeight: '500',
  },
  containerList: {
    flex: 1,
    width: '100%'
  }
})

export default SubServiceScreen