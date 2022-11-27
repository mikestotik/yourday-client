import { FilterCompletedPipe } from './tasks-filter-completed.pipe';

describe('TasksFilterCompletedPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterCompletedPipe();
    expect(pipe).toBeTruthy();
  });
});
