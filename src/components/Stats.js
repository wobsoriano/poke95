import React from 'react';
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableHeadCell,
  TableDataCell,
} from 'react95';
import { titleCase } from '../utils';

const Stats = ({ stats }) => {
  return (
    <Table>
      <TableHead>
        <TableRow head>
          <TableHeadCell>Name</TableHeadCell>
          <TableHeadCell>Base</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {stats.map((i, idx) => (
          <TableRow key={idx}>
            <TableDataCell>
              {titleCase(i.stat.name.split('-').join(' '))}
            </TableDataCell>
            <TableDataCell>{i.base_stat}</TableDataCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Stats;
