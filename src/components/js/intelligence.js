import React from 'react'
import {Button,Col,Panel, PageHeader,Alert} from 'react-bootstrap'
import {Information} from './data'
import '../assets/less/intelligence.less'
class Intelligence extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            daily: [],
            hero: {},
            currentDay: 5,
            hasStop: 0,
            name: []
        }
    }
    componentWillMount(){
        this.setIntelligence()
    }
    setIntelligence(){
        let num1 = Math.floor(Math.random()*7),
            num2 = Math.floor(Math.random()*7),
            arr = [],
            name = []
        while(num1 == num2){
            num2 = Math.floor(Math.random()*7)
        }
        arr.push(Information.daily[num1])
        arr.push(Information.daily[num2])
        name.push(Information.daily[num1].name)
        name.push(Information.daily[num2].name)
        name.push(Information.hero[5 - this.props.data.day].name)
        this.setState({
            daily: arr,
            hero: Information.hero[5 - this.props.data.day],
            name: name
        })
    }
    componentDidUpdate(){
        if (this.props.data.day < 5){
            if (this.props.data.day != this.state.currentDay){
                this.setIntelligence()
                this.setState({
                    currentDay: this.state.currentDay - 1
                })
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
                            hasStop: need
                        })
                    }
                }else{
                    window.alert(`情报不足！当前情报${this.props.data.info - this.state.hasStop },所需情报为${need}`)
                }
            }            
        }else{
            if(Object.getOwnPropertyNames(this.state.hero).length == 0){
                window.alert("已阻止过该事件")
            }else{
                if(this.props.data.info - this.state.hasStop  >= 60){
                    let ensure = window.confirm(`${e.target.innerHTML}所需情报为60，是否确认阻止`)
                    if (ensure){
                        window.alert("成功阻止该事件")
                        this.setState({
                            hero: {}
                        })
                    }                    
                }else{
                    window.alert(`情报不足！当前情报${this.props.data.info - this.state.hasStop },所需情报为60`)
                }
            }            
        }
    }
    render(){
        let {day} = this.props.data
        return (
            <div>
                <Alert bsStyle="warning">情报系统第五天开启，上方的情报值是<strong>总情报</strong>，不会因为处理情报而显示减少，在处理情报时会提示真正的剩余情报值</Alert>
                {day <= 5?(
                    <div>
                        <Col sm={6}>
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
                                    <Button className="infoButton">{Information.assassination[0].name}</Button>
                                    <Button className="infoButton">{Information.assassination[1].name}</Button>
                                    <Button className="infoButton">{Information.assassination[2].name}</Button>
                                </Panel.Body>
                            </Panel>
                        </Col>
                        )}
                    </div>
                ):<div>情报系统暂未开启</div>}
            </div>
        )
    }
}
export default Intelligence