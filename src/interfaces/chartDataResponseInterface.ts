export interface chartDataResponseInterface {
    success: boolean;
    message: string;
    data: Array<FilteredDataItem>;
  }
  
  interface FilteredDataItem {
    id: number;
    date: string; // ISO date string
    ageGroup: string;
    gender: string;
    featureA: number;
    featureB: number;
    featureC: number;
    featureD: number;
    featureE: number;
    featureF: number;
  }
  