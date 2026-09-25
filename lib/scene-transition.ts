export type SceneView = 'menu' | 'section'
export interface SceneState<View extends string = SceneView> {
  requested: View
  displayed: View
  phase: 'idle' | 'cover' | 'reveal'
  version: number
}
export type SceneAction<View extends string = SceneView> =
  | { type: 'request'; view: View }
  | { type: 'advance'; version: number }

export function transitionScene<View extends string>(state: SceneState<View>, action: SceneAction<View>): SceneState<View> {
  if (action.type === 'request') {
    if (action.view === state.requested) return state
    return { ...state, requested: action.view, phase: 'cover', version: state.version + 1 }
  }
  if (action.version !== state.version || state.phase === 'idle') return state
  return state.phase === 'cover'
    ? { ...state, displayed: state.requested, phase: 'reveal', version: state.version + 1 }
    : { ...state, phase: 'idle', version: state.version + 1 }
}
