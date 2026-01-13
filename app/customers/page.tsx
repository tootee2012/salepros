'use client';

import React from 'react';
import Link from 'next/link';
import {
  Box,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TablePagination,
  Divider,
  CssBaseline
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Sidebar from '../../components/Sidebar';
import { mockCustomerData  } from '@/lib/mockData';
import { useRouter } from 'next/navigation';

const theme = createTheme({
  typography: {
    fontFamily: '"Kanit", "Inter", sans-serif',
  },
  palette: {
    background: {
      default: '#f5f5f5',
    },
  }
});


const rows = mockCustomerData

export default function CustomerListPage() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const router = useRouter();

  return (
    <Sidebar>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Box sx={{ 
            bgcolor: '#ffffff', 
            height: '100vh', 
            display: 'flex', 
            flexDirection: 'column', 
            overflow: 'hidden' 
        }}>

          <Box sx={{ 
              p: 3, 
              bgcolor: '#ffffff', 
              flexGrow: 1, 
              display: 'flex', 
              flexDirection: 'column',
              overflow: 'hidden'
          }}>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexShrink: 0 }}>
              <Typography variant="h5" fontWeight="bold">
                ข้อมูลลูกค้า
              </Typography>
              <Button 
                variant="contained" 
                onClick={() => router.push('/register')}
                sx={{ 
                  bgcolor: '#1976d2',
                  '&:hover': { bgcolor: '#1565c0' },
                  textTransform: 'none',
                  fontWeight: 500
                }}
              >
                ลงทะเบียน
              </Button>
            </Box>

            {/* Layout Container: เปลี่ยนจาก Grid เป็น Flexbox */}
            <Box sx={{ display: 'flex', gap: 3, flexGrow: 1, overflow: 'hidden' }}>
              
              {/* --- Left Column: Filters (Fixed Width) --- */}
              {/* กำหนดความกว้างตายตัวที่ 280px เพื่อไม่ให้กินที่ตาราง */}
              <Paper elevation={0} sx={{ 
                  width: 280, 
                  flexShrink: 0, // ห้ามหด
                  p: 3, 
                  border: '1px solid #e0e0e0', 
                  borderRadius: 2, 
                  bgcolor: '#fff',
                  height: '100%', 
                  overflowY: 'auto'
              }}>
                <Box sx={{ mb: 3 }}>
                  <TextField 
                    fullWidth 
                    size="small" 
                    placeholder="ค้นหา" 
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search fontSize="small" color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                <Divider sx={{ mb: 3 }} />
                
                {/* Filters Content */}

                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ mb: 1.5, fontWeight: 600 }}>ประเภทบุคคล</Typography>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox size="small" defaultChecked />} label={<Typography variant="body2">นิติบุคคล</Typography>} />
                    <FormControlLabel control={<Checkbox size="small" defaultChecked />} label={<Typography variant="body2">บุคคลธรรมดา</Typography>} />
                  </FormGroup>
                </Box>
                <Divider sx={{ mb: 3 }} />
                <Box>
                  <Typography variant="body2" sx={{ mb: 1.5, fontWeight: 600 }}>สาขา / ออฟฟิศ</Typography>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox size="small" />} label={<Typography variant="body2">เชียงใหม่</Typography>} />
                    <FormControlLabel control={<Checkbox size="small" />} label={<Typography variant="body2">ลำพูน</Typography>} />
                    <FormControlLabel control={<Checkbox size="small" />} label={<Typography variant="body2">ลำปาง</Typography>} />
                    <FormControlLabel control={<Checkbox size="small" />} label={<Typography variant="body2">กรุงเทพฯ</Typography>} />
                  </FormGroup>
                </Box>
              </Paper>

              {/* --- Right Column: Table (Flex Grow) --- */}
              {/* ใช้ flexGrow: 1 เพื่อให้ยืดเต็มพื้นที่ที่เหลือทั้งหมด */}
              <Paper elevation={0} sx={{ 
                  flexGrow: 1,
                  bgcolor: '#fff', 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  border: '1px solid #e0e0e0', 
                  borderRadius: 2,
                  overflow: 'hidden'
              }}>
                
                <TableContainer sx={{ flexGrow: 1, overflow: 'auto' }}>
                  <Table stickyHeader> 
                    <TableHead>
                      <TableRow>
                        {/* ปรับ % ให้เหมาะสม (Name ให้เยอะสุด) */}
                        <TableCell sx={{ fontWeight: 600, bgcolor: '#fafafa', width: '10%' }}>ลำดับ</TableCell>
                        <TableCell sx={{ fontWeight: 600, bgcolor: '#fafafa', width: '15%' }}>ประเภท</TableCell>
                        <TableCell sx={{ fontWeight: 600, bgcolor: '#fafafa', width: '25%' }}>รหัสลูกค้า</TableCell>
                        <TableCell sx={{ fontWeight: 600, bgcolor: '#fafafa', width: '30%' }}>ชื่อลูกค้า</TableCell>
                        <TableCell sx={{ fontWeight: 600, bgcolor: '#fafafa', width: '20%' }}>เบอร์โทร</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => (
                          <TableRow key={row.id} hover sx={{ cursor: 'pointer' }}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>
                              <Box sx={{ 
                                bgcolor: '#e8f5e9', 
                                color: '#2e7d32',
                                px: 1.5, py: 0.5, borderRadius: 1, 
                                display: 'inline-block', fontSize: '0.75rem', fontWeight: 500
                              }}>
                                {row.type}
                              </Box>
                            </TableCell>  
                            <TableCell>
                              <Link 
                                href={`/customerdetails/${row.id}`}
                                style={{ 
                                  color: '#1976d2', 
                                  textDecoration: 'none',
                                  fontWeight: 500
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                                onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                              >
                                {row.code}
                              </Link>
                            </TableCell>
                            <TableCell sx={{ fontWeight: 500 }}>{row.name}</TableCell>
                            <TableCell sx={{ color: '#666' }}>{row.phone}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 50, 100]}
                  component="div"
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  labelRowsPerPage="แสดงต่อหน้า:"
                  labelDisplayedRows={({ from, to, count }) => `${from}-${to} จาก ${count}`}
                  sx={{ 
                    borderTop: '1px solid #e0e0e0',
                    flexShrink: 0
                  }}
                />
                

              </Paper>

            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </Sidebar>
  );
}