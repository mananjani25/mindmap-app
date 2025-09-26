'use client';
import React from 'react';
import { BookOpen, Pulse, FileDoc, Star } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

interface ResultItemProps {
  name: string;
  score: number;
  maxScore: number;
  date: string;
  status: string;
}

const ResultItem = ({ name, score, maxScore, date, status }: ResultItemProps) => (
  <div className="flex items-center justify-between p-3 rounded-xl bg-light/50 shadow-sm">
    <div>
      <h6 className="font-bold mb-0 text-font-title">{name}</h6>
      <p className="text-font-light text-xs mb-0">{date}</p>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-font-title font-bold text-lg">{score}/{maxScore}</span>
      <span className={cn('px-2 py-1 text-xs rounded-xl font-bold', {
        'bg-[#AFCC35]/10 text-[#AFCC35]': status === 'Completed',
        'bg-[#50C9DA]/10 text-[#50C9DA]': status === 'Pending',
        'bg-danger/10 text-danger': status === 'Failed',
      })}>
        {status}
      </span>
    </div>
  </div>
);

interface StatCardProps {
  icon: React.ElementType;
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'accent';
  title: string;
  value: string;
  trend?: string;
  trendColor?: 'success' | 'danger';
  timeframe: string;
}

const StatCard = ({ icon: Icon, color, title, value, trend, trendColor, timeframe }: StatCardProps) => (
  <div className="card rounded-xl overflow-hidden shadow-sm">
    <div className="card-body">
      <div className="flex justify-between items-start">
        <span className={cn('h-11 w-11 flex items-center justify-center rounded-xl text-xl', {
          'bg-[#50C9DA]/10 text-[#50C9DA]': color === 'primary',
          'bg-secondary/10 text-secondary': color === 'secondary',
          'bg-success/10 text-success': color === 'success',
          'bg-warning/10 text-warning': color === 'warning',
          'bg-[#AFCC35]/10 text-[#AFCC35]': color === 'accent'
        })}>
          <Icon weight="bold" />
        </span>
        <div className="text-xs text-font-light text-right">{timeframe}</div>
      </div>
      <div className="mt-2">
        <p className="text-sm text-font-light mb-0">{title}</p>
        <div className="flex justify-between items-end">
          <h5 className="font-bold text-2xl text-font-title">{value} {trend && <span className={cn('text-xs font-medium align-middle', {
            'text-danger': trendColor === 'danger', 'text-success': trendColor === 'success'
          })}>{trend}</span>}</h5>
        </div>
      </div>
    </div>
  </div>
);

const ResultsDisplay = () => {
  const overallResults = {
    testsCompleted: 15,
    averageScore: 82,
    highestScore: 98,
    lowestScore: 65,
  };

  const recentResults = [
    {
      id: 'R001',
      name: 'Advanced Calculus Test',
      score: 92,
      maxScore: 100,
      date: '2025-09-28',
      status: 'Completed',
    },
    {
      id: 'R002',
      name: 'Quantum Physics Midterm',
      score: 78,
      maxScore: 100,
      date: '2025-09-26',
      status: 'Completed',
    },
    {
      id: 'R003',
      name: 'World History Final',
      score: 85,
      maxScore: 100,
      date: '2025-09-25',
      status: 'Completed',
    },
    {
      id: 'R004',
      name: 'Art History Quiz',
      score: 60,
      maxScore: 100,
      date: '2025-09-23',
      status: 'Failed',
    },
    {
      id: 'R005',
      name: 'Data Structures Exam',
      score: 98,
      maxScore: 100,
      date: '2025-09-20',
      status: 'Completed',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={BookOpen}
          color="primary"
          title="Tests Completed"
          value={overallResults.testsCompleted.toString()}
          timeframe="All Time"
        />
        <StatCard
          icon={Pulse}
          color="accent"
          title="Average Score"
          value={`${overallResults.averageScore}%`}
          timeframe="All Time"
          trend="+3%"
          trendColor="success"
        />
        <StatCard
          icon={Star}
          color="warning"
          title="Highest Score"
          value={`${overallResults.highestScore}%`}
          timeframe="All Time"
        />
        <StatCard
          icon={FileDoc}
          color="danger"
          title="Lowest Score"
          value={`${overallResults.lowestScore}%`}
          timeframe="All Time"
        />
      </div>

      <div className="card p-6">
        <h5 className="font-bold text-xl mb-4">Recent Test Breakdown</h5>
        <div className="space-y-4">
          {recentResults.map((result) => (
            <ResultItem key={result.id} {...result} />
          ))}
        </div>
      </div>

      {/* A simple progress bar for overall performance */}
      <div className="card p-6">
        <h5 className="font-bold text-xl mb-4">Overall Progress</h5>
        <div className="w-full bg-light rounded-full h-4 mb-2">
          <div
            className="bg-[#AFCC35] h-4 rounded-full"
            style={{ width: `${overallResults.averageScore}%` }}
          ></div>
        </div>
        <p className="text-sm text-font-light text-right">{overallResults.averageScore}% Average Score</p>
      </div>
    </div>
  );
};

export default ResultsDisplay;
