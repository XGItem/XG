import React from "react";
import $ from 'jquery';
import './country.css';
import XLSX from "xlsx";

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
            global.zzh = data;
        } catch (e) {
            // 这里可以抛出文件类型错误不正确的相关提示
            console.log('文件类型不正确');
        }
    };
    // 以二进制方式打开文件
    fileReader.readAsBinaryString(files[0]);

}
export default class Country extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:global.zzh,
        }
    }
    handleChange(){
        this.setState({
            data:global.zzh
        });
        let text="";
        setInterval(()=> {
            text=$('.search').val();//获取文本框输入
            if ($.trim(text)!==""){
                $("table tbody tr").hide().filter(":contains('"+text+"')").show();
            }
            else {
                $('table tr').show();//当删除文本框的内容时，又重新显示表格所有内容
            }
        },3000);
    }
    render(){
        return(
                <div>
                    <p>{this.state.Cou}</p>
                    <input type='file' accept='.xlsx, .xls,.csv' onChange={(e)=>{importExcel(e)} }/>
                    <input type={'text'} className={'search'} placeholder={'search'} id="serach" onChange={this.handleChange.bind(this)}/>
                    <table clsssName="table">
                        <thead>
                        <tr>
                            <th>Country/Region</th>
                            <th>Province/State</th>
                        </tr>
                        </thead>
                    <ProList data={this.state.data}/>
                    </table>
                </div>
        )
    }
}
class ProList extends React.Component{
    render(){
        return(
            <tbody>
            {this.props.data.map((pro)=>{
                return (
                    <tr>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <td ><a href={pro['Country/Region']}>{pro['Country/Region']}</a></td>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <td >{pro['Province/State']}</td>
                    </tr>
                )
            })}
            </tbody>
        )
    }
}
// class ProItem extends React.Component{
//     render(){
//         console.log('4');
//         // let proj=this.state.data;
//         console.log('3');
//         console.log(this.state.data);
//         return(
//             <tr>
//                 {/*<td>{proj.name}</td>*/}
//                 {/*<td>{proj.price}</td>*/}
//                 {/*<td>{proj.sale}</td>*/}
//                 <td>aaa</td>
//             </tr>
//         )
//     }
// }
// ReactDOM.render(<Country/>,document.querySelector('#example'));
