import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import classService from '../../services/classService';

const StudentForm = ({ isOpen, onClose, onSubmit, initialData, mode = 'add' }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    email: '',
    phoneNumber: '',
    enrolledDate: '',
    gradeLevel: '',
    classId: '',
    parentEmail: '',
    parentName: '',
    parentPhone: '',
    course: '',
    schoolYear: '',
    isActive: true,
  });

  // Reset form when initialData changes (for edit mode)
  useEffect(() => {
  if (initialData && mode === 'edit') {
    setFormData({
      studentId: initialData.studentId || '',
      fullName: initialData.fullName || '',
      dateOfBirth: initialData.dateOfBirth ? initialData.dateOfBirth.split('T')[0] : '',
      gender: initialData.gender || '',
      address: initialData.address || '',
      email: initialData.email || '',
      phoneNumber: initialData.phoneNumber || '',
      enrolledDate: initialData.enrolledDate ? initialData.enrolledDate.split('T')[0] : '',
      gradeLevel: initialData.class?.grandeLevel || '',
      classId: initialData.class?.classId || '',
      parentEmail: initialData.parentEmail || '',
      parentName: initialData.parentName || '',
      parentPhone: initialData.parentPhone || '',
      course: initialData.course || '',
      schoolYear: initialData.schoolYear || '',
      isActive: initialData.isActive ?? true,
    });
  } else {
    setFormData({
      fullName: '',
      dateOfBirth: '',
      gender: '',
      address: '',
      email: '',
      phoneNumber: '',
      enrolledDate: '',
      gradeLevel: '',
      classId: '',
      parentEmail: '',
      parentName: '',
      parentPhone: '',
      course: '',
      schoolYear: '',
      isActive: true,
    });
  }
}, [initialData, mode, isOpen]);

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      try {
        const response = await classService.getAllClasses();
        console.log(response.data);
        setClasses(response.data);  
      } catch (err) {
        setError('Không thể tải danh sách lớp');
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchClasses();
    }
  }, [isOpen]);
console.log('Classes:', classes);

  const classesByGrade = classes.reduce((acc, cls) => {
    const gradeLevel = cls.grandeLevel; 
    if (!acc[gradeLevel]) {
      acc[gradeLevel] = [];
    }
    acc[gradeLevel].push(cls);
    return acc;
  }, {});

  const gradeLevels = [...new Set(classes.map((cls) => cls.grandeLevel))].map((level) => ({
    id: level,
    name: `Khối ${level}`,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
        <div className="bg-white rounded-lg w-full max-w-4xl p-6 my-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              {mode === 'add' ? 'Thêm Học Sinh Mới' : 'Cập Nhật Học Sinh'}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Thông tin cơ bản - 3 cột */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Họ và tên</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Ngày sinh</label>
                <input
                  type="date"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Giới tính</label>
                <select
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: parseInt(e.target.value) })}
                >
                  <option value="">Chọn giới tính</option>
                  <option value="0">Nam</option>
                  <option value="1">Nữ</option>
                </select>
              </div>
            </div>

            {/* Thông tin liên hệ - 3 cột */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                <input
                  type="tel"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Ngày nhập học</label>
                <input
                  type="date"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.enrolledDate}
                  onChange={(e) => setFormData({ ...formData, enrolledDate: e.target.value })}
                />
              </div>
            </div>

            {/* Địa chỉ - Chiếm trọn dòng */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>

            {/* Thông tin học tập - 2 dòng mỗi dòng 3 cột */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Thông tin học tập</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Khóa</label>
                  <select
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: parseInt(e.target.value) })}
                  >
                    <option value="">Chọn khóa</option>
                    <option value="10">Khóa 10</option>
                    <option value="11">Khóa 11</option>
                    <option value="12">Khóa 12</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Năm học</label>
                  <select
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.schoolYear}
                    onChange={(e) => setFormData({ ...formData, schoolYear: parseInt(e.target.value) })}
                  >
                    <option value="">Chọn năm học</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Khối</label>
                  <select
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.gradeLevel}
                    onChange={(e) => {
                      setFormData({ 
                        ...formData, 
                        gradeLevel: e.target.value,
                        classId: '' // Reset classId when gradeLevel changes
                      })
                    }}
                  >
                    <option value="">Chọn khối</option>
                    {gradeLevels.map((grade) => (
                      <option key={grade.id} value={grade.id}>
                        {grade.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Lớp</label>
                  <select
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.classId}
                    onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
                    disabled={!formData.gradeLevel}
                  >
                    <option value="">Chọn lớp</option>
                    {formData.gradeLevel &&
                      classesByGrade[formData.gradeLevel]?.map((cls) => (
                        <option key={cls.classId} value={cls.classId}>
                          {cls.className}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Thông tin phụ huynh - 3 cột */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Thông tin phụ huynh</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Họ tên phụ huynh</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email phụ huynh</label>
                  <input
                    type="email"
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.parentEmail}
                    onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">SĐT phụ huynh</label>
                  <input
                    type="tel"
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.parentPhone}
                    onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Huỷ
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                {mode === 'add' ? 'Thêm' : 'Cập nhật'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default StudentForm;
