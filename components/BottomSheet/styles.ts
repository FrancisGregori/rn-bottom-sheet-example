import styled from '@emotion/native'
import { View } from 'react-native'

export const Container = styled(View)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  bottom: 0,
  zIndex: 2,
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  // iOS shadow
  shadowColor: theme.colors.gray[900],
  shadowOpacity: 0.1,
  shadowRadius: 5,
  shadowOffset: {
    height: -6,
    width: 0
  },
  // Android shadow
  elevation: 5,
  maxHeight: '95%'
}))
