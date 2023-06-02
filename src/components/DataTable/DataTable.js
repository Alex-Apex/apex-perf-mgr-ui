import React, { useState } from 'react';
import style from './DataTable.module.scss';

const DataTable = ({ columns, data, defaultSortColumn }) => {
  const [sortConfig, setSortConfig] = useState({
    key: defaultSortColumn || (columns.length ? columns[0].field : ''),
    direction: 'ascending'
  });

  if (!Array.isArray(columns)) {
    return <div>DataTable - Found problems in the columns</div>;
  }

  const sortedData = [...data].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const onColumnHeaderClick = (field) => {
    let direction = 'ascending';
    if (sortConfig.key === field && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key: field, direction });
  };

  return (
    <table className={style.DataTable}>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index} onClick={() => onColumnHeaderClick(column.field)}>
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, colIndex) => (
              <td key={`${rowIndex}-${colIndex}`}>{row[column.field]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
