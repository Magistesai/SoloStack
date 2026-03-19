import toolsRaw from '../../data/tools.json';
import categoriesRaw from '../../data/categories.json';

const REQUIRED_TOOL_FIELDS: (keyof any)[] = ['id', 'name', 'slug', 'category', 'tagline', 'description', 'url', 'affiliateUrl', 'logo', 'pricing', 'pricingType', 'soloScore', 'featured', 'sponsored', 'tags', 'addedDate'];
const VALID_PRICING_TYPES = ['free', 'freemium', 'paid', 'usage', 'open-source'];

export function validateData(): void {
  const tools = toolsRaw as any[];
  const categories = categoriesRaw as any[];
  const errors: string[] = [];

  // 1. Required fields
  tools.forEach((tool, i) => {
    REQUIRED_TOOL_FIELDS.forEach(field => {
      if (tool[field] === undefined || tool[field] === null || tool[field] === '') {
        errors.push(`Tool[${i}] "${tool.id || 'unknown'}": missing required field "${String(field)}"`);
      }
    });
  });

  // 2. soloScore range
  tools.forEach(tool => {
    if (typeof tool.soloScore !== 'number' || tool.soloScore < 0 || tool.soloScore > 100) {
      errors.push(`Tool "${tool.id}": soloScore must be 0–100, got ${tool.soloScore}`);
    }
  });

  // 3. Unique slugs
  const slugs = tools.map(t => t.slug);
  const dupes = slugs.filter((s, i) => slugs.indexOf(s) !== i);
  if (dupes.length > 0) errors.push(`Duplicate tool slugs: ${dupes.join(', ')}`);

  // 4. Valid pricing type
  tools.forEach(tool => {
    if (!VALID_PRICING_TYPES.includes(tool.pricingType)) {
      errors.push(`Tool "${tool.id}": invalid pricingType "${tool.pricingType}"`);
    }
  });

  // 5. Category references
  const catSlugs = new Set(categories.map((c: any) => c.slug));
  tools.forEach(tool => {
    if (!catSlugs.has(tool.category)) {
      errors.push(`Tool "${tool.id}": category "${tool.category}" not found in categories.json`);
    }
  });

  // 6. Editor picks reference real tools
  const toolIds = new Set(tools.map(t => t.id));
  categories.forEach((cat: any) => {
    if (!toolIds.has(cat.editorPick)) {
      errors.push(`Category "${cat.slug}": editorPick "${cat.editorPick}" not found in tools.json`);
    }
  });

  if (errors.length > 0) {
    throw new Error(`\n\n[SoloStack Data Validation FAILED]\n${errors.map(e => `  ✗ ${e}`).join('\n')}\n`);
  }
}
