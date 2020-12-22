import {
    animation, trigger, animateChild, group,
    transition, animate, style, query, state, stagger, keyframes
} from '@angular/animations';

export const transAnimation = animation([
    style({
        height: '{{ height }}',
        opacity: '{{ opacity }}',
        backgroundColor: '{{ backgroundColor }}'
    }),
    animate('{{ time }}')
]);

export const fadeIn = trigger('fade', [
    state('in', style({ opacity: 1 })),
    transition(':enter', [ style({ opacity: 0 }), animate('300ms ease-out') ]),
    // transition(':leave', animate('300ms ease-out', style({ opacity: 0 })))
]);

export const collapseAnimation = trigger('collapseAnimation', [
    state('open', style({
        height: '340px',
        opacity: 1,
    })),
    state('closed', style({
        height: '0px',
        opacity: 0,
    })),
    transition('* => *', [
        animate('300ms')
    ])
]);

export const slideLeft = trigger('slideLeft', [
    state('active', style({ transform: 'translateX(0%)' })),
    state('inactive', style({ transform: 'translateX(-100%)' })),
    transition('* => *', [
        animate('500ms')
    ])
]);

export const slideRightAnimation = trigger('slideRightAnimation', [
    state('active', style({ transform: 'translateX(0%)' })),
    state('inactive', style({ transform: 'translateX(100%)' })),
    transition('* => *', [
        animate('500ms')
    ])
]);

export const rotatePusherAnimation = trigger('rotatePusherAnimation', [
    state('active', style({
        transform: 'scale(1) perspective(300px) translate3d(100px, 0px, -30px) scale3d(1, 1, 2) rotate3d(0, 40, 0, -3deg)'
    })),
    state('inactive', style({
        transform: 'scale(1) perspective(0px) translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotate3d(0, 0, 0, 0deg)'
    })),
    transition('* => *', [
        animate('500ms')
    ])
]);

export const fadeAnimation = trigger('fadeAnimation', [
    transition('* => *', [
        query(':enter', 
            [style({ opacity: 0 })], 
            { optional: true }
        ),
  
        query(':leave',
            [style({ opacity: 1 }), animate('0.5s', style({ opacity: 0 }))],
            { optional: true }
        ),
  
        query(':enter',
            [style({ opacity: 0 }), animate('0.5s', style({ opacity: 1 }))],
            { optional: true }
        ) 
    ])
]);

export const doubleSlideAnimation = trigger('doubleSlideAnimation', [
    transition('* => *', [
        query(':enter', 
            [style({
                opacity: 0,
                transform: 'translateX({{ offset }}%)'
            })], 
            { optional: true }
        ),
  
        query(':leave',
            [style({
                opacity: 1,
                transform: 'translateX(0%)'
            }), stagger(50, animate('0.3s', style({
                opacity: 0,
                transform: 'translateX({{ offset }}%)'
            })))],
            { optional: true }
        ),
  
        query(':enter',
            [style({
                opacity: 0,
                transform: 'translateX({{ offset }}%)'
            }), stagger(50, animate('0.3s', style({ 
                opacity: 1,
                transform: 'translateX(0%)'
            })))],
            { optional: true, delay: 300 }
        ) 
    ], { params: { offset: '100' } })
]);

export const flashAnimation = trigger('flashAnimation', [
    transition('* => *', animate('3s', keyframes([
        style({ opacity:  1, offset: 0 }),
        style({ opacity:  0, offset: 0.25 }),
        style({ opacity:  1, offset: 0.5 }),
        style({ opacity:  0, offset: 0.75 }),
        style({ opacity:  1, offset: 1 })
    ])))
]);

export const shakeAnimation = trigger('shakeAnimation', [
    transition('inactive => active', animate('.5s', keyframes([
        style({ transform: 'translate3d(0, 0, 0)', offset: 0 }),
        style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.1 }),
        style({ transform: 'translate3d(10px, 0, 0)', offset: 0.2 }),
        style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.3 }),
        style({ transform: 'translate3d(10px, 0, 0)', offset: 0.4 }),
        style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.5 }),
        style({ transform: 'translate3d(10px, 0, 0)', offset: 0.6 }),
        style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.7 }),
        style({ transform: 'translate3d(10px, 0, 0)', offset: 0.8 }),
        style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.9 }),
        style({ transform: 'translate3d(0, 0, 0)', offset: 1 })
    ])))
]);
