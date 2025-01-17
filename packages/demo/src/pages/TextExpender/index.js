import { useState } from 'react'
import './index.css'

function TextExpender({
  children,
  collapsedNumWords = 20,
  expandButtonText = 'Show less',
  collapseButtonText = 'Show more',
  expandButtonColor = 'blue',
  className = '',
  expanded = false
}) {
  const [isExpanded, setIsExpanded] = useState(expanded)

  const displayTexts = children.split(' ')
  const displayTextLen = displayTexts.length

  const displayText = isExpanded
    ? children
    : displayTexts
        .slice(0, Math.min(collapsedNumWords, displayTextLen))
        .join(' ')

  const collapsedTextContainerStyle = {
    // width: `${collapsedNumWords * 20}px`,
    // textOverflow: 'ellipsis',
    // overflow: 'hidden',
    // whiteSpace: 'nowrap',
    // display: 'inline-block',
    // verticalAlign: 'bottom'
  }

  return (
    <div className={className}>
      <span style={!isExpanded ? collapsedTextContainerStyle : {}}>
        {displayText}{' '}
        {!isExpanded && collapsedNumWords < displayTextLen && '...'}
      </span>
      {collapsedNumWords < displayTextLen ? (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{ color: expandButtonColor }}
        >
          {isExpanded ? expandButtonText : collapseButtonText}
        </button>
      ) : (
        ''
      )}
    </div>
  )
}

export default function Test() {
  return (
    <>
      <TextExpender className="blue">
        Structural components are essential for building clean, maintainable,
        and reusable UI layouts in modern applications. They provide a
        declarative way to define the skeleton of your pages and allow for
        dynamic content to be injected, making them a key part of a
        well-architected frontend system.
      </TextExpender>

      <TextExpender collapsedNumWords={100}>
        Structural components are essential for building clean, maintainable,
        and reusable UI layouts in modern applications. They provide a
        declarative way to define the skeleton of your pages and allow for
        dynamic content to be injected, making them a key part of a
        well-architected frontend system.
      </TextExpender>
    </>
  )
}
