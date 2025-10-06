import React from 'react'
import {
  SegmentedButton,
  View,
  Icon,
  ControlButtonProps,
} from '@react-native-blossom-ui/components'

const buttons: ControlButtonProps[] = [
  {title: 'Primary'},
  {title: 'Secondary'},
  {title: 'Tertiary'},
]

const iconButtons: ControlButtonProps[] = [
  {title: 'Primary', left: <Icon name="add" />},
  {title: 'Secondary', left: <Icon name="add" />},
  {title: 'Tertiary', left: <Icon name="add" />},
]

export function SegmentedButtonUsage() {
  return <SegmentedButton data={buttons} />
}

export function SegmentedButtonMultiSelect() {
  return <SegmentedButton data={buttons} multiSelect />
}

export function SegmentedButtonModes() {
  return (
    <View>
      <SegmentedButton data={buttons} mode="filled" />
      <SegmentedButton data={buttons} mode="tinted" />
      <SegmentedButton data={buttons} mode="outlined" />
      <SegmentedButton data={buttons} mode="plain" />
    </View>
  )
}

export function SegmentedButtonDisabled() {
  return <SegmentedButton data={buttons} disabled />
}

export function SegmentedButtonSizes() {
  return (
    <View>
      <SegmentedButton data={buttons} size="small" />
      <SegmentedButton data={buttons} size="medium" />
      <SegmentedButton data={buttons} size="large" />
    </View>
  )
}

export function SegmentedButtonIcons() {
  return (
    <View>
      <SegmentedButton data={iconButtons} />
    </View>
  )
}

export function SegmentedButtonStatuses() {
  return (
    <>
      <SegmentedButton data={buttons} mode="filled" status="primary" />
      <SegmentedButton data={buttons} mode="filled" status="accent" />
      <SegmentedButton data={buttons} mode="filled" status="success" />
      <SegmentedButton data={buttons} mode="filled" status="info" />
      <SegmentedButton data={buttons} mode="filled" status="warning" />
      <SegmentedButton data={buttons} mode="filled" status="error" />
    </>
  )
}

export function SegmentedButtonCustom() {
  return (
    <View>
      <SegmentedButton
        data={buttons}
        style={[{backgroundColor: 'cyan'}]}
        activeColor="cyan"
        inactiveColor="burlywood"
      />
    </View>
  )
}
