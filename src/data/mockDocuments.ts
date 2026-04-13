import { Document } from '../types/document';

const authors = [
'John Smith',
'Sarah Johnson',
'Mike Chen',
'Lisa Wong',
'David Kumar',
'Emily Rodriguez',
'Robert Lee',
'Maria Garcia',
'James Wilson',
'Patricia Brown',
'Thomas Anderson',
'Nancy Miller',
'Jennifer Martinez',
'Michael Chang',
'Daniel Kim',
'Susan Taylor',
'Kevin White',
'Laura Thompson',
'Christopher Davis',
'Margaret Robinson'];


const projects = [
'Refinery Upgrade 2024',
'Operations Manual',
'Maintenance Program',
'Safety Compliance 2024',
'Environmental Initiative',
'Digital Transformation',
'Pipeline Extension',
'Tank Farm Upgrade'];


const statuses: Array<
  'Draft' | 'In Review' | 'Approved' | 'Superseded' | 'Archived'> =
['Draft', 'In Review', 'Approved', 'Superseded', 'Archived'];

const thumbnails = [
'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400',
'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400',
'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400',
'https://images.unsplash.com/photo-1568667256549-094345857637?w=400',
'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400',
'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400',
'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400'];


const getRandomItem = <T,>(array: T[]): T =>
array[Math.floor(Math.random() * array.length)];

const getRandomDate = (start: Date, end: Date) =>
new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).
toISOString().
split('T')[0];

// Mechanical Drawings
const mechDrawings: Document[] = Array.from({ length: 30 }, (_, i) => ({
  id: `DWG-MECH-${String(i + 1).padStart(3, '0')}-R${i % 3 + 1}`,
  title: `Mechanical Drawing - ${['Piping Layout', 'Equipment Layout', 'Structural Support', 'Valve Assembly', 'Pump Installation', 'Heat Exchanger'][i % 6]} ${Math.floor(i / 6) + 1}`,
  revisionNumber: `R${i % 3 + 1}`,
  status: statuses[i % 5],
  author: authors[i % authors.length],
  dateCreated: getRandomDate(new Date('2022-01-01'), new Date('2023-06-01')),
  dateModified: getRandomDate(new Date('2023-06-01'), new Date('2024-02-10')),
  project: projects[i % projects.length],
  asset: `Unit ${i % 5 + 1}00`,
  tags: ['mechanical', 'drawing', 'piping'],
  fileType: 'PDF' as const,
  fileSize: `${(Math.random() * 3 + 1).toFixed(1)} MB`,
  documentType: 'Drawing' as const,
  description:
  'Mechanical engineering drawing for piping and equipment systems',
  thumbnail: thumbnails[i % thumbnails.length],
  folderId: 'folder-drawings-mechanical',
  relationships: []
}));

// Electrical Drawings
const elecDrawings: Document[] = Array.from({ length: 25 }, (_, i) => ({
  id: `DWG-ELEC-${String(i + 1).padStart(3, '0')}-R${i % 3 + 1}`,
  title: `Electrical Drawing - ${['Single Line Diagram', 'Control Panel Layout', 'Cable Tray', 'Lighting Layout', 'Grounding System'][i % 5]} ${Math.floor(i / 5) + 1}`,
  revisionNumber: `R${i % 3 + 1}`,
  status: statuses[i % 5],
  author: authors[i % authors.length],
  dateCreated: getRandomDate(new Date('2022-01-01'), new Date('2023-06-01')),
  dateModified: getRandomDate(new Date('2023-06-01'), new Date('2024-02-10')),
  project: projects[i % projects.length],
  asset: `Control Building ${i % 2 + 1}`,
  tags: ['electrical', 'drawing', 'power'],
  fileType: 'PDF' as const,
  fileSize: `${(Math.random() * 3 + 1).toFixed(1)} MB`,
  documentType: 'Drawing' as const,
  description: 'Electrical system drawing for power distribution and control',
  thumbnail: thumbnails[(i + 1) % thumbnails.length],
  folderId: 'folder-drawings-electrical',
  relationships: []
}));

