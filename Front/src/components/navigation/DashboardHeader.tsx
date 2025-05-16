import React, { useState } from 'react';
import { Bell, ChevronDown, LogOut, Menu, MessageSquare, Search, Settings, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

interface DashboardHeaderProps {
	onMenuClick: () => void;
	user: {
		id: string;
		name: string;
		email: string;
		role: string | null;
		profileImage?: string;
	};
}




const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onMenuClick, user }) => {
	const [isScrolled] = useState(false);
	const navigate = useNavigate();
	const { logout } = useUser();

	const textClass = isScrolled
		? 'text-gray-800'
		: location.pathname === '/'
			? 'text-gray-700'
			: 'text-gray-800';

	const handleLogout = () => {
		logout();
		navigate('/');
	};
	return (
		<header className="bg-white shadow-sm sticky top-0">
			<div className="px-4 sm:px-6 h-16 flex items-center justify-between">
				{/* Left section */}
				<div className="flex items-center">
					<button
						onClick={onMenuClick}
						className="text-gray-500 hover:text-gray-700 focus:outline-none md:hidden"
					>
						<Menu size={24} />
					</button>

					{/* Search - only visible on medium screens and up */}
					<div className="hidden md:flex items-center ml-6">
						<div className="relative rounded-md shadow-sm">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<Search className="h-4 w-4 text-gray-400" />
							</div>
							<input
								type="text"
								placeholder="Rechercher..."
								className="form-input pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 w-64"
							/>
						</div>
					</div>
				</div>

				{/* Right section */}
				<div className="flex items-center space-x-4">
					{/* Search icon for mobile */}
					<button className="md:hidden p-2 text-gray-500 hover:text-gray-700 focus:outline-none">
						<Search size={20} />
					</button>

					{/* Notifications */}
					<div className="relative">
						<button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 focus:outline-none">
							<Bell size={20} />
							<span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-accent-500 ring-2 ring-white"></span>
						</button>
					</div>

					{/* Messages */}
					<div className="relative">
						<button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 focus:outline-none">
							<MessageSquare size={20} />
							<span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-primary-500 ring-2 ring-white"></span>
						</button>
					</div>

					{/* User menu */}
					<div className="relative group">
						<button className="flex items-center space-x-2 focus:outline-none">
							<img
								src={user?.profileImage || 'https://i.pravatar.cc/150?img=1'}
								alt="Profile"
								className="w-8 h-8 rounded-full object-cover"
							/>
							<span className={`font-medium ${textClass}`}>{user?.name}</span>
							<ChevronDown className={`h-4 w-4 ${textClass}`} />
						</button>
						<div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
							<div className="py-1">
								<Link
									to="/dashboard/profile"
									className=" px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex gap-2"
								>
									<User size={20}/>
									Mon profil
								</Link>
								<Link
									to="/dashboard/settings"
									className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex gap-2"
								>
									<Settings size={20} />
									Paramètres
								</Link>
								<button
									onClick={handleLogout}
									className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex gap-2"
								>
									<LogOut size={20} />
									Déconnexion
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default DashboardHeader;
