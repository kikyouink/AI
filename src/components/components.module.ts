import { NgModule } from '@angular/core';
import { TestComponent } from './test/test';
import { IonicModule} from 'ionic-angular';
@NgModule({
	declarations: [TestComponent],
	imports: [
		IonicModule.forRoot(ComponentsModule)
	],
	exports: [TestComponent]
})
export class ComponentsModule { }
