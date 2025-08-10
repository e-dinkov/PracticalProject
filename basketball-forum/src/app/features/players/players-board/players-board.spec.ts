import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersBoard } from './players-board';

describe('PlayersBoard', () => {
  let component: PlayersBoard;
  let fixture: ComponentFixture<PlayersBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayersBoard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayersBoard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
