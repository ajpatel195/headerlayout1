import { SimpleChange, SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  let initConfig = {
    image_url: 'http://192.168.1.2:8081/src/assets/motus-logo-gray-blue.svg',
    height: 30,
    width: 100,
    subtitle: 'Powered by MeasureOne'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],

    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  describe('ngOnChanges', () => {

    it('should set current value in header_config', () => {
      const simpleChangesStub: SimpleChange = new SimpleChange(null, JSON.stringify(initConfig), true);
      const changesObj: SimpleChanges = {
        header_config: simpleChangesStub
      };
      component.ngOnChanges(changesObj);
      expect(component.header_config).toEqual(initConfig);
    });

    it('should set header_config and configOptions directly', () => {
      component.header_config = initConfig;
      const simpleChangesStub: SimpleChange = new SimpleChange(null, null, true);
      const changesObj: SimpleChanges = {
        header_config: simpleChangesStub
      };
      component.ngOnChanges(changesObj);
      expect(component.header_config).toEqual({
        image_url: '',
        height: 30,
        width: 100,
        subtitle: 'Powered by MeasureOne'
      });
    });
  });

});
