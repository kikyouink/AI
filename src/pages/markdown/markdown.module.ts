import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MarkdownPage } from './markdown';
import { PipesModule } from '../../pipes/pipes.module'

@NgModule({
  declarations: [
    MarkdownPage,
  ],
  imports: [
	PipesModule,
    IonicPageModule.forChild(MarkdownPage),
  ],
})
export class MarkdownPageModule {}