// Civil Drawings
const civilDrawings: Document[] = Array.from({ length: 20 }, (_, i) => ({
  id: `DWG-CIVIL-${String(i + 1).padStart(3, '0')}-R${i % 3 + 1}`,
  title: `Civil Drawing - ${['Foundation Plan', 'Structural Steel', 'Platform Layout', 'Concrete Details', 'Site Grading'][i % 5]} ${Math.floor(i / 5) + 1}`,
  revisionNumber: `R${i % 3 + 1}`,
  status: statuses[i % 5],
  author: authors[i % authors.length],
  dateCreated: getRandomDate(new Date('2022-01-01'), new Date('2023-06-01')),
  dateModified: getRandomDate(new Date('2023-06-01'), new Date('2024-02-10')),
  project: projects[i % projects.length],
  asset: `Unit ${i % 5 + 1}00`,
  tags: ['civil', 'structural', 'drawing'],
  fileType: 'PDF' as const,
  fileSize: `${(Math.random() * 4 + 2).toFixed(1)} MB`,
  documentType: 'Drawing' as const,
  description: 'Civil and structural engineering drawing',
  thumbnail: thumbnails[(i + 2) % thumbnails.length],
  folderId: 'folder-drawings-civil',
  relationships: []
}));

// Instrumentation Drawings
const instrDrawings: Document[] = Array.from({ length: 20 }, (_, i) => ({
  id: `DWG-INST-${String(i + 1).padStart(3, '0')}-R${i % 3 + 1}`,
  title: `Instrumentation Drawing - ${['P&ID', 'Loop Diagram', 'Control Valve Detail', 'Instrument Location', 'Junction Box'][i % 5]} ${Math.floor(i / 5) + 1}`,
  revisionNumber: `R${i % 3 + 1}`,
  status: statuses[i % 5],
  author: authors[i % authors.length],
  dateCreated: getRandomDate(new Date('2022-01-01'), new Date('2023-06-01')),
  dateModified: getRandomDate(new Date('2023-06-01'), new Date('2024-02-10')),
  project: projects[i % projects.length],
  asset: `Unit ${i % 5 + 1}00`,
  tags: ['instrumentation', 'drawing', 'controls'],
  fileType: 'PDF' as const,
  fileSize: `${(Math.random() * 2 + 1).toFixed(1)} MB`,
  documentType: 'Drawing' as const,
  description: 'Instrumentation and control system drawing',
  thumbnail: thumbnails[(i + 3) % thumbnails.length],
  folderId: 'folder-drawings-instrumentation',
  relationships: []
}));

// Process Flow Diagrams
const processDrawings: Document[] = Array.from({ length: 15 }, (_, i) => ({
  id: `DWG-PROC-${String(i + 1).padStart(3, '0')}-R${i % 3 + 1}`,
  title: `Process Flow Diagram - ${['Main Process', 'Utility Systems', 'Cooling Water', 'Steam Generation', 'Waste Treatment'][i % 5]} ${Math.floor(i / 5) + 1}`,
  revisionNumber: `R${i % 3 + 1}`,
  status: statuses[i % 5],
  author: authors[i % authors.length],
  dateCreated: getRandomDate(new Date('2022-01-01'), new Date('2023-06-01')),
  dateModified: getRandomDate(new Date('2023-06-01'), new Date('2024-02-10')),
  project: projects[i % projects.length],
  asset: `Unit ${i % 5 + 1}00`,
  tags: ['process', 'flow diagram', 'PFD'],
  fileType: 'PDF' as const,
  fileSize: `${(Math.random() * 2 + 1).toFixed(1)} MB`,
  documentType: 'Drawing' as const,
  description: 'Process flow diagram for plant systems',
  thumbnail: thumbnails[(i + 4) % thumbnails.length],
  folderId: 'folder-drawings-process',
  relationships: []
}));

// Equipment Specifications
const equipSpecs: Document[] = Array.from({ length: 20 }, (_, i) => ({
  id: `SPEC-EQUIP-${String(i + 1).padStart(3, '0')}-R${i % 2 + 1}`,
  title: `Equipment Specification - ${['Centrifugal Pump', 'Heat Exchanger', 'Pressure Vessel', 'Compressor', 'Valve'][i % 5]} ${Math.floor(i / 5) + 1}`,
  revisionNumber: `R${i % 2 + 1}`,
  status: statuses[i % 5],
  author: authors[i % authors.length],
  dateCreated: getRandomDate(new Date('2022-01-01'), new Date('2023-06-01')),
  dateModified: getRandomDate(new Date('2023-06-01'), new Date('2024-02-10')),
  project: projects[i % projects.length],
  tags: ['specification', 'equipment', 'procurement'],
  fileType: 'PDF' as const,
  fileSize: `${(Math.random() * 2 + 1).toFixed(1)} MB`,
  documentType: 'Specification' as const,
  description: 'Technical specification for process equipment',
  thumbnail: thumbnails[(i + 5) % thumbnails.length],
  folderId: 'folder-specs-equipment',
  relationships: []
}));

