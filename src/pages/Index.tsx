
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import Dashboard from "@/components/dashboard/Dashboard";
import { User } from "@/types/user";

const Index = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { toast } = useToast();

  const handleLogin = (userData: User) => {
    setCurrentUser(userData);
    toast({
      title: "Login realizado com sucesso!",
      description: `Bem-vindo(a), ${userData.storeName}`,
    });
  };

  const handleRegister = (userData: User) => {
    setCurrentUser(userData);
    toast({
      title: "Cadastro realizado com sucesso!",
      description: "Um email de confirmação foi enviado para você.",
    });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    toast({
      title: "Logout realizado",
      description: "Até logo!",
    });
  };

  if (currentUser) {
    return <Dashboard user={currentUser} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl mx-auto flex items-center justify-center mb-4">
                <span className="text-white text-2xl font-bold">iR</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                iOS Repair
              </h1>
              <p className="text-gray-600 text-sm">
                Especialista em Placas de iPhone
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setAuthMode('login')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  authMode === 'login'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Entrar
              </button>
              <button
                onClick={() => setAuthMode('register')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  authMode === 'register'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Cadastrar
              </button>
            </div>

            {authMode === 'login' ? (
              <LoginForm onLogin={handleLogin} />
            ) : (
              <RegisterForm onRegister={handleRegister} />
            )}
          </div>

          <div className="text-center mt-6 text-sm text-gray-500">
            <p>Portal exclusivo para lojistas parceiros</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
