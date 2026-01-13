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
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { Add, Close } from '@mui/icons-material';

interface Product {
  id: number;
  productCode: string;
  productName: string;
  unit: string;
  productType: string;
  size: string;
  details: string;
}

export default function ProductPage() {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    productCode: '',
    productName: '',
    unit: '',
    productType: '',
    size: '',
    details: ''
  });

  const handleClickOpen = () => {
    setEditingId(null);
    setFormData({
      productCode: '',
      productName: '',
      unit: '',
      productType: '',
      size: '',
      details: ''
    });
    setOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData({
      productCode: product.productCode,
      productName: product.productName,
      unit: product.unit,
      productType: product.productType,
      size: product.size,
      details: product.details
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingId(null);
    setFormData({
      productCode: '',
      productName: '',
      unit: '',
      productType: '',
      size: '',
      details: ''
    });
  };

  const handleSave = () => {
    if (editingId !== null) {
      setProducts(products.map(product => 
        product.id === editingId 
          ? { ...product, ...formData }
          : product
      ));
    } else {
      const newProduct: Product = {
        id: Date.now(),
        ...formData
      };
      setProducts([...products, newProduct]);
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
      {products.length === 0 ? (
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
            เพิ่มรายการสินค้า
          </Button>
        </Box>
      ) : (
        <>
          {/* ปุ่มเพิ่ม ด้านบนขวา */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleClickOpen}
              sx={{
                bgcolor: '#212121',
                color: 'white',
                py: 1.5,
                px: 3,
                fontSize: '0.95rem',
                textTransform: 'none',
                borderRadius: 1,
                '&:hover': { bgcolor: '#424242' }
              }}
            >
              เพิ่มรายการสินค้า
            </Button>
          </Box>

          {/* ตาราง */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 600 }}>ลำดับ</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>รหัสสินค้า</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>ชื่อสินค้า</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>หน่วยสินค้า</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>ชนิด</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>หมายเหตุ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product, index) => (
                  <TableRow 
                    key={product.id}
                    sx={{ 
                      '&:hover': { bgcolor: '#f9f9f9' }
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Box
                        component="span"
                        onClick={() => handleEdit(product)}
                        sx={{ 
                          color: '#1976d2',
                          cursor: 'pointer',
                          fontWeight: 500,
                          '&:hover': { textDecoration: 'underline' }
                        }}
                      >
                        {product.productCode}
                      </Box>
                    </TableCell>
                    <TableCell>{product.productName}</TableCell>
                    <TableCell>{product.unit}</TableCell>
                    <TableCell>{product.productType}</TableCell>
                    <TableCell>{product.details}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {/* Dialog เพิ่ม/แก้ไขสินค้า */}
      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth="sm" 
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
            {editingId ? 'แก้ไขรายการสินค้า' : 'เพิ่มรายการสินค้า'}
          </Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ p: 3 }}>
          <Box component="form" sx={{ mt: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              
              <Box>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  รหัสสินค้า :
                </Typography>
                <TextField 
                  fullWidth 
                  size="small" 
                  value={formData.productCode}
                  onChange={(e) => setFormData({...formData, productCode: e.target.value})}
                />
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  ชื่อสินค้า :
                </Typography>
                <TextField 
                  fullWidth 
                  size="small" 
                  value={formData.productName}
                  onChange={(e) => setFormData({...formData, productName: e.target.value})}
                />
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  หน่วยสินค้า :
                </Typography>
                <TextField 
                  fullWidth 
                  size="small" 
                  value={formData.unit}
                  onChange={(e) => setFormData({...formData, unit: e.target.value})}
                />
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  ชนิดสินค้า :
                </Typography>
                <TextField
                  select
                  fullWidth
                  size="small"
                  value={formData.productType}
                  onChange={(e) => setFormData({...formData, productType: e.target.value})}
                >
                  <MenuItem value="">เลือกชนิดสินค้า</MenuItem>
                  <MenuItem value="A">A</MenuItem>
                  <MenuItem value="B">B</MenuItem>
                  <MenuItem value="C">C</MenuItem>
                  <MenuItem value="D">D</MenuItem>
                  <MenuItem value="E">E</MenuItem>
                  <MenuItem value="F">F</MenuItem>
                  <MenuItem value="G">G</MenuItem>
                  <MenuItem value="H">H</MenuItem>
                </TextField>
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  หมายเหตุ :
                </Typography>
                <TextField 
                  fullWidth 
                  size="small" 
                  value={formData.details}
                  onChange={(e) => setFormData({...formData, details: e.target.value})}
                />
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