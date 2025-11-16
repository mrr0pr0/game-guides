import React from 'react'
import DOMPurify from 'isomorphic-dompurify'

const GuideContent = ({ content }) => {
  const sanitizeConfig = {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'a', 'img', 'div', 'span', 'blockquote',
      'code', 'pre', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'iframe', 'video', 'hr', 'details', 'summary'
    ],
    ALLOWED_ATTR: [
      'href', 'src', 'alt', 'title', 'class', 'id', 'width', 'height',
      'style', 'target', 'rel', 'frameborder', 'allow', 'allowfullscreen',
      'loading', 'data-*'
    ],
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|data):|[^a-z]|[a-z+.-]+(?:[^a-z+.-:]|$))/i,
  }

  const processContent = (htmlContent) => {
    let processed = htmlContent

    processed = processed.replace(
      /<spoiler(?:\s+title="([^"]*)")?>([\s\S]*?)<\/spoiler>/gi,
      (match, title, content) => {
        const spoilerId = Math.random().toString(36).substr(2, 9)
        return `
          <div class="spoiler-container" data-spoiler="${spoilerId}">
            <button class="spoiler-toggle" onclick="this.nextElementSibling.classList.toggle('hidden')">
              <span>${title || 'SHOW SPOILERS'}</span>
              <svg class="w-5 h-5 transition-transform inline-block ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div class="spoiler-content hidden">
              ${content}
            </div>
          </div>
        `
      }
    )

    processed = processed.replace(
      /<iframe[^>]*src="(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^"?]+)[^"]*"[^>]*>/gi,
      (match, videoId) => {
        return `
          <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 1.5rem 0;">
            <iframe 
              src="https://www.youtube.com/embed/${videoId}" 
              style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen>
            </iframe>
          </div>
        `
      }
    )

    return processed
  }

  const processedContent = processContent(content)
  const sanitizedContent = DOMPurify.sanitize(processedContent, sanitizeConfig)

  return (
    <div 
      className="article-content"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  )
}

export default GuideContent
