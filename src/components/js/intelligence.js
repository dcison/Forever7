import React from 'react'
import {Button,Col,Panel, PageHeader,Alert} from 'react-bootstrap'
import {Information} from './data'
import ReactDom from 'react-dom'
import '../assets/less/intelligence.less'
class Intelligence extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            daily: [],
            hero: null,
            hasStop: 0,
            name: [],
            hasUpdate: false
        }
    }
    setIntelligence(){
        let num1 = Math.floor(Math.random()*7),
        num2 = Math.floor(Math.random()*7),
        arr = [],
        name = [],
        temp = null
        while(num1 == num2){
            num2 = Math.floor(Math.random()*7)
        }
        arr.push(Information.daily[num1])
        arr.push(Information.daily[num2])
        name.push(Information.daily[num1].name)
        name.push(Information.daily[num2].name)
        if (this.props.data.day > 2){
            temp = Information.hero[5 - this.props.data.day]
            name.push(temp.name)
        }
        this.setState({
            daily: arr,
            hero: temp == null?null:temp,
            name: name
        })  
    }
    componentDidUpdate(){
        let node = ReactDom.findDOMNode(this)
        if (!this.props.data.hasUpdate2){
            if ( this.props.data.day <= 5 ){
                this.setIntelligence()
                node.querySelector('#sureIntelligence').disabled = false
                this.setState({
                    hasStop: 0
                })
                this.props.changeData(9,true) 
            }
                  
        }
    }
    stopIntelligence(e,mode){
        let hero = this.state.hero,
            arr = this.state.daily,
            index,
            need = 0,
            flag = false //判断情报足不足，初始不足
        if( !mode ){
            arr.map((item,i)=>{
                if (item.name == e.target.innerHTML){
                    if(this.props.data.info - this.state.hasStop >= item.need){
                        flag = true
                    }
                    index = i
                    need = item.need
                }
            })
            if(arr.length != 2 && index == undefined){
                window.alert("已阻止过该事件")
            }else{
                if (flag){
                    let ensure = window.confirm(`${e.target.innerHTML}所需情报为${need}，是否确认阻止`)
                    if (ensure){
                        arr.splice(index,1)
                        window.alert("成功阻止该事件")
                        this.setState({
                            hasStop: this.state.hasStop + need
                        })
                    }
                }else{
                    window.alert(`情报不足！当前情报${this.props.data.info - this.state.hasStop },所需情报为${need}`)
                }
            }            
        }else{
            if( this.state.hero == null ){
                window.alert("已阻止过该事件")
            }else{
                if(this.props.data.info - this.state.hasStop  >= 60){
                    let ensure = window.confirm(`${e.target.innerHTML}所需情报为60，是否确认阻止`)
                    if (ensure){
                        window.alert("成功阻止该事件")
                        this.setState({
                            hero: null,
                            hasStop: this.state.hasStop + 60
                        })
                    }                    
                }else{
                    window.alert(`情报不足！当前情报${this.props.data.info - this.state.hasStop },所需情报为60`)
                }
            }            
        }
    }
    sureIntelligence(){
        let sure = window.confirm("确认过后更改处理情报也无用了哦！"),
            node = ReactDom.findDOMNode(this)
        if (sure){
            node.querySelector('#sureIntelligence').disabled = true
            this.props.getIntelligence(this.state.daily,0)
            this.props.getIntelligence(this.state.hero,1)
        }
    }
    assassination(index){
        let ensure 
        if (this.props.data.info - this.state.hasStop >= Information.assassination[index].need){
            ensure = window.confirm(`${Information.assassination[index].name}所需情报为${Information.assassination[index].need}，是否确认?`)
            if (ensure){
                this.props.getAssassination(7 - index)
                this.setState({
                    hasStop: this.state.hasStop + Information.assassination[index].need
                })
            }  
        }else{
            window.alert(`情报不足！当前情报${this.props.data.info - this.state.hasStop },所需情报为${Information.assassination[index].need}`)
        }
    }
    special(){
        let ensure = window.confirm("确定回收这三个地区的黑核吗？")
        if (ensure){
            this.props.recoverSpecial()
        }        
    }
    render(){
        let {day} = this.props.data
        return (
            <div>
                <Alert bsStyle="warning">
                    情报系统第五天开启，上方的情报值是<strong>总情报</strong>，
                    不会因为处理情报而显示减少，在处理情报时会提示真正的剩余情报值,
                    <br/>交通故障、发现绿装、幻力增强仅做<strong>提示</strong>，系统不会真正进行；
                    <br />情报系统：日常情报、希罗情报、突袭情报，如之前因剧情把中央、古街、研究所黑核给希罗后，可通过刺杀希罗按钮（模拟刺杀希罗剧情）回收这三个地区的黑核(如果这三个地区的黑核都在希罗手上的话)
                    进入下一天前必须得按过<strong>确认情报</strong>按钮（无论是否要处理情报）否则系统会提示，避免遗忘情报
                </Alert>
                {day <= 5?(
                    <div>
                        <Col sm={4}>
                            <Panel>
                                <Panel.Heading>日常情报</Panel.Heading>
                                <Panel.Body>
                                    <Button className="infoButton" onClick={(e,mode) => this.stopIntelligence(e,0)}>{this.state.name[0]}</Button>
                                    <Button className="infoButton" onClick={(e,mode) => this.stopIntelligence(e,0)}>{this.state.name[1]}</Button>
                                </Panel.Body>
                            </Panel>
                        </Col>
                        {day>2?(
                            <Col sm={6}>
                                <Panel>
                                    <Panel.Heading>希罗情报</Panel.Heading>
                                    <Panel.Body>
                                        <Button className="infoButton" onClick={(e) => this.stopIntelligence(e,1)}>{ this.state.name[2] }</Button>
                                    </Panel.Body>
                                </Panel>
                            </Col>
                        ): (
                        <Col sm={6}>
                            <Panel>
                                <Panel.Heading>刺杀情报</Panel.Heading>
                                <Panel.Body>
                                    <Button className="infoButton" onClick={this.assassination.bind(this,0)}>{Information.assassination[0].name}</Button>
                                    <Button className="infoButton" onClick={this.assassination.bind(this,1)}>{Information.assassination[1].name}</Button>
                                    <Button className="infoButton" onClick={this.assassination.bind(this,2)}>{Information.assassination[2].name}</Button>
                                    <Button className="infoButton" onClick={this.special.bind(this)}>刺杀希罗</Button>
                                </Panel.Body>
                            </Panel>
                        </Col>
                        )}
                        <Button id="sureIntelligence" bsStyle="success" onClick={this.sureIntelligence.bind(this)}>确认情报</Button>
                    </div>
                ):<div>情报系统暂未开启</div>}
            </div>
        )
    }
}
export default Intelligence