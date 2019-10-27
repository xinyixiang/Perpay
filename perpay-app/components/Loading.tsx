import LottieView from 'lottie-react-native'
import React, { memo } from 'react';
import { View } from 'react-native';
import { Portal, Modal } from 'react-native-paper';
import app from '../models/app';

export default memo(() => {
  const [appState] = app.useStore();
  const { isLoading } = appState;

  return (
    <Portal>
      <Modal visible={isLoading} dismissable={false}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, .15)',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <LottieView
            style={{
              width: 120,
              height: 120
            }}
            autoPlay={true}
            source={require('../assets/lottie/loading.json')}
          />
        </View>
      </Modal>
    </Portal>
  )
})
