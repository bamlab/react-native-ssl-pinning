import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { SSLPinningViewProps } from './SSLPinning.types';

const NativeView: React.ComponentType<SSLPinningViewProps> =
  requireNativeViewManager('SSLPinning');

export default function SSLPinningView(props: SSLPinningViewProps) {
  return <NativeView {...props} />;
}
