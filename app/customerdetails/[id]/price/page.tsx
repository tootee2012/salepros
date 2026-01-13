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
  TableRow,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Checkbox
} from '@mui/material';
import { Add, Close, ArrowUpward, ArrowDownward, Edit, Delete } from '@mui/icons-material';

// --- Interfaces ---
interface Route {
  id: number;
  origin: string;
  destination: string;
}

interface PriceItem {
  id: number;
  routeId: number;
  criteria: string;
  price: number;
  note: string;
}

interface CriteriaConfig {
  value: string;
  label: string;
  active: boolean; // เพิ่มสถานะเปิด/ปิด
  range: string;
}

export default function PricePage() {
  // --- State ---
  const [routes, setRoutes] = useState<Route[]>([]);
  const [priceItems, setPriceItems] = useState<PriceItem[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  
  // Dialog States
  const [openRoute, setOpenRoute] = useState(false);
  const [openCriteria, setOpenCriteria] = useState(false);
  const [openPrice, setOpenPrice] = useState(false);
  
  const [editingRouteId, setEditingRouteId] = useState<number | null>(null);
  const [editingPriceId, setEditingPriceId] = useState<number | null>(null);
  const [selectedCriteriaIndex, setSelectedCriteriaIndex] = useState<number>(0);
  const [criteriaForm, setCriteriaForm] = useState({ label: '', range: '' });
  
  // Forms State
  const [routeForm, setRouteForm] = useState({ origin: '', destination: '' });
  const [priceForm, setPriceForm] = useState({ criteria: '', price: 0, note: '' });

  // Criteria State (จัดการ A, B, C, D)
  const [criteriaList, setCriteriaList] = useState<CriteriaConfig[]>([
    { value: 'A', label: 'A', active: true, range: '15*15*15 / ไม่เกิน 3 กก.' },
    { value: 'B', label: 'B', active: true, range: '20*20*20 / ไม่เกิน 5 กก.' },
    { value: 'C', label: 'C', active: true, range: '25*25*25 / ไม่เกิน 8 กก.' },
    { value: 'D', label: 'D', active: true, range: '30*30*30 / ไม่เกิน 10 กก.' }
  ]);

  // รายการต้นทางและปลายทาง
  const [originList, setOriginList] = useState<string[]>([
    'กรุงเทพมหานคร',
    'เชียงใหม่',
    'ภูเก็ต',
    'ขอนแก่น',
    'สงขลา'
  ]);

  const [destinationList, setDestinationList] = useState<string[]>([
    'กรุงเทพมหานคร',
    'เชียงใหม่',
    'ภูเก็ต',
    'ขอนแก่น',
    'สงขลา'
  ]);

  // --- Handlers ---

  // Helper function: คำนวณราคาเริ่มต้นตามขนาด
  const getDefaultPrice = (criteriaLabel: string): number => {
    const charCode = criteriaLabel.charCodeAt(0) - 65; // A=0, B=1, C=2, D=3, ...
    return 20 + (charCode * 5); // A=20, B=25, C=30, D=35, E=40, ...
  };

  // Route Handlers
  const handleOpenRoute = () => {
    setEditingRouteId(null);
    setRouteForm({ origin: '', destination: '' });
    setOpenRoute(true);
  };

  const handleCloseRoute = () => {
    setOpenRoute(false);
    setEditingRouteId(null);
  };

  const handleSaveRoute = () => {
    if (editingRouteId !== null) {
      setRoutes(routes.map(r => r.id === editingRouteId ? { ...r, ...routeForm } : r));
      if (selectedRoute?.id === editingRouteId) {
        setSelectedRoute({ ...selectedRoute, ...routeForm });
      }
    } else {
      const newRoute: Route = { id: Date.now(), ...routeForm };
      setRoutes([...routes, newRoute]);
      setSelectedRoute(newRoute);
      
      // สร้างรายการราคาสำหรับทุกขนาดที่ active
      const baseId = Date.now();
      const newPriceItems = criteriaList
        .filter(c => c.active)
        .map((c, index) => ({
          id: baseId + index,
          routeId: newRoute.id,
          criteria: c.label,
          price: getDefaultPrice(c.label),
          note: c.range
        }));
      setPriceItems([...priceItems, ...newPriceItems]);
    }
    handleCloseRoute();
  };

  const handleSelectRoute = (route: Route) => {
    setSelectedRoute(route);
  };

  // Criteria Handlers
  const handleOpenCriteria = () => {
    if (criteriaList.length > 0) {
      setSelectedCriteriaIndex(0);
      setCriteriaForm({ label: criteriaList[0].label, range: criteriaList[0].range });
    }
    setOpenCriteria(true);
  };
  
  const handleCloseCriteria = () => setOpenCriteria(false);
  
  const handleSelectCriteria = (index: number) => {
    setSelectedCriteriaIndex(index);
    setCriteriaForm({ label: criteriaList[index].label, range: criteriaList[index].range });
  };
  
  const handleUpdateCriteriaForm = (field: 'label' | 'range', value: string) => {
    setCriteriaForm({ ...criteriaForm, [field]: value });
  };

  const handleToggleCriteria = (index: number) => {
    const newList = [...criteriaList];
    const willBeActive = !newList[index].active;
    newList[index] = { ...newList[index], active: willBeActive };
    setCriteriaList(newList);
    
    const criteriaLabel = newList[index].label;
    
    if (willBeActive) {
      // เปิด criteria: เพิ่ม priceItems สำหรับทุก route ที่ไม่มีขนาดนี้
      const newPriceItems: PriceItem[] = [];
      routes.forEach(route => {
        const hasItem = priceItems.some(item => 
          item.routeId === route.id && item.criteria === criteriaLabel
        );
        if (!hasItem) {
          newPriceItems.push({
            id: Date.now() + Math.random(),
            routeId: route.id,
            criteria: criteriaLabel,
            price: getDefaultPrice(criteriaLabel),
            note: newList[index].range
          });
        }
      });
      if (newPriceItems.length > 0) {
        setPriceItems([...priceItems, ...newPriceItems]);
      }
    } else {
      // ปิด criteria: ลบ priceItems ที่เกี่ยวข้อง
      setPriceItems(priceItems.filter(item => item.criteria !== criteriaLabel));
    }
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newList = [...criteriaList];
    [newList[index - 1], newList[index]] = [newList[index], newList[index - 1]];
    setCriteriaList(newList);
    const newIndex = index - 1;
    setSelectedCriteriaIndex(newIndex);
    setCriteriaForm({ label: newList[newIndex].label, range: newList[newIndex].range });
  };

  const handleMoveDown = (index: number) => {
    if (index === criteriaList.length - 1) return;
    const newList = [...criteriaList];
    [newList[index], newList[index + 1]] = [newList[index + 1], newList[index]];
    setCriteriaList(newList);
    const newIndex = index + 1;
    setSelectedCriteriaIndex(newIndex);
    setCriteriaForm({ label: newList[newIndex].label, range: newList[newIndex].range });
  };

  const handleAddCriteria = () => {
    const newLabel = String.fromCharCode(65 + criteriaList.length);
    const newCriteria = { value: newLabel, label: newLabel, active: true, range: '' };
    setCriteriaList([...criteriaList, newCriteria]);
    setSelectedCriteriaIndex(criteriaList.length);
    setCriteriaForm({ label: newLabel, range: '' });
    
    // เพิ่ม priceItem สำหรับทุก route ที่มีอยู่
    if (routes.length > 0) {
      const newPriceItems = routes.map(route => ({
        id: Date.now() + Math.random(),
        routeId: route.id,
        criteria: newLabel,
        price: getDefaultPrice(newLabel),
        note: ''
      }));
      setPriceItems([...priceItems, ...newPriceItems]);
    }
  };

  const handleDeleteCriteria = () => {
    if (criteriaList.length <= 1) return;
    
    // เก็บ label ของ criteria ที่จะลบ
    const deletedLabel = criteriaList[selectedCriteriaIndex].label;
    
    // ลบ criteria จาก list
    const newList = criteriaList.filter((_, i) => i !== selectedCriteriaIndex);
    setCriteriaList(newList);
    
    // ลบ priceItems ที่มี criteria ตรงกับที่ลบ
    setPriceItems(priceItems.filter(item => item.criteria !== deletedLabel));
    
    const newIndex = Math.min(selectedCriteriaIndex, newList.length - 1);
    setSelectedCriteriaIndex(newIndex);
    if (newList.length > 0) {
      setCriteriaForm({ label: newList[newIndex].label, range: newList[newIndex].range });
    }
  };

  const handleSaveCriteria = () => {
    // บันทึกการเปลี่ยนแปลงจาก criteriaForm ไปยัง criteriaList
    const oldLabel = criteriaList[selectedCriteriaIndex].label;
    const newList = [...criteriaList];
    newList[selectedCriteriaIndex] = { 
      ...newList[selectedCriteriaIndex], 
      label: criteriaForm.label,
      range: criteriaForm.range 
    };
    setCriteriaList(newList);
    
    // อัปเดต criteria label และ note ของ priceItems ทั้งหมดที่ตรงกับ criteria นี้
    setPriceItems(priceItems.map(item => {
      if (item.criteria === oldLabel) {
        return { 
          ...item, 
          criteria: criteriaForm.label,
          note: criteriaForm.range 
        };
      }
      return item;
    }));
    handleCloseCriteria();
  };

  // Price Handlers
  const handleOpenPrice = () => {
    setEditingPriceId(null);
    setPriceForm({ criteria: '', price: 0, note: '' });
    setOpenPrice(true);
  };

  const handleEditPrice = (item: PriceItem) => {
    setEditingPriceId(item.id);
    setPriceForm({
      criteria: item.criteria,
      price: item.price,
      note: item.note
    });
    setOpenPrice(true);
  };

  const handleClosePrice = () => {
    setOpenPrice(false);
    setEditingPriceId(null);
  };

  const handleSavePrice = () => {
    if (!selectedRoute) return;

    if (editingPriceId !== null) {
      // Edit Mode: อัปเดตเฉพาะราคา (note ไม่ให้แก้ไข)
      setPriceItems(priceItems.map(item => 
        item.id === editingPriceId 
          ? { ...item, price: priceForm.price }
          : item
      ));
    } else {
      // Add Mode: เพิ่มใหม่
      const newPrice: PriceItem = { 
        id: Date.now(), 
        routeId: selectedRoute.id, 
        ...priceForm 
      };
      setPriceItems([...priceItems, newPrice]);
    }
    handleClosePrice();
  };

  const getRoutePrices = (routeId: number) => {
    const items = priceItems.filter(item => item.routeId === routeId);
    
    // เรียงลำดับตาม criteriaList
    return items.sort((a, b) => {
      const indexA = criteriaList.findIndex(c => c.label === a.criteria);
      const indexB = criteriaList.findIndex(c => c.label === b.criteria);
      return indexA - indexB;
    });
  };

  // --- Render ---

  if (routes.length === 0) {
    return (
      <Paper elevation={0} sx={{ flexGrow: 1, p: 5, border: '1px solid #e0e0e0', borderRadius: 2, bgcolor: 'white', minHeight: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleOpenRoute}
          sx={{ bgcolor: '#212121', color: 'white', py: 1.5, px: 4, fontSize: '1rem', textTransform: 'none', borderRadius: 1, '&:hover': { bgcolor: '#424242' } }}
        >
          เพิ่มราคาตกลง
        </Button>
        {renderRouteDialog()}
      </Paper>
    );
  }

  return (
    <Paper elevation={0} sx={{ flexGrow: 1, p: 3, border: '1px solid #e0e0e0', borderRadius: 2, bgcolor: 'white', minHeight: '600px', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header & Action Button */}
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="outlined" onClick={handleOpenCriteria} size="small" sx={{ borderColor: '#e0e0e0', color: '#212121', textTransform: 'none', '&:hover': { borderColor: '#bdbdbd', bgcolor: '#f5f5f5' } }}>
          กำหนดขนาด
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 3, flex: 1 }}>
        
        {/* --- Left Column: รายการเส้นทาง --- */}
        <Box sx={{ flex: '0 0 300px', display: 'flex', flexDirection: 'column', borderRight: '1px solid #eee', pr: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold" mb={2}>ต้นทาง - ปลายทาง</Typography>
          
          <List sx={{ flex: 1, overflowY: 'auto' }}>
            {routes.map((route) => (
              <ListItemButton
                key={route.id}
                selected={selectedRoute?.id === route.id}
                onClick={() => handleSelectRoute(route)}
                sx={{ borderRadius: 1, mb: 1, bgcolor: selectedRoute?.id === route.id ? '#f5f5f5' : 'transparent', '&.Mui-selected': { bgcolor: '#f0f0f0' } }}
              >
                <ListItemText 
                  primary={
                    <Box>
                      <Typography variant="body2" fontWeight={600}>ต้นทาง - {route.origin}</Typography>
                      <Typography variant="body2" fontWeight={600}>ปลายทาง -    {route.destination}</Typography>
                    </Box>
                  }
                />
              </ListItemButton>
            ))}
          </List>

          <Button variant="contained" fullWidth startIcon={<Add />} onClick={handleOpenRoute} sx={{ bgcolor: '#555', mt: 2, '&:hover': { bgcolor: '#333' } }}>
            เพิ่มเส้นทาง
          </Button>
        </Box>

        {/* --- Right Column: ตารางราคา --- */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {selectedRoute ? (
            <>
              <Typography component="div" fontWeight={600} fontSize="1.25rem" mb={2}>{selectedRoute.origin} → {selectedRoute.destination}</Typography>
              
              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #eee', borderRadius: 1, mb: 2 }}>
                <Table size="small">
                  <TableHead sx={{ bgcolor: '#fafafa' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>ลำดับ</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>ขนาด</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>ราคา</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>หมายเหตุ</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {getRoutePrices(selectedRoute.id).length > 0 ? (
                      getRoutePrices(selectedRoute.id).map((item, index) => (
                        <TableRow key={item.id} hover>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{item.criteria}</TableCell>
                          <TableCell>
                            <Box
                              component="span"
                              onClick={() => handleEditPrice(item)}
                              sx={{ 
                                color: '#1976d2',
                                cursor: 'pointer',
                                fontWeight: 500,
                                '&:hover': { textDecoration: 'underline' }
                              }}
                            >
                              {item.price.toFixed(2)}
                            </Box>
                          </TableCell>
                          <TableCell>{item.note}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} align="center" sx={{ py: 3, color: 'text.secondary' }}>ยังไม่มีข้อมูลราคา</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
              <Typography color="text.secondary">กรุณาเลือกเส้นทาง</Typography>
            </Box>
          )}
        </Box>

      </Box>

      {/* --- Dialogs --- */}
      {renderRouteDialog()}
      {renderCriteriaDialog()}
      {renderPriceDialog()}

    </Paper>
  );

  // --- Dialog Functions ---

  function renderRouteDialog() {
    return (
      <Dialog open={openRoute} onClose={handleCloseRoute} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 2 } }}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee' }}>
          <Typography fontWeight="bold">ต้นทาง - ปลายทาง</Typography>
          <IconButton onClick={handleCloseRoute}><Close /></IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField 
              select
              label="ต้นทาง" 
              fullWidth 
              size="small" 
              value={routeForm.origin} 
              onChange={(e) => setRouteForm({ ...routeForm, origin: e.target.value })}
            >
              <MenuItem value="">เลือกต้นทาง</MenuItem>
              {originList.map((origin) => (
                <MenuItem key={origin} value={origin}>{origin}</MenuItem>
              ))}
            </TextField>
            <TextField 
              select
              label="ปลายทาง" 
              fullWidth 
              size="small" 
              value={routeForm.destination} 
              onChange={(e) => setRouteForm({ ...routeForm, destination: e.target.value })}
            >
              <MenuItem value="">เลือกปลายทาง</MenuItem>
              {destinationList.map((destination) => (
                <MenuItem key={destination} value={destination}>{destination}</MenuItem>
              ))}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0, justifyContent: 'flex-end' }}>
          <Button onClick={handleCloseRoute} sx={{ color: 'text.secondary' }}>ยกเลิก</Button>
          <Button onClick={handleSaveRoute} variant="contained" sx={{ bgcolor: '#212121' }}>บันทึก</Button>
        </DialogActions>
      </Dialog>
    );
  }

  function renderCriteriaDialog() {
    const selectedCriteria = criteriaList[selectedCriteriaIndex];

    return (
      <Dialog open={openCriteria} onClose={handleCloseCriteria} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: 2 } }}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee' }}>
          <Typography fontWeight="bold">กำหนดขนาด</Typography>
          <IconButton onClick={handleCloseCriteria}><Close /></IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', gap: 3, minHeight: '400px' }}>
            
            {/* ฝั่งซ้าย: รายการขนาด */}
            <Box sx={{ flex: '0 0 200px', borderRight: '1px solid #eee', pr: 2 }}>
              <List sx={{ p: 0 }}>
                {criteriaList.map((c, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    {/* Checkbox */}
                    <Checkbox
                      checked={c.active}
                      onChange={() => handleToggleCriteria(index)}
                      size="small"
                      sx={{ p: 0 }}
                    />
                    
                    {/* ชื่อขนาด */}
                    <ListItemButton
                      selected={selectedCriteriaIndex === index}
                      onClick={() => handleSelectCriteria(index)}
                      sx={{ 
                        flex: 1, 
                        borderRadius: 1, 
                        py: 0.5,
                        minHeight: '32px',
                        '&.Mui-selected': { bgcolor: '#f0f0f0' }
                      }}
                    >
                      <Typography variant="body2" fontWeight={600}>{c.label}</Typography>
                    </ListItemButton>
                    
                    {/* ลูกศรขึ้น/ลง */}
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <IconButton 
                        size="small" 
                        onClick={() => handleMoveUp(index)}
                        disabled={index === 0}
                        sx={{ p: 0.25 }}
                      >
                        <ArrowUpward fontSize="small" />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={() => handleMoveDown(index)}
                        disabled={index === criteriaList.length - 1}
                        sx={{ p: 0.25 }}
                      >
                        <ArrowDownward fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
              </List>
              
              {/* ปุ่มเพิ่ม */}
              <Button
                variant="outlined"
                fullWidth
                size="small"
                onClick={handleAddCriteria}
                sx={{ mt: 2, textTransform: 'none' }}
              >
                เพิ่ม
              </Button>
            </Box>

            {/* ฝั่งขวา: รายละเอียดขนาด */}
            <Box sx={{ flex: 1 }}>
              {selectedCriteria ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {/* ขนาดสินค้า */}
                  <Box>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      ขนาดสินค้า :
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      value={criteriaForm.label}
                      onChange={(e) => handleUpdateCriteriaForm('label', e.target.value)}
                      disabled={!selectedCriteria.active}
                    />
                  </Box>

                  {/* หมายเหตุ */}
                  <Box>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      หมายเหตุ :
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      multiline
                      rows={3}
                      value={criteriaForm.range}
                      onChange={(e) => handleUpdateCriteriaForm('range', e.target.value)}
                      placeholder="ระบุรายละเอียดขนาด"
                      disabled={!selectedCriteria.active}
                    />
                  </Box>

                  {/* ปุ่มลบ */}
                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<Delete />}
                      onClick={handleDeleteCriteria}
                      disabled={criteriaList.length <= 1}
                      sx={{ textTransform: 'none' }}
                    >
                      ลบ
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <Typography color="text.secondary">เลือกขนาดเพื่อแก้ไข</Typography>
                </Box>
              )}
            </Box>

          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0, justifyContent: 'flex-end' }}>
          <Button onClick={handleCloseCriteria} sx={{ color: 'text.secondary', textTransform: 'none' }}>ยกเลิก</Button>
          <Button onClick={handleSaveCriteria} variant="contained" sx={{ bgcolor: '#212121', textTransform: 'none' }}>บันทึก</Button>
        </DialogActions>
      </Dialog>
    );
  }

  function renderPriceDialog() {
    const isEditMode = !!editingPriceId; // เช็คว่าเป็นโหมดแก้ไขหรือไม่

    return (
      <Dialog open={openPrice} onClose={handleClosePrice} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 2 } }}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee' }}>
          <Typography fontWeight="bold">{isEditMode ? 'แก้ไขราคา' : 'เพิ่มราคา'}</Typography>
          <IconButton onClick={handleClosePrice}><Close /></IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            
            {/* ขนาด - ปิดเมื่อแก้ไข */}
            <TextField 
              select 
              label="ขนาด" 
              fullWidth 
              size="small" 
              value={priceForm.criteria} 
              onChange={(e) => {
                const selectedCriteria = criteriaList.find(c => c.label === e.target.value);
                setPriceForm({ 
                  ...priceForm, 
                  criteria: e.target.value,
                  note: selectedCriteria?.range || ''
                });
              }}
              disabled={isEditMode}
            >
              <MenuItem value="">เลือกขนาด</MenuItem>
              {/* แสดงเฉพาะเกณฑ์ที่ Active */}
              {criteriaList.filter(c => c.active).map((c) => (
                <MenuItem key={c.value} value={c.label}>{c.label} {c.range && `(${c.range})`}</MenuItem>
              ))}
            </TextField>
            
            {/* ราคา - แก้ไขได้เสมอ */}
            <TextField 
              label="ราคา" 
              type="number" 
              fullWidth 
              size="small" 
              value={priceForm.price} 
              onChange={(e) => setPriceForm({ ...priceForm, price: parseFloat(e.target.value) || 0 })} 
            />
            
            {/* หมายเหตุ - แก้ไขได้เมื่ออยู่ในโหมดแก้ไข */}
            {/* <TextField 
              label="หมายเหตุ" 
              fullWidth 
              size="small" 
              multiline
              rows={2}
              value={priceForm.note} 
              onChange={(e) => setPriceForm({ ...priceForm, note: e.target.value })} 
              disabled={!isEditMode}
              placeholder={isEditMode ? "" : "หมายเหตุจะดึงมาจากการกำหนดขนาด"}
            /> */}

          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0, justifyContent: 'flex-end' }}>
          <Button onClick={handleClosePrice} sx={{ color: 'text.secondary' }}>ยกเลิก</Button>
          <Button onClick={handleSavePrice} variant="contained" sx={{ bgcolor: '#212121' }}>บันทึก</Button>
        </DialogActions>
      </Dialog>
    );
  }
}