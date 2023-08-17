import React, { useEffect, ReactElement, useRef, useState } from 'react'

import styled from '@emotion/native'
import BottomSheet from 'components/common/BottomSheet'
import { Pill } from 'main/assets/icons'
import useDebounceOnPress from 'main/hooks/useDebounceOnPress'
import { useNavigation } from 'main/hooks/useNavigation'
import useTheme from 'main/hooks/useTheme'
import { Pressable, Dimensions, Animated } from 'react-native'
import { PanGestureHandler, State } from 'react-native-gesture-handler'

interface Props {
  children: ReactElement
  dismissable?: boolean
  enableScroll?: boolean
  hasPill?: boolean
  onDismiss?: () => void
  bgColor?: string
}

export const Backdrop = styled(Pressable)(() => ({
  flex: 1,
  width: '100%',
  height: '100%',
  position: 'absolute'
}))

export const BottomSheetContainer = styled(Animated.View)(() => ({
  flex: 1,
  width: '100%',
  position: 'relative',
  bottom: 0,
  justifyContent: 'flex-end'
}))

export const PillContent = styled(Animated.View)(({ theme }) => ({
  alignItems: 'center',
  height: theme.baseUnit * 4,
  justifyContent: 'center',
  position: 'relative',
  zIndex: 10
}))

const BottomSheetDialog: React.FC<Props> = ({
  children,
  enableScroll = false,
  dismissable = true,
  onDismiss,
  bgColor,
  hasPill = true
}) => {
  const debounceOnPress = useDebounceOnPress()
  const navigation = useNavigation()
  const theme = useTheme()

  const [contentHeight, setContentHeight] = useState(0)
  const screenHeight = Dimensions.get('screen').height
  const translateY = useRef(new Animated.Value(screenHeight)).current

  const resetPositionAnim = Animated.timing(translateY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true
  })

  const closeAnim = Animated.timing(translateY, {
    toValue: screenHeight,
    duration: 500,
    useNativeDriver: true
  })

  const handleDismiss = () => {
    closeAnim.start()
    if (onDismiss) {
      onDismiss()
    } else if (dismissable) {
      navigation.goBack()
    }
  }

  useEffect(() => {
    resetPositionAnim.start()
  }, [resetPositionAnim])

  const onGestureEvent = Animated.event([{ nativeEvent: { translationY: translateY } }], {
    useNativeDriver: true
  })

  const onHandlerStateChange = ({ nativeEvent }: { nativeEvent: any }) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      const { translationY, velocityY } = nativeEvent
      if (translationY > 100 && velocityY > 100) {
        return handleDismiss()
      }
      return resetPositionAnim.start()
    }
  }

  return (
    <>
      <BottomSheetContainer
        style={{
          transform: [
            {
              translateY: translateY.interpolate({
                inputRange: [0, -contentHeight],
                outputRange: [0, -contentHeight],
                extrapolate: 'clamp'
              })
            }
          ]
        }}
      >
        {dismissable && <Backdrop onPress={() => debounceOnPress.debounce(handleDismiss)} />}
        <BottomSheet
          enableScroll={enableScroll}
          onLayout={event => {
            setContentHeight(event.nativeEvent.layout.height * -1)
          }}
          bgColor={bgColor ?? theme.colors.gray[1]}
        >
          <>
            {hasPill && (
              <PanGestureHandler onGestureEvent={onGestureEvent} onHandlerStateChange={onHandlerStateChange}>
                <PillContent>
                  <Pill width={54} style={{ color: theme.colors.gray[400] }} />
                </PillContent>
              </PanGestureHandler>
            )}
            {children}
          </>
        </BottomSheet>
      </BottomSheetContainer>
    </>
  )
}

export default BottomSheetDialog
