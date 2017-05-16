import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PictureComponent } from './picture/picture.component';
import { CanvasTestComponent } from './canvas-test/canvas-test.component';
import { CheckNode, Traverser } from './traverseTest';

@NgModule({
  declarations: [
    AppComponent,
    PictureComponent,
    CanvasTestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
