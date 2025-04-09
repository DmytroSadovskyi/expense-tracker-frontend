import { UserForm } from '../components/UserForm';

export const Login = () => {
  return (
    <section className="bg-gradient-to-br from-gray-100 to-blue-100 py-10 px-10 min-h-screen flex flex-col justify-center items-center">
      <UserForm type="login" />
    </section>
  );
};
