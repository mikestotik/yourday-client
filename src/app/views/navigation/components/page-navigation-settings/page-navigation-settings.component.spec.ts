import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNavigationSettingsComponent } from './page-navigation-settings.component';

describe('NavigationPageSettingsComponent', () => {
  let component: PageNavigationSettingsComponent;
  let fixture: ComponentFixture<PageNavigationSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageNavigationSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageNavigationSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
