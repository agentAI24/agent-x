import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Loader2, Check, X, ShieldAlert } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { NeonButton } from '../components/NeonButton';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { supabase } from '../lib/supabase';

interface AdminProps {
  lang: Language;
}

export const Admin: React.FC<AdminProps> = ({ lang }) => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profile?.role === 'admin') {
        setIsAdmin(true);
        fetchSkills();
      } else {
        setIsAdmin(false);
        setLoading(false);
      }
    };

    const fetchSkills = async () => {
      const { data } = await supabase
        .from('skills')
        .select(`
          *,
          author:profiles(username)
        `)
        .order('created_at', { ascending: false });
      
      if (data) setSkills(data);
      setLoading(false);
    };

    checkRole();
  }, []);

  const handleApprove = async (id: string) => {
    const { error } = await supabase
      .from('skills')
      .update({ status: 'approved' })
      .eq('id', id);
    if (!error) {
      setSkills(skills.map(s => s.id === id ? { ...s, status: 'approved' } : s));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    const { error } = await supabase.from('skills').delete().eq('id', id);
    if (!error) {
      setSkills(skills.filter(s => s.id !== id));
    }
  };

  if (loading) return <div className="flex h-64 items-center justify-center"><Loader2 className="animate-spin text-[#FF2D55]" size={48} /></div>;

  if (isAdmin === false) {
    return (
      <div className="flex flex-col h-96 items-center justify-center text-center space-y-4">
        <div className="p-6 bg-red-500/10 rounded-full text-red-500"><ShieldAlert size={64} /></div>
        <h1 className="text-4xl font-bold text-white">ACCESS DENIED</h1>
        <p className="text-slate-400">This area is for Protocol Administrators only.</p>
      </div>
    );
  }

  return (
    <div className="py-8 space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">
          <span className="text-[#FF2D55]">Protocol</span> Command Center
        </h1>
        <div className="flex gap-4">
           <div className="text-right">
              <div className="text-xs text-slate-500 uppercase">Status</div>
              <div className="text-green-400 font-mono text-sm">SECURE_LEVEL_1</div>
           </div>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Agents', val: skills.length, change: 'Stable' },
          { label: 'Pending Review', val: skills.filter(s => s.status === 'pending').length, change: 'Action Required' },
          { label: 'X402 Volume', val: '0.00', change: 'Market Closed' },
          { label: 'System Load', val: '2%', change: 'Optimal' },
        ].map((item, i) => (
          <GlassCard key={i} className="p-4 border-l-2 border-l-[#FF2D55]">
            <p className="text-slate-400 text-sm uppercase tracking-wider">{item.label}</p>
            <h3 className="text-2xl font-bold text-white my-1">{item.val}</h3>
            <span className="text-[10px] text-slate-500 font-mono">
              [{item.change}]
            </span>
          </GlassCard>
        ))}
      </div>

      {/* Skill Moderation Table */}
      <GlassCard className="overflow-hidden">
        <h3 className="text-xl font-bold text-white p-6 border-b border-white/5">Neural Capability Moderation</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-400">
            <thead className="text-xs uppercase bg-white/5 text-slate-300">
              <tr>
                <th className="px-6 py-4">Author</th>
                <th className="px-6 py-4">Skill Title</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill) => (
                <tr key={skill.id} className="border-b border-white/5 hover:bg-white/2 conscious-row transition-colors">
                  <td className="px-6 py-4 font-mono text-[#FF2D55]">{skill.author?.username}</td>
                  <td className="px-6 py-4">
                    <div className="text-white font-bold">{skill.title}</div>
                    <div className="text-[10px] text-slate-500">{skill.id}</div>
                  </td>
                  <td className="px-6 py-4 text-white">{skill.price} {skill.currency}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      skill.status === 'approved' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                    }`}>
                      {skill.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {skill.status === 'pending' && (
                        <button 
                          onClick={() => handleApprove(skill.id)}
                          className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500 hover:text-white transition-all"
                        >
                          <Check size={16} />
                        </button>
                      )}
                      <button 
                        onClick={() => handleDelete(skill.id)}
                        className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};
