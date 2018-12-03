import { Directive, ElementRef } from '@angular/core';

/**
 * Generated class for the KkDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
	selector: '[kk]' // Attribute selector
})
export class KkDirective {

	constructor(private el: ElementRef) {
		this.el.nativeElement.style.color = 'red';
		console.log('Hello KkDirective Directive');
	}

}
