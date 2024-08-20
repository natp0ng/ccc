// import Link from 'next/link';
// export default function Home() {
//   return (
//     <div>
//       <h1>Hello</h1>
//       <Link href="/post">[Go to Posts]</Link>
//     </div>
//   );
// }


import { loadThemeTemplates, getTemplateForTheme } from '@/lib/themeLoader'
import { renderTemplate } from '@/lib/templateEngine'
import RenderContent from '@/components/RenderContent'

export default async function Home() {
  const { templates, activeTheme } = await loadThemeTemplates()
  const mainTemplate = getTemplateForTheme(templates, activeTheme, 'home')

  const data = {
    title: 'Hello world ;p',
    customCSS: '/* Your custom CSS */',
    headerContent: '<h1>Hello</h1>',
    mainContent: 'Welcome to my test',
    footerContent: '© 2024 My Blog',
  }

  const renderedContent = renderTemplate(mainTemplate, data, templates)

  return <RenderContent content={renderedContent} />
}