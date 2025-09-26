'use client';

import React from 'react';
import type { User } from '@/types';
import {
  Users, BookOpen, Pulse, FileDoc, FlowArrow, Funnel,Package, Truck, SealCheck, DotsThreeOutline, Star, UserCircleIcon, GlobeSimple, Hash, ChartLineUp, Calendar, Palette as PaletteIcon
} from '@phosphor-icons/react';
import { cn } from '@/lib/utils';


// NOTE: Assumes images are placed in the `public` folder:
// public/avatar/*.png for user avatars
// public/dashboard/education/*.png for test/document icons
// public/world-map.png for the map background
// public/mindmap-placeholder.png for AI mind-map preview

interface DashboardContentProps {
  user: Pick<User, 'firstName' | 'lastName' | 'email' | 'role' | 'avatarUrl'>;
}

export function DashboardContent({ user }: DashboardContentProps) {
  const isAdmin = user.role === 'Admin';
  const isInstructor = user.role === 'Instructor';
  const isStudent = user.role === 'Student';

  return (
    <div className="grid grid-cols-12 gap-6 m-0">
      {/* Column 1: Main Stats & Reports */}
      <div className="col-span-12 xl:col-span-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Stat Cards based on role */}
          {isAdmin && (
            <>
              <StatCard icon={Users} color="primary" title="Total Users" value="1,234" trend="+12%" trendColor="success" timeframe="This Month" chartType="line" />
              <StatCard icon={BookOpen} color="secondary" title="Active Tests" value="56" trend="-5%" trendColor="danger" timeframe="This Week" chartType="line-dashed" />
              <StatCard icon={Pulse} color="success" title="Test Completions" value="789" timeframe="Today" chartType="line" />
              <StatCard icon={FileDoc} color="accent" title="Docs Processed" value="342" trend="+20%" trendColor="success" timeframe="This Month" chartType="bar" />
            </>
          )}
          {isInstructor && (
            <>
              <StatCard icon={BookOpen} color="primary" title="My Tests" value="24" trend="+10%" trendColor="success" timeframe="This Month" chartType="line" />
              <StatCard icon={Users} color="secondary" title="Enrolled Students" value="156" timeframe="Current" chartType="line-dashed" />
              <StatCard icon={Pulse} color="success" title="Test Submissions" value="89" trend="+15%" trendColor="success" timeframe="This Week" chartType="line"/>
              <StatCard icon={FlowArrow} color="warning" title="Mind-Maps" value="12" timeframe="This Month" chartType="bar" />
            </>
          )}
          {isStudent && (
            <>
              <StatCard icon={BookOpen} color="primary" title="Available Tests" value="8" timeframe="Current" chartType="line" />
              <StatCard icon={Pulse} color="success" title="Tests Completed" value="5" trend="+2" trendColor="success" timeframe="This Month" chartType="line" />
              <StatCard icon={FileDoc} color="warning" title="My Documents" value="3" timeframe="Uploaded" chartType="bar" />
              <StatCard icon={FlowArrow} color="secondary" title="Mind-Maps Viewed" value="7" timeframe="This Month" chartType="line-dashed" />
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 ">
            <GeographicDataCard />
            <div className="card col-span-1 lg:col-span-2">
                 <div className="card-header">
                     <h5 className="font-bold">Recent Activity</h5>
                     <p className="text-font-light text-sm">Latest Updates</p>
                 </div>
                 <div className="card-body">
                    <RecentActivityCard userRole={user.role} />
                 </div>
            </div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {isAdmin ? <UserManagementCard /> : <TestResultsCard userRole={user.role} />}
          <CustomerReviewsCard />
        </div>

        <div className="col-span-12 mt-6">
             {isStudent ? <StudentResultsTable /> : <TopTestsCard />}
        </div>
      </div>
      {/* Column 3: Quick Actions & Test History */}
      <div className="col-span-12 xl:col-span-4 space-y-6">
        <QuickActionsCard userRole={user.role} />
        <TestHistoryCard userRole={user.role} />
        <ActiveUsersCard userRole={user.role}/>
      </div>
    </div>
  );
}


// --- UI-Updated Sub-components ---

const StatCard = ({ icon: Icon, color, title, value, trend, trendColor, timeframe, chartType }) => (
    <div className="card rounded-xl overflow-hidden">
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
                    {chartType === 'line' && (
                        <svg width="80" height="30" viewBox="0 0 80 30" className={cn({ 'text-[#50C9DA]': color === 'primary', 'text-success': color === 'success'})}>
                            <path d="M0 20 Q 15 5, 30 20 T 60 15 T 90 10" stroke="currentColor" fill="none" strokeWidth="2.5" />
                        </svg>
                    )}
                    {chartType === 'line-dashed' && (
                        <svg width="80" height="30" viewBox="0 0 80 30" className="text-secondary/50">
                            <path d="M0 20 Q 15 5, 30 20 T 60 15 T 90 10" stroke="currentColor" fill="none" strokeWidth="2.5" strokeDasharray="3 3"/>
                        </svg>
                    )}
                    {chartType === 'bar' && (
                        <div className="flex items-end gap-1 h-[30px]" >
                            <div className="w-1.5 h-[40%] bg-[#AFCC35]/30 rounded-full"></div>
                            <div className="w-1.5 h-[60%] bg-[#AFCC35]/30 rounded-full"></div>
                            <div className="w-1.5 h-[80%] bg-[#AFCC35] rounded-full"></div>
                            <div className="w-1.5 h-[50%] bg-[#AFCC35]/30 rounded-full"></div>
                            <div className="w-1.5 h-[70%] bg-[#AFCC35]/30 rounded-full"></div>
                            <div className="w-1.5 h-[30%] bg-[#AFCC35]/30 rounded-full"></div>
                            <div className="w-1.5 h-[90%] bg-[#AFCC35] rounded-full"></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
);


const ActiveUsersCard = ({ userRole }) => (
    <div className="card">
        <div className="card-body">
            <div className="flex justify-between items-center">
                <h5 className="font-bold text-dark">{userRole === 'Admin' ? 'Active Users' : 'Enrolled Students'}</h5>
                 <DotsThreeOutline size={20} className="text-font-light cursor-pointer"/>
            </div>
            <div className="flex gap-4 mt-1">
                <div className="flex flex-col">
                    <h2 className="text-dark font-extrabold text-5xl leading-tight">{userRole === 'Admin' ? '1.2k' : '156'}</h2>
                    <p className="text-font-light text-sm -mt-1">{userRole === 'Admin' ? 'Active Sessions' : 'Active Students'}</p>
                    <div className="mt-4 flex">
                        <UserCircleIcon size={24} className="h-6 w-6 rounded-xl ring-2 ring-white text-secondary"/>
                        <UserCircleIcon size={24} className="h-6 w-6 rounded-xl ring-2 ring-white -ml-3 text-secondary"/>
                        <UserCircleIcon size={24} className="h-6 w-6 rounded-xl ring-2 ring-white -ml-3 text-secondary"/>
                        <span className="bg-secondary/20 text-secondary-dark h-6 w-6 flex items-center justify-center rounded-xl text-xs font-bold -ml-3 self-center ring-2 ring-white">{userRole === 'Admin' ? '50+' : '10+'}</span>
                    </div>
                </div>
                <div className="card bg-[#50C9DA]/90 flex-grow rounded-xl w-full">
                    <div className="card-body flex flex-col justify-end gap-1 p-3">
                        <div className="h-[120px] w-full flex items-end justify-around gap-1.5">
                            <div className="w-full bg-white/50 rounded-t-md" style={{ height: '60%' }}></div>
                            <div className="w-full bg-white/50 rounded-t-md" style={{ height: '30%' }}></div>
                            <div className="w-full bg-white rounded-t-md" style={{ height: '80%' }}></div>
                            <div className="w-full bg-white/50 rounded-t-md" style={{ height: '50%' }}></div>
                            <div className="w-full bg-white/50 rounded-t-md" style={{ height: '70%' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const GeographicDataCard = () => (
    <div className="card col-span-1 lg:col-span-3">
        <div className="card-body">
             <div className="flex justify-end mb-2">
                <button className="btn btn-sm bg-[#50C9DA]/10 text-[#50C9DA] py-1 px-3 rounded-xl">Details</button>
             </div>
            <div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-xl opacity-80 relative">
              {/* Text Context for the graph */}
              <div className="absolute top-4 left-4 text-left">
                <h5 className="font-bold text-dark">Global Activity</h5>
                <p className="text-sm text-font-light">Track user activity worldwide</p>
              </div>
              {/* Placeholder for the graph */}
              <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#AFCC35" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#AFCC35" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 40 L20 20 L40 35 L60 10 L80 30 L100 15" fill="url(#chartGradient)" stroke="#AFCC35" strokeWidth="1" />
                <path d="M0 40 L20 20 L40 35 L60 10 L80 30 L100 15" fill="none" stroke="#50C9DA" strokeWidth="1" />
              </svg>
            </div>
        </div>
    </div>
);



const TestHistoryCard = ({ userRole }) => (
    <div className="card">
        <div className="card-header">
            <h5 className="font-bold">Test History</h5>
        </div>
        <div className="card-body">
            <ul className="app-timeline-box">
                <TimelineItem icon={Package} color="primary" title="Math Test Assigned" date="Nov 16">
                    <p className="mb-0 text-sm">Order ID #R98056745</p>
                    <p className="text-xs text-font-light">Ships to David Smith</p>
                </TimelineItem>
                <TimelineItem icon={Funnel} color="warning" title="Processing Submissions" date="Est. Nov 18">
                     <p className="mb-0 text-sm">Grading is in progress</p>
                </TimelineItem>
                <TimelineItem icon={Truck} color="success" title="Results Published" date="Est. Nov 18">
                     <p className="mb-0 text-sm">Students have been notified</p>
                </TimelineItem>
                <TimelineItem icon={SealCheck} color="secondary" title="Completed" date="Est. Nov 20">
                     <p className="mb-0 text-sm">Test cycle is now closed</p>
                </TimelineItem>
            </ul>
        </div>
    </div>
);

const TimelineItem = ({ icon: Icon, color, title, date, children }) => (
    <li className="timeline-section">
        <div className="timeline-icon">
            <span className={cn('h-9 w-9 flex items-center justify-center rounded-xl text-white', {
                'bg-[#50C9DA]': color === 'primary', 'bg-warning': color === 'warning',
                'bg-success': color === 'success', 'bg-secondary': color === 'secondary'
            })}>
                <Icon size={18} />
            </span>
        </div>
        <div className="timeline-content">
            <div className="flex justify-between items-center">
                <h6 className="font-semibold mb-0">{title}</h6>
                <p className="text-xs mb-0 text-font-light">{date}</p>
            </div>
            <div className="mt-1">{children}</div>
        </div>
    </li>
);

const UserManagementCard = () => (
  <div className="card">
    <div className="card-header"><h5 className="font-bold">User Management</h5></div>
    <div className="card-body">
      <table className="w-full text-sm text-left">
        <thead className="text-font-light border-b border-border">
          <tr>
            <th className="py-2 font-normal">Name</th>
            <th className="py-2 font-normal">Role</th>
            <th className="py-2 font-normal">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-border">
            <td className="py-3">John Doe</td>
            <td>Instructor</td>
            <td><span className="bg-success/10 text-success px-2 py-0.5 text-xs rounded-xl font-medium">Active</span></td>
          </tr>
          <tr className="border-b border-border">
            <td className="py-3">Jane Smith</td>
            <td>Student</td>
            <td><span className="bg-success/10 text-success px-2 py-0.5 text-xs rounded-xl font-medium">Active</span></td>
          </tr>
           <tr >
            <td className="py-3">Peter Jones</td>
            <td>Student</td>
            <td><span className="bg-danger/10 text-danger px-2 py-0.5 text-xs rounded-xl font-medium">Inactive</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);


const TestResultsCard = ({ userRole }) => (
    <div className="card">
        <div className="card-header"><h5 className="font-bold">{userRole === 'Instructor' ? 'Recent Student Results' : 'Your Recent Results'}</h5></div>
        <div className="card-body space-y-3">
            <ResultItem name="Math Test" score={85} maxScore={100} date="2025-09-20" />
            <ResultItem name="Science Test" score={65} maxScore={100} date="2025-09-18" />
            <ResultItem name="History Test" score={92} maxScore={100} date="2025-09-15" />
        </div>
    </div>
);

const ResultItem = ({ name, score, maxScore, date }) => (
    <div className="flex items-center justify-between p-3 rounded-xl bg-light/50">
        <div>
            <h6 className="font-bold mb-0">{name}</h6>
            <p className="text-font-light text-xs mb-0">{date}</p>
        </div>
        <div className="text-font-title font-bold text-lg">{score}/{maxScore}</div>
    </div>
);


const CustomerReviewsCard = () => (
    <div className="card">
        <div className="card-header">
            <h5 className="font-bold">Customers Review</h5>
            <div className="flex items-center gap-2">
                <div className="flex text-warning">
                    <Star weight="fill" /><Star weight="fill" /><Star weight="fill" /><Star weight="fill" /><Star />
                </div>
                <span className="text-sm font-bold text-warning">(4.50k Review)</span>
            </div>
        </div>
        <div className="card-body space-y-3">
            <ReviewBar rating={5} count={4567} total={12000} color="primary" />
            <ReviewBar rating={4} count={2765} total={12000} color="success" />
            <ReviewBar rating={3} count={1682} total={12000} color="secondary" />
            <ReviewBar rating={2} count={2380} total={12000} color="warning" />
            <ReviewBar rating={1} count={1921} total={12000} color="accent" />
        </div>
    </div>
);

const ReviewBar = ({ rating, count, total, color }) => (
    <div className="flex items-center gap-3 text-sm">
        <span className="font-bold w-4 text-center">{rating}</span>
        <div className="w-full bg-light rounded-full h-2">
            <div className={cn('h-2 rounded-full', {
                'bg-[#50C9DA]': color === 'primary',
                'bg-secondary': color === 'secondary',
                'bg-success': color === 'success',
                'bg-warning': color === 'warning',
                'bg-danger': color === 'danger',
                'bg-[#AFCC35]': color === 'accent'
            })}
            style={{ width: `${(count / total) * 100}%` }}></div>
        </div>
        <span className="text-font-light text-xs w-12 text-right">({count.toLocaleString()})</span>
    </div>
);


const RecentActivityCard = ({ userRole }) => (
  <div className="text-sm">
    <ul className="space-y-4">
      <li className="flex gap-3 items-start">
        <div className="bg-[#50C9DA]/10 text-[#50C9DA] h-8 w-8 rounded-xl flex items-center justify-center shrink-0"><BookOpen size={16}/></div>
        <div>
          <p className="font-bold mb-0">{userRole === 'Instructor' ? 'You created Math Test' : 'Math Test assigned'}</p>
          <p className="text-font-light text-xs">2025-09-25</p>
        </div>
      </li>
       <li className="flex gap-3 items-start">
        <div className="bg-warning/10 text-warning h-8 w-8 rounded-full flex items-center justify-center shrink-0"><FileDoc size={16}/></div>
        <div>
          <p className="font-bold mb-0">Lecture_Notes.pdf uploaded</p>
          <p className="text-font-light text-xs">2025-09-24</p>
        </div>
      </li>
       <li className="flex gap-3 items-start">
        <div className="bg-[#AFCC35]/10 text-[#AFCC35] h-8 w-8 rounded-xl flex items-center justify-center shrink-0"><FlowArrow size={16}/></div>
        <div>
          <p className="font-bold mb-0">Mind-Map for Lecture_Notes.pdf</p>
          <p className="text-font-light text-xs">2025-09-24</p>
        </div>
      </li>
    </ul>
  </div>
);


const QuickActionsCard = ({ userRole }) => (
    <div className="card text-center">
        <div className="card-body">
            <UserCircleIcon size={64} className="w-16 h-16 rounded-xl mx-auto text-secondary" />
            <h4 className="font-bold text-dark mt-3">Quick Actions</h4>
            <p className="text-sm text-font-light">{userRole === 'Instructor' ? 'Manage your tests and documents' : 'Access your tests and mind-maps'}</p>
            <div className="space-y-2 mt-4">
                {userRole !== 'Student' && <button className="btn bg-[#50C9DA] text-white w-full rounded-xl py-2.5">Create Test</button>}
                <button className="btn bg-[#AFCC35] text-white w-full rounded-xl py-2.5">Upload Document</button>
                {userRole === 'Student' && <button className="btn bg-secondary text-white w-full rounded-xl py-2.5">Take Test</button>}
            </div>
        </div>
    </div>
);

const TopTestsCard = () => {
  const tests = [
    { img: 'test-icon.png', name: 'Math Test', count: 25, id: '#T123', status: 'DELIVERED', date: 'Dec 12' },
    { img: 'test-icon.png', name: 'Science Test', count: 18, id: '#T124', status: 'CANCELLED', date: 'Mar 27' },
    { img: 'test-icon.png', name: 'History Test', count: 30, id: '#T125', status: 'DELIVERED', date: 'Jul 06' },
    { img: 'test-icon.png', name: 'Art Test', count: 15, id: '#T126', status: 'PICKUPS', date: 'May 21' },
  ];
  return (
    <div className="card h-full">
      <div className="card-header flex justify-between items-center">
        <div>
            <h5 className="font-bold">Top Tests</h5>
            <p className="text-font-light text-sm mb-0">Latest 1H Report</p>
        </div>
        <Funnel size={20} className="text-font-light cursor-pointer"/>
      </div>
      <div className="card-body !pt-0">
        <table className="w-full text-sm text-left">
          <thead className="text-font-light">
            <tr className="border-b border-border">
              <th className="py-3 font-normal">Test</th>
              <th className="py-3 font-normal text-center">Submissions</th>
              <th className="py-3 font-normal text-center">Status</th>
              <th className="py-3 font-normal text-right">Date</th>
            </tr>
          </thead>
          <tbody>
            {tests.map(t => (
              <tr key={t.id} className="border-b border-border">
                <td className="py-3">
                   <div className="flex items-center">
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#AFCC35]/10 text-[#AFCC35]">
                      <BookOpen size={24} />
                    </div>
                    <div className="ml-3">
                      <h6 className="font-bold mb-0 text-sm">{t.name}</h6>
                    </div>
                  </div>
                </td>
                <td className="text-font-secondary text-center">{t.count}</td>
                <td className="text-center">
                   <span className={cn('px-3 py-1 text-xs rounded-xl font-bold', {
                    'bg-success/10 text-success': t.status === 'DELIVERED',
                    'bg-danger/10 text-danger': t.status === 'CANCELLED',
                    'bg-info/10 text-info': t.status === 'PICKUPS',
                  })}>
                    {t.status}
                  </span>
                </td>
                <td className="text-font-title font-medium text-right">{t.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


const StudentResultsTable = () => {
    const results = [
    { id: '#R123', name: 'Math Test', score: '85/100', status: 'COMPLETED', date: '2025-09-20' },
    { id: '#R124', name: 'Science Test', score: '65/100', status: 'COMPLETED', date: '2025-09-18' },
    { id: '#R125', name: 'History Test', score: 'N/A', status: 'IN PROGRESS', date: '2025-09-25' },
    { id: '#R126', name: 'Art Test', score: 'N/A', status: 'PENDING', date: '2025-09-28' },
  ];
  return (
    <div className="card h-full">
      <div className="card-header">
        <h5 className="font-bold">Your Results</h5>
      </div>
      <div className="card-body">
        <table className="w-full text-sm text-left">
          <thead className="text-font-light">
            <tr>
              <th className="py-3 font-normal"><Hash size={16} className="text-font-light mr-2"/> ID</th>
              <th className="py-3 font-normal"><ChartLineUp size={16} className="text-font-light mr-2"/> Test</th>
              <th className="py-3 font-normal"><PaletteIcon size={16} className="text-font-light mr-2"/> Score</th>
              <th className="py-3 font-normal"><Calendar size={16} className="text-font-light mr-2"/> Status</th>
              <th className="py-3 font-normal text-right"><Calendar size={16} className="text-font-light mr-2"/> Date</th>
            </tr>
          </thead>
          <tbody>
            {results.map(r => (
              <tr key={r.id} className="border-t border-border">
                <td className="py-3 text-[#50C9DA] font-medium"><Hash size={16}/>{r.id}</td>
                <td><h6 className="font-bold mb-0 text-sm">{r.name}</h6></td>
                <td>{r.score}</td>
                <td>
                  <span className={cn('px-2 py-1 text-xs rounded-xl font-bold', {
                    'bg-success/10 text-success': r.status === 'COMPLETED',
                    'bg-info/10 text-info': r.status === 'IN PROGRESS',
                    'bg-warning/10 text-warning': r.status === 'PENDING',
                  })}>
                    {r.status}
                  </span>
                </td>
                <td className="text-right"><Calendar size={16}/>{r.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};