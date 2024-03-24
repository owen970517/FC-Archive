import React, { useCallback, useState } from 'react'

const useKeyboard = (data:string[]) => {
    const [keyBoardIdx, setKeyboardIdx] = useState<number | null>(null);
    const onKeydown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.nativeEvent.isComposing) return;
            if (e.key === 'ArrowDown') {
                if (keyBoardIdx === null) {
                    setKeyboardIdx(0);
                } else if (keyBoardIdx < data.length - 1) {
                    setKeyboardIdx(prev => (prev !== null ? prev + 1 : prev));
                }
            }
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (keyBoardIdx === 0) {
                    setKeyboardIdx(null);
                } else if (keyBoardIdx !== null && keyBoardIdx > 0) {
                    setKeyboardIdx(prev => (prev ? prev - 1 : prev));
                }
            }
        },
        [data, keyBoardIdx]
    );
  
  const initIndex= useCallback(() => {
    setKeyboardIdx(null);
    }, []);
  return {keyBoardIdx , onKeydown, initIndex}
}

export default useKeyboard