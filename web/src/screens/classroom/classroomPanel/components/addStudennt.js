import React from 'react';
import {Row, Col, Card, AutoComplete, Button,Divider,Icon} from 'antd'
import { BaseComponent } from '../../../../components/BaseComponent';
const Option = AutoComplete.Option;

class AddStudent extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            selectedStudentId: null,
            realNameDataSource: [],
        };
    }

    fetchRealNameDataSource = (realName) => {

        let form = new FormData();
        form.append('realName', realName);

        var successAction = (result) => {
            console.log(result)
            this.setState({realNameDataSource: result.detail});
        }

        this.newPost('/api/student/searchByRealName', form, successAction);

    }

    realNameOnChange = (value) => {
        this.fetchRealNameDataSource(value);
    }

    renderRealNameDataSource = (student, index) => {
        return (
            <Option key={student.studentId} realName={student.realName} onClick={() => {this.setState({selectedStudentId: student.studentId})}}>
                <a target="_blank" rel="noopener noreferrer">
                    {student.realName}
                </a>
                <span className="global-search-item-count">约 个结果</span>
            </Option>
        )
    }


    onClickAdd = () => {

        let form = new FormData()
        form.append("classroomId", this.props.classroomId)
        form.append("studentId", this.state.selectedStudentId)

        console.log(this.state.selectedStudentId);
        var successAction = (result) => {
            this.pushNotification("success", "添加学生")
        }

        this.newPost("/api/classroomMember/create", form, successAction)
    }




    render() {

        return (
            <div>
            <Row>
                <AutoComplete 
                    optionLabelProp="realName"
                    dataSource={this.state.realNameDataSource.map(this.renderRealNameDataSource)} 
                    onChange={this.realNameOnChange}
                    />
                <Button type='default' onClick={this.onClickAdd}><Icon type='plus'/></Button>
            </Row>
            </div>
        );
    }
}

const styles = {

    cardContainer: {
        borderRadius: '5px',
    },

    text: {
        textAlign: 'center'
    },

    classroomTitle: {
        textAlign: 'center',
        fontSize: '20px'
    },

    test: {
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent'
    }
}


const mapStateToProps = state => ({
    user: state.identityReducer.user,
    instructor: state.identityReducer.instructor,
    student: state.identityReducer.student,
})

export default AddStudent;