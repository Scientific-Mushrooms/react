import React from "react";
import { BaseComponent } from '../../components/BaseComponent';
import { Grid, Button, CircularProgress, Card,Popover, Typography } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import SearchBar from 'material-ui-search-bar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const courses = [
    'Math',
    'Cs',
    'Engineering',
];

export class CourseList extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            courses: [],
        };
    }

    componentWillMount = () => {
        this.fetchCourses()
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

    renderSelectPopover=()=>{

        return (
            <Popover
                open={Boolean(this.state.SelectPopover)}
                anchorEl={this.state.SelectPopover}
                onClose={this.handleClose("SelectPopover")}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <List component="nav">
                    <ListItem button >
                        <Typography>Cs</Typography>
                    </ListItem>
                    <ListItem button >
                        <Typography>Math</Typography>
                    </ListItem>
                </List>
            </Popover>
        )
    }

    fetchCourses = () => {

        let form = new FormData();

        this.post('/api/course/all', form).then((result) => {

            if (!result) {
                this.pushNotification("danger", "Connection error", this.props.dispatch);

            } else if (result.status === 'fail') {
                this.pushNotification("danger", result.description, this.props.dispatch);

            } else if (result.status === 'success') {

                this.setState({ courses: result.detail, loading: false })
                this.pushNotification("success", "successfully fetch courses", this.props.dispatch);

            } else {

                this.pushNotification("danger", "unknown error", this.props.dispatch);
            }

        })
    }




    renderCourses = (course, index) => {

        let onClick = () => {
            this.props.history.push({ pathname: '/courseDetail', courseId: course.courseId })
        }

        return (
            <Grid justify='center' container>
                <Card xs={12} style={styles.courseContainer}>
                    <Button onClick={onClick} style={styles.button}>

                        <Grid xs={1} style={styles.courseItem}>
                            <Icon>star</Icon>
                        </Grid>

                        <Grid xs={2} style={styles.courseItem}>
                            {course.code}
                        </Grid>

                        <Grid xs={3} style={styles.courseItem}>
                            {course.name}
                        </Grid>

                        <Grid xs={6} style={styles.courseItem}>
                            {course.introduction}
                        </Grid>

                    </Button>
                </Card>
                <Grid xs={12} style={styles.padding} />
            </Grid>
        )
    }

    renderSearchBar = () => {
        return (
            <Grid container style={styles.searchBarContainer}>
                <Grid xs={2}>
                </Grid>
                <Grid xs={1} style={styles.selectContainer} justify="center" container>
                    <Button onClick={this.handleClick("SelectPopover")} style={styles.selectButton}>
                        Class
                    </Button>
                </Grid>

                <Grid xs={1}>
                </Grid>
                <Grid xs={5}>
              
                </Grid>
                {this.renderSelectPopover()}
            </Grid>
        )
    }


    render() {

        if (this.state.loading) {
            return (
                <center>
                    <CircularProgress />
                </center>
            )
        }

        return (
            <Grid container justify='center'>

                <Grid xs={10}>
                    <Card>

                        {this.renderSearchBar()}
                        {this.state.courses.map(this.renderCourses)}

                    </Card>
                </Grid>

            </Grid>
        );
    }
}

const styles = {

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
    }
}
