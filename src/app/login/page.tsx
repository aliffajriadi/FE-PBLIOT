import LoginForm from "./component/FormLogin";


const LoginPage: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-indigo-100 flex flex-col">
    <div className="flex-1 flex items-center justify-center py-12">
      <LoginForm />
    </div>

    <footer className="text-center pb-8">
      <p className="text-[#2F4C87] font-semibold text-lg">
        Smart System for School Attendance Needs.
      </p>
    </footer>
  </div>
);

export default LoginPage;
