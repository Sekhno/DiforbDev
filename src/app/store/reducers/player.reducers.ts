import { createReducer, on, Action } from '@ngrx/store';
import * as PlayerActions from '../actions/player.actions';

export interface State {
    isPlaying?: boolean;
    selectedLeftSound?: string|null;
    selectedRightSound?: string|null;
    volume?: number;
    side?: string|null;
}

export const initialState: State = {
    isPlaying: false,
    selectedLeftSound: null,
    selectedRightSound: null,
    volume: 1,
    side: null
};

const _playerReducer = createReducer(
    initialState,
    on(PlayerActions.play, (state) => ({ isPlaying: true })),
    on(PlayerActions.stop, (state) => ({ isPlaying: false })),
    on(PlayerActions.selectedLeftSound, (state, { leftSound }) => ({ selectedLeftSound: leftSound })),
    on(PlayerActions.selectedRightSound, (state, { rightSound }) => ({ selectedRightSound: rightSound })),
    on(PlayerActions.changedVolume, (state, { side, value }) => ({ side: side, volume: value }))
);

export function playerReducer(state: State | undefined, action: Action) {
    return _playerReducer(state, action);
}