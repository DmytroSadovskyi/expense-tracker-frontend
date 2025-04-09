import { Link } from 'react-router';

import loginData from '../../data/loginForm.json';
import registerData from '../../data/registerForm.json';
import pagesData from '../../data/pages.json';

export const Home = () => {
  const { buttonText: loginLinkText } = loginData;
  const { buttonText: registerLinkText } = registerData;
  const {
    home: { title, firstParagraph, secondParagraph },
  } = pagesData;

  return (
    <section className="py-16 min-h-screen">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {title}
          </h1>
          <p className="text-lg text-gray-600 mb-6">{firstParagraph}</p>
          <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row justify-center md:justify-start">
            <Link
              to="/login"
              className="inline-block py-4 px-8 bg-[#007bff] text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600  cursor-pointer  focus:bg-blue-600 hover:-translate-y-1 transition-all duration-300"
            >
              {loginLinkText}
            </Link>
            <Link
              to="/register"
              className="inline-block py-4 px-8 bg-[#28a745] text-white font-semibold rounded-lg shadow-lg hover:bg-[#218838] hover:-translate-y-1 transition-all duration-300"
            >
              {registerLinkText}
            </Link>
          </div>
          <p className="mt-4 text-[#ff0000] font-medium">{secondParagraph}</p>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0">
          <div className="bg-gray-200 rounded-lg h-64 md:h-96 flex items-center justify-center">
            <span className="text-gray-500 text-lg">
              Тут може бути мокап додатку
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
