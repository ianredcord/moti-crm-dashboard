import Papa from "papaparse";

// Google Sheets 發布連結
const CSV_URLS = {
  CASES_A: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQwnVaHGKH1CCuKzjv_eAkW4QB_aGifKy0Q3yCpMTaHj9lFthiPQr9s9rd9eUnqLphKg_0HNQa0ntth/pub?gid=128701739&single=true&output=csv"
};

export interface Case {
  id: string;
  customer: string;
  company: string;
  stage: string;
  sales: string;
  lastUpdate: string;
  type: 'A' | 'B';
  contactDate: string;
  demoDate: string;
  amount: string;
}

export async function fetchSheetData(type: keyof typeof CSV_URLS) {
  try {
    const url = CSV_URLS[type];
    const response = await fetch(url);
    const csvText = await response.text();
    
    return new Promise<any[]>((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
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

export function processCasesData(rawData: any[]): Case[] {
  return rawData.map(row => ({
    id: row['案件編號'] || '',
    customer: row['客戶名稱'] || '未命名客戶',
    company: row['公司名稱'] || '',
    stage: row['目前階段'] || '待聯絡',
    sales: row['業務專員B'] || '',
    lastUpdate: row['最後更新日'] || '',
    type: 'A',
    contactDate: row['首次聯絡時間'] || '',
    demoDate: row['Demo日期'] || '',
    amount: row['報價金額'] || '0'
  }));
}
