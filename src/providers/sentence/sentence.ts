import { Injectable } from '@angular/core';

@Injectable()
export class SentenceProvider {
	json: any;
	translation: object = {
		"使用": 'chooseToUse',
		"打出": "chooseToRespond",
		"红色":'red',
		"黑色":'black',
		"梅花":'club',
		"方块":'diamond',
		"红桃":'heart',
		"黑桃":'spade'
	}
	replaceList:any=[
		{
			// reg:'/【[\u4e00-\u9fa5]+】/g',
			reg:"【[\u4e00-\u9fa5]+】",
			replacement:'X',
		},{
			reg:"梅花",
			replacement:'草花',
		}
	]
	constructor() { }
	replaceCardName(msg) {
		var newMsg=msg;
		var i=this.replaceList.length;
		while(i--){
			var k=this.replaceList[i];
			console.log(k);
			newMsg=newMsg.replace(new RegExp(k.reg,"g"),k.replacement);
		}
		console.log(newMsg);
		return newMsg;
	}
	receiveJson(json) {
		this.json = json;
	}
	translate(word) {
		for (var i in this.translation) {
			if (i == word) return this.translation[i];
		}
	}
	//判断类型
	findHED() {
		var HED = this.json.filter((i) => {
			return i.head == 0
		})
		console.log(HED[0]);
		return HED[0];
	}
	findParent(item) {
		var parent = this.json.filter((i) => {
			return i.id == item.head;
		})
		console.log(parent[0]);
		return parent[0];
	}
	findChildren(item, deprel?) {
		var num,result=this.json;
		if(!deprel){
			var children = result.filter((i) => {
				return i.head == item.id;
			})
		}
		else{
			if(typeof deprel=="string") num=1;
			else if(Array.isArray(deprel)) num=deprel.length;
			while(num--){
				var children = result.filter((i) => {
					return i.head == item.id && i.deprel == deprel;
				})
				result=children;
			}
		}
		console.log(children);
		return children;
	}
	findSibling(item) {
		var sibling = this.findChildren(item).filter((i) => {
			return i.deprel == "COO";
		})
		console.log(sibling[0]);
		return sibling[0];
	}
	findDeprel(array, deprel) {
		var result = array.filter((i) => {
			return i.deprel == deprel;
		})
		console.log(result);
		return result;
	}

}
