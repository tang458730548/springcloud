import React, {Component} from 'react';   
import {Spin} from 'antd';

class Home extends Component {                                                                                       
                                                                                                                      
    constructor(props) {                                                                                              
        super(props);   
        this.state = {
            loading : false
        }                  
    }
    
    componentDidMount(){
        
        this.setState({
            loading : true
        })

        setTimeout(() => {
            this.setState({
                loading : false
            })
        }, 2000);
    }
                                                                                                                      
    render() {                                                                                                        
        return (    
            <div>
                <Spin spinning={this.state.loading} tip="欢迎您"></Spin> 
            </div>                                                                                                  
        )                                                                                                             
    }                                                                                                                 
}                                                                                                                     
                                                                                                                      
export default Home;                                                                                                 