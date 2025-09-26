'use client';
import React from 'react';
import { BookOpen, Calendar, Hash, Barbell, Flask, Palette, ChartLineUp, Users, DotsThreeOutline } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

const TestList = () => {
  const dummyTests = [
    {
      id: 'T001',
      name: 'Introduction to Algebra',
      type: 'Math',
      score: '85/100',
      status: 'COMPLETED',
      date: '2025-09-20',
      submissions: 120,
    },
    {
      id: 'T002',
      name: 'Physics I - Mechanics',
      type: 'Science',
      score: 'N/A',
      status: 'IN PROGRESS',
      date: '2025-09-22',
      submissions: 90,
    },
    {
      id: 'T003',
      name: 'World History: Ancient Civilizations',
      type: 'History',
      score: '92/100',
      status: 'COMPLETED',
      date: '2025-09-18',
      submissions: 150,
    },
    {
      id: 'T004',
      name: 'Art Appreciation: Renaissance',
      type: 'Art',
      score: 'N/A',
      status: 'PENDING',
      date: '2025-09-28',
      submissions: 70,
    },
    {
      id: 'T005',
      name: 'Computer Science: Data Structures',
      type: 'Computer Science',
      score: '78/100',
      status: 'COMPLETED',
      date: '2025-09-15',
      submissions: 110,
    },
    {
      id: 'T006',
      name: 'English Literature: Shakespeare',
      type: 'English',
      score: 'N/A',
      status: 'IN PROGRESS',
      date: '2025-09-26',
      submissions: 80,
    },
    {
      id: 'T007',
      name: 'Chemistry: Organic Compounds',
      type: 'Science',
      score: '90/100',
      status: 'COMPLETED',
      date: '2025-09-19',
      submissions: 130,
    },
    {
      id: 'T008',
      name: 'Economics: Microeconomics',
      type: 'Social Studies',
      score: 'N/A',
      status: 'PENDING',
      date: '2025-09-30',
      submissions: 60,
    },
  ];

  return (
    <div className="card p-6">
      <table className="min-w-full text-left text-sm">
        <thead>
         
        </thead>
        <tbody>
          {dummyTests.map((test) => (
            <tr key={test.id} className="border-b border-border last:border-b-0">
              <td className="py-3 text-[#AFCC35] font-medium flex items-center"><Hash size={16} className="mr-2 text-font-light" />{test.id}</td>
              <td className="py-3 font-bold text-sm flex items-center">
                <span className={cn('w-8 h-8 flex items-center justify-center rounded-xl mr-3', {
                  'bg-purple-100 text-purple-700': test.type === 'Math',
                  'bg-blue-100 text-blue-700': test.type === 'Science',
                  'bg-green-100 text-green-700': test.type === 'History',
                  'bg-red-100 text-red-700': test.type === 'Art',
                  'bg-indigo-100 text-indigo-700': test.type === 'Computer Science',
                  'bg-orange-100 text-orange-700': test.type === 'English',
                  'bg-teal-100 text-teal-700': test.type === 'Social Studies',
                })}>
                  {test.type === 'Math' && <BookOpen size={20} />}
                  {test.type === 'Science' && <Flask size={20} />}
                  {test.type === 'History' && <BookOpen size={20} />}
                  {test.type === 'Art' && <Palette size={20} />}
                  {test.type === 'Computer Science' && <Barbell size={20} />}
                  {test.type === 'English' && <BookOpen size={20} />}
                  {test.type === 'Social Studies' && <Users size={20} />}
                </span>
                {test.name}
              </td>
              <td className="py-3" style={{ color: '#AFCC35' }}>{test.type}</td>
              <td className="py-3" style={{ color: '#AFCC35' }}>{test.score}</td>
              <td className="py-3">
                <span className={`px-2 py-1 text-xs rounded-xl font-bold ${
                  test.status === 'COMPLETED' ? 'bg-[#AFCC35]/10 text-[#AFCC35]' :
                  test.status === 'IN PROGRESS' ? 'bg-[#50C9DA]/10 text-[#50C9DA]' :
                  'bg-warning/10 text-warning'
                }`}>
                  {test.status}
                </span>
              </td>
              <td className="py-3 text-right">{test.date}</td>
              <td className="py-3 text-right">{test.submissions}</td>
              <td className="py-3 text-right"><DotsThreeOutline size={20} className="text-font-light cursor-pointer"/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TestList;
