import { createAction, props } from '@ngrx/store';

export const play = createAction('[Player Component] Play');
export const stop = createAction('[Player Component] Stop');
export const selectedLeftSound = createAction(
    '[SoundList Component] Selected left sound',
    props<{ leftSound: string }>()
);
export const selectedRightSound = createAction(
    '[SoundList Component] Selected right sound',
    props<{ rightSound: string }>()
);
export const changedVolume = createAction(
    '[Player Component] Changed volume',
    props<{ side: string, value: number }>()
);