import React from 'react'
import {ProgressBar,Panel,DropdownButton,MenuItem,Button,ButtonToolbar,Grid,Row,Col,Alert,Nav,NavItem,Form,FormGroup,ControlLabel,FormControl,Dropdown, ButtonGroup} from 'react-bootstrap'
import '../assets/less/control.less'
import {ArtifactList,BuildingList} from './data'
import ReactDom from 'react-dom'
import Intelligence from './intelligence'

var recordCity  //记录古街、城区先选了哪一座城市
class Control extends React.Component{
    constructor(props){
        super(props)
        this.state = { 
            currentKey: "1", //1表示战斗，2表示巡查，3表示建设，4表示开发，5表示宅
            currentCity: {
                name: "中央庭",
                battle: 6, //6表示clear，不需要战斗 0-5已战斗次数
                blackcore: 1, //0-“未拥有” 1-“我方拥有” 2-“希罗占领”
                development: 0, //0-4 - “已开发次数”
                architecture: ["中央庭基地"],
                magic: 5,
                tech: 5,
                info: 5,
                hasOpen: true //交战区域是否开启
            },
            currentData: {
                artifactA: "暂未设定",
                artifactB: "暂未设定",
                artifactC: "暂未设定",
                controlValue: "暂未设定"
            }, //存放当前的一些属性，比如当前幻力，城市活动中神器使开发力、巡查力等
            artifact: null, //神器使数量
            showMessage: false, //展示预览信息
            mainArtifact: [], //主要神器使
            city: [
                {
                    name: "中央庭",
                    battle: 6,
                    blackcore: 1, 
                    development: 0,
                    magic: 5,
                    tech: 5,
                    info: 5,
                    architecture: ["中央庭基地"],
                    needMagic:0,
                    hasOpen: true
                },
                {
                    name: "高校学园",
                    battle: 0,
                    blackcore: 0,
                    development: 0,
                    architecture: [],
                    magic: 0,
                    tech: 0,
                    info: 0,
                    needMagic: 5, //所需幻力
                    hasOpen: true
                },
                {
                    name: "东方古街",
                    battle: 0,
                    blackcoreTimes: 0, //古街记录黑核巡查次数
                    blackcore: 0,
                    development: 0,
                    magic: 0,
                    tech: 0,
                    info: 0,
                    architecture: [],
                    needMagic: 10,
                    hasOpen: false
                },
                {
                    name: "中央城区",
                    battle: 0,
                    blackcore: 0,
                    development: 0,
                    magic: 0,
                    tech: 0,
                    info: 0,
                    architecture: [],
                    needMagic: 10,
                    hasOpen: false
                },
                {
                    name: "研究所",
                    battle: 0,
                    blackcore: 0,
                    development: 0,
                    magic: 0,
                    tech: 0,
                    info: 0,
                    architecture: [],
                    needMagic: 20,
                    hasOpen: false
                },
                {
                    name: "海湾侧城",
                    battle: 0,
                    blackcore: 0,
                    development: 0,
                    magic: 0,
                    tech: 0,
                    info: 0,
                    architecture: [],
                    needMagic: 50,
                    hasOpen: false
                },
                {
                    name: "旧城区",
                    battle: 0,
                    blackcore: 0,
                    development: 0,
                    magic: 0,
                    tech: 0,
                    info: 0,
                    architecture: [],
                    needMagic: 100,
                    hasOpen: false
                },
                {
                    name: "港湾区",
                    battle: 0,
                    blackcore: 0,
                    development: 0,
                    magic: 0,
                    tech: 0,
                    info: 0,
                    architecture: [],
                    needMagic: 150,
                    hasOpen: false
                }
            ],
            buildingType: "建筑类别",
            building: {
                name: "",
                build: 0,
                key: 0
            },
            showBuilding: false,
            patrol: 0,
            build: 0,
            develop: 0,
            hasPlus: false,
            daily:[],
            hero: null
        }
    }
    componentDidUpdate (){
        let city = this.state.city,
            daily = this.state.daily,
            arr = this.state.mainArtifact,
            hero = this.state.hero
        if (!this.props.data.hasUpdate){
            if (this.props.data.day == 5 && !city[2].hasOpen && !city[3].hasOpen){
                city[2].blackcore = 2
                city[3].blackcore = 2
            }
            if (this.props.data.day == 1 && !city[4].hasOpen){ 
                city[4].blackcore = 2
            }
            if (hero != null && !this.props.data.ensureIntelligence){
                if (!hero.hasHappen){
                    window.alert(hero.name)
                    switch(hero.city){
                        case "港湾区":
                            city[7].blackcore = 2
                            break
                        case "旧城区":
                            city[6].blackcore = 2
                            break
                        case "海湾侧城":
                            city[5].blackcore = 2
                            break
                    }
                }
            }
            if (daily.length && !this.props.data.ensureIntelligence){
                for (let i=0;i<daily.length;i++){
                    if (!daily[i].hasHappen){
                        daily[i].hasHappen = true
                        window.alert('发生了' + daily[i].name + "事件")
                        switch(daily[i].key){
                            case 1:
                                if(arr.length > 0){
                                    arr.map((item) =>{
                                        if (item.fatigue - 5 >= 0){
                                            item.fatigue -= 5
                                        }else{
                                            item.fatigue = 0
                                        }
                                    })
                                }                                
                                break
                            case 2:
                                //  破建筑
                                let num1 = Math.floor(Math.random() * 8),
                                    current = city[num1]
                                while (current.architecture.length == 0){
                                    num1 = Math.floor(Math.random() * 8)
                                    current = city[num1]
                                }
                                if (current.name == "中央庭" && current.architecture.length == 1){
                                    window.alert("魔兽扑了个空")
                                }else{
                                    if( current.name == "中央庭" ){
                                        num1 = Math.floor(Math.random() * current.architecture.length)
                                        while( num1 == 0){
                                            num1 = Math.floor(Math.random() * current.architecture.length)
                                        }
                                    }else{
                                        num1 = Math.floor(Math.random() * current.architecture.length)
                                    }
                                    let flag = null,temp1,temp2,//temp1存放建筑物对象,temp2存放城市计算对象
                                        flagA = false,flagB = false, //判断是否有特殊建筑
                                        count = 0,times = 0//count 存放总值，times存放次数
                                    BuildingList.technology.map((item) =>{
                                        if (item.name == current.architecture[num1]){
                                            flag = "tech"
                                            temp1 = item
                                        }
                                    })
                                    BuildingList.magic.map((item) =>{
                                        if (item.name == current.architecture[num1]){
                                            flag = "magic"
                                            temp1 = item
                                        }
                                    })
                                    BuildingList.intelligence.map((item) =>{
                                        if (item.name == current.architecture[num1]){
                                            flag = "info"
                                            temp1 = item
                                        }
                                    })
                                    BuildingList.special.map((item) =>{
                                        if (item.name == current.architecture[num1]){
                                            flag = "special"
                                        }
                                    })
                                    if (!(flag == "special" || (flag == "tech" && temp1.name == "地下研究所"))){
                                        switch(flag){
                                            case "tech":
                                                temp2 = this.props.data.tech - current.tech
                                                window.alert(`摧毁了${current.name}的${current.architecture[num1]}`)
                                                current.architecture.splice(num1,1)
                                                if (current.architecture.indexOf("市立研究中心") != -1){
                                                    flagA = true
                                                }
                                                if (current.architecture.indexOf("区立研究中心") != -1){
                                                    flagB = true
                                                }
                                                for (let i=0;i<current.architecture.length;i++){
                                                    switch (current.architecture[i]){
                                                        case "方舟":
                                                            count += 5
                                                            times ++
                                                            break
                                                        case "中央庭基地":
                                                            count += 5
                                                            times ++
                                                            break
                                                        case "研究所":
                                                            count += 5
                                                            times ++
                                                            break
                                                        case "大型研究所":
                                                            count += 10
                                                            times ++
                                                            break
                                                        case "区立研究中心":
                                                            count += 5
                                                            times ++
                                                            break
                                                        case "市立研究中心":
                                                            count += 15
                                                            times ++
                                                            break
                                                        case "公共图书馆":
                                                            count += this.state.artifact == null?30:this.state.artifact
                                                            times ++
                                                            break
                                                    }
                                                }                                                
                                                if (flagB){
                                                    count += times
                                                }
                                                if(flagA){
                                                    count *= 1.5
                                                }
                                                current.tech = count
                                                this.props.changeData(3, temp2 + count)
                                                break
                                            case "magic":
                                                temp2 = this.props.data.magic - current.magic
                                                window.alert(`摧毁了${current.name}的${current.architecture[num1]}`)
                                                current.architecture.splice(num1,1)
                                                if (current.architecture.indexOf("市立工程大厦") != -1){
                                                    flagA = true
                                                }
                                                if (current.architecture.indexOf("区立工程大厦") != -1){
                                                    flagB = true
                                                }
                                                for (let i=0;i<current.architecture.length;i++){
                                                    switch (current.architecture[i]){
                                                        case "方舟":
                                                            count += 5
                                                            times ++
                                                            break
                                                        case "中央庭基地":
                                                            count += 5
                                                            times ++
                                                            break
                                                        case "工程厅":
                                                            count += 5
                                                            times ++
                                                            break
                                                        case "大型工程厅":
                                                            count += 10
                                                            times ++
                                                            break
                                                        case "区立工程大厦":
                                                            count += 5
                                                            times ++
                                                            break
                                                        case "市立工程大厦":
                                                            count += 15
                                                            times ++
                                                            break
                                                        case "黑门监测站":
                                                            count += this.state.artifact == null?30:this.state.artifact
                                                            times ++
                                                            break
                                                    }
                                                }                                                
                                                if (flagB){
                                                    count += times
                                                }
                                                if(flagA){
                                                    count *= 1.5
                                                }
                                                current.magic = count
                                                this.props.changeData(2, temp2 + count)
                                                break
                                            case "info":
                                                temp2 = this.props.data.info - current.info
                                                window.alert(`摧毁了${current.name}的${current.architecture[num1]}`)
                                                current.architecture.splice(num1,1)
                                                if (current.architecture.indexOf("市立情报局") != -1){
                                                    flagA = true
                                                }
                                                if (current.architecture.indexOf("区立情报局") != -1){
                                                    flagB = true
                                                }
                                                for (let i=0;i<current.architecture.length;i++){
                                                    switch (current.architecture[i]){
                                                        case "中央庭基地":
                                                            count += 5
                                                            times ++
                                                            break
                                                        case "情报局":
                                                            count += 5
                                                            times ++
                                                            break
                                                        case "大型情报局":
                                                            count += 10
                                                            times ++
                                                            break
                                                        case "区立情报局":
                                                            count += 5
                                                            times ++
                                                            break
                                                        case "市立情报局":
                                                            count += 15
                                                            times ++
                                                            break
                                                        case "情报中心":
                                                            count += this.state.artifact == null?30:this.state.artifact
                                                            times ++
                                                            break
                                                    }
                                                }                                                
                                                if (flagB){
                                                    count += times
                                                }
                                                if(flagA){
                                                    count *= 1.5
                                                }
                                                current.info = count
                                                this.props.changeData(4, temp2 + count)
                                                break
                                        }
                                    }
                                }
                                break
                            case 3:
                                if(arr.length > 0){
                                    let num2 = Math.floor(Math.random() * arr.length)
                                    arr[num2].fatigue = arr[num2].fatigue - 20 > 0?arr[num2].fatigue - 20:0
                                }                                
                                break
                            case 4:
                                //交通故障，仅做提示
                                break
                            case 5:
                                //神秘绿装，仅做提示
                                break
                            case 6:
                                //幻屏增强，仅做提示
                                break
                            case 7:
                                if (arr.length>0){
                                    arr.map((item) =>{
                                        if (item.love - 5 >= 0){
                                            item.love -= 5
                                        }else{
                                            item.love = 0
                                        }
                                    })
                                }                                
                                break
                        }
                    }
                }
            }
            this.setState({
                city: city,
                mainArtifact: arr
            })
            this.props.changeData(8,true)            
        }    
    }
    componentWillMount(){
        this.setState({
            artifactList: ArtifactList,
            day: this.props.data.day
        })
        this.props.changeData(2,5)
        this.props.changeData(3,5)
        this.props.changeData(4,5)
    }
    getIntelligence(data,mode){//接受日常情报与希罗情报
        if (!mode){//日常情报
            if (data.length != 0){
                data.map((item)=>{
                    Object.assign(item,{ hasHappen: false})
                })
                this.setState({
                    daily: data
                })
            }
        }else{//希罗情报
            if (data != null){
                Object.assign(data,{ hasHappen: false} )
                this.setState({
                    hero: data
                })
            }      
        }
        this.props.changeData(7,null)
    }
    getAssassination(data){
        let node = ReactDom.findDOMNode(this),
            city = this.state.city,
            name = ""
        if (city[data].blackcore == 2){
            window.alert("成功收复该地区")
            this.props.changeData(2,this.props.data.magic) //刷新下面的记录用
            this.props.addRecord(null,null,null,7,null,city[data].name)
            city[data].blackcore = 1
            city[data].battle = 6
            city[data].hasOpen = true
            switch(data){
                case 7:
                    name = "#harbour"
                    break
                case 6:
                    name = "#oldDown"
                    break
                case 5:
                    name = "#bay"
                    break
            }
            node.querySelector(name).disabled = false
            node.querySelector(name).classList.remove("btn-warning")
            node.querySelector(name).classList.add("btn-success")
        }else{
            window.alert("该地区黑核不在希罗手上哦")
        }
    }
    handleSelect(k){
        this.setState({
            currentKey: k,
            showMessage: false,
            showBuilding: false
        })
    }
    handleClick(event){
        let arr = this.state.city,
            start = 0
        arr.map((item,index) =>{
            if(item.name == event.target.innerHTML){
                start = index
            }
        })
        this.setState({
            currentCity: arr[start],
            showMessage: false,
            showBuilding: false
        })
    }
    getSetArtifactState() {
        const value = this.state.artifact
		if (value > 0 && value <= 30) return 'success'
        else if (value > 30 || value < 0) return 'error'
        else if (value == 0 || value == null) return null
        else if (!Number.isInteger(value)) return 'warning'
		return null
	}
	handleSetArtifactChange(e) {
		this.setState({ 
            artifact: parseInt(e.target.value)
        })
    }
    handleSetMainArtifactChange(e){
        let arr = this.state.mainArtifact,
            node = ReactDom.findDOMNode(this.refs.setMainArtifact),
            that = this,
            flag = false, //用来判断名字是否输入正确以及神器使是否已添加过
            artifact = {},
            index
        e.preventDefault()
        for (let i = 0,len = that.state.artifactList.length;i < len;i++){
            if (that.state.artifactList[i].name == node.value){
                flag = true
                index = i
                break
            }
        }
        if ( flag ){
            flag = false //初始化神器使未添加过
            for (let i = 0,len = arr.length;i < len;i++){
                if (arr[i].name == node.value){
                    flag = true
                    break
                }
            }
            if( flag ){
                window.alert("神器使已经添加过了哦！")
            }else{
                Object.assign(artifact,that.state.artifactList[index],{love: 0,fatigue: 100,presentTimes: 0})
                arr.push(artifact)
                that.setState({
                    mainArtifact: arr
                })
            }
        }else{
            window.alert("神器使名字没输对，请检查一下哦！")
        }
    }
    deleMainArtifact(e){
        let node = e.target,
            arr = this.state.mainArtifact,
            start = 0
        arr.map((item,index)=>{
            if (item.name == node.id){
                start = index
            }
        })
        //删除数组里的某一项
        arr.splice(start,1)
        this.setState({
            mainArtifact: arr
        })        
    }
    recoverSpecial(){
        let city = this.state.city
        if (city[2].blackcore == 2 && city[3].blackcore == 2){
            city[2].blackcore = 1
            city[3].blackcore = 1
            this.setState({
                city: city
            })
        }else if (city[4].blackcore == 2){
            city[4].blackcore = 1
            this.setState({
                city: city
            })
        }else {
            window.alert("该三个地区的黑核不在希罗手上哦")
        }
    }
    recoverArtifact(e){
        let node = e.target,
            arr = this.state.mainArtifact,
            start = 0,
            data = ReactDom.findDOMNode(this.refs.recover)    
        if (parseInt(data.value) <= 50){
            arr.map((item) =>{
                if (item.fatigue + parseInt(data.value) <= 100){
                    item.fatigue += parseInt(data.value)
                }else{
                    item.fatigue = 100
                }
            })                
            this.setState({
                mainArtifact: arr
            })          
        }else{
            window.alert("请重新输入体力")
        }  
    }
    addLoveArtifact(e){
        let node = e.target,
            arr = this.state.mainArtifact,
            start = 0
        arr.map((item,index)=>{
            if (item.name == node.id){
                start = index
            }
        })
        if (arr[start].presentTimes < 5){
            if(arr[start].love != 100){
                if(arr[start].love + 8 <= 100){
                    arr[start].love += 8                    
                }else{
                    arr[start].love = 100
                }
                arr[start].presentTimes += 1
                this.props.changeData(5,this.props.data.ap)
                this.props.addRecord(arr[start].name,null,null,6,null,[arr[start].love,arr[start].presentTimes])
                this.setState({
                        mainArtifact: arr
                })
            }else{
                window.alert("好感已达上限")
            }             
        }else{
            window.alert("赠送礼物已达上限")
        }           
    }
    stayHome(e){
        if (this.props.data.ap <= 0){            
            window.alert("你已经没有体力宅了哦")
        }else{
            //传消息到父组件让ap = 0
            this.props.changeData(5,0)
            this.props.addRecord(null,null,null,5,null,null)
        }
    }
    showChoice(e){
        let nodeA = ReactDom.findDOMNode(this.refs.artifactA),
            nodeB = ReactDom.findDOMNode(this.refs.artifactB),
            nodeC = ReactDom.findDOMNode(this.refs.artifactC),
            artifactA = {},
            artifactB = {},
            artifactC = {},
            controlNode = ReactDom.findDOMNode(this.refs.controlValue),
            that = this,
            flagA = false,
            flagB = false,
            flagC = false,
            temp = null //暂存一些变量
        e.preventDefault()
        for (let i = 0,len = that.state.artifactList.length;i < len;i++){
            if (that.state.artifactList[i].name == nodeA.value){
                flagA = true
                artifactA = that.state.artifactList[i]              
            }
            if (that.state.artifactList[i].name == nodeB.value){
                flagB = true
                artifactB = that.state.artifactList[i]  
            }
            if (that.state.artifactList[i].name == nodeC.value){
                flagC = true
                artifactC = that.state.artifactList[i]  
            }
        }
        if ( flagA && flagB && flagC && controlNode.value != ""){
            let flag = true
            switch(this.state.currentKey){//1表示战斗4表示开发
                case "1":
                    if(parseInt(controlNode.value)>6){
                        window.alert("战斗次数输入有误") 
                        flag = false
                    }
                    break
                case "4":
                    if(parseInt(controlNode.value)>4){
                        window.alert("开发次数输入有误")
                        flag = false
                    }
                    break
            }
            if (flag){
                if (nodeA.value != nodeB.value && nodeB.value != nodeC.value && nodeA.value != nodeC.value){
                    let data = {
                        artifactA: artifactA,
                        artifactB: artifactB,
                        artifactC: artifactC,
                        controlValue: controlNode.value
                    }
                    that.setState({
                        currentData: data,
                        showMessage: true
                    })
                }else{
                    window.alert("有重复名称的神器使，请重新输入")
                }
            }            
        }else{
            temp = ""
            if (!flagA){
                temp += "神器使A名字错误；"
            }
            if (!flagB){
                temp += "神器使B名字错误；"
            }
            if(!flagC){
                temp += "神器使C名字错误；"
            }if(!controlNode.value){
                switch(this.state.currentKey){//1表示战斗，4表示开发
                    case "1":
                        if(parseInt(controlNode.value)>6){
                            temp += "战斗次数输入有误"
                        }
                        break
                    case "4":
                        if(parseInt(controlNode.value)>4){
                            temp += "开发次数输入有误"
                        }
                        break
                }
            }
            window.alert(temp)
        }
    }
    sureChoice(mode){//1为战斗 2为巡查 3为建设 4为开发 
        let arr = this.state.mainArtifact,
            nameA = this.state.currentData.artifactA.name,
            nameB = this.state.currentData.artifactB.name,
            nameC = this.state.currentData.artifactC.name,
            value = this.state.currentData.controlValue,
            city = this.state.currentCity,
            cityList = this.state.city,
            node = ReactDom.findDOMNode(this),
            flagA = true,
            flagB = true,
            flagC = true
        var temp
        switch(mode){
            case 1:
                let test = this.props.data.magic >= city.needMagic?5:25
                temp = ( parseInt(value) + city.battle )>=6?6-city.battle:parseInt(value)//设置剩余最大战斗次数
                arr.map((item,index) => {
                    if(item.name == nameA){
                        if ( item.fatigue - test*temp < 0){
                            flagA = false
                        }else{
                            item.fatigue -= test*temp
                        }                            
                    }
                    if(item.name == nameB){
                        if ( item.fatigue - test*temp < 0){
                            flagB = false
                        }else{
                            item.fatigue -= test*temp
                        }                            
                    }
                    if(item.name == nameC){
                        if ( item.fatigue - test*temp < 0){
                            flagC = false
                        }else{
                            item.fatigue -= test*temp
                        }                            
                    }
                })
                if(flagA && flagB && flagC){
                    arr.map((item,index) => {
                        if(item.name == nameA){
                            if (item.love + 1*temp > 100){
                                item.love = 100
                            }else{
                                item.love += 1*temp
                            }                           
                        }
                        if(item.name == nameB){
                            if (item.love + 1*temp > 100){
                                item.love = 100
                            }else{
                                item.love += 1*temp
                            }                            
                        }
                        if(item.name == nameC){
                            if (item.love + 1*temp > 100){
                                item.love = 100
                            }else{
                                item.love += 1*temp
                            }                            
                        }
                    })
                    if (temp*2 <= this.props.data.ap && temp != 0){
                        city.battle = ( parseInt(value) + city.battle )>=6?6:parseInt(value) + city.battle//设置战斗次数
                        for(let i = 0,len = cityList.length;i<len;i++){
                            if(cityList[i].name == city.name){
                                cityList[i] = city
                            }
                        }    
                        this.props.changeData(5,this.props.data.ap - 2*temp)
                        this.props.addRecord(nameA,nameB,nameC,1,city.name,temp)
                        // if(city.name == "港湾区" && city.battle == 6){
                        //     if (city.blackcore != 2){
                        //         node.querySelector('#harbour').classList.remove('btn-danger')
                        //         node.querySelector('#harbour').classList.add("btn-primary")
                        //     }
                        // }
                        
                    }else{
                        window.alert("行动力不足")
                    }
                }else{
                    temp = ""
                    if (!flagA){
                        temp += "神器使1疲劳不足"
                    }
                    if (!flagB){
                        temp += "神器使2疲劳不足"
                    }
                    if (!flagC){
                        temp += "神器使3疲劳不足"
                    }
                    window.alert(temp)
                }                               
                break
            case 2:
                arr.map((item,index) => {
                    if(item.name == nameA){
                        if ( item.fatigue - 5 < 0){
                            flagA = false
                        }                           
                    }
                    if(item.name == nameB){
                        if ( item.fatigue - 5 < 0){
                            flagB = false
                        }                           
                    }
                    if(item.name == nameC){
                        if ( item.fatigue - 5 < 0){
                            flagC = false
                        }                          
                    }
                })
                if(flagA && flagB && flagC){
                    if( 2 <= this.props.data.ap){
                        let flag = true
                        switch(this.state.currentData.controlValue){
                            case "日常巡查":
                                let man = false,woman = false,party = false
                                if (city.architecture.indexOf("购物中心") != -1){
                                    woman = true
                                }
                                if (city.architecture.indexOf("歌舞伎町") != -1){
                                    man = true
                                }
                                if (city.architecture.indexOf("烟花祭") != -1){
                                    party = true
                                }
                                temp = 4
                                arr.map((item,index) => {
                                    if(item.name == nameA){
                                        if ( ( item.sex && woman ) || ( item.sex == 0 && man) ){
                                            temp = 5
                                        }
                                        if (item.love + temp > 100){
                                            item.love = 100
                                        }else{
                                            item.love += temp
                                        }     
                                        if (party){
                                            if (item.fatigue + 25 > 100){
                                                item.fatigue = 100
                                            }else{
                                                item.fatigue += temp
                                            }
                                        } 
                                        item.fatigue -= 5                    
                                    }
                                    if(item.name == nameB){
                                        if ( ( item.sex && woman ) || (!item.sex == 0 && man) ){
                                            temp = 5
                                        }
                                        if (item.love + temp > 100){
                                            item.love = 100
                                        }else{
                                            item.love += temp
                                        }     
                                        if (party){
                                            item.fatigue += 25
                                        } 
                                        item.fatigue -= 5                    
                                    }
                                    if(item.name == nameC){
                                        if ( ( item.sex && woman ) || (!item.sex == 0 && man) ){
                                            temp = 5
                                        }
                                        if (item.love + temp > 100){
                                            item.love = 100
                                        }else{
                                            item.love += temp
                                        }     
                                        if (party){
                                            item.fatigue += 25
                                        } 
                                        item.fatigue -= 5                         
                                    }
                                })
                                this.props.changeData(5,this.props.data.ap - 2)
                                this.props.changeData(6,this.props.data.patrol + 1)
                                this.props.addRecord(nameA,nameB,nameC,2,city.name,"日常巡查")
                                if (party){
                                    city.architecture.splice(city.architecture.indexOf("烟花祭"),1)
                                }
                                break
                            case "黑核巡查":
                                let id = ""
                                if(city.blackcore == 0){
                                    switch(city.name){
                                        case "中央庭":
                                            times = 0
                                            break
                                        case "高校学园":
                                            city.blackcore = 1
                                            for(let i = 0,len = cityList.length;i<len;i++){
                                                if(cityList[i].name == city.name){
                                                    cityList[i] = city
                                                }
                                            }
                                            id = "#highSchool"
                                            temp = "黑核巡查，回收黑核成功"
                                            this.props.changeData(5,this.props.data.ap - 2)
                                            this.props.changeData(6,this.props.data.patrol + 1)
                                            this.props.addRecord(nameA,nameB,nameC,2,city.name,temp)
                                            break
                                        case "东方古街":
                                            city.blackcore = 1
                                            for(let i = 0,len = cityList.length;i<len;i++){
                                                if(cityList[i].name == city.name){
                                                    cityList[i] = city
                                                }
                                            }
                                            id = "#eastStreet"
                                            temp = "黑核巡查东方古街2次，回收黑核成功"
                                            if (!(this.props.data.day - 1 ==  0 && this.props.data.ap < 4)){
                                                if (this.props.data.ap >= 4){
                                                    this.props.changeData(5,this.props.data.ap - 4)
                                                    this.props.changeData(6,this.props.data.patrol + 2)
                                                    this.props.addRecord(nameA,nameB,nameC,2,city.name,temp)
                                                }else{
                                                    this.props.changeData(1,this.props.data.day - 1) //下一天
                                                    this.props.changeData(5,this.props.data.ap - 2)
                                                    this.props.changeData(6,this.props.data.patrol + 1)
                                                    this.props.addRecord(nameA,nameB,nameC,2,city.name,"黑核巡查东方古街2次(跨天操作)")
                                                }
                                            }else{
                                                window.alert("行动力不足以回收这个黑核")
                                            }
                                            break
                                        case "中央城区":
                                            city.blackcore = 1
                                            for(let i = 0,len = cityList.length;i<len;i++){
                                                if(cityList[i].name == city.name){
                                                    cityList[i] = city
                                                }
                                            }
                                            id = "#centerDown"
                                            temp = "黑核巡查（失去1W金币），回收黑核成功"
                                            this.props.changeData(5,this.props.data.ap - 2)
                                            this.props.changeData(6,this.props.data.patrol + 1)
                                            this.props.addRecord(nameA,nameB,nameC,2,city.name,temp)
                                            break
                                        case "研究所":
                                            id = "#institute"
                                            if (city.development == 0){
                                                temp = "黑核巡查（加开发1次），回收黑核成功"
                                                city.development = 1
                                                city.blackcore = 1
                                                for(let i = 0,len = cityList.length;i<len;i++){
                                                    if(cityList[i].name == city.name){
                                                        cityList[i] = city
                                                    }
                                                }
                                                if ( !(this.props.data.day - 1 == 0 && this.props.data.ap < 4) ){
                                                    if( this.props.data.ap >= 4){
                                                        this.props.changeData(5,this.props.data.ap - 4)
                                                        this.props.changeData(6,this.props.data.patrol + 1)
                                                        this.props.addRecord(nameA,nameB,nameC,2,city.name,temp)
                                                    }else{
                                                        this.props.changeData(1,this.props.data.day - 1)
                                                        this.props.changeData(5,this.props.data.ap - 2)
                                                        this.props.changeData(6,this.props.data.patrol + 1)
                                                        this.props.addRecord(nameA,nameB,nameC,2,city.name,"黑核巡查加开发1次（跨天操作）")
                                                    }
                                                }else{
                                                    window.alert("行动力不足以回收这个黑核")
                                                }                                                     
                                            }else{
                                                temp = "黑核巡查，回收黑核成功"
                                                city.blackcore = 1
                                                for(let i = 0,len = cityList.length;i<len;i++){
                                                    if(cityList[i].name == city.name){
                                                        cityList[i] = city
                                                    }
                                                }
                                                this.props.changeData(5,this.props.data.ap - 2)
                                                this.props.changeData(6,this.props.data.patrol + 1)
                                                this.props.addRecord(nameA,nameB,nameC,2,city.name,temp)
                                            }                                       
                                            break
                                        case "海湾侧城":
                                            id = "#bay"
                                            city.blackcore = 1
                                            if (city.architecture.indexOf("购物中心") == -1){
                                                if ( !( this.props.data.day - 1 == 0 && this.props.data.ap < 6 ) ){
                                                    if (this.props.data.ap >= 6){
                                                        city.architecture.push("购物中心")
                                                        for(let i = 0,len = cityList.length;i<len;i++){
                                                            if(cityList[i].name == city.name){
                                                                cityList[i] = city
                                                            }
                                                        }
                                                        this.props.changeData(5,this.props.data.ap - 6)
                                                        this.props.changeData(6,this.props.data.patrol + 2)
                                                    }else if (this.props.data.ap == 2){
                                                        this.props.changeData(1,this.props.data.day - 1)
                                                        this.props.changeData(5,this.props.data.ap - 4)
                                                        this.props.changeData(6,this.props.data.patrol + 1)
                                                    }else if (this.props.data.ap == 4){
                                                        this.props.changeData(1,this.props.data.day - 1)
                                                        this.props.changeData(5,this.props.data.ap - 2)
                                                        this.props.changeData(6,this.props.data.patrol + 1)
                                                    }
                                                    temp = "黑核巡查（巡查两次 + 建设一个购物中心），回收黑核成功"
                                                    this.props.addRecord(nameA,nameB,nameC,2,city.name,temp) 
                                                }else{
                                                    window.alert("行动力不足以回收该黑核")
                                                }    
                                            }else{//预先建过购物中心
                                                if ( !( this.props.data.day - 1 == 0 && this.props.data.ap < 4 ) ){
                                                    if (this.props.data.ap >= 4){
                                                        for(let i = 0,len = cityList.length;i<len;i++){
                                                            if(cityList[i].name == city.name){
                                                                cityList[i] = city
                                                            }
                                                        }
                                                        this.props.changeData(5,this.props.data.ap - 4)
                                                        this.props.changeData(6,this.props.data.patrol + 2)
                                                    }else{
                                                        this.props.changeData(1,this.props.data.day - 1)
                                                        this.props.changeData(5,this.props.data.ap - 2)
                                                        this.props.changeData(6,this.props.data.patrol + 1)
                                                    }
                                                    temp = "黑核巡查（巡查两次 + 建设一个购物中心），回收黑核成功"
                                                    this.props.addRecord(nameA,nameB,nameC,2,city.name,temp) 
                                                }else{
                                                    window.alert("行动力不足以回收该黑核")
                                                } 
                                            }
                                            break
                                        case "旧城区":
                                            id = "#oldDown"
                                            city.blackcore = 1
                                            for(let i = 0,len = cityList.length;i<len;i++){
                                                if(cityList[i].name == city.name){
                                                    cityList[i] = city
                                                }
                                            }
                                            temp = "黑核巡查（失去10W金币），回收黑核成功"
                                            this.props.changeData(5,this.props.data.ap - 2)
                                            this.props.changeData(6,this.props.data.patrol + 1)
                                            this.props.addRecord(nameA,nameB,nameC,2,city.name,temp)
                                            break
                                        case "港湾区":
                                            id = "#harbour"
                                            city.blackcore = 1
                                            if (city.architecture.indexOf("潜水艇") == -1){
                                                if ( !( this.props.data.day - 1 == 0 && this.props.data.ap < 6 ) ){
                                                    if (this.props.data.ap >= 6){
                                                        city.architecture.push("潜水艇")
                                                        for(let i = 0,len = cityList.length;i<len;i++){
                                                            if(cityList[i].name == city.name){
                                                                cityList[i] = city
                                                            }
                                                        }
                                                        this.props.changeData(5,this.props.data.ap - 6)
                                                        this.props.changeData(6,this.props.data.patrol + 2)
                                                    }else if (this.props.data.ap == 2){
                                                        this.props.changeData(1,this.props.data.day - 1)
                                                        this.props.changeData(5,this.props.data.ap - 4)
                                                        this.props.changeData(6,this.props.data.patrol + 1)
                                                    }else if (this.props.data.ap == 4){
                                                        this.props.changeData(1,this.props.data.day - 1)
                                                        this.props.changeData(5,this.props.data.ap - 2)
                                                        this.props.changeData(6,this.props.data.patrol + 1)
                                                    }
                                                    temp = "黑核巡查（巡查两次 + 建设潜艇），回收黑核成功"
                                                    this.props.addRecord(nameA,nameB,nameC,2,city.name,temp) 
                                                }else{
                                                    window.alert("行动力不足以回收该黑核")
                                                }    
                                            }else{//预先建过购物中心
                                                if ( !( this.props.data.day - 1 == 0 && this.props.data.ap < 4 ) ){
                                                    if (this.props.data.ap >= 4){
                                                        for(let i = 0,len = cityList.length;i<len;i++){
                                                            if(cityList[i].name == city.name){
                                                                cityList[i] = city
                                                            }
                                                        }
                                                        this.props.changeData(5,this.props.data.ap - 4)
                                                        this.props.changeData(6,this.props.data.patrol + 2)
                                                    }else{
                                                        this.props.changeData(1,this.props.data.day - 1)
                                                        this.props.changeData(5,this.props.data.ap - 2)
                                                        this.props.changeData(6,this.props.data.patrol + 1)
                                                    }
                                                    temp = "黑核巡查（巡查两次 + 建设潜艇），回收黑核成功"
                                                    this.props.addRecord(nameA,nameB,nameC,2,city.name,temp) 
                                                }else{
                                                    window.alert("行动力不足以回收该黑核")
                                                } 
                                            }
                                            break
                                    }
                                    // node.querySelector(id).classList.remove("btn-primary")
                                    // node.querySelector(id).classList.add("btn-success")
                                }else{
                                    window.alert("无法进行黑核巡查（已获得或者被希罗得到）")
                                }
                                break
                            case "任务巡查":
                                temp = "任务巡查"
                                this.props.changeData( 5,this.props.data.ap - 2 )
                                this.props.changeData( 6,this.props.data.patrol + 1 )
                                this.props.addRecord( nameA,nameB,nameC,2,city.name,temp )
                                break
                        }
                    }else{
                        window.alert("行动力不足")
                    }                                   
                }else{
                    temp = ""
                    if (!flagA){
                        temp += "神器使1疲劳不足"
                    }
                    if (!flagB){
                        temp += "神器使2疲劳不足"
                    }
                    if (!flagC){
                        temp += "神器使3疲劳不足"
                    }
                    window.alert(temp)
                }
                break
            case 3:
                let type = this.state.buildingType,
                    building = this.state.building,
                    flag = null,
                    count = 0,
                    build = false,//是否建造成功
                    enoughPremis = false
                arr.map((item,index) => {
                        if(item.name == nameA){
                            if ( item.fatigue - 5 < 0 ){
                                flagA = false
                            }                      
                        }
                        if(item.name == nameB){
                            if ( item.fatigue - 5 < 0 ){
                                flagB = false
                            }                            
                        }
                        if(item.name == nameC){
                            if ( item.fatigue - 5 < 0 ){
                                flagC = false
                            }                            
                        }
                })
                if (flagA && flagB && flagC ){
                    if (this.props.data.ap >= 2){
                        switch(type){
                            case "科技类":
                                switch (building.key){
                                    case 1:
                                        flag = false 
                                        city.architecture.map((item)=>{
                                            if (item == "地下研究所"){
                                                flag = true
                                            }
                                        })
                                        if (flag){
                                            if (building.premise - 25 <= this.props.data.tech){
                                                enoughPremis = true
                                            }
                                        }else{
                                            if (building.premise <= this.props.data.tech){
                                                enoughPremis = true
                                            }
                                        }
                                        if ( enoughPremis ){
                                            if (city.architecture.length < city.development + 4 ){
                                                flag = false
                                                count = 0
                                                city.architecture.map((item)=>{
                                                    if (item == "区立研究中心"){
                                                        flag = true
                                                    }
                                                })
                                                city.architecture.push(building.name)
                                                if(flag){
                                                    count = 6
                                                }else{
                                                    count = 5
                                                }
                                                flag = false
                                                city.architecture.map((item)=>{
                                                    if (item == "市立研究中心"){
                                                        flag = true
                                                    }
                                                })
                                                if (flag){
                                                    count *= 1.5
                                                }
                                                city.tech += count
                                                this.props.changeData(3,this.props.data.tech + count)
                                                this.props.changeData(5,this.props.data.ap - 2)
                                                this.props.addRecord(nameA,nameB,nameC,3,city.name,building.name)
                                                build = true
                                                flag = false
                                                for (let i = 0;i < 8;i++){
                                                    for (let j = 0;j < cityList[i].architecture.length;j++){
                                                        if (cityList[i].architecture[j] == "地下研究所"){
                                                            flag = true
                                                            temp = i
                                                            break
                                                        }
                                                    }
                                                }
                                                if ( flag ){
                                                    cityList[temp].architecture.splice(cityList[temp].architecture.indexOf("地下研究所"),1)
                                                }
                                            }else{
                                                window.alert("建筑物已满")
                                            }
                                        }else{
                                            window.alert("科技不足")
                                        }
                                        break
                                    case 2:
                                        flag = false 
                                        city.architecture.map((item)=>{
                                            if (item == "地下研究所"){
                                                flag = true
                                            }
                                        })
                                        if (flag){
                                            if (building.premise - 25 <= this.props.data.tech){
                                                enoughPremis = true
                                            }
                                        }else{
                                            if (building.premise <= this.props.data.tech){
                                                enoughPremis = true
                                            }
                                        }
                                        if ( enoughPremis ){
                                            if (city.architecture.length < city.development + 4 ){
                                                flag = false
                                                count = 0
                                                city.architecture.map((item)=>{
                                                    if (item == "区立研究中心"){
                                                        flag = true
                                                    }
                                                })
                                                city.architecture.push(building.name)
                                                if(flag){
                                                    count = 11
                                                }else{
                                                    count = 10
                                                }
                                                flag = false
                                                city.architecture.map((item)=>{
                                                    if (item == "市立研究中心"){
                                                        flag = true
                                                    }
                                                })
                                                if (flag){
                                                    count *= 1.5
                                                }
                                                city.tech += count
                                                this.props.changeData(3,this.props.data.tech + count)
                                                this.props.changeData(5,this.props.data.ap - 2)
                                                this.props.addRecord(nameA,nameB,nameC,3,city.name,building.name)
                                                build = true
                                                flag = false
                                                for (let i = 0;i < 8;i++){
                                                    for (let j = 0;j < cityList[i].architecture.length;j++){
                                                        if (cityList[i].architecture[j] == "地下研究所"){
                                                            flag = true
                                                            temp = i
                                                            break
                                                        }
                                                    }
                                                }
                                                if ( flag ){
                                                    cityList[temp].architecture.splice(cityList[temp].architecture.indexOf("地下研究所"),1)
                                                }
                                            }else{
                                                window.alert("建筑物已满")
                                            }
                                        }else{
                                            window.alert("科技不足")
                                        }
                                        break
                                    case 3:
                                        flag = false
                                        city.architecture.map((item)=>{
                                            if (item == "区立研究中心"){
                                                flag = true
                                            }
                                            if (item == "研究所" || item == "大型研究所"){
                                                count ++
                                            }
                                        })
                                        if ( !flag ){
                                            if (count >= 4){
                                                if (city.architecture.length < city.development + 4 ){
                                                    city.architecture.push(building.name)
                                                    count = 5
                                                    for (let i = 0;i<city.architecture.length;i++){
                                                        if (city.architecture[i] == "方舟" || city.architecture[i] == "中央庭基地" || city.architecture[i] == "研究所" || city.architecture[i] == "大型研究所" || city.architecture[i] == "区立研究中心" || city.architecture[i] == "市立研究中心" || city.architecture[i] == "公共图书馆"){
                                                            count += 1
                                                        }
                                                    }
                                                    flag = false
                                                    city.architecture.map((item)=>{
                                                        if (item == "市立研究中心"){
                                                            flag = true
                                                        }
                                                    })
                                                    if (flag){
                                                        count *= 1.5
                                                    }
                                                    flag = false
                                                    for (let i = 0;i < 8;i++){
                                                        for (let j = 0;j < cityList[i].architecture.length;j++){
                                                            if (cityList[i].architecture[j] == "地下研究所"){
                                                                flag = true
                                                                temp = i
                                                                break
                                                            }
                                                        }
                                                    }
                                                    if ( flag ){
                                                        cityList[temp].architecture.splice(cityList[temp].architecture.indexOf("地下研究所"),1)
                                                    }
                                                    city.tech += count
                                                    this.props.changeData( 3,this.props.data.tech + count )
                                                    this.props.changeData(5,this.props.data.ap - 2)
                                                    this.props.addRecord( nameA,nameB,nameC,3,city.name,building.name )
                                                    build = true
                                                }else{
                                                    window.alert("建筑物已满")
                                                }
                                            }else{
                                                window.alert("不足4座所需建筑物")
                                            }
                                        }else{
                                            window.alert("该区域已经建过该建筑了")
                                        }
                                        break
                                    case 4:
                                        flag = false
                                        cityList.map((item)=>{
                                            item.architecture.map((name) =>{
                                                if (name == "市立研究中心"){
                                                    flag = true
                                                }
                                            })
                                        })
                                        if (!flag ){
                                            flag = false 
                                            city.architecture.map((item)=>{
                                                if (item == "地下研究所"){
                                                    flag = true
                                                }
                                            })
                                            if (flag){
                                                if (building.premise - 25 <= this.props.data.tech){
                                                    enoughPremis = true
                                                }
                                            }else{
                                                if (building.premise <= this.props.data.tech){
                                                    enoughPremis = true
                                                }
                                            }
                                            if ( enoughPremis ){
                                                if (city.architecture.length < city.development + 4 ){
                                                    flag = false
                                                    temp = this.props.data.tech - city.tech
                                                    city.architecture.map((item)=>{
                                                        if (item == "区立研究中心"){
                                                            flag = true
                                                        }
                                                    })
                                                    if(flag){
                                                        count = 16
                                                    }else{
                                                        count = 15
                                                    }
                                                    city.tech = ( count + city.tech )*1.5
                                                    this.props.changeData(3, temp + city.tech )
                                                    this.props.changeData(5,this.props.data.ap - 2)
                                                    city.architecture.push(building.name)
                                                    this.props.addRecord(nameA,nameB,nameC,3,city.name,building.name)
                                                    build = true
                                                    flag = false
                                                    for (let i = 0;i < 8;i++){
                                                        for (let j = 0;j < cityList[i].architecture.length;j++){
                                                            if (cityList[i].architecture[j] == "地下研究所"){
                                                                flag = true
                                                                temp = i
                                                                break
                                                            }
                                                        }
                                                    }
                                                    if ( flag ){
                                                        cityList[temp].architecture.splice(cityList[temp].architecture.indexOf("地下研究所"),1)
                                                    }
                                                }else{
                                                    window.alert("建筑物已满")
                                                }
                                            }else{
                                                window.alert("科技不足")
                                            }
                                        }else{
                                            window.alert("该建筑已经建筑过了")
                                        }
                                        break
                                    case 5:
                                        flag = false
                                        cityList.map((item)=>{
                                            item.architecture.map((name) =>{
                                                if (name == "公共图书馆"){
                                                    flag = true
                                                }    
                                            })
                                        })
                                        if (!flag){
                                            flag = false 
                                            cityList.map((item)=>{
                                                item.architecture.map((name) =>{
                                                    if (name == "地下研究所"){
                                                        flag = true
                                                    }    
                                                })
                                            })
                                            if (flag){
                                                if (building.premise - 25 <= this.props.data.tech){
                                                    enoughPremis = true
                                                }
                                            }else{
                                                if (building.premise <= this.props.data.tech){
                                                    enoughPremis = true
                                                }
                                            }
                                            if (enoughPremis){
                                                if (city.architecture.length < city.development + 4 ){
                                                    flag = false
                                                    count = 0
                                                    city.architecture.map((item)=>{
                                                        if (item == "区立研究中心"){
                                                            flag = true
                                                        }
                                                    })
                                                    city.architecture.push(building.name)
                                                    if(flag){
                                                        count = (this.state.artifact == null?30:this.state.artifact) + 1
                                                    }else{
                                                        count = this.state.artifact == null?30:this.state.artifact
                                                    }
                                                    flag = false
                                                    city.architecture.map((item)=>{
                                                        if (item == "市立研究中心"){
                                                            flag = true
                                                        }
                                                    })
                                                    if (flag){
                                                        count *= 1.5
                                                    }
                                                    city.tech += count
                                                    this.props.changeData(3,this.props.data.tech + count)
                                                    this.props.changeData(5,this.props.data.ap - 2)
                                                    this.props.addRecord(nameA,nameB,nameC,3,city.name,building.name)
                                                    build = true
                                                    flag = false
                                                    for (let i = 0;i < 8;i++){
                                                        for (let j = 0;j < cityList[i].architecture.length;j++){
                                                            if (cityList[i].architecture[j] == "地下研究所"){
                                                                flag = true
                                                                temp = i
                                                                break
                                                            }
                                                        }
                                                    }
                                                    if ( flag ){
                                                        cityList[temp].architecture.splice(cityList[temp].architecture.indexOf("地下研究所"),1)
                                                    }
                                                }else{
                                                    window.alert("建筑物已满")
                                                }
                                            }else{
                                                window.alert("科技不足")
                                            }
                                        }else{
                                            window.alert("该建筑已经建筑过了")
                                        }
                                        break
                                    case 6:
                                        if (city.architecture.length < city.development + 4 ){
                                            flag = false
                                            for (let i = 0;i<8;i++){
                                                for (let j = 0;j<cityList[i].architecture.length;j++){
                                                    if (cityList[i].architecture[j] == "地下研究所"){
                                                        flag = true
                                                        temp = i
                                                        break
                                                    }
                                                }
                                            }
                                            if ( flag ){
                                                cityList[temp].architecture.splice(cityList[temp].architecture.indexOf("地下研究所"),1)
                                            }
                                            city.architecture.push(building.name)
                                            this.props.changeData(5,this.props.data.ap - 2)
                                            this.props.addRecord(nameA,nameB,nameC,3,city.name,building.name)
                                            build = true
                                        }else{
                                            window.alert("建筑物已满")
                                        }
                                        break
                                }                        
                                break
                            case "幻力类":
                                switch (building.key){
                                    case 1:
                                        flag = false 
                                        city.architecture.map((item)=>{
                                            if (item == "地下研究所"){
                                                flag = true
                                            }
                                        })
                                        if (flag){
                                            if (building.premise - 25 <= this.props.data.tech){
                                                enoughPremis = true
                                            }
                                        }else{
                                            if (building.premise <= this.props.data.tech){
                                                enoughPremis = true
                                            }
                                        }
                                        if ( enoughPremis ){
                                            if (city.architecture.length < city.development + 4 ){
                                                flag = false
                                                count = 0
                                                city.architecture.map((item)=>{
                                                    if (item == "区立工程大厦"){
                                                        flag = true
                                                    }
                                                })
                                                city.architecture.push(building.name)
                                                if(flag){
                                                    count = 6
                                                }else{
                                                    count = 5
                                                }
                                                flag = false
                                                city.architecture.map((item)=>{
                                                    if (item == "市立工程大厦"){
                                                        flag = true
                                                    }
                                                })
                                                if (flag){
                                                    count *= 1.5
                                                }
                                                city.magic += count
                                                this.props.changeData(2,this.props.data.magic + count)
                                                this.props.changeData(5,this.props.data.ap - 2)
                                                this.props.addRecord(nameA,nameB,nameC,3,city.name,building.name)
                                                build = true
                                                flag = false
                                                for (let i = 0;i < 8;i++){
                                                    for (let j = 0;j < cityList[i].architecture.length;j++){
                                                        if (cityList[i].architecture[j] == "地下研究所"){
                                                            flag = true
                                                            temp = i
                                                            break
                                                        }
                                                    }
                                                }
                                                if ( flag ){
                                                    cityList[temp].architecture.splice(cityList[temp].architecture.indexOf("地下研究所"),1)
                                                }
                                            }else{
                                                window.alert("建筑物已满")
                                            }
                                        }else{
                                            window.alert("科技不足")
                                        }
                                        break
                                    case 2:
                                        flag = false 
                                        city.architecture.map((item)=>{
                                            if (item == "地下研究所"){
                                                flag = true
                                            }
                                        })
                                        if (flag){
                                            if (building.premise - 25 <= this.props.data.tech){
                                                enoughPremis = true
                                            }
                                        }else{
                                            if (building.premise <= this.props.data.tech){
                                                enoughPremis = true
                                            }
                                        }
                                        if ( enoughPremis ){
                                            if (city.architecture.length < city.development + 4 ){
                                                flag = false
                                                count = 0
                                                city.architecture.map((item)=>{
                                                    if (item == "区立工程大厦"){
                                                        flag = true
                                                    }
                                                })
                                                city.architecture.push(building.name)
                                                if(flag){
                                                    count = 11
                                                }else{
                                                    count = 10
                                                }
                                                flag = false
                                                city.architecture.map((item)=>{
                                                    if (item == "市立工程大厦"){
                                                        flag = true
                                                    }
                                                })
                                                if (flag){
                                                    count *= 1.5
                                                }
                                                city.magic += count
                                                this.props.changeData(2,this.props.data.magic + count)
                                                this.props.changeData(5,this.props.data.ap - 2)
                                                this.props.addRecord(nameA,nameB,nameC,3,city.name,building.name)
                                                build = true
                                                flag = false
                                                for (let i = 0;i < 8;i++){
                                                    for (let j = 0;j < cityList[i].architecture.length;j++){
                                                        if (cityList[i].architecture[j] == "地下研究所"){
                                                            flag = true
                                                            temp = i
                                                            break
                                                        }
                                                    }
                                                }
                                                if ( flag ){
                                                    cityList[temp].architecture.splice(cityList[temp].architecture.indexOf("地下研究所"),1)
                                                }
                                            }else{
                                                window.alert("建筑物已满")
                                            }
                                        }else{
                                            window.alert("科技不足")
                                        }
                                        break
                                    case 3:
                                        flag = false
                                        city.architecture.map((item)=>{
                                            if (item == "区立工程大厦"){
                                                flag = true
                                            }
                                            if (item == "工程厅" || item == "大型工程厅"){
                                                count ++
                                            }
                                        })
                                        if ( !flag ){
                                            if (count >= 4){
                                                if (city.architecture.length < city.development + 4 ){
                                                    city.architecture.push(building.name)
                                                    count = 5
                                                    for (let i = 0;i<city.architecture.length;i++){
                                                        if (city.architecture[i] == "方舟" || city.architecture[i] == "中央庭基地" || city.architecture[i] == "工程厅" || city.architecture[i] == "大型工程厅" || city.architecture[i] == "区立工程大厦" || city.architecture[i] == "市立工程大厦" || city.architecture[i] == "黑门监测站"){
                                                            count += 1
                                                        }
                                                    }
                                                    flag = false
                                                    for (let i = 0;i < 8;i++){
                                                        for (let j = 0;j < cityList[i].architecture.length;j++){
                                                            if (cityList[i].architecture[j] == "地下研究所"){
                                                                flag = true
                                                                temp = i
                                                                break
                                                            }
                                                        }
                                                    }
                                                    if ( flag ){
                                                        cityList[temp].architecture.splice(cityList[temp].architecture.indexOf("地下研究所"),1)
                                                    }
                                                    flag = false
                                                    city.architecture.map((item)=>{
                                                        if (item == "市立工程大厦"){
                                                            flag = true
                                                        }
                                                    })
                                                    if (flag){
                                                        count *= 1.5
                                                    }
                                                    city.magic += count
                                                    this.props.changeData( 2,this.props.data.magic + count )
                                                    this.props.changeData(5,this.props.data.ap - 2)
                                                    this.props.addRecord( nameA,nameB,nameC,3,city.name,building.name )
                                                    build = true
                                                }else{
                                                    window.alert("建筑物已满")
                                                }
                                            }else{
                                                window.alert("不足4座所需建筑物")
                                            }
                                        }else{
                                            window.alert("该区域已经建过该建筑了")
                                        }
                                        break
                                    case 4:
                                        flag = false
                                        cityList.map((item)=>{
                                            item.architecture.map((name) =>{
                                                if (name == "市立工程大厦"){
                                                    flag = true
                                                }
                                            })
                                        })
                                        if (!flag ){
                                            flag = false 
                                            city.architecture.map((item)=>{
                                                if (item == "地下研究所"){
                                                    flag = true
                                                }
                                            })
                                            if (flag){
                                                if (building.premise - 25 <= this.props.data.tech){
                                                    enoughPremis = true
                                                }
                                            }else{
                                                if (building.premise <= this.props.data.tech){
                                                    enoughPremis = true
                                                }
                                            }
                                            if ( enoughPremis ){
                                                if (city.architecture.length < city.development + 4 ){
                                                    flag = false
                                                    temp = this.props.data.magic - city.magic
                                                    city.architecture.map((item)=>{
                                                        if (item == "区立工程大厦"){
                                                            flag = true
                                                        }
                                                    })
                                                    if(flag){
                                                        count = 16
                                                    }else{
                                                        count = 15
                                                    }
                                                    city.magic = ( count + city.magic )*1.5
                                                    this.props.changeData(2,temp + city.magic )
                                                    this.props.changeData(5,this.props.data.ap - 2)
                                                    city.architecture.push(building.name)
                                                    this.props.addRecord(nameA,nameB,nameC,3,city.name,building.name)
                                                    build = true
                                                    flag = false
                                                    for (let i = 0;i < 8;i++){
                                                        for (let j = 0;j < cityList[i].architecture.length;j++){
                                                            if (cityList[i].architecture[j] == "地下研究所"){
                                                                flag = true
                                                                temp = i
                                                                break
                                                            }
                                                        }
                                                    }
                                                    if ( flag ){
                                                        cityList[temp].architecture.splice(cityList[temp].architecture.indexOf("地下研究所"),1)
                                                    }
                                                }else{
                                                    window.alert("建筑物已满")
                                                }
                                            }else{
                                                window.alert("科技不足")
                                            }
                                        }else{
                                            window.alert("该建筑已经建筑过了")
                                        }
                                        break
                                    case 5:
                                        flag = false
                                        cityList.map((item)=>{
                                            item.architecture.map((name) =>{
                                                if (name == "黑门监测站"){
                                                    flag = true
                                                }    
                                            })
                                        })
                                        if (!flag){
                                            flag = false 
                                            cityList.map((item)=>{
                                                item.architecture.map((name) =>{
                                                    if (name == "地下研究所"){
                                                        flag = true
                                                    }    
                                                })
                                            })
                                            if (flag){
                                                if (building.premise - 25 <= this.props.data.tech){
                                                    enoughPremis = true
                                                }
                                            }else{
                                                if (building.premise <= this.props.data.tech){
                                                    enoughPremis = true
                                                }
                                            }
                                            if (enoughPremis){
                                                if (city.architecture.length < city.development + 4 ){
                                                    flag = false
                                                    count = 0
                                                    city.architecture.map((item)=>{
                                                        if (item == "区立工程大厦"){
                                                            flag = true
                                                        }
                                                    })
                                                    city.architecture.push(building.name)
                                                    if(flag){
                                                        count = (this.state.artifact == null?30:this.state.artifact) + 1
                                                    }else{
                                                        count = this.state.artifact == null?30:this.state.artifact
                                                    }
                                                    flag = false
                                                    city.architecture.map((item)=>{
                                                        if (item == "市立工程大厦"){
                                                            flag = true
                                                        }
                                                    })
                                                    if (flag){
                                                        count *= 1.5
                                                    }
                                                    city.magic += count
                                                    this.props.changeData(2,this.props.data.magic + count)
                                                    this.props.changeData(5,this.props.data.ap - 2)
                                                    this.props.addRecord(nameA,nameB,nameC,3,city.name,building.name)
                                                    build = true
                                                    flag = false
                                                    for (let i = 0;i < 8;i++){
                                                        for (let j = 0;j < cityList[i].architecture.length;j++){
                                                            if (cityList[i].architecture[j] == "地下研究所"){
                                                                flag = true
                                                                temp = i
                                                                break
                                                            }
                                                        }
                                                    }
                                                    if ( flag ){
                                                        cityList[temp].architecture.splice(cityList[temp].architecture.indexOf("地下研究所"),1)
                                                    }
                                                }else{
                                                    window.alert("建筑物已满")
                                                }
                                            }else{
                                                window.alert("科技不足")
                                            }
                                        }else{
                                            window.alert("该建筑已经建筑过了")
                                        }
                                        break
                                }                       
                                break
                            case "情报类":
                                switch (building.key){
                                    case 1:
                                        flag = false 
                                        city.architecture.map((item)=>{
                                            if (item == "地下研究所"){
                                                flag = true
                                            }
                                        })
                                        if (flag){
                                            if (building.premise - 25 <= this.props.data.tech){
                                                enoughPremis = true
                                            }
                                        }else{
                                            if (building.premise <= this.props.data.tech){
                                                enoughPremis = true
                                            }
                                        }
                                        if ( enoughPremis ){
                                            if (city.architecture.length < city.development + 4 ){
                                                flag = false
                                                city.architecture.map((item)=>{
                                                    if (item == "区立情报局"){
                                                        flag = true
                                                    }
                                                })
                                                city.architecture.push(building.name)
                                                if(flag){
                                                    count = 6
                                                }else{
                                                    count = 5
                                                }
                                                flag = false
                                                city.architecture.map((item)=>{
                                                    if (item == "市立情报局"){
                                                        flag = true
                                                    }
                                                })
                                                if (flag){
                                                    count *= 1.5
                                                }
                                                city.info += count
                                                this.props.changeData(4,this.props.data.info + count)
                                                this.props.changeData(5,this.props.data.ap - 2)
                                                this.props.addRecord(nameA,nameB,nameC,3,city.name,building.name)
                                                build = true
                                                flag = false
                                                for (let i = 0;i < 8;i++){
                                                    for (let j = 0;j < cityList[i].architecture.length;j++){
                                                        if (cityList[i].architecture[j] == "地下研究所"){
                                                            flag = true
                                                            temp = i
                                                            break
                                                        }
                                                    }
                                                }
                                                if ( flag ){
                                                    cityList[temp].architecture.splice(cityList[temp].architecture.indexOf("地下研究所"),1)
                                                }
                                            }else{
                                                window.alert("建筑物已满")
                                            }
                                        }else{
                                            window.alert("科技不足")
                                        }
                                        break
                                    case 2:
                                        flag = false 
                                        city.architecture.map((item)=>{
                                            if (item == "地下研究所"){
                                                flag = true
                                            }
                                        })
                                        if (flag){
                                            if (building.premise - 25 <= this.props.data.tech){
                                                enoughPremis = true
                                            }
                                        }else{
                                            if (building.premise <= this.props.data.tech){
                                                enoughPremis = true
                                            }
                                        }
                                        if ( enoughPremis ){
                                            if (city.architecture.length < city.development + 4 ){
                                                flag = false
                                                city.architecture.map((item)=>{
                                                    if (item == "区立情报局"){
                                                        flag = true
                                                    }
                                                })
                                                city.architecture.push(building.name)
                                                if(flag){
                                                    count = 11
                                                }else{
                                                    count = 10
                                                }
                                                flag = false
                                                city.architecture.map((item)=>{
                                                    if (item == "市立情报局"){
                                                        flag = true
                                                    }
                                                })
                                                if (flag){
                                                    count *= 1.5
                                                }
                                                city.info += count
                                                this.props.changeData(4,this.props.data.info + count)
                                                this.props.changeData(5,this.props.data.ap - 2)
                                                this.props.addRecord(nameA,nameB,nameC,3,city.name,building.name)
                                                build = true
                                                flag = false
                                                for (let i = 0;i < 8;i++){
                                                    for (let j = 0;j < cityList[i].architecture.length;j++){
                                                        if (cityList[i].architecture[j] == "地下研究所"){
                                                            flag = true
                                                            temp = i
                                                            break
                                                        }
                                                    }
                                                }
                                                if ( flag ){
                                                    cityList[temp].architecture.splice(cityList[temp].architecture.indexOf("地下研究所"),1)
                                                }
                                            }else{
                                                window.alert("建筑物已满")
                                            }
                                        }else{
                                            window.alert("科技不足")
                                        }
                                        break
                                    case 3:
                                        flag = false
                                        city.architecture.map((item)=>{
                                            if (item == "区立情报局"){
                                                flag = true
                                            }
                                            if (item == "情报局" || item == "大型情报局"){
                                                count ++
                                            }
                                        })
                                        if ( !flag ){
                                            if (count >= 4){
                                                if (city.architecture.length < city.development + 4 ){
                                                    city.architecture.push(building.name)
                                                    count = 5
                                                    for (let i = 0;i<city.architecture.length;i++){
                                                        if (city.architecture[i] == "中央庭基地" || city.architecture[i] == "情报局" || city.architecture[i] == "大型情报局" || city.architecture[i] == "区立情报局" || city.architecture[i] == "市立情报局" || city.architecture[i] == "情报中心"){
                                                            count += 1
                                                        }
                                                    }
                                                    flag = false
                                                    for (let i = 0;i < 8;i++){
                                                        for (let j = 0;j < cityList[i].architecture.length;j++){
                                                            if (cityList[i].architecture[j] == "地下研究所"){
                                                                flag = true
                                                                temp = i
                                                                break
                                                            }
                                                        }
                                                    }
                                                    if ( flag ){
                                                        cityList[temp].architecture.splice(cityList[temp].architecture.indexOf("地下研究所"),1)
                                                    }
                                                    flag = false
                                                    city.architecture.map((item)=>{
                                                        if (item == "市立情报局"){
                                                            flag = true
                                                        }
                                                    })
                                                    if (flag){
                                                        count *= 1.5
                                                    }
                                                    city.info += count
                                                    this.props.changeData( 4,this.props.data.info + count )
                                                    this.props.changeData(5,this.props.data.ap - 2)
                                                    this.props.addRecord( nameA,nameB,nameC,3,city.name,building.name )
                                                    build = true
                                                }else{
                                                    window.alert("建筑物已满")
                                                }
                                            }else{
                                                window.alert("不足4座所需建筑物")
                                            }
                                        }else{
                                            window.alert("该区域已经建过该建筑了")
                                        }
                                        break
                                    case 4:
                                        flag = false
                                        cityList.map((item)=>{
                                            item.architecture.map((name) =>{
                                                if (name == "市立情报局"){
                                                    flag = true
                                                }
                                            })
                                        })
                                        if (!flag ){
                                            flag = false 
                                            city.architecture.map((item)=>{
                                                if (item == "地下研究所"){
                                                    flag = true
                                                }
                                            })
                                            if (flag){
                                                if (building.premise - 25 <= this.props.data.tech){
                                                    enoughPremis = true
                                                }
                                            }else{
                                                if (building.premise <= this.props.data.tech){
                                                    enoughPremis = true
                                                }
                                            }
                                            if ( enoughPremis ){
                                                if (city.architecture.length < city.development + 4 ){
                                                    flag = false
                                                    temp = this.props.data.info - city.info
                                                    city.architecture.map((item)=>{
                                                        if (item == "区立情报局"){
                                                            flag = true
                                                        }
                                                    })
                                                    if(flag){
                                                        count = 16
                                                    }else{
                                                        count = 15
                                                    }
                                                    city.info = ( count + city.info )*1.5
                                                    this.props.changeData(4,city.info + temp)
                                                    this.props.changeData(5,this.props.data.ap - 2)
                                                    city.architecture.push(building.name)
                                                    this.props.addRecord(nameA,nameB,nameC,3,city.name,building.name)
                                                    build = true
                                                    flag = false
                                                    for (let i = 0;i < 8;i++){
                                                        for (let j = 0;j < cityList[i].architecture.length;j++){
                                                            if (cityList[i].architecture[j] == "地下研究所"){
                                                                flag = true
                                                                temp = i
                                                                break
                                                            }
                                                        }
                                                    }
                                                    if ( flag ){
                                                        cityList[temp].architecture.splice(cityList[temp].architecture.indexOf("地下研究所"),1)
                                                    }
                                                }else{
                                                    window.alert("建筑物已满")
                                                }
                                            }else{
                                                window.alert("科技不足")
                                            }
                                        }else{
                                            window.alert("该建筑已经建筑过了")
                                        }
                                        break
                                    case 5:
                                        flag = false
                                        cityList.map((item)=>{
                                            item.architecture.map((name) =>{
                                                if (name == "情报中心"){
                                                    flag = true
                                                }    
                                            })
                                        })
                                        if (!flag){
                                            flag = false 
                                            cityList.map((item)=>{
                                                item.architecture.map((name) =>{
                                                    if (name == "地下研究所"){
                                                        flag = true
                                                    }    
                                                })
                                            })
                                            if (flag){
                                                if (building.premise - 25 <= this.props.data.tech){
                                                    enoughPremis = true
                                                }
                                            }else{
                                                if (building.premise <= this.props.data.tech){
                                                    enoughPremis = true
                                                }
                                            }
                                            if (enoughPremis){
                                                if (city.architecture.length < city.development + 4 ){
                                                    flag = false
                                                    count = 0
                                                    city.architecture.map((item)=>{
                                                        if (item == "区立情报局"){
                                                            flag = true
                                                        }
                                                    })
                                                    city.architecture.push(building.name)
                                                    if(flag){
                                                        count = (this.state.artifact == null?30:this.state.artifact) + 1
                                                    }else{
                                                        count = this.state.artifact == null?30:this.state.artifact
                                                    }
                                                    flag = false
                                                    city.architecture.map((item)=>{
                                                        if (item == "市立情报局"){
                                                            flag = true
                                                        }
                                                    })
                                                    if (flag){
                                                        count *= 1.5
                                                    }
                                                    city.info += count
                                                    this.props.changeData(4,this.props.data.info + count)
                                                    this.props.changeData(5,this.props.data.ap - 2)
                                                    this.props.addRecord(nameA,nameB,nameC,3,city.name,building.name)
                                                    build = true
                                                    flag = false
                                                    for (let i = 0;i < 8;i++){
                                                        for (let j = 0;j < cityList[i].architecture.length;j++){
                                                            if (cityList[i].architecture[j] == "地下研究所"){
                                                                flag = true
                                                                temp = i
                                                                break
                                                            }
                                                        }
                                                    }
                                                    if ( flag ){
                                                        cityList[temp].architecture.splice(cityList[temp].architecture.indexOf("地下研究所"),1)
                                                    }
                                                }else{
                                                    window.alert("建筑物已满")
                                                }
                                            }else{
                                                window.alert("科技不足")
                                            }
                                        }else{
                                            window.alert("该建筑已经建筑过了")
                                        }
                                        break
                                }                        
                                break
                            case "特殊类":
                                switch (building.key){
                                    case 1:
                                        flag = false
                                        city.architecture.map((item)=>{
                                            if (item == "购物中心"){
                                                flag = true
                                            }
                                        })
                                        if (!flag){
                                            flag = false 
                                            city.architecture.map((item)=>{
                                                if (item == "地下研究所"){
                                                    flag = true
                                                }
                                            })
                                            if (flag){
                                                if (building.premise - 25 <= this.props.data.tech){
                                                    enoughPremis = true
                                                }
                                            }else{
                                                if (building.premise <= this.props.data.tech){
                                                    enoughPremis = true
                                                }
                                            }
                                            if ( enoughPremis ){
                                                if (city.architecture.length < city.development + 4 ){
                                                    city.architecture.push(building.name)
                                                    this.props.changeData(5,this.props.data.ap - 2)
                                                    this.props.addRecord(nameA,nameB,nameC,3,city.name,building.name)
                                                    build = true
                                                    flag = false
                                                    for (let i = 0;i < 8;i++){
                                                        for (let j = 0;j < cityList[i].architecture.length;j++){
                                                            if (cityList[i].architecture[j] == "地下研究所"){
                                                                flag = true
                                                                temp = i
                                                                break
                                                            }
                                                        }
                                                    }
                                                    if ( flag ){
                                                        cityList[temp].architecture.splice(cityList[temp].architecture.indexOf("地下研究所"),1)
                                                    }
                                                }else{
                                                    window.alert("建筑物已满")
                                                }
                                            }else{
                                                window.alert("科技不足")
                                            }
                                        }else{
                                            window.alert("该区域已建设过该建筑")
                                        }
                                        
                                        break
                                    case 2:
                                        flag = false
                                        city.architecture.map((item)=>{
                                            if (item == "购物中心"){
                                                flag = true
                                            }
                                        })
                                        if(!flag){
                                            flag = false 
                                            city.architecture.map((item)=>{
                                                if (item == "地下研究所"){
                                                    flag = true
                                                }
                                            })
                                            if (flag){
                                                if (building.premise - 25 <= this.props.data.tech){
                                                    enoughPremis = true
                                                }
                                            }else{
                                                if (building.premise <= this.props.data.tech){
                                                    enoughPremis = true
                                                }
                                            }
                                            if ( enoughPremis ){
                                                if (city.architecture.length < city.development + 4 ){
                                                    city.architecture.push(building.name)
                                                    this.props.changeData(5,this.props.data.ap - 2)
                                                    this.props.addRecord(nameA,nameB,nameC,3,city.name,building.name)
                                                    build = true
                                                    flag = false
                                                    for (let i = 0;i < 8;i++){
                                                        for (let j = 0;j < cityList[i].architecture.length;j++){
                                                            if (cityList[i].architecture[j] == "地下研究所"){
                                                                flag = true
                                                                temp = i
                                                                break
                                                            }
                                                        }
                                                    }
                                                    if ( flag ){
                                                        cityList[temp].architecture.splice(cityList[temp].architecture.indexOf("地下研究所"),1)
                                                    }
                                                }else{
                                                    window.alert("建筑物已满")
                                                }
                                            }else{
                                                window.alert("科技不足")
                                            }
                                        }else{
                                            window.alert("该区域已建设过该建筑")
                                        }                               
                                        break
                                    case 3:
                                        flag = false 
                                        city.architecture.map((item)=>{
                                            if (item == "地下研究所"){
                                                flag = true
                                            }
                                        })
                                        if (flag){
                                            if (building.premise - 25 <= this.props.data.tech){
                                                enoughPremis = true
                                            }
                                        }else{
                                            if (building.premise <= this.props.data.tech){
                                                enoughPremis = true
                                            }
                                        }
                                        if ( enoughPremis ){
                                            if (city.architecture.length < city.development + 4 ){
                                                count = 0
                                                for (let i = 0;i < 8;i++){
                                                    for (let j = 0;j < cityList[i].architecture.length;j++){
                                                        if (cityList[i].architecture[j] == "地铁枢纽"){
                                                            count ++
                                                        }
                                                    }
                                                }
                                                if (count <= 4){
                                                    city.architecture.push(building.name)
                                                    this.props.changeData(5,this.props.data.ap - 2)
                                                    this.props.addRecord(nameA,nameB,nameC,3,city.name,building.name)
                                                    build = true
                                                    flag = false
                                                    this.setState({
                                                        patrol: this.state.patrol + 3
                                                    })
                                                    for (let i = 0;i < 8;i++){
                                                        for (let j = 0;j < cityList[i].architecture.length;j++){
                                                            if (cityList[i].architecture[j] == "地下研究所"){
                                                                flag = true
                                                                temp = i
                                                                break
                                                            }
                                                        }
                                                    }
                                                    if ( flag ){
                                                        cityList[temp].architecture.splice(cityList[temp].architecture.indexOf("地下研究所"),1)
                                                    }
                                                }else{
                                                    window.alert("不能再建更多了")
                                                }                                        
                                            }else{
                                                window.alert("建筑物已满")
                                            }
                                        }else{
                                            window.alert("科技不足")
                                        }
                                        break
                                    case 4:
                                        flag = false 
                                        city.architecture.map((item)=>{
                                            if (item == "地下研究所"){
                                                flag = true
                                            }
                                        })
                                        if (flag){
                                            if (building.premise - 25 <= this.props.data.tech){
                                                enoughPremis = true
                                            }
                                        }else{
                                            if (building.premise <= this.props.data.tech){
                                                enoughPremis = true
                                            }
                                            }
                                        if ( enoughPremis ){
                                            if (city.architecture.length < city.development + 4 ){
                                                count = 0
                                                for (let i = 0;i < 8;i++){
                                                    for (let j = 0;j < cityList[i].architecture.length;j++){
                                                        if (cityList[i].architecture[j] == "规划所"){
                                                            count ++
                                                        }
                                                    }
                                                }
                                                if (count <= 4){
                                                    city.architecture.push(building.name)
                                                    this.props.changeData(5,this.props.data.ap - 2)
                                                    this.props.addRecord(nameA,nameB,nameC,3,city.name,building.name)
                                                    build = true
                                                    flag = false
                                                    this.setState({
                                                        develop: this.state.develop + 3
                                                    })
                                                    for (let i = 0;i < 8;i++){
                                                        for (let j = 0;j < cityList[i].architecture.length;j++){
                                                            if (cityList[i].architecture[j] == "地下研究所"){
                                                                flag = true
                                                                temp = i
                                                                break
                                                            }
                                                        }
                                                    }
                                                    if ( flag ){
                                                        cityList[temp].architecture.splice(cityList[temp].architecture.indexOf("地下研究所"),1)
                                                    }
                                                }else{
                                                    window.alert("不能再建更多了")
                                                }                                        
                                            }else{
                                                window.alert("建筑物已满")
                                            }
                                        }else{
                                            window.alert("科技不足")
                                        }
                                        break
                                    case 5:
                                        flag = false 
                                        city.architecture.map((item)=>{
                                            if (item == "地下研究所"){
                                                flag = true
                                            }
                                        })
                                        if (flag){
                                            if (building.premise - 25 <= this.props.data.tech){
                                                enoughPremis = true
                                            }
                                        }else{
                                            if (building.premise <= this.props.data.tech){
                                                enoughPremis = true
                                            }
                                        }
                                        if ( enoughPremis ){
                                            if (city.architecture.length < city.development + 4 ){
                                                count = 0
                                                for (let i = 0;i < 8;i++){
                                                    for (let j = 0;j < cityList[i].architecture.length;j++){
                                                        if (cityList[i].architecture[j] == "起重机"){
                                                            count ++
                                                        }
                                                    }
                                                }
                                                if (count <= 4){
                                                    city.architecture.push(building.name)
                                                    this.props.changeData(5,this.props.data.ap - 2)
                                                    this.props.addRecord(nameA,nameB,nameC,3,city.name,building.name)
                                                    build = true
                                                    flag = false
                                                    this.setState({
                                                        build: this.state.build + 3
                                                    })
                                                    for (let i = 0;i < 8;i++){
                                                        for (let j = 0;j < cityList[i].architecture.length;j++){
                                                            if (cityList[i].architecture[j] == "地下研究所"){
                                                                flag = true
                                                                temp = i
                                                                break
                                                            }
                                                        }
                                                    }
                                                    if ( flag ){
                                                        cityList[temp].architecture.splice(cityList[temp].architecture.indexOf("地下研究所"),1)
                                                    }
                                                }else{
                                                    window.alert("不能再建更多了")
                                                }                                        
                                            }else{
                                                window.alert("建筑物已满")
                                            }
                                        }else{
                                            window.alert("科技不足")
                                        }
                                        break
                                    case 6:
                                        flag = false
                                        for (let i = 0;i < 8;i++){
                                            for (let j = 0;j < cityList[i].architecture.length;j++){
                                                if (cityList[i].architecture[j] == "急救中心"){
                                                    flag = true
                                                    break
                                                }
                                            }
                                        }
                                        if(!flag){
                                            flag = false 
                                            city.architecture.map((item)=>{
                                                if (item == "地下研究所"){
                                                    flag = true
                                                }
                                            })
                                            if (flag){
                                                if (building.premise - 25 <= this.props.data.tech){
                                                    enoughPremis = true
                                                }
                                            }else{
                                                if (building.premise <= this.props.data.tech){
                                                    enoughPremis = true
                                                }
                                            }
                                            if ( enoughPremis ){
                                                if (city.architecture.length < city.development + 4 ){
                                                    city.architecture.push(building.name)
                                                    this.props.changeData(5,this.props.data.ap - 2)
                                                    this.props.addRecord(nameA,nameB,nameC,3,city.name,building.name)
                                                    build = true
                                                    flag = false
                                                    for (let i = 0;i < 8;i++){
                                                        for (let j = 0;j < cityList[i].architecture.length;j++){
                                                            if (cityList[i].architecture[j] == "地下研究所"){
                                                                flag = true
                                                                temp = i
                                                                break
                                                            }
                                                        }
                                                    }
                                                    if ( flag ){
                                                        cityList[temp].architecture.splice(cityList[temp].architecture.indexOf("地下研究所"),1)
                                                    }
                                                }else{
                                                    window.alert("建筑物已满")
                                                }
                                            }else{
                                                window.alert("科技不足")
                                            }
                                        }else{
                                            window.alert("已建过该建筑")
                                        }                                
                                        break
                                    case 7:
                                        flag = false
                                        for (let i = 0;i < 8;i++){
                                            for (let j = 0;j < cityList[i].architecture.length;j++){
                                                if (cityList[i].architecture[j] == "潜水艇"){
                                                    flag = true
                                                    break
                                                }
                                            }
                                        }
                                        if (!flag){
                                            flag = false 
                                            city.architecture.map((item)=>{
                                                if (item == "地下研究所"){
                                                    flag = true
                                                }
                                            })
                                            if (flag){
                                                if (building.premise - 25 <= this.props.data.tech){
                                                    enoughPremis = true
                                                }
                                            }else{
                                                if (building.premise <= this.props.data.tech){
                                                    enoughPremis = true
                                                }
                                            }
                                            if ( enoughPremis ){
                                                if (city.architecture.length < city.development + 4 ){
                                                    city.architecture.push(building.name)
                                                    this.props.changeData(5,this.props.data.ap - 2)
                                                    this.props.addRecord(nameA,nameB,nameC,3,city.name,building.name)
                                                    build = true
                                                    flag = false
                                                    for (let i = 0;i < 8;i++){
                                                        for (let j = 0;j < cityList[i].architecture.length;j++){
                                                            if (cityList[i].architecture[j] == "地下研究所"){
                                                                flag = true
                                                                temp = i
                                                                break
                                                            }
                                                        }
                                                    }
                                                    if ( flag ){
                                                        cityList[temp].architecture.splice(cityList[temp].architecture.indexOf("地下研究所"),1)
                                                    }
                                                }else{
                                                    window.alert("建筑物已满")
                                                }
                                            }else{
                                                window.alert("科技不足")
                                            }
                                        }else{
                                            window.alert("已建过该建筑")
                                        }
                                        break
                                    case 8:
                                        flag = false
                                        for (let i = 0;i < 8;i++){
                                            for (let j = 0;j < cityList[i].architecture.length;j++){
                                                if (cityList[i].architecture[j] == "烟花祭"){
                                                    flag = true
                                                    break
                                                }
                                            }
                                        }
                                        if (!flag){
                                            flag = false 
                                            city.architecture.map((item)=>{
                                                if (item == "地下研究所"){
                                                    flag = true
                                                }
                                            })
                                            if (flag){
                                                if (building.premise - 25 <= this.props.data.tech){
                                                    enoughPremis = true
                                                }
                                            }else{
                                                if (building.premise <= this.props.data.tech){
                                                    enoughPremis = true
                                                }
                                            }
                                            if ( enoughPremis ){
                                                if (city.architecture.length < city.development + 4 ){
                                                    city.architecture.push(building.name)
                                                    this.props.changeData(5,this.props.data.ap - 2)
                                                    this.props.addRecord(nameA,nameB,nameC,3,city.name,building.name)
                                                    build = true
                                                    flag = false
                                                    for (let i = 0;i < 8;i++){
                                                        for (let j = 0;j < cityList[i].architecture.length;j++){
                                                            if (cityList[i].architecture[j] == "地下研究所"){
                                                                flag = true
                                                                temp = i
                                                                break
                                                            }
                                                        }
                                                    }
                                                    if ( flag ){
                                                        cityList[temp].architecture.splice(cityList[temp].architecture.indexOf("地下研究所"),1)
                                                    }
                                                }else{
                                                    window.alert("建筑物已满")
                                                }
                                            }else{
                                                window.alert("科技不足")
                                            }
                                        }else{
                                            window.alert("已建过该建筑")
                                        }                                       
                                        break
                                    case 9:
                                        flag = false
                                        for (let i = 0;i < 8;i++){
                                            for (let j = 0;j < cityList[i].architecture.length;j++){
                                                if (cityList[i].architecture[j] == "方舟"){
                                                    flag = true
                                                    break
                                                }
                                            }
                                        }
                                        if (!flag){
                                            flag = false 
                                            city.architecture.map((item)=>{
                                                if (item == "地下研究所"){
                                                    flag = true
                                                }
                                            })
                                            if (flag){
                                                if (building.premise - 25 <= this.props.data.tech){
                                                    enoughPremis = true
                                                }
                                            }else{
                                                if (building.premise <= this.props.data.tech){
                                                    enoughPremis = true
                                                }
                                            }
                                            if ( enoughPremis ){
                                                if (city.architecture.length < city.development + 4 ){
                                                    flag = false
                                                    count = 0
                                                    city.architecture.map((item)=>{
                                                        if (item == "区立研究中心"){
                                                            flag = true
                                                        }
                                                    })
                                                    city.architecture.push(building.name)
                                                    if(flag){
                                                        count = 6
                                                    }else{
                                                        count = 5
                                                    }
                                                    flag = false
                                                    city.architecture.map((item)=>{
                                                        if (item == "市立研究中心"){
                                                            flag = true
                                                        }
                                                    })
                                                    if (flag){
                                                        count *= 1.5
                                                    }
                                                    city.tech += count
                                                    this.props.changeData(3,this.props.data.tech + count)
                                                    //幻力
                                                    flag = false
                                                    count = 0
                                                    city.architecture.map((item)=>{
                                                        if (item == "区立工程大厦"){
                                                            flag = true
                                                        }
                                                    })
                                                    if(flag){
                                                        count = 6
                                                    }else{
                                                        count = 5
                                                    }
                                                    flag = false
                                                    city.architecture.map((item)=>{
                                                        if (item == "市立工程大厦"){
                                                            flag = true
                                                        }
                                                    })
                                                    if (flag){
                                                        count *= 1.5
                                                    }
                                                    city.magic += count
                                                    this.props.changeData(2,this.props.data.magic + count)
                                                    this.props.changeData(5,this.props.data.ap - 2)
                                                    this.props.addRecord(nameA,nameB,nameC,3,city.name,building.name)
                                                    build = true
                                                    flag = false
                                                    for (let i = 0;i < 8;i++){
                                                        for (let j = 0;j < cityList[i].architecture.length;j++){
                                                            if (cityList[i].architecture[j] == "地下研究所"){
                                                                flag = true
                                                                temp = i
                                                                break
                                                            }
                                                        }
                                                    }
                                                    if ( flag ){
                                                        cityList[temp].architecture.splice(cityList[temp].architecture.indexOf("地下研究所"),1)
                                                    }
                                                }else{
                                                    window.alert("建筑物已满")
                                                }
                                            }else{
                                                window.alert("科技不足")
                                            }
                                        }else{
                                            window.alert("已建过该建筑")
                                        }                                       
                                        break
                                }
                                break
                        }
                        if (build){
                            arr.map((item,index) => {
                                if(item.name == nameA){
                                    item.fatigue -= 5                     
                                }
                                if(item.name == nameB){
                                    item.fatigue -= 5                            
                                }
                                if(item.name == nameC){
                                    item.fatigue -= 5                            
                                }
                            })
                        }
                    }else{
                        window.alert("行动力不足")
                    }  
                }else{
                    temp = ""
                    if (!flagA){
                        temp += "神器使1疲劳不足"
                    }
                    if (!flagB){
                        temp += "神器使2疲劳不足"
                    }
                    if (!flagC){
                        temp += "神器使3疲劳不足"
                    }
                    window.alert(temp)
                }              
                break
            case 4:
                temp = ( parseInt(value) + city.development)>=4?4-city.development:parseInt(value)//设置剩余最大开发次数
                arr.map((item,index) => {
                    if(item.name == nameA){
                        if ( item.fatigue - 5*temp < 0){
                            flagA = false
                        }  
                    }
                    if(item.name == nameB){
                        if ( item.fatigue - 5*temp < 0){
                            flagB = false
                        }  
                    }
                    if(item.name == nameC){
                        if ( item.fatigue - 5*temp < 0){
                            flagC = false
                        } 
                    }
                })
                if( flagA && flagB && flagC ){
                    if (temp*2 <= this.props.data.ap && temp != 0){
                        arr.map((item,index) => {
                            if(item.name == nameA){
                                item.fatigue -= 5  
                            }
                            if(item.name == nameB){
                                item.fatigue -= 5  
                            }
                            if(item.name == nameC){
                                item.fatigue -= 5 
                            }
                        })
                        city.development = ( parseInt(value) + city.development )>=4?4:parseInt(value) + city.development//设置开发次数
                        for(let i = 0,len = cityList.length;i<len;i++){
                            if(cityList[i].name == city.name){
                                cityList[i] = city
                            }
                        }   
                        this.props.changeData(5,this.props.data.ap - 2*temp)
                        this.props.addRecord(nameA,nameB,nameC,4,city.name,temp)
                    }else{
                        window.alert("行动力不足")
                    }
                }else{
                    temp = ""
                    if (!flagA){
                        temp += "神器使1疲劳不足"
                    }
                    if (!flagB){
                        temp += "神器使2疲劳不足"
                    }
                    if (!flagC){
                        temp += "神器使3疲劳不足"
                    }
                    window.alert(temp)
                }                                
                break
            default:
                    break
        }
        for (let i=0;i<8;i++){
            if (cityList[i].name == city.name){
                cityList[i] = city
            }
        }
        this.setState({
            mainArtifact: arr,
            city: cityList,
            showBuilding: false,
            showMessage: false
        })               
    }
    openCity(index){//index为要开放城市的下标，mode为是否给希罗黑核，0为不给，1为给
        let node = ReactDom.findDOMNode(this) ,
            arr = this.state.city
        if( index == 2 ){
            node.querySelector('#eastStreet').disabled = false
            // if (arr[3].blackcore != 2){
            //     node.querySelector('#eastStreet').classList.add("btn-danger")
            // }            
            // if ( arr[3].hasOpen && arr[3].blackcore != 2){
            //     node.querySelector('#centerDown').classList.remove("btn-danger")
            //     node.querySelector('#centerDown').classList.add("btn-primary")
            // }
            // if (!arr[3].hasOpen){
            //     node.querySelector('#highSchool').classList.remove("btn-danger")
            //     node.querySelector('#highSchool').classList.add("btn-primary")
            // }       
        }
        if ( index == 3){
            node.querySelector('#centerDown').disabled = false
            // if (arr[3].blackcore != 2){
            //     node.querySelector('#centerDown').classList.add("btn-danger")
            // }
            // if ( arr[2].hasOpen && arr[2].blackcore != 2){
            //     node.querySelector('#eastStreet').classList.remove("btn-danger")
            //     node.querySelector('#eastStreet').classList.add("btn-primary")
            // }
            // if (!arr[2].hasOpen){
            //     node.querySelector('#highSchool').classList.remove("btn-danger")
            //     node.querySelector('#highSchool').classList.add("btn-primary")
            // }            
        }
        if (index == 4 ){
            node.querySelector('#institute').disabled = false
            // if (arr[4].blackcore != 2){
            //     node.querySelector('#institute').classList.add("btn-danger")
            // }
            // if (this.state.currentCity.name == "中央城区"){
            //     if(arr[2].blackcore != 2){
            //         node.querySelector('#centerDown').classList.remove("btn-danger")
            //         node.querySelector('#centerDown').classList.add("btn-primary")
            //     }
            // }
            // if (this.state.currentCity.name == "东方古街"){
            //     if(arr[2].blackcore != 2){
            //         node.querySelector('#eastStreet').classList.remove("btn-danger")
            //         node.querySelector('#eastStreet').classList.add("btn-primary")
            //     }
            // }
        } 
        if (index == 5){
            node.querySelector('#bay').disabled = false
            // if (arr[5].blackcore != 2){
            //     node.querySelector('#bay').classList.add("btn-danger")
            // }
            // if (arr[4].blackcore != 2){
            //     node.querySelector('#institute').classList.remove("btn-danger")
            //     node.querySelector('#institute').classList.add("btn-primary")
            // }
        }
        if (index == 6){
            node.querySelector('#oldDown').disabled = false
            // if (arr[5].blackcore != 2){
            //     node.querySelector('#oldDown').classList.add("btn-danger")
            // }
            // if (arr[4].blackcore != 2){
            //     node.querySelector('#bay').classList.remove("btn-danger")
            //     node.querySelector('#bay').classList.add("btn-primary")
            // }
        }      
        if (index == 7){
            node.querySelector('#harbour').disabled = false
            // if (arr[5].blackcore != 2){
            //     node.querySelector('#harbour').classList.add("btn-danger")
            // }
            // if (arr[4].blackcore != 2){
            //     node.querySelector('#oldDown').classList.remove("btn-danger")
            //     node.querySelector('#oldDown').classList.add("btn-primary")
            // }
        }
        arr[index].hasOpen = true
        this.setState({
            city: arr
        })
    }
    patrol(e,mode){
        let nodeA = ReactDom.findDOMNode(this.refs.artifactA),
            nodeB = ReactDom.findDOMNode(this.refs.artifactB),
            nodeC = ReactDom.findDOMNode(this.refs.artifactC),
            artifactA = {},
            artifactB = {},
            artifactC = {},
            that = this,
            flagA = false,
            flagB = false,
            flagC = false,
            temp = null //暂存一些变量
        e.preventDefault()
        for (let i = 0,len = that.state.artifactList.length;i < len;i++){
            if (that.state.artifactList[i].name == nodeA.value){
                flagA = true
                artifactA = that.state.artifactList[i]              
            }
            if (that.state.artifactList[i].name == nodeB.value){
                flagB = true
                artifactB = that.state.artifactList[i]  
            }
            if (that.state.artifactList[i].name == nodeC.value){
                flagC = true
                artifactC = that.state.artifactList[i]  
            }
        }
        if ( flagA && flagB && flagC){
            let flag = true
            switch(mode){//1表示日常巡查，2表示黑核巡查，3表示任务巡查
                case 1:
                    temp = "日常巡查"
                    break
                case 2:
                    temp = "黑核巡查"
                    break
                case 3:
                    temp = "任务巡查"
                    break
            }
            if (flag){
                if (nodeA.value != nodeB.value && nodeB.value != nodeC.value && nodeA.value != nodeC.value){
                    let data = {
                        artifactA: artifactA,
                        artifactB: artifactB,
                        artifactC: artifactC,
                        controlValue: temp
                    }
                    that.setState({
                        currentData: data,
                        showMessage: true
                    })
                }else{
                    window.alert("有重复名称的神器使，请重新输入")
                }
            }            
        }else{
            temp = ""
            if (!flagA){
                temp += "神器使A名字错误；"
            }
            if (!flagB){
                temp += "神器使B名字错误；"
            }
            if(!flagC){
                temp += "神器使C名字错误；"
            }
            window.alert(temp)
        }
    }
    handleBuildingSelect(key){
        let nodeA = ReactDom.findDOMNode(this.refs.artifactA),
            nodeB = ReactDom.findDOMNode(this.refs.artifactB),
            nodeC = ReactDom.findDOMNode(this.refs.artifactC),
            artifactA = {},
            artifactB = {},
            artifactC = {},
            that = this,
            flagA = false,
            flagB = false,
            flagC = false,
            temp = null //暂存一些变量
        for (let i = 0,len = that.state.artifactList.length;i < len;i++){
            if (that.state.artifactList[i].name == nodeA.value){
                flagA = true
                artifactA = that.state.artifactList[i]              
            }
            if (that.state.artifactList[i].name == nodeB.value){
                flagB = true
                artifactB = that.state.artifactList[i]  
            }
            if (that.state.artifactList[i].name == nodeC.value){
                flagC = true
                artifactC = that.state.artifactList[i]  
            }
        }
        if ( flagA && flagB && flagC){
            if (nodeA.value != nodeB.value && nodeB.value != nodeC.value && nodeA.value != nodeC.value){
                let data = {
                    artifactA: artifactA,
                    artifactB: artifactB,
                    artifactC: artifactC,
                    controlValue: null
                }  
                switch(key){
                    case "1":
                        temp = "科技类"
                        data.controlValue = BuildingList.technology
                        break
                    case "2":
                        temp = "幻力类"
                        data.controlValue = BuildingList.magic
                        break
                    case "3":
                        temp = "情报类"
                        data.controlValue = BuildingList.intelligence
                        break
                    case "4":
                        temp = "特殊类"
                        data.controlValue = BuildingList.special
                        break    
                }
                that.setState({
                    currentData: data,
                    showBuilding: true,
                    buildingType: temp
                })
            }else{
                window.alert("有重复名称的神器使，请重新输入")
            }          
        }else{
            temp = ""
            if (!flagA){
                temp += "神器使A名字错误；"
            }
            if (!flagB){
                temp += "神器使B名字错误；"
            }
            if(!flagC){
                temp += "神器使C名字错误；"
            }
            window.alert(temp)
        }
    }
    setBuilding(key){
        this.setState({
            building: this.state.currentData.controlValue[key],
            showMessage: true
        })
        
    }
    render(){
        let blackCoreText,
            currentChoice,
            artifactChoose = (
                <Form inline id="controlChoice">
                    <FormGroup controlId="setArtifact">
                        <ControlLabel>神器使A</ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="请输入神器使A名字"
                            ref="artifactA" 
                            className="controlInput"
                            defaultValue="璐璐"                        
                        />   
                        <ControlLabel>神器使B</ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="请输入神器使B名字"
                            ref="artifactB"  
                            className="controlInput"  
                            defaultValue="白"                           
                        /> 
                        <ControlLabel>神器使C</ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="请输入神器使C名字"
                            ref="artifactC"     
                            className="controlInput"  
                            defaultValue="薇拉"                      
                        />
                        <ControlLabel>操作内容</ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="请输入操作内容"
                            ref="controlValue"    
                            className="controlInput"                        
                        />            
                        <Button bsStyle="primary" type="submit" onClick={ (e) => this.showChoice(e) }>确认预览</Button>        
                    </FormGroup>
                </Form>
        ), 
            finishText = null,
            needDevelop,
            needPatrol,
            className = []
        for (let i = 1;i<8;i++){
            switch(this.state.city[i].blackcore){
                case 0:
                    if (this.state.city[i].battle == 6){
                        className[i] = "primary"
                    }else{
                        className[i] = "danger"
                    }
                    break
                case 1:
                    className[i] = "success"
                    break
                case 2:
                    className[i] = "warning"
                    break
            }
        }
        switch( this.state.currentCity.development ){
            case 0:
                needDevelop = 10
                break
            case 1:
                needDevelop = 14
                break
            case 2:
                needDevelop = 22
                break
            case 3:
                needDevelop = 30
                break
        }
        if (this.props.data.patrol + 1 >= 1 && this.props.data.patrol + 1 <= 3){
            needPatrol = 10
        }
        if (this.props.data.patrol + 1 >= 4 && this.props.data.patrol + 1 <= 5){
            needPatrol = 14
        }
        if (this.props.data.patrol + 1 >= 6 && this.props.data.patrol + 1 <= 7){
            needPatrol = 22
        }
        if (this.props.data.patrol + 1 == 8){
            needPatrol = 30
        }
        if (this.props.data.patrol + 1 == 9){
            needPatrol = 36
        }
        if (this.props.data.patrol + 1 >= 10 && this.props.data.patrol + 1 <= 12){
            needPatrol = 42
        }
        switch(this.state.currentCity.blackcore){ //0-“未拥有” 1-“我方拥有” 2-“希罗占领”
            case 0: 
                blackCoreText = "未拥有";
                break;
            case 1:
                blackCoreText = "我方拥有";
                break;
            case 2:
                blackCoreText = "希罗占领" ;
                break;   
        }
        switch(this.state.currentCity.name){ //设置战斗结束后开启各区域战斗的按钮
            case "中央庭":
                finishText = <h3>该区域已clear,请进行其他操作</h3>
                break
            case "高校学园":
                (!this.state.city[2].hasOpen ) && (!this.state.city[3].hasOpen )?finishText= (
                    <ButtonToolbar>
                        <Button bsStyle="info" onClick={ (e) => this.openCity(2) }>开启东方古街区域</Button>
                        <Button bsStyle="info" onClick={ (e) => this.openCity(3) }>开启中央城区区域</Button>
                    </ButtonToolbar>
                ):finishText = <h3>该区域已clear,请进行其他操作</h3>
                if (this.state.city[2].hasOpen){
                    recordCity = 2
                }else{
                    recordCity = 3
                }
                break
            case "东方古街": 
                if ( recordCity == 2 && !this.state.city[3].hasOpen){
                    finishText= (
                    <ButtonToolbar> 
                        <Button bsStyle="info" onClick={ (e) => this.openCity(3) }>开启中央城区区域</Button>
                    </ButtonToolbar>
                    )
                }else if(recordCity == 3 && !this.state.city[4].hasOpen){
                    finishText= (
                        <ButtonToolbar> 
                            <Button bsStyle="info" onClick={ (e) => this.openCity(4) }>开启研究所区域</Button>
                        </ButtonToolbar>
                    )
                }
                if(this.state.city[4].hasOpen && this.state.city[3].hasOpen){
                    finishText = <h3>该区域已clear,请进行其他操作</h3>
                }
                break
            case "中央城区":
                if ( recordCity == 3 && !this.state.city[2].hasOpen){
                    finishText= (
                    <ButtonToolbar> 
                        <Button bsStyle="info" onClick={ (e) => this.openCity(2) }>开启东方古街区域</Button>
                    </ButtonToolbar>
                    )
                }else if( recordCity == 2 && !this.state.city[4].hasOpen){
                    finishText= (
                        <ButtonToolbar> 
                            <Button bsStyle="info" onClick={ (e) => this.openCity(4) }>开启研究所区域</Button>
                        </ButtonToolbar>
                    )
                }
                if(this.state.city[4].hasOpen && this.state.city[2].hasOpen){
                    finishText = <h3>该区域已clear,请进行其他操作</h3>
                }
                break
            case "研究所":
                (!this.state.city[5].hasOpen)?finishText=(
                    <ButtonToolbar> 
                        <Button bsStyle="info" onClick={ (e) => this.openCity(5) }>开启海湾侧城区域</Button>
                    </ButtonToolbar>
                ):finishText = <h3>该区域已clear,请进行其他操作</h3>
                break
            case "海湾侧城":
                (!this.state.city[6].hasOpen)?finishText=(
                    <ButtonToolbar> 
                        <Button bsStyle="info" onClick={ (e) => this.openCity(6) }>开启旧城区区域</Button>
                    </ButtonToolbar>
                ):finishText = <h3>该区域已clear,请进行其他操作</h3>
                break
            case "旧城区":
                (!this.state.city[7].hasOpen)?finishText=(
                    <ButtonToolbar> 
                        <Button bsStyle="info" onClick={ (e) => this.openCity(7) }>开启海湾侧城区域</Button>
                    </ButtonToolbar>
                ):finishText = <h3>该区域已clear,请进行其他操作</h3>
                break
            case "港湾区":
                finishText = <h3>该区域已clear,请进行其他操作</h3>
                break
            default:
                break
        }
        switch (this.state.currentKey){
            //1表示战斗，2表示巡查，3表示建设，4表示开发，5表示宅               
            case "1": 
                this.state.currentCity.battle == 6?currentChoice = (
                    finishText
                ):currentChoice = (
                    <Col>                    
                        {artifactChoose}
                        {
                            this.state.showMessage?(
                            <Col>
                                <Alert bsStyle={this.state.currentCity.needMagic <= this.props.data.magic?"success":"warning"} className="clearfix">
                                    信息：当前城市所需幻力:<strong>{ this.state.currentCity.needMagic }</strong>,总幻力为<strong>{this.props.data.magic}</strong>
                                    <br />神器使A：{this.state.currentData.artifactA.name}；
                                    神器使B：{this.state.currentData.artifactB.name}；  
                                    神器使C：{this.state.currentData.artifactC.name}； 
                                    <br />操作内容： 战斗{this.state.currentData.controlValue}次 
                                </Alert>
                                <Button className="center-block" bsStyle="info" onClick={this.sureChoice.bind(this,1)}>确认操作</Button>
                            </Col>
                        ):""                          
                        }                        
                   </Col>
                )
                break;
            case "2":
                this.state.currentCity.battle == 6?currentChoice = (
                <Col>
                    <Form inline id="controlChoice">
                        <FormGroup controlId="setArtifact">
                            <ControlLabel>神器使A</ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="请输入神器使A名字"
                                ref="artifactA" 
                                className="controlInput"
                                defaultValue="璐璐"                         
                            />   
                            <ControlLabel>神器使B</ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="请输入神器使B名字"
                                ref="artifactB"  
                                className="controlInput" 
                                defaultValue="白"                           
                            /> 
                            <ControlLabel>神器使C</ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="请输入神器使C名字"
                                ref="artifactC"     
                                className="controlInput"
                                defaultValue="薇拉"                      
                            />
                            <ButtonToolbar className="patrolButton">
                                <Button bsStyle="info" onClick={(e) => this.patrol(e,1)} >日常巡查</Button>
                                <Button bsStyle="warning" onClick={(e) => this.patrol(e,2)} >黑核回收</Button>
                                <Button bsStyle="success" onClick={(e) => this.patrol(e,3)} >任务巡查</Button>
                            </ButtonToolbar>  
                        </FormGroup>
                    </Form>
                    {
                            this.state.showMessage?(
                                <Col>
                                    <Alert bsStyle={ needPatrol <= this.state.patrol  + this.state.currentData.artifactA.patrol + this.state.currentData.artifactB.patrol + this.state.currentData.artifactC.patrol?"success":"warning"} className="clearfix">
                                        信息：当前所需巡查:<strong>{needPatrol}</strong>,神器使总巡查为<strong> {this.state.patrol + this.state.currentData.artifactA.patrol + this.state.currentData.artifactB.patrol + this.state.currentData.artifactC.patrol} </strong>
                                        <br />神器使A：{this.state.currentData.artifactA.name}的巡查力为 {this.state.currentData.artifactA.patrol}；
                                        神器使B：{this.state.currentData.artifactB.name}的巡查力为 {this.state.currentData.artifactB.patrol}；  
                                        神器使C：{this.state.currentData.artifactC.name}的巡查力为 {this.state.currentData.artifactC.patrol}； 
                                        <br />操作内容： 进行{this.state.currentData.controlValue}1次
                                    </Alert>
                                    <Button className="center-block" bsStyle="info" onClick={this.sureChoice.bind(this,2)}>确认操作</Button>
                                </Col>
                            ):""              
                    }
                </Col>
                ):currentChoice = (
                    <div>该区域仍未开放巡查</div>
                )
                break;
            case "3":
                this.state.currentCity.battle == 6?currentChoice = (
                    <Col>
                    <Form inline id="controlChoice">
                        <FormGroup controlId="setArtifact">
                            <ControlLabel>神器使A</ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="请输入神器使A名字"
                                ref="artifactA" 
                                className="controlInput"
                                defaultValue="璐璐"                         
                            />   
                            <ControlLabel>神器使B</ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="请输入神器使B名字"
                                ref="artifactB"  
                                className="controlInput"
                                defaultValue="白"                            
                            /> 
                            <ControlLabel>神器使C</ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="请输入神器使C名字"
                                ref="artifactC"     
                                className="controlInput" 
                                defaultValue="薇拉"                       
                            />
                            <DropdownButton bsStyle="primary" id="buildingType" title={this.state.buildingType} onSelect={ (key) => this.handleBuildingSelect(key) }>
                                <MenuItem eventKey="1">科技类</MenuItem>
                                <MenuItem eventKey="2">幻力类</MenuItem>
                                <MenuItem eventKey="3">情报类</MenuItem>
                                <MenuItem eventKey="4">特殊类</MenuItem>
                            </DropdownButton>  
                            {this.state.showBuilding?( <DropdownButton bsStyle="primary" title={!this.state.building.name?"建筑选择":this.state.building.name} id="buildingName" onSelect={ (key) => this.setBuilding(key) } >
                                {this.state.currentData.controlValue.map((item,index) => {
                                    return (
                                        <MenuItem key={`building_${index}`} eventKey={index}>{item.name}</MenuItem>
                                    )
                                })}
                            </DropdownButton> ):""}
                        </FormGroup>
                    </Form>
                        {
                            this.state.showMessage?(
                                <Col>
                                    <Alert bsStyle={ this.state.building.build <= this.state.build + this.state.currentData.artifactA.build + this.state.currentData.artifactB.build + this.state.currentData.artifactC.build?"success":"warning"} className="clearfix">
                                        信息：{ this.state.building.name }建造前提：{this.state.building.premise == 4?"4座+5/+10的幻力/科技/情报建筑":`科技${this.state.building.premise}`}，所需建设力为:<strong>{this.state.building.build }</strong>,神器使总建设为<strong>{this.state.build + this.state.currentData.artifactA.build + this.state.currentData.artifactB.build + this.state.currentData.artifactC.build}</strong>
                                        <br />神器使A：{this.state.currentData.artifactA.name}的建设力为 {this.state.currentData.artifactA.build}；
                                        神器使B：{this.state.currentData.artifactB.name}的建设力为 {this.state.currentData.artifactB.build}；  
                                        神器使C：{this.state.currentData.artifactC.name}的建设力为 {this.state.currentData.artifactC.build}； 
                                    </Alert>
                                    <Button className="center-block" bsStyle="info" onClick={this.sureChoice.bind(this,3)}>确认操作</Button>
                                </Col>
                            ):""              
                        }
                    </Col>
                ):currentChoice = (
                    <div>该区域仍未开放建设</div>
                )
                break;
            case "4":
                this.state.currentCity.battle == 6?currentChoice = (
                    this.state.currentCity.development < 4?(
                    <Col>                    
                        {artifactChoose}
                        {
                            this.state.showMessage?(
                            <Col>
                                <Alert bsStyle={ needDevelop <= this.state.develop + this.state.currentData.artifactA.develop + this.state.currentData.artifactB.develop + this.state.currentData.artifactC.develop?"success":"warning"} className="clearfix">
                                    信息：当前城市所需开发:<strong>{needDevelop}</strong>,神器使总开发为<strong>{this.state.develop + this.state.currentData.artifactA.develop + this.state.currentData.artifactB.develop + this.state.currentData.artifactC.develop}</strong>
                                    <br />神器使A：{this.state.currentData.artifactA.name}的开发力为 {this.state.currentData.artifactA.develop}；
                                    神器使B：{this.state.currentData.artifactB.name}的开发力为 {this.state.currentData.artifactB.develop}；  
                                    神器使C：{this.state.currentData.artifactC.name}的开发力为 {this.state.currentData.artifactC.develop}； 
                                    <br />操作内容： 开发{this.state.currentData.controlValue}次 
                                </Alert>
                                <Button className="center-block" bsStyle="info" onClick={this.sureChoice.bind(this,4)}>确认操作</Button>
                            </Col>
                        ):""                          
                        }                        
                   </Col>):<div>该区域开发已达上限</div>
                ):currentChoice = (
                    <div>该区域仍未开放开发</div>
                )
                break;
            case "5":
                this.state.currentCity.name == "中央庭"?currentChoice = (
                    <Button bsStyle="info" onClick={(e) => this.stayHome(e)}>我特么宅暴</Button>
                ):currentChoice = (
                    <div>不是中央庭，好好干活吧！</div>
                )
                break;
        }
        return(
            <Grid style={{"marginTop":"4em"}}>
                <Row>
                <Col sm={12}>
                        <h3>
                            初始设定
                        </h3>
                        <Alert bsStyle="warning">
                            初始说明：<strong>神器使总数量</strong>，确定公共图书馆等特殊建筑的非固定产出值，上限为30，不填默认30；
                            <strong>主要神器使</strong>主要为了支线攻略使用，系统仅显示主要神器使的好感、疲劳状态，该项<strong>不是必填项</strong>，镜音铃·连请用镜音双子代替，以免符号不对。
                            <br />关于深夜食堂说明，鉴于每周目回复体力不同，所以请自行<strong>输入</strong>回复体力（最大50，且回复的是设置的全体主神器使）
                            <br />送礼说明，平时看攻略好像没人会写赠送礼物送恢复体力的，所以送礼功能只做了送增加好感的礼物（+8礼物）,要送体力的可以用食堂代替（其实是我懒的写）
                        </Alert>
                        <Form inline id="controlForm">
                            <FormGroup controlId="setArtifact" validationState={this.getSetArtifactState()} >
                                <ControlLabel>神器使数量设置</ControlLabel>{' '}
                                <FormControl
                                    type="text"
                                    placeholder="请输入神器使数量"
                                    onChange={ (e) => this.handleSetArtifactChange(e) }                                    
                                    maxLength="2"                            
                                />                            
                                <FormControl.Feedback />
                            </FormGroup>

                            <FormGroup controlId="setMainArtifact" >
                                    <ControlLabel>主要神器使设置</ControlLabel>{' '}
                                    <FormControl ref="setMainArtifact" type="text" placeholder="请输入神器使名称，名称以官网为准" />
                            </FormGroup>
                            <Button id="setMainArtifactButton" type="submit" onClick={(e) => this.handleSetMainArtifactChange(e)}>确定</Button>

                            <FormGroup controlId="recoverMainArtifact" >
                                <ControlLabel>深夜食堂</ControlLabel>{' '}
                                <FormControl id="recoverMainArtifact" placeholder="请输入回复的体力" ref="recover" />
                            </FormGroup>
                            <Button bsStyle="warning" onClick={(e) => {this.recoverArtifact(e)}}>吃！</Button>
                        </Form>
                        {
                             this.state.mainArtifact.length>0? this.state.mainArtifact.map((item,index) => {
                                return (
                                            <Panel key={`panel_${index}`} >
                                                <Panel.Heading>{item.name}</Panel.Heading>
                                                <Panel.Body>
                                                    好感：<ProgressBar bsStyle="danger" now={item.love} label={`${item.love}`} />
                                                    疲劳: <ProgressBar bsStyle="warning"  now={item.fatigue} label={`${item.fatigue}`} />
                                                    <Button className="mainArtifactButton" bsStyle="primary" id={item.name} onClick={(e) => {this.deleMainArtifact(e)}}>删除该神器使</Button>
                                                    <Button className="mainArtifactButton" bsStyle="danger" id={item.name} onClick={(e) => {this.addLoveArtifact(e)}}>赠送神器使好感礼物</Button>
                                                </Panel.Body>
                                            </Panel>
                                        )
                            }):"暂未设定主要神器使"
                        }
                    </Col>
                    <Col sm={12}>
                        <h3>
                            情报系统
                        </h3>
                        <Intelligence 
                            data={this.props.data}
                            getIntelligence={this.getIntelligence.bind(this)}
                            getAssassination={this.getAssassination.bind(this)}
                            recoverSpecial={this.recoverSpecial.bind(this)}
                            changeData={this.props.changeData.bind(this)}
                        />
                    </Col>
                    <Col sm={12}>
                        <h3>
                            城市选择
                        </h3>
                        <Alert bsStyle="warning">
                            颜色说明：
                            <strong style={{'color': 'green'}}>绿色</strong>表示黑核已回收；
                            <strong style={{'color': 'red'}}>红色</strong>表示待战斗或该区域已clear但是未开启下一区域；
                            <strong style={{'color': 'blue'}}>蓝色</strong>表示该区域已clear但是未回收黑核； 
                            <strong style={{'color': 'orange'}}>橙色</strong>表示该区域黑核已被希罗获取
                        </Alert>
                        <ButtonToolbar onClick={(e)=>{this.handleClick(e)}}>
                            <Button bsStyle="success" >中央庭</Button>
                            <Button bsStyle={className[1]} id="highSchool">高校学园</Button>
                            <Button bsStyle={className[2]} id="eastStreet" disabled>东方古街</Button>
                            <Button bsStyle={className[3]} id="centerDown" disabled>中央城区</Button>
                            <Button bsStyle={className[4]} id="institute" disabled>研究所</Button>
                            <Button bsStyle={className[5]} id="bay" disabled>海湾侧城</Button>
                            <Button bsStyle={className[6]} id="oldDown" disabled>旧城区</Button>
                            <Button bsStyle={className[7]} id="harbour" disabled>港湾区</Button>
                        </ButtonToolbar>
                    </Col>
                    <Col sm={12} id="cityShow">
                        <Panel>
                            <Panel.Heading><b>{this.state.currentCity.name}</b></Panel.Heading>
                            <Panel.Body>
                                <div id="cityDetail">
                                    <span>战斗情况：{this.state.currentCity.battle==6?"该区域已clear":`已战斗${this.state.currentCity.battle}次`}</span>
                                    <span>黑核情况：{blackCoreText}</span>
                                    <span>产出情况：科技：{this.state.currentCity.tech} 幻力：{this.state.currentCity.magic} 情报：{this.state.currentCity.info} </span>
                                    <span>建筑情况：{this.state.currentCity.architecture.length>0?this.state.currentCity.architecture.map(item => {return item+" "}):"未建造"}</span>
                                    <span>开发情况：开发了{this.state.currentCity.development}次，目前等级为{this.state.currentCity.development+1}</span>
                                </div>
                                <Nav bsStyle="tabs" activeKey={this.state.currentKey} onSelect={ k => this.handleSelect(k)}>
                                    <NavItem eventKey="1">
                                        战斗
                                    </NavItem>
                                    <NavItem eventKey="2">
                                        巡查
                                    </NavItem>
                                    <NavItem eventKey="3">
                                        建设
                                    </NavItem>
                                    <NavItem eventKey="4">
                                        开发
                                    </NavItem>
                                    <NavItem eventKey="5">
                                        宅
                                    </NavItem>
                                </Nav>
                                <Alert bsStyle="warning">
                                    神器使：<strong>必填项</strong>，神器使A,B,C设置成上方<strong>主神器使</strong>的名字用于记录好感、疲劳等信息，设置<strong>非主神器使</strong>不会记录其信息，设置次序不要紧，但请不要重复！！！
                                    <br />操作内容：<strong>必填项</strong>，如果是战斗、巡查、开发请填次数（注意上限），如果是建设请填建筑物名称；
                                    <br /><strong>战斗</strong>完之后才能进行<strong>巡查等</strong>后续城市活动
                                    <br />巡查: 日常巡查：三个巡查方式中只有<strong>日常巡查</strong>会减少主神器使（如果有设置的话）疲劳，日常巡查增加主神器使好感（烟花祭也请通过该项使用，但是也会增加好感哦），任务巡查：只<strong>记录</strong>，没有别的功能，可通过备注详细什么任务，黑核巡查：如果未做黑核前置工作，系统将自动<strong>完成</strong>(港湾区与海湾侧城请确保留一个建筑位，系统该处暂时未做处理)
                                    <br />神器使能力值说明：每个人神器使的能力值不一定都提升过，这里用的是神器使的初始能力值，仅作为参考，当能力值不足开发、建设时，提示框变为<strong>黄色</strong>，否则为<strong>绿色</strong>，系统仅做提示，不做<strong>阻止</strong>功能。       <br /><strong>宅</strong>选项仅在中央庭有效!
                                </Alert>
                                {currentChoice}
                            </Panel.Body>
                        </Panel>  
                    </Col>
                </Row>                
            </Grid>
        )
    }
}

export default Control;