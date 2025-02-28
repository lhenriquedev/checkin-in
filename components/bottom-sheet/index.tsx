import BottomSheet, {
  BottomSheetView,
  BottomSheetProps as GorhomBottomSheetProps,
} from '@gorhom/bottom-sheet'
import {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useRef,
} from 'react'
import { StyleSheet, Text } from 'react-native'

export type CustomBottomSheetProps = Partial<GorhomBottomSheetProps> & {
  children?: React.ReactNode
}

// Define a handle to expose specific methods
export type BottomSheetRefHandle = {
  open: () => void
  close: () => void
}

const BottomSheetComponent: ForwardRefRenderFunction<
  BottomSheetRefHandle,
  CustomBottomSheetProps
> = ({ children, ...props }, ref) => {
  const bottomSheetRef = useRef<BottomSheet>(null)
  const defaultSnapPoints = ['50%', '75%']

  // Expose custom methods through the ref
  useImperativeHandle(ref, () => ({
    open: () => {
      bottomSheetRef.current?.expand()
    },
    close: () => {
      bottomSheetRef.current?.close()
    },
  }))

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={props.snapPoints || defaultSnapPoints}
      index={-1}
      enablePanDownToClose={false}
      handleIndicatorStyle={styles.indicator}
      backgroundStyle={styles.backgroundStyle}
      android_keyboardInputMode="adjustResize"
      style={styles.bottomSheet}
      {...props}
    >
      <BottomSheetView style={styles.contentContainer}>
        {children || <Text>Awesome 🎉</Text>}
      </BottomSheetView>
    </BottomSheet>
  )
}

export const CustomBottomSheet = forwardRef(BottomSheetComponent)

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  bottomSheet: {
    zIndex: 1000,
    elevation: 10,
  },
  indicator: {
    backgroundColor: '#CCCCCC',
    width: 40,
  },
  backgroundStyle: {
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
})
