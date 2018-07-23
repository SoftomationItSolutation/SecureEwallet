import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletTranscationComponent } from './wallet-transcation.component';

describe('WalletTranscationComponent', () => {
  let component: WalletTranscationComponent;
  let fixture: ComponentFixture<WalletTranscationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletTranscationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletTranscationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
