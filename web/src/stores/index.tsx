import produce from 'immer'
import create from 'zustand'

interface FigFeedStore {
  figma_access_token: string | undefined
  set: (fn: (draft: FigFeedStore) => void) => void
}

const useFigFeedStore = create<FigFeedStore>((set) => ({
  figma_access_token: '',
  set: (fn: any) => {
    return set(produce(fn))
  },
}))

export default useFigFeedStore
