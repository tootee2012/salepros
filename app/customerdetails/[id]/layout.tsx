'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import Sidebar from '@/components/Sidebar'; // แก้ path ให้ตรงกับ Sidebar หลักของคุณ
import DetailSideNav from '@/components/DetailSideNav'; // แก้ path ให้ตรง
import { mockCustomerData } from '@/lib/mockData'; // แก้ path ให้ตรง

export default function CustomerDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  
  // Unwrap params
  const { id } = React.use(params);

  // หาข้อมูลลูกค้าเพื่อแสดงชื่อบน Header
  const customer = mockCustomerData.find((c) => c.id === Number(id));

  // ถ้าหาไม่เจอ ให้แสดง null หรือ loading (อาจจะจัดการ error ใน page.tsx แทนได้)
  if (!customer) return <Sidebar><div>ไม่พบข้อมูล</div></Sidebar>;

  return (
    <Sidebar>
      <Box sx={{ bgcolor: '#ffffff', minHeight: '100vh', p: 4, display: 'flex', flexDirection: 'column' }}>
        
        {/* --- Header (ชื่อลูกค้า & ปุ่มย้อนกลับ) --- */}
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={() => router.push('/customers')}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h5" fontWeight="bold">
            {customer.name}
          </Typography>
        </Box>

        {/* --- Layout เนื้อหา (ซ้ายเมนู - ขวาเนื้อหา) --- */}
        <Box sx={{ display: 'flex', gap: 3, flexGrow: 1 }}>
          
          {/* ซ้าย: เมนูนำทาง (ส่ง basePath ไปเพื่อให้ Link ทำงานถูก) */}
          <DetailSideNav basePath={`/customerdetails/${id}`} />

          {/* ขวา: เนื้อหาที่จะเปลี่ยนไปตาม URL (page.tsx ของแต่ละหน้า) */}
          <Box sx={{ flexGrow: 1 }}>
            {children}
          </Box>

        </Box>
      </Box>
    </Sidebar>
  );
}