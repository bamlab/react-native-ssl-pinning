import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to SSLPinning.web.ts
// and on native platforms to SSLPinning.ts
import SSLPinningModule from './SSLPinningModule';
import SSLPinningView from './SSLPinningView';
import { ChangeEventPayload, SSLPinningViewProps } from './SSLPinning.types';

// Get the native constant value.
export const PI = SSLPinningModule.PI;

export function hello(): string {
  return SSLPinningModule.hello();
}

export async function setValueAsync(value: string) {
  return await SSLPinningModule.setValueAsync(value);
}

const emitter = new EventEmitter(SSLPinningModule ?? NativeModulesProxy.SSLPinning);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { SSLPinningView, SSLPinningViewProps, ChangeEventPayload };
