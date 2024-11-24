/* eslint-disable react-hooks/exhaustive-deps */

import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';

import RequestIntallerButton from '../../../components/RequestIntallerButton';

import {useRquest} from '../../../hooks/useRequest';

import {Context as SocketContext} from '../../../context/SocketContext';
import {Context as AuthContext} from '../../../context/AuthContext';

import {ResponseCreateRequestInterface} from '../../../interface/requestInterface';
import ModalRequestInfo from '../../../components/ModalRequestInfo';

const RequestsScreen = () => {
  const {
    state: {socket},
  } = useContext(SocketContext);

  const [visible, setVisible] = useState(false);

  const {request, addRequest} = useRquest();

  useEffect(() => {
    if (socket && socket.socket?.id) {
      socket?.on(socket.socket.id, (data: ResponseCreateRequestInterface) => {
        addRequest(data);
      });
    }
  }, [socket?.socket?.connected]);

  return (
    <View style={styles.container}>
      <FlatList
        data={request}
        renderItem={({item}) => (
          <RequestIntallerButton
            name={item.customerId.name + ' ' + item.customerId.lastName}
            service={item.serviceId.name}
            srcImage={item.customerId.picture}
            onPress={() => setVisible(true)}
          />
        )}
      />
      <ModalRequestInfo visible={visible} setVisible={setVisible} />
    </View>
  );
};

export default RequestsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
