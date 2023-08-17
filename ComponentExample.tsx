import React from 'react';
import BottomSheetDialog from "./components/BottomSheetDialog";
import { CardStyleInterpolators, StackNavigationOptions } from '@react-navigation/stack'

// This is the configuration I use in `Stack.Screen`.
export const dialogScreenOptions: StackNavigationOptions = {
    cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
    presentation: 'modal', // Note: DON'T REMOVE, can cause dialog backgrounds to appear cut.
    headerShown: false,
    cardStyle: { backgroundColor: 'transparent' },
    cardOverlayEnabled: true,
    detachPreviousScreen: false // Prevent android from detaching the background screen
}


// And in the component that will be called on the Screen, I encapsulate it in the `BottomSheetDialog` component.
// For example: <Stack.Screen name='ComponentExample' component={ComponentExample} options={dialogScreenOptions} />
const ComponentExample = () => {
    return (
        <BottomSheetDialog>
            {/* content here...*/}
        </BottomSheetDialog>
    );
};

export default ComponentExample;