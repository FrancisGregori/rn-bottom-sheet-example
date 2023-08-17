import React, { ReactElement } from 'react'

import { Container } from 'components/common/BottomSheet/styles'
import { StyleProp, View, ViewProps, ViewStyle, ScrollView } from 'react-native'

interface Props extends ViewProps {
  children: ReactElement
  testID?: string
  enableScroll?: boolean
  bgColor: string
  style?: StyleProp<ViewStyle>
  contentStyle?: StyleProp<ViewStyle>
}

const BottomSheet: React.FC<Props> = ({
  children,
  enableScroll = false,
  contentStyle = {},
  style = {},
  bgColor,
  ...rest
}) => (
  <Container style={[style, { backgroundColor: bgColor }]}>
    {enableScroll ? (
      <ScrollView style={contentStyle} onStartShouldSetResponder={() => true} {...rest}>
        {children}
      </ScrollView>
    ) : (
      <View style={[contentStyle]} onStartShouldSetResponder={() => true} {...rest}>
        {children}
      </View>
    )}
  </Container>
)

export default BottomSheet
