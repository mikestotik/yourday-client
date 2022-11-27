import { TaskCounterPipe } from './task-counter.pipe';

describe('TaskCounterPipe', () => {
  it('create an instance', () => {
    const pipe = new TaskCounterPipe();
    expect(pipe).toBeTruthy();
  });
});
