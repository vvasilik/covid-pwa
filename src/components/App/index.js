import React from 'react';
import { List } from '../List';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {stats: []};
    }

    componentDidMount() {
        fetch('https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats', {
            headers: {
                'x-rapidapi-host': 'covid-19-coronavirus-statistics.p.rapidapi.com',
                'x-rapidapi-key': 'c37641f051mshe682881ca808e3ep1b0ba1jsne813ccecdbfb',
            }
        })
        .then(data => data.json())
        .then(res => {
            const stats = res.data.covid19Stats;
            stats.forEach(item => item.actual = item.confirmed - item.deaths - item.recovered);
            this.setState({ stats });
        });
    }

    render() {
        const stats = this.state.stats;

        return <List stats={stats}/>;
    }
}