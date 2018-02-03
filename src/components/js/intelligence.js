import React from 'react'
import {Button,Col,Panel, PageHeader} from 'react-bootstrap'
import {Information} from './data'
import '../assets/less/intelligence.less'
class Intelligence extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            daily: [],
            hero: {}
        }
    }
    componentWillMount(){
        let num1 = Math.floor(Math.random()*7),
            num2 = Math.floor(Math.random()*7),
            arr = []
        while(num1 == num2){
            num2 = Math.floor(Math.random()*7)
        }
        arr.push(Information.daily[num1])
        arr.push(Information.daily[num2])
        this.setState({
            daily: arr,
            hero: Information.hero[5 - this.props.data.day]
        })
    }
    stopIntelligence(e,mode){
        let hero = this.state.hero,
            arr = this.state.daily
        if( !mode ){
            console.log("日常",e.target.innerHTML)
            //把各项的情报列出来
        }else{
            if(this.props.data.info >= 60){
                this.setState({
                    hero: {}
                })
            }else{
                window.alert(`情报不足！当前情报${this.props.data.info},所需情报为60`)
            }
        }
    }
    render(){
        let {day} = this.props.data
        return (
            <div>
                {day <= 5?(
                    <div>
                        <Col sm={6}>
                            <Panel>
                                <Panel.Heading>日常情报</Panel.Heading>
                                <Panel.Body>
                                    <Button className="infoButton" onClick={(e,mode) => this.stopIntelligence(e,0)}>{this.state.daily[0].name}</Button>
                                    <Button className="infoButton" onClick={(e,mode) => this.stopIntelligence(e,0)}>{this.state.daily[1].name}</Button>
                                </Panel.Body>
                            </Panel>
                        </Col>
                        {day>2?(
                            <Col sm={6}>
                                <Panel>
                                    <Panel.Heading>希罗情报</Panel.Heading>
                                    <Panel.Body>
                                        <Button className="infoButton" onClick={(e) => this.stopIntelligence(e,1)}>{ this.state.hero.name }</Button>
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