// Material Specifications
const matSpecs: Document[] = Array.from({ length: 15 }, (_, i) => ({
  id: `SPEC-MAT-${String(i + 1).padStart(3, '0')}-R${i % 2 + 1}`,
  title: `Material Specification - ${['Piping Materials', 'Structural Steel', 'Insulation', 'Gaskets & Seals', 'Coatings'][i % 5]} ${Math.floor(i / 5) + 1}`,
  revisionNumber: `R${i % 2 + 1}`,
  status: statuses[i % 5],
  author: authors[i % authors.length],
  dateCreated: getRandomDate(new Date('2022-01-01'), new Date('2023-06-01')),
  dateModified: getRandomDate(new Date('2023-06-01'), new Date('2024-02-10')),
  project: projects[i % projects.length],
  tags: ['specification', 'materials', 'standards'],
  fileType: 'PDF' as const,
  fileSize: `${(Math.random() * 2 + 0.5).toFixed(1)} MB`,
  documentType: 'Specification' as const,
  description: 'Material requirements and standards specification',
  thumbnail: thumbnails[(i + 6) % thumbnails.length],
  folderId: 'folder-specs-materials',
  relationships: []
}));

// Analysis Reports
const analysisReports: Document[] = Array.from({ length: 20 }, (_, i) => ({
  id: `RPT-ANAL-${String(i + 1).padStart(3, '0')}-R${i % 2 + 1}`,
  title: `Analysis Report - ${['Stress Analysis', 'Vibration Study', 'Corrosion Assessment', 'Thermal Analysis', 'Fatigue Analysis'][i % 5]} ${Math.floor(i / 5) + 1}`,
  revisionNumber: `R${i % 2 + 1}`,
  status: statuses[i % 5],
  author: authors[i % authors.length],
  dateCreated: getRandomDate(new Date('2022-01-01'), new Date('2023-06-01')),
  dateModified: getRandomDate(new Date('2023-06-01'), new Date('2024-02-10')),
  project: projects[i % projects.length],
  asset: `Unit ${i % 5 + 1}00`,
  tags: ['analysis', 'engineering', 'report'],
  fileType: 'PDF' as const,
  fileSize: `${(Math.random() * 4 + 2).toFixed(1)} MB`,
  documentType: 'Technical Report' as const,
  description: 'Engineering analysis report',
  thumbnail: thumbnails[(i + 7) % thumbnails.length],
  folderId: 'folder-reports-analysis',
  relationships: []
}));

// Feasibility Studies
const feasibilityStudies: Document[] = Array.from({ length: 10 }, (_, i) => ({
  id: `RPT-STUDY-${String(i + 1).padStart(3, '0')}-R1`,
  title: `Feasibility Study - ${['Energy Efficiency', 'Process Optimization', 'Equipment Upgrade', 'Capacity Expansion', 'Automation'][i % 5]} ${Math.floor(i / 5) + 1}`,
  revisionNumber: 'R1',
  status: statuses[i % 5],
  author: authors[i % authors.length],
  dateCreated: getRandomDate(new Date('2022-01-01'), new Date('2023-06-01')),
  dateModified: getRandomDate(new Date('2023-06-01'), new Date('2024-02-10')),
  project: projects[i % projects.length],
  tags: ['feasibility', 'study', 'planning'],
  fileType: 'PDF' as const,
  fileSize: `${(Math.random() * 5 + 3).toFixed(1)} MB`,
  documentType: 'Technical Report' as const,
  description: 'Feasibility study for project planning',
  thumbnail: thumbnails[i % thumbnails.length],
  folderId: 'folder-reports-studies',
  relationships: []
}));

