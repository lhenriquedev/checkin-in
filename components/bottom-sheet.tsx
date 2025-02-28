import {
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react'

export type BottomSheetRefHandle = {
  open: () => void
  close: () => void
}

type CustomBottomSheetProps = BottomSheetModalProps & {
  children: React.ReactNode
}

export const CustomBottomSheet = forwardRef<
  BottomSheetRefHandle,
  CustomBottomSheetProps
>(({ children, snapPoints = ['80%'], index = 0, ...rest }, ref) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  const defaultSnapPoints = useMemo(() => snapPoints, [snapPoints])

  const open = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])

  const close = useCallback(() => {
    bottomSheetModalRef.current?.dismiss()
  }, [])

  useImperativeHandle(ref, () => ({
    open,
    close,
  }))

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={defaultSnapPoints}
        index={index}
        handleIndicatorStyle={{ width: 40, backgroundColor: '#CCCCCC' }}
        backgroundStyle={{ backgroundColor: '#FFFFFF' }}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
        style={{
          marginHorizontal: 0,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          borderWidth: 1,
          borderColor: '#e0e0e0',
        }}
        enableDynamicSizing={false}
        enablePanDownToClose={true}
        enableContentPanningGesture={true}
        enableHandlePanningGesture={false}
        enableOverDrag={false}
        {...rest}
      >
        {children}
      </BottomSheetModal>
    </BottomSheetModalProvider>
  )
})

CustomBottomSheet.displayName = 'CustomBottomSheet'
