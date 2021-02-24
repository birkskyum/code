import React, { FC } from 'react'
import Tabs from 'src/components/util/tabs/'

export const MenuSection: FC = () => {
  const [value, setValue] = React.useState(0)
  const tabLabels = ['forum', 'activities', 'members']

  const handleChange = (event: React.ChangeEvent<any>, newValue: any) => {
    setValue(newValue)
    console.log('menu section: ', newValue)
  }

  return (
    <div>
      <Tabs
        tabLabels={tabLabels}
        handleTabChange={handleChange}
        initialValue={value}
      />
    </div>
  )
}

export default MenuSection