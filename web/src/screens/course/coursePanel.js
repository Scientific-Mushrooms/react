import React, { Component } from "react";
import { Grid, Button, Icon, Typography} from '@material-ui/core';
import {courseRoutes} from '../../routes/routes'
import AddIcon from '@material-ui/icons/Add';

export class CoursePanel extends Component {

    renderButton = (route, index) => {

        const onClick = () => {
            this.props.history.push({ pathname: route.path })
        }

        return (
            <Grid 
            style={styles.btnContainer} 
            alignItems='center' 
            justify='center' xs={2}>
                <Button 
                style={styles.button}
                size="large"
                variant="fab"
                onClick={onClick}>
                    <Icon style={styles.icon}> {route.icon} </Icon>
                    <Typography variant='button'style={{fontSize:'150%'}}>{route.name}</Typography>
                </Button>
            </Grid>
        )
    }

    renderCreateCourse= () => {

        return(
            <Grid 
            style={styles.btnContainer} 
            justify='center' 
            alignItems='center' xs={2}>
                <Button 
                style={styles.button}
                size="large"
                color="secondary"
                variant="fab" 
                onClick={this.onClickCourseCreate}>
                    <AddIcon  style={styles.icon}/>
                    <Typography variant='button'style={{fontSize:'150%'}}>Course Create</Typography>
                </Button>
            </Grid> 
        )
    }

    render() {
        return (
            <Grid style={styles.container} alignItems='center' container>
                {courseRoutes.map(this.renderButton)}
            </Grid>
        );
    }
}

const styles = {

    container: {
        justifyContent: 'center'
    },

    icon:{
        fontSize:'300%',
        marginLeft:"5px",
        marginRight:"5px"
    },

    btnContainer:{
        marginRight:"30px",
        marginLeft:"30px",
    },

    button:{
        borderRadius: "20px",
        width:"100%",
    },

}
