// เก็บเฉพาะ Interface เท่านั้น

// ข้อมูลหลัก (ใช้ในหน้าตาราง)
export interface CustomerData {
  id: number;
  type: string;
  code: string;
  name: string;
  phone: string;
}

// ข้อมูลรายละเอียด (ใช้ในหน้า Detail)
export interface CustomerDetail {
  customerId: number;
  branchType: 'head' | 'branch';
  address: string;
  taxId: string;
  email?: string;
}

// แบบรวมร่าง (Optional: เผื่อใช้เวลาดึงข้อมูลมาครบแล้ว)
export interface CustomerFullInfo extends CustomerData, Omit<CustomerDetail, 'customerId'> {}