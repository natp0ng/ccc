'use client'

import React from 'react'

interface RenderContentProps {
  content: string
}

export default function RenderContent({ content }: RenderContentProps) {
  return <div dangerouslySetInnerHTML={{ __html: content }} />
}