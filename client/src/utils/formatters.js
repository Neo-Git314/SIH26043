// Utilities for formatting backend enum values without mutating raw data

const CATEGORY_MAP = {
  water_resources: 'Water Resources',
  education: 'Education',
  environment: 'Environment',
  healthcare: 'Healthcare',
  agriculture: 'Agriculture',
  urban_development: 'Urban Development',
  energy: 'Energy',
  accessibility: 'Accessibility',
  public_administration: 'Public Administration',
  rural_livelihoods: 'Rural Livelihoods',
};

const STATUS_MAP = {
  pending: 'Pending Review',
  reviewed: 'Reviewed & Open',
  assigned: 'Assigned to Uni',
  in_progress: 'In Progress',
  resolved: 'Resolved',
  duplicate: 'Duplicate Flagged',
};

export function formatCategory(cat) {
  if (!cat) return 'Uncategorized';
  if (CATEGORY_MAP[cat]) return CATEGORY_MAP[cat];
  return cat
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function formatStatus(status) {
  if (!status) return 'Unknown';
  if (STATUS_MAP[status]) return STATUS_MAP[status];
  return status
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
