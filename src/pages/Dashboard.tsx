import { useState } from 'react';

import { PDFDownloadLink } from '@react-pdf/renderer';
import { Modal } from '../components/Modal';
import { TransactionTable } from '../components/TransactionTable';
import { AddTransactionForm } from '../components/AddTransactionForm';
import TransactionTablePDF from '../components/TransactionTablePDF/TransactionTablePDF.tsx';
import { useTypedSelector } from '../../redux/store';
import pagesData from '../../data/pages.json';

export const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const {
    dashboard: { addRecordText, downloadPDFText },
  } = pagesData;

  const handleOpen = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const transactions = useTypedSelector(
    state => state.transactions.transactions,
  );

  return (
    <section className="py-10 bg-gradient-to-br from-gray-100 to-blue-100 min-h-screen">
      <div className="container mx-auto">
        <Modal onClose={handleClose} isOpen={showModal} type="transaction">
          <AddTransactionForm onClose={handleClose} isEditForm={false} />
        </Modal>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleOpen}
            className=" bg-primary text-white  rounded-lg mt-8 hover:bg-blue-600 focus:bg-blue-600 hover:-translate-y-1 transition-all duration-300 cursor-pointer py-2 px-4 mb-6"
          >
            {addRecordText}
          </button>
          <PDFDownloadLink
            document={<TransactionTablePDF transactions={transactions} />}
            fileName="table.pdf"
          >
            <button
              type="button"
              className=" bg-primary text-white  rounded-lg mt-8 hover:bg-blue-600 focus:bg-blue-600 hover:-translate-y-1 transition-all duration-300 cursor-pointer py-2 px-4 mb-6"
            >
              {downloadPDFText}
            </button>
          </PDFDownloadLink>
        </div>

        <TransactionTable />
      </div>
    </section>
  );
};
