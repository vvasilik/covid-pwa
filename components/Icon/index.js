import React from 'react';

export const Icon = ({isReversSort}) => (
    <span>{isReversSort ? `↑` : `↓`}</span>
);