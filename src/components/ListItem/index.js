import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export const ListItem = ({stat}) => (
    <tr>
        <td>{stat.country}</td>
        <td>{stat.lastUpdate ? formatDistanceToNow(new Date(stat.lastUpdate)) : null}</td>
        <td className="centered">
            {stat.confirmed}
            <br />
            <small>100%</small>
        </td>
        <td className="centered">
            {stat.deaths}
            <br />
            {<small>{Math.round(100 * stat.deaths / stat.confirmed)}%</small>}
        </td>
        <td className="centered">
            {stat.recovered}
            <br />
            {<small>{Math.round(100 * stat.recovered / stat.confirmed)}%</small>}
        </td>
        <td className="centered">
            {stat.actual}
            <br />
            {<small>{Math.round(100 * stat.actual / stat.confirmed)}%</small>}
        </td>
    </tr>
)