import { UserForm } from '../components/UserForm';

export const Register = () => {
  return (
    <section className="bg-gradient-to-br from-gray-100 to-blue-100 py-10 px-10 min-h-screen flex flex-col items-center justify-center">
      <UserForm type="register" />
    </section>
  );
};
