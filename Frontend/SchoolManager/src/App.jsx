import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './components/Dashboard/Dashboard';
import StudentList from './components/Students/StudentList';
import TeacherList from './components/Teachers/TeacherList';
import ClassList from './components/Classes/ClassList';
import SubjectList from './components/Subjects/SubjectList';
import ScheduleList from './components/Schedules/ScheduleList';
import EventList from './components/Events/EventList';
import RoleList from './components/Role/RoleList';
import AccountList from './components/Account/AccountList';
import Profile from './components/Profiles/Profile';
import Settings from './components/Settings/Settings';
import Login from './components/Auth/Login';

function App() {
  return (
    <Router>
      <DashboardLayout schoolName="Schnee Academy">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/teachers" element={<TeacherList />} />
          <Route path="/classes" element={<ClassList />} />
          <Route path="/subjects" element={<SubjectList />} />
          <Route path="/schedules" element={<ScheduleList />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/roles" element={<RoleList />} />
          <Route path="/accounts" element={<AccountList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
          {/* Add more routes as needed */}
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
