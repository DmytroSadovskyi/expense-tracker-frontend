import { UserForm } from '../components/UserForm';

export const Register = () => {
  return (
    <section className="bg-gray-200 py-10 px-10 min-h-screen">
      <div className="flex flex-col justify-center items-center">
        <UserForm type="register" />
      </div>
    </section>
  );
};
