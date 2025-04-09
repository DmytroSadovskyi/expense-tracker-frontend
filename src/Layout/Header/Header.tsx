import commonData from '../../../data/common.json';
export const Header = () => {
  const {
    header: { firstText, secondText },
  } = commonData;
  return (
    <header className="bg-gradient-to-r from-[#007bff] to-[#0056b3] text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-lg">
          {firstText}
        </p>
        <p className="mt-2 text-lg md:text-xl opacity-90">{secondText}</p>
      </div>
    </header>
  );
};
