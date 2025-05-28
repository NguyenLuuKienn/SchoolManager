import React, { useState, useEffect } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import teacherService from '../../services/TeacherService';

const AccountForm = ({ isOpen, onClose, onSubmit, initialData, mode = 'add', roles = [] }) => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    roleId: '',
    teacherId: '', 
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [teachers, setTeachers] = useState([]); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData && mode === 'edit') {
      setFormData({
        userId: initialData.userId || '',
        userName: initialData.userName || '',
        email: initialData.email || '',
        password: '',
        confirmPassword: '',
        roleId: initialData.roleId || '',
        teacherId: initialData.teacherId || '',
      });
    } else {
      setFormData({
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        roleId: '',
        teacherId: '',
      });
    }
    setErrors({});
  }, [initialData, mode, isOpen]);

  useEffect(() => {
    const fetchTeachers = async () => {
      if (isOpen) {
        setLoading(true);
        try {
          const response = await teacherService.getAllTeachers();
          const teachersWithoutAccount = response.data.filter(teacher => !teacher.userId);
          setTeachers(teachersWithoutAccount);
        } catch (err) {
          console.error('Error fetching teachers:', err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTeachers();
  }, [isOpen]);

  // Tự động điền email khi chọn giáo viên
  const handleTeacherChange = (teacherId) => {
    const selectedTeacher = teachers.find(t => t.teacherId === teacherId);
    if (selectedTeacher) {
      setFormData({
        ...formData,
        teacherId: teacherId,
        userName: selectedTeacher.fullName.replace(/\s+/g, '').toLowerCase(),
        email: selectedTeacher.email,
      });
    } else {
      setFormData({
        ...formData,
        teacherId: '',
        userName: '',
        email: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.userName.trim()) {
      newErrors.userName = 'Tên người dùng không được để trống';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email không được để trống';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    
    if (mode === 'add' && !formData.password) {
      newErrors.password = 'Mật khẩu không được để trống';
    } else if (mode === 'add' && formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    
    if (mode === 'add' && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }
    
    if (!formData.roleId) {
      newErrors.roleId = 'Vui lòng chọn vai trò';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Remove confirmPassword before submitting
      const { confirmPassword, ...dataToSubmit } = formData;
      
      // If editing and password is empty, remove it from payload
      if (mode === 'edit' && !dataToSubmit.password) {
        const { password, ...dataWithoutPassword } = dataToSubmit;
        onSubmit(dataWithoutPassword);
      } else {
        onSubmit(dataToSubmit);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            {mode === 'add' ? 'Thêm Tài Khoản Mới' : 'Cập Nhật Tài Khoản'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Chọn giáo viên - chỉ hiển thị khi thêm mới */}
          {mode === 'add' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Chọn giáo viên (tùy chọn)</label>
              <select
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.teacherId}
                onChange={(e) => handleTeacherChange(e.target.value)}
                disabled={loading}
              >
                <option value="">Chọn giáo viên hoặc tạo tài khoản độc lập</option>
                {teachers.map((teacher) => (
                  <option key={teacher.teacherId} value={teacher.teacherId}>
                    {teacher.fullName} - {teacher.email}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-gray-500">
                Chỉ hiển thị giáo viên chưa có tài khoản
              </p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Tên người dùng</label>
            <input
              type="text"
              className={`mt-1 block w-full rounded-md border ${errors.userName ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              value={formData.userName}
              onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
              disabled={mode === 'edit'}
            />
            {errors.userName && <p className="mt-1 text-sm text-red-500">{errors.userName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className={`mt-1 block w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {mode === 'edit' ? 'Mật khẩu mới (để trống nếu không thay đổi)' : 'Mật khẩu'}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className={`mt-1 block w-full rounded-md border ${errors.password ? 'border-red-500' : 'border-gray-300'} px-3 py-2 pr-10 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
          </div>

          {/* Confirm Password field - only for add mode */}
          {mode === 'add' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Xác nhận mật khẩu</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`mt-1 block w-full rounded-md border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} px-3 py-2 pr-10 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
              </div>
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Vai trò</label>
            <select
              className={`mt-1 block w-full rounded-md border ${errors.roleId ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              value={formData.roleId}
              onChange={(e) => setFormData({ ...formData, roleId: e.target.value })}
            >
              <option value="">Chọn vai trò</option>
              {roles.map((role) => (
                <option key={role.roleId} value={role.roleId}>
                  {role.roleName}
                </option>
              ))}
            </select>
            {errors.roleId && <p className="mt-1 text-sm text-red-500">{errors.roleId}</p>}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Huỷ
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {mode === 'add' ? 'Thêm' : 'Cập nhật'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountForm;