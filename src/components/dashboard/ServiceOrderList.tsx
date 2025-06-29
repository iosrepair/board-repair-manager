
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ServiceOrder } from "@/types/user";
import { Clock, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ServiceOrderListProps {
  orders: ServiceOrder[];
}

const ServiceOrderList = ({ orders }: ServiceOrderListProps) => {
  const getStatusIcon = (status: ServiceOrder['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-orange-500" />;
      case 'in-progress':
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusBadge = (status: ServiceOrder['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800">Pendente</Badge>;
      case 'in-progress':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Em Andamento</Badge>;
      case 'completed':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Finalizado</Badge>;
      case 'cancelled':
        return <Badge variant="secondary" className="bg-red-100 text-red-800">Cancelado</Badge>;
    }
  };

  const formatDate = (date: Date) => {
    return format(date, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
  };

  if (orders.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <div className="text-gray-500">
            <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">Nenhuma ordem encontrada</p>
            <p className="text-sm">Crie sua primeira ordem de serviço para começar.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Minhas Ordens de Serviço</h2>
        <span className="text-sm text-gray-500">{orders.length} ordem(ns) total</span>
      </div>

      <div className="grid gap-4">
        {orders.map((order) => (
          <Card key={order.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getStatusIcon(order.status)}
                  <CardTitle className="text-lg">#{order.id}</CardTitle>
                </div>
                {getStatusBadge(order.status)}
              </div>
              <CardDescription className="text-base font-medium text-gray-900">
                {order.deviceModel} - {order.repairType}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">Descrição do Defeito:</h4>
                <p className="text-gray-600 text-sm">{order.defectDescription}</p>
              </div>

              {order.notes && (
                <div>
                  <h4 className="font-medium mb-1">Observações:</h4>
                  <p className="text-gray-600 text-sm">{order.notes}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Criado em:</span>
                  <p className="text-gray-600">{formatDate(order.createdAt)}</p>
                </div>

                {order.estimatedCompletion && (
                  <div>
                    <span className="font-medium">Previsão:</span>
                    <p className="text-gray-600">{formatDate(order.estimatedCompletion)}</p>
                  </div>
                )}

                {order.completedAt && (
                  <div>
                    <span className="font-medium">Finalizado em:</span>
                    <p className="text-gray-600">{formatDate(order.completedAt)}</p>
                  </div>
                )}

                <div>
                  <span className="font-medium">Garantia:</span>
                  <p className="text-gray-600">{order.warrantyTerms}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServiceOrderList;
