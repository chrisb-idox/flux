import { Folder } from '../types/document';

export const mockFolders: Folder[] = [
{
  id: 'folder-engineering',
  name: 'Engineering',
  parentId: null,
  children: [
  {
    id: 'folder-drawings',
    name: 'Drawings',
    parentId: 'folder-engineering',
    children: [
    {
      id: 'folder-drawings-mechanical',
      name: 'Mechanical',
      parentId: 'folder-drawings',
      children: [],
      documentCount: 30
    },
    {
      id: 'folder-drawings-electrical',
      name: 'Electrical',
      parentId: 'folder-drawings',
      children: [],
      documentCount: 25
    },
    {
      id: 'folder-drawings-civil',
      name: 'Civil & Structural',
      parentId: 'folder-drawings',
      children: [],
      documentCount: 20
    },
    {
      id: 'folder-drawings-instrumentation',
      name: 'Instrumentation',
      parentId: 'folder-drawings',
      children: [],
      documentCount: 20
    },
    {
      id: 'folder-drawings-process',
      name: 'Process Flow Diagrams',
      parentId: 'folder-drawings',
      children: [],
      documentCount: 15
    }],

    documentCount: 110
  },
  {
    id: 'folder-specs',
    name: 'Specifications',
    parentId: 'folder-engineering',
    children: [
    {
      id: 'folder-specs-equipment',
      name: 'Equipment',
      parentId: 'folder-specs',
      children: [],
      documentCount: 20
    },
    {
      id: 'folder-specs-materials',
      name: 'Materials',
      parentId: 'folder-specs',
      children: [],
      documentCount: 15
    }],

    documentCount: 35
  },
  {
    id: 'folder-reports',
    name: 'Technical Reports',
    parentId: 'folder-engineering',
    children: [
    {
      id: 'folder-reports-analysis',
      name: 'Analysis Reports',
      parentId: 'folder-reports',
      children: [],
      documentCount: 20
    },
    {
      id: 'folder-reports-studies',
      name: 'Feasibility Studies',
      parentId: 'folder-reports',
      children: [],
      documentCount: 10
    }],

    documentCount: 30
  }],

  documentCount: 175
},
{
  id: 'folder-operations',
  name: 'Operations',
  parentId: null,
  children: [
  {
    id: 'folder-procedures',
    name: 'Procedures',
    parentId: 'folder-operations',
    children: [
    {
      id: 'folder-procedures-safety',
      name: 'Safety Procedures',
      parentId: 'folder-procedures',
      children: [],
      documentCount: 15
    },
    {
      id: 'folder-procedures-maintenance',
      name: 'Maintenance Procedures',
      parentId: 'folder-procedures',
      children: [],
      documentCount: 15
    }],

    documentCount: 30
  },
  {
    id: 'folder-manuals',
    name: 'Operating Manuals',
    parentId: 'folder-operations',
    children: [],
    documentCount: 20
  }],

  documentCount: 50
},
{
  id: 'folder-compliance',
  name: 'Compliance & Quality',
  parentId: null,
  children: [
  {
    id: 'folder-compliance-environmental',
    name: 'Environmental',
    parentId: 'folder-compliance',
    children: [],
    documentCount: 10
  },
  {
    id: 'folder-compliance-quality',
    name: 'Quality Assurance',
    parentId: 'folder-compliance',
    children: [],
    documentCount: 10
  }],

  documentCount: 20
},
{
  id: 'folder-construction',
  name: 'Construction',
  parentId: null,
  children: [
  {
    id: 'folder-procedures-construction',
    name: 'Construction Procedures',
    parentId: 'folder-construction',
    children: [],
    documentCount: 15
  },
  {
    id: 'folder-construction-inspections',
    name: 'Inspection Records',
    parentId: 'folder-construction',
    children: [],
    documentCount: 8
  }],

  documentCount: 23
},
{
  id: 'folder-commissioning',
  name: 'Commissioning',
  parentId: null,
  children: [
  {
    id: 'folder-procedures-commissioning',
    name: 'Commissioning Procedures',
    parentId: 'folder-commissioning',
    children: [],
    documentCount: 12
  },
  {
    id: 'folder-commissioning-tests',
    name: 'Test Reports',
    parentId: 'folder-commissioning',
    children: [],
    documentCount: 6
  }],

  documentCount: 18
},
{
  id: 'folder-procurement',
  name: 'Procurement',
  parentId: null,
  children: [
  {
    id: 'folder-procurement-specs',
    name: 'Procurement Specs',
    parentId: 'folder-procurement',
    children: [],
    documentCount: 10
  },
  {
    id: 'folder-procurement-orders',
    name: 'Purchase Orders',
    parentId: 'folder-procurement',
    children: [],
    documentCount: 5
  }],

  documentCount: 15
},
{
  id: 'folder-hse',
  name: 'Health, Safety & Environment',
  parentId: null,
  children: [
  {
    id: 'folder-hse-reports',
    name: 'HSE Reports',
    parentId: 'folder-hse',
    children: [],
    documentCount: 15
  },
  {
    id: 'folder-hse-risk',
    name: 'Risk Assessments',
    parentId: 'folder-hse',
    children: [],
    documentCount: 8
  },
  {
    id: 'folder-hse-permits',
    name: 'Work Permits',
    parentId: 'folder-hse',
    children: [],
    documentCount: 5
  }],

  documentCount: 28
},
{
  id: 'folder-pm',
  name: 'Project Management',
  parentId: null,
  children: [
  {
    id: 'folder-pm-docs',
    name: 'Project Documents',
    parentId: 'folder-pm',
    children: [],
    documentCount: 10
  },
  {
    id: 'folder-pm-schedules',
    name: 'Schedules',
    parentId: 'folder-pm',
    children: [],
    documentCount: 5
  }],

  documentCount: 15
},
{
  id: 'folder-vendor',
  name: 'Vendor Documents',
  parentId: null,
  children: [
  {
    id: 'folder-vendor-datasheets',
    name: 'Datasheets',
    parentId: 'folder-vendor',
    children: [],
    documentCount: 20
  },
  {
    id: 'folder-vendor-manuals',
    name: 'Vendor Manuals',
    parentId: 'folder-vendor',
    children: [],
    documentCount: 8
  }],

  documentCount: 28
},
{
  id: 'folder-asbuilt-parent',
  name: 'As-Built Records',
  parentId: null,
  children: [
  {
    id: 'folder-asbuilt',
    name: 'As-Built Drawings',
    parentId: 'folder-asbuilt-parent',
    children: [],
    documentCount: 15
  },
  {
    id: 'folder-asbuilt-redlines',
    name: 'Redline Markups',
    parentId: 'folder-asbuilt-parent',
    children: [],
    documentCount: 7
  }],

  documentCount: 22
},
{
  id: 'folder-training',
  name: 'Training',
  parentId: null,
  children: [
  {
    id: 'folder-training-materials',
    name: 'Training Materials',
    parentId: 'folder-training',
    children: [],
    documentCount: 10
  },
  {
    id: 'folder-training-records',
    name: 'Training Records',
    parentId: 'folder-training',
    children: [],
    documentCount: 5
  }],

  documentCount: 15
},
{
  id: 'folder-archive',
  name: 'Archive',
  parentId: null,
  children: [
  {
    id: 'folder-archive-superseded',
    name: 'Superseded Documents',
    parentId: 'folder-archive',
    children: [],
    documentCount: 15
  },
  {
    id: 'folder-archive-historical',
    name: 'Historical Records',
    parentId: 'folder-archive',
    children: [],
    documentCount: 10
  }],

  documentCount: 25
}];