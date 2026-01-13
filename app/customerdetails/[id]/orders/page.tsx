'use client';

import React, { useState } from 'react';
import {
  Paper,
  Button,
  Typography,
  TextField,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  MenuItem,
  InputAdornment,
  Chip
} from '@mui/material';
import { Search, Clear } from '@mui/icons-material';

// --- Interfaces ---
interface Order {
  id: string;
  date: string;
  orderNumber: string;
  customer: string;
  sender: string;
  route: string;
  price: number;
  paymentMethod: string;
  paymentStatus: string;
}

export default function OrdersPage() {
  // --- State ---
  const [tabValue, setTabValue] = useState(0);
  const [startDate, setStartDate] = useState('02/11/2568');
  const [endDate, setEndDate] = useState('01/11/2568');
  const [stationNumber, setStationNumber] = useState('');
  const [origin, setOrigin] = useState('ทั้งหมด');
  const [destination, setDestination] = useState('ทั้งหมด');
  const [searchText, setSearchText] = useState('');

  // Mock Data
  const orders: Order[] = [
    {
      id: '1',
      date: '25/11/2568',
      orderNumber: '1125110214259',
      customer: 'คุณสมใจ ชำนะเนา',
      sender: 'บริษัท แจ้งฟ้าเซฟมาร์ท จำกัด',
      route: 'กรุงเทพมหานคร - สงขลา',
      price: 3000.00,
      paymentMethod: 'เก็บเงินปลายทาง',
      paymentStatus: 'ยังไม่ได้รับชำระ'
    },
    {
      id: '2',
      date: '20/11/2568',
      orderNumber: '1125110208126',
      customer: 'นายสมชาย บุญมีจิตต์',
      sender: 'บริษัท แจ้งฟ้าเซฟมาร์ท จำกัด',
      route: 'กรุงเทพมหานคร - เชียงใหม่',
      price: 150.00,
      paymentMethod: 'โอนผ่านทางธนาคาร',
      paymentStatus: 'ยังไม่ได้รับชำระ'
    },
    {
      id: '3',
      date: '16/11/2568',
      orderNumber: '1125110213641',
      customer: 'นายอรรถวัธย์ จำกัด',
      sender: 'บริษัท แจ้งฟ้าเซฟมาร์ท จำกัด',
      route: 'เชียงใหม่ - กรุงเทพมหานคร',
      price: 1500.00,
      paymentMethod: 'ชื่นท้ายตลาด',
      paymentStatus: 'ยังไม่ได้รับชำระ'
    },
    {
      id: '4',
      date: '02/11/2568',
      orderNumber: '1125110213474',
      customer: 'นางกนิษ ปิ่นเพ็ชรา',
      sender: 'บริษัท แจ้งฟ้าเซฟมาร์ท จำกัด',
      route: 'สงขลา - ภูเก็ต',
      price: 1700.00,
      paymentMethod: 'จ่ายโอนทางธนาคาร',
      paymentStatus: 'ชำระเงินแล้ว'
    },
    {
      id: '5',
      date: '31/10/2568',
      orderNumber: '1125110214266',
      customer: 'โครงการหนึ่ง จำกัด',
      sender: 'บริษัท แจ้งฟ้าเซฟมาร์ท จำกัด',
      route: 'ขอนแก่น - กรุงเทพมหานคร',
      price: 2350.00,
      paymentMethod: 'สุดท้ายจัดชนท่าง',
      paymentStatus: 'ชำระเงินแล้ว'
    }
  ];

  const originList = ['ทั้งหมด', 'กรุงเทพมหานคร', 'เชียงใหม่', 'ภูเก็ต', 'ขอนแก่น', 'สงขลา'];
  const destinationList = ['ทั้งหมด', 'กรุงเทพมหานคร', 'เชียงใหม่', 'ภูเก็ต', 'ขอนแก่น', 'สงขลา'];

  // --- Handlers ---
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleClear = () => {
    setStartDate('');
    setEndDate('');
    setStationNumber('');
    setOrigin('ทั้งหมด');
    setDestination('ทั้งหมด');
    setSearchText('');
  };

  // --- Render ---
  return (
    <Paper elevation={0} sx={{ flexGrow: 1, p: 3, border: '1px solid #e0e0e0', borderRadius: 2, bgcolor: 'white', minHeight: '600px', display: 'flex', flexDirection: 'column' }}>
    
      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="สั่งซื้อ" sx={{ textTransform: 'none', fontWeight: 600 }} />
          <Tab label="รับซื้อ" sx={{ textTransform: 'none', fontWeight: 600 }} />
        </Tabs>
      </Box>

      {/* Filter Section */}
      <Box sx={{ mb: 3, p: 2, bgcolor: '#fafafa', borderRadius: 1 }}>
        {/* บรรทัดที่ 1: วันที่ส่งของ, ผู้รับ/ผู้ส่ง, เลขที่ใบส่งของ */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" color="text.secondary" mb={0.5}>
              วันที่ส่งของ
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <TextField
                type="date"
                size="small"
                sx={{ flex: 1 }}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <Typography>-</Typography>
              <TextField
                type="date"
                size="small"
                sx={{ flex: 1 }}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Box>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" color="text.secondary" mb={0.5}>
              {tabValue === 0 ? 'ผู้รับ' : 'ผู้ส่ง'}
            </Typography>
            <TextField
              placeholder="ค้นหา"
              size="small"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" color="text.secondary" mb={0.5}>
              เลขที่ใบส่งของ
            </Typography>
            <TextField
              placeholder="ค้นหาเลขที่"
              size="small"
              fullWidth
              value={stationNumber}
              onChange={(e) => setStationNumber(e.target.value)}
            />
          </Box>
        </Box>

        {/* บรรทัดที่ 2: สถานะของ, สถานะการเงิน, ต้นทาง, ปลายทาง */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" color="text.secondary" mb={0.5}>
              สถานะของ
            </Typography>
            <TextField
              select
              size="small"
              fullWidth
              defaultValue="ทั้งหมด"
            >
              <MenuItem value="ทั้งหมด">ทั้งหมด</MenuItem>
              <MenuItem value="รอดำเนินการ">รอดำเนินการ</MenuItem>
              <MenuItem value="กำลังจัดส่ง">กำลังจัดส่ง</MenuItem>
              <MenuItem value="ส่งสำเร็จ">ส่งสำเร็จ</MenuItem>
            </TextField>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" color="text.secondary" mb={0.5}>
              สถานะการเงิน
            </Typography>
            <TextField
              select
              size="small"
              fullWidth
              defaultValue="ทั้งหมด"
            >
              <MenuItem value="ทั้งหมด">ทั้งหมด</MenuItem>
              <MenuItem value="ยังไม่ได้รับชำระ">ยังไม่ได้รับชำระ</MenuItem>
              <MenuItem value="ชำระเงินแล้ว">ชำระเงินแล้ว</MenuItem>
            </TextField>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" color="text.secondary" mb={0.5}>
              ต้นทาง
            </Typography>
            <TextField
              select
              size="small"
              fullWidth
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            >
              {originList.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" color="text.secondary" mb={0.5}>
              ปลายทาง
            </Typography>
            <TextField
              select
              size="small"
              fullWidth
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            >
              {destinationList.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Button
            variant="contained"
            size="medium"
            sx={{ bgcolor: '#1976d2', minWidth: '100px' }}
          >
            ค้นหา
          </Button>

          <Button
            variant="outlined"
            size="medium"
            startIcon={<Clear />}
            onClick={handleClear}
            sx={{ minWidth: '100px' }}
          >
            เคลียร์
          </Button>
        </Box>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #eee', borderRadius: 1 }}>
        <Table size="small">
          <TableHead sx={{ bgcolor: '#fafafa' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>ลำดับ</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>วันที่สร้าง</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>เลขที่ใบส่งของ</TableCell>
              {tabValue === 0 ? (
                <>
                  <TableCell sx={{ fontWeight: 600 }}>ผู้สั่ง</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>ผู้ส่ง</TableCell>
                </>
              ) : (
                <>
                  <TableCell sx={{ fontWeight: 600 }}>ผู้ส่ง</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>ผู้รับ</TableCell>
                </>
              )}
              <TableCell sx={{ fontWeight: 600 }}>ต้นทาง - ปลายทาง</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>ราคา</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>ชลายของ</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>สถานะชำระเงิน</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={order.id} hover sx={{ cursor: 'pointer', '&:hover': { bgcolor: '#f5f5f5' } }}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.orderNumber}</TableCell>
                {tabValue === 0 ? (
                  <>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.sender}</TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{order.sender}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                  </>
                )}
                <TableCell>{order.route}</TableCell>
                <TableCell>{order.price.toLocaleString('th-TH', { minimumFractionDigits: 2 })}</TableCell>
                <TableCell>{order.paymentMethod}</TableCell>
                <TableCell>
                  <Chip
                    label={order.paymentStatus}
                    size="small"
                    sx={{
                      bgcolor: order.paymentStatus === 'ชำระเงินแล้ว' ? '#e8f5e9' : '#fff3e0',
                      color: order.paymentStatus === 'ชำระเงินแล้ว' ? '#2e7d32' : '#e65100',
                      fontWeight: 500,
                      fontSize: '0.75rem'
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </Paper>
  );
}
