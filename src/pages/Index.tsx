
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
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="mb-6">
              <div className="w-32 h-32 mx-auto flex items-center justify-center mb-4">
                <img 
                  src="/lovable-uploads/9ecf861a-8ac1-4236-9234-6bfc493b429d.png" 
                  alt="iOS Repair Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                iOS Repair
              </h1>
              <p className="text-gray-400 text-sm">
                Especialista em Placas de iPhone
              </p>
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-800">
            <div className="flex mb-6 bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setAuthMode('login')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  authMode === 'login'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Entrar
              </button>
              <button
                onClick={() => setAuthMode('register')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  authMode === 'register'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
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
