import * as React from 'react';

import { SSLPinningViewProps } from './SSLPinning.types';

export default function SSLPinningView(props: SSLPinningViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
