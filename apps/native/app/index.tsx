import React from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import {router} from 'expo-router'
import {
  Chip,
  Divider,
  Surface,
  Text,
  View,
} from '@react-native-blossom-ui/components'
import {AppScrollView} from '../components'

export default function Page() {
  const totalComponents = dataList.reduce(
    (acc, section) => acc + section.data.length,
    0,
  )

  return (
    <Surface style={styles.container}>
      <AppScrollView>
        <View row style={styles.row}>
          <Chip title={`${totalComponents}+`} size="small" viewOnly />
          <Text> Components</Text>
        </View>

        {dataList.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text typography="h3" status="primary" style={styles.sectionHeader}>
              {section.title}
            </Text>

            {section.data
              .sort((a, b) => a.title.localeCompare(b.title))
              .map((item) => (
                <TouchableOpacity
                  activeOpacity={0.7}
                  accessibilityRole="button"
                  key={`${section.title}-${item.title}`}
                  style={styles.item}
                  onPress={() => router.push(item.navigateTo)}>
                  <Text typography="h6">{item.title}</Text>
                  <Divider style={{marginVertical: 8}} />
                </TouchableOpacity>
              ))}
          </View>
        ))}
      </AppScrollView>
    </Surface>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginTop: 16,
  },
  sectionHeader: {
    marginBottom: 12,
    fontWeight: '600',
  },
  item: {
    paddingVertical: 2,
  },
  row: {
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
})

const dataList = [
  {
    title: 'Components',
    data: [
      {title: 'Text', navigateTo: './TextScreen'},
      {title: 'ExpandableText', navigateTo: './ExpandableTextScreen'},
      {title: 'Link', navigateTo: './LinkScreen'},
      {title: 'Button', navigateTo: './ButtonScreen'},
      {title: 'FAB', navigateTo: './FABScreen'},
      {title: 'SegmentedButton', navigateTo: './SegmentedButtonScreen'},
      {title: 'Chip', navigateTo: './ChipScreen'},
      {title: 'Card', navigateTo: './CardScreen'},
      {title: 'Accordion', navigateTo: './AccordionScreen'},
      {title: 'Divider', navigateTo: './DividerScreen'},
      {title: 'Spacer', navigateTo: './SpacerScreen'},
      {title: 'ActivityIndicator', navigateTo: './ActivityIndicatorScreen'},
      {title: 'TextInput', navigateTo: './TextInputScreen'},
      {title: 'OtpInput', navigateTo: './OtpInputScreen'},
      {title: 'SearchInput', navigateTo: './SearchInputScreen'},
      {title: 'Switch', navigateTo: './SwitchScreen'},
      {title: 'Checkbox', navigateTo: './CheckboxScreen'},
      {title: 'Radio', navigateTo: './RadioScreen'},
      {title: 'Avatar', navigateTo: './AvatarScreen'},
      {title: 'AvatarGroup', navigateTo: './AvatarGroupScreen'},
      {title: 'Icon', navigateTo: './IconScreen'},
      {title: 'Popover', navigateTo: './PopoverScreen'},
      {title: 'Tooltip', navigateTo: './TooltipScreen'},
      {title: 'Modal', navigateTo: './ModalScreen'},
      {title: 'BottomSheet', navigateTo: './BottomSheetScreen'},
      {title: 'Select', navigateTo: './SelectScreen'},
      {title: 'MultiSelect', navigateTo: './MultiSelectScreen'},
      {title: 'ShimmerView', navigateTo: './ShimmerViewScreen'},
      {title: 'ProgressBar', navigateTo: './ProgressBarScreen'},
    ],
  },
  {
    title: 'Dates',
    data: [
      {title: 'DatePicker', navigateTo: './DatePickerScreen'},
      {title: 'Calendar', navigateTo: './CalendarScreen'},
      {title: 'DateSelectPicker', navigateTo: './DateSelectPickerScreen'},
    ],
  },
  {
    title: 'Overlays',
    data: [
      {title: 'Overlay', navigateTo: './OverlayScreen'},
      {title: 'Toast', navigateTo: './ToastScreen'},
      {title: 'Snackbar', navigateTo: './SnackbarScreen'},
      {title: 'ActionSheet', navigateTo: './ActionSheetScreen'},
      {title: 'BottomSheet', navigateTo: './BottomSheetOverlayScreen'},
      {title: 'Modal', navigateTo: './ModalOverlayScreen'},
      {title: 'Dialog', navigateTo: './DialogScreen'},
      {title: 'LoadingOverlay', navigateTo: './LoadingOverlayScreen'},
      {title: 'ProgressDialog', navigateTo: './ProgressDialogScreen'},
      {title: 'Popover', navigateTo: './PopoverOverlayScreen'},
    ],
  },
]
