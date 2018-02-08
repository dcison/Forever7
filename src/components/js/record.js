import React from 'react'
import {ListGroupItem,ListGroup, Row, Grid,Col,Button} from 'react-bootstrap'
class Record extends React.Component{
    nextDay(){
        if (this.props.data.day <= 5){
            if (this.props.data.ensureIntelligence){
                if (this.props.data.day != 1 ){
                    this.props.changeData(1,this.props.data.day-1)
                    this.props.changeData(5,24)
                    this.props.changeData(7,null)
                    this.props.changeData(8,false)
                    this.props.changeData(9,false)
                }else{
                    window.alert("已经是最后一天了")
                }  
            }else{
                window.alert("请先确认过情报哦")
            }  
        }else{
            if (this.props.data.day != 1 ){
                this.props.changeData(1,this.props.data.day-1)
                this.props.changeData(5,24)
                this.props.changeData(8,false)
            }else{
                window.alert("已经是最后一天了")
            }
        }
                 
    }
    render(){
        let arr = this.props.record        
        return (
            <Grid>
                <Row>
                    <Col sm={12}>
                        <h3>历史记录</h3>
                        {
                            arr.length>0?
                            <Col>
                                <ListGroup>                
                                    {arr.map((item,index)=>{
                                            return <ListGroupItem key={index}>{item}</ListGroupItem>
                                    })}
                                </ListGroup>
                                {this.props.data.ap == 0?<Button onClick={this.nextDay.bind(this)}>下一天</Button>:""}
                            </Col>:"暂无记录"
                        }                        
                    </Col>
                </Row>
            </Grid>
        )
    }
}
export default Record