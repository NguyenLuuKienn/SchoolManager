import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Book, Building, Pencil } from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: 'Nguyễn Văn A',
    email: 'nguyenvana@school.com',
    phone: '0123456789',
    address: 'Hồ Chí Minh',
    birthday: '1990-01-01',
    subject: 'Toán học',
    department: 'Khoa Tự nhiên',
    joinDate: '2020-09-01',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Add API call to update profile here
  };

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Thông Tin Cá Nhân</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <Pencil className="w-4 h-4 mr-2" />
            {isEditing ? 'Hủy' : 'Chỉnh sửa'}
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-32 h-32 rounded-full bg-blue-600 flex items-center justify-center text-white mb-4">
                <User className="w-16 h-16" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">{profileData.fullName}</h2>
              <p className="text-gray-500">{profileData.department}</p>
            </div>

            {/* Profile Form */}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Họ và tên</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        disabled={!isEditing}
                        value={profileData.fullName}
                        onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                        className="block w-full pl-10 pr-3 py-2 border rounded-md disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        disabled={!isEditing}
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        className="block w-full pl-10 pr-3 py-2 border rounded-md disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        disabled={!isEditing}
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        className="block w-full pl-10 pr-3 py-2 border rounded-md disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        disabled={!isEditing}
                        value={profileData.address}
                        onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                        className="block w-full pl-10 pr-3 py-2 border rounded-md disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Ngày sinh</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="date"
                        disabled={!isEditing}
                        value={profileData.birthday}
                        onChange={(e) => setProfileData({...profileData, birthday: e.target.value})}
                        className="block w-full pl-10 pr-3 py-2 border rounded-md disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Bộ môn</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Book className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        disabled={!isEditing}
                        value={profileData.subject}
                        onChange={(e) => setProfileData({...profileData, subject: e.target.value})}
                        className="block w-full pl-10 pr-3 py-2 border rounded-md disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Lưu thay đổi
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;