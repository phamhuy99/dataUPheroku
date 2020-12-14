import * as typess from "./../contant/index";
import callapi from "./../../API/api";
/*=========================getproduct==========================*/
export const get_products_api=()=>{
	return(dispath,props)=>{
		callapi('dataUser','GET',null).then(res=>{
			dispath(get_products(res.data))
		});
	}
}

export const get_products=(products)=>{
	return{
		type:typess.GETDATAUSER,
		products:products
	}
}
/*=========================getproduct==============================*/
/*==================delete-item-product============================*/
export const delete_item_api=(id)=>{
	return(dispath,props)=>{
		callapi(`dataUser/${id}`,'DELETE',null).then(res=>{
			dispath(delete_product(res.data))
		})
	}
}

export const delete_product=(product)=>{
	return{
		type:typess.DELETEITEM,
		product:product
	}
}
/*==================delete-item-product============================*/