// Safety Procedures
const safetyProcs: Document[] = Array.from({ length: 15 }, (_, i) => ({
  id: `PROC-SAFE-${String(i + 1).padStart(3, '0')}-R${i % 3 + 1}`,
  title: `Safety Procedure - ${['Lockout/Tagout', 'Confined Space Entry', 'Hot Work Permit', 'Emergency Shutdown', 'Fall Protection'][i % 5]} ${Math.floor(i / 5) + 1}`,
  revisionNumber: `R${i % 3 + 1}`,
  status: statuses[i % 5],
  author: authors[i % authors.length],
  dateCreated: getRandomDate(new Date('2022-01-01'), new Date('2023-06-01')),
  dateModified: getRandomDate(new Date('2023-06-01'), new Date('2024-02-10')),
  project: 'Safety Compliance 2024',
  asset: 'All Units',
  tags: ['safety', 'procedure', 'compliance'],
  fileType: 'DOCX' as const,
  fileSize: `${(Math.random() * 0.5 + 0.3).toFixed(1)} MB`,
  documentType: 'Procedure' as const,
  description: 'Safety procedure for plant operations',
  thumbnail: thumbnails[(i + 1) % thumbnails.length],
  folderId: 'folder-procedures-safety',
  relationships: []
}));

// Maintenance Procedures
const maintProcs: Document[] = Array.from({ length: 15 }, (_, i) => ({
  id: `PROC-MAINT-${String(i + 1).padStart(3, '0')}-R${i % 2 + 1}`,
  title: `Maintenance Procedure - ${['Valve Inspection', 'Pump Maintenance', 'Calibration', 'Lubrication', 'Filter Replacement'][i % 5]} ${Math.floor(i / 5) + 1}`,
  revisionNumber: `R${i % 2 + 1}`,
  status: statuses[i % 5],
  author: authors[i % authors.length],
  dateCreated: getRandomDate(new Date('2022-01-01'), new Date('2023-06-01')),
  dateModified: getRandomDate(new Date('2023-06-01'), new Date('2024-02-10')),
  project: 'Maintenance Program',
  asset: `Unit ${i % 5 + 1}00`,
  tags: ['maintenance', 'procedure', 'preventive'],
  fileType: 'DOCX' as const,
  fileSize: `${(Math.random() * 0.4 + 0.3).toFixed(1)} MB`,
  documentType: 'Procedure' as const,
  description: 'Maintenance procedure for plant equipment',
  thumbnail: thumbnails[(i + 2) % thumbnails.length],
  folderId: 'folder-procedures-maintenance',
  relationships: []
}));

// Operating Manuals
const opManuals: Document[] = Array.from({ length: 20 }, (_, i) => ({
  id: `MAN-OPS-${String(i + 1).padStart(3, '0')}-R${i % 2 + 1}`,
  title: `Operating Manual - ${['Startup Procedures', 'Normal Operations', 'Shutdown Procedures', 'Troubleshooting', 'Emergency Response'][i % 5]} ${Math.floor(i / 5) + 1}`,
  revisionNumber: `R${i % 2 + 1}`,
  status: statuses[i % 5],
  author: authors[i % authors.length],
  dateCreated: getRandomDate(new Date('2022-01-01'), new Date('2023-06-01')),
  dateModified: getRandomDate(new Date('2023-06-01'), new Date('2024-02-10')),
  project: 'Operations Manual',
  asset: `Unit ${i % 5 + 1}00`,
  tags: ['operations', 'manual', 'procedures'],
  fileType: 'DOCX' as const,
  fileSize: `${(Math.random() * 1 + 0.5).toFixed(1)} MB`,
  documentType: 'Manual' as const,
  description: 'Operating manual for plant systems',
  thumbnail: thumbnails[(i + 3) % thumbnails.length],
  folderId: 'folder-manuals',
  relationships: []
}));

// Environmental Compliance
const envCompliance: Document[] = Array.from({ length: 10 }, (_, i) => ({
  id: `COMP-ENV-${String(i + 1).padStart(3, '0')}-R1`,
  title: `Environmental Report - ${['Impact Assessment', 'Emissions Monitoring', 'Waste Management', 'Water Quality', 'Air Quality'][i % 5]} ${Math.floor(i / 5) + 1}`,
  revisionNumber: 'R1',
  status: statuses[i % 5],
  author: authors[i % authors.length],
  dateCreated: getRandomDate(new Date('2022-01-01'), new Date('2023-06-01')),
  dateModified: getRandomDate(new Date('2023-06-01'), new Date('2024-02-10')),
  project: 'Environmental Initiative',
  tags: ['environmental', 'compliance', 'monitoring'],
  fileType: 'PDF' as const,
  fileSize: `${(Math.random() * 3 + 2).toFixed(1)} MB`,
  documentType: 'Technical Report' as const,
  description: 'Environmental compliance report',
  thumbnail: thumbnails[(i + 4) % thumbnails.length],
  folderId: 'folder-compliance-environmental',
  relationships: []
}));

