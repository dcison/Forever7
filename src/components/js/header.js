import React from 'react'
import { Navbar,Nav,NavItem } from 'react-bootstrap'
import '../assets/less/header.less'
class Header extends React.Component{    
    render(){
        const {day,magic,tech,info,ap,patrol} = this.props.data
        return(
            <Navbar fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
				        永远的绿色之都在线模拟
                    </Navbar.Brand>
		        </Navbar.Header>
                <Nav pullRight>                
                    <NavItem className="navRight">第{day}天</NavItem>
                    <NavItem className="navRight">幻力:{magic}</NavItem>
                    <NavItem className="navRight">科技:{tech}</NavItem>
                    <NavItem className="navRight">情报:{info}</NavItem>
                    <NavItem className="navRight">行动力:{ap}</NavItem>
                    <NavItem className="navRight">今日已巡查次数:{patrol}</NavItem>
                </Nav>
            </Navbar>
        )
    }
}
export default Header;