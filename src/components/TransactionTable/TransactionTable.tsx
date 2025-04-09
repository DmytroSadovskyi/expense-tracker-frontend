import { useMemo, useState } from 'react';

import { Transaction } from './props.ts';
import { BiEdit, BiTrash } from 'react-icons/bi';
import classNames from 'classnames';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getFilteredRowModel,
  // ColumnFiltersState,
  Row,
} from '@tanstack/react-table';

import { Modal } from '../Modal';
import { ConfirmationModalContent } from '../ConfirmationModalContent';
import { AddTransactionForm } from '../AddTransactionForm';
import { Searchbar } from '../Searchbar/Searchbar.tsx';

import fakeData from '../../../data/fakeData.json';
import tableData from '../../../data/table.json';
export const TransactionTable = () => {
  const [data, setData] = useState<Transaction[]>(fakeData);
  const [showModal, setShowModal] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [deletedId, setDeletedId] = useState('');
  const [transaction, setTransaction] = useState<Transaction>();
  // const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const {
    firstColumnText,
    secondColumnText,
    thirdColumnText,
    fourthColumnText,
    fifthColumnText,
    sixthColumnText,
    seventhColumnText,
    editButtonText,
    deleteButtonText,
  } = tableData;

  const handleOpen = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleOpenEditModal = () => {
    setShowTransactionModal(true);
  };

  const handleCloseEditModal = () => {
    setShowTransactionModal(false);
    localStorage.removeItem('EditTransactionForm');
  };

  const handleDeleteRow = (id: string) => {
    setData(prevState => prevState.filter(item => item._id !== id));
  };
  const columnHelper = createColumnHelper<Transaction>();

  const columns = useMemo(
    () => [
      columnHelper.accessor('_id', {
        header: () => `${firstColumnText}`,
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('type', {
        header: () => `${secondColumnText}`,
        cell: info => info.getValue(),
        meta: {
          filterVariant: 'select',
        },
      }),
      columnHelper.accessor('category', {
        header: () => `${thirdColumnText}`,
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('description', {
        header: () => `${fourthColumnText}`,
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('amount', {
        header: () => `${fifthColumnText}`,
      }),
      columnHelper.accessor('date', {
        header: `${sixthColumnText}`,
        cell: info =>
          new Date(info.getValue()).toLocaleDateString('uk-UA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
      }),
      {
        id: 'actions',
        header: `${seventhColumnText}`,
        cell: ({ row }: { row: Row<Transaction> }) => {
          const transaction = row.original;

          return (
            <div className="flex gap-2 justify-center">
              <button
                className="cursor-pointer md:h-6 md:w-6 max-[767.98px]:w-1/2  max-[767.98px]:bg-primary max-[767.98px]:text-white max-[767.98px]:py-3 max-[767.98px]:rounded-lg max-[767.98px]:hover:bg-blue-600 max-[767.98px]:transition-colors  max-[767.98px]:focus:bg-blue-600"
                onClick={() => {
                  handleOpenEditModal();
                  setTransaction(transaction);
                }}
              >
                <span className="md:hidden">{editButtonText}</span>
                <BiEdit className="w-full h-full max-[767.98px]:hidden md:block" />
              </button>
              <button
                className="max-[767.98px]:w-1/2 max-[767.98px]:bg-error max-[767.98px]:text-white max-[767.98px]:py-3 max-[767.98px]:rounded-lg max-[767.98px]:hover:bg-red-600 max-[767.98px]:transition-colors cursor-pointer  max-[767.98px]:focus:bg-red-600 md:h-6 md:w-6 md:text-error "
                onClick={() => {
                  handleOpen();
                  setDeletedId(transaction._id);
                }}
              >
                <span className="md:hidden">{deleteButtonText}</span>
                <BiTrash className="w-full h-full max-[767.98px]:hidden md:block" />
              </button>
            </div>
          );
        },
      },
    ],
    [
      columnHelper,
      firstColumnText,
      secondColumnText,
      thirdColumnText,
      fourthColumnText,
      fifthColumnText,
      sixthColumnText,
      seventhColumnText,
      editButtonText,
      deleteButtonText,
    ],
  );

  const table = useReactTable({
    data,
    columns,
    filterFns: {},
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'includesString',
    // onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  return (
    <>
      <Searchbar
        value={globalFilter ? globalFilter : ''}
        onChange={value => setGlobalFilter(String(value))}
      />
      <div className="flex items-center sm:justify-center">
        <table className="text-sm  w-full  rounded-xl shadow-lg overflow-hidden table-fixed">
          <thead className="hidden md:table-header-group rounded-l-xl">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="bg-blue-100  text-center px-8 py-4 first:rounded-t-lg  sm:first:rounded-t-none sm:last:rounded-b-none sm:first:rounded-tl-lg  sm:last:rounded-tr-lg "
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
            {table.getRowModel().rows.map((row, index, array) => (
              <tr
                key={row.id}
                className={classNames('tr-class', {
                  'rounded-b-xl': index === array.length - 1,
                })}
              >
                {row.getVisibleCells().map(cell => {
                  return (
                    <td key={cell.id} className="td-class">
                      <span
                        className={classNames({
                          'text-success':
                            cell.column.id === 'type' &&
                            row.original.type === 'дохід',
                          'text-error':
                            cell.column.id === 'type' &&
                            row.original.type === 'витрата',
                        })}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <Modal onClose={handleClose} isOpen={showModal} type="confirm">
          <ConfirmationModalContent
            onCancelClick={handleClose}
            onConfirmClick={() => {
              handleDeleteRow(deletedId);
              handleClose();
            }}
          />
        </Modal>
        <Modal
          onClose={handleCloseEditModal}
          isOpen={showTransactionModal}
          type="transaction"
        >
          <AddTransactionForm
            onClose={handleCloseEditModal}
            isEditForm={true}
            transaction={transaction}
          />
        </Modal>
      </div>
    </>
  );
};
