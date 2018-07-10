import React from 'react';
import Grid from "@material-ui/core/Grid";
import CheckChart from '../../components/checkChart';
import TaskDetailBox from '../../components/taskDetailBox.jsx';
import { dataForTaskChartSet } from '../../redux/actions/action';
import BaseComponent from '../../components/BaseComponent';

export class ReactLearn extends BaseComponent {


    fetchDataForTaskChart = () => {
        this.fetchDataForTaskChartByType("392988bc-72e1-468f-8679-d6fc9948fe2f")
    }

    fetchDataForTaskChartByType = (projectId) => {
        let form = new FormData();
        form.append("projectId", projectId);

        this.post('/api/task/dataForTaskChart', form).then((result) => {
            if (!result){
                alert("connection to server error")
            }else{
                if (result.status === 'fail') {
                    alert(result.description);
                } else {
                    this.props.dispatch(dataForTaskChartSet(result.detail))       
                }
            }
        })
    }

    componentWillMount() {
        this.fetchDataForTaskChart();
    }


    render() {
        return (
            <Grid xs={12}>
                <CheckChart data={{
                    pending: this.props.dataForTaskChart.pending,
                    progressing: this.props.dataForTaskChart.progressing,
                    finished: this.props.dataForTaskChart.finished,
                    bugs: this.props.dataForTaskChart.bugs,
                    }}/>
                <TaskDetailBox/>
            </Grid>
        );
    }
}