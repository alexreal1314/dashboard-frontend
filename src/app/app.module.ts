import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SiteModule } from './site/site.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ConfigService } from './site/services/config.service';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    SiteModule,
    HttpClientModule,
    NoopAnimationsModule,
    BrowserModule,

  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: loadConfig,
    multi: true,
    deps: [ConfigService]
  }],
  bootstrap: [AppComponent]
})
export class AppModule {}

export function loadConfig(configService: ConfigService): (() => Promise<boolean>) {
  return (): Promise<boolean> => {
    return configService.loadConfig();
  }
}
