/* eslint-disable react-hooks/exhaustive-deps */

import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';

import RequestIntallerButton from '../../../components/RequestIntallerButton';
import ModalRequestInfo from '../../../components/ModalRequestInfo';
import BottonModalOrder from '../../../components/BottonModalOrder';
import OrderInProgress from '../../../components/common/OrderInProgress';

import {useRquest} from '../../../hooks/useRequest';

import {Context as SocketContext} from '../../../context/SocketContext';
import {Context as OrderContext} from '../../../context/OrderContext';

import {ResponseCreateRequestInterface} from '../../../interface/requestInterface';
import {OrderResponseInterface} from '../../../interface/orderInterface';

const RequestsScreen = () => {
  const {
    state: {socket},
  } = useContext(SocketContext);

  const {
    state: {order: orderGlobal},
  } = useContext(OrderContext);

  const [visible, setVisible] = useState(false);
  const [visibleOrder, setVisibleOrder] = useState(false);
  const [order, setOrder] = useState<OrderResponseInterface>();

  const {request, requestSelected, addRequest, getOneRequest, clearRequest} =
    useRquest();

  const acceptRequest = () => {
    if (socket) {
      socket.emit('accept-request', {
        requestId: requestSelected?._id,
        userId: requestSelected?.installerId._id,
      });
      setVisible(false);
    }
  };

  useEffect(() => {
    if (socket && socket.socket?.id) {
      socket.on(socket.socket.id, (data: ResponseCreateRequestInterface) => {
        addRequest(data);
      });
    }
  }, [socket?.socket?.connected]);

  useEffect(() => {
    if (socket && requestSelected) {
      socket.on(
        `request-accepted-${requestSelected._id}`,
        (data: OrderResponseInterface) => {
          setVisibleOrder(true);
          setOrder(data);
        },
      );
    }
  }, [socket?.socket?.connected, requestSelected]);

  return (
    <View style={styles.container}>
      {orderGlobal && <OrderInProgress onPress={() => setVisibleOrder(true)} />}

      <FlatList
        data={request}
        renderItem={({item}) => (
          <RequestIntallerButton
            name={item.customerId.name + ' ' + item.customerId.lastName}
            service={item.serviceId.name}
            srcImage={item.customerId.picture}
            onPress={() => {
              getOneRequest(item._id);
              setVisible(true);
            }}
          />
        )}
      />
      <ModalRequestInfo
        visible={visible}
        setVisible={setVisible}
        request={requestSelected}
        acceptRequest={acceptRequest}
      />

      <BottonModalOrder
        visible={visibleOrder}
        order={order}
        closeModal={() => {
          setVisibleOrder(false);
          setOrder(undefined);
        }}
      />
    </View>
  );
};

export default RequestsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
  },
});
