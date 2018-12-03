import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AiPage } from './ai';
// import {ComponentsModule} from "../../components/components.module";
import {DirectivesModule} from "../../directives/directives.module";
@NgModule({
  declarations: [
    AiPage,
  ],
  imports: [
	DirectivesModule,
	// ComponentsModule,
    IonicPageModule.forChild(AiPage),
  ],
})
export class AiPageModule {}
