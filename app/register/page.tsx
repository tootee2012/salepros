'use client';

import React from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Select,
  MenuItem,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  CssBaseline,
  Divider
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Settings, Description, Language } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import Sidebar from '../../components/Sidebar';
import SidebarLayout from '../../components/Sidebar';

// --- Theme Setup ---
const theme = createTheme({
  typography: {
    fontFamily: '"Kanit", "Inter", sans-serif',
  },
  palette: {
    background: {
      default: '#f5f5f5',
    },
    text: {
      primary: '#333',
    }
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#fff',
            borderRadius: 4,
          }
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          borderRadius: 4,
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
          padding: '10px 32px',
          fontSize: '1rem',
        }
      }
    }
  }
});


export default function RegisterPage() {
  const [personType, setPersonType] = React.useState('person');
  const [branchType, setBranchType] = React.useState('head');
  const router = useRouter();

  

  return (
    <>
     <SidebarLayout >
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* --- Main Content Area --- */}
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', bgcolor: '#f5f5f5', minHeight: '100vh' }}>
        <Paper elevation={0} sx={{ 
            width: '100%', 
            maxWidth: '100%', 
            p: 5, 
            borderRadius: 2,
            border: '1px solid #e0e0e0',
            bgcolor: '#fafafa'
        }}>
            
            {/* Page Title */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h5" fontWeight="bold">
                    ลงทะเบียน
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button 
                        variant="outlined" 
                        sx={{ 
                            borderColor: '#ccc', 
                            color: '#666',
                            bgcolor: '#fff',
                            minWidth: '100px',
                            '&:hover': { bgcolor: '#f5f5f5', borderColor: '#999' }
                        }}
                    >
                        ยกเลิก
                    </Button>
                    <Button 
                        variant="contained" 
                        onClick={() => router.push('/customers')}
                        sx={{ 
                            bgcolor: '#1976d2',
                            color: 'white',
                            minWidth: '100px',
                            '&:hover': { bgcolor: '#1565c0' }
                        }}
                    >
                        บันทึก
                    </Button>
                </Box>
            </Box>

            {/* Form Section */}
            <Grid container spacing={3}>
                
                {/* Row 1: ประเภทบุคคล */}
                <Grid size={12}>
                    <Box sx={{ display: 'flex', gap: 4 }}>
                        <FormControl>
                            <RadioGroup
                                row
                                value={personType}
                                onChange={(e) => setPersonType(e.target.value)}
                            >
                                <FormControlLabel 
                                    value="juristic" 
                                    control={<Radio size="small" />} 
                                    label={<Typography variant="body2">นิติบุคคล</Typography>}
                                    sx={{ mr: 3 }} 
                                />
                                <FormControlLabel 
                                    value="person" 
                                    control={<Radio size="small" />} 
                                    label={<Typography variant="body2">บุคคลธรรมดา</Typography>}
                                />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                </Grid>

                {/* Row 2: คำนำหน้าชื่อ, ชื่อ, นามสกุล */}
                <Grid size={{ xs: 12, md: 2 }}>
                    <Select fullWidth defaultValue="" displayEmpty size="small">
                        <MenuItem value="">
                            <em style={{color: '#999'}}>คำนำหน้าชื่อ</em>
                        </MenuItem>
                        <MenuItem value="mr">นาย</MenuItem>
                        <MenuItem value="mrs">นาง</MenuItem>
                        <MenuItem value="ms">นางสาว</MenuItem>
                    </Select>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <TextField fullWidth size="small" placeholder='ชื่อ' />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}/>  

                {/* Row 4: ประเภทสำนักงาน */}
                <Grid size={12}>
                    <Box sx={{ display: 'flex', gap: 4 }}>
                        <FormControl>
                            <RadioGroup
                                row
                                value={branchType}
                                onChange={(e) => setBranchType(e.target.value)}
                            >
                                <FormControlLabel 
                                    value="head" 
                                    control={<Radio size="small" />} 
                                    label={<Typography variant="body2">สำนักงานใหญ่</Typography>}
                                    sx={{ mr: 3 }} 
                                />
                                <FormControlLabel 
                                    value="branch" 
                                    control={<Radio size="small" />} 
                                    label={<Typography variant="body2">สาขา</Typography>} 
                                  
                                />
                            </RadioGroup>
                            
                        </FormControl>
                    </Box>
                </Grid>

                {/* Row 5: ที่อยู่ */}
                <Grid size={{ xs: 12, md: 6}}>
                    <TextField fullWidth size="small" placeholder='ที่อยู่' />
                </Grid>
                <Grid size={{ xs: 12, md: 4}}/>

                {/* Row 6: แขวง/ตำบล, เขต/อำเภอ */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Select fullWidth defaultValue="" displayEmpty size="small">
                         <MenuItem value=""><em style={{color: '#999'}}>แขวง / ตำบล</em></MenuItem>
                         <MenuItem value="t1">ตำบล 1</MenuItem>
                    </Select>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Select fullWidth defaultValue="" displayEmpty size="small">
                         <MenuItem value=""><em style={{color: '#999'}}>เขต / อำเภอ</em></MenuItem>
                         <MenuItem value="a1">อำเภอ 1</MenuItem>
                    </Select>
                </Grid>

                {/* Row 7: จังหวัด, รหัสไปรษณีย์ */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Select fullWidth defaultValue="" displayEmpty size="small">
                         <MenuItem value=""><em style={{color: '#999'}}>จังหวัด</em></MenuItem>
                         <MenuItem value="p1">กรุงเทพมหานคร</MenuItem>
                    </Select>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} />
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField fullWidth size="small" placeholder='เลขที่บัตรประชาชน' />
                </Grid>

                {/* Row 8: ข้อมูลติดต่อ */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField fullWidth size="small" placeholder='เลขที่ผู้เสียภาษี' />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField fullWidth size="small" placeholder='เบอร์โทรศัพท์' />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField fullWidth size="small" placeholder='Email' />
                </Grid>

            </Grid>

        </Paper>
      </Box>

    </ThemeProvider>
    </SidebarLayout >
    </>
  );
}