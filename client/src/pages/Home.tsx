import { useState, useEffect } from "react";
import { fetchSheetData } from "@/lib/googleSheets";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  Users, 
  Target, 
  TrendingUp, 
  AlertCircle,
  LogOut,
  LayoutDashboard,
  ListTodo
} from "lucide-react";

// 模擬數據 (作為備用)
const MOCK_DATA = {
  stats: [
    { title: "本月直銷目標", value: "2 / 4", sub: "達成率 50%", icon: Target, color: "text-blue-600" },
    { title: "本月經銷目標", value: "3 / 5", sub: "達成率 60%", icon: TrendingUp, color: "text-green-600" },
    { title: "待聯絡案件", value: "5", sub: "超過 48 小時: 2", icon: AlertCircle, color: "text-red-600" },
    { title: "本週新名單", value: "12", sub: "A類: 4 / B類: 8", icon: Users, color: "text-purple-600" },
  ],
  funnel: [
    { name: "待聯絡", value: 15 },
    { name: "已聯絡", value: 10 },
    { name: "Demo排程", value: 8 },
    { name: "Demo完成", value: 5 },
    { name: "報價中", value: 3 },
    { name: "成交", value: 2 },
  ],
  performance: [
    { name: "業務 A", contact: 20, demo: 8, deal: 2 },
    { name: "業務 B", contact: 15, demo: 6, deal: 1 },
    { name: "業務 C", contact: 10, demo: 4, deal: 0 },
  ]
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export default function Home() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [sheetData, setSheetData] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      try {
        // 嘗試載入 Google Sheets 資料
        // 注意：這裡需要替換為實際的 Sheet ID 和 GID
        // const data = await fetchSheetData("DASHBOARD");
        // setSheetData(data);
        
        // 暫時使用模擬數據，等待實際連接
        setTimeout(() => setLoading(false), 1000);
      } catch (error) {
        console.error("Failed to load sheet data", error);
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setLocation("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 頂部導航列 */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src="/images/logo.png" alt="MOTI Logo" className="h-8 object-contain" />
            <h1 className="text-xl font-bold text-[#002B5C] hidden md:block">客戶管理系統</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex space-x-1">
              <Button 
                variant={activeTab === "dashboard" ? "default" : "ghost"}
                onClick={() => setActiveTab("dashboard")}
                className={activeTab === "dashboard" ? "bg-[#002B5C] text-white" : "text-gray-600"}
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                儀表板
              </Button>
              <Button 
                variant={activeTab === "cases" ? "default" : "ghost"}
                onClick={() => setActiveTab("cases")}
                className={activeTab === "cases" ? "bg-[#002B5C] text-white" : "text-gray-600"}
              >
                <ListTodo className="mr-2 h-4 w-4" />
                案件看板
              </Button>
            </nav>
            <Button variant="outline" size="sm" onClick={handleLogout} className="text-gray-600 border-gray-300">
              <LogOut className="mr-2 h-4 w-4" />
              登出
            </Button>
          </div>
        </div>
      </header>

      {/* 手機版底部導航 */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 flex justify-around p-2">
        <Button 
          variant="ghost" 
          className={`flex-col h-auto py-2 ${activeTab === "dashboard" ? "text-[#002B5C]" : "text-gray-500"}`}
          onClick={() => setActiveTab("dashboard")}
        >
          <LayoutDashboard className="h-5 w-5 mb-1" />
          <span className="text-xs">儀表板</span>
        </Button>
        <Button 
          variant="ghost" 
          className={`flex-col h-auto py-2 ${activeTab === "cases" ? "text-[#002B5C]" : "text-gray-500"}`}
          onClick={() => setActiveTab("cases")}
        >
          <ListTodo className="h-5 w-5 mb-1" />
          <span className="text-xs">案件</span>
        </Button>
      </div>

      {/* 主要內容區域 */}
      <main className="flex-1 container mx-auto px-4 py-8 pb-20 md:pb-8">
        {activeTab === "dashboard" ? (
          <div className="space-y-8">
            {/* 歡迎訊息 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800">早安，MOTI 團隊</h2>
              <p className="text-gray-500">這是今天的業務概況摘要</p>
            </div>

            {/* 關鍵數據卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {MOCK_DATA.stats.map((stat, index) => (
                <Card key={index} className="border-l-4 border-l-[#002B5C] shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <p className={`text-xs mt-1 ${stat.color}`}>{stat.sub}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* 圖表區域 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 案件漏斗圖 */}
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-800">案件漏斗分析</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={MOCK_DATA.funnel}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={80} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#002B5C" radius={[0, 4, 4, 0]} barSize={30} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* 業務績效圖 */}
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-800">業務績效統計</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={MOCK_DATA.performance}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="contact" name="聯絡數" fill="#4A90E2" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="demo" name="Demo數" fill="#002B5C" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="deal" name="成交數" fill="#00C49F" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">案件看板</h2>
              <Button className="bg-[#002B5C] hover:bg-[#001F42]">
                + 新增案件
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 待聯絡 */}
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-bold text-gray-700 mb-4 flex items-center">
                  <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                  待聯絡 (5)
                </h3>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-bold text-[#002B5C] bg-blue-50 px-2 py-1 rounded">A類</span>
                          <span className="text-xs text-gray-400">2小時前</span>
                        </div>
                        <h4 className="font-bold text-gray-800 mb-1">王大明醫師</h4>
                        <p className="text-sm text-gray-500 mb-3">大安骨科診所</p>
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>負責人: 業務B</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Demo 排程 */}
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-bold text-gray-700 mb-4 flex items-center">
                  <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
                  Demo 排程 (3)
                </h3>
                <div className="space-y-3">
                  {[1, 2].map((i) => (
                    <Card key={i} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-bold text-[#002B5C] bg-blue-50 px-2 py-1 rounded">A類</span>
                          <span className="text-xs text-gray-400">明天 14:00</span>
                        </div>
                        <h4 className="font-bold text-gray-800 mb-1">李小美治療師</h4>
                        <p className="text-sm text-gray-500 mb-3">永和物理治療所</p>
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>負責人: 業務B</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* 報價中 */}
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-bold text-gray-700 mb-4 flex items-center">
                  <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                  報價中 (2)
                </h3>
                <div className="space-y-3">
                  {[1].map((i) => (
                    <Card key={i} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-bold text-[#002B5C] bg-blue-50 px-2 py-1 rounded">A類</span>
                          <span className="text-xs text-gray-400">3天前</span>
                        </div>
                        <h4 className="font-bold text-gray-800 mb-1">張志明院長</h4>
                        <p className="text-sm text-gray-500 mb-3">板橋復健科</p>
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>金額: $350,000</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
