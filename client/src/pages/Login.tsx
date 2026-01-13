import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function Login() {
  const [password, setPassword] = useState("");
  const [, setLocation] = useLocation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // 簡易密碼驗證
    if (password === "moti2026") {
      localStorage.setItem("moti_auth", "true"); // Fix: Use consistent key "moti_auth"
      toast.success("登入成功", {
        description: "歡迎回到 MOTI 客戶管理系統",
      });
      setLocation("/");
    } else {
      toast.error("登入失敗", {
        description: "密碼錯誤，請重試",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden">
      {/* 背景裝飾 */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#002B5C] rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#4A90E2] rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>

      <Card className="w-full max-w-md z-10 shadow-xl border-t-4 border-t-[#002B5C]">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="flex justify-center mb-4">
            <img 
              src="/images/logo.png" 
              alt="MOTI Logo" 
              className="h-16 object-contain"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-[#002B5C]">
            MOTI 客戶管理系統
          </CardTitle>
          <p className="text-sm text-gray-500">
            請輸入存取密碼以繼續
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                密碼
              </label>
              <Input
                id="password"
                type="password"
                placeholder="請輸入密碼"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-[#002B5C] hover:bg-[#001F42] text-white transition-colors"
            >
              登入系統
            </Button>
          </form>
          <div className="mt-8 text-center text-xs text-gray-400">
            &copy; 2026 MOTI. All rights reserved.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
