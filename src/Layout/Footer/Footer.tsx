import commonData from '../../../data/common.json';

export const Footer = () => {
  const {
    footer: { text },
  } = commonData;
  const currentYear = new Date().getFullYear();

  const string = `${currentYear} ${text}`;
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {string}</p>
      </div>
    </footer>
  );
};
