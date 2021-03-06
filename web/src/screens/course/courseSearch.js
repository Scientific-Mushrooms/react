import React from "react";
import "antd/dist/antd.css";
import { BaseComponent } from '../../components/BaseComponent';
import { Grid, CircularProgress,Typography } from '@material-ui/core';
import {Table,Anchor, AutoComplete, Row, Col, Card, Select, Button, Layout, Menu,Pagination, Icon} from 'antd';

const lite=['全部','文学院', '历史学院', '法学院', '哲学系', '新闻传播学院', '政府管理学院', '信息管理学院', '社会学院', '商学院','外国语学院', '海外教育学院', '马克思主义学院', '大学外语教学部','*社会科学试验班', '*文科试验班（人文艺术传播类）'
]
const engi=['全部','现代工程与应用科学学院','电子科学与工程学院','工程管理学院','软件学院','*工科试验班'
]
const collegeData=['全部','文学院', '历史学院', '法学院', '哲学系', '新闻传播学院', '政府管理学院', '信息管理学院', '社会学院', '商学院', '数学系', '外国语学院', '', '物理学院', '现代工程与应用科学学院', '化学化工学院', '生命科学学院', '地球科学与工程学院', '地理与海洋科学学院', '大气科学学院', '电子科学与工程学院', '计算机科学与技术系', '环境学院', '天文与空间科学学院', '工程管理学院', '软件学院', '海外教育学院', '建筑与城市规划学院', '马克思主义学院', '大学外语教学部', '计算中心', '匡亚明学院', '医学院', '*文科试验班（人文艺术传播类）', '*理科试验班（数理科学类）', '*理科试验班（化学与生命科学类）', '*社会科学试验班', '*理科试验班（地球科学与资源环境类）', '*工科试验班'
]
const typeData=['全部','核心','就业','选修','公选']

const credit=['1学分','2学分','3学分','4学分','5学分']

const recommendation=['内容实用','难度较低','最受喜爱']

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

