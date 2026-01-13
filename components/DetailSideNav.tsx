'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Paper, Tabs, Tab } from '@mui/material';

interface DetailSideNavProps {
  basePath: string; // รับ path หลักมา เช่น "/customerdetails/1"
}

export default function DetailSideNav({ basePath }: DetailSideNavProps) {
  const pathname = usePathname(); // ดึง URL ปัจจุบัน

  // ฟังก์ชันคำนวณว่าตอนนี้ควรเลือก Tab ไหน โดยดูจาก URL
  const getActiveTab = () => {
    if (pathname === basePath) return 0; // หน้าแรก (ข้อมูลทั่วไป)
    if (pathname.includes('/shipping')) return 1;
    if (pathname.includes('/billaddress')) return 2;
    if (pathname.includes('/partner')) return 3;
    if (pathname.includes('/products')) return 4;
    if (pathname.includes('/price')) return 5;
    if (pathname.includes('/orders')) return 6;
    if (pathname.includes('/users')) return 7;
    return 0;
  };

  const currentTab = getActiveTab();

  return (
    <Paper elevation={0} sx={{ 
      width: 250, 
      flexShrink: 0,
      border: '1px solid #e0e0e0', 
      borderRadius: 2,
      bgcolor: 'white',
      p: 2,
      height: 'fit-content'
    }}>
      <Tabs 
        orientation="vertical"
        variant="scrollable"
        scrollButtons={false}
        value={currentTab} 
        sx={{
          '& .MuiTab-root': { 
            textTransform: 'none', 
            fontSize: '0.95rem',
            alignItems: 'flex-start',
            minHeight: 48,
            py: 1.5,
            textAlign: 'left'
          },
          '& .Mui-selected': { 
            fontWeight: 'bold', 
            color: 'black',
            bgcolor: '#f5f5f5',
            borderRadius: 1
          },
          '& .MuiTabs-indicator': { 
            backgroundColor: 'black',
            width: 3,
            left: 0 
          }
        }}
      >
        {/* ใช้ Link component เพื่อเปลี่ยนหน้าโดยไม่ต้องรีโหลด */}
        <Tab label="ข้อมูลทั่วไป" component={Link} href={`${basePath}`} />
        <Tab label="ที่อยู่ส่ง / รับของ" component={Link} href={`${basePath}/shipping`} />
        <Tab label="ที่อยู่วางบิล" component={Link} href={`${basePath}/billaddress`} />
        <Tab label="ข้อมูลคู่ค้า" component={Link} href={`${basePath}/partner`} />
        <Tab label="รายการสินค้า" component={Link} href={`${basePath}/products`} />
        <Tab label="ตั้งค่าราคาตกลง" component={Link} href={`${basePath}/price`} />
        <Tab label="ข้อมูลใบส่งของ" component={Link} href={`${basePath}/orders`} />
        <Tab label="ข้อมูลผู้ใช้" component={Link} href={`${basePath}/users`} />
      </Tabs>
    </Paper>
  );
}