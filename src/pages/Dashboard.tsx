import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertCircleIcon,
  BellIcon,
  CalendarIcon,
  CheckCircleIcon,
  CheckSquareIcon,
  ClockIcon,
  FileIcon,
  FolderIcon,
  GitBranchIcon,
  InfoIcon,
  PackageIcon,
  SearchIcon,
  SendIcon,
  Share2Icon,
  StarIcon,
  UserIcon,
  BarChart3Icon,
} from 'lucide-react';
import { LeftRail } from '../components/LeftRail';
import { DetailSlidePanel, type DetailPanelData, type DetailPanelObjectType } from '../components/DetailSlidePanel';
import {
  mockFavourites,
  mockNotifications,
  mockRecentActivity,
  mockSharedItems,
  mockTodos,
  type FavouriteItem,
  type FavouriteType,
  type NotificationItem,
  type NotificationSeverity,
  type RecentActivityItem,
  type SharedItem,
  type SharedItemType,
  type TodoItem,
  type TodoPriority,
  type TodoStatus,
} from '../data/mockDashboard';

type DashboardSection = 'overview' | 'todo' | 'notifications' | 'recent' | 'shared' | 'favourites';

function relativeTime(ts: string): string {
  const diff = Date.now() - new Date(ts).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function formatDate(ds: string): string {
  return new Date(ds).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

const todoStatusColors: Record<TodoStatus, string> = {
  Overdue: 'bg-red-50 text-red-700 border-red-200',
  'Due Today': 'bg-amber-50 text-amber-700 border-amber-200',
  'Due Soon': 'bg-yellow-50 text-yellow-700 border-yellow-200',
  Pending: 'bg-neutral-100 text-neutral-600 border-neutral-200',
};

const todoPriorityColors: Record<TodoPriority, string> = {
  High: 'bg-red-500',
  Medium: 'bg-amber-400',
  Low: 'bg-neutral-300',
};

const notifSeverityConfig: Record<NotificationSeverity, { color: string; icon: React.ElementType }> = {
  'Action Required': { color: 'text-red-600 bg-red-50', icon: AlertCircleIcon },
  Warning: { color: 'text-amber-600 bg-amber-50', icon: AlertCircleIcon },
  Info: { color: 'text-[#0461BA] bg-[#E8F1FB]', icon: InfoIcon },
};

const sharedTypeConfig: Record<SharedItemType, { icon: React.ElementType; color: string }> = {
  document: { icon: FileIcon, color: 'text-[#0461BA] bg-[#E8F1FB]' },
  folder: { icon: FolderIcon, color: 'text-neutral-600 bg-neutral-100' },
  search: { icon: SearchIcon, color: 'text-cyan-700 bg-cyan-50' },
  report: { icon: BarChart3Icon, color: 'text-indigo-700 bg-indigo-50' },
};

const favTypeConfig: Record<FavouriteType, { icon: React.ElementType; color: string }> = {
  document: { icon: FileIcon, color: 'text-[#0461BA] bg-[#E8F1FB]' },
  folder: { icon: FolderIcon, color: 'text-neutral-600 bg-neutral-100' },
  package: { icon: PackageIcon, color: 'text-rose-700 bg-rose-50' },
  report: { icon: BarChart3Icon, color: 'text-indigo-700 bg-indigo-50' },
  search: { icon: SearchIcon, color: 'text-cyan-700 bg-cyan-50' },
};

const activityTypeConfig: Record<string, { icon: React.ElementType; color: string }> = {
  document: { icon: FileIcon, color: 'text-[#0461BA] bg-[#E8F1FB]' },
  transmittal: { icon: SendIcon, color: 'text-violet-700 bg-violet-50' },
  review: { icon: CheckCircleIcon, color: 'text-emerald-700 bg-emerald-50' },
  workflow: { icon: GitBranchIcon, color: 'text-amber-700 bg-amber-50' },
  package: { icon: PackageIcon, color: 'text-rose-700 bg-rose-50' },
};

const docStatusColors: Record<string, string> = {
  Draft: 'bg-secondary-50 text-secondary-700 border-secondary-200',
  'In Review': 'bg-warning-50 text-warning-700 border-warning-200',
  Approved: 'bg-success-50 text-success-700 border-success-200',
  Superseded: 'bg-plum-50 text-plum-700 border-plum-200',
  Archived: 'bg-neutral-100 text-neutral-600 border-neutral-200',
};

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-2.5 py-1 rounded-full border font-medium transition-colors whitespace-nowrap ${
        active
          ? 'bg-[#0461BA] text-white border-[#0461BA]'
          : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400 hover:text-neutral-800'
      }`}
    >
      {label}
    </button>
  );
}

function SectionHeader({
  title,
  subtitle,
  filters,
  activeFilter,
  onFilterChange,
}: {
  title: string;
  subtitle: string;
  filters: string[];
  activeFilter: string;
  onFilterChange: (value: string) => void;
}) {
  return (
    <div className="border-b border-neutral-100 px-4 py-3">
      <h2 className="text-base font-semibold text-neutral-900">{title}</h2>
      <p className="text-xs text-neutral-500 mt-0.5">{subtitle}</p>
      {filters.length > 1 && (
        <div className="flex items-center gap-1.5 mt-3 overflow-x-auto scrollbar-hide">
          {filters.map((f) => (
            <FilterChip key={f} label={f} active={activeFilter === f} onClick={() => onFilterChange(f)} />
          ))}
        </div>
      )}
    </div>
  );
}

const TODO_FILTERS = ['All', 'Overdue', 'Due Today', 'Due Soon', 'High Priority', 'Review', 'Approval', 'Transmittal'];
const NOTIF_FILTERS = ['All', 'Unread', 'Action Required', 'Warning', 'Info', 'Review', 'Transmittal', 'Document'];
const ACTIVITY_FILTERS = ['All', 'Document', 'Review', 'Transmittal', 'Workflow', 'Package'];
const SHARED_FILTERS = ['All', 'Documents', 'Folders', 'Searches', 'Reports'];
const FAV_FILTERS = ['All', 'Documents', 'Folders', 'Packages', 'Reports', 'Searches'];

function OverviewPane({
  overdueTodos,
  unreadNotifs,
  onSelectSection,
}: {
  overdueTodos: number;
  unreadNotifs: number;
  onSelectSection: (section: DashboardSection) => void;
}) {
  const dueToday = mockTodos.filter((t) => t.status === 'Due Today').length;
  const sharedCount = mockSharedItems.length;
  const favCount = mockFavourites.length;

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 border-b border-neutral-100">
        <h2 className="text-base font-semibold text-neutral-900">Highlights</h2>
        <p className="text-xs text-neutral-500 mt-0.5">Your key actions and updates at a glance</p>
      </div>

      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3 border-b border-neutral-100">
        <button
          onClick={() => onSelectSection('todo')}
          className="text-left rounded-lg border border-red-100 bg-red-50/60 p-3 hover:bg-red-50 transition-colors"
        >
          <div className="flex items-center gap-2 text-red-700 text-xs font-semibold uppercase tracking-wide">
            <AlertCircleIcon size={12} />
            Overdue
          </div>
          <div className="mt-1 text-2xl font-bold text-red-800">{overdueTodos}</div>
          <p className="text-xs text-red-700">Actions need attention</p>
        </button>
        <button
          onClick={() => onSelectSection('notifications')}
          className="text-left rounded-lg border border-[#D5E6F8] bg-[#EEF5FD] p-3 hover:bg-[#E8F1FB] transition-colors"
        >
          <div className="flex items-center gap-2 text-[#0461BA] text-xs font-semibold uppercase tracking-wide">
            <BellIcon size={12} />
            Unread
          </div>
          <div className="mt-1 text-2xl font-bold text-[#035299]">{unreadNotifs}</div>
          <p className="text-xs text-[#0461BA]">New notifications</p>
        </button>
        <button
          onClick={() => onSelectSection('todo')}
          className="text-left rounded-lg border border-amber-100 bg-amber-50/60 p-3 hover:bg-amber-50 transition-colors"
        >
          <div className="flex items-center gap-2 text-amber-700 text-xs font-semibold uppercase tracking-wide">
            <CalendarIcon size={12} />
            Due Today
          </div>
          <div className="mt-1 text-2xl font-bold text-amber-800">{dueToday}</div>
          <p className="text-xs text-amber-700">Tasks scheduled for today</p>
        </button>
        <button
          onClick={() => onSelectSection('shared')}
          className="text-left rounded-lg border border-neutral-200 bg-white p-3 hover:bg-neutral-50 transition-colors"
        >
          <div className="flex items-center gap-2 text-neutral-600 text-xs font-semibold uppercase tracking-wide">
            <Share2Icon size={12} />
            Shared With Me
          </div>
          <div className="mt-1 text-2xl font-bold text-neutral-800">{sharedCount}</div>
          <p className="text-xs text-neutral-500">Recent shared content</p>
        </button>
      </div>

      <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <section className="rounded-lg border border-neutral-200 bg-white overflow-hidden">
          <div className="px-3 py-2 border-b border-neutral-100 flex items-center justify-between">
            <span className="text-sm font-semibold text-neutral-800">Top To Do Items</span>
            <button onClick={() => onSelectSection('todo')} className="text-xs text-[#0461BA] font-medium">View all</button>
          </div>
          <div className="divide-y divide-neutral-50">
            {mockTodos.slice(0, 3).map((t) => (
              <div key={t.id} className="px-3 py-2.5">
                <p className="text-sm text-neutral-800 line-clamp-1">{t.title}</p>
                <p className="text-xs text-neutral-500 mt-0.5">{t.project}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-neutral-200 bg-white overflow-hidden">
          <div className="px-3 py-2 border-b border-neutral-100 flex items-center justify-between">
            <span className="text-sm font-semibold text-neutral-800">Recent Notifications</span>
            <button onClick={() => onSelectSection('notifications')} className="text-xs text-[#0461BA] font-medium">View all</button>
          </div>
          <div className="divide-y divide-neutral-50">
            {mockNotifications.slice(0, 3).map((n) => (
              <div key={n.id} className="px-3 py-2.5">
                <p className="text-sm text-neutral-800 line-clamp-1">{n.title}</p>
                <p className="text-xs text-neutral-500 mt-0.5">{relativeTime(n.timestamp)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-neutral-200 bg-white overflow-hidden lg:col-span-2">
          <div className="px-3 py-2 border-b border-neutral-100 flex items-center justify-between">
            <span className="text-sm font-semibold text-neutral-800">Favourite Items</span>
            <button onClick={() => onSelectSection('favourites')} className="text-xs text-[#0461BA] font-medium">View all</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-50">
            {mockFavourites.slice(0, 3).map((f) => (
              <div key={f.id} className="px-3 py-2.5">
                <p className="text-sm text-neutral-800 line-clamp-1">{f.name}</p>
                <p className="text-xs text-neutral-500 mt-0.5">{f.project}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="px-4 pb-4">
        <p className="text-xs text-neutral-500">You currently have {favCount} favourites saved across projects.</p>
      </div>
    </div>
  );
}

function DashboardContent({
  section,
  openPanel,
}: {
  section: DashboardSection;
  openPanel: (data: DetailPanelData) => void;
}) {
  const [todoFilter, setTodoFilter] = useState('All');
  const [notifFilter, setNotifFilter] = useState('All');
  const [recentFilter, setRecentFilter] = useState('All');
  const [sharedFilter, setSharedFilter] = useState('All');
  const [favFilter, setFavFilter] = useState('All');

  const todoFiltered = useMemo(() => {
    return mockTodos.filter((t) => {
      if (todoFilter === 'All') return true;
      if (todoFilter === 'Overdue') return t.status === 'Overdue';
      if (todoFilter === 'Due Today') return t.status === 'Due Today';
      if (todoFilter === 'Due Soon') return t.status === 'Due Soon';
      if (todoFilter === 'High Priority') return t.priority === 'High';
      if (todoFilter === 'Review') return t.category === 'Review';
      if (todoFilter === 'Approval') return t.category === 'Approval';
      if (todoFilter === 'Transmittal') return t.category === 'Transmittal';
      return true;
    });
  }, [todoFilter]);

  const notifFiltered = useMemo(() => {
    return mockNotifications.filter((n) => {
      if (notifFilter === 'All') return true;
      if (notifFilter === 'Unread') return !n.isRead;
      if (notifFilter === 'Action Required') return n.severity === 'Action Required';
      if (notifFilter === 'Warning') return n.severity === 'Warning';
      if (notifFilter === 'Info') return n.severity === 'Info';
      if (notifFilter === 'Review') return n.category === 'Review';
      if (notifFilter === 'Transmittal') return n.category === 'Transmittal';
      if (notifFilter === 'Document') return n.category === 'Document';
      return true;
    });
  }, [notifFilter]);

  const recentFiltered = useMemo(() => {
    return mockRecentActivity.filter((a) => {
      if (recentFilter === 'All') return true;
      return a.category === recentFilter;
    });
  }, [recentFilter]);

  const sharedFiltered = useMemo(() => {
    return mockSharedItems.filter((s) => {
      if (sharedFilter === 'All') return true;
      if (sharedFilter === 'Documents') return s.type === 'document';
      if (sharedFilter === 'Folders') return s.type === 'folder';
      if (sharedFilter === 'Searches') return s.type === 'search';
      if (sharedFilter === 'Reports') return s.type === 'report';
      return true;
    });
  }, [sharedFilter]);

  const favFiltered = useMemo(() => {
    return mockFavourites.filter((f) => {
      if (favFilter === 'All') return true;
      if (favFilter === 'Documents') return f.type === 'document';
      if (favFilter === 'Folders') return f.type === 'folder';
      if (favFilter === 'Packages') return f.type === 'package';
      if (favFilter === 'Reports') return f.type === 'report';
      if (favFilter === 'Searches') return f.type === 'search';
      return true;
    });
  }, [favFilter]);

  const toTodoDetail = (t: TodoItem): DetailPanelData => ({
    objectType: t.objectType as DetailPanelObjectType,
    objectId: t.objectId,
    title: t.title,
    project: t.project,
    status: t.status,
    description: t.description,
    dueDate: t.dueDate,
    assignedBy: t.assignedBy,
    assignedTo: 'You',
  });

  const toNotifDetail = (n: NotificationItem): DetailPanelData => ({
    objectType: n.objectType as DetailPanelObjectType,
    objectId: n.objectId,
    title: n.title,
    project: n.project,
    description: n.description,
  });

  const toRecentDetail = (a: RecentActivityItem): DetailPanelData => ({
    objectType: a.objectType as DetailPanelObjectType,
    objectId: a.objectId,
    title: a.action,
    project: a.project,
    description: a.description,
  });

  const toSharedDetail = (s: SharedItem): DetailPanelData => ({
    objectType: s.type as DetailPanelObjectType,
    objectId: s.objectId,
    title: s.name,
    project: s.project,
    description: s.description,
    sharedBy: s.sharedBy,
    sharedAt: s.sharedAt,
  });

  const toFavDetail = (f: FavouriteItem): DetailPanelData => ({
    objectType: f.type as DetailPanelObjectType,
    objectId: f.objectId,
    title: f.name,
    project: f.project,
    status: f.status,
    description: f.description,
  });

  if (section === 'todo') {
    return (
      <div className="h-full flex flex-col">
        <SectionHeader
          title="To Do"
          subtitle={`${todoFiltered.length} actions in view`}
          filters={TODO_FILTERS}
          activeFilter={todoFilter}
          onFilterChange={setTodoFilter}
        />
        <div className="flex-1 overflow-y-auto divide-y divide-neutral-50">
          {todoFiltered.map((t) => (
            <button
              key={t.id}
              onClick={() => openPanel(toTodoDetail(t))}
              className="w-full text-left flex items-start gap-3 px-4 py-3 hover:bg-neutral-50 transition-colors group"
            >
              <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${todoPriorityColors[t.priority]}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-800 group-hover:text-[#0461BA] line-clamp-1">{t.title}</p>
                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${todoStatusColors[t.status]}`}>{t.status}</span>
                  <span className="text-xs text-neutral-400">{t.category}</span>
                  <span className="text-xs text-neutral-400">·</span>
                  <span className="text-xs text-neutral-400">{t.project}</span>
                </div>
              </div>
              <span className="text-xs text-neutral-400 mt-0.5">{formatDate(t.dueDate)}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (section === 'notifications') {
    return (
      <div className="h-full flex flex-col">
        <SectionHeader
          title="Notifications"
          subtitle={`${notifFiltered.length} notifications in view`}
          filters={NOTIF_FILTERS}
          activeFilter={notifFilter}
          onFilterChange={setNotifFilter}
        />
        <div className="flex-1 overflow-y-auto divide-y divide-neutral-50">
          {notifFiltered.map((n) => {
            const cfg = notifSeverityConfig[n.severity];
            const SIcon = cfg.icon;
            return (
              <button
                key={n.id}
                onClick={() => openPanel(toNotifDetail(n))}
                className={`w-full text-left flex items-start gap-3 px-4 py-3 hover:bg-neutral-50 transition-colors group ${!n.isRead ? 'bg-[#F4F9FF]' : ''}`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${cfg.color}`}>
                  <SIcon size={12} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-800 group-hover:text-[#0461BA] line-clamp-1">{n.title}</p>
                  <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">{n.description}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-neutral-400">{n.project}</span>
                    <span className="text-xs text-neutral-400">·</span>
                    <span className="text-xs text-neutral-400">{relativeTime(n.timestamp)}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (section === 'recent') {
    return (
      <div className="h-full flex flex-col">
        <SectionHeader
          title="Recent Notifications"
          subtitle={`${recentFiltered.length} recent updates in view`}
          filters={ACTIVITY_FILTERS}
          activeFilter={recentFilter}
          onFilterChange={setRecentFilter}
        />
        <div className="flex-1 overflow-y-auto divide-y divide-neutral-50">
          {recentFiltered.map((a) => {
            const cfg = activityTypeConfig[a.objectType] ?? activityTypeConfig.document;
            const AIcon = cfg.icon;
            return (
              <button
                key={a.id}
                onClick={() => openPanel(toRecentDetail(a))}
                className="w-full text-left flex items-start gap-3 px-4 py-3 hover:bg-neutral-50 transition-colors group"
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${cfg.color}`}>
                  <AIcon size={12} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-800 group-hover:text-[#0461BA] line-clamp-1">{a.action}</p>
                  <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">{a.description}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-neutral-400">{a.user}</span>
                    <span className="text-xs text-neutral-400">·</span>
                    <span className="text-xs text-neutral-400">{a.project}</span>
                    <span className="text-xs text-neutral-400">·</span>
                    <span className="text-xs text-neutral-400">{relativeTime(a.timestamp)}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (section === 'shared') {
    return (
      <div className="h-full flex flex-col">
        <SectionHeader
          title="Shared With Me"
          subtitle={`${sharedFiltered.length} shared items in view`}
          filters={SHARED_FILTERS}
          activeFilter={sharedFilter}
          onFilterChange={setSharedFilter}
        />
        <div className="flex-1 overflow-y-auto divide-y divide-neutral-50">
          {sharedFiltered.map((s) => {
            const cfg = sharedTypeConfig[s.type];
            const SIcon = cfg.icon;
            return (
              <button
                key={s.id}
                onClick={() => openPanel(toSharedDetail(s))}
                className="w-full text-left flex items-start gap-3 px-4 py-3 hover:bg-neutral-50 transition-colors group"
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${cfg.color}`}>
                  <SIcon size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-800 group-hover:text-[#0461BA] line-clamp-1">{s.name}</p>
                  {s.description && <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">{s.description}</p>}
                  <div className="flex items-center gap-2 mt-0.5">
                    <UserIcon size={10} className="text-neutral-400" />
                    <span className="text-xs text-neutral-400">{s.sharedBy}</span>
                    <span className="text-xs text-neutral-400">·</span>
                    <span className="text-xs text-neutral-400">{s.project}</span>
                    <span className="text-xs text-neutral-400">·</span>
                    <span className="text-xs text-neutral-400">{relativeTime(s.sharedAt)}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (section === 'favourites') {
    return (
      <div className="h-full flex flex-col">
        <SectionHeader
          title="Favourites"
          subtitle={`${favFiltered.length} favourite items in view`}
          filters={FAV_FILTERS}
          activeFilter={favFilter}
          onFilterChange={setFavFilter}
        />
        <div className="flex-1 overflow-y-auto divide-y divide-neutral-50">
          {favFiltered.map((f) => {
            const cfg = favTypeConfig[f.type];
            const FIcon = cfg.icon;
            return (
              <button
                key={f.id}
                onClick={() => openPanel(toFavDetail(f))}
                className="w-full text-left flex items-start gap-3 px-4 py-3 hover:bg-neutral-50 transition-colors group"
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${cfg.color}`}>
                  <FIcon size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-800 group-hover:text-[#0461BA] line-clamp-1">{f.name}</p>
                  {f.description && <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">{f.description}</p>}
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-neutral-400">{f.project}</span>
                    {f.status && (
                      <>
                        <span className="text-xs text-neutral-400">·</span>
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${docStatusColors[f.status] ?? 'bg-neutral-100 text-neutral-600 border-neutral-200'}`}>
                          {f.status}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <StarIcon size={13} className="flex-shrink-0 text-amber-400 fill-amber-400 mt-1" />
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
}

export function Dashboard() {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [selectedSection, setSelectedSection] = useState<DashboardSection>('overview');
  const [panelData, setPanelData] = useState<DetailPanelData | null>(null);

  const overdueTodos = mockTodos.filter((t) => t.status === 'Overdue').length;
  const unreadNotifs = mockNotifications.filter((n) => !n.isRead).length;

  const sectionItems = [
    {
      id: 'todo' as DashboardSection,
      label: 'To Do Actions',
      summary: `${overdueTodos} overdue, ${mockTodos.filter((t) => t.status === 'Due Today').length} due today`,
      count: mockTodos.length,
      icon: CheckSquareIcon,
    },
    {
      id: 'notifications' as DashboardSection,
      label: 'Notifications',
      summary: `${unreadNotifs} new notifications`,
      count: mockNotifications.length,
      icon: BellIcon,
    },
    {
      id: 'recent' as DashboardSection,
      label: 'Recent Notifications',
      summary: `${mockRecentActivity.length} recent updates`,
      count: mockRecentActivity.length,
      icon: ClockIcon,
    },
    {
      id: 'shared' as DashboardSection,
      label: 'Shared With Me',
      summary: `${mockSharedItems.length} shared items`,
      count: mockSharedItems.length,
      icon: Share2Icon,
    },
    {
      id: 'favourites' as DashboardSection,
      label: 'Favourites',
      summary: `${mockFavourites.length} saved favourites`,
      count: mockFavourites.length,
      icon: StarIcon,
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      <LeftRail activeItem={activeItem} onItemClick={setActiveItem} onChatClick={() => {}} />

      <main className="ml-11 pt-6 px-6 pb-10 min-h-screen">
        <div className="mb-5">
          <h1 className="text-xl font-bold text-neutral-900">Dashboard</h1>
          <p className="text-sm text-neutral-500 mt-0.5">
            Welcome back. {overdueTodos > 0 && <span className="text-red-600 font-medium">{overdueTodos} overdue action{overdueTodos > 1 ? 's' : ''}</span>}
            {overdueTodos > 0 && unreadNotifs > 0 && ' and '}
            {unreadNotifs > 0 && <span className="text-[#0461BA] font-medium">{unreadNotifs} unread notification{unreadNotifs > 1 ? 's' : ''}</span>}
            {overdueTodos === 0 && unreadNotifs === 0 && ' everything is up to date.'}
          </p>
        </div>

        <div className="grid grid-cols-[280px_minmax(0,1fr)] gap-4 min-h-[calc(100vh-150px)]">
          <section className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden h-fit sticky top-8">
            <div className="px-4 py-3 border-b border-neutral-100">
              <h2 className="text-sm font-semibold text-neutral-800">Dashboard Sections</h2>
              <p className="text-xs text-neutral-500 mt-0.5">Select a section to view details</p>
            </div>

            <div className="divide-y divide-neutral-100">
              <button
                onClick={() => setSelectedSection('overview')}
                className={`w-full text-left px-4 py-3 transition-colors ${selectedSection === 'overview' ? 'bg-[#E8F1FB]' : 'hover:bg-neutral-50'}`}
              >
                <p className="text-sm font-semibold text-neutral-800">Highlights Overview</p>
                <p className="text-xs text-neutral-500 mt-0.5">Key updates and attention items</p>
              </button>

              {sectionItems.map((item) => {
                const Icon = item.icon;
                const active = selectedSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedSection(item.id)}
                    className={`w-full text-left px-4 py-3 transition-colors ${active ? 'bg-[#E8F1FB]' : 'hover:bg-neutral-50'}`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon size={14} className={active ? 'text-[#0461BA]' : 'text-neutral-500'} />
                      <p className={`text-sm font-semibold ${active ? 'text-[#0461BA]' : 'text-neutral-800'}`}>{item.label}</p>
                      <span className="ml-auto text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
                        {item.count}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 mt-0.5 pl-6">{item.summary}</p>
                  </button>
                );
              })}
            </div>
          </section>

          <motion.section
            key={selectedSection}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden min-h-[480px]"
          >
            {selectedSection === 'overview' ? (
              <OverviewPane overdueTodos={overdueTodos} unreadNotifs={unreadNotifs} onSelectSection={setSelectedSection} />
            ) : (
              <DashboardContent section={selectedSection} openPanel={setPanelData} />
            )}
          </motion.section>
        </div>
      </main>

      <DetailSlidePanel data={panelData} onClose={() => setPanelData(null)} />
    </div>
  );
}
