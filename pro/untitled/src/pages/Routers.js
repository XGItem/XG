import React from "react";
import {Route} from "react-router-dom";
import Index from "./index";



export default class Routers extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }
    render() {
        return(
            <div>
                <Route exact path={'/'} component={Index}/>
            </div>
        )
    }
}