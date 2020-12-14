import React,{Component} from 'react';
import './App.css';

import Products from './component/products/products';

class App extends Component {
  render(){
    return(
      <React.Fragment>
       <Products />
      </React.Fragment>
    )
  }
}
export default App;
