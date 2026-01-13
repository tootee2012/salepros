import { CustomerData, CustomerDetail } from '@/types';

export const mockCustomerData: CustomerData[] = [
  { id: 1, type: 'นิติบุคคล', code: 'CUST-6811-0001', name: 'บริษัท เอ็มจีเอฟเน็ตเวิร์ก จำกัด', phone: '089-2568745' },
  { id: 2, type: 'นิติบุคคล', code: 'CUST-6811-0002', name: 'บริษัท เอพีพี จำกัด', phone: '089-2568745' },
  { id: 3, type: 'นิติบุคคล', code: 'CUST-6811-0003', name: 'บริษัท เกษตรไทยบางแค จำกัด', phone: '089-2568745' },
  { id: 4, type: 'นิติบุคคล', code: 'CUST-6811-0004', name: 'บริษัท บิ๊กซี จำกัด', phone: '089-2568745' },
  { id: 5, type: 'นิติบุคคล', code: 'CUST-6811-0005', name: 'บริษัท โลตัส จำกัด', phone: '089-2568745' },
  { id: 6, type: 'บุคคลธรรมดา', code: 'CUST-6811-0006', name: 'นายสมชาย บุญมาก', phone: '089-2568745' },
  { id: 7, type: 'บุคคลธรรมดา', code: 'CUST-6811-0007', name: 'นายธวัชชัย สุนทร', phone: '089-2568745' },
  { id: 8, type: 'บุคคลธรรมดา', code: 'CUST-6811-0008', name: 'นางสาวจิรภิญญา ปัญญา', phone: '089-2568745' },
  { id: 9, type: 'บุคคลธรรมดา', code: 'CUST-6811-0009', name: 'นางสาววรรณพรรณ มาเกิด', phone: '089-2568745' },
  { id: 10, type: 'บุคคลธรรมดา', code: 'CUST-6811-0010', name: 'นายประพาส บุญเป็ง', phone: '089-2568740' },
  { id: 11, type: 'บุคคลธรรมดา', code: 'CUST-6811-0011', name: 'นายทดสอบ ระบบ', phone: '089-1111111' },
  { id: 12, type: 'บุคคลธรรมดา', code: 'CUST-6811-0012', name: 'นายทดสอบ สอง', phone: '089-2222222' },
];

// 4. Mock Data: ข้อมูลรายละเอียด (แยกออกมาและเชื่อมด้วย customerId)
export const mockCustomerDetails: CustomerDetail[] = [
  { 
    customerId: 1, 
    branchType: 'head', 
    address: '123 อาคารเอ็มจีเอฟ ถนนรัชดาภิเษก แขวงดินแดง เขตดินแดง กทม. 10400', 
    taxId: '0105558000001',
    email: 'contact@mgf.co.th'
  },
  { 
    customerId: 2, 
    branchType: 'head', 
    address: '88/9 หมู่ 4 ถนนบางนา-ตราด ต.บางแก้ว อ.บางพลี จ.สมุทรปราการ 10540', 
    taxId: '0105558000002',
    email: 'info@app.co.th'
  },
  { 
    customerId: 3, 
    branchType: 'branch', 
    address: '55 ถนนเพชรเกษม แขวงบางแคเหนือ เขตบางแค กทม. 10160', 
    taxId: '0105558000003',
    email: 'sales@kasetthai.com'
  },
  { 
    customerId: 4, 
    branchType: 'head', 
    address: '99 ถนนราชดำริ แขวงลุมพินี เขตปทุมวัน กทม. 10330', 
    taxId: '0105558000004',
    email: 'service@bigc.co.th'
  },
  { 
    customerId: 5, 
    branchType: 'branch', 
    address: '111 ถนนสุขุมวิท 50 แขวงพระโขนง เขตคลองเตย กทม. 10110', 
    taxId: '0105558000005',
    email: 'contact@lotus.com'
  },
  { 
    customerId: 6, 
    branchType: 'head', // บุคคลธรรมดามักใช้ที่อยู่ตามทะเบียนบ้าน (นับเป็น Head)
    address: '45 หมู่ 3 ต.แม่เหียะ อ.เมือง จ.เชียงใหม่ 50100', 
    taxId: '1509900123456', // เลขบัตรประชาชน
    email: 'somchai.b@gmail.com'
  },
  { 
    customerId: 7, 
    branchType: 'head', 
    address: '22 ซอย 5 ถนนนิมมานเหมินท์ ต.สุเทพ อ.เมือง จ.เชียงใหม่ 50200', 
    taxId: '1509900987654',
    email: 'thawatchai@hotmail.com'
  },
  { 
    customerId: 8, 
    branchType: 'head', 
    address: '100/2 ถนนช้างคลาน ต.ช้างคลาน อ.เมือง จ.เชียงใหม่ 50100', 
    taxId: '1509900555555',
    email: 'jirapinya@yahoo.com'
  },
  { 
    customerId: 9, 
    branchType: 'head', 
    address: '78 หมู่บ้านจัดสรร ต.สันทรายน้อย อ.สันทราย จ.เชียงใหม่ 50210', 
    taxId: '1509900444444',
    email: 'wannapan@gmail.com'
  },
  { 
    customerId: 10, 
    branchType: 'head', 
    address: '999 ถนนซุปเปอร์ไฮเวย์ ต.ฟ้าฮ่าม อ.เมือง จ.เชียงใหม่ 50000', 
    taxId: '1509900333333',
    email: 'prapas.b@gmail.com'
  },
  { 
    customerId: 11, 
    branchType: 'head', 
    address: '123/456 ถนนทดสอบ แขวงทดสอบ เขตทดสอบ กทม. 10000', 
    taxId: '1111111111111',
    email: 'test1@test.com'
  },
  { 
    customerId: 12, 
    branchType: 'head', 
    address: '789/000 ถนนตัวอย่าง ต.ตัวอย่าง อ.ตัวอย่าง จ.ตัวอย่าง 20000', 
    taxId: '2222222222222',
    email: 'test2@test.com'
  }
];