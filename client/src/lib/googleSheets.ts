import Papa from "papaparse";

// 注意：這需要您將 Google Sheets 發布為 CSV (檔案 > 分享 > 發布到網路 > 選擇工作表 > CSV)
// 這是最簡單且免費的讀取方式，不需要 API Key
const SHEET_ID = "1qjCOwTDooEkuH1qvj9M_0aUHFKGAeqaLzR6UCkikv2w";

// 各工作表的 GID (需要從瀏覽器網址列查看 gid=xxx)
// 這裡先假設預設 GID，實際部署時需要您提供正確的 GID
const SHEETS_CONFIG = {
  DASHBOARD: "0",      // 儀表板
  SALES_A: "123456",   // A類-直銷案件追蹤 (需替換)
  SALES_B: "234567",   // B類-通路案件追蹤 (需替換)
};

export interface Case {
  id: string;
  customer: string;
  stage: string;
  sales: string;
  lastUpdate: string;
  // ... 其他欄位
}

export async function fetchSheetData(sheetName: keyof typeof SHEETS_CONFIG) {
  const gid = SHEETS_CONFIG[sheetName];
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${gid}`;

  try {
    const response = await fetch(url);
    const csvText = await response.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          resolve(results.data);
        },
        error: (error: any) => {
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error("Error fetching sheet data:", error);
    return [];
  }
}
