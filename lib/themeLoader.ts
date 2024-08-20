import fs from 'fs/promises'
import path from 'path'

const THEMES_DIR = path.join(process.cwd(), 'themes')

interface TemplateMap {
  [key: string]: string;
}

interface ThemeLoadResult {
  templates: TemplateMap;
  activeTheme: string;
}

export async function loadThemeTemplates(requestedTheme?: string): Promise<ThemeLoadResult> {
  const activeTheme = requestedTheme || process.env.ACTIVE_THEME || 'base'
  const baseThemeDir = path.join(THEMES_DIR, 'base')
  const activeThemeDir = path.join(THEMES_DIR, activeTheme)

  async function loadTemplatesFromDir(dir: string, prefix: string): Promise<TemplateMap> {
    const templates: TemplateMap = {}
    let files: fs.Dirent[]
    try {
      files = await fs.readdir(dir, { withFileTypes: true })
    } catch (error) {
      console.log(`Directory not found: ${dir}`)
      return templates
    }

    for (const file of files) {
      const fullPath = path.join(dir, file.name)
      if (file.isDirectory()) {
        const subTemplates = await loadTemplatesFromDir(fullPath, `${prefix}${file.name}/`)
        Object.assign(templates, subTemplates)
      } else if (file.isFile() && file.name.endsWith('.ejs')) {
        const key = `${prefix}${file.name.replace(/\.ejs$/, '')}`
        templates[key] = await fs.readFile(fullPath, 'utf-8')
      }
    }

    return templates
  }

  const baseTemplates = await loadTemplatesFromDir(baseThemeDir, 'base/')
  const activeTemplates = activeTheme !== 'base' 
    ? await loadTemplatesFromDir(activeThemeDir, `${activeTheme}/`)
    : {}

  const mergedTemplates = { ...baseTemplates, ...activeTemplates }
  
  console.log('Loaded templates:', Object.keys(mergedTemplates))
  console.log('Active theme:', activeTheme)
  
  return { templates: mergedTemplates, activeTheme }
}

export function getTemplateForTheme(templates: TemplateMap, activeTheme: string, templateName: string): string {
  const activeTemplateName = `${activeTheme}/${templateName}`
  const baseTemplateName = `base/${templateName}`

  if (templates[activeTemplateName]) {
    console.log(`Using template from active theme: ${activeTemplateName}`)
    return templates[activeTemplateName]
  }

  if (templates[baseTemplateName]) {
    console.log(`Falling back to base theme template: ${baseTemplateName}`)
    return templates[baseTemplateName]
  }

  throw new Error(`Template not found: ${templateName} (tried ${activeTemplateName} and ${baseTemplateName})`)
}