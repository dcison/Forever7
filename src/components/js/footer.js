import React from 'react'
import { Grid, Row, Col,Panel } from 'react-bootstrap'
import '../assets/less/footer.less'

class Footer extends React.Component {
    render() {
        return (
            <Panel className="footer">
                <span>Copyright © <a target="_blank" href="https://github.com/dcison">Dcison</a> All Rights Reserved</span>
            </Panel>
        )
    }
}
export default Footer;