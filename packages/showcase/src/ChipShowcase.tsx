import React from 'react'
import {Chip, View, Icon} from '@react-native-blossom-ui/components'

import {SIZE_LIST, STATUS_LIST, BUTTON_MODES} from './constants'

export function ChipUsage() {
  return <Chip onPress={() => alert('Chip Pressed')}>Blossom Chip</Chip>
}

export function ChipViewOnly() {
  return <Chip viewOnly>Blossom Chip</Chip>
}

export function ChipWithoutCheckIcon() {
  return <Chip withCheckIcon={false}>Blossom Chip</Chip>
}

export function ChipClearable() {
  return <Chip clearable>Blossom Chip</Chip>
}

export function ChipCheckIcon() {
  return (
    <Chip checkIcon={<Icon name="information-sharp" size={16} />}>
      Custom Icon
    </Chip>
  )
}

export function ChipAsBadge() {
  return (
    <View row style={{alignItems: 'center'}}>
      <Chip size="small" asBadge title="2" />
      <Chip size="medium" asBadge title="40" />
      <Chip size="large" asBadge title="99+" />
    </View>
  )
}

export function ChipModes() {
  return (
    <View row style={{justifyContent: 'space-evenly'}}>
      <Chip mode="filled" title="filled" />
      <Chip mode="tinted" title="tinted" />
      <Chip mode="outlined" title="outlined" />
      <Chip mode="plain" title="plain" />
    </View>
  )
}

export function ChipDisabled() {
  return (
    <View row style={{justifyContent: 'space-evenly'}}>
      <Chip disabled mode="filled">
        filled
      </Chip>
      <Chip disabled mode="tinted">
        tinted
      </Chip>
      <Chip disabled mode="outlined">
        outlined
      </Chip>
      <Chip disabled mode="plain">
        plain
      </Chip>
    </View>
  )
}

export function ChipSizes() {
  return (
    <View row style={{justifyContent: 'space-evenly'}}>
      <Chip size="small" title="small" />
      <Chip size="medium" title="medium" />
      <Chip size="large" title="large" />
    </View>
  )
}

export function ChipIcons() {
  return (
    <View row style={{justifyContent: 'space-evenly'}}>
      <Chip mode="filled" left={<Icon name="add" size={24} color="white" />}>
        filled
      </Chip>
      <Chip
        mode="tinted"
        left={<Icon name="add" size={24} />}
        right={<Icon name="arrow-forward-outline" size={24} />}>
        tinted
      </Chip>
      <Chip
        mode="outlined"
        right={
          <Icon name="arrow-forward-outline" size={24} status="primary" />
        }>
        outlined
      </Chip>
      <Chip
        mode="plain"
        left={<Icon name="add" size={24} />}
        right={<Icon name="arrow-forward-outline" size={24} />}>
        plain
      </Chip>
    </View>
  )
}

export function ChipStatuses() {
  return (
    <View row style={{justifyContent: 'space-evenly'}}>
      <Chip status="primary">primary</Chip>
      <Chip status="accent">accent</Chip>
      <Chip status="success">success</Chip>
      <Chip status="info">info</Chip>
      <Chip status="warning">warning</Chip>
      <Chip status="error">error</Chip>
    </View>
  )
}

export function ChipStatusesMobile() {
  return (
    <View>
      <Chip status="primary">primary</Chip>
      <Chip status="accent">accent</Chip>
      <Chip status="success">success</Chip>
      <Chip status="info">info</Chip>
      <Chip status="warning">warning</Chip>
      <Chip status="error">error</Chip>
    </View>
  )
}

export function ChipModesSizes() {
  return (
    <View style={{justifyContent: 'space-evenly'}}>
      {BUTTON_MODES.map((mode) => (
        <View
          key={mode}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            marginVertical: 6,
          }}>
          {SIZE_LIST.map((size) => (
            <Chip key={size} mode={mode} size={size}>
              {mode} {size}
            </Chip>
          ))}
        </View>
      ))}
    </View>
  )
}

export function ChipModesSizesMobile() {
  return (
    <View style={{justifyContent: 'space-evenly'}}>
      {BUTTON_MODES.map((mode) => (
        <View
          key={mode}
          style={{
            flexDirection: 'row',
            // marginVertical: 2,
          }}>
          {SIZE_LIST.map((size) => (
            <Chip key={size} mode={mode} size={size}>
              tinted
            </Chip>
          ))}
        </View>
      ))}
    </View>
  )
}

export function ChipAllStatuses() {
  return (
    <View style={{justifyContent: 'space-evenly'}}>
      {STATUS_LIST.map((status) => (
        <View
          key={status}
          row
          style={{
            justifyContent: 'space-between',
          }}>
          {BUTTON_MODES.map((modeValue) => (
            <Chip
              key={modeValue + status}
              mode={modeValue}
              status={status}
              size="small">
              {status}
            </Chip>
          ))}
        </View>
      ))}
    </View>
  )
}

export function ChipAllStatusesDisabled() {
  return (
    <View style={{justifyContent: 'space-evenly'}}>
      {STATUS_LIST.map((status) => (
        <View
          key={status}
          row
          style={{
            justifyContent: 'space-between',
          }}>
          {BUTTON_MODES.map((modeValue) => (
            <Chip
              key={modeValue}
              mode={modeValue}
              status={status}
              size="small"
              disabled>
              {status}
            </Chip>
          ))}
        </View>
      ))}
    </View>
  )
}

export function ChipCustom() {
  return (
    <View style={{justifyContent: 'space-evenly'}}>
      <Chip
        style={[{backgroundColor: 'cyan'}]}
        left={<Icon name="add" size={16} color="white" />}
        right={<Icon name="add" size={16} color="white" />}>
        Custom Chip
      </Chip>
    </View>
  )
}
