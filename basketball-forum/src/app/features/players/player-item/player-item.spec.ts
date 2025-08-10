import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerItem } from './player-item';

describe('PlayerItem', () => {
  let component: PlayerItem;
  let fixture: ComponentFixture<PlayerItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
