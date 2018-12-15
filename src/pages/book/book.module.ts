import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookPage } from './book';
import { PipesModule } from '../../pipes/pipes.module'

@NgModule({
	declarations: [
		BookPage,
	],
	imports: [
		PipesModule,
		IonicPageModule.forChild(BookPage),
	],
})
export class BookPageModule { }
