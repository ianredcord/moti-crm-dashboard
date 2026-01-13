import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

export default function Login() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // 模擬登入驗證 (實際應用中應使用更安全的方式)
    setTimeout(() => {
      if (password === "moti2026") {
        localStorage.setItem("moti_auth", "true");
        toast.success("登入成功");
        setLocation("/");
      } else {
        toast.error("密碼錯誤");
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 opacity-10 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/login-bg.png')" }}
      />
      
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="flex justify-center mb-8">
          <img src="/images/logo.png" alt="MOTI Logo" className="h-16 object-contain" />
        </div>
        
        <Card className="w-full shadow-lg border-slate-200">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-slate-900">MOTI 客戶管理系統</CardTitle>
            <CardDescription>請輸入存取密碼以繼續</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">密碼</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="請輸入密碼" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white"
                  />
                </div>
              </div>
              <Button className="w-full mt-6 bg-slate-900 hover:bg-slate-800" type="submit" disabled={isLoading}>
                {isLoading ? "驗證中..." : "登入系統"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-xs text-slate-500">© 2026 MOTI. All rights reserved.</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
