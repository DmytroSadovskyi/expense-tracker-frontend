import { Link } from 'react-router';

export const Home = () => {
  return (
    <>
      <h1>Ласкаво просимо!</h1>
      <Link to="/register">Зареєструватися</Link>
      <Link to="/login">Увійти</Link>
    </>
  );
};
