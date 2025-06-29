
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/types/user";
import { useToast } from "@/hooks/use-toast";

interface RegisterFormProps {
  onRegister: (user: User) => void;
}

const RegisterForm = ({ onRegister }: RegisterFormProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    storeName: "",
    document: "",
    email: "",
    phone: "",
    whatsapp: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erro no cadastro",
        description: "As senhas não coincidem",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simular cadastro (substituir por Supabase)
    setTimeout(() => {
      const newUser: User = {
        id: Date.now().toString(),
        fullName: formData.fullName,
        storeName: formData.storeName,
        document: formData.document,
        email: formData.email,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        address: {
          street: formData.street,
          number: formData.number,
          complement: formData.complement,
          neighborhood: formData.neighborhood,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode
        },
        createdAt: new Date()
      };
      
      onRegister(newUser);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-gray-300">Nome Completo</Label>
          <Input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="storeName" className="text-gray-300">Nome da Loja</Label>
          <Input
            id="storeName"
            name="storeName"
            value={formData.storeName}
            onChange={handleChange}
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="document" className="text-gray-300">CPF/CNPJ</Label>
          <Input
            id="document"
            name="document"
            value={formData.document}
            onChange={handleChange}
            placeholder="000.000.000-00"
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-gray-300">Telefone</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(11) 99999-9999"
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-300">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="whatsapp" className="text-gray-300">WhatsApp</Label>
          <Input
            id="whatsapp"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            placeholder="(11) 99999-9999"
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 space-y-2">
          <Label htmlFor="street" className="text-gray-300">Endereço</Label>
          <Input
            id="street"
            name="street"
            value={formData.street}
            onChange={handleChange}
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="number" className="text-gray-300">Número</Label>
          <Input
            id="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="neighborhood" className="text-gray-300">Bairro</Label>
          <Input
            id="neighborhood"
            name="neighborhood"
            value={formData.neighborhood}
            onChange={handleChange}
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="city" className="text-gray-300">Cidade</Label>
          <Input
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="state" className="text-gray-300">Estado</Label>
          <Input
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="SP"
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="zipCode" className="text-gray-300">CEP</Label>
        <Input
          id="zipCode"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          placeholder="00000-000"
          className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="password" className="text-gray-300">Senha</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-gray-300">Confirmar Senha</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
            required
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Cadastrando...
          </div>
        ) : (
          "Criar Conta"
        )}
      </Button>
    </form>
  );
};

export default RegisterForm;
