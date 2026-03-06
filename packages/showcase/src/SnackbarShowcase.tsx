import React from 'react'

import {Button, View} from '@react-native-blossom-ui/components'
import {Snackbar} from '@react-native-blossom-ui/overlays'

export function SnackbarUsage() {
  return (
    <Button
      onPress={() => {
        Snackbar.show({
          text: 'This is a Snackbar message!',
          actionText: 'Undo',
          onActionPress: () => {
            console.log('Snackbar action pressed!')
          },
        })
      }}>
      Show Snackbar
    </Button>
  )
}

export function SnackbarDuration() {
  return (
    <View>
      <Button
        onPress={() => {
          Snackbar.show({
            text: 'This is a Snackbar message!',
            actionText: 'Undo',
            onActionPress: () => {
              console.log('Snackbar action pressed!')
            },
            duration: 500,
          })
        }}>
        Short Lived Snackbar
      </Button>
      <Button
        onPress={() => {
          Snackbar.show({
            text: 'This is a Snackbar message!',
            actionText: 'Undo',
            onActionPress: () => {
              console.log('Snackbar action pressed!')
            },
            duration: 50000,
          })
        }}>
        Long Lived Snackbar
      </Button>
    </View>
  )
}

export function SnackbarNumberOfLines() {
  return (
    <View>
      <Button
        onPress={() => {
          Snackbar.show({
            text: 'This is a Snackbar message!'.repeat(10),
            actionText: 'Undo',
            onActionPress: () => {
              console.log('Snackbar action pressed!')
            },
            numberOfLines: 1,
          })
        }}>
        Snackbar with 1 line & Ellipses
      </Button>

      <Button
        onPress={() => {
          Snackbar.show({
            text: 'This is a Snackbar message! '.repeat(10),
            actionText: 'Undo',
            onActionPress: () => {
              console.log('Snackbar action pressed!')
            },
            numberOfLines: 4,
            offset: 200,
          })
        }}>
        Long Snackbar with 4 lines
      </Button>
    </View>
  )
}

export function SnackbarPosition() {
  return (
    <View>
      <Button
        onPress={() => {
          Snackbar.show({
            text: 'This is a Snackbar message!',
            actionText: 'Undo',
            onActionPress: () => {
              console.log('Snackbar action pressed!')
            },
            position: 'top',
            duration: 3000,
          })
        }}>
        Show Top Snackbar
      </Button>

      <Button
        onPress={() => {
          Snackbar.show({
            text: 'This is a Snackbar message!',
            actionText: 'Undo',
            onActionPress: () => {
              console.log('Snackbar action pressed!')
            },
            position: 'bottom',
            duration: 4000,
          })
        }}>
        Show Bottom Snackbar
      </Button>
    </View>
  )
}

export function SnackbarCustom() {
  return (
    <Button
      onPress={() => {
        Snackbar.show({
          text: 'This is a Snackbar message!',
          actionText: 'Undo',
          onActionPress: () => {
            console.log('Snackbar action pressed!')
          },
          textStyle: {color: 'yellow'},
          actionTextStyle: {color: 'cyan'},
          containerStyle: {backgroundColor: 'purple'},
        })
      }}>
      Show Snackbar
    </Button>
  )
}
