import { Link } from 'react-router';

export const Home = () => {
  return (
    <section>
      <div className="container ">
        <h1>Ласкаво просимо!</h1>
        <Link to="/register">Зареєструватися</Link>
        <Link to="/login">Увійти</Link>
      </div>
    </section>
  );
};
