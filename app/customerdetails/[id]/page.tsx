'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton
} from '@mui/material';
import { Edit, Close } from '@mui/icons-material';
import { mockCustomerData, mockCustomerDetails } from '@/lib/mockData';

interface CustomerDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function CustomerDetailPage({ params }: CustomerDetailPageProps) {
  const { id } = React.use(params);
  const [open, setOpen] = useState(false);
  
  // หาข้อมูลเดิม
  const customerBasic = mockCustomerData.find((c) => c.id === Number(id));
  const customerMoreInfo = mockCustomerDetails.find((d) => d.customerId === Number(id));

  // state สำหรับเก็บข้อมูลที่แก้ไข
  const [formData, setFormData] = useState({
    type: customerBasic?.type || 'นิติบุคคล',
    name: customerBasic?.name || '',
    branchType: (customerMoreInfo?.branchType || 'head') as 'head' | 'branch',
    address: customerMoreInfo?.address || '-',
    idCard: '1234567890123',
    taxId: customerMoreInfo?.taxId || '-',
    phone: customerBasic?.phone || '',
    email: customerMoreInfo?.email || '-'
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    // บันทึกข้อมูล (ในที่นี้แค่ปิด dialog)
    handleClose();
  };

  if (!customerBasic) {
    return <div className="p-10">ไม่พบข้อมูลลูกค้า</div>;
  }

  return (
    <>
      <Paper elevation={0} sx={{ 
        flexGrow: 1,
        p: 5, 
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        bgcolor: 'white' 
      }}>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            
            {/* 1. ประเภทบุคคล */}
            <Box sx={{ display: 'flex' }}>
                <Box sx={{ width: '30%', flexShrink: 0 }}>
                    <Typography variant="body1" color="text.secondary">ประเภทบุคคล</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                    <RadioGroup row value={formData.type === 'นิติบุคคล' ? 'juristic' : 'individual'}>
                        <FormControlLabel 
                            value="juristic" 
                            control={<Radio size="small" color="default" />} 
                            label="นิติบุคคล" 
                            sx={{ mr: 4 }}
                        />
                        <FormControlLabel 
                            value="individual" 
                            control={<Radio size="small" color="default" />} 
                            label="บุคคลธรรมดา" 
                        />
                    </RadioGroup>
                </Box>
            </Box>

            {/* 2. ชื่อ */}
            <Box sx={{ display: 'flex' }}>
                <Box sx={{ width: '30%', flexShrink: 0 }}>
                    <Typography variant="body1" color="text.secondary">ชื่อ</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" fontWeight={600}>{formData.name}</Typography>
                </Box>
            </Box>

            {/* 3. สำนักงาน */}
            <Box sx={{ display: 'flex' }}>
                <Box sx={{ width: '30%', flexShrink: 0 }}>
                    <Typography variant="body1" color="text.secondary">สำนักงาน</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                    <RadioGroup row value={formData.branchType}>
                        <FormControlLabel 
                            value="head" 
                            control={<Radio size="small" color="default" />} 
                            label="สำนักงานใหญ่" 
                            sx={{ mr: 4 }}
                        />
                        <FormControlLabel 
                            value="branch" 
                            control={<Radio size="small" color="default" />} 
                            label="สาขา" 
                        />
                    </RadioGroup>
                </Box>
            </Box>

            {/* 4. ที่อยู่ */}
            <Box sx={{ display: 'flex' }}>
                <Box sx={{ width: '30%', flexShrink: 0 }}>
                    <Typography variant="body1" color="text.secondary">ที่อยู่</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" sx={{ lineHeight: 1.6 }}>{formData.address}</Typography>
                </Box>
            </Box>

            {/* 5. เลขที่บัตรประชาชน */}
            <Box sx={{ display: 'flex' }}>
                <Box sx={{ width: '30%', flexShrink: 0 }}>
                    <Typography variant="body1" color="text.secondary">เลขที่บัตรประชาชน</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="body1">{formData.idCard}</Typography>
                </Box>
            </Box>

            {/* 6. เลขประจำตัวผู้เสียภาษี */}
            <Box sx={{ display: 'flex' }}>
                <Box sx={{ width: '30%', flexShrink: 0 }}>
                    <Typography variant="body1" color="text.secondary">เลขประจำตัวผู้เสียภาษี</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="body1">{formData.taxId}</Typography>
                </Box>
            </Box>

            {/* 7. เบอร์โทรศัพท์ */}
            <Box sx={{ display: 'flex' }}>
                <Box sx={{ width: '30%', flexShrink: 0 }}>
                    <Typography variant="body1" color="text.secondary">เบอร์โทรศัพท์</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="body1">{formData.phone}</Typography>
                </Box>
            </Box>

            {/* 8. Email */}
            <Box sx={{ display: 'flex' }}>
                <Box sx={{ width: '30%', flexShrink: 0 }}>
                    <Typography variant="body1" color="text.secondary">Email</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="body1">{formData.email}</Typography>
                </Box>
            </Box>

        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 6 }}>
            <Button 
                variant="outlined" 
                startIcon={<Edit />}
                onClick={handleClickOpen}
                sx={{ 
                    borderColor: '#e0e0e0', 
                    color: 'text.primary', 
                    textTransform: 'none', 
                    px: 4, 
                    py: 1, 
                    borderRadius: 2, 
                    '&:hover': { borderColor: '#bdbdbd', bgcolor: '#f5f5f5' }   
                }}
            >
                แก้ไข
            </Button>
        </Box>

