import toolsRaw from '../../data/tools.json';
import categoriesRaw from '../../data/categories.json';
import stacksRaw from '../../data/stacks.json';
import { Tool, Category, Stack } from '@/types';
import { validateData } from './validate-data';

// Validate at module load — throws if data is invalid, fails the build
validateData();

export const tools: Tool[] = toolsRaw as Tool[];
export const categories: Category[] = categoriesRaw as Category[];
export const stacks: Stack[] = stacksRaw as Stack[];

export function getToolsByCategory(slug: string): Tool[] {
  return tools.filter(t => t.category === slug);
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find(t => t.slug === slug);
}

export function getToolById(id: string): Tool | undefined {
  return tools.find(t => t.id === id);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug);
}

export function getFeaturedTools(): Tool[] {
  return tools.filter(t => t.featured).sort((a, b) => b.soloScore - a.soloScore);
}

export function getStackBySlug(slug: string): Stack | undefined {
  return stacks.find(s => s.slug === slug);
}

export function getScoreBand(score: number): 'red' | 'yellow' | 'green' {
  if (score >= 71) return 'green';
  if (score >= 41) return 'yellow';
  return 'red';
}
