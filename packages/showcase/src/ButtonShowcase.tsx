import React from 'react'
import {
  Button,
  ButtonProps,
  View,
  Icon,
  Text,
} from '@react-native-blossom-ui/components'

import {SIZE_LIST, STATUS_LIST, BUTTON_MODES} from './constants'

export function ButtonUsage() {
  return (
    <View>
      <Button onPress={() => alert('You are Awesome')}>Blossom Button</Button>
    </View>
  )
}

export function ButtonModes() {
  return (
    <View row style={{justifyContent: 'space-evenly'}}>
      <Button mode="filled" title="filled" />
      <Button mode="tinted" title="tinted" />
      <Button mode="outlined" title="outlined" />
      <Button mode="plain" title="plain" />
    </View>
  )
}

export function ButtonDisabled() {
  return (
    <View row style={{justifyContent: 'space-evenly'}}>
      <Button disabled mode="filled">
        filled
      </Button>
      <Button disabled mode="tinted">
        tinted
      </Button>
      <Button disabled mode="outlined">
        outlined
      </Button>
      <Button disabled mode="plain">
        plain
      </Button>
    </View>
  )
}

export function ButtonLoading() {
  return (
    <View row style={{justifyContent: 'space-evenly'}}>
      <Button isLoading size="small">
        small
      </Button>
      <Button isLoading size="medium">
        medium
      </Button>
      <Button isLoading size="large">
        large
      </Button>
    </View>
  )
}

export function ButtonSizes() {
  return (
    <View row style={{justifyContent: 'space-evenly'}}>
      <Button size="small" title="small" />
      <Button size="medium" title="medium" />
      <Button size="large" title="large" />
    </View>
  )
}

export function ButtonIcons() {
  return (
    <View row style={{justifyContent: 'space-evenly'}}>
      <Button mode="filled" left={<Icon name="add" size={24} color="white" />}>
        filled
      </Button>
      <Button
        mode="tinted"
        left={<Icon name="add" size={24} />}
        right={<Icon name="arrow-forward-outline" size={24} />}>
        tinted
      </Button>
      <Button
        mode="outlined"
        right={
          <Icon name="arrow-forward-outline" size={24} status="primary" />
        }>
        outlined
      </Button>
      <Button
        mode="plain"
        left={<Icon name="add" size={24} />}
        right={<Icon name="arrow-forward-outline" size={24} />}>
        plain
      </Button>
    </View>
  )
}

export function ButtonStatuses() {
  return (
    <View row style={{justifyContent: 'space-evenly'}}>
      <Button status="primary">primary</Button>
      <Button status="accent">accent</Button>
      <Button status="success">success</Button>
      <Button status="info">info</Button>
      <Button status="warning">warning</Button>
      <Button status="error">error</Button>
    </View>
  )
}

export function ButtonStatusesMobile() {
  return (
    <View style={{justifyContent: 'space-evenly'}}>
      <Button status="primary" size="small">
        primary
      </Button>
      <Button status="accent" size="small">
        accent
      </Button>
      <Button status="success" size="small">
        success
      </Button>
      <Button status="info" size="small">
        info
      </Button>
      <Button status="warning" size="small">
        warning
      </Button>
      <Button status="error" size="small">
        error
      </Button>
    </View>
  )
}

export function ButtonModesSizes() {
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
            <Button key={size} mode={mode} size={size}>
              {mode} {size}
            </Button>
          ))}
        </View>
      ))}
    </View>
  )
}

export function ButtonModesSizesMobile() {
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
            <Button key={size} mode={mode} size={size}>
              {mode}
            </Button>
          ))}
        </View>
      ))}
    </View>
  )
}

export function ButtonAllStatuses() {
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
            <Button
              key={modeValue + status}
              mode={modeValue}
              status={status}
              size="small">
              {status}
            </Button>
          ))}
        </View>
      ))}
    </View>
  )
}

export function ButtonAllStatusesDisabled() {
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
            <Button
              key={modeValue}
              mode={modeValue}
              status={status}
              size="small"
              disabled>
              {status}
            </Button>
          ))}
        </View>
      ))}
    </View>
  )
}

export function ButtonCustom() {
  return (
    <View style={{justifyContent: 'space-evenly'}}>
      <Button
        loaderProps={{
          color: 'black',
        }}
        isLoading
        left={<Icon name="add" size={24} color="white" />}
        right={<Icon name="add" size={24} color="white" />}
        style={[{width: '100%', backgroundColor: 'green'}]}
        onPress={() => alert('Awesome Blossom Button')}>
        Prefix <Text status="error">Text Children</Text> Suffix
      </Button>
      <Button
        style={[{justifyContent: 'space-between', width: '100%'}]}
        left={<Icon name="add" size={24} color="white" />}
        right={<Icon name="add" size={24} color="white" />}>
        Icons Space-Between
      </Button>

      <Button
        disabled
        disabledTitleStyle={{
          color: 'black',
        }}
        disabledStyle={{
          backgroundColor: 'gray',
        }}>
        Custom Disabled Buttons
      </Button>
    </View>
  )
}
