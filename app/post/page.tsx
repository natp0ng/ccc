import { loadThemeTemplates, getTemplateForTheme } from '@/lib/themeLoader'
import { renderTemplate } from '@/lib/templateEngine'
import RenderContent from '@/components/RenderContent'

interface Post {
  id: number
  title: string
  excerpt: string
}

export default async function PostList() {
  const { templates, activeTheme } = await loadThemeTemplates()
  const mainTemplate = getTemplateForTheme(templates, activeTheme, 'post-list')
  
  const posts = await fetchPosts()

  const data = {
    title: 'All Posts',
    customCSS: '/* Your custom CSS */',
    headerContent: '<h1>My Blog</h1>',
    mainContent: 'Welcome to my blog',
    footerContent: '© 2024 My Blog',
    posts: posts,
  }

  const renderedContent = renderTemplate(mainTemplate, data, templates)

  return <RenderContent content={renderedContent} />
}

async function fetchPosts(): Promise<Post[]> {
  return [
    { id: 1, title: 'First Post', excerpt: 'This is the first post' },
    { id: 2, title: 'Second Post', excerpt: 'This is the second post' },
  ]
}