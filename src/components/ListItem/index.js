import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export const ListItem = ({stat}) => stat.country !== 'undefined' ? (
    <tr>
        <td>{stat.country}</td>
        <td className="centered">{stat.lastUpdate ? formatDistanceToNow(new Date(stat.lastUpdate)) : null}</td>
        <td className="centered">
            {stat.confirmed}
            <br />
            <small>100%</small>
        </td>
        <td className="centered">
            {stat.deaths}
            <br />
            {<small>{Math.round(100 * stat.deaths / stat.confirmed) || 0}%</small>}
        </td>
        <td className="centered">
            {stat.recovered}
            <br />
            {<small>{Math.round(100 * stat.recovered / stat.confirmed) || 0}%</small>}
        </td>
        <td className="centered">
            {stat.actual}
            <br />
            {<small>{Math.round(100 * stat.actual / stat.confirmed) || 0}%</small>}
        </td>
    </tr>
) : null;