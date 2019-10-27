import React from 'react';
import { View } from 'react-native';

interface Props {
  height?: number
}

export default (props: Props) => {
  const { height = 15 } = props;

  return (
    <View style={{ height }}></View>
  );
}