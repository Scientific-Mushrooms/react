import React from 'react';
import { Row, Col, Input, Button, Icon, Form, Upload, Avatar } from 'antd';
import { BaseComponent } from '../../components/BaseComponent';
import {FormButton, FormText, FormAvatar, FormSelector} from '../../components';


export class ClassroomCreate extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            avatarUrl: null,
        };

    }

    componentDidMount() {
        this.props.form.validateFields();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }

            let form = new FormData();
            form.append('instructorId', this.props.instructor.instructorId);
            form.append('avatar', values.avatar);
            form.append('name', values.userName);
            form.append('code', values.password);

            this.post('/api/classroom/create', form).then((result) => {
             
                if (!result) {
                    this.pushNotification("danger", "Connection error", this.props.dispatch);
                    return;
                } 

                if (result.status === 'fail') {
                    this.pushNotification("danger", result.detail, this.props.dispatch);
                    return;
                }

                if (result.status === 'success') {

                    this.props.history.goBack();
                    this.pushNotification("success", "successfully create the classroom", this.props.dispatch);

                } else {
                    alert(JSON.stringify(result))
                    this.pushNotification("danger", result.status, this.props.dispatch);
                }

            })

        });
    }

    render() {

        return (
            <Row type='flex' justify='center'>
                <Col span={20}>
                    <Form onSubmit={this.handleSubmit}>

                        <FormText form={this.props.form} label='E-mail' name='email' type='email' required={true}/>

                        <FormText form={this.props.form} label='Username' name='username' required={true} />

                        <FormAvatar form={this.props.form}/>

                        <FormButton form={this.props.form} label="submit" />

                        <FormSelector form={this.props.form} options={[1, 2, 3]} label='time' name='time'/>

                    </Form>
                </Col>
            </Row>
        );
    }
}


