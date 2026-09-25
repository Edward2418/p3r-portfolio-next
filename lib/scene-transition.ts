export type SceneView = 'menu' | 'section'
export interface SceneState {
  requested: SceneView
  displayed: SceneView
  phase: 'idle' | 'cover' | 'reveal'
  version: number
}
export type SceneAction =
  | { type: 'request'; view: SceneView }
  | { type: 'advance'; version: number }

export function transitionScene(state: SceneState, action: SceneAction): SceneState {
  if (action.type === 'request') {
    if (action.view === state.requested) return state
    return { ...state, requested: action.view, phase: 'cover', version: state.version + 1 }
  }
  if (action.version !== state.version || state.phase === 'idle') return state
  return state.phase === 'cover'
    ? { ...state, displayed: state.requested, phase: 'reveal', version: state.version + 1 }
    : { ...state, phase: 'idle', version: state.version + 1 }
}
