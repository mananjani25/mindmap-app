'use client';
import React from 'react';
import { UserCircle, BookOpen, EnvelopeSimple, Users, Student, DotsThreeOutline, ReadCvLogo, MathOperations, Atom, Palette as PaletteIcon, Code, Book } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

interface StudentInfoCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'accent';
}

const StudentInfoCard = ({ title, value, icon: Icon, color }: StudentInfoCardProps) => (
  <div className="card p-4 rounded-xl shadow-sm flex items-center gap-4">
    <span className={cn('h-12 w-12 flex items-center justify-center rounded-xl text-xl', {
      'bg-[#50C9DA]/10 text-[#50C9DA]': color === 'primary',
      'bg-secondary/10 text-secondary': color === 'secondary',
      'bg-success/10 text-success': color === 'success',
      'bg-warning/10 text-warning': color === 'warning',
      'bg-[#AFCC35]/10 text-[#AFCC35]': color === 'accent'
    })}>
      <Icon weight="bold" />
    </span>
    <div>
      <p className="text-sm text-font-light mb-0">{title}</p>
      <h5 className="font-bold text-xl text-font-title">{value}</h5>
    </div>
  </div>
);

interface DetailedStudentCardProps {
  student: {
    id: string;
    name: string;
    email: string;
    courses: string[];
    status: string;
  };
}

const DetailedStudentCard = ({ student }: DetailedStudentCardProps) => (
  <div className="card p-4 flex items-center justify-between rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 text-gray-500">
        <UserCircle size={24} />
      </div>
      <div>
        <h6 className="font-bold text-sm text-font-title">{student.name}</h6>
        <p className="text-font-light text-xs flex items-center mb-0">
          <EnvelopeSimple size={14} className="mr-1" />
          {student.email}
        </p>
        <div className="flex flex-wrap gap-1 mt-2">
          {student.courses.map((course, index) => (
            <span key={index} className={cn('px-2 py-0.5 text-xs rounded-full bg-light flex items-center', {
              'bg-purple-100 text-purple-700': course === 'Algebra' || course === 'Geometry' || course === 'Calculus',
              'bg-blue-100 text-blue-700': course === 'Physics' || course === 'Chemistry' || course === 'Biology',
              'bg-green-100 text-green-700': course === 'History',
              'bg-red-100 text-red-700': course === 'Art' || course === 'Art History',
              'bg-indigo-100 text-indigo-700': course === 'Computer Science' || course === 'Data Structures',
              'bg-orange-100 text-orange-700': course === 'English Lit' || course === 'Literature',
              'bg-teal-100 text-teal-700': course === 'Economics' || course === 'Philosophy',
            })}>
              {(course === 'Algebra' || course === 'Geometry' || course === 'Calculus') && <MathOperations size={12} className="mr-1" />}
              {(course === 'Physics' || course === 'Chemistry' || course === 'Biology') && <Atom size={12} className="mr-1" />}
              {course === 'History' && <ReadCvLogo size={12} className="mr-1" />}
              {(course === 'Art' || course === 'Art History') && <PaletteIcon size={12} className="mr-1" />}
              {(course === 'Computer Science' || course === 'Data Structures') && <Code size={12} className="mr-1" />}
              {(course === 'English Lit' || course === 'Literature') && <Book size={12} className="mr-1" />}
              {(course === 'Economics' || course === 'Philosophy') && <BookOpen size={12} className="mr-1" />}
              {course}
            </span>
          ))}
        </div>
      </div>
    </div>
    <div className="flex flex-col items-end">
      <span className={cn('px-2 py-0.5 text-xs rounded-xl font-bold', {
        'bg-success/10 text-success': student.status === 'Active',
        'bg-[#50C9DA]/10 text-[#50C9DA]': student.status === 'Inactive',
        'bg-warning/10 text-warning': student.status === 'Suspended',
      })}>
        {student.status}
      </span>
      <p className="text-font-light text-xs mt-1">ID: <span className="text-[#AFCC35] font-medium">{student.id}</span></p>
    </div>
  </div>
);

const StudentList = () => {
  const dummyStudents = [
    {
      id: 'S001',
      name: 'Alice Johnson',
      email: 'alice.j@example.com',
      courses: ['Algebra', 'Physics'],
      status: 'Active',
    },
    {
      id: 'S002',
      name: 'Bob Williams',
      email: 'bob.w@example.com',
      courses: ['History', 'Art'],
      status: 'Active',
    },
    {
      id: 'S003',
      name: 'Charlie Brown',
      email: 'charlie.b@example.com',
      courses: ['Computer Science'],
      status: 'Inactive',
    },
    {
      id: 'S004',
      name: 'Diana Miller',
      email: 'diana.m@example.com',
      courses: ['English Lit', 'Chemistry'],
      status: 'Active',
    },
    {
      id: 'S005',
      name: 'Eve Davis',
      email: 'eve.d@example.com',
      courses: ['Economics'],
      status: 'Suspended',
    },
    {
      id: 'S006',
      name: 'Frank White',
      email: 'frank.w@example.com',
      courses: ['Biology', 'Philosophy'],
      status: 'Active',
    },
    {
      id: 'S007',
      name: 'Grace Taylor',
      email: 'grace.t@example.com',
      courses: ['Algebra', 'Geometry'],
      status: 'Active',
    },
    {
      id: 'S008',
      name: 'Henry Moore',
      email: 'henry.m@example.com',
      courses: ['Physics', 'Calculus'],
      status: 'Inactive',
    },
    {
      id: 'S009',
      name: 'Ivy Hall',
      email: 'ivy.h@example.com',
      courses: ['Art History'],
      status: 'Active',
    },
    {
      id: 'S010',
      name: 'Jack King',
      email: 'jack.k@example.com',
      courses: ['Literature'],
      status: 'Suspended',
    },
  ];

  const activeStudents = dummyStudents.filter(s => s.status === 'Active').length;
  const inactiveStudents = dummyStudents.filter(s => s.status === 'Inactive').length;
  const suspendedStudents = dummyStudents.filter(s => s.status === 'Suspended').length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        <StudentInfoCard
          title="Total Students"
          value={dummyStudents.length}
          icon={Users}
          color="primary"
        />
        <StudentInfoCard
          title="Active Students"
          value={activeStudents}
          icon={Student}
          color="success"
        />
        <StudentInfoCard
          title="Inactive Students"
          value={inactiveStudents}
          icon={UserCircle}
          color="secondary"
        />
        <StudentInfoCard
          title="Suspended Students"
          value={suspendedStudents}
          icon={DotsThreeOutline}
          color="warning"
        />
      </div>

      <div className="card p-6">
        <h5 className="font-bold text-xl mb-4">All Students</h5>
        <div className="space-y-4">
          {dummyStudents.map((student) => (
            <DetailedStudentCard key={student.id} student={student} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentList;
