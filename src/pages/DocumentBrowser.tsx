import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
  Children,
  lazy } from
'react';
import { DocumentCard, statusColors } from '../components/DocumentCard';
import { FilterPanel } from '../components/FilterPanel';
import { FolderTree } from '../components/FolderTree';
import { LeftRail } from '../components/LeftRail';
import { CollapsibleFilterPanel } from '../components/CollapsibleFilterPanel';
import { ChatInterface } from '../components/ChatInterface';
import { DetailSlidePanel, type DetailPanelData } from '../components/DetailSlidePanel';
import { mockDocuments } from '../data/mockDocuments';
import { mockFolders } from '../data/mockFolders';
import {
  LayoutGridIcon,
  ListIcon,
  TableIcon,
  SearchIcon,
  UserIcon,
  CalendarIcon,
  FolderIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  XIcon,
  LoaderIcon,
  MoreHorizontalIcon,
  SparklesIcon,
  StarIcon,
  ClipboardIcon } from
'lucide-react';
import { useClipboard } from '../contexts/ClipboardContext';
import { useWorkspace } from '../contexts/WorkspaceContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
type SortDirection = 'asc' | 'desc' | null;
type ColumnKey =
'id' |
'title' |
'revisionNumber' |
'status' |
'documentType' |
'author' |
'dateModified';
interface ColumnFilter {
  column: ColumnKey;
  value: string;
  sortDirection: SortDirection;
}
type ViewMode = 'grid' | 'list' | 'table' | 'compact-table';

interface DocumentActionItem {
  label: string;
  submenu?: string[];
  danger?: boolean;
  dividerAbove?: boolean;
}

const DOCUMENT_ACTIONS: DocumentActionItem[] = [
  { label: 'Add to Favorites' },
  { label: 'Add Attachment' },
  { label: 'Add to Package', submenu: ['Area 1 Processing', 'Piping System 20', 'Piping System Zone X'] },
  { label: 'Change Life Cycle' },
  { label: 'Check-Out' },
  { label: 'Copy Link', submenu: ['Static', 'Dynamic'] },
  { label: 'Copy markups to...' },
  { label: 'Delete', danger: true },
  { label: 'Edit Properties' },
  { label: 'Lock' },
  { label: 'Move' },
  { label: 'Package' },
  { label: 'Properties' },
  { label: 'Rendition', submenu: ['Create', 'Download', 'Delete'] },
  { label: 'Revise' },
  { label: 'View' },
  { label: 'Message', dividerAbove: true },
  { label: 'Transmittal' },
  { label: 'Formal Review' },
  { label: 'Approval' },
  { label: 'RFI' },
  { label: 'Technical Query' },
  { label: 'Change Request' }
];

function ViewModeDropdown({
  viewMode,
  onViewModeChange



}: {viewMode: ViewMode;onViewModeChange: (mode: ViewMode) => void;}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const viewOptions: {
    mode: ViewMode;
    label: string;
    icon: React.ReactNode;
  }[] = [
  {
    mode: 'table',
    label: 'Comfy Table',
    icon: <TableIcon size={16} />
  },
  {
    mode: 'compact-table',
    label: 'Compact Table',
    icon: <TableIcon size={16} />
  },
  {
    mode: 'grid',
    label: 'Grid',
    icon: <LayoutGridIcon size={16} />
  },
  {
    mode: 'list',
    label: 'List',
    icon: <ListIcon size={16} />
  }];

  const currentView =
  viewOptions.find((v) => v.mode === viewMode) || viewOptions[0];
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node))
      {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 h-7 border border-neutral-200 text-xs font-medium rounded-md bg-white text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#0461BA] focus:border-transparent transition-all">
        
        {currentView.icon}
        <ChevronDownIcon
          size={12}
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        
      </button>

      <AnimatePresence>
        {isOpen &&
        <motion.div
          initial={{
            opacity: 0,
            y: -4
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          exit={{
            opacity: 0,
            y: -4
          }}
          transition={{
            duration: 0.15
          }}
          className="absolute top-full right-0 mt-2 w-48 bg-white border border-neutral-200 rounded-lg shadow-lg z-50">
          
            <div className="p-2">
              {viewOptions.map((option) =>
            <button
              key={option.mode}
              onClick={() => {
                onViewModeChange(option.mode);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${viewMode === option.mode ? 'bg-[#E8F1FB] text-[#2A5FB8] font-medium' : 'text-neutral-700 hover:bg-neutral-50'}`}>
              
                  {option.icon}
                  {option.label}
                </button>
            )}
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}

function ClipboardStackIcon({
  active,
  size = 14
}: {
  active: boolean;
  size?: number;
}) {
  const stroke = '#6B7280';
  const activeGreen = '#16A34A';
  const color = active ? activeGreen : stroke;

  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="4" y="3.5" width="8" height="10" rx="1.5" stroke={color} strokeWidth="1.2" fill={active ? '#DCFCE7' : 'none'} />
      <rect x="5.5" y="2" width="5" height="2.5" rx="1" stroke={color} strokeWidth="1.2" fill="white" />
      <path d="M6 7h4" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M6 9.5h4" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

interface ColumnHeaderDropdownProps {
  column: ColumnKey;
  label: string;
  filter: ColumnFilter | undefined;
  onFilterChange: (column: ColumnKey, value: string) => void;
  onSortChange: (column: ColumnKey, direction: SortDirection) => void;
  onClearFilter: (column: ColumnKey) => void;
}
function ColumnHeaderDropdown({
  column,
  label,
  filter,
  onFilterChange,
  onSortChange,
  onClearFilter
}: ColumnHeaderDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filterValue, setFilterValue] = useState(filter?.value || '');
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node))
      {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const hasActiveFilter = filter?.value || filter?.sortDirection;
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 text-left font-semibold text-xs uppercase tracking-wider transition-colors ${hasActiveFilter ? 'text-[#0461BA]' : 'text-neutral-700 hover:text-neutral-900'}`}>
        
        {label}
        {filter?.sortDirection === 'asc' && <ChevronUpIcon size={14} />}
        {filter?.sortDirection === 'desc' && <ChevronDownIcon size={14} />}
        {!filter?.sortDirection &&
        <ChevronDownIcon size={12} className="opacity-50" />
        }
        {filter?.value &&
        <span className="w-1.5 h-1.5 rounded-full bg-[#0461BA]" />
        }
      </button>

      <AnimatePresence>
        {isOpen &&
        <motion.div
          initial={{
            opacity: 0,
            y: -4
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          exit={{
            opacity: 0,
            y: -4
          }}
          transition={{
            duration: 0.15
          }}
          className="absolute top-full left-0 mt-2 w-56 bg-white border border-neutral-200 rounded-lg shadow-lg z-50">
          
            <div className="p-3 border-b border-neutral-100">
              <div className="relative">
                <SearchIcon
                size={14}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              
                <input
                type="text"
                placeholder={`Filter ${label.toLowerCase()}...`}
                value={filterValue}
                onChange={(e) => {
                  setFilterValue(e.target.value);
                  onFilterChange(column, e.target.value);
                }}
                className="w-full pl-8 pr-3 py-2 text-sm border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0461BA] focus:border-transparent"
                autoFocus />
              
              </div>
            </div>

            <div className="p-2">
              <button
              onClick={() => {
                onSortChange(column, 'asc');
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${filter?.sortDirection === 'asc' ? 'bg-[#E8F1FB] text-[#0461BA]' : 'text-neutral-700 hover:bg-neutral-50'}`}>
              
                <ChevronUpIcon size={14} />
                Sort Ascending
              </button>
              <button
              onClick={() => {
                onSortChange(column, 'desc');
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${filter?.sortDirection === 'desc' ? 'bg-[#E8F1FB] text-[#0461BA]' : 'text-neutral-700 hover:bg-neutral-50'}`}>
              
                <ChevronDownIcon size={14} />
                Sort Descending
              </button>
            </div>

            {hasActiveFilter &&
          <div className="p-2 border-t border-neutral-100">
                <button
              onClick={() => {
                setFilterValue('');
                onClearFilter(column);
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-error-600 hover:bg-error-50 rounded-md transition-colors">
              
                  <XIcon size={14} />
                  Clear Filter
                </button>
              </div>
          }
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}
const ITEMS_PER_PAGE = 20;
export function DocumentBrowser() {
  const { clipboard, addToClipboard, removeFromClipboard, clearClipboard, isInClipboard } = useClipboard();
  const { currentWorkspace } = useWorkspace();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedDocType, setSelectedDocType] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('compact-table');
  const [sortBy, setSortBy] = useState<'dateModified' | 'title' | 'id'>(
    'dateModified'
  );
  const [leftPanelMode, setLeftPanelMode] = useState<'filter' | 'folder'>(
    'folder'
  );
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [isChatMode, setIsChatMode] = useState(false);
  const [activeRailItem, setActiveRailItem] = useState('dashboard');
  const projectScale: Record<string, number> = {
    'The Shard, London': 1,
    'Skyline': 0.7,
    'Tower': 0.45,
    'Empire State': 0.85
  };
  const projectFolders = useMemo(() => {
    const factor = projectScale[currentWorkspace] ?? 1;
    const scale = (n: number) => Math.max(0, Math.round(n * factor));
    const walk = (list: typeof mockFolders): typeof mockFolders =>
    list.map((f) => ({
      ...f,
      documentCount: scale(f.documentCount),
      children: f.children ? walk(f.children) : []
    }));
    return walk(mockFolders);
  }, [currentWorkspace]);
  const projectDocuments = useMemo(() => {
    const factor = projectScale[currentWorkspace] ?? 1;
    // Deterministic shuffle seeded by project name so each workspace shows a different mix
    let seed = 0;
    for (let i = 0; i < currentWorkspace.length; i++) {
      seed = (seed * 31 + currentWorkspace.charCodeAt(i)) >>> 0;
    }
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 0xffffffff;
    };
    const shuffled = [...mockDocuments];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const count = Math.max(1, Math.round(mockDocuments.length * factor));
    return shuffled.slice(0, count);
  }, [currentWorkspace]);

  useEffect(() => {
    setSelectedFolderId(null);
    setDisplayedCount(ITEMS_PER_PAGE);
  }, [currentWorkspace]);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === '/chat') {
      setIsChatMode(true);
      setActiveRailItem('chat');
    } else {
      setIsChatMode(false);
      setActiveRailItem('documents');
    }
  }, [location.pathname]);
  const [highlightedDocId, setHighlightedDocId] = useState<string | null>(null);
  const [selectedDocumentIds, setSelectedDocumentIds] = useState<Set<string>>(new Set());
  const [openActionMenuId, setOpenActionMenuId] = useState<string | null>(null);
  const [openActionSubmenuKey, setOpenActionSubmenuKey] = useState<string | null>(null);
  const [showClipboardDropdown, setShowClipboardDropdown] = useState(false);
  const [panelData, setPanelData] = useState<DetailPanelData | null>(null);
  const actionMenuRef = useRef<HTMLDivElement>(null);
  const clipboardRef = useRef<HTMLDivElement>(null);
  // Column filters for table view
  const [columnFilters, setColumnFilters] = useState<
    Map<ColumnKey, ColumnFilter>>(
    new Map());
  // Lazy loading state
  const [displayedCount, setDisplayedCount] = useState(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const folderLookup = useMemo(() => {
    const map = new Map<string, { id: string; name: string; parentId: string | null; children: string[]; documentCount: number }>();

    const walk = (folders: typeof projectFolders) => {
      folders.forEach((folder) => {
        map.set(folder.id, {
          id: folder.id,
          name: folder.name,
          parentId: folder.parentId,
          children: folder.children.map((child) => child.id),
          documentCount: folder.documentCount
        });
        if (folder.children.length > 0) {
          walk(folder.children);
        }
      });
    };

    walk(projectFolders);
    return map;
  }, [projectFolders]);

  const selectedFolderIds = useMemo(() => {
    if (!selectedFolderId) {
      return null;
    }

    const ids = new Set<string>();
    const stack = [selectedFolderId];

    while (stack.length > 0) {
      const currentId = stack.pop();
      if (!currentId || ids.has(currentId)) {
        continue;
      }
      ids.add(currentId);

      const folder = folderLookup.get(currentId);
      if (folder) {
        folder.children.forEach((childId) => stack.push(childId));
      }
    }

    return ids;
  }, [selectedFolderId, folderLookup]);

  const breadcrumbPath = useMemo(() => {
    if (!selectedFolderId) {
      return [] as Array<{ id: string; name: string }>;
    }

    const path: Array<{ id: string; name: string }> = [];
    let currentId: string | null = selectedFolderId;

    while (currentId) {
      const folder = folderLookup.get(currentId);
      if (!folder) {
        break;
      }
      path.unshift({ id: folder.id, name: folder.name });
      currentId = folder.parentId;
    }

    return path;
  }, [selectedFolderId, folderLookup]);
  const handleColumnFilterChange = (column: ColumnKey, value: string) => {
    setColumnFilters((prev) => {
      const newFilters = new Map(prev);
      const existing = newFilters.get(column);
      newFilters.set(column, {
        column,
        value,
        sortDirection: existing?.sortDirection || null
      });
      return newFilters;
    });
    setDisplayedCount(ITEMS_PER_PAGE);
  };
  const handleColumnSortChange = (
  column: ColumnKey,
  direction: SortDirection) =>
  {
    setColumnFilters((prev) => {
      const newFilters = new Map(prev);
      // Clear sort from other columns
      newFilters.forEach((filter, key) => {
        if (key !== column) {
          newFilters.set(key, {
            ...filter,
            sortDirection: null
          });
        }
      });
      const existing = newFilters.get(column);
      newFilters.set(column, {
        column,
        value: existing?.value || '',
        sortDirection: direction
      });
      return newFilters;
    });
  };
  const handleClearColumnFilter = (column: ColumnKey) => {
    setColumnFilters((prev) => {
      const newFilters = new Map(prev);
      newFilters.delete(column);
      return newFilters;
    });
    setDisplayedCount(ITEMS_PER_PAGE);
  };
  const filteredDocuments = useMemo(() => {
    let filtered = projectDocuments;
    if (selectedFolderIds) {
      filtered = filtered.filter((doc) => !!doc.folderId && selectedFolderIds.has(doc.folderId));
    }
    if (searchTerm) {
      filtered = filtered.filter(
        (doc) =>
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    if (leftPanelMode === 'filter' && selectedStatus.length > 0) {
      filtered = filtered.filter((doc) => selectedStatus.includes(doc.status));
    }
    if (leftPanelMode === 'filter' && selectedDocType.length > 0) {
      filtered = filtered.filter((doc) =>
      selectedDocType.includes(doc.documentType)
      );
    }
    if (leftPanelMode === 'filter' && selectedProject.length > 0) {
      filtered = filtered.filter((doc) => selectedProject.includes(doc.project));
    }
    // Apply column filters (for table view)
    columnFilters.forEach((filter) => {
      if (filter.value) {
        filtered = filtered.filter((doc) => {
          const value = doc[filter.column as keyof typeof doc];
          if (typeof value === 'string') {
            return value.toLowerCase().includes(filter.value.toLowerCase());
          }
          return true;
        });
      }
    });
    // Apply column sorting
    let sortColumn: ColumnKey | null = null;
    let sortDirection: SortDirection = null;
    columnFilters.forEach((filter) => {
      if (filter.sortDirection) {
        sortColumn = filter.column;
        sortDirection = filter.sortDirection;
      }
    });
    if (sortColumn && sortDirection) {
      filtered.sort((a, b) => {
        const aVal = a[sortColumn as keyof typeof a] as string;
        const bVal = b[sortColumn as keyof typeof b] as string;
        const comparison = aVal.localeCompare(bVal);
        return sortDirection === 'asc' ? comparison : -comparison;
      });
    } else {
      // Default sorting
      filtered.sort((a, b) => {
        if (sortBy === 'dateModified') {
          return (
            new Date(b.dateModified).getTime() -
            new Date(a.dateModified).getTime());

        } else if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        } else {
          return a.id.localeCompare(b.id);
        }
      });
    }
    return filtered;
  }, [
  searchTerm,
  selectedStatus,
  selectedDocType,
  selectedProject,
  sortBy,
  leftPanelMode,
  selectedFolderIds,
  columnFilters,
  projectDocuments]
  );
  // Reset displayed count when filters change
  useEffect(() => {
    setDisplayedCount(ITEMS_PER_PAGE);
  }, [
  searchTerm,
  selectedStatus,
  selectedDocType,
  selectedProject,
  selectedFolderId,
  leftPanelMode]
  );
  // Lazy loading with Intersection Observer
  const loadMore = useCallback(() => {
    if (displayedCount >= filteredDocuments.length || isLoading) return;
    setIsLoading(true);
    // Simulate network delay for lazy loading
    setTimeout(() => {
      setDisplayedCount((prev) =>
      Math.min(prev + ITEMS_PER_PAGE, filteredDocuments.length)
      );
      setIsLoading(false);
    }, 500);
  }, [displayedCount, filteredDocuments.length, isLoading]);
  useEffect(() => {
    const currentRef = loadMoreRef.current;
    if (!currentRef) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      {
        threshold: 0.1
      }
    );
    observer.observe(currentRef);
    return () => {
      observer.disconnect();
    };
  }, [loadMore, viewMode]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target as Node)) {
        setOpenActionMenuId(null);
        setOpenActionSubmenuKey(null);
      }
      if (clipboardRef.current && !clipboardRef.current.contains(event.target as Node)) {
        setShowClipboardDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const displayedDocuments = filteredDocuments.slice(0, displayedCount);
  const hasMore = displayedCount < filteredDocuments.length;
  const hasActiveFilters = selectedStatus.length > 0 || selectedDocType.length > 0 || selectedProject.length > 0 || Boolean(searchTerm);
  const allDisplayedSelected =
  displayedDocuments.length > 0 &&
  displayedDocuments.every((doc) => selectedDocumentIds.has(doc.id));
  const hasSomeDisplayedSelected =
  displayedDocuments.some((doc) => selectedDocumentIds.has(doc.id));

  const toggleDocumentSelection = (docId: string) => {
    setSelectedDocumentIds((prev) => {
      const next = new Set(prev);
      if (next.has(docId)) {
        next.delete(docId);
      } else {
        next.add(docId);
      }
      return next;
    });
  };

  const toggleSelectAllDisplayed = () => {
    setSelectedDocumentIds((prev) => {
      const next = new Set(prev);
      if (allDisplayedSelected) {
        displayedDocuments.forEach((doc) => next.delete(doc.id));
      } else {
        displayedDocuments.forEach((doc) => next.add(doc.id));
      }
      return next;
    });
  };

  const toDocumentDetail = (doc: typeof mockDocuments[0]): DetailPanelData => ({
    objectType: 'document',
    objectId: doc.id,
    docId: doc.id,
    title: doc.title,
    project: doc.project,
    status: doc.status,
    revision: String(doc.revisionNumber),
    author: doc.author,
    dateModified: doc.dateModified,
    dateCreated: doc.dateCreated,
    fileType: 'PDF',
    fileSize: doc.fileSize || '2.4 MB',
    description: doc.description,
  });

  const containerVariants = {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 10
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    }
  };
  const handleChatClick = () => {
    navigate('/chat');
  };
  const handleExitChat = () => {
    navigate('/');
  };
  const handleDocumentSelectFromChat = (docId: string) => {
    navigate('/');
    setHighlightedDocId(docId);
    setSelectedFolderId(null);
    setSelectedStatus([]);
    setSelectedDocType([]);
    setSelectedProject([]);
    setSearchTerm('');
    setTimeout(() => setHighlightedDocId(null), 5000);
  };
  const columns: {
    key: ColumnKey;
    label: string;
  }[] = [
  {
    key: 'id',
    label: 'Reference'
  },
  {
    key: 'title',
    label: 'Title'
  },
  {
    key: 'revisionNumber',
    label: 'Rev'
  },
  {
    key: 'status',
    label: 'Status'
  },
  {
    key: 'documentType',
    label: 'Type'
  },
  {
    key: 'author',
    label: 'Author'
  },
  {
    key: 'dateModified',
    label: 'Date Modified'
  }];

  return (
    <div
      className="h-[calc(100vh-45px)] mt-[45px] font-sans overflow-hidden p-3"
      style={{
        backgroundColor: 'var(--main-bg-color, #EAEEF6)'
      }}>
      
      {/* Chat Mode */}
      <AnimatePresence>
        {isChatMode &&
        <ChatInterface
          onExit={handleExitChat}
          onDocumentSelect={handleDocumentSelectFromChat}
          askAbout={new URLSearchParams(location.search).get('ask')}
          askKind={new URLSearchParams(location.search).get('askKind') as 'folder' | 'document' | null} />

        }
      </AnimatePresence>

      {/* Main Layout */}
      <AnimatePresence>
        {!isChatMode &&
        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          transition={{
            duration: 0.25
          }}
          className="flex h-full gap-3 pl-[var(--left-rail-width,88px)]">
          
            {/* Left Rail */}
            <LeftRail
            activeItem={activeRailItem}
            onItemClick={setActiveRailItem}
            onChatClick={handleChatClick} />
          

            {/* Sidebar Island */}
            <CollapsibleFilterPanel
            isExpanded
            showCollapseToggle={false}
            mode={leftPanelMode}
            onModeChange={setLeftPanelMode}
            >
            
              {leftPanelMode === 'filter' ?
            <FilterPanel
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              selectedDocType={selectedDocType}
              onDocTypeChange={setSelectedDocType}
              selectedProject={selectedProject}
              onProjectChange={setSelectedProject} /> :


            <FolderTree
              folders={projectFolders}
              selectedFolderId={selectedFolderId}
              onFolderSelect={setSelectedFolderId} />

            }
            </CollapsibleFilterPanel>

            {/* Main Content Island */}
            <div
            className="flex-1 flex flex-col min-w-0 rounded-lg shadow-lg overflow-hidden"
            style={{
              backgroundColor: 'var(--element-bg-color, #FFFFFF)'
            }}>
            
              {/* Header */}
              <header
                className={`px-4 bg-white shrink-0 flex justify-between ${
                  leftPanelMode === 'folder' || leftPanelMode === 'filter' && (hasActiveFilters || selectedFolderId) ? 'items-start pt-2 pb-2' : 'items-center h-10'
                }`}
              >
                {leftPanelMode === 'folder' ? (
                  <div className="min-w-0 pr-4">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-600 flex-wrap">
                      <button
                        onClick={() => setSelectedFolderId(null)}
                        className={`hover:text-[#0461BA] transition-colors ${selectedFolderId === null ? 'text-[#0461BA] font-semibold' : ''}`}
                      >
                        All Documents
                      </button>
                      {breadcrumbPath.map((crumb) => (
                        <React.Fragment key={crumb.id}>
                          <ChevronRightIcon size={12} className="text-neutral-300" />
                          <button
                            onClick={() => setSelectedFolderId(crumb.id)}
                            className={`hover:text-[#0461BA] transition-colors ${selectedFolderId === crumb.id ? 'text-[#0461BA] font-semibold' : ''}`}
                          >
                            {crumb.name}
                          </button>
                        </React.Fragment>
                      ))}
                    </div>
                    <p className="text-[11px] text-neutral-500 mt-1">{filteredDocuments.length} documents</p>
                  </div>
                ) : leftPanelMode === 'filter' && (hasActiveFilters || selectedFolderId) ? (
                  <div className="min-w-0 pr-4 flex-1">
                    {selectedFolderId && (
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-700 text-xs font-medium">
                          <FolderIcon size={12} />
                          Folder scope:
                          <span className="font-semibold">
                            {breadcrumbPath.length > 0 ? breadcrumbPath.map((crumb) => crumb.name).join(' / ') : 'Selected folder'}
                          </span>
                        </span>
                        <button
                          onClick={() => setLeftPanelMode('folder')}
                          className="text-xs font-medium text-[#0461BA] hover:underline"
                        >
                          View in folders
                        </button>
                        <button
                          onClick={() => setSelectedFolderId(null)}
                          className="text-xs font-medium text-neutral-500 hover:text-neutral-700 hover:underline"
                        >
                          Use all documents
                        </button>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {searchTerm && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-700 text-xs font-medium">
                          Search: <span className="font-semibold">{searchTerm}</span>
                          <button onClick={() => setSearchTerm('')} className="ml-1 hover:text-red-500 transition-colors" aria-label="Clear search">
                            <XIcon size={12} />
                          </button>
                        </span>
                      )}
                      {selectedStatus.map((s) => (
                        <span key={s} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E8F1FB] text-[#0461BA] text-xs font-medium">
                          Status: <span className="font-semibold">{s}</span>
                          <button onClick={() => setSelectedStatus((prev) => prev.filter((x) => x !== s))} className="ml-1 hover:text-red-500 transition-colors" aria-label={`Remove ${s} filter`}>
                            <XIcon size={12} />
                          </button>
                        </span>
                      ))}
                      {selectedDocType.map((t) => (
                        <span key={t} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E8F1FB] text-[#0461BA] text-xs font-medium">
                          Type: <span className="font-semibold">{t}</span>
                          <button onClick={() => setSelectedDocType((prev) => prev.filter((x) => x !== t))} className="ml-1 hover:text-red-500 transition-colors" aria-label={`Remove ${t} filter`}>
                            <XIcon size={12} />
                          </button>
                        </span>
                      ))}
                      {selectedProject.map((p) => (
                        <span key={p} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E8F1FB] text-[#0461BA] text-xs font-medium">
                          Project: <span className="font-semibold">{p}</span>
                          <button onClick={() => setSelectedProject((prev) => prev.filter((x) => x !== p))} className="ml-1 hover:text-red-500 transition-colors" aria-label={`Remove ${p} filter`}>
                            <XIcon size={12} />
                          </button>
                        </span>
                      ))}
                      {(selectedStatus.length > 1 || selectedDocType.length > 1 || selectedProject.length > 1 || (selectedStatus.length + selectedDocType.length + selectedProject.length > 1)) && (
                        <button
                          onClick={() => { setSelectedStatus([]); setSelectedDocType([]); setSelectedProject([]); setSearchTerm(''); }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 text-red-500 text-xs font-medium hover:bg-red-100 transition-colors">
                          Clear all
                          <XIcon size={12} />
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div />
                )}
                <div className="flex items-center gap-3">
                  <div
                    className="relative"
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowClipboardDropdown((prev) => !prev);
                      }}
                      className="relative h-7 w-7 rounded-md border border-neutral-200 bg-white text-neutral-600 hover:text-neutral-800 hover:bg-neutral-50 transition-colors inline-flex items-center justify-center"
                      aria-label="Clipboard"
                      aria-expanded={showClipboardDropdown}
                    >
                      <ClipboardIcon size={15} />
                      {clipboard.length > 0 && (
                        <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-0.5 rounded-full bg-[#0461BA] text-white text-[10px] leading-4 text-center font-semibold">
                          {Math.min(clipboard.length, 99)}
                        </span>
                      )}
                    </button>

                    {showClipboardDropdown && (
                      <div className="absolute right-0 top-full mt-1.5 w-72 bg-white border border-neutral-200 rounded-md shadow-lg z-40">
                        <div className="px-3 py-2 border-b border-neutral-100 flex items-center justify-between gap-2">
                          <p className="text-xs font-semibold text-neutral-800">Clipboard ({clipboard.length})</p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              clearClipboard();
                            }}
                            className="text-[11px] font-semibold text-neutral-500 hover:text-red-600 transition-colors disabled:text-neutral-300"
                            disabled={clipboard.length === 0}
                            aria-label="Clear clipboard"
                          >
                            Clear
                          </button>
                        </div>
                        {clipboard.length === 0 ? (
                          <div className="px-3 py-4 text-xs text-neutral-500">Clipboard is empty</div>
                        ) : (
                        <div className="max-h-64 overflow-y-auto">
                          {clipboard.map((doc) => (
                            <div key={doc.id} className="px-3 py-2 border-b border-neutral-100 last:border-b-0 flex items-center justify-between gap-2 hover:bg-neutral-50 group">
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-neutral-800 truncate">{doc.id}</p>
                                <p className="text-[11px] text-neutral-500 truncate">{doc.title}</p>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeFromClipboard(doc.id);
                                }}
                                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md text-neutral-600 hover:bg-neutral-200"
                                aria-label={`Remove ${doc.id} from clipboard`}
                              >
                                <ClipboardStackIcon size={13} active />
                              </button>
                            </div>
                          ))}
                        </div>
                        )}
                      </div>
                    )}
                  </div>

                  <ViewModeDropdown
                    viewMode={viewMode}
                    onViewModeChange={setViewMode} />
                </div>
              </header>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto p-4">
                {filteredDocuments.length === 0 ?
              <div className="flex flex-col items-center justify-center h-full max-h-[400px] bg-white rounded-lg border border-neutral-200 border-dashed">
                    <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center mb-3">
                      <SearchIcon size={24} className="text-neutral-400" />
                    </div>
                    <p className="text-neutral-900 font-semibold text-lg">
                      No documents found
                    </p>
                    <p className="text-neutral-500 text-sm mt-1">
                      Try adjusting your filters or search criteria
                    </p>
                  </div> :
              viewMode === 'grid' ?
              <div key="grid-view">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                      {displayedDocuments.map((doc) =>
                  <div key={doc.id}>
                          <DocumentCard
                      document={doc}
                      isHighlighted={highlightedDocId === doc.id} />
                    
                        </div>
                  )}
                    </div>
                    {hasMore &&
                <div
                  ref={loadMoreRef}
                  className="flex justify-center py-8">
                  
                        {isLoading ?
                  <div className="flex items-center gap-2 text-neutral-500">
                            <LoaderIcon size={20} className="animate-spin" />
                            <span className="text-sm">
                              Loading more documents...
                            </span>
                          </div> :

                  <div className="h-8" />
                  }
                      </div>
                }
                  </div> :
              viewMode === 'list' ?
              <div key="list-view" className="space-y-2">
                    {displayedDocuments.map((doc) =>
                <div key={doc.id}>
                        <button
                    onClick={() => setPanelData(toDocumentDetail(doc))}
                    className={`w-full text-left block border p-3 hover:shadow-sm transition-all bg-white rounded-md group ${highlightedDocId === doc.id ? 'border-[#0461BA] ring-2 ring-[#0461BA]/20 shadow-md' : 'border-neutral-200 hover:border-neutral-300'}`}>
                    
                          <div className="flex gap-3">
                            <div className="w-24 h-16 bg-neutral-100 flex-shrink-0 rounded-md overflow-hidden border border-neutral-100">
                              <img
                          src={doc.thumbnail}
                          alt={doc.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        
                            </div>
                            <div className="flex-1 flex flex-col justify-center min-w-0">
                              <div className="flex items-start justify-between mb-1 gap-3">
                                <h3 className="font-semibold text-neutral-900 text-sm group-hover:text-[#0461BA] transition-colors truncate">
                                  {doc.title}
                                </h3>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                  <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (isInClipboard(doc.id)) {
                                  removeFromClipboard(doc.id);
                                } else {
                                  addToClipboard(doc);
                                }
                              }}
                              title={isInClipboard(doc.id) ? `Remove ${doc.id} from clipboard` : `Add ${doc.id} to clipboard`}
                              aria-label={isInClipboard(doc.id) ? `Remove ${doc.id} from clipboard` : `Add ${doc.id} to clipboard`}
                              className={`opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all w-6 h-6 rounded-md inline-flex items-center justify-center ${
                                isInClipboard(doc.id)
                                  ? 'bg-neutral-100 text-neutral-700 opacity-100'
                                  : 'text-neutral-600 hover:bg-neutral-200'
                              }`}>
                                    <ClipboardStackIcon size={13} active={isInClipboard(doc.id)} />
                                  </button>
                                  <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                navigate(`/chat?ask=${encodeURIComponent(`${doc.id} — ${doc.title}`)}&askKind=document`);
                              }}
                              title={`Ask Flint about ${doc.id}`}
                              aria-label={`Ask Flint about ${doc.id}`}
                              className="opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity w-6 h-6 rounded-md inline-flex items-center justify-center text-[#0461BA] hover:bg-[#E8F1FB]">
                                    <SparklesIcon size={13} />
                                  </button>
                                  <span
                              className={`text-[10px] font-medium px-2 py-0.5 rounded-md border whitespace-nowrap ${statusColors[doc.status]}`}>
                              
                                    {doc.status}
                                  </span>
                                </div>
                              </div>
                              <p className="text-xs font-medium text-neutral-500 mb-2">
                                {doc.id}{' '}
                                <span className="text-neutral-300 mx-1">•</span>{' '}
                                Rev {doc.revisionNumber}
                              </p>
                              <div className="flex gap-5 text-xs text-neutral-500">
                                <span className="flex items-center gap-1.5">
                                  <UserIcon
                              size={12}
                              className="text-neutral-400" />
                            
                                  {doc.author}
                                </span>
                                <span className="flex items-center gap-1.5">
                                  <CalendarIcon
                              size={12}
                              className="text-neutral-400" />
                            
                                  {doc.dateModified}
                                </span>
                                <span className="flex items-center gap-1.5">
                                  <FolderIcon
                              size={12}
                              className="text-neutral-400" />
                            
                                  {doc.project}
                                </span>
                              </div>
                            </div>
                          </div>
                        </button>
                      </div>
                )}
                    {hasMore &&
                <div
                  ref={loadMoreRef}
                  className="flex justify-center py-8">
                  
                        {isLoading ?
                  <div className="flex items-center gap-2 text-neutral-500">
                            <LoaderIcon size={20} className="animate-spin" />
                            <span className="text-sm">
                              Loading more documents...
                            </span>
                          </div> :

                  <div className="h-8" />
                  }
                      </div>
                }
                  </div> :

              <div key="table-view">
                    <div className="bg-white rounded-md border border-neutral-200 shadow-sm overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse whitespace-nowrap">
                          <thead>
                            <tr className="border-b border-neutral-200 bg-neutral-50">
                              <th className={viewMode === 'compact-table' ? 'text-left p-2 w-9' : 'text-left p-4 w-10'}>
                                <button
                                  onClick={toggleSelectAllDisplayed}
                                  className="w-5 h-5 rounded border border-neutral-300 bg-white inline-flex items-center justify-center hover:border-[#0461BA] transition-colors"
                                  aria-label={allDisplayedSelected ? 'Deselect all documents' : 'Select all documents'}
                                >
                                  <input
                                    type="checkbox"
                                    checked={allDisplayedSelected}
                                    ref={(el) => {
                                      if (el) el.indeterminate = hasSomeDisplayedSelected && !allDisplayedSelected;
                                    }}
                                    readOnly
                                    className="w-3.5 h-3.5 accent-[#0461BA] cursor-pointer"
                                  />
                                </button>
                              </th>
                              <th
                                key={columns[0].key}
                                className={
                                  viewMode === 'compact-table' ?
                                  'text-left p-2' :
                                  'text-left p-4'
                                }
                              >
                                <ColumnHeaderDropdown
                                  column={columns[0].key}
                                  label={columns[0].label}
                                  filter={columnFilters.get(columns[0].key)}
                                  onFilterChange={handleColumnFilterChange}
                                  onSortChange={handleColumnSortChange}
                                  onClearFilter={handleClearColumnFilter}
                                />
                              </th>
                              <th className={viewMode === 'compact-table' ? 'p-2 w-28' : 'p-4 w-32'} aria-label="Row actions" />
                              {columns.slice(1).map((col) =>
                          <th
                            key={col.key}
                            className={
                            viewMode === 'compact-table' ?
                            'text-left p-2' :
                            'text-left p-4'
                            }>
                            
                                  <ColumnHeaderDropdown
                              column={col.key}
                              label={col.label}
                              filter={columnFilters.get(col.key)}
                              onFilterChange={handleColumnFilterChange}
                              onSortChange={handleColumnSortChange}
                              onClearFilter={handleClearColumnFilter} />
                            
                                </th>
                          )}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-100">
                            {displayedDocuments.map((doc) =>
                        {
                          const isSelected = selectedDocumentIds.has(doc.id);
                          return (
                        <tr
                          key={doc.id}
                          className={`transition-colors group ${isSelected || highlightedDocId === doc.id ? 'bg-[#E8F1FB]' : 'hover:bg-neutral-50'}`}>
                          <td className={viewMode === 'compact-table' ? 'p-2' : 'p-4'}>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleDocumentSelection(doc.id);
                              }}
                              className={`w-5 h-5 rounded border inline-flex items-center justify-center transition-colors ${
                                isSelected
                                  ? 'border-[#0461BA] bg-[#E8F1FB]'
                                  : 'border-neutral-300 bg-white opacity-0 group-hover:opacity-100'
                              }`}
                              aria-label={isSelected ? `Deselect ${doc.id}` : `Select ${doc.id}`}
                            >
                              <input
                                type="checkbox"
                                checked={isSelected}
                                readOnly
                                className="w-3.5 h-3.5 accent-[#0461BA] cursor-pointer"
                              />
                            </button>
                          </td>
                          
                                <td
                            className={
                            viewMode === 'compact-table' ? 'p-2' : 'p-4'
                            }>
                            
                                  <button
                              onClick={() => setPanelData(toDocumentDetail(doc))}
                              className="text-[#0461BA] hover:text-[#035299] font-medium text-left transition-colors">
                              
                                    {doc.id}
                                  </button>
                                </td>
                                <td className={`${viewMode === 'compact-table' ? 'p-2' : 'p-4'} relative`}>
                                  <div className="flex items-center gap-1">
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      setOpenActionMenuId((prev) => {
                                        const next = prev === doc.id ? null : doc.id;
                                        if (!next) {
                                          setOpenActionSubmenuKey(null);
                                        }
                                        return next;
                                      });
                                      if (openActionMenuId !== doc.id) {
                                        setOpenActionSubmenuKey(null);
                                      }
                                    }}
                                    className={`w-7 h-7 rounded-md inline-flex items-center justify-center text-neutral-600 hover:bg-neutral-200 transition-colors ${
                                      openActionMenuId === doc.id ? 'opacity-100 bg-neutral-100' : 'opacity-0 group-hover:opacity-100 focus:opacity-100'
                                    }`}
                                    aria-label={`Actions for ${doc.id}`}
                                  >
                                    <MoreHorizontalIcon size={14} />
                                  </button>

                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      navigate(`/chat?ask=${encodeURIComponent(`${doc.id} — ${doc.title}`)}&askKind=document`);
                                    }}
                                    title={`Ask Flint about ${doc.id}`}
                                    aria-label={`Ask Flint about ${doc.id}`}
                                    className="opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity w-7 h-7 rounded-md inline-flex items-center justify-center text-[#0461BA] hover:bg-[#E8F1FB]"
                                  >
                                    <SparklesIcon size={14} />
                                  </button>

                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      if (isInClipboard(doc.id)) {
                                        removeFromClipboard(doc.id);
                                      } else {
                                        addToClipboard(doc);
                                      }
                                    }}
                                    title={isInClipboard(doc.id) ? `Remove ${doc.id} from clipboard` : `Add ${doc.id} to clipboard`}
                                    aria-label={isInClipboard(doc.id) ? `Remove ${doc.id} from clipboard` : `Add ${doc.id} to clipboard`}
                                    className={`opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all w-7 h-7 rounded-md inline-flex items-center justify-center ${
                                      isInClipboard(doc.id)
                                        ? 'bg-neutral-100 text-neutral-700 opacity-100'
                                        : 'text-neutral-600 hover:bg-neutral-200'
                                    }`}
                                  >
                                    <ClipboardStackIcon size={14} active={isInClipboard(doc.id)} />
                                  </button>
                                  </div>

                                  {openActionMenuId === doc.id && (
                                    <div
                                      ref={actionMenuRef}
                                      className="absolute left-0 top-full mt-1.5 w-64 bg-white border border-neutral-200 rounded-xl shadow-xl z-40 overflow-visible"
                                    >
                                      <div className="py-1.5 overflow-visible flex flex-col">
                                        {DOCUMENT_ACTIONS.map((item) => (
                                          <div
                                            key={item.label}
                                            className={`relative ${item.dividerAbove ? 'border-t border-neutral-200 mt-1 pt-1' : ''}`}
                                          >
                                            <button
                                              onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                if (item.submenu) {
                                                  const submenuKey = `${doc.id}:${item.label}`;
                                                  setOpenActionSubmenuKey((prev) => prev === submenuKey ? null : submenuKey);
                                                  return;
                                                }
                                                setOpenActionMenuId(null);
                                                setOpenActionSubmenuKey(null);
                                              }}
                                              className={`w-full text-left px-3.5 py-1.5 text-[15px] leading-5 transition-colors flex items-center justify-between gap-2 ${
                                                item.danger
                                                  ? 'text-red-600 hover:bg-red-50'
                                                  : 'text-neutral-700 hover:bg-neutral-50'
                                              }`}
                                              aria-expanded={item.submenu ? openActionSubmenuKey === `${doc.id}:${item.label}` : undefined}
                                            >
                                              <span>{item.label}</span>
                                              {item.submenu && <ChevronRightIcon size={14} className="text-neutral-400" />}
                                            </button>

                                            {item.submenu && openActionSubmenuKey === `${doc.id}:${item.label}` && (
                                              <div className="absolute left-full top-0 ml-1.5 w-60 bg-white border border-neutral-200 rounded-xl shadow-xl py-1.5 z-50 flex flex-col">
                                                {item.submenu.map((sub) => (
                                                  <button
                                                    key={`${item.label}-${sub}`}
                                                    onClick={(e) => {
                                                      e.preventDefault();
                                                      e.stopPropagation();
                                                      setOpenActionMenuId(null);
                                                      setOpenActionSubmenuKey(null);
                                                    }}
                                                    className="w-full text-left px-3.5 py-1.5 text-[15px] leading-5 text-neutral-700 hover:bg-neutral-50 transition-colors"
                                                  >
                                                    {sub}
                                                  </button>
                                                ))}
                                              </div>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </td>
                                <td
                            className={
                            viewMode === 'compact-table' ? 'p-2' : 'p-4'
                            }>
                            
                                  <button
                              onClick={() => setPanelData(toDocumentDetail(doc))}
                              className="text-neutral-900 group-hover:text-[#0461BA] transition-colors font-medium text-left">
                              
                                    {doc.title}
                                  </button>
                                </td>
                                <td
                            className={`${viewMode === 'compact-table' ? 'p-2' : 'p-4'} text-neutral-500 font-medium`}>
                            
                                  {doc.revisionNumber}
                                </td>
                                <td
                            className={
                            viewMode === 'compact-table' ? 'p-2' : 'p-4'
                            }>
                            
                                  <span
                              className={`text-[10px] font-medium px-2 py-0.5 rounded-md border ${statusColors[doc.status]}`}>
                              
                                    {doc.status}
                                  </span>
                                </td>
                                <td
                            className={`${viewMode === 'compact-table' ? 'p-2' : 'p-4'} text-neutral-600`}>
                            
                                  {doc.documentType}
                                </td>
                                <td
                            className={`${viewMode === 'compact-table' ? 'p-2' : 'p-4'} text-neutral-600`}>
                            
                                  {doc.author}
                                </td>
                                <td
                            className={`${viewMode === 'compact-table' ? 'p-2' : 'p-4'} text-neutral-600`}>
                            
                                  {doc.dateModified}
                                </td>
                              </tr>
                        );
                        }
                        )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {hasMore &&
                <div
                  ref={loadMoreRef}
                  className="flex justify-center py-8">
                  
                        {isLoading ?
                  <div className="flex items-center gap-2 text-neutral-500">
                            <LoaderIcon size={20} className="animate-spin" />
                            <span className="text-sm">
                              Loading more documents...
                            </span>
                          </div> :

                  <div className="h-8" />
                  }
                      </div>
                }
                  </div>
              }
              </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>
      <DetailSlidePanel data={panelData} onClose={() => setPanelData(null)} />
    </div>);

}
