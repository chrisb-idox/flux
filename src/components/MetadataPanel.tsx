import React from 'react';
import { Document } from '../types/document';
interface MetadataPanelProps {
  document: Document;
}
export function MetadataPanel({ document }: MetadataPanelProps) {
  const metadata = [
  {
    label: 'Document ID',
    value: document.id
  },
  {
    label: 'Title',
    value: document.title
  },
  {
    label: 'Revision Number',
    value: document.revisionNumber
  },
  {
    label: 'Status',
    value: document.status
  },
  {
    label: 'Document Type',
    value: document.documentType
  },
  {
    label: 'Author',
    value: document.author
  },
  {
    label: 'Date Created',
    value: document.dateCreated
  },
  {
    label: 'Date Modified',
    value: document.dateModified
  },
  {
    label: 'Project',
    value: document.project
  },
  {
    label: 'Asset',
    value: document.asset || 'N/A'
  },
  {
    label: 'File Type',
    value: document.fileType
  },
  {
    label: 'File Size',
    value: document.fileSize
  }];

  return (
    <div className="border border-neutral-200 bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="border-b border-neutral-200 px-4 py-2.5 bg-neutral-50">
        <h2 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider">
          Document Metadata
        </h2>
      </div>
      <div className="p-4">
        <div className="space-y-2.5">
          {metadata.map(({ label, value }) =>
          <div
            key={label}
            className="grid grid-cols-[120px_1fr] gap-4 text-sm items-baseline">
            
              <span className="text-neutral-500 font-medium">{label}</span>
              <span className="text-neutral-900 font-medium">{value}</span>
            </div>
          )}
        </div>

        <div className="mt-6 pt-5 border-t border-neutral-100">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {document.tags.map((tag) =>
            <span
              key={tag}
              className="text-xs font-medium bg-neutral-100 px-2.5 py-1 rounded-full border border-neutral-200 text-neutral-600">
              
                {tag}
              </span>
            )}
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-neutral-100">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">
            Description
          </h3>
          <p className="text-sm text-neutral-700 leading-relaxed">
            {document.description}
          </p>
        </div>
      </div>
    </div>);

}