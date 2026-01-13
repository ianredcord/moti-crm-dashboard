import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, CheckCircle2, Clock, DollarSign, LayoutDashboard, LogOut, Users } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Home() {
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("moti_auth");
    toast.success("已登出");
    setLocation("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar / Navigation */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-slate-900 text-white transition-transform">
        <div className="flex h-16 items-center justify-center border-b border-slate-800 px-6">
          <img src="/images/logo.png" alt="MOTI" className="h-8 brightness-0 invert" />
        </div>
        <div className="px-3 py-4">
          <ul className="space-y-2 font-medium">
            <li>
              <a href="#" className="flex items-center rounded-lg bg-blue-600 px-3 py-2 text-white">
                <LayoutDashboard className="mr-3 h-5 w-5" />
                儀表板
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-white">
                <Users className="mr-3 h-5 w-5" />
                案件看板
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-white">
                <BarChart3 className="mr-3 h-5 w-5" />
                業績統計
              </a>
            </li>
          </ul>
        </div>
        <div className="absolute bottom-0 w-full border-t border-slate-800 p-4">
          <Button variant="ghost" className="w-full justify-start text-slate-300 hover:bg-slate-800 hover:text-white" onClick={handleLogout}>
            <LogOut className="mr-3 h-5 w-5" />
            登出系統
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">儀表板總覽</h1>
            <p className="text-slate-500">歡迎回來，這裡是 MOTI 2026 客戶管理系統</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-900">Admin User</p>
              <p className="text-xs text-slate-500">管理員</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
              AD
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">本月成交金額</CardTitle>
              <DollarSign className="h-4 w-4 text-slate-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231</div>
              <p className="text-xs text-slate-500">+20.1% 較上月</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">進行中案件</CardTitle>
              <Users className="h-4 w-4 text-slate-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-slate-500">4 筆待聯絡</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">本月成交數</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-slate-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-slate-500">目標達成率 75%</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">平均成交週期</CardTitle>
              <Clock className="h-4 w-4 text-slate-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">14 天</div>
              <p className="text-xs text-slate-500">-2 天 較上月</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Content */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">總覽</TabsTrigger>
            <TabsTrigger value="analytics">詳細分析</TabsTrigger>
            <TabsTrigger value="reports">報表</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>案件漏斗分析</CardTitle>
                  <CardDescription>各階段案件數量分佈</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  {/* Placeholder for Chart */}
                  <div className="h-[300px] flex items-center justify-center bg-slate-50 rounded-md border border-dashed border-slate-200">
                    <p className="text-slate-400">圖表區域 (將連接 Google Sheets 資料)</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>待辦事項</CardTitle>
                  <CardDescription>今日需要關注的案件</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center">
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">聯絡客戶 A (MOTI-{2026000+i})</p>
                          <p className="text-sm text-slate-500">已超過 48 小時未聯絡</p>
                        </div>
                        <div className="ml-auto font-medium text-red-500 text-sm">急件</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
