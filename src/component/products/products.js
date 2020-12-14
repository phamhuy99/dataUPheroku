import React,{Component} from 'react';
import './products.css';
import {connect} from 'react-redux';
import * as action from "./../../redux/action/index";

import $ from 'jquery';
//import moment from 'moment';
//import {findDOMNode} from 'react-dom';

class Products extends Component {
  constructor(props){
    super(props);
    this.state={
      msdh:''
    }
  }
	componentDidMount(){
		this.props.getProductUser();
	}
  onchange=(e)=>{
    var target=e.target;
    var name=target.name;
    var value=target.value;
    this.setState({
      [name]:value
    })
  }
  render(){
  		//var {productUser}=this.props;
  		//---------------------JQUERY--------------------------------
  		$(document).ready(function(){
		  	$(window).scroll(function() {    
		    var scroll = $(window).scrollTop();
		    if (scroll >= 500) {
		        $("div .don-hang").addClass("scrolled");
		    }
		    else if(scroll < 500){
		    	$("div .don-hang").removeClass("scrolled");
		    }
			  });
	    });
  		//---------------------JQUERY--------------------------------
      var {msdh}=this.state
    return(
      <React.Fragment>
      <div className='don-hang'>
        <div className="tra-cuu-don-hang">
          <h1 style={{color:'aqua',margin:'50px 0px'}}>Tra Cứu Đơn Hàng</h1>
          <input type="text" name="msdh" className="form-control" value={msdh} onChange={this.onchange} placeholder="nhập mã tra cứu" />
        </div>
        {this.showTableUser()}
        <button type="button" class="btn btn-primary" id="trang-chu">Trang Chủ</button>
      </div>
      </React.Fragment>
    )
  }
  /*------------------show table----------------------------*/
  showTableUser=()=>{
  	var {productUser}=this.props;
    var {msdh}=this.state;
  	var resule='';
    var serchItem=[];
    var resuleSSS='';

       /*-------------loc ma don hang--------------------*/
       resule=productUser.filter((item)=>{
           if(item.mdhUP.mdh.toString() === msdh.toString().trim()){
             serchItem.push(item);
             console.log('mdh--serch',serchItem);
           }
        return resule;
       });
       /*----------return serch ma don hang--------------*/
       if(serchItem.length <= 0){
           resuleSSS= <div style={{color:'#fc0',margin:'50px 0px'}}>
                         <h1>CHƯA CÓ MÃ ĐƠN HÀNG TRA CỨU</h1>
                         <h3>VUI LÒNG NHẬP MÃ ĐƠN HÀNG ĐỂ KIỂM TRA</h3>
                      </div>  
       
       }else{
           resuleSSS=serchItem.map((item,index)=>{
              var card=item.cartshop;
                var resule1=card.map((product,index)=>{
                  return <tr key={index}>
                          <td>{index+1}</td>
                          <td>{product.product.name}</td>
                          <td>{product.product.price} USD</td>
                          <td>{product.sll}</td>
                        </tr>
                })

                var total=0;
                for(var i=0;i<card.length;i++){
                  total+=card[i].product.price*card[i].sll;
                }
         
                let dayJS= new Date(item.time*1000);
                let day=dayJS.getDay()+1;
                let convert_day='';

                switch(day) {
                  case 2:
                    convert_day='Thứ Hai ';
                    break;
                  case 3:
                    convert_day='Thứ Ba ';
                    break;
                  case 4:
                    convert_day='Thứ Tư ';
                    break;
                  case 5:
                    convert_day='Thứ Năm ';
                    break;
                  case 6:
                    convert_day='Thứ Sáu ';
                    break;
                  case 7:
                    convert_day='Thứ Bảy ';
                    break;
                  default:
                    convert_day='Chủ Nhật ';
                    break;
                }
                let date=dayJS.getDate();
                let month=dayJS.getMonth()+1;
                let year=dayJS.getFullYear();
                let hour=dayJS.getHours();
                let minutes=dayJS.getMinutes();
                let secconds=dayJS.getSeconds();
                let full= convert_day+', Ngày '+date+' Tháng '+month+' Năm '+year+
                ' '+hour+' giờ '+minutes+' phút '+secconds+' giây ';

           return <div className="don-hang-item" key={index}>
                    <h2>Đơn Hàng Tra Cứu</h2>
                    <h3>Mã Tra Cứu: {item.mdhUP.mdh}</h3>
                    <button type="button" className="btn btn-danger" onClick={()=>this.ON_Delete(item.id)}>Hủy Đơn Hàng</button>
                      <table className="table table-bordered table-hover">
                      <thead>
                        <tr>
                          <th>STT</th>
                          <th>Sản Phẩm</th>
                          <th>Giá Đơn</th>
                          <th>Số Lượng</th>
                        </tr>
                      </thead>
                      <tbody>
                        {resule1}
                      </tbody>
                      </table>
                      <h4>Thông Tin Khách Hàng</h4>
                      <div className="text-user">
                        <h4>Tên: {item.user.nameUR}</h4>
                        <h4>Giới Tính: {item.user.sexUR===1?'Nam':'Nữ'} </h4>
                        <h4>Địa Chỉ: {item.user.dcUR}</h4>
                        <h4>Số Điện Thoại: {item.user.phoneUR} </h4>
                        <h2>Tổng Tiền Cần Thanh Toán: {total} USD</h2>
                      </div>
                      
                      <div style={{fontSize:'18px',margin:'15px 0'}}>Mã đơn hàng : {item.mdhUP.mdh}</div>
                      <div style={{fontSize:'18px'}}>Ngày Đặt Hàng: {full}</div>
                      <div id='note'>Ghi Chú : {item.user.note}</div>
                   </div>
                });//---resuleSSS---
           }//---else----
    return resuleSSS;
  }//-----showTableUser----
  /*===============xoa item don hang==============*/
  ON_Delete=(id)=>{
	  if(window.confirm('bạn có chắc muốn xóa không')){
	  	if(window.confirm('nếu muốn xóa hãy bấm ok')){
	  		this.props.deleteItem(id);
	  		window.alert('bạn vừa xóa thành công 1 đơn hàng');
	  	}
	  }
  }
  /*===============xoa item don hang==============*/

}


