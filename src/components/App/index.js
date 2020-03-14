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
            const statsObject = {};
            const statsArray = [];
            const covidList = res.data.covid19Stats;
            covidList.forEach(item => item.actual = item.confirmed - item.deaths - item.recovered);

            covidList.forEach(item => {
                if (statsObject[item.country]) {
                    statsObject[item.country] = {
                        confirmed: statsObject[item.country].confirmed + item.confirmed,
                        deaths: statsObject[item.country].deaths + item.deaths,
                        recovered: statsObject[item.country].recovered + item.recovered,
                        lastUpdate: this.getLastUpdate(statsObject[item.country].lastUpdate, item.lastUpdate),
                        actual: statsObject[item.country].actual + item.confirmed - item.deaths - item.recovered,
                    }
                } else {
                    statsObject[item.country] = {
                        confirmed: item.confirmed,
                        deaths: item.deaths,
                        recovered: item.recovered,
                        lastUpdate: item.lastUpdate,
                        actual: item.confirmed - item.deaths - item.recovered,
                    }
                }
            })

            Object.keys(statsObject).forEach(item => statsArray.push({ ...statsObject[item], ...{ country: item }}));

            this.setState({ stats: statsArray });
        });
    }

    getLastUpdate(storedDate, newDate) {
        return new Date(storedDate) < new Date(newDate) ? newDate : storedDate;
    }

    render() {
        const stats = this.state.stats;

        return <List stats={stats}/>;
    }
}