// Quality Assurance
const qaReports: Document[] = Array.from({ length: 10 }, (_, i) => ({
  id: `COMP-QA-${String(i + 1).padStart(3, '0')}-R1`,
  title: `Quality Assurance - ${['Inspection Plan', 'Testing Procedures', 'Non-Conformance Report', 'Audit Report', 'Quality Manual'][i % 5]} ${Math.floor(i / 5) + 1}`,
  revisionNumber: 'R1',
  status: statuses[i % 5],
  author: authors[i % authors.length],
  dateCreated: getRandomDate(new Date('2022-01-01'), new Date('2023-06-01')),
  dateModified: getRandomDate(new Date('2023-06-01'), new Date('2024-02-10')),
  project: projects[i % projects.length],
  tags: ['quality', 'assurance', 'inspection'],
  fileType: 'PDF' as const,
  fileSize: `${(Math.random() * 2 + 1).toFixed(1)} MB`,
  documentType: 'Technical Report' as const,
  description: 'Quality assurance documentation',
  thumbnail: thumbnails[(i + 5) % thumbnails.length],
  folderId: 'folder-compliance-quality',
  relationships: []
}));

// Construction Procedures
const constProcs: Document[] = Array.from({ length: 15 }, (_, i) => ({
  id: `PROC-CONST-${String(i + 1).padStart(3, '0')}-R${i % 2 + 1}`,
  title: `Construction Procedure - ${['Excavation', 'Concrete Pouring', 'Steel Erection', 'Welding', 'Scaffolding'][i % 5]} ${Math.floor(i / 5) + 1}`,
  revisionNumber: `R${i % 2 + 1}`,
  status: statuses[i % 5],
  author: authors[i % authors.length],
  dateCreated: getRandomDate(new Date('2022-01-01'), new Date('2023-06-01')),
  dateModified: getRandomDate(new Date('2023-06-01'), new Date('2024-02-10')),
  project: projects[i % projects.length],
  tags: ['construction', 'procedure', 'site work'],
  fileType: 'PDF' as const,
  fileSize: `${(Math.random() * 1.5 + 0.5).toFixed(1)} MB`,
  documentType: 'Procedure' as const,
  description: 'Construction procedure for site activities',
  thumbnail: thumbnails[(i + 6) % thumbnails.length],
  folderId: 'folder-procedures-construction',
  relationships: []
}));

// Commissioning Procedures
const commProcs: Document[] = Array.from({ length: 12 }, (_, i) => ({
  id: `PROC-COMM-${String(i + 1).padStart(3, '0')}-R${i % 2 + 1}`,
  title: `Commissioning Procedure - ${['Pre-Commissioning', 'Loop Testing', 'Performance Test', 'Punch List', 'Handover'][i % 5]} ${Math.floor(i / 5) + 1}`,
  revisionNumber: `R${i % 2 + 1}`,
  status: statuses[i % 5],
  author: authors[i % authors.length],
  dateCreated: getRandomDate(new Date('2022-01-01'), new Date('2023-06-01')),
  dateModified: getRandomDate(new Date('2023-06-01'), new Date('2024-02-10')),
  project: projects[i % projects.length],
  tags: ['commissioning', 'procedure', 'startup'],
  fileType: 'PDF' as const,
  fileSize: `${(Math.random() * 1.5 + 0.5).toFixed(1)} MB`,
  documentType: 'Procedure' as const,
  description: 'Commissioning procedure for plant systems',
  thumbnail: thumbnails[(i + 7) % thumbnails.length],
  folderId: 'folder-procedures-commissioning',
  relationships: []
}));

// Vendor Datasheets
const vendorDatasheets: Document[] = Array.from({ length: 20 }, (_, i) => ({
  id: `VEN-DS-${String(i + 1).padStart(3, '0')}-R1`,
  title: `Vendor Datasheet - ${['Pump', 'Valve', 'Instrument', 'Heat Exchanger', 'Compressor', 'Motor', 'Tank'][i % 7]} ${Math.floor(i / 7) + 1}`,
  revisionNumber: 'R1',
  status: statuses[i % 5],
  author: authors[i % authors.length],
  dateCreated: getRandomDate(new Date('2022-01-01'), new Date('2023-06-01')),
  dateModified: getRandomDate(new Date('2023-06-01'), new Date('2024-02-10')),
  project: projects[i % projects.length],
  tags: ['vendor', 'datasheet', 'equipment'],
  fileType: 'PDF' as const,
  fileSize: `${(Math.random() * 1 + 0.3).toFixed(1)} MB`,
  documentType: 'Specification' as const,
  description: 'Vendor equipment datasheet',
  thumbnail: thumbnails[i % thumbnails.length],
  folderId: 'folder-vendor-datasheets',
  relationships: []
}));

// Procurement Specs
const procSpecs: Document[] = Array.from({ length: 10 }, (_, i) => ({
  id: `SPEC-PROC-${String(i + 1).padStart(3, '0')}-R${i % 2 + 1}`,
  title: `Procurement Specification - ${['Piping', 'Electrical', 'Instrumentation', 'Structural', 'Insulation'][i % 5]} ${Math.floor(i / 5) + 1}`,
  revisionNumber: `R${i % 2 + 1}`,
  status: statuses[i % 5],
  author: authors[i % authors.length],
  dateCreated: getRandomDate(new Date('2022-01-01'), new Date('2023-06-01')),
  dateModified: getRandomDate(new Date('2023-06-01'), new Date('2024-02-10')),
  project: projects[i % projects.length],
  tags: ['procurement', 'specification', 'purchasing'],
  fileType: 'PDF' as const,
  fileSize: `${(Math.random() * 1.5 + 0.5).toFixed(1)} MB`,
  documentType: 'Specification' as const,
  description: 'Procurement specification for materials and equipment',
  thumbnail: thumbnails[(i + 1) % thumbnails.length],
  folderId: 'folder-procurement-specs',
  relationships: []
}));

// HSE Reports
const hseReports: Document[] = Array.from({ length: 15 }, (_, i) => ({
  id: `RPT-HSE-${String(i + 1).padStart(3, '0')}-R1`,
  title: `HSE Report - ${['Risk Assessment', 'Safety Audit', 'Environmental Monitoring', 'Incident Investigation', 'Permit Review'][i % 5]} ${Math.floor(i / 5) + 1}`,
  revisionNumber: 'R1',
  status: statuses[i % 5],
  author: authors[i % authors.length],
  dateCreated: getRandomDate(new Date('2022-01-01'), new Date('2023-06-01')),
  dateModified: getRandomDate(new Date('2023-06-01'), new Date('2024-02-10')),
  project: 'Safety Compliance 2024',
  tags: ['HSE', 'safety', 'environment'],
  fileType: 'PDF' as const,
  fileSize: `${(Math.random() * 3 + 1).toFixed(1)} MB`,
  documentType: 'Technical Report' as const,
  description: 'Health, safety and environment report',
  thumbnail: thumbnails[(i + 2) % thumbnails.length],
  folderId: 'folder-hse-reports',
  relationships: []
}));

// Project Management Docs
const pmDocs: Document[] = Array.from({ length: 10 }, (_, i) => ({
  id: `PM-DOC-${String(i + 1).padStart(3, '0')}-R${i % 2 + 1}`,
  title: `Project Document - ${['Project Plan', 'Progress Report', 'Change Request', 'Meeting Minutes', 'Risk Register'][i % 5]} ${Math.floor(i / 5) + 1}`,
  revisionNumber: `R${i % 2 + 1}`,
  status: statuses[i % 5],
  author: authors[i % authors.length],
  dateCreated: getRandomDate(new Date('2022-01-01'), new Date('2023-06-01')),
  dateModified: getRandomDate(new Date('2023-06-01'), new Date('2024-02-10')),
  project: projects[i % projects.length],
  tags: ['project management', 'planning', 'reporting'],
  fileType: 'DOCX' as const,
  fileSize: `${(Math.random() * 1 + 0.5).toFixed(1)} MB`,
  documentType: 'Technical Report' as const,
  description: 'Project management documentation',
  thumbnail: thumbnails[(i + 3) % thumbnails.length],
  folderId: 'folder-pm-docs',
  relationships: []
}));

// As-Built Records
const asBuiltRecords: Document[] = Array.from({ length: 15 }, (_, i) => ({
  id: `AB-REC-${String(i + 1).padStart(3, '0')}-R1`,
  title: `As-Built Record - ${['Piping As-Built', 'Electrical As-Built', 'Civil As-Built', 'Instrument As-Built', 'Structural As-Built'][i % 5]} ${Math.floor(i / 5) + 1}`,
  revisionNumber: 'R1',
  status: statuses[i % 5],
  author: authors[i % authors.length],
  dateCreated: getRandomDate(new Date('2022-01-01'), new Date('2023-06-01')),
  dateModified: getRandomDate(new Date('2023-06-01'), new Date('2024-02-10')),
  project: projects[i % projects.length],
  tags: ['as-built', 'record', 'construction'],
  fileType: 'PDF' as const,
  fileSize: `${(Math.random() * 3 + 2).toFixed(1)} MB`,
  documentType: 'Drawing' as const,
  description: 'As-built record drawing',
  thumbnail: thumbnails[(i + 4) % thumbnails.length],
  folderId: 'folder-asbuilt',
  relationships: []
}));

// Training Materials
const trainingMats: Document[] = Array.from({ length: 10 }, (_, i) => ({
  id: `TRN-MAT-${String(i + 1).padStart(3, '0')}-R${i % 2 + 1}`,
  title: `Training Material - ${['Safety Induction', 'Equipment Operation', 'Emergency Response', 'Process Overview', 'Maintenance Training'][i % 5]} ${Math.floor(i / 5) + 1}`,
  revisionNumber: `R${i % 2 + 1}`,
  status: statuses[i % 5],
  author: authors[i % authors.length],
  dateCreated: getRandomDate(new Date('2022-01-01'), new Date('2023-06-01')),
  dateModified: getRandomDate(new Date('2023-06-01'), new Date('2024-02-10')),
  project: 'Operations Manual',
  tags: ['training', 'material', 'education'],
  fileType: 'PDF' as const,
  fileSize: `${(Math.random() * 5 + 3).toFixed(1)} MB`,
  documentType: 'Manual' as const,
  description: 'Training material for plant personnel',
  thumbnail: thumbnails[(i + 5) % thumbnails.length],
  folderId: 'folder-training-materials',
  relationships: []
}));

// Archive - Superseded
const archivedDocs: Document[] = Array.from({ length: 15 }, (_, i) => ({
  id: `ARCH-SUP-${String(i + 1).padStart(3, '0')}-R0`,
  title: `Superseded - ${['Drawing', 'Specification', 'Procedure', 'Manual', 'Report'][i % 5]} ${Math.floor(i / 5) + 1}`,
  revisionNumber: 'R0',
  status: 'Superseded' as const,
  author: authors[i % authors.length],
  dateCreated: getRandomDate(new Date('2020-01-01'), new Date('2022-01-01')),
  dateModified: getRandomDate(new Date('2022-01-01'), new Date('2023-01-01')),
  project: projects[i % projects.length],
  tags: ['superseded', 'archive', 'historical'],
  fileType: 'PDF' as const,
  fileSize: `${(Math.random() * 2 + 1).toFixed(1)} MB`,
  documentType: (
  [
  'Drawing',
  'Specification',
  'Procedure',
  'Manual',
  'Technical Report'] as
  const)[
  i % 5],
  description: 'Superseded document retained for historical reference',
  thumbnail: thumbnails[(i + 6) % thumbnails.length],
  folderId: 'folder-archive-superseded',
  relationships: []
}));

export const mockDocuments: Document[] = [
...mechDrawings,
...elecDrawings,
...civilDrawings,
...instrDrawings,
...processDrawings,
...equipSpecs,
...matSpecs,
...analysisReports,
...feasibilityStudies,
...safetyProcs,
...maintProcs,
...opManuals,
...envCompliance,
...qaReports,
...constProcs,
...commProcs,
...vendorDatasheets,
...procSpecs,
...hseReports,
...pmDocs,
...asBuiltRecords,
...trainingMats,
...archivedDocs];