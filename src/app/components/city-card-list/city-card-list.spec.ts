import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityCardList } from './city-card-list';

describe('CityCardList', () => {
  let component: CityCardList;
  let fixture: ComponentFixture<CityCardList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CityCardList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CityCardList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