var mapStateToProp=(state)=>{
	return{
		productUser:state.productUser,
	}
}
var mapDispathToProp=(dispath,props)=>{
	return{
		getProductUser:()=>{
			dispath(action.get_products_api())
		},
		deleteItem:(id)=>{
			dispath(action.delete_item_api(id))
		},
	}
}

export default connect(mapStateToProp,mapDispathToProp)(Products);





/*serchItem=productUser.map((item,index)=>{
      if(item.mdhUP.mdh === msdh){
        serchItem=item;
        console.log('test-item',serchItem);

        var card=serchItem.cartshop;
        var resule1=card.map((product,index)=>{
          return <tr key={index}>
                  <td>{index+1}</td>
                  <td>{product.product.name}</td>
                  <td>{product.product.price} USD</td>
                  <td>{product.sll}</td>
                </tr>
        })

        var total=0;
        for(var i=0;i<card.length;i++){
          total+=card[i].product.price*card[i].sll;
        }
 
        let dayJS= new Date(serchItem.time*1000);
        let day=dayJS.getDay()+1;
        let convert_day='';

        switch(day) {
          case 2:
            convert_day='Thứ Hai ';
            break;
          case 3:
            convert_day='Thứ Ba ';
            break;
          case 4:
            convert_day='Thứ Tư ';
            break;
          case 5:
            convert_day='Thứ Năm ';
            break;
          case 6:
            convert_day='Thứ Sáu ';
            break;
          case 7:
            convert_day='Thứ Bảy ';
            break;
          default:
            convert_day='Chủ Nhật ';
            break;
        }
        let date=dayJS.getDate();
        let month=dayJS.getMonth()+1;
        let year=dayJS.getFullYear();
        let hour=dayJS.getHours();
        let minutes=dayJS.getMinutes();
        let secconds=dayJS.getSeconds();
        let full= convert_day+', Ngày '+date+' Tháng '+month+' Năm '+year+
        ' '+hour+' giờ '+minutes+' phút '+secconds+' giây ';

       
        resule= <div className="don-hang-item">
                <h2>Đơn Hàng Tra Cứu</h2>
                <button type="button" className="btn btn-danger" onClick={()=>this.ON_Delete(serchItem.id)}>Delete</button>
                  <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Sản Phẩm</th>
                      <th>Giá Đơn</th>
                      <th>Số Lượng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resule1}
                  </tbody>
                  </table>
                  <h4>Thông Tin Khách Hàng</h4>
                  <div className="text-user">
                    <h4>Tên: {serchItem.user.nameUR}</h4>
                    <h4>Giới Tính: {serchItem.user.sexUR===1?'Nam':'Nữ'} </h4>
                    <h4>Địa Chỉ: {serchItem.user.dcUR}</h4>
                    <h4>Số Điện Thoại: {serchItem.user.phoneUR} </h4>
                    <h2>Tổng Tiền Cần Thanh Toán: {total} USD</h2>
                  </div>
                  
                  <div style={{fontSize:'18px',margin:'15px 0'}}>Mã đơn hàng : {serchItem.mdhUP.mdh}</div>
                  <div style={{fontSize:'18px'}}>Ngày Đặt Hàng: {full}</div>
                  <div id='note'>Ghi Chú : {serchItem.user.note}</div>
                  <h2>id----{serchItem.id}</h2>
               </div>

      }

    return resule;
    });
   return resule;*/