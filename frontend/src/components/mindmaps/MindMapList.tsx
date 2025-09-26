'use client';
import React from 'react';
import { FlowArrow, FileDoc, DotsThreeOutline, Calendar, Brain } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

interface MindMapVisualCardProps {
  mindmap: {
    id: string;
    name: string;
    documentSource: string;
    creationDate: string;
    status: string;
  };
}

const MindMapVisualCard = ({ mindmap }: MindMapVisualCardProps) => (
  <div className="card p-6 flex items-center justify-between rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-white to-light/50 border border-light">
    <div className="flex items-center gap-4">
      <div className={cn('w-16 h-16 flex items-center justify-center rounded-2xl shrink-0', {
        'bg-[#AFCC35]/20 text-[#AFCC35]': mindmap.status === 'Generated',
        'bg-[#50C9DA]/20 text-[#50C9DA]': mindmap.status === 'Draft',
        'bg-danger/20 text-danger': mindmap.status === 'Error',
      })}>
        <Brain size={32} weight="fill" />
      </div>
      <div>
        <h5 className="font-bold text-lg text-font-title mb-1">{mindmap.name}</h5>
        <p className="text-font-light text-sm flex items-center mb-0">
          <FileDoc size={16} className="mr-1 text-font-light" />
          {mindmap.documentSource}
        </p>
        <p className="text-font-light text-xs flex items-center mt-1">
          <Calendar size={14} className="mr-1 text-font-light" />
          Created: {mindmap.creationDate}
        </p>
      </div>
    </div>
    <div className="flex flex-col items-end gap-2">
      <span className="text-[#AFCC35] font-semibold text-sm">{mindmap.id}</span>
      <span className={cn('px-3 py-1 text-xs rounded-full font-bold', {
        'bg-[#AFCC35]/15 text-[#AFCC35]': mindmap.status === 'Generated',
        'bg-[#50C9DA]/15 text-[#50C9DA]': mindmap.status === 'Draft',
        'bg-danger/15 text-danger': mindmap.status === 'Error',
      })}>
        {mindmap.status}
      </span>
      <DotsThreeOutline size={20} className="text-font-light cursor-pointer" />
    </div>
  </div>
);

const MindMapList = () => {
  const dummyMindMaps = [
    {
      id: 'M001',
      name: 'Mind Map: Algebra Basics',
      documentSource: 'Lecture_Notes_Algebra.pdf',
      creationDate: '2025-09-25',
      lastModified: '2025-09-26',
      status: 'Generated',
    },
    {
      id: 'M002',
      name: 'Mind Map: Physics Mechanics Overview',
      documentSource: 'Research_Paper_Physics.docx',
      creationDate: '2025-09-24',
      lastModified: '2025-09-25',
      status: 'Draft',
    },
    {
      id: 'M003',
      name: 'Mind Map: Ancient Civilizations',
      documentSource: 'History_Essay_Outline.txt',
      creationDate: '2025-09-23',
      lastModified: '2025-09-24',
      status: 'Generated',
    },
    {
      id: 'M004',
      name: 'Mind Map: Renaissance Art Movements',
      documentSource: 'Art_Project_Brief.pptx',
      creationDate: '2025-09-22',
      lastModified: '2025-09-23',
      status: 'Error',
    },
    {
      id: 'M005',
      name: 'Mind Map: Data Structures Fundamentals',
      documentSource: 'Computer_Science_Algorithm.pdf',
      creationDate: '2025-09-21',
      lastModified: '2025-09-22',
      status: 'Generated',
    },
    {
      id: 'M006',
      name: 'Mind Map: Shakespearean Themes',
      documentSource: 'English_Poetry_Analysis.docx',
      creationDate: '2025-09-20',
      lastModified: '2025-09-21',
      status: 'Draft',
    },
    {
      id: 'M007',
      name: 'Mind Map: Organic Chemistry Basics',
      documentSource: 'Chemistry_Lab_Report.pdf',
      creationDate: '2025-09-19',
      lastModified: '2025-09-20',
      status: 'Generated',
    },
    {
      id: 'M008',
      name: 'Mind Map: Microeconomics Concepts',
      documentSource: 'Economics_Study_Guide.xlsx',
      creationDate: '2025-09-18',
      lastModified: '2025-09-19',
      status: 'Error',
    },
    {
      id: 'M009',
      name: 'Mind Map: Biology Cell Structure',
      documentSource: 'Biology_Diagrams.png',
      creationDate: '2025-09-17',
      lastModified: '2025-09-18',
      status: 'Generated',
    },
    {
      id: 'M010',
      name: 'Mind Map: Philosophical Schools',
      documentSource: 'Philosophy_Reading.pdf',
      creationDate: '2025-09-16',
      lastModified: '2025-09-17',
      status: 'Generated',
    },
  ];

  return (
    <div className="space-y-6 p-6">
      {dummyMindMaps.map((mindmap) => (
        <MindMapVisualCard key={mindmap.id} mindmap={mindmap} />
      ))}
    </div>
  );
};

export default MindMapList;
