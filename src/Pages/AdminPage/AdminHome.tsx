
import {
  FiUsers, FiClipboard, FiPlus, FiBell,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { useGetAllUsersQuery } from '../../Redux/features/admin/adminApi';

// Placeholder avatar image
const adminAvatar = 'https://i.pravatar.cc/150?img=3';

// Placeholder recent activities
const recentActivities = [
  { id: 1, text: 'User John added a question', time: '2 minutes ago' },
  { id: 2, text: 'Interview scheduled with Jane', time: '10 minutes ago' },
  { id: 3, text: 'New user registered', time: '1 hour ago' },
];

// Placeholder chart data
const chartData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 45 },
  { name: 'Mar', value: 60 },
  { name: 'Apr', value: 50 },
  { name: 'May', value: 80 },
];

// StatCard Component
const StatCard = ({ icon, label, value, trend, color }: any) => (
  <div className={`bg-white rounded-2xl shadow p-5 hover:shadow-lg transition-all`}>
    <div className="flex items-center justify-between mb-3">
      <div className="text-3xl text-blue-600">{icon}</div>
      <span className={`text-xs px-2 py-1 rounded-full bg-green-100 text-green-600`}>
        {trend}
      </span>
    </div>
    <h4 className="text-gray-500 text-sm mb-1">{label}</h4>
    <h2 className="text-2xl font-bold">{value}</h2>
  </div>
);

// ActionButton Component
const ActionButton = ({ icon, label, to }: any) => (
  <Link to={to} className="flex-1 min-w-[100px]">
    <button className="w-full flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow hover:bg-blue-50 transition">
      <span className="text-2xl text-blue-600 mb-1">{icon}</span>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </button>
  </Link>
);

// ActivityTimeline Component
const ActivityTimeline = ({ activities }: any) => (
  <div className="bg-white rounded-2xl shadow-md p-6 h-full">
    <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
    <ul className="space-y-4">
      {activities.map((act: any) => (
        <li key={act.id} className="flex items-start gap-3">
          <span className="w-2 h-2 mt-1 rounded-full bg-blue-500"></span>
          <div>
            <p className="text-sm font-medium text-gray-700">{act.text}</p>
            <p className="text-xs text-gray-400">{act.time}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

// Placeholder Chart Component
const PerformanceChart = ({ data }: any) => (
  <div className="h-48 flex items-center justify-center bg-gray-100 rounded-xl">
    <span className="text-gray-400">[Chart Placeholder]</span>
  </div>
);

// Main AdminHome Component
const AdminHome = () => {
  const { data: users } = useGetAllUsersQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  }) as { data: { data: { _id: string }[] } };

  const userCount = users?.data?.length || 0;

  return (
    <div className="admin-dashboard min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4 md:p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={adminAvatar} alt="Admin" className="w-14 h-14 rounded-full shadow" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Welcome, Admin!</h1>
            <p className="text-sm text-gray-500">Manage your interview platform efficiently.</p>
          </div>
        </div>
        <button className="p-2 rounded-full bg-white shadow hover:bg-gray-100">
          <FiBell className="w-5 h-5 text-blue-600" />
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to='/dashboard/customers'>
          <StatCard

            icon={<FiUsers />}
            label="Total Users"
            value={userCount}
            trend="+8%"
            color="from-purple-500 to-pink-500"
          />
        </Link>
        <StatCard
          icon={<FiClipboard />}
          label="Total Interviews"
          value="32"
          trend="+5%"
        />
        <StatCard
          icon={<FiPlus />}
          label="Total Questions"
          value="102"
          trend="+12%"
        />
        <StatCard
          icon={<FiUsers />}
          label="Active Candidates"
          value="15"
          trend="+3%"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold mb-3 text-gray-700">Quick Actions</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <ActionButton icon={<FiPlus />} label="Add Question" to="/dashboard/questions/add" />
          <ActionButton icon={<FiClipboard />} label="Review Interviews" to="/dashboard/interviews" />
          <ActionButton icon={<FiUsers />} label="Manage Users" to="/dashboard/users" />
        </div>
      </div>

      {/* Activity & Analytics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ActivityTimeline activities={recentActivities} />
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Platform Analytics</h2>
          <PerformanceChart data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
