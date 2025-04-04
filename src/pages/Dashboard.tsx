import { useState } from 'react';

import { PDFDownloadLink } from '@react-pdf/renderer';
import { Modal } from '../components/Modal';
import { TransactionTable } from '../components/TransactionTable';
import { AddTransactionForm } from '../components/AddTransactionForm';
import TransactionTablePDF from '../components/TransactionTablePDF/TransactionTablePDF.tsx';
import { Transaction } from '../components/TransactionTable/props.ts';

const initialData: Transaction[] = [
  {
    _id: '1',
    type: 'дохід',
    category: 'Зарплата',
    description: 'Місячна зарплата за березень',
    amount: 25000,
    date: '2025-03-30T12:00:00.000Z',
    owner: '65f2c1234abcd56789ef0123',
  },
  {
    _id: '2',
    type: 'дохід',
    category: 'Фріланс',
    description: 'Розробка вебсайту',
    amount: 12000,
    date: '2025-03-28T15:30:00.000Z',
    owner: '65f2c1234abcd56789ef0123',
  },
  {
    _id: '3',
    type: 'дохід',
    category: 'Інвестиції',
    description: 'Дивіденди від акцій',
    amount: 5000,
    date: '2025-03-25T09:00:00.000Z',
    owner: '65f2c1234abcd56789ef0123',
  },
  {
    _id: '4',
    type: 'дохід',
    category: 'Подарунки',
    description: 'Грошовий подарунок на день народження',
    amount: 2000,
    date: '2025-03-20T18:45:00.000Z',
    owner: '65f2c5678abcd12345ef6789',
  },
  {
    _id: '5',
    type: 'витрата',
    category: 'Їжа',
    description: 'Покупки в магазині',
    amount: 2000,
    date: '2025-03-20T18:45:00.000Z',
    owner: '65f2c5678abcd12345ef6789',
  },
  {
    _id: '6',
    type: 'витрата',
    category: 'Розваги',
    description: 'Похід у кіно',
    amount: 400,
    date: '2025-03-20T18:45:00.000Z',
    owner: '65f2c5678abcd12345ef6789',
  },
];

export const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => {
    setShowModal(true);
    localStorage.removeItem('EditTransactionForm');
  };

  const handleClose = () => {
    setShowModal(false);
    localStorage.removeItem('EditTransactionForm');
  };
  return (
    <section className="py-10 bg-gray-200">
      <div className="container">
        <h1>Дашборд</h1>
        <Modal onClose={handleClose} isOpen={showModal} type="transaction">
          <AddTransactionForm onClose={handleClose} isEditForm={false} />
        </Modal>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleOpen}
            className=" bg-primary text-white  rounded-lg mt-8 hover:bg-blue-600 focus:bg-blue-600 transition-colors cursor-pointer py-2 px-4 mb-6"
          >
            Додати запис
          </button>
          <PDFDownloadLink
            document={<TransactionTablePDF transactions={initialData} />}
            fileName="table.pdf"
          >
            <button
              type="button"
              className=" bg-primary text-white  rounded-lg mt-8 hover:bg-blue-600 focus:bg-blue-600 transition-colors cursor-pointer py-2 px-4 mb-6"
            >
              Завантажити PDF
            </button>
          </PDFDownloadLink>
        </div>

        <TransactionTable />
      </div>
    </section>
  );
};
