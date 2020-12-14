import axios from 'axios';
import * as config from "./../redux/contant/config";

export default function callapi(endpoint,method='GET',data){
	return axios({
		method:method,
		url:`${config.apiLink}${endpoint}`,
		data:data
	}).catch(err=>{
		console.log(err);
	});
};