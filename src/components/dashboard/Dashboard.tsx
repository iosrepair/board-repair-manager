
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">iR</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">iOS Repair</h1>
                <p className="text-sm text-gray-600">{user.storeName}</p>
              </div>
            </div>
            <Button
              onClick={onLogout}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
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
            className="flex items-center gap-2"
          >
            Dashboard
          </Button>
          <Button
            onClick={() => setActiveTab('new-order')}
            variant={activeTab === 'new-order' ? 'default' : 'outline'}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Nova Ordem
          </Button>
          <Button
            onClick={() => setActiveTab('orders')}
            variant={activeTab === 'orders' ? 'default' : 'outline'}
            className="flex items-center gap-2"
          >
            Minhas Ordens
          </Button>
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Clock className="h-4 w-4 text-orange-500" />
                    Pendentes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{pendingOrders}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-blue-500" />
                    Em Andamento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{inProgressOrders}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Finalizadas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{completedOrders}</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Bem-vindo, {user.fullName}!</CardTitle>
                <CardDescription>
                  Gerencie suas ordens de serviço e acompanhe o status dos reparos.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={() => setActiveTab('new-order')}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Criar Nova Ordem
                  </Button>
                  <Button
                    onClick={() => setActiveTab('orders')}
                    variant="outline"
                    className="flex items-center gap-2"
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
