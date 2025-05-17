import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { motion } from 'framer-motion';
import { CheckCircle, X, User, Lock, Bell, CreditCard } from 'lucide-react';

const tabs = [
	{ id: 'personal', label: 'Profil', icon: User },
	{ id: 'security', label: 'Sécurité', icon: Lock },
	{ id: 'notifications', label: 'Notifications', icon: Bell },
	{ id: 'payment', label: 'Paiement', icon: CreditCard },
];

const SettingPage = () => {
	const { user } = useUser();
	const [activeTab, setActiveTab] = useState('personal');

	// Champs communs
	const [name, setName] = useState(user?.name || '');
	const [email, setEmail] = useState(user?.email || '');

	// Champs sécurité
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (newPassword !== confirmPassword) {
			alert('Les mots de passe ne correspondent pas');
			return;
		}
		alert('Paramètres mis à jour avec succès !');
	};

	return (
		<div className=" bg-gray-100 py-4 px-4">
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className=" mx-auto bg-white shadow-lg rounded-2xl overflow-hidden p-4"
			>
				<div className="flex border-b max-w-xl ">
					{tabs.map(tab => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`flex-1 bg-gray-50 py-4 px-2 mb-1 text-sm mx-1 font-semibold flex items-center justify-center text-center transition-colors ${
								activeTab === tab.id
									? 'text-primary-600 border-b-2 border-primary-600 bg-gray-200'
									: 'text-gray-500 hover:bg-gray-100'
							}`}
						>
							<span className="flex items-center gap-2">
								<tab.icon className="w-5 h-5" />
								{tab.label}
							</span>
						</button>
					))}
				</div>

				<form onSubmit={handleSubmit} className="p-6 space-y-6">
					{activeTab === 'personal' && (
						<div>
							<h2 className="text-lg font-semibold text-gray-800 mb-4">Informations personnelles</h2>
							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-gray-700">Nom</label>
									<input
										type="text"
										value={name}
										onChange={e => setName(e.target.value)}
										className="w-1/2 border rounded px-3 py-2 mt-1 focus:ring-primary-500 focus:border-primary-500"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700">Email</label>
									<input
										type="email"
										value={email}
										onChange={e => setEmail(e.target.value)}
										className="w-1/2 border rounded px-3 py-2 mt-1 focus:ring-primary-500 focus:border-primary-500"
									/>
								</div>
							</div>
						</div>
					)}

					{activeTab === 'security' && (
						<div>
							<h2 className="text-lg font-semibold text-gray-800 mb-4">Sécurité</h2>
							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-gray-700">Nouveau mot de passe</label>
									<input
										type="password"
										value={newPassword}
										onChange={e => setNewPassword(e.target.value)}
										className="w-1/2 border rounded px-3 py-2 mt-1"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
									<input
										type="password"
										value={confirmPassword}
										onChange={e => setConfirmPassword(e.target.value)}
										className="w-1/2 border rounded px-3 py-2 mt-1"
									/>
								</div>
							</div>
						</div>
					)}

					{activeTab === 'notifications' && (
						<div>
							<h2 className="text-lg font-semibold text-gray-800 mb-4">Notifications</h2>
							<div className="space-y-4 text-sm text-gray-600">
								<label className="flex items-center space-x-2">
									<input type="checkbox" className="accent-primary-600" />
									<span>Recevoir les notifications par email</span>
								</label>
								<label className="flex items-center space-x-2">
									<input type="checkbox" className="accent-primary-600" />
									<span>Notifications push sur l’application</span>
								</label>
							</div>
						</div>
					)}

					{activeTab === 'payment' && (
						<div>
							<h2 className="text-lg font-semibold text-gray-800 mb-4">Méthodes de paiement</h2>
							<p className="text-sm text-gray-600">Aucune méthode enregistrée. Fonctionnalité à venir.</p>
						</div>
					)}

					<div className="flex justify-end pt-6 space-x-3 border-t">
						<button
							type="button"
							className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded flex items-center"
						>
							<X className="w-4 h-4 mr-1" />
							Annuler
						</button>
						<button
							type="submit"
							className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded flex items-center"
						>
							<CheckCircle className="w-4 h-4 mr-1" />
							Enregistrer
						</button>
					</div>
				</form>
			</motion.div>
		</div>
	);
};

export default SettingPage;

