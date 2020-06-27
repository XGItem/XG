import React from "react";
import XLSX from 'xlsx'
import './config'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
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
            console.log(typeof(data));
            global.yxx = data;
            let a = JSON.stringify(data);
            document.write(global.yxx);
            console.log(a);
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
        console.log(global.yxx);
        super(props);
        this.state={

        }
    }



    render() {
        return(

            <body>
            <input type='file' accept='.xlsx, .xls,.csv' onChange={(e)=>{importExcel(e)} }/>
            <linechart data = {global.yxx}>
                <XAxis dataKey="Country/Region"/>
                <YAxis/>
                <Tooltip />
                <Line type="monotone" dataKey="Lat" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Long" stroke="#82ca9d" />
                <Legend />
            </linechart>

            </body>
        )
    }

}