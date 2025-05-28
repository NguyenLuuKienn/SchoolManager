import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import subjectService from '../../services/SubjectService';
import teacherSubjectService from '../../services/TeacherSubjectService';


const TeacherForm = ({ isOpen, onClose, onSubmit, initialData, mode = 'add', teacherSubjects = [] }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '', 
    gender: '',      
    email: '',
    address: '',
    phoneNumber: '',
    dateOfHire: '',   
    subjectId: '',
  });
  
  const [subject, setSubject] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Thêm state error

  useEffect(() => {
    if (initialData && mode === 'edit') {
      // Tìm subject hiện tại của giáo viên từ teacherSubjects
      const currentSubject = teacherSubjects.find(ts => ts.teacherId === initialData.teacherId);
      
      setFormData({
        teacherId: initialData.teacherId || '',
        fullName: initialData.fullName || '',
        phoneNumber: initialData.phoneNumber || '',
        address: initialData.address || '',
        dateOfBirth: initialData.dateOfBirth ? initialData.dateOfBirth.split('T')[0] : '',
        gender: initialData.gender || '',
        email: initialData.email || '',
        dateOfHire: initialData.dateOfHire ? initialData.dateOfHire.split('T')[0] : '',
        subjectId: currentSubject?.subjectId || '',
      });
    } else {
      setFormData({
        fullName: '',
        dateOfBirth: '', 
        gender: '',     
        email: '',
        address: '',
        phoneNumber: '',
        dateOfHire: '',   
        subjectId: '',
      });
    }
  }, [initialData, mode, isOpen, teacherSubjects]); // Thay teacherSubject bằng teacherSubjects

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      try {
        const response = await subjectService.getAllSubjects();
        console.log(response.data);
        setSubject(response.data);  
      } catch (err) {
        setError('Không thể tải danh sách môn');
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchSubjects();
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { subjectId, ...teacherData } = formData;
    const subjectIds = subjectId ? [subjectId] : [];
    onSubmit({
      teacherData,
      subjectIds
    });
  };
  
  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              {mode === 'add' ? 'Thêm Giáo Viên Mới' : 'Cập Nhật Giáo Viên'}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Thông tin cá nhân */}
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
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Giới tính</label>
                <select
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

            {/* Thông tin công việc */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Bộ môn</label>
                <select
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.subjectId}
                  onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
                >
                  <option value="">Chọn bộ môn</option>
                  {subject.map((sub) => (
                    <option key={sub.subjectId} value={sub.subjectId}>
                      {sub.subjectName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Ngày vào làm</label>
                <input
                  type="date"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.dateOfHire}
                  onChange={(e) => setFormData({ ...formData, dateOfHire: e.target.value })}
                />
              </div>
            </div>

            {/* Thông tin liên hệ */}
            <div className="border-t pt-4 mt-4">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Thông tin liên hệ</h3>
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
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
            </div>

            {/* Buttons */}
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

export default TeacherForm;