      </Paper>

      {/* Dialog แก้ไขข้อมูล */}
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
          <Typography variant="h6" fontWeight="bold" fontSize="1rem">
            แก้ไขข้อมูลลูกค้า
          </Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ p: 3 }}>
          <Box component="form" sx={{ mt: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              
              {/* ประเภทบุคคล */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '200px', flexShrink: 0 }}>
                  <Typography variant="body2" color="text.secondary">ประเภทบุคคล</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <RadioGroup 
                    row 
                    value={formData.type === 'นิติบุคคล' ? 'juristic' : 'individual'}
                    onChange={(e) => setFormData({...formData, type: e.target.value === 'juristic' ? 'นิติบุคคล' : 'บุคคลธรรมดา'})}
                  >
                    <FormControlLabel 
                      value="juristic" 
                      control={<Radio size="small" />} 
                      label="นิติบุคคล" 
                      sx={{ mr: 4 }}
                    />
                    <FormControlLabel 
                      value="individual" 
                      control={<Radio size="small" />} 
                      label="บุคคลธรรมดา" 
                    />
                  </RadioGroup>
                </Box>
              </Box>

              {/* ชื่อ */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '200px', flexShrink: 0 }}>
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

              {/* สำนักงาน */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '200px', flexShrink: 0 }}>
                  <Typography variant="body2" color="text.secondary">สำนักงาน</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <RadioGroup 
                    row 
                    value={formData.branchType}
                    onChange={(e) => setFormData({...formData, branchType: e.target.value as 'head' | 'branch'})}
                  >
                    <FormControlLabel 
                      value="head" 
                      control={<Radio size="small" />} 
                      label="สำนักงานใหญ่" 
                      sx={{ mr: 4 }}
                    />
                    <FormControlLabel 
                      value="branch" 
                      control={<Radio size="small" />} 
                      label="สาขา" 
                    />
                  </RadioGroup>
                </Box>
              </Box>

              {/* ที่อยู่ */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Box sx={{ width: '200px', flexShrink: 0, pt: 1 }}>
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

              {/* เลขที่บัตรประชาชน */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '200px', flexShrink: 0 }}>
                  <Typography variant="body2" color="text.secondary">เลขที่บัตรประชาชน</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <TextField 
                    fullWidth 
                    size="small" 
                    value={formData.idCard}
                    onChange={(e) => setFormData({...formData, idCard: e.target.value})}
                  />
                </Box>
              </Box>

              {/* เลขประจำตัวผู้เสียภาษี */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '200px', flexShrink: 0 }}>
                  <Typography variant="body2" color="text.secondary">เลขประจำตัวผู้เสียภาษี</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <TextField 
                    fullWidth 
                    size="small" 
                    value={formData.taxId}
                    onChange={(e) => setFormData({...formData, taxId: e.target.value})}
                  />
                </Box>
              </Box>

              {/* เบอร์โทรศัพท์ */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '200px', flexShrink: 0 }}>
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

              {/* Email */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '200px', flexShrink: 0 }}>
                  <Typography variant="body2" color="text.secondary">Email</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <TextField 
                    fullWidth 
                    size="small" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
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
    </>
  );
}