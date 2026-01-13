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
  Avatar,
  Divider
} from '@mui/material';
import { Add, Close, Person } from '@mui/icons-material';

interface User {
  id: number;
  email: string;
  prefix: string;
  firstName: string;
  lastName: string;
  displayName: string;
  role: string;
  mobile: string;
}

export default function UsersPage() {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    prefix: '',
    firstName: '',
    lastName: '',
    displayName: '',
    role: '',
    mobile: ''
  });

  const handleClickOpen = () => {
    setEditingId(null);
    setFormData({ email: '', prefix: '', firstName: '', lastName: '', displayName: '', role: '', mobile: '' });
    setOpen(true);
  };

  const handleEdit = (user: User) => {
    setEditingId(user.id);
    setFormData({
      email: user.email,
      prefix: user.prefix,
      firstName: user.firstName,
      lastName: user.lastName,
      displayName: user.displayName,
      role: user.role,
      mobile: user.mobile
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingId(null);
    setFormData({ email: '', prefix: '', firstName: '', lastName: '', displayName: '', role: '', mobile: '' });
  };

  const handleSave = () => {
    const newUserObj = {
      email: formData.email,
      prefix: formData.prefix,
      firstName: formData.firstName,
      lastName: formData.lastName,
      displayName: formData.displayName,
      role: formData.role,
      mobile: formData.mobile
    };

    if (editingId !== null) {
      setUsers(users.map(u => u.id === editingId ? { ...u, ...newUserObj } : u));
      if (selectedUser?.id === editingId) {
        setSelectedUser({ ...selectedUser, ...newUserObj });
      }
    } else {
      const newUser = { id: Date.now(), ...newUserObj };
      setUsers([...users, newUser]);
      setSelectedUser(newUser);
    }
    handleClose();
  };

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
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
      {users.length === 0 ? (
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
            เพิ่มข้อมูลผู้ใช้
          </Button>
        </Box>
      ) : (
        <>
          {/* Layout แบบแบ่ง 2 ฝั่ง */}
          <Box sx={{ display: 'flex', gap: 3, flex: 1 }}>
            
            {/* ฝั่งซ้าย - รายการผู้ใช้ */}
            <Box sx={{ flex: '0 0 400px', display: 'flex', flexDirection: 'column', gap: 2 }}>
              {users.map((user) => (
                <Box 
                  key={user.id}
                  onClick={() => handleSelectUser(user)}
                  sx={{ 
                    p: 2.5, 
                    border: '1px solid #e0e0e0',
                    borderRadius: 2,
                    bgcolor: selectedUser?.id === user.id ? '#f0f0f0' : '#fafafa',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': { bgcolor: '#f0f0f0', borderColor: '#bdbdbd' },
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2
                  }}
                >
                  <Avatar sx={{ width: 50, height: 50, bgcolor: '#e0e0e0', color: '#757575' }}>
                    <Person sx={{ fontSize: 30 }} />
                  </Avatar>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body1" fontWeight={600} noWrap mb={0.5}>
                      {user.prefix} {user.firstName} {user.lastName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block" noWrap>
                      {user.role}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block" noWrap>
                      {user.email}
                    </Typography>
                  </Box>
                </Box>
              ))}

              {/* ปุ่มเพิ่มผู้ใช้ */}
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleClickOpen}
                sx={{
                  bgcolor: '#212121',
                  color: 'white',
                  py: 1.5,
                  textTransform: 'none',
                  borderRadius: 1,
                  '&:hover': { bgcolor: '#424242' }
                }}
              >
                เพิ่มผู้ใช้
              </Button>
            </Box>

            {/* ฝั่งขวา - แสดงรายละเอียด */}
            <Box sx={{ 
              flex: '0 0 450px',
              border: '1px solid #e0e0e0', 
              borderRadius: 2, 
              bgcolor: '#fafafa',
              p: 4,
              display: 'flex',
              flexDirection: 'column'
            }}>
              {selectedUser ? (
                <>
                  {/* Avatar และ Display Name */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
                    <Avatar sx={{ width: 100, height: 100, bgcolor: '#e0e0e0', color: '#757575', mb: 2 }}>
                      <Person sx={{ fontSize: 60 }} />
                    </Avatar>
                    <Typography variant="h6" fontWeight={600}>
                      {selectedUser.displayName}
                    </Typography>
                  </Box>

                  {/* ข้อมูล */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mb: 4 }}>
                    <Box>
                      <Typography variant="caption" color="text.secondary">Email</Typography>
                      <Typography variant="body1">{selectedUser.email}</Typography>
                    </Box>

                    <Divider />

                    <Box>
                      <Typography variant="caption" color="text.secondary">ชื่อ-นามสกุล</Typography>
                      <Typography variant="body1">
                        {selectedUser.prefix} {selectedUser.firstName} {selectedUser.lastName}
                      </Typography>
                    </Box>

                    <Divider />

                    {selectedUser.mobile && (
                      <>
                        <Box>
                          <Typography variant="caption" color="text.secondary">Mobile</Typography>
                          <Typography variant="body1">{selectedUser.mobile}</Typography>
                        </Box>
                        <Divider />
                      </>
                    )}

                    <Box>
                      <Typography variant="caption" color="text.secondary">Role</Typography>
                      <Typography variant="body1">{selectedUser.role}</Typography>
                    </Box>
                  </Box>

                    

                  {/* ปุ่มแก้ไข */}
                  <Box sx={{ mt: 'auto' }}>
                    <Button
                      variant="contained"
                      onClick={() => handleEdit(selectedUser)}
                      sx={{
                        bgcolor: '#212121',
                        color: 'white',
                        py: 1.5,
                        px: 4,
                        textTransform: 'none',
                        borderRadius: 1,
                        '&:hover': { bgcolor: '#424242' }
                      }}
                    >
                      แก้ไข
                    </Button>
                  </Box>
                </>
              ) : (
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  flex: 1 
                }}>
                  <Typography variant="body1" color="text.secondary">
                    เลือกผู้ใช้เพื่อดูรายละเอียด
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </>
      )}

      {/* Dialog เพิ่ม/แก้ไข */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: 2 } }}>
        <DialogTitle sx={{ 
          m: 0, 
          p: 2, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          borderBottom: '1px solid #eee' 
        }}>
          <Typography variant="h6" fontWeight="bold" fontSize="1rem">
            {editingId ? 'แก้ไขข้อมูลผู้ใช้' : 'เพิ่มข้อมูลผู้ใช้'}
          </Typography>
          <IconButton onClick={handleClose}><Close /></IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ p: 3 }}>
          <Box component="form" sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: '150px', flexShrink: 0 }}>
                <Typography variant="body2" color="text.secondary">Email</Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <TextField 
                  fullWidth 
                  size="small" 
                  type="email"
                  value={formData.email} 
                  onChange={(e) => setFormData({...formData, email: e.target.value})} 
                />
              </Box>
            </Box>

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
                >
                  <MenuItem value="">เลือกคำนำหน้าชื่อ</MenuItem>
                  <MenuItem value="นาย">นาย</MenuItem>
                  <MenuItem value="นาง">นาง</MenuItem>
                  <MenuItem value="นางสาว">นางสาว</MenuItem>
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
                  value={formData.firstName} 
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})} 
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: '150px', flexShrink: 0 }}>
                <Typography variant="body2" color="text.secondary">นามสกุล</Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <TextField 
                  fullWidth 
                  size="small" 
                  value={formData.lastName} 
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})} 
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: '150px', flexShrink: 0 }}>
                <Typography variant="body2" color="text.secondary">Display Name</Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <TextField 
                  fullWidth 
                  size="small" 
                  value={formData.displayName} 
                  onChange={(e) => setFormData({...formData, displayName: e.target.value})} 
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: '150px', flexShrink: 0 }}>
                <Typography variant="body2" color="text.secondary">เบอร์โทร</Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <TextField 
                  fullWidth 
                  size="small" 
                  value={formData.mobile} 
                  onChange={(e) => setFormData({...formData, mobile: e.target.value})} 
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: '150px', flexShrink: 0 }}>
                <Typography variant="body2" color="text.secondary">บทบาท</Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <TextField 
                  select 
                  fullWidth 
                  size="small" 
                  value={formData.role} 
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                  <MenuItem value="">เลือกบทบาท</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="User">User</MenuItem>
                  <MenuItem value="Super Admin">Super Admin</MenuItem>
                </TextField>
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