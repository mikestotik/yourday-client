import { Injectable } from '@angular/core';
import { HammerGestureConfig } from '@angular/platform-browser';
import * as Hammer from 'hammerjs';


@Injectable()
export class HammerConfig extends HammerGestureConfig {

  override buildHammer(element: HTMLElement) {
    const options: HammerOptions = {}

    const mc = new Hammer(element, options);

    mc.get('swipe').set({ enable: true, direction: Hammer.DIRECTION_ALL });

    // if (element.classList.contains('bottom-sheet')) {
    //   mc.get('swipe').set({ enable: true, direction: Hammer.DIRECTION_DOWN });
    // } else {
    //   mc.get('swipe').set({ enable: false, direction: Hammer.DIRECTION_DOWN });
    // }
    //
    // if (element.classList.contains('task-list')) {
    //   mc.get('swipe').set({ enable: false });
    // } else {
    //   mc.get('swipe').set({ enable: true });
    // }

    return mc;
  }
}
