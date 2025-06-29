
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ServiceOrder } from "@/types/user";
import { useToast } from "@/hooks/use-toast";

interface ServiceOrderFormProps {
  onSubmit: (order: Omit<ServiceOrder, 'id' | 'userId' | 'createdAt'>) => void;
}

const ServiceOrderForm = ({ onSubmit }: ServiceOrderFormProps) => {
  const [formData, setFormData] = useState({
    deviceModel: "",
    defectDescription: "",
    repairType: "",
    notes: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const deviceModels = [
    "iPhone 15 Pro Max",
    "iPhone 15 Pro",
    "iPhone 15 Plus",
    "iPhone 15",
    "iPhone 14 Pro Max",
    "iPhone 14 Pro",
    "iPhone 14 Plus",
    "iPhone 14",
    "iPhone 13 Pro Max",
    "iPhone 13 Pro",
    "iPhone 13 mini",
    "iPhone 13",
    "iPhone 12 Pro Max",
    "iPhone 12 Pro",
    "iPhone 12 mini",
    "iPhone 12",
    "iPhone 11 Pro Max",
    "iPhone 11 Pro",
    "iPhone 11",
    "iPhone XS Max",
    "iPhone XS",
    "iPhone XR",
    "iPhone X"
  ];

  const repairTypes = [
    "Troca de display",
    "Troca de bateria",
    "Reparo de placa-mãe",
    "Troca de câmera",
    "Reparo de botões",
    "Troca de alto-falante",
    "Reparo de entrada de carregamento",
    "Outros reparos"
  ];

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const newOrder: Omit<ServiceOrder, 'id' | 'userId' | 'createdAt'> = {
        deviceModel: formData.deviceModel,
        defectDescription: formData.defectDescription,
        repairType: formData.repairType,
        status: 'pending',
        estimatedCompletion: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        warrantyTerms: "90 dias para defeitos de fabricação",
        notes: formData.notes || undefined
      };

      onSubmit(newOrder);
      
      toast({
        title: "Ordem criada com sucesso!",
        description: "Sua ordem de serviço foi registrada e será processada em breve.",
      });

      // Reset form
      setFormData({
        deviceModel: "",
        defectDescription: "",
        repairType: "",
        notes: ""
      });
    } catch (error) {
      toast({
        title: "Erro ao criar ordem",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Nova Ordem de Serviço</CardTitle>
        <CardDescription>
          Preencha os dados do dispositivo que precisa de reparo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="deviceModel">Modelo do iPhone</Label>
            <Select value={formData.deviceModel} onValueChange={(value) => handleChange('deviceModel', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o modelo" />
              </SelectTrigger>
              <SelectContent>
                {deviceModels.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="repairType">Tipo de Reparo</Label>
            <Select value={formData.repairType} onValueChange={(value) => handleChange('repairType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo de reparo" />
              </SelectTrigger>
              <SelectContent>
                {repairTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="defectDescription">Descrição do Defeito</Label>
            <Textarea
              id="defectDescription"
              placeholder="Descreva detalhadamente o problema do dispositivo..."
              value={formData.defectDescription}
              onChange={(e) => handleChange('defectDescription', e.target.value)}
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observações Adicionais (Opcional)</Label>
            <Textarea
              id="notes"
              placeholder="Informações extras, urgência, etc..."
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              rows={3}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Criando Ordem...
              </div>
            ) : (
              "Criar Ordem de Serviço"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ServiceOrderForm;
