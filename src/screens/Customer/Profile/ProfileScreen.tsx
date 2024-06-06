import React, { useContext } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { StyleSheet, Text, View, Image, TouchableOpacity, } from 'react-native'

import { globalColors } from '../../../styles/globalVariables'
import CustomOption from '../../../components/CustomOption';

import { Context as AuthContext } from '../../../context/AuthContext';

const ProfileScreen = () => {

  const { signout } = useContext(AuthContext)

  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://avatarfiles.alphacoders.com/693/thumb-1920-69306.jpg' }} // Reemplaza con la URL de la imagen de perfil
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editIconContainer}>
          <Ionicons name="pencil-outline" size={25} color={'white'} />
        </TouchableOpacity>
        <Text style={styles.profileName}>Adela Micha</Text>
      </View>
      <View style={styles.optionsSection}>
        <CustomOption icon="pencil-outline" text="Editar perfil" onPress={() => {}}/>
        <CustomOption icon="key" text="Cambiar contraseña"  onPress={() => {}}/>
        <CustomOption icon="exit" text="Cerrar sesión"  onPress={signout}/>
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
    height: "30%",
    backgroundColor: globalColors.principalColor,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: -75,
  },
  profileImage: {
    width: 160,
    height: 160,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: 'white',
  },
  editIconContainer: {
    position: 'absolute',
    right: 130,
    bottom: 40,
    backgroundColor: '#004d40',
    borderRadius: 50,
    padding: 5,
  },
  profileName: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004d40',
  },
  optionsSection: {
    marginTop: 30,
    marginHorizontal: 20,
  },
});


export default ProfileScreen