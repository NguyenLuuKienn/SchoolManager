import React, { useEffect, useState } from 'react';
import { UserPlus, Search, Edit2, Trash2, Mail, Phone, MapPin } from 'lucide-react';
import teacherService from '../../services/TeacherService';
import Swal from 'sweetalert2';
import TeacherForm from './TeacherForm';
import teacherSubjectService from '../../services/TeacherSubjectService';
import subjectService from '../../services/SubjectService';

const formatVNDate = (dateString) => {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN');
};

const TeacherList = () => {
  const [modalMode, setModalMode] = useState('add');
  const [searchTerm, setSearchTerm] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [teacherSubjects, setTeacherSubjects] = useState([]);
  const [subjects, setSubjects] = useState([]);


  const fetchTeachers = async () => {
    try {
      const response = await teacherService.getAllTeachers();
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      Swal.fire('Lỗi!', 'Không thể tải danh sách giáo viên.', 'error');
    }
  }

  const fetchTeacherSubjects = async () => {
    try {
      const response = await teacherSubjectService.getAllTeacherSubjects();
      console.log("Teacher Subjects:", response.data);
      setTeacherSubjects(response.data);
    } catch (error) {
      console.error('Error fetching teacher subjects:', error);
      Swal.fire('Lỗi!', 'Không thể tải danh sách bộ môn của giáo viên.', 'error');
    }
  };
  const fetchSubjects = async () => {
    try {
      const response = await subjectService.getAllSubjects();
      console.log("Subjects:", response.data);
      setSubjects(response.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
      Swal.fire('Lỗi!', 'Không thể tải danh sách môn học.', 'error');
    }
  };

  const getSubjectByTeacherId = (teacherId) => {
  const teacherSubject = teacherSubjects.find(ts => ts.teacherId === teacherId);
  if (!teacherSubject) return "—";
  
  const subject = subjects.find(s => s.subjectId === teacherSubject.subjectId);
  return subject?.subjectName || "—";
};


  const handleAddTeacher = async (data) => {
  try {
    console.log('Adding teacher with data:', data); // Debug log
    
    const teacherResponse = await teacherService.createTeacher(data.teacherData);
    const newTeacher = teacherResponse.data;
    
    if (data.subjectIds && data.subjectIds.length > 0) {
      console.log('Creating teacher subject with:', {
        teacherId: newTeacher.teacherId,
        subjectIds: data.subjectIds // Gửi array như API expecting
      });
      
      // Gọi API với đúng format mà backend expecting
      await teacherSubjectService.createTeacherSubject({
        teacherId: newTeacher.teacherId,
        subjectIds: data.subjectIds // Array of GUIDs
      });
    }
    
    setIsModalOpen(false);
    await Swal.fire('Thành công!', 'Thêm giáo viên mới thành công.', 'success');
    fetchTeachers();
    fetchTeacherSubjects();
  } catch (error) {
    console.error('Error adding teacher:', error);
    console.error('Error response:', error.response?.data); // Debug error
    Swal.fire('Lỗi!', 'Không thể thêm giáo viên.', 'error');
  }
};

  const handleEditTeacher = async (data) => {
  try {
    console.log('Updating teacher with data:', data); // Debug log
    
    await teacherService.updateTeacher(data.teacherData.teacherId, data.teacherData);
    
    const existingTeacherSubject = teacherSubjects.find(
      ts => ts.teacherId === data.teacherData.teacherId
    );
    
    // So sánh với subjectIds[0] thay vì data.subjectId
    const newSubjectId = data.subjectIds && data.subjectIds.length > 0 ? data.subjectIds[0] : null;
    
    if (existingTeacherSubject && existingTeacherSubject.subjectId !== newSubjectId) {
      console.log('Updating teacher subject:', {
        teacherId: data.teacherData.teacherId,
        subjectIds: data.subjectIds
      });
      
      // Update bằng cách gọi lại AddTeacherSubjectAsync (nó sẽ remove old và add new)
      await teacherSubjectService.createTeacherSubject({
        teacherId: data.teacherData.teacherId,
        subjectIds: data.subjectIds // Array format
      });
    } 
    else if (!existingTeacherSubject && data.subjectIds && data.subjectIds.length > 0) {
      console.log('Creating new teacher subject:', {
        teacherId: data.teacherData.teacherId,
        subjectIds: data.subjectIds
      });
      
      await teacherSubjectService.createTeacherSubject({
        teacherId: data.teacherData.teacherId,
        subjectIds: data.subjectIds // Array format
      });
    }
    
    setIsModalOpen(false);
    setSelectedTeacher(null);
    setModalMode('add');
    await Swal.fire('Thành công!', 'Cập nhật giáo viên thành công.', 'success');
    fetchTeachers();
    fetchTeacherSubjects();
  } catch (error) {
    console.error('Error updating teacher:', error);
    console.error('Error response:', error.response?.data); // Debug error
    Swal.fire('Lỗi!', 'Không thể cập nhật giáo viên.', 'error');
  }
};

  const handleDeleteTeacher = async (teacherId) => {
    const result = await Swal.fire({
      title: 'Bạn có chắc muốn xoá giáo viên này không?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xoá',
      cancelButtonText: 'Huỷ',
    });

    if (result.isConfirmed) {
      try {
        await teacherService.deleteTeacher(teacherId);
        setTeachers(prev => prev.filter(t => t.teacherId !== teacherId));
        await Swal.fire('Thành công!', 'Xoá giáo viên thành công.', 'success');
      } catch (error) {
        Swal.fire('Lỗi!', 'Không thể xoá giáo viên.', 'error');
      }
    }
  };

useEffect(() => {
    fetchTeachers();
    fetchTeacherSubjects();
    fetchSubjects();
  }, []);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản Lý Giáo Viên</h1>
        <button 
        onClick={() => {
          setModalMode('add');
          setSelectedTeacher(null);
          setIsModalOpen(true);
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors">
          <UserPlus className="w-5 h-5 mr-2" />
          Thêm Giáo Viên
        </button>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Tìm kiếm giáo viên..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
        <select className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Tất Cả Bộ Môn</option>
          <option value="science">Khoa Học</option>
          <option value="math">Toán Học</option>
          <option value="literature">Văn Học</option>
        </select>
      </div>

      {/* Card Grid thay thế cho Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((teacher) => (
          <div key={teacher.teacherId} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            {/* Header với tên và ID */}
            <div className="bg-blue-50 p-4 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{teacher.fullName}</h3>
                  <p className="text-sm text-gray-500">Mã GV: {teacher.teacherId}</p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    className="text-blue-600 hover:text-blue-900"
                    onClick={() => {
                      setSelectedTeacher(teacher);
                      setModalMode('edit');
                      setIsModalOpen(true);
                    }}
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button 
                    className="text-red-600 hover:text-red-900" 
                    onClick={() => handleDeleteTeacher(teacher.teacherId)}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {getSubjectByTeacherId(teacher.teacherId) || "Chưa phân bộ môn"}
              </div>
            </div>

            {/* Body với thông tin chi tiết */}
            <div className="p-4">
              {/* Thông tin cá nhân */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Thông tin cá nhân</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-500">Ngày sinh</p>
                    <p className="text-sm font-medium">
                      {teacher.dateOfBirth ? new Date(teacher.dateOfBirth).toLocaleDateString('vi-VN') : "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Giới tính</p>
                    <p className="text-sm font-medium">
                      {teacher.gender === 0 ? "Nam" : teacher.gender === 1 ? "Nữ" : "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Bộ môn</p>
                    <p className="text-sm font-medium">{ getSubjectByTeacherId(teacher.teacherId) || "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Ngày vào làm</p>
                    <p className="text-sm font-medium">
                      {teacher.dateOfHire ? new Date(teacher.dateOfHire).toLocaleDateString('vi-VN') : "—"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Thông tin liên hệ */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Thông tin liên hệ</h4>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-500">Địa chỉ</p>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      <p className="text-sm font-medium">{teacher.address || "—"}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-gray-400" />
                      <p className="text-sm font-medium">{teacher.email || "—"}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Số điện thoại</p>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-gray-400" />
                      <p className="text-sm font-medium">{teacher.phoneNumber || "—"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">10</span> trong số{' '}
          <span className="font-medium">20</span> kết quả
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Trước</button>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Sau</button>
        </div>
      </div>
      <TeacherForm 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={modalMode === 'add' ? handleAddTeacher : handleEditTeacher}
        initialData={selectedTeacher}
        mode={modalMode}
        teacherSubjects={teacherSubjects}
      />
    </div>
  );
};

export default TeacherList;