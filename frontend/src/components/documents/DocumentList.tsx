'use client';
import React from 'react';
import { FileDoc, DotsThreeOutline, BookOpen, FilePpt, FileText, FileXls, FileImage, Calendar } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

const DocumentCard = ({ doc }) => (
  <div className="card p-4 flex flex-col justify-between rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
    <div className="flex justify-between items-center mb-3">
      <div className={cn('w-10 h-10 flex items-center justify-center rounded-xl mr-3', {
        'bg-blue-100 text-blue-700': doc.type === 'PDF',
        'bg-green-100 text-green-700': doc.type === 'DOCX',
        'bg-gray-100 text-gray-500': doc.type === 'TXT',
        'bg-red-100 text-red-700': doc.type === 'PPTX',
        'bg-purple-100 text-purple-700': doc.type === 'XLSX',
        'bg-orange-100 text-orange-700': doc.type === 'PNG',
      })}>
        {doc.type === 'PDF' && <FileDoc size={24} />}
        {doc.type === 'DOCX' && <BookOpen size={24} />}
        {doc.type === 'TXT' && <FileText size={24} />}
        {doc.type === 'PPTX' && <FilePpt size={24} />}
        {doc.type === 'XLSX' && <FileXls size={24} />}
        {doc.type === 'PNG' && <FileImage size={24} />}
      </div>
      <DotsThreeOutline size={20} className="text-font-light cursor-pointer" />
    </div>
    <div>
      <h6 className="font-bold text-sm text-font-title truncate">{doc.name}</h6>
      <p className="text-font-light text-xs">Type: <span style={{ color: '#AFCC35' }}>{doc.type}</span></p>
    </div>
    <div className="flex justify-between items-center mt-3 text-xs text-font-light">
      <span className="text-[#AFCC35] font-medium">{doc.id}</span>
      <span className="flex items-center"><Calendar size={14} className="mr-1" />{doc.uploadDate}</span>
      <span className={cn('px-2 py-0.5 rounded-xl font-bold', {
        'bg-[#AFCC35]/10 text-[#AFCC35]': doc.status === 'Processed',
        'bg-[#50C9DA]/10 text-[#50C9DA]': doc.status === 'Pending',
        'bg-danger/10 text-danger': doc.status === 'Failed',
      })}>
        {doc.status}
      </span>
    </div>
  </div>
);

const DocumentList = () => {
  const dummyDocuments = [
    {
      id: 'D001',
      name: 'Lecture_Notes_Algebra.pdf',
      type: 'PDF',
      uploadDate: '2025-09-25',
      status: 'Processed',
    },
    {
      id: 'D002',
      name: 'Research_Paper_Physics.docx',
      type: 'DOCX',
      uploadDate: '2025-09-24',
      status: 'Pending',
    },
    {
      id: 'D003',
      name: 'History_Essay_Outline.txt',
      type: 'TXT',
      uploadDate: '2025-09-23',
      status: 'Processed',
    },
    {
      id: 'D004',
      name: 'Art_Project_Brief.pptx',
      type: 'PPTX',
      uploadDate: '2025-09-22',
      status: 'Failed',
    },
    {
      id: 'D005',
      name: 'Computer_Science_Algorithm.pdf',
      type: 'PDF',
      uploadDate: '2025-09-21',
      status: 'Processed',
    },
    {
      id: 'D006',
      name: 'English_Poetry_Analysis.docx',
      type: 'DOCX',
      uploadDate: '2025-09-20',
      status: 'Pending',
    },
    {
      id: 'D007',
      name: 'Chemistry_Lab_Report.pdf',
      type: 'PDF',
      uploadDate: '2025-09-19',
      status: 'Processed',
    },
    {
      id: 'D008',
      name: 'Economics_Study_Guide.xlsx',
      type: 'XLSX',
      uploadDate: '2025-09-18',
      status: 'Failed',
    },
    {
      id: 'D009',
      name: 'Biology_Diagrams.png',
      type: 'PNG',
      uploadDate: '2025-09-17',
      status: 'Processed',
    },
    {
      id: 'D010',
      name: 'Philosophy_Reading.pdf',
      type: 'PDF',
      uploadDate: '2025-09-16',
      status: 'Processed',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {dummyDocuments.map((doc) => (
        <DocumentCard key={doc.id} doc={doc} />
      ))}
    </div>
  );
};

export default DocumentList;
