import React from 'react';
import {withRouter} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import { login, set_instructor } from '../../redux/actions/action';
import { Row, Col, Divider, Button, Icon, Form, Upload, Avatar,Card } from 'antd';
import { BaseComponent } from '../../components/BaseComponent';
import {FormButton, FormText, FormAvatar, FormSelector} from '../../components';


export class SignIn extends BaseComponent {

    constructor(props) {
        super(props);
        this.state={
            isenter:false
        }
    }

    MouseEnter() {
        setTimeout(() => {
            this.setState({
                isenter: true
            })
        }, 0)
    }

    MouseLeave() {
        setTimeout(() => {
            this.setState({
                isenter: false
            })
        }, 0)
    }

    goBack = () => {
        this.props.history.goBack();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (values.email === '' ) {
                this.pushNotification("danger","用户名不能为空",this.props.dispatch);
                return;
            }
            if(values.password === ''){
                this.pushNotification("danger","密码不能为空",this.props.dispatch);
                return;
            }
            if (!err) {
                console.log("hey");
                console.log('Received values of form: ', values);
            }

            let form = new FormData();
            form.append('email', values.email);
            form.append('password', values.password);

            var successAction = (result) => {
                if (result.detail !== null) {
                    sessionStorage.setItem('userId', result.detail.userId);
                }
                if (result.more !== null) {
                    sessionStorage.setItem("instructorId", result.more.instructorId);
                }
                if (result.extra !== null) {
                    sessionStorage.setItem("studentId", result.extra.studentId);
                }
                
                this.props.dispatch(login(result.detail, result.more, result.extra));

                this.goBack()
                this.pushNotification("success", "登录成功！");
            }

            this.newPost('/api/security/signIn', form, successAction);

        });
    }

    render() {
        const isenter = this.state.isenter
        return (
            <Row type='flex' justify="center">
                <Col>
                    <Row type='flex' justify='center' align="middle" style={styles.homeImage}>
                        <Col>
                            <Grid direction='row' container>
                            <img style={{width:'480px',height:'270px',marginRight:40,marginTop:60}} src={require('./src/Logo.PNG')}/>
                            <Card
                                style={styles.cardContainer}>
                                <div style={styles.welcome}>欢迎使用南风!</div>
                                <div style={styles.welcome2}>登录</div>
                                <Form onSubmit={this.handleSubmit} type='flex' justify='center'>
                                    <Row style={{marginLeft:40}} justify='center'>
                                        <FormText form={this.props.form}
                                            label='邮箱' name='email' required={true} icon="user"/>

                                        <FormText form={this.props.form}
                                            label='密码' name='password' required={true} icon="lock"
                                            inputType="password"/>
                                    </Row>
                                    <Row type='flex' justify='center'>
                                        <Col>
                                            <FormButton form={this.props.form} label="登录" style={styles.formButton}/>
                                            <Button style={styles.button} onClick={this.goBack}>
                                                返回
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                                <Divider/>
                                <Row type='flex' justify='center'>
                                    <Col>
                                        <html><body>
                                        没有账号? <a href="http://localhost:3000/#/signUp">快速注册!</a>
                                        </body></html>
                                    </Col>
                                </Row>
                            </Card>
                            </Grid>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }

}



const styles={

    homeImage:{
        display:'inline-blocks',
        height:700,
        width:1200,
        borderRadius:20,
    },

    logo: {
        marginLeft:40,
        marginTop:5,
        height:'50px',
        width:'90px'
    },

    cardContainer:{
        width:'600px',
        opacity:'1',
    },

    formButton:{
        width:'400px',
    },

    button:{
        width:'400px',
        backgroundColor:'',
        color:'white',
        backgroundColor: '#CCCCCC',
    },

    welcome:{
        fontSize:25,
        marginLeft: '70px',
        marginRight: '10px',
        marginBottom: '3px',
    },
    welcome2:{
        fontSize:17,
        color:'#AAAAAA',
        marginLeft: '70px',
        marginRight: '10px',
        marginBottom: '10px',
    },

};

export default withRouter(SignIn)

