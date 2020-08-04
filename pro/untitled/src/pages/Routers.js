import React from "react";
import {Route} from "react-router-dom";
import Index from "./index";
import Country from "./country";



export default class Routers extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }
    render() {
        return(
            <div>
                <Route exact path={'/'} component={Index}/>
                <Route exact path={'/Cou'} component={Country}/>
            </div>
        )
    }
}