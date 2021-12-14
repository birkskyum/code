import React, { FC } from 'react'

import { SvgIcon, SvgIconProps } from '@material-ui/core'

export const AddEmojiIcon: FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.09091 9.95455C7.09091 9.27545 7.63909 8.72727 8.31818 8.72727C8.99727 8.72727 9.54545 9.27545 9.54545 9.95455C9.54545 10.6336 8.99727 11.1818 8.31818 11.1818C7.63909 11.1818 7.09091 10.6336 7.09091 9.95455ZM11.1818 16.5C13.0882 16.5 14.7082 15.3055 15.3627 13.6364H7.00091C7.65545 15.3055 9.27546 16.5 11.1818 16.5ZM14.0455 11.1818C14.7245 11.1818 15.2727 10.6336 15.2727 9.95455C15.2727 9.27545 14.7245 8.72727 14.0455 8.72727C13.3664 8.72727 12.8182 9.27545 12.8182 9.95455C12.8182 10.6336 13.3664 11.1818 14.0455 11.1818ZM19.3636 3H17.7273V4.63636H16.0909V6.27273H17.7273V7.90909H19.3636V6.27273H21V4.63636H19.3636V3ZM17.7273 12C17.7273 15.6164 14.7982 18.5455 11.1818 18.5455C7.56545 18.5455 4.63636 15.6164 4.63636 12C4.63636 8.38364 7.56545 5.45455 11.1818 5.45455C12.3764 5.45455 13.4891 5.78182 14.4545 6.33818V4.50545C13.4206 4.05077 12.3032 3.81669 11.1736 3.81818C6.65727 3.81818 3 7.48364 3 12C3 16.5164 6.65727 20.1818 11.1736 20.1818C15.6982 20.1818 19.3636 16.5164 19.3636 12C19.3636 11.1409 19.2245 10.3227 18.9791 9.54545H17.2364C17.5473 10.3064 17.7273 11.1327 17.7273 12Z"
        fill="#929292"
      />
    </svg>
  </SvgIcon>
)
