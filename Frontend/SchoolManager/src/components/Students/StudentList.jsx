import React, { useEffect, useState } from 'react';
import studentService from '../../services/studentservice';
import AddStudentModal from './StudentForm';
import { UserPlus, Search, Edit2, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';

function formatVNDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString('vi-VN'); 
}


const StudentList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const response = await studentService.getAllStudents();
        setStudents(response.data);
      } catch (err) {
        setError('Không thể tải danh sách học sinh');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

const handleAddStudent = async (studentData) => {
  try {
    const response = await studentService.createStudent(studentData);
    setStudents(prevStudents => [...prevStudents, response.data]);
    setIsAddModalOpen(false);
    await Swal.fire('Thành công!', 'Thêm học sinh mới thành công.', 'success');
    const refreshResponse = await studentService.getAllStudents();
    setStudents(refreshResponse.data);
  } catch (error) {
    Swal.fire('Lỗi!', 'Không thể thêm học sinh.', 'error');
  }
}

const handleDelete = async (studentId) => {
  const result = await Swal.fire({
    title: 'Bạn có chắc muốn xoá học sinh này không?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Xoá',
    cancelButtonText: 'Huỷ',
  });

  if (result.isConfirmed) {
    try {
      await studentService.deleteStudent(studentId);
      setStudents(prev => prev.filter(s => s.studentId !== studentId));
      Swal.fire('Đã xoá!', 'Học sinh đã được xoá.', 'success');
    } catch (error) {
      Swal.fire('Lỗi!', 'Xoá học sinh thất bại.', 'error');
    }
  }
};

const handleEdit = (student) => {
  setSelectedStudent(student);
  setModalMode('edit');
  setIsModalOpen(true);
};

const handleEditStudent = async (studentData) => {
  try {
    const response = await studentService.updateStudent(studentData.studentId, studentData);
    setStudents(prevStudents => prevStudents.map(student => student.studentId === studentData.studentId ? response.data : student));
    setIsModalOpen(false);
    setSelectedStudent(null);
    setModalMode('add');
    await Swal.fire('Thành công!', 'Cập nhật học sinh thành công.', 'success');
    const refreshResponse = await studentService.getAllStudents();
    setStudents(refreshResponse.data);
  } catch (error) {
    Swal.fire('Lỗi!', 'Không thể cập nhật học sinh.', 'error');
  }
};

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Students Management</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700" onClick={() => setIsAddModalOpen(true)}>
          <UserPlus className="w-5 h-5 mr-2" />
          Thêm Học Sinh
        </button>
      </div>
      {
        <AddStudentModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSubmit={handleAddStudent} />
      }

      <AddStudentModal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedStudent(null);
          setModalMode('add');
        }}
        onSubmit={modalMode === 'add' ? handleAddStudent : handleEditStudent}
        initialData={selectedStudent}
        mode={modalMode}
      />

      {/* Search and Filter - thêm dropdown grade ở đây */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Tìm kiếm học sinh..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
        
        <select 
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => {/* Xử lý lọc theo khối */}}
        >
          <option value="">Tất cả khối</option>
          <option value="10">Khối 10</option>
          <option value="11">Khối 11</option>
          <option value="12">Khối 12</option>
        </select>

        <select 
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => {/* Xử lý lọc theo trạng thái */}}
        >
          <option value="">Tất cả trạng thái</option>
          <option value="active">Đang học</option>
          <option value="inactive">Nghỉ học</option>
        </select>
      </div>

      {/* Table with horizontal scroll */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <div key={student.studentId} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            {/* Header với tên và ID */}
            <div className="bg-blue-50 p-4 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{student.fullName}</h3>
                  <p className="text-sm text-gray-500">Mã HS: {student.studentCode}</p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    className="text-blue-600 hover:text-blue-900"
                    onClick={() => handleEdit(student)}
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button 
                    className="text-red-600 hover:text-red-900" 
                    onClick={() => handleDelete(student.studentId)}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {student.isActive ? "Đang Học" : "Nghỉ Học"}
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
                    <p className="text-sm font-medium">{formatVNDate(student.dateOfBirth)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Giới tính</p>
                    <p className="text-sm font-medium">{student.gender === 0 ? "Nam" : "Nữ"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Khối</p>
                    <p className="text-sm font-medium">{student.class?.grandeLevel || "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Lớp</p>
                    <p className="text-sm font-medium">{student.class?.className || "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Ngày nhập học</p>
                    <p className="text-sm font-medium">{formatVNDate(student.enrolledDate)}</p>
                  </div>
                </div>
              </div>

              {/* Thông tin liên hệ */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Thông tin liên hệ</h4>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-500">Địa chỉ</p>
                    <p className="text-sm font-medium">{student.address || "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium">{student.email || "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Số điện thoại</p>
                    <p className="text-sm font-medium">{student.phoneNumber || "—"}</p>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <p className="text-xs text-gray-500">Phụ huynh</p>
                    <p className="text-sm font-medium">{student.parentName || "—"}</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {student.parentPhone && (
                        <p className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                          SĐT: {student.parentPhone}
                        </p>
                      )}
                      {student.parentEmail && (
                        <p className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                          Email: {student.parentEmail}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">10</span> trong số{' '}
          <span className="font-medium">20</span> kết quả
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Trước</button>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Sau</button>
        </div>
      </div>
    </div>
  );
};

export default StudentList;