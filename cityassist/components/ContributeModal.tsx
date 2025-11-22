import React, { useState } from 'react';
import { UserUpdate } from '../types';

interface ContributeModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetResourceId?: string;
  onSubmitUpdate?: (resourceId: string, update: UserUpdate) => void;
}

const ContributeModal: React.FC<ContributeModalProps> = ({ isOpen, onClose, targetResourceId, onSubmitUpdate }) => {
  const [type, setType] = useState<'status' | 'general'>('status');
  const [capacity, setCapacity] = useState('Medium');
  const [wait, setWait] = useState('15 mins');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (targetResourceId && onSubmitUpdate) {
        const text = type === 'status' 
            ? `Capacity: ${capacity} • Wait: ${wait}` 
            : notes;

        const update: UserUpdate = {
            type,
            text,
            timestamp: Date.now(),
            user: 'Community User', // Mock user
            meta: type === 'status' ? { capacity, wait } : undefined
        };
        onSubmitUpdate(targetResourceId, update);
    }

    setSubmitted(true);
    setTimeout(() => {
        setSubmitted(false);
        setNotes('');
        onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-fade-in">
        
        {!submitted ? (
            <>
                <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800">
                        {targetResourceId ? 'Update Live Status' : 'General Contribution'}
                    </h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    {targetResourceId ? (
                        <>
                             <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Current Capacity</label>
                                <div className="flex gap-2">
                                    {['Low', 'Medium', 'High', 'Full'].map(opt => (
                                        <button 
                                            key={opt}
                                            type="button"
                                            onClick={() => setCapacity(opt)}
                                            className={`flex-1 py-2 text-xs font-bold rounded-lg border ${capacity === opt ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                             <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Est. Wait Time</label>
                                <select 
                                    value={wait} 
                                    onChange={(e) => setWait(e.target.value)}
                                    className="w-full p-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                    <option>No wait</option>
                                    <option>15 mins</option>
                                    <option>30 mins</option>
                                    <option>1 hour+</option>
                                </select>
                            </div>
                        </>
                    ) : (
                        <p className="text-sm text-slate-600">Select a specific location on the map to provide real-time updates.</p>
                    )}

                    <div>
                         <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Additional Notes</label>
                         <textarea 
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="w-full p-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none h-20 resize-none"
                            placeholder={targetResourceId ? "Any specific needs? (e.g. Needs socks)" : "General feedback..."}
                         />
                    </div>

                    <button 
                        type="submit"
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-lg shadow-blue-200"
                    >
                        Submit Update
                    </button>
                </form>
            </>
        ) : (
            <div className="p-8 text-center space-y-3">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 className="font-bold text-slate-800">Update Live!</h3>
                <p className="text-sm text-slate-600">Thanks for helping the community.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default ContributeModal;