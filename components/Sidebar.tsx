'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Paper,
  Button, // เพิ่ม Button
  Stack   // เพิ่ม Stack เพื่อจัดเรียง
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  Person,
  Menu as MenuIcon,
  ExpandMore,
  ExitToApp,      // ไอคอนออกจากระบบ
  DesktopWindows, // ไอคอนเปลี่ยนสาขา (จำลอง)
  LockReset,      // ไอคอนแก้รหัสผ่าน (จำลอง)
  Storage         // ไอคอน DB (จำลอง)
} from '@mui/icons-material';

// --- Theme Config ---
const primaryRed = '#D32F2F'; 
const sidebarBackgroundColor = primaryRed;

const theme = createTheme({
  typography: {
    fontFamily: '"Kanit", "Inter", sans-serif',
  },
  palette: {
    background: {
      default: '#f5f5f5',
    },
    primary: {
      main: primaryRed,
    },
    text: {
      primary: '#333333',
      secondary: '#666666'
    }
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          paddingTop: 8,
          paddingBottom: 8,
          '&.Mui-selected': {
            backgroundColor: '#fff', 
            color: primaryRed, 
            fontWeight: 'bold',
             borderLeft: `4px solid ${primaryRed}`,
            '&:hover': {
              backgroundColor: '#f9f9f9',
            },
            '& .MuiListItemIcon-root': {
                color: primaryRed,
            },
            '& .MuiTypography-root': {
                fontWeight: 600,
            }
          },
          '&:hover': {
             backgroundColor: '#f0f0f0',
          }
        }
      }
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                borderRadius: 0, 
                boxShadow: 'none', 
                border: '1px solid #eee' 
            }
        }
    },
    // เพิ่ม Default Style ของปุ่ม
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // ไม่ให้ตัวหนังสือเป็นตัวใหญ่ทั้งหมด
          fontFamily: '"Kanit", sans-serif',
        }
      }
    }
  }
});

const drawerWidth = 280; 

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const getActiveMenu = () => {
    if (pathname === '/register') return 'register';
    if (pathname?.startsWith('/customers')) return 'customer_data';
    return '';
  };

  const activeMenu = getActiveMenu();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  // Component ย่อยสำหรับกรอบเมนู
  const MenuPanel = () => (
    <Paper sx={{ bgcolor: '#fff', overflow: 'hidden' }}>
        <Box sx={{ 
            px: 2, 
            py: 1.5, 
            bgcolor: '#f9f9f9', 
            borderBottom: '1px solid #eee',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
             <Typography variant="subtitle2" fontWeight="bold" color="text.primary">
                เกี่ยวกับลูกค้า
            </Typography>
             <ExpandMore fontSize="small" color="action" />
        </Box>
       
        <List disablePadding>
            <ListItem disablePadding>
                <ListItemButton 
                    selected={activeMenu === 'register'}
                    onClick={() => handleNavigate('/register')}
                    sx={{ pl: 4 }} 
                >
                    <ListItemText primary="ลงทะเบียน" primaryTypographyProps={{ fontSize: '0.9rem' }} />
                </ListItemButton>
            </ListItem>
             <ListItem disablePadding>
                <ListItemButton 
                    selected={activeMenu === 'customer_data'}
                    onClick={() => handleNavigate('/customers')}
                    sx={{ pl: 2, borderTop: '1px solid #f0f0f0' }}
                >
                    <ListItemText primary="ข้อมูลลูกค้า" primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 500 }} />
                </ListItemButton>
            </ListItem>
        </List>
    </Paper>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        {/* --- Sidebar สีแดง --- */}
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { 
                width: drawerWidth, 
                boxSizing: 'border-box',
                backgroundColor: sidebarBackgroundColor, 
                borderRight: 'none', 
                color: '#fff'
            },
          }}
        >
            <Box sx={{ 
                height: 64, 
                display: 'flex', 
                alignItems: 'center', 
                px: 2,
                color: '#fff',
                borderBottom: '1px solid rgba(255,255,255,0.1)' 
            }}>
                <MenuIcon sx={{ mr: 2 }} />
                <Typography variant="h6" fontWeight="bold" noWrap style={{ letterSpacing: '1px' }}>
                    NIM LEASING
                </Typography>
            </Box>

            <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
                {/* 2. กรอบข้อมูลผู้ใช้ (Placeholder ตามโค้ดเดิม) */}
                
                {/* 3. กรอบเมนู */}
                <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                   <MenuPanel />
                </Box>
            </Box>
        </Drawer>

        {/* --- Main Content Area --- */}
        <Box component="main" sx={{ flexGrow: 1, p: 0, minHeight: '100vh', bgcolor: '#f5f5f5', display: 'flex', flexDirection: 'column' }}>
             
             {/* === Top Bar แก้ไขตรงนี้ครับ === */}
             <Box sx={{ 
                 height: 64, 
                 bgcolor: '#2C3E50', // สีน้ำเงินเข้ม
                 width: '100%', 
                 color: 'white', 
                 display: 'flex', 
                 alignItems: 'center', 
                 px: 3,
                 justifyContent: 'space-between',
                 boxShadow: 1
             }}>
                
                {/* ส่วนซ้าย: เพิ่มขนาดตัวหนังสือ */}
                <Box display="flex" alignItems="center">
                    <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                        จัดการสินทรัพย์
                    </Typography>
                </Box>

                {/* ส่วนขวา: ปรับปุ่มและไอคอน */}
                <Stack direction="row" spacing={1} alignItems="center">
                    {/* เมนูย่อยๆ แบบมีไอคอน */}
                    <Button 
                        startIcon={<DesktopWindows fontSize="small" />} 
                        sx={{ color: 'white', fontWeight: 300, fontSize: '0.85rem' }}
                    >
                        เปลี่ยนสาขา
                    </Button>
                    <Typography variant="caption" color="rgba(255,255,255,0.3)">|</Typography>
                    
                    <Button 
                        startIcon={<LockReset fontSize="small" />} 
                        sx={{ color: 'white', fontWeight: 300, fontSize: '0.85rem' }}
                    >
                        แก้ไขรหัสผ่าน
                    </Button>
                    <Typography variant="caption" color="rgba(255,255,255,0.3)">|</Typography>

                    <Button 
                        startIcon={<Storage fontSize="small" />} 
                        sx={{ color: 'white', fontWeight: 300, fontSize: '0.85rem', mr: 2 }}
                    >
                        DB_125
                    </Button>

                    {/* ปุ่มออกจากระบบ สีแดงเด่นๆ */}
                    <Button 
                        variant="contained" 
                        color="error"
                        startIcon={<ExitToApp />}
                        onClick={() => handleNavigate('/login')}
                        sx={{ 
                            bgcolor: '#D32F2F', 
                            '&:hover': { bgcolor: '#B71C1C' },
                            fontWeight: 'bold',
                            px: 2,
                            borderRadius: 1
                        }}
                    >
                        ออกจากระบบ
                    </Button> 
                </Stack>
             </Box>
             
             {/* Content จริง */}
             <Box sx={{ p: 3, flexGrow: 1, overflow: 'auto' }}>
                {children}
             </Box>
        </Box>

      </Box>
    </ThemeProvider>
  );
}