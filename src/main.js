import React from 'react';
import ReactDom from 'react-dom';
import Header from './components/js/header'
import Control from './components/js/control'
import Footer from './components/js/footer'
import Record from './components/js/record';
import record from './components/js/record';
import {Button} from 'react-bootstrap'

var count = 1

class Main extends React.Component{
  constructor(props){
      super(props)
      this.state = {
          day: 5, //初始第七天
          magic: 0, //幻力起始为5
          tech: 0, //科技起始5
          info: 0, //情报初始5
          ap:24, //行动力24点          
          patrol: 0, //今日巡查次数0
          record: [<strong style={{"color":"green"}}>第7天</strong>]
      }
  }
  changeData(choice,data){ //choice选择要改变的选项，data为改变的值,1-6分别对应天，幻力，科技，情报，行动力，巡查次数
    switch(choice){
      case 1:
        let arr = this.state.record
        this.setState({
          day: data,
          patrol: 0 //巡查清0
        })        
        arr.push(<strong style={{"color":"green"}}>第{data}天</strong>)
        break
      case 2:
        this.setState({
          magic: data
        })
        break
      case 3:
        this.setState({
          tech: data
        })
        break
      case 4:
        this.setState({
          info: data
        })
        break
      case 5:
        this.setState({
          ap: data
        })
        break
      case 6:
        this.setState({
          patrol: data
        })
        break
    }
  }
  addRemarks(count){
      let node = ReactDom.findDOMNode(this),
          value = node.querySelector(`#re_${count}`),
          data    
      data = window.prompt("请输入备注")
      if (data){
        value.innerHTML += "；备注："+data
      }      
  }
  addRecord(A,B,C,mode,city,data){//A B C 对应神器使,mode对应操作,city,data对应数据
    let text = "",arr = this.state.record
    switch(mode){
      case 1:
        text = <div>
          <span id={`re_${count}`} style={{"marginRight":"20px"}}>{A}、{B}、{C}在{city}战斗了{data}次</span>
          <Button bsStyle="warning" bsSize="small" onClick={this.addRemarks.bind(this,count)}>添加备注</Button>
        </div>
        arr.push(text)
        break
      case 2:
        text = <div>
          <span id={`re_${count}`} style={{"marginRight":"20px"}}>{A}、{B}、{C}在{city}进行{data}</span>
          <Button bsStyle="warning" bsSize="small" onClick={this.addRemarks.bind(this,count)}>添加备注</Button>
        </div>
        arr.push(text)
        break
      case 3:
        text = <div>
          <span id={`re_${count}`} style={{"marginRight":"20px"}}>{A}、{B}、{C}在{city}建设了{data}</span>
          <Button bsStyle="warning" bsSize="small" onClick={this.addRemarks.bind(this,count)}>添加备注</Button>
        </div>
        arr.push(text)
        break
      case 4:
        text = <div>
          <span id={`re_${count}`} style={{"marginRight":"20px"}}>{A}、{B}、{C}在{city}开发{data}次</span>
          <Button bsStyle="warning" bsSize="small" onClick={this.addRemarks.bind(this,count)}>添加备注</Button>
        </div>
        arr.push(text)
        break
      case 5:
        text = <div>
          <span id={`re_${count}`} style={{"marginRight":"20px"}}>我特么宅暴</span>
          <Button bsStyle="warning" bsSize="small" onClick={this.addRemarks.bind(this,count)}>添加备注</Button>
        </div>
        arr.push(text)
        break
      case 6:
        text = <div>
          <span id={`re_${count}`} style={{"marginRight":"20px"}}>赠送{A}8点礼物，好感变为{data[0]},目前已赠送过{data[1]}次</span>
          <Button bsStyle="warning" bsSize="small" onClick={this.addRemarks.bind(this,count)}>添加备注</Button>
        </div>
        arr.push(text)
        break
      case 7:
        text = <div>
          <span id={`re_${count}`} style={{"marginRight":"20px"}}>神器使{A}好感为{data}</span>
          <Button bsStyle="warning" bsSize="small" onClick={this.addRemarks.bind(this,count)}>添加备注</Button>
        </div>
        arr.push(text)
        break
      default:
        return
    }
    count++
  }
  render(){
    return (
    <div>
      <Header data = {this.state} />
      <Control data = {this.state} changeData = {this.changeData.bind(this)} addRecord = {this.addRecord.bind(this)}/>
      <Record  data = {this.state} record = {this.state.record}  changeData = {this.changeData.bind(this)}/>
      <Footer />
    </div>
    )
  }
}

ReactDom.render(
  <Main />,
  document.getElementById('app')
);