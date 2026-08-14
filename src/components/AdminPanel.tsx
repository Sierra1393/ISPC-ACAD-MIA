import React, { useState } from 'react';
import { UserProfile, Module, FormativeUnit } from '../types';
import { 
  Users, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Shield, 
  Search,
  FileText,
  Eye,
  User,
  Mail,
  Calendar,
  DollarSign
} from 'lucide-react';

interface AdminPanelProps {
  users: UserProfile[];
  onApproveUser: (userId: string) => void;
  onRejectUser: (userId: string, motiu: string) => void;
  modules: Module[];
  onAddPdfToUf: (moduleCode: string, ufCode: string, pdfNom: string, pdfText: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  users,
  onApproveUser,
  onRejectUser,
  modules,
  onAddPdfToUf
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const filteredUsers = users.filter(user =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'aprovat':
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium"><CheckCircle2 className="w-3 h-3" /> Aprovat</span>;
      case 'pendent':
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-medium"><Clock className="w-3 h-3" /> Pendente</span>;
      case 'rebutjat':
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium"><XCircle className="w-3 h-3" /> Rebutjat</span>;
      default:
        return <span className="text-xs text-slate-400">Desconegut</span>;
    }
  };

  const getPlanBadge = (plan?: 'basic' | 'pro' | null) => {
    if (!plan) {
      return <span className="text-xs text-slate-400">Sense pla</span>;
    }
    return (
      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
        plan === 'pro' 
          ? 'bg-indigo-100 text-indigo-700 border border-indigo-200' 
          : 'bg-slate-100 text-slate-600 border border-slate-200'
      }`}>
        {plan === 'pro' ? '⭐ Pro' : 'Bàsic'}
      </span>
    );
  };

  const handleApprove = (userId: string) => {
    onApproveUser(userId);
    setSelectedUser(null);
  };

  const handleReject = (userId: string) => {
    if (rejectReason.trim()) {
      onRejectUser(userId, rejectReason);
      setSelectedUser(null);
      setRejectReason('');
    } else {
      alert('Si us plau, indica un motiu pel rebuig.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-indigo-600" />
            Gestió d'Usuaris
          </h2>
          <p className="text-sm text-slate-500">Administra els pagaments i accés dels usuaris</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cercar usuaris..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-600 w-full sm:w-64"
            />
          </div>
          <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            {users.filter(u => u.estatPagament === 'pendent').length} pendents
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Total usuaris</span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{users.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Aprovats</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-bold text-emerald-600">
            {users.filter(u => u.estatPagament === 'aprovat').length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Pendents</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-bold text-amber-600">
            {users.filter(u => u.estatPagament === 'pendent').length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Rebutjats</span>
            <XCircle className="w-4 h-4 text-red-500" />
          </div>
          <p className="text-2xl font-bold text-red-600">
            {users.filter(u => u.estatPagament === 'rebutjat').length}
          </p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left p-3 font-semibold text-slate-600">Usuari</th>
                <th className="text-left p-3 font-semibold text-slate-600">Email</th>
                <th className="text-left p-3 font-semibold text-slate-600">Rol</th>
                <th className="text-left p-3 font-semibold text-slate-600">🆕 Plan</th>
                <th className="text-left p-3 font-semibold text-slate-600">Estat</th>
                <th className="text-left p-3 font-semibold text-slate-600">Accions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="p-3 font-medium text-slate-900">{user.fullName}</td>
                  <td className="p-3 text-slate-600">{user.email}</td>
                  <td className="p-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      user.role === 'admin' 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {user.role === 'admin' ? '👑 Admin' : '🎓 Alumne'}
                    </span>
                  </td>
                  <td className="p-3">
                    {getPlanBadge(user.plan)}
                  </td>
                  <td className="p-3">
                    {getStatusBadge(user.estatPagament)}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      {user.role === 'alumne' && (
                        <>
                          {user.estatPagament === 'pendent' && (
                            <>
                              <button
                                onClick={() => handleApprove(user.id)}
                                className="px-2 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded text-xs font-medium transition-colors"
                              >
                                Aprovar
                              </button>
                              <button
                                onClick={() => setSelectedUser(user)}
                                className="px-2 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded text-xs font-medium transition-colors"
                              >
                                Rebutjar
                              </button>
                            </>
                          )}
                          {user.estatPagament === 'aprovat' && (
                            <span className="text-xs text-emerald-600">✅ Accés actiu</span>
                          )}
                          {user.estatPagament === 'rebutjat' && (
                            <span className="text-xs text-red-600">❌ Accés denegat</span>
                          )}
                        </>
                      )}
                      {user.role === 'admin' && (
                        <span className="text-xs text-slate-400">🔒 Accés complet</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Rebuig */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Rebutjar usuari</h3>
            <p className="text-sm text-slate-600 mb-4">
              Estàs a punt de rebutjar a <strong>{selectedUser.fullName}</strong>.
              Si us plau, indica el motiu:
            </p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Motiu del rebuig..."
              className="w-full p-3 border border-slate-200 rounded-lg text-sm resize-none h-24 focus:outline-none focus:border-indigo-600"
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => {
                  setSelectedUser(null);
                  setRejectReason('');
                }}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel·lar
              </button>
              <button
                onClick={() => handleReject(selectedUser.id)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg text-sm transition-colors"
              >
                Rebutjar usuari
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};