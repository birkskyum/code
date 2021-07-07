import React, { FC } from 'react'

import { SvgIcon, SvgIconProps } from '@material-ui/core'

export const SettingsIcon: FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <svg
      width="20"
      height="22"
      viewBox="1 0 12 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="14" height="15.1667" fill="url(#pattern0)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0"
            transform="translate(-0.0416667) scale(0.00506231 0.0046729)"
          />
        </pattern>
        <image
          id="image0"
          width="214"
          height="214"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  </SvgIcon>
)