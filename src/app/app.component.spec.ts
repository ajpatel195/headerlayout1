import { SimpleChange, SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  let initConfig = {
    logo_url: 'https://ik.imagekit.io/measureone/customer_logos/lgo_2SEkfwDgYrUEO3okKxzGtuZwbqO.svg?tr=w-100',
    height: "100",
    width: "100",
    subtitle: 'Powered by MeasureOne',
    branding: {
      font_family: 'Open Sans,sans-serif',
      font_size: '12px',
      subtitle_color: '#141414',
    }
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

    it('should set current value in header_config if type is string', () => {

      spyOn<any>(component, 'updateBranding');

      const simpleChangesStub: SimpleChange = new SimpleChange(null, JSON.stringify(initConfig), true);
      const changesObj: SimpleChanges = {
        header_config: simpleChangesStub
      };

      component.ngOnChanges(changesObj);

      expect(component.header_config).toEqual(initConfig);
      expect(component['updateBranding']).toHaveBeenCalledTimes(3);
      expect(component.header_config.branding).toEqual({ font_family: 'Open Sans,sans-serif', font_size: '12px', subtitle_color: '#141414' });
    });

    it('should set header_config directly is type is not string', () => {

      spyOn<any>(component, 'updateBranding');
      spyOn<any>(component['host'].nativeElement.style, 'setProperty');

      component.header_config = initConfig;

      const simpleChangesStub: SimpleChange = new SimpleChange(null, null, true);
      const changesObj: SimpleChanges = {
        header_config: simpleChangesStub
      };

      component.ngOnChanges(changesObj);

      expect(component.header_config).toEqual({
        logo_url: 'https://ik.imagekit.io/measureone/customer_logos/lgo_2SEkfwDgYrUEO3okKxzGtuZwbqO.svg?tr=w-100',
        height: "100",
        width: "100",
        subtitle: 'Powered by MeasureOne',
        branding: {
          font_family: 'Open Sans,sans-serif',
          font_size: '12px',
          subtitle_color: '#141414',
        }
      });

      expect(component['updateBranding']).toHaveBeenCalledTimes(3);
      expect(component.header_config.branding).toEqual({ font_family: 'Open Sans,sans-serif', font_size: '12px', subtitle_color: '#141414' });
    });

    it('should updateBranding', () => {

      component.header_config = initConfig;

      spyOn<any>(component['host'].nativeElement.style, 'setProperty');

      component['updateBranding']('subtitle_color', '#716321');
      expect(component['host'].nativeElement.style.setProperty).toHaveBeenCalledWith(`--${'subtitle_color'}`, '#716321');
    });
  });

});
