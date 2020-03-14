import React from 'react';
import { ListItem } from '../ListItem';
import { Icon } from '../Icon';

export const SORT_VALUE = {
    COUNTRY: 'country',
    UPDATE: 'lastUpdate',
    CONFIRMED: 'confirmed',
    DEATH: 'deaths',
    RECOVERED: 'recovered',
    ACTUAL: 'actual',
}

export class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stats: [],
            sortName: SORT_VALUE.COUNTRY,
            isReversSort: false,
        };
    }

    changeSortName(value) {
        const { sortName, isReversSort } = this.state;
        this.setState({
            sortName: value,
            isReversSort: sortName === value ? !isReversSort : false,
        });
    }

    render() {
        const { sortName, isReversSort } = this.state;
        const { stats } = this.props;
        const sortedStats = stats.sort((a, b) => {
            const res = a[sortName] < b[sortName];
            return (isReversSort ? res : !res) ? 1 : -1;
        })
        const total = {
            country: 'Total',
            confirmed: sortedStats.reduce((accumulator, currentValue) => accumulator + currentValue.confirmed, 0),
            deaths: sortedStats.reduce((accumulator, currentValue) => accumulator + currentValue.deaths, 0),
            recovered: sortedStats.reduce((accumulator, currentValue) => accumulator + currentValue.recovered, 0),
            actual: sortedStats.reduce((accumulator, currentValue) => accumulator + currentValue.actual, 0),
        }

        return (
            <div className='wrapper'>
                <table>
                    <tbody>
                        <tr>
                            <th onClick={() => this.changeSortName(SORT_VALUE.COUNTRY)}>
                                Country {sortName === SORT_VALUE.COUNTRY ? <Icon isReversSort={isReversSort} /> : null}
                            </th>
                            <th onClick={() => this.changeSortName(SORT_VALUE.UPDATE)}>
                                Last update {sortName === SORT_VALUE.UPDATE ? <Icon isReversSort={isReversSort} /> : null}
                            </th>
                            <th onClick={() => this.changeSortName(SORT_VALUE.CONFIRMED)} className="centered">
                                Confirmed {sortName === SORT_VALUE.CONFIRMED ? <Icon isReversSort={isReversSort} /> : null}
                            </th>
                            <th onClick={() => this.changeSortName(SORT_VALUE.DEATH)} className="centered">
                                Deaths {sortName === SORT_VALUE.DEATH ? <Icon isReversSort={isReversSort} /> : null}
                            </th>
                            <th onClick={() => this.changeSortName(SORT_VALUE.RECOVERED)} className="centered">
                                Recovered {sortName === SORT_VALUE.RECOVERED ? <Icon isReversSort={isReversSort} /> : null}
                            </th>
                            <th onClick={() => this.changeSortName(SORT_VALUE.ACTUAL)} className="centered">
                                Actual {sortName === SORT_VALUE.ACTUAL ? <Icon isReversSort={isReversSort} /> : null}
                            </th>
                        </tr>
                        {sortedStats.length ? sortedStats.map((stat, index) => (<ListItem stat={stat} key={index} />)) : null}
                    </tbody>
                    <tfoot>
                        <ListItem stat={total} />
                    </tfoot>
                </table>
            </div>
        );
    }
}