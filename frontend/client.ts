import { Skill, Job } from './types';

export const API_BASE = '/api';

export async function getSkills(): Promise<Skill[]> {
  const res = await fetch(`${API_BASE}/skills`);
  if (!res.ok) throw new Error('Failed to fetch skills');
  return res.json();
}

export async function getSkill(id: string): Promise<Skill> {
  const res = await fetch(`${API_BASE}/skills/${id}`);
  if (!res.ok) throw new Error('Failed to fetch skill');
  return res.json();
}

// Placeholder for jobs (to be implemented on backend later)
export async function getJobs(): Promise<Job[]> {
  // const res = await fetch(`${API_BASE}/jobs`);
  // return res.json();
  return [];
}
