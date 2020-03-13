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

const Abilities = ({ abilities }) => {
  return (
    <Table>
      <TableHead>
        <TableRow head>
          <TableHeadCell>Name</TableHeadCell>
          <TableHeadCell>Slot</TableHeadCell>
          <TableHeadCell>Hidden</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {abilities.map((i, idx) => (
          <TableRow key={idx}>
            <TableDataCell>{titleCase(i.ability.name)}</TableDataCell>
            <TableDataCell>{i.slot}</TableDataCell>
            <TableDataCell>{i.is_hidden ? 'Yes' : 'No'}</TableDataCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Abilities;
