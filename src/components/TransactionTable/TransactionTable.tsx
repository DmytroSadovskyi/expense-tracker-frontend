// import { useEffect, useState } from 'react';
import { Transaction } from './props.ts';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

const data: Transaction[] = [
  {
    id: '1',
    type: 'дохід',
    category: 'Зарплата',
    description: 'Місячна зарплата за березень',
    amount: 25000,
    date: '2025-03-30T12:00:00.000Z',
    owner: '65f2c1234abcd56789ef0123',
  },
  {
    id: '2',
    type: 'дохід',
    category: 'Фріланс',
    description: 'Розробка вебсайту',
    amount: 12000,
    date: '2025-03-28T15:30:00.000Z',
    owner: '65f2c1234abcd56789ef0123',
  },
  {
    id: '3',
    type: 'дохід',
    category: 'Інвестиції',
    description: 'Дивіденди від акцій',
    amount: 5000,
    date: '2025-03-25T09:00:00.000Z',
    owner: '65f2c1234abcd56789ef0123',
  },
  {
    id: '4',
    type: 'дохід',
    category: 'Подарунки',
    description: 'Грошовий подарунок на день народження',
    amount: 2000,
    date: '2025-03-20T18:45:00.000Z',
    owner: '65f2c5678abcd12345ef6789',
  },
  {
    id: '4',
    type: 'витрата',
    category: 'Їжа',
    description: 'Покупки в магазині',
    amount: 2000,
    date: '2025-03-20T18:45:00.000Z',
    owner: '65f2c5678abcd12345ef6789',
  },
];

const columnHelper = createColumnHelper<Transaction>();

const columns = [
  columnHelper.accessor('id', {
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('type', {
    header: () => 'Тип',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('description', {
    header: () => 'Опис',
    cell: info => info.renderValue(),
  }),
  columnHelper.accessor('amount', {
    header: () => <span>Сума</span>,
  }),
  columnHelper.accessor('date', {
    header: 'Дата',
  }),
];

export const TransactionTable = () => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <table className="shadow-lg bg-white  rounded-2xl">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="bg-blue-100  text-left px-8 py-4"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className=" px-8 py-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
