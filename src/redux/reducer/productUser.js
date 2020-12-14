import * as typess from './../contant/index';

const intinial=[];
const products=(state=intinial,action)=>{
	switch(action.type) {
		case typess.GETDATAUSER:
			var {products}=action;
			state=products;
			return [...state];
		case typess.DELETEITEM:
			var {product}=action;
			var index=-1;
			index=findIndex(state,product.id);
			if(index !== -1){
				state.splice(index,1);
			}
			return [...state];
		default:
			return [...state];
	}
}

const findIndex=(state,id)=>{
	var index=-1;
	for(var i=0;i<state.length;i++){
		if(state[i].id===id){
			index=i;
		}
	}
	return index;
}

export default products;