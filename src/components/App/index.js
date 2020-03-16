import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { List } from '../List';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stats: [],
            cache: null,
        };
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
            const stats = this.getStats(res);
            const confirmed = stats.reduce((accumulator, currentValue) => accumulator + currentValue.confirmed, 0);
            const actual = stats.reduce((accumulator, currentValue) => accumulator + currentValue.actual, 0);

            localStorage.setItem('stats', JSON.stringify(stats));
            localStorage.setItem('cacheDate', new Date());

            this.setState({ stats });
            this.notify(`Confirmed: ${confirmed}; actual: ${actual}`);
        }).catch(() => {
            const stats = JSON.parse(localStorage.getItem('stats'));
            const cache = localStorage.getItem('cacheDate');

            this.setState({
                stats: stats || [],
                cache: cache ? new Date(cache) : null,
            })
            this.notify(cache ? `Cached data. Stored ${formatDistanceToNow(new Date(cache))} ago` : `No response. Cache is empty`);
        });
    }

    notify(message) {
        if (Notification.permission === "granted") {
            new Notification(message);
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission(function (permission) {
                if (permission === "granted") {
                    new Notification(message);
                }
            });
        }
    }

    getStats(res) {
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

        return statsArray;
    }

    getLastUpdate(storedDate, newDate) {
        return new Date(storedDate) < new Date(newDate) ? newDate : storedDate;
    }

    render() {
        const { stats, cache } = this.state;

        return <List stats={stats} cache={cache}/>;
    }
}