import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export const ListItem = ({stat}) => (
    <tr>
        <td>{stat.country}</td>
        <td>{formatDistanceToNow(new Date(stat.lastUpdate))}</td>
        <td className="centered">{stat.confirmed}</td>
        <td className="centered">{stat.deaths}</td>
        <td className="centered">{stat.recovered}</td>
        <td className="centered">{stat.actual}</td>
    </tr>
)