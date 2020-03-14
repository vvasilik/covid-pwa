import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export const ListItem = ({stat}) => (
    <tr>
        <td>{stat.country}</td>
        <td>{formatDistanceToNow(new Date(stat.lastUpdate))}</td>
        <td className="centered">{stat.confirmed}</td>
        <td className="centered">{stat.deaths}
            <br />
            {stat.deaths ? <small>{Math.round(100 * stat.deaths / stat.confirmed)}%</small> : ' '}
        </td>
        <td className="centered">{stat.recovered}
            <br />
            {stat.recovered ? <small>{Math.round(100 * stat.recovered / stat.confirmed)}%</small> : ' '}
        </td>
        <td className="centered">{stat.actual}
            <br />
            {stat.actual ? <small>{Math.round(100 * stat.actual / stat.confirmed)}%</small> : ' '}
        </td>
    </tr>
)