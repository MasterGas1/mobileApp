import React, {useContext, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {globalColors} from '../../../styles/globalVariables';
import CustomOption from '../../../components/CustomOption';

import {Context as AuthContext} from '../../../context/AuthContext';
import {relativeFontSize} from '../../../helper/relativeFontSize';

const ProfileScreen = () => {
  const {
    signout,
    state: {user},
  } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <View style={styles.profileSection}>
        <Image
          source={{
            uri: user.picture,
          }}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editIconContainer}>
          <Ionicons name="pencil-outline" size={25} color={'white'} />
        </TouchableOpacity>
        <Text style={styles.profileName}>
          {user.name.split(' ')[0]} {user.lastName.split(' ')[0]}
        </Text>
      </View>
      <View style={styles.optionsSection}>
        <CustomOption
          icon="pencil-outline"
          text="Editar perfil"
          onPress={() => {}}
        />
        <CustomOption icon="key" text="Cambiar contraseña" onPress={() => {}} />
        <CustomOption icon="exit" text="Cerrar sesión" onPress={signout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: '30%',
    backgroundColor: globalColors.principalColor,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: -75,
  },
  profileImage: {
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').width * 0.4,
    borderRadius: Dimensions.get('window').width * 0.2,
    borderWidth: 4,
    borderColor: 'white',
  },
  editIconContainer: {
    width: Dimensions.get('window').width * 0.08,
    height: Dimensions.get('window').width * 0.08,
    position: 'absolute',
    right: '35%',
    top: '65%',
    backgroundColor: '#004d40',
    borderRadius: 50,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileName: {
    marginTop: 10,
    fontSize: relativeFontSize(25),
    fontWeight: 'bold',
    color: '#004d40',
  },
  optionsSection: {
    marginTop: 30,
    marginHorizontal: 20,
  },
});

export default ProfileScreen;
