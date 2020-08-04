import React from "react";
import XLSX from 'xlsx'
import ReactDOM from 'react-dom';
import './config.js'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import {Button} from "antd";
import 'antd/dist/antd.css';
import debounce from 'lodash/debounce';
import querystring from 'querystring';
import $ from 'jquery';
import Country from "./country";

let b = [
    {"Country/Region":'US',"Lat":15,"Long":101,'Province/State':'aaa'},
    {"Country/Region":'US',"Lat":15,"Long":101,'Province/State':'aaa'},
    {"Country/Region":'Japan',"Lat":36,"Long":138,'Province/State':'bbb'}];
let d =[];
let i = 0;


function importExcel(file){

    // 获取上传的文件对象
    const { files } = file.target;
    // 通过FileReader对象读取文件
    const fileReader = new FileReader();
    fileReader.onload = event => {
        try {
            const { result } = event.target;
            // 以二进制流方式读取得到整份excel表格对象
            const workbook = XLSX.read(result, { type: 'binary' });
            let data = []; // 存储获取到的数据
            // 遍历每张工作表进行读取（这里默认只读取第一张表）
            for (const sheet in workbook.Sheets) {
                if (workbook.Sheets.hasOwnProperty(sheet)) {
                    // 利用 sheet_to_json 方法将 excel 转成 json 数据
                    data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                    // break; // 如果只取第一张表，就取消注释这行
                }
            }
            global.yxx = data;
            // let a = JSON.stringify(data);
            // // document.getElementById('a').innerHTML=a;
            // // console.log(typeof(a));
            // // console.log(b);
            // d[0] = global.yxx[0]["Country/Region"];
            // let k = 1;
            // let i=0,j=0;
            // for(i= 0;i<global.yxx.length;i++) {
            //     if (d[k-1] !== global.yxx[i]["Country/Region"]) {
            //         d[k] = global.yxx[i]["Country/Region"];
            //         k++;
            //     }
            // }
            // console.log(d.length);
            //
            // //查重
            // for (i=0;i<d.length-1;i++){
            //     for(j=i+1;j<d.length;j++){
            //         if(d[i]===d[j]){
            //             d.splice(j,1);
            //         }
            //     }
            // }
            // for (i=0;i<d.length;i++){
            //     for (j=1;j<global.yxx.length;j++){
            //         if(global.yxx[j]["Country/Region"]===d[i]){
            //             e.d[i]=[];
            //             if(global.yxx[j]['Province/State']){
            //                 e.d[i]=global.yxx[j]['Province/State'];
            //             }
            //             else {
            //                 e.d[i]=' ';
            //             }
            //         }
            //     }
            // }
            // for (i=0;i<9;i++){
            //     children2.push(<Option key={d[i]} value={d[i]}>{d[i]}</Option>);
            // }
            // for (let i = 10; i < 36; i++) {
            //     children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
            // }
            // document.getElementById('a').innerHTML = JSON.stringify(d);
            // document.getElementById('b').innerHTML = JSON.stringify(global.yxx);
            // console.log(d)
            let persons = [];
            let number;
            let region = "Chile";
            for(let i =0;i<184;i++){
                if(data[i]["Country/Region"]===region){
                    number = i;
                }
            }
            for(let i =0;i<184;i++){
                persons.push({time:1,region:2})
            }

            let a= Object.keys(data[0]);
            for(let j =0;j<184;j++){
                persons[j]["time"] = a[j+3];
                persons[j]["Chile"] = data[number][a[j+3]];
            }
            global.yxx = persons;
            console.log(data);
            //global.yxx =JSON.stringify(data);
            //document.write(a);
            //console.log(a);
        } catch (e) {
            // 这里可以抛出文件类型错误不正确的相关提示
            console.log('文件类型不正确');
        }
    };
    // 以二进制方式打开文件
    fileReader.readAsBinaryString(files[0]);

}

export default class Index extends React.Component{
    constructor(props){
        super(props);
        this.state={
            ch : global.yxx,
            inpValu:''
        }
    }
    refresh = () =>{
        this.setState({
            ch : global.yxx,
        });
    };
    handelChange1(e){
        this.setState({
            inpValu:e.target.value
        })
    };
    us = () =>{
        this.setState({
            ch : global.yxx,
        });
        // let j = 0;
        // let c = [];
        // for (i =0;i<global.yxx.length;i++ ){
        //     if(global.yxx[i]["Country/Region"] === this.state.inpValu){
        //         c[j]=global.yxx[i];
        //         j++;
        //     }
        // }

    };

    render() {
        return(
            <body>
            <input type='file' accept='.xlsx, .xls,.csv' onChange={(e)=>{importExcel(e)} }/>
            <div>{this.state.inpValu}</div>
            <div id={'a'}>aaa</div>
            <input type="text" onChange={this.handelChange1.bind(this)} defaultValue={this.state.inpValu}/>
            <Button onClick={this.us}>确定</Button>
            <Country data={this.state.ch}/>
            <div id={'search'}>aaa</div>
            <LineChart data = {global.yxx} width={730} height={250}>
                <Line type="monotone" dataKey="Lat" stroke="#8884d8"  activeDot={{ r: 8 }}/>
                <Line type="monotone" dataKey="Long" stroke="#82ca9d" />
                <XAxis dataKey={'Country/Region'}/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip  />
                <Legend />
            </LineChart>
            <div>
                <LineChart data = {this.state.ch} width={1000} height={250}>
                    {/*<Line type="monotone" dataKey="3/22/20" stroke="#8884d8"  activeDot={{ r: 8 }}/>*/}
                    {/*<Line type="monotone" dataKey="3/23/20" stroke="#82ca9d" />*/}
                    <Line type="monotone" dataKey={"Chile"} stroke="#8884d8"  activeDot={{ r: 8 }}/>
                    <XAxis dataKey={'time'}/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip />
                    <Legend />
                </LineChart>
            </div>
            <button onClick={this.refresh} >refresh</button>
            <button onClick={this.us}>{this.state.inpValu}</button>
            <div id={'b'}>aa</div>
            </body>
        )
    }
}


