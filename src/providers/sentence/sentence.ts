import { Injectable } from '@angular/core';
import {KnowledgeProvider} from "../knowledge/knowledge"
@Injectable()
export class SentenceProvider {
	json: any;
	constructor(
		public knowledge:KnowledgeProvider,
	) {}
	
	receiveJson(json) {
		this.json = json;
	}
	//判断类型
	getHED() {
		var HED = this.json.filter((i) => {
			return i.head == 0
		})
		return HED;
	}
	getParent(item) {
		var parent = this.json.filter((i) => {
			return i.id == item.head;
		})
		return parent;
	}
	getChildren(item, deprel?, postag?) {
		var children = this.json.filter((i) => {
			if (i.head != item.id) return false;
			if (deprel && deprel != i.deprel) return false;
			if (postag && postag != i.postag) return false;
			return true;
		})
		return children;
	}
	getSibling(item) {
		var sibling = this.getChildren(item).filter((i) => {
			return i.deprel == "COO";
		})
		return sibling;
	}
	getDeprel(deprel,array=this.json) {
		var result = array.filter((i) => {
			return i.deprel == deprel;
		})
		return result;
	}
	getFilter(deprel, postag) {
		var filter = this.json.filter((i) => {
			return i.deprel == deprel && i.postag == postag;
		})
		return filter;
	}

}

