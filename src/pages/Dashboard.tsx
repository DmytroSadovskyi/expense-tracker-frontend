import { useState } from 'react';
import { Modal } from '../components/Modal';
import { TransactionTable } from '../components/TransactionTable';

export const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <section>
      <div className="container">
        <h1>Дашборд</h1>
        <Modal onClose={handleClose} isOpen={showModal} />

        <button
          onClick={handleOpen}
          className=" bg-primary text-white  rounded-lg mt-8 hover:bg-blue-600 focus:bg-blue-600 transition-colors cursor-pointer py-2 px-4 mb-6"
        >
          Додати запис
        </button>
        <TransactionTable />
      </div>
    </section>
  );
};