export class CourseSearch extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            faculty:"",
            type:"",
            campus:"",
            loading: true,
            courses: [],
            totalPages: 0,
            name: "",
            dataSource: [],
            page:1,
            size:20,

        };
    }

    componentWillMount = () => {

        let form = new FormData();
        form.append('name', this.state.name);
        form.append('campus', this.state.campus);
        form.append('faculty', this.state.faculty);
        form.append('type', this.state.type);
        var successAction = (result) => {
            this.setState({ totalPages: result.detail.totalPages, loading: false })
        }

        this.newPost('/api/course/search', form, successAction);

        this.search()
    }

    handleClick = name => event => {
        this.setState({
            [name]: event.currentTarget,
        });
    }

    handleClose = name => () => {
        this.setState({
            [name]: null,
        });
    };

    handleChange = name => (value) => {
        if(value=="全部")
            this.setState({[name]:""})
        else
            this.setState({[name]:value})
    }

    autoOnChange = (value) => {
        this.handleChange("name")(value)
        if(this.timer){
            clearTimeout(this.timer);
        }
        this.timer = setTimeout((
            this.fetchAutoComplete(value)
        ),500);

    }

    fetchAutoComplete = (value) => {
        var form = new FormData();
        form.append('name', value);

        var successAction = (result) => {
            this.setState({dataSource: result.detail});
            console.log("success")
        }

        this.newPost('/api/course/autoComplete', form, successAction)
    }

    menuItem=(value,index)=>{
        if(value!="")
            return (<Menu.Item key={value}>{value}</Menu.Item>)
    }

    typeSearch=(e)=>{
        if(e.key==="全部") {e.key="";}
        this.state.page=1
        this.state.type=e.key
        let form = new FormData();
        form.append('name', "");
        form.append('campus', this.state.campus);
        form.append('faculty', this.state.faculty);
        form.append('type', e.key);
        form.append('page', this.state.page-1);
        form.append('size', this.state.size);
        var successAction = (result) => {
            console.log(result)
            this.setState({ courses: result.detail.content,totalPages: result.detail.totalPages,loading: false })
        }

        this.newPost('/api/course/search', form, successAction);

    }

    creditSearch=(e)=>{
        this.state.page=1
        let form = new FormData();
        form.append('name', "");
        form.append('campus', this.state.campus);
        form.append('faculty', this.state.faculty);
        form.append('type', this.state.type);
        form.append('credit', e.key[0]);
        form.append('page', this.state.page-1);
        form.append('size', this.state.size);
        var successAction = (result) => {
            console.log(result)
            this.setState({ courses: result.detail.content,totalPages: result.detail.totalPages,loading: false })
        }

        this.newPost('/api/course/search', form, successAction);

    }

    collegeSearch=(e)=>{
        if(e.key==="全部") {e.key="";}
        this.state.page=1
        this.state.faculty=e.key
        let form = new FormData();
        form.append('name', "");
        form.append('campus', this.state.campus);
        form.append('faculty', e.key);
        form.append('type', this.state.type);
        form.append('page', this.state.page-1);
        form.append('size', this.state.size);
        var successAction = (result) => {
            console.log(result)
            this.setState({ courses: result.detail.content,totalPages: result.detail.totalPages,loading: false })
        }

        this.newPost('/api/course/search', form, successAction);

    }

    recommendSearch=(e)=>{
        this.state.page=1
        let form = new FormData();
        form.append('name', this.state.name);
        form.append('campus', this.state.campus);
        form.append('faculty', this.state.faculty);
        form.append('type', this.state.type);
        form.append('page', this.state.page-1);
        form.append('size', this.state.size);
        var successAction = (result) => {
            console.log(result)
            this.setState({ courses: result.detail,totalPages: result.detail.totalPages,loading: false })
        }
        if(e.key==="难度较低") {
            console.log("easy")
            this.newPost('/api/course/easy', form, successAction);
        }
        else if(e.key==="内容实用") {
            console.log("useful")
            this.newPost('/api/course/useful', form, successAction);
        }
        else if(e.key==="最受喜爱"){
            console.log("enjoy")
            this.newPost('/api/course/enjoy', form, successAction);
        }

    }

    search = () => {
        let form = new FormData();
        this.state.page=1
        form.append('name', this.state.name);
        form.append('campus', this.state.campus);
        form.append('faculty', this.state.faculty);
        form.append('type', this.state.type);
        form.append('page', this.state.page-1);
        form.append('size', this.state.size);
        var successAction = (result) => {
            console.log(result)
            this.setState({ courses: result.detail.content, loading: false })
        }

        this.newPost('/api/course/search', form, successAction);
    }

    handleText(str){
        if(str.length>15){
            return str.substr(0,15)+"...";
        }else{
            return str;
        }
    }

    handleFaculty(course){
        if(course.faculty==""&&(course.type=="公选"||course.type=="就业"))
            return "公选、就业课暂无院系信息"
        else
            return course.faculty
    }


    renderIcon(str){
        if(engi.indexOf(str)!=-1)
            return  <img
                src={require('./src/engi.png')}
                alt='Engineering'
                style={styles.img}/>
        else if (lite.indexOf(str)!=-1)
            return <img
                src={require('./src/lite.png')}
                alt='Literature'
                style={styles.img}/>
        else if(str=="")
            return <img
                src={require('./src/public.png')}
                alt="Public"
                style={styles.img}/>
        else
            return <img
                src={require('./src/sci.png')}
                alt='Science'
                style={styles.img}/>
    }

    renderSider=()=>{
        return(
            <Sider width={250} style={{ background: '#fff' }}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['0']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%' }}>
                    <SubMenu key="sub1" onClick={this.typeSearch} title={<span><Icon type="bars"/>课程类型</span>}>
                        {typeData.map(this.menuItem)}
                    </SubMenu>
                    <SubMenu key="sub2" onClick={this.creditSearch} title={<span><Icon type="bulb" />课程学分</span>}>
                        {credit.map(this.menuItem)}
                    </SubMenu>
                    <SubMenu key="sub3" onClick={this.collegeSearch} title={<span><Icon type="book" />开课院系</span>}>
                        {collegeData.map(this.menuItem)}
                    </SubMenu>
                    <SubMenu key="sub4" onClick={this.recommendSearch} title={<span><Icon type="heart" />课友推荐</span>}>
                        {recommendation.map(this.menuItem)}
                    </SubMenu>
                </Menu>
            </Sider>
        )
    }

    renderCourses = (course, index) => {

        let onClick = () => {
            this.props.history.push({ pathname: '/courseDetail/' + course.courseId, courseId: course.courseId })
        }

        return (
            <Row type='flex' justify='center'>
                <Button  onClick={onClick} style={styles.button}>
                    <Row type="flex" justify="center">

                        <Col span={3} style={styles.courseItem} xs={0} sm={6} md={5} lg={3} xl={3}>
                            {this.renderIcon(course.faculty)}
                        </Col>

                        <Col span={3} style={styles.courseItem} xs={0} sm={0} md={3} lg={3} xl={3}>
                            <Row>课程编号</Row>
                            <Row>
                                <Typography variant='body2'>
                                    {course.code}
                                </Typography>
                            </Row>
                        </Col>

                        <Col span={8} style={styles.courseItem} xs={24} sm={18} md={16} lg={14} xl={8}>
                            <Row>课程名</Row>
                            <Typography variant='title'>{this.handleText(course.name)}</Typography>
                        </Col>

                        <Col span={3} xs={0} sm={0} md={0} lg={4} xl={3}>
                            <Row>类型</Row>
                            <Row>
                                <Typography  variant='body2'>
                                    {course.type}课
                                </Typography>
                            </Row>
                        </Col>

                        <Col span={3} style={styles.courseItem} xs={0} sm={0} md={0} lg={0} xl={3}>
                            <Row>开课院系</Row>
                            <Row>
                                <Typography variant='body2'>
                                    {this.handleFaculty(course)}
                                </Typography>
                            </Row>
                        </Col>

                        <Col span={3} style={styles.courseItem} xs={0} sm={0} md={0} lg={0} xl={3}>
                            <Row>学分</Row>
                            <Row>
                                <Typography variant='body2'>
                                    {course.credit}
                                </Typography>
                            </Row>
                        </Col>

                    </Row>
                </Button>
                <Grid xs={12} style={styles.padding} />
            </Row>
        )
    }

    renderSearchBar = () => {

        const Option = Select.Option;
        const collegeOptions = collegeData.map(college => <Option value={college}>{college}</Option>);
        const typeOptions = typeData.map(type => <Option value={type}>{type}</Option>);
        return ( 
            <Row style={styles.searchBar}>

                <Select
                    defaultValue="校区" style={{ width: 120 }}
                    onChange={(value)=> this.handleChange("campus")(value)}
                    style={styles.gap}>
                    <Option value={'仙林校区'}>仙林校区</Option>
                    <Option value={'鼓楼校区'}>鼓楼校区</Option>
                </Select>

                <Select
                    defaultValue="类型" style={{ width: 120 }}
                    onChange={(value)=> this.handleChange("type")(value)}
                    style={styles.gap}>
                    {typeOptions}
                </Select>

                <Select defaultValue="院系" style={{ width: 120 }}
                        onChange={(value)=> this.handleChange("faculty")(value)}
                        style={styles.gap}>
                    {collegeOptions}
                </Select>

                <AutoComplete dataSource={this.state.dataSource} onChange={this.autoOnChange} style={styles.gap}/>

                <Button type="primary" icon="search" onClick={this.search}>搜索</Button>

            </Row>
        )
    }

    onChange = (page) => {
        console.log("this. is change page")
        console.log(page);

        this.setState({
            page: page,
            loading:true,
        });

        console.log(this.state.page);

        let form = new FormData();
        form.append('name', this.state.name);
        form.append('campus', this.state.campus);
        form.append('faculty', this.state.faculty);
        form.append('type', this.state.type);
        form.append('page', page - 1);
        form.append('size', this.state.size);
        var successAction = (result) => {
            console.log(result)
            this.setState({ courses: result.detail.content, loading: false })
            this.pushNotification("success", "成功获取课程！");
        }

        this.newPost('/api/course/search', form, successAction);
    }

    render() {

        if (this.state.loading) {
            return (
                <center>
                    <CircularProgress />
                </center>
            )
        }
        console.log(this.state.page)
        return (
            <Row justify='center' type='flex'>
                <Col span={18}>
                    <Layout style={{ padding: '24px 0', background: '#fff' }}>
                        {this.renderSider()}
                        <Content style={{ padding: '0 24px', minHeight: 280 }}>
                            <div>
                                {this.renderSearchBar()}
                                {this.state.courses.map(this.renderCourses)}
                            </div>
                            <Pagination current={this.state.page} onChange={this.onChange} pageSize={this.state.size} total={this.state.totalPages} />
                        </Content>
                    </Layout>
                </Col>
            </Row>
        );
    }
}

const styles = {
    img:{
        width:"45px",
        height:'45px'
    },

    padding: {
        height: '20px'
    },

    courseContainer: {
        width:'80%',
    },

    courseItem: {
        textAlign: 'center'
    },

    button: {
        width: '100%',
        height: '80px',
    },

    searchBarContainer: {
        marginTop: '30px',
        marginBottom: '30px',
    },

    selectButton:{
        color:'#666666',
        fontSize:'14px',
    },

    selectContainer:{
        borderBottomWidth: '2px',
        borderBottomColor: '#666666',
        borderBottomStyle: 'solid'
    },

    searchBar: {
        marginBottom: '20px'
    },

    gap: {
        marginRight: '10px'
    },



}
