'use client';

import React, { useState } from 'react';
import {
  Paper,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
  Box
} from '@mui/material';
import { Add, Close, Edit } from '@mui/icons-material';

interface Partner {
  id: number;
  prefix: string;
  name: string;
  address: string;
  subdistrict: string;
  district: string;
  province: string;
  postalCode: string;
  phone: string;
  fax: string;
}

export default function PartnerPage() {
  const [open, setOpen] = useState(false);
  const [addresses, setAddresses] = useState<Partner[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    prefix: '',
    name: '',
    address: '',
    subdistrict: '',
    district: '',
    province: '',
    postalCode: '',
    phone: '',
    fax: ''
  });

  const handleClickOpen = () => {
    setEditingId(null);
    setOpen(true);
  };

  const handleEdit = (addr: Partner) => {
    setEditingId(addr.id);
    setFormData({
      prefix: addr.prefix,
      name: addr.name,
      address: addr.address,
      subdistrict: addr.subdistrict,
      district: addr.district,
      province: addr.province,
      postalCode: addr.postalCode,
      phone: addr.phone,
      fax: addr.fax
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingId(null);
    setFormData({
      prefix: '',
      name: '',
      address: '',
      subdistrict: '',
      district: '',
      province: '',
      postalCode: '',
      phone: '',
      fax: ''
    });
  };

  const handleSave = () => {
    if (editingId !== null) {
      // แก้ไขข้อมูลเดิม
      setAddresses(addresses.map(addr => 
        addr.id === editingId 
          ? { ...addr, ...formData }
          : addr
      ));
    } else {
      // เพิ่มข้อมูลใหม่
      const newAddress: Partner = {
        id: Date.now(),
        ...formData
      };
      setAddresses([...addresses, newAddress]);
    }
    handleClose();
  };

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        flexGrow: 1,
        p: 5, 
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        bgcolor: 'white',
        minHeight: '600px',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      
      {/* กรณียังไม่มีข้อมูล - แสดงปุ่มกลางหน้าจอ */}
      {addresses.length === 0 ? (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          flex: 1 
        }}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleClickOpen}
            sx={{
              bgcolor: '#212121',
              color: 'white',
              py: 1.5,
              px: 4,
              fontSize: '1rem',
              textTransform: 'none',
              borderRadius: 1,
              '&:hover': { bgcolor: '#424242' }
            }}
          >
            เพิ่มข้อมูลคู่ค้า
          </Button>
        </Box>
      ) : (
        /* กรณีมีข้อมูล - แสดงรายการ */
        <>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {addresses.map((addr) => (
              <Box 
                key={addr.id}
                sx={{ 
                  p: 3, 
                  border: '1px solid #e0e0e0',
                  borderRadius: 2,
                  bgcolor: '#fafafa',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start'
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    {addr.prefix} {addr.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    ที่อยู่: {addr.address} ตำบล{addr.subdistrict} อำเภอ{addr.district} จังหวัด{addr.province}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    เบอร์โทรศัพท์: {addr.phone}
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleEdit(addr)}
                  sx={{ 
                    textTransform: 'none',
                    borderColor: '#e0e0e0',
                    color: 'text.primary',
                    justifyContent: 'center',
                  }}
                >
                  แก้ไข
                </Button>
              </Box>
            ))}
          </Box>

          {/* ปุ่มเพิ่ม ด้านล่าง */}
          <Box sx={{ display: 'flex', justifyContent: 'left', mt: 4 }}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleClickOpen}
              sx={{
                bgcolor: '#212121',
                color: 'white',
                py: 1.5,
                px: 4,
                fontSize: '1rem',
                textTransform: 'none',
                borderRadius: 1,
                '&:hover': { bgcolor: '#424242' }
              }}
            >
              เพิ่ม
            </Button>
          </Box>
        </>
      )}

      {/* Dialog เพิ่ม/แก้ไขที่อยู่ */}
      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth="md" 
        fullWidth
        PaperProps={{ sx: { borderRadius: 2 } }}
      >
        <DialogTitle sx={{ 
          m: 0, 
          p: 2, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          borderBottom: '1px solid #eee' 
        }}>
          <Typography component="div" fontWeight="bold" fontSize="1rem">
            {editingId ? 'แก้ไขข้อมูลคู่ค้า' : 'เพิ่มข้อมูลคู่ค้า'}
          </Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ p: 3 }}>
          <Box component="form" sx={{ mt: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '150px', flexShrink: 0 }}>
                  <Typography variant="body2" color="text.secondary">คำนำหน้าชื่อ</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <TextField
                    select
                    fullWidth
                    size="small"
                    value={formData.prefix}
                    onChange={(e) => setFormData({...formData, prefix: e.target.value})}
                    required
                    
                  >
                    <MenuItem value="">เลือกคำนำหน้าชื่อ</MenuItem>
                    <MenuItem value="นาย">นาย</MenuItem>
                    <MenuItem value="นางสาว">นางสาว</MenuItem>
                    <MenuItem value="นาง">นาง</MenuItem>
                    <MenuItem value="บริษัท">บริษัท</MenuItem>
                  </TextField>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '150px', flexShrink: 0 }}>
                  <Typography variant="body2" color="text.secondary">ชื่อ</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <TextField 
                    fullWidth 
                    size="small" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Box sx={{ width: '150px', flexShrink: 0, pt: 1 }}>
                  <Typography variant="body2" color="text.secondary">ที่อยู่</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <TextField 
                    fullWidth 
                    multiline
                    rows={3}
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '150px', flexShrink: 0 }}>
                  <Typography variant="body2" color="text.secondary">ตำบล/แขวง</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <TextField 
                    select 
                    fullWidth 
                    size="small" 
                    value={formData.subdistrict}
                    onChange={(e) => setFormData({...formData, subdistrict: e.target.value})}
                  >
                    <MenuItem value="">เลือก</MenuItem>
                    <MenuItem value="ตำบล1">ตำบล1</MenuItem>
                  </TextField>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '150px', flexShrink: 0 }}>
                  <Typography variant="body2" color="text.secondary">อำเภอ/เขต</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <TextField 
                    select 
                    fullWidth 
                    size="small" 
                    value={formData.district}
                    onChange={(e) => setFormData({...formData, district: e.target.value})}
                  >
                    <MenuItem value="">เลือก</MenuItem>
                    <MenuItem value="เมือง">เมือง</MenuItem>
                  </TextField>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '150px', flexShrink: 0 }}>
                  <Typography variant="body2" color="text.secondary">จังหวัด</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <TextField
                    select
                    fullWidth
                    size="small"
                    value={formData.province}
                    onChange={(e) => setFormData({...formData, province: e.target.value})}
                  >
                    <MenuItem value="">เลือก</MenuItem>
                    <MenuItem value="กรุงเทพฯ">กรุงเทพฯ</MenuItem>
                  </TextField>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '150px', flexShrink: 0 }}>
                  <Typography variant="body2" color="text.secondary">เบอร์โทรศัพท์</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <TextField 
                    fullWidth 
                    size="small" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </Box>
              </Box>
              
            </Box>
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ p: 3, pt: 0, justifyContent: 'flex-start' }}>
          <Button 
            onClick={handleSave} 
            variant="contained" 
            sx={{ 
              bgcolor: '#212121', 
              color: 'white',
              px: 3,
              textTransform: 'none',
              '&:hover': { bgcolor: '#424242' }
            }}  
          >
            บันทึก
          </Button>
          <Button 
            onClick={handleClose} 
            variant="text" 
            sx={{ 
              color: 'text.secondary',  
              textTransform: 'none'
            }}
          >
            ยกเลิก
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}