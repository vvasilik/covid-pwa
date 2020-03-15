import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
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
            searchValue: '',
            isReversSort: false,
            sortName: SORT_VALUE.COUNTRY,
        };

        this.handleChange = this.handleChange.bind(this);
        this.clearSearch = this.clearSearch.bind(this);
    }

    changeSortName(value) {
        const { sortName, isReversSort } = this.state;
        this.setState({
            sortName: value,
            isReversSort: sortName === value ? !isReversSort : false,
        });
    }

    handleChange(event) {
        this.setState({
            searchValue: event.target.value.toLowerCase()
        });
    }

    clearSearch() {
        this.setState({
            searchValue: ''
        });
    }

    render() {
        const { sortName, isReversSort, searchValue } = this.state;
        const { stats, cache } = this.props;
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
        const resultStats = sortedStats.filter(item => item.country.toLowerCase().indexOf(searchValue) !== -1);

        return (
            <div className='wrapper'>
                <div className='search'>
                    <input className="search__input" type="text" placeholder="Country" value={this.state.searchValue} onChange={this.handleChange} />
                    <button onClick={this.clearSearch} className="search__clear">✕</button>
                </div>
                {cache && <div className="cache">Loaded from cache. Stored {formatDistanceToNow(cache)} ago</div>}
                <table>
                    <tbody>
                        <tr>
                            <th
                                className={sortName === SORT_VALUE.COUNTRY ? 'active' : ''}
                                onClick={() => this.changeSortName(SORT_VALUE.COUNTRY)}
                            >
                                Country {sortName === SORT_VALUE.COUNTRY ? <Icon isReversSort={isReversSort} /> : null}
                            </th>
                            <th
                                className={sortName === SORT_VALUE.UPDATE ? 'active' : ''}
                                onClick={() => this.changeSortName(SORT_VALUE.UPDATE)}
                            >
                                Last update {sortName === SORT_VALUE.UPDATE ? <Icon isReversSort={isReversSort} /> : null}
                            </th>
                            <th
                                className={sortName === SORT_VALUE.CONFIRMED ? 'active' : ''}
                                onClick={() => this.changeSortName(SORT_VALUE.CONFIRMED)} className="centered"
                            >
                                Confirmed {sortName === SORT_VALUE.CONFIRMED ? <Icon isReversSort={isReversSort} /> : null}
                            </th>
                            <th
                                className={sortName === SORT_VALUE.DEATH ? 'active' : ''}
                                onClick={() => this.changeSortName(SORT_VALUE.DEATH)} className="centered"
                            >
                                Deaths {sortName === SORT_VALUE.DEATH ? <Icon isReversSort={isReversSort} /> : null}
                            </th>
                            <th
                                className={sortName === SORT_VALUE.RECOVERED ? 'active' : ''}
                                onClick={() => this.changeSortName(SORT_VALUE.RECOVERED)} className="centered"
                            >
                                Recovered {sortName === SORT_VALUE.RECOVERED ? <Icon isReversSort={isReversSort} /> : null}
                            </th>
                            <th
                                className={sortName === SORT_VALUE.ACTUAL ? 'active' : ''}
                                onClick={() => this.changeSortName(SORT_VALUE.ACTUAL)} className="centered"
                            >
                                Actual {sortName === SORT_VALUE.ACTUAL ? <Icon isReversSort={isReversSort} /> : null}
                            </th>
                        </tr>
                        {resultStats.length ? resultStats.map((stat, index) => (<ListItem stat={stat} key={index} />)) : null}
                    </tbody>
                    <tfoot>
                        <ListItem stat={total} />
                    </tfoot>
                </table>
            </div>
        );
    }
}