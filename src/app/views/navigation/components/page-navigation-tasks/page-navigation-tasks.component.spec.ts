import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNavigationTasksComponent } from './page-navigation-tasks.component';

describe('NavigationPageTasksComponent', () => {
  let component: PageNavigationTasksComponent;
  let fixture: ComponentFixture<PageNavigationTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageNavigationTasksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageNavigationTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
