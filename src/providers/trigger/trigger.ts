import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TriggerProvider {

	constructor(public http: HttpClient) {
		console.log('Hello TriggerProvider Provider');
	}
	start(){
		
	}

}
