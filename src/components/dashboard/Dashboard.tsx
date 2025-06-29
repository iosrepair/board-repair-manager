
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, ServiceOrder } from "@/types/user";
import { Plus, Clock, CheckCircle, AlertCircle, LogOut } from "lucide-react";
import ServiceOrderForm from "./ServiceOrderForm";
import ServiceOrderList from "./ServiceOrderList";

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard = ({ user, onLogout }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'new-order' | 'orders'>('overview');
  const [serviceOrders, setServiceOrders] = useState<ServiceOrder[]>([
    {
      id: "1",
      userId: user.id,
      deviceModel: "iPhone 14 Pro Max",
      defectDescription: "Tela não liga após queda",
      repairType: "Troca de display",
      status: "in-progress",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      estimatedCompletion: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      warrantyTerms: "90 dias para defeitos de fabricação"
    },
    {
      id: "2",
      userId: user.id,
      deviceModel: "iPhone 13",
      defectDescription: "Bateria não carrega",
      repairType: "Troca de bateria",
      status: "completed",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      warrantyTerms: "180 dias para bateria"
    }
  ]);

  const handleNewOrder = (order: Omit<ServiceOrder, 'id' | 'userId' | 'createdAt'>) => {
    const newOrder: ServiceOrder = {
      ...order,
      id: Date.now().toString(),
      userId: user.id,
      createdAt: new Date()
    };
    setServiceOrders(prev => [newOrder, ...prev]);
    setActiveTab('orders');
  };

  const pendingOrders = serviceOrders.filter(order => order.status === 'pending').length;
  const inProgressOrders = serviceOrders.filter(order => order.status === 'in-progress').length;
  const completedOrders = serviceOrders.filter(order => order.status === 'completed').length;

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-gray-900 shadow-sm border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/9ecf861a-8ac1-4236-9234-6bfc493b429d.png" 
                  alt="iOS Repair Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">iOS Repair</h1>
                <p className="text-sm text-gray-400">{user.storeName}</p>
              </div>
            </div>
            <Button
              onClick={onLogout}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Navigation */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            onClick={() => setActiveTab('overview')}
            variant={activeTab === 'overview' ? 'default' : 'outline'}
            className={activeTab === 'overview' 
              ? "bg-blue-600 hover:bg-blue-700 text-white" 
              : "border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
            }
          >
            Dashboard
          </Button>
          <Button
            onClick={() => setActiveTab('new-order')}
            variant={activeTab === 'new-order' ? 'default' : 'outline'}
            className={`flex items-center gap-2 ${activeTab === 'new-order' 
              ? "bg-blue-600 hover:bg-blue-700 text-white" 
              : "border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <Plus className="h-4 w-4" />
            Nova Ordem
          </Button>
          <Button
            onClick={() => setActiveTab('orders')}
            variant={activeTab === 'orders' ? 'default' : 'outline'}
            className={`flex items-center gap-2 ${activeTab === 'orders' 
              ? "bg-blue-600 hover:bg-blue-700 text-white" 
              : "border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            Minhas Ordens
          </Button>
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2 text-gray-300">
                    <Clock className="h-4 w-4 text-orange-500" />
                    Pendentes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{pendingOrders}</div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2 text-gray-300">
                    <AlertCircle className="h-4 w-4 text-blue-500" />
                    Em Andamento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{inProgressOrders}</div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2 text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Finalizadas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{completedOrders}</div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Bem-vindo, {user.fullName}!</CardTitle>
                <CardDescription className="text-gray-400">
                  Gerencie suas ordens de serviço e acompanhe o status dos reparos.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={() => setActiveTab('new-order')}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Plus className="h-4 w-4" />
                    Criar Nova Ordem
                  </Button>
                  <Button
                    onClick={() => setActiveTab('orders')}
                    variant="outline"
                    className="flex items-center gap-2 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    Ver Todas as Ordens
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'new-order' && (
          <ServiceOrderForm onSubmit={handleNewOrder} />
        )}

        {activeTab === 'orders' && (
          <ServiceOrderList orders={serviceOrders} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
