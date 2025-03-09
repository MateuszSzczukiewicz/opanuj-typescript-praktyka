import React from 'react';

export function fixedForwardRef(render: (props: any, ref: any) => React.ReactNode) {
  return React.forwardRef(render);
}
