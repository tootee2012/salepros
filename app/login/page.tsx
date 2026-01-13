'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Box, Paper, Typography, TextField, Button, 
  Checkbox, FormControlLabel, Container, CssBaseline
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// === 1. ปรับ Theme เป็นสีแดง (NIM Red) ===
const theme = createTheme({
  typography: {
    fontFamily: '"Kanit", "Inter", sans-serif',
  },
  palette: {
    primary: {
      main: '#D32F2F', // สีแดง
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': { 
            borderRadius: 8,
            backgroundColor: 'white',
          },
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        }
      }
    }
  }
});

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/register');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#f5f5f5',
          p: 2,
        }}>
        <Container maxWidth="md">
          <Paper elevation={8} sx={{
              borderRadius: 6,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              minHeight: '500px',
              bgcolor: '#fff', // เปลี่ยนพื้นหลัง Container เป็นขาว
            }}>
            
            {/* --- ส่วนซ้าย: Branding Panel (ลายเดิม แต่เปลี่ยนสี) --- */}
            <Box sx={{
                flex: { xs: 'none', md: '0 0 40%' },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                pt: 8,
                pb: 5,
                px: 5,
                // เปลี่ยน Gradient เป็น แดง-แดงเข้ม
                background: 'linear-gradient(135deg, #D32F2F 0%, #B71C1C 100%)',
                m: 2,
                borderRadius: 6, // ปรับขอบมนให้เท่าๆ กับ Paper ด้านนอก
                minHeight: { xs: '200px', md: 'auto' },
                position: 'relative',
                overflow: 'hidden',
              }}>
              
              {/* === ลายกราฟิกเดิม (ไม่แก้ตำแหน่ง/ขนาด) แก้แค่สี === */}

              {/* 1. วงกลมมุมบนขวา -> ใส่สีเหลืองจางๆ (Yellow Tint) */}
              <Box sx={{
                position: 'absolute',
                top: -100,
                right: -70,
                width: 200,
                height: 200,
                borderRadius: '47%',
                bgcolor: 'rgba(251, 192, 45, 0.2)', // สีเหลืองโปร่งแสง
              }} />

              {/* 2. สี่เหลี่ยมตรงกลางขวา -> ใส่สีขาวจางๆ */}
              <Box sx={{
                position: 'absolute',
                top: -100,
                right: -160,
                width: 500,
                height: 430,
                borderRadius: '20%',
                bgcolor: 'rgba(255, 255, 255, 0.1)', // สีขาวโปร่งแสง
              }} />
              
              {/* 3. วงกลมมุมล่างซ้าย -> ใส่สีน้ำเงินจางๆ (Blue Tint) */}
              <Box sx={{
                position: 'absolute',
                bottom: -250,
                left: -200,
                width: 350,
                height: 350,
                borderRadius: '25%',
                bgcolor: 'rgba(21, 101, 192, 0.2)', // สีน้ำเงินโปร่งแสง
              }} />
              
              
              {/* === Logo Icon (โครงสร้างเดิม เปลี่ยนสีเส้น) === */}
              <Box sx={{
                width: 120,
                height: 120,
                mb: 3,
                mt: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 1,
              }}>
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                  {/* เปลี่ยนเส้น (stroke) เป็นสีขาวเพื่อให้เห็นบนพื้นแดง */}
                  <circle cx="45" cy="60" r="35" stroke="#fff" strokeWidth="3" fill="none"/>
                  <line x1="45" y1="25" x2="45" y2="95" stroke="#fff" strokeWidth="3"/>
                  <line x1="10" y1="60" x2="80" y2="60" stroke="#fff" strokeWidth="3"/>
                  <ellipse cx="45" cy="60" rx="20" ry="35" stroke="#fff" strokeWidth="3" fill="none"/>
                  
                  {/* เปลี่ยนสี fill ด้านในเป็น เหลือง-น้ำเงิน */}
                  <rect x="65" y="45" width="30" height="35" rx="3" fill="#FBC02D" stroke="#fff" strokeWidth="2"/> {/* กล่องเหลือง */}
                  <rect x="70" y="50" width="6" height="8" fill="#1565C0"/> {/* ขีดน้ำเงิน */}
                  
                  <line x1="70" y1="62" x2="90" y2="62" stroke="#fff" strokeWidth="2"/>
                  <line x1="70" y1="66" x2="85" y2="66" stroke="#fff" strokeWidth="2"/>
                  <line x1="70" y1="70" x2="90" y2="70" stroke="#fff" strokeWidth="2"/>
                </svg>
              </Box>

              {/* Text */}
              <Box sx={{
                position: 'relative',
                zIndex: 1,
                textAlign: 'left',
                width: '100%',
                maxWidth: '280px',
              }}>
                <Typography 
                  variant="h3" 
                  sx={{ 
                    color: 'white', 
                    fontWeight: 700,
                    mb: 0.5,
                    textAlign: 'left',
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    lineHeight: 1.2,
                  }}
                >
                  NimSalesPro
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'rgba(255,255,255,0.9)', 
                    textAlign: 'left',
                    fontSize: '1rem',
                    fontWeight: 400,
                  }}
                >
                  www.nimtransport.com
                </Typography>
              </Box>
            </Box>

            {/* --- ส่วนขวา: Login Form (เหมือนเดิม เปลี่ยนสีปุ่ม/Checkbox) --- */}
            <Box sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                p: { xs: 4, md: 6 },
              }}>
              <Box component="form" noValidate onSubmit={handleLogin}>
                <Typography 
                  variant="h6" 
                  component="h2" 
                  fontWeight={700} 
                  sx={{ mb: 4, color: '#333', textAlign: 'left' }}
                >
                  LOGIN
                </Typography>

                <Typography variant="body2" sx={{ mb: 1, color: '#666' }}>
                  Username
                </Typography>
                <TextField 
                  margin="normal" 
                  required 
                  fullWidth 
                  id="username" 
                  name="username" 
                  autoComplete="username" 
                  autoFocus 
                  variant="outlined" 
                  sx={{ mb: 3, mt: 0 }}
                  size="small"
                />

                <Typography variant="body2" sx={{ mb: 1, color: '#666' }}>
                  Password
                </Typography>
                <TextField 
                  margin="normal" 
                  required 
                  fullWidth 
                  name="password" 
                  type="password" 
                  id="password" 
                  autoComplete="current-password" 
                  variant="outlined" 
                  sx={{ mb: 3, mt: 0 }}
                  size="small"
                />

                <FormControlLabel 
                  control={<Checkbox value="remember" sx={{ color: '#D32F2F', '&.Mui-checked': { color: '#D32F2F' } }} />} 
                  label={
                    <Typography variant="body2" color="#666">
                      Remember me
                    </Typography>
                  } 
                  sx={{ mb: 4 }} 
                />

                <Button 
                  type="submit" 
                  fullWidth 
                  variant="contained" 
                  size="large" 
                  sx={{ 
                    py: 1.5, 
                    fontSize: '1.1rem',
                    bgcolor: '#D32F2F', // ปุ่มแดง
                    color: '#fff',
                    '&:hover': {
                      bgcolor: '#B71C1C',
                    }
                  }}
                >
                  Login
                </Button>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}