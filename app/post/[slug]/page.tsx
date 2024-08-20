import { loadThemeTemplates, getTemplateForTheme } from '@/lib/themeLoader'
import { renderTemplate } from '@/lib/templateEngine'
import RenderContent from '@/components/RenderContent'

interface Post {
  id: number
  title: string
  content: string
}

interface PageProps {
  params: { slug: string }
}

export default async function PostDetail({ params }: PageProps) {
  const { templates, activeTheme } = await loadThemeTemplates()
  const mainTemplate = getTemplateForTheme(templates, activeTheme, 'post')
  
  const post = await fetchPost(params.slug)

  const data = {
    title: post.title,
    customCSS: '/* Your custom CSS */',
    headerContent: '<h1>My Blog</h1>',
    mainContent: post.content,
    footerContent: '© 2024 My Blog',
    post: post,
  }

  const renderedContent = renderTemplate(mainTemplate, data, templates)

  return <RenderContent content={renderedContent} />
}

async function fetchPost(id: string): Promise<Post> {
  return {
    id: parseInt(id),
    title: `Post ${id}`,
    content: `This is the content of post ${id}. It's very interesting!`
  }
}