import ejs from 'ejs'
import path from 'path'

export function renderTemplate(template: string, data: Record<string, any>, templates: Record<string, string>): string {
  const ejsOptions: ejs.Options = {
    includer: (originalPath: string, parsedPath: string) => {
      console.log(`Include requested: ${originalPath}`)
      let templateContent = templates[originalPath]

      if (!templateContent) {
        // If not found, try with 'base/' prefix
        const basePath = `base/${originalPath}`
        console.log(`Trying base path: ${basePath}`)
        templateContent = templates[basePath]
      }

      if (!templateContent) {
        console.log(`Available templates: ${Object.keys(templates).join(', ')}`)
        throw new Error(`Template not found: ${originalPath}`)
      }
      return { template: templateContent }
    }
  }

  try {
    return ejs.render(template, data, ejsOptions)
  } catch (error) {
    console.error('Error rendering template:', error)
    throw error
  }
}