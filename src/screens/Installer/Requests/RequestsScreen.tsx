import React, { createRef, useContext, useEffect } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'

import RequestIntallerButton from '../../../components/RequestIntallerButton'

import { useRquest } from '../../../hooks/useRequest'

import { Context as SocketContext } from '../../../context/SocketContext'
import { Context as AuthContext } from '../../../context/AuthContext'

import { ResponseCreateRequestInterface } from '../../../interface/requestInterface'

const RequestsScreen = () => {

  
  const {state: {socket}, state} = useContext(SocketContext)
  const {state: {user}} = useContext(AuthContext)
  
  const {request, addRequest} = useRquest()

  useEffect(() => {
    if (socket) {
      socket.on("responseRequest-"+user._id, (data: ResponseCreateRequestInterface) => {
        addRequest(data)
      })
    }
  },[state])

  return (
    <View
      style={styles.container}
    >
        <FlatList
            data={request}
            renderItem={({item}) => <RequestIntallerButton
                name={item.customerId.name + ' ' + item.customerId.lastName}
                service={item.serviceId.name}
                srcImage={item.customerId.picture}
            />}
        />
    </View>
  )
}

export default RequestsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    }
})