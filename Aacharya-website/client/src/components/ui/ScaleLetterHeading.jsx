import { useMemo, useState } from 'react'
import './ScaleLetterHeading.css'

function lettersFromParts(parts) {
    const letters = []
    parts.forEach(({ text, className = '' }) => {
        for (let i = 0; i < text.length; i += 1) {
            letters.push({ char: text[i], className })
        }
    })
    return letters
}

function lettersFromText(str) {
    return str.split('').map((char) => ({ char, className: '' }))
}

function getLetterStyle(index, hoveredIndex, variant) {
    const isHovered = hoveredIndex === index
    const distance = hoveredIndex >= 0 ? Math.abs(index - hoveredIndex) : 0

    let scale = 1
    let translateY = 0
    let rotateX = 0
    let brightness = 1

    if (hoveredIndex >= 0) {
        if (isHovered) {
            scale = 1.4
            translateY = -20
            rotateX = -15
            brightness = 1.3
        } else if (distance === 1) {
            scale = 1.2
            translateY = -10
            rotateX = -8
            brightness = 1.15
        } else if (distance === 2) {
            scale = 1.1
            translateY = -5
            rotateX = -4
            brightness = 1.08
        }
    }

    const light = variant === 'light'
    const shadowNear = light ? '0 2px 8px rgba(0,0,0,0.4)' : '0 2px 6px rgba(0,0,0,0.15)'
    const shadowFar = light ? '0 1px 3px rgba(0,0,0,0.25)' : '0 1px 2px rgba(0,0,0,0.08)'

    return {
        transform: `
            perspective(1000px)
            translateY(${translateY}px)
            rotateX(${rotateX}deg)
            scale(${scale})
            translateZ(${isHovered ? 30 : distance <= 2 ? 15 : 0}px)
        `,
        filter: `brightness(${brightness})`,
        textShadow: distance <= 2 ? shadowNear : shadowFar,
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        zIndex: isHovered ? 10 : distance <= 2 ? 5 : 1,
        marginRight: '0.08em',
        position: 'relative',
        display: 'inline-block',
        cursor: 'default',
    }
}

/**
 * Per-letter hover scale / 3D effect for headings (home page).
 * Pass either `text` or `parts` ({ text, className? }[]).
 */
export default function ScaleLetterHeading({
    as: Tag = 'h2',
    className = '',
    style,
    text,
    parts,
    variant = 'default',
}) {
    const letters = useMemo(() => {
        if (parts?.length) return lettersFromParts(parts)
        if (text != null && text !== '') return lettersFromText(String(text))
        return []
    }, [text, parts])

    const ariaLabel = useMemo(() => {
        if (parts?.length) return parts.map((p) => p.text).join('')
        return text != null ? String(text) : ''
    }, [text, parts])

    const [hoveredIndex, setHoveredIndex] = useState(-1)

    const rootClass = ['scale-letter-heading', `scale-letter-heading--${variant}`, className]
        .filter(Boolean)
        .join(' ')

    return (
        <Tag className={rootClass} style={style} aria-label={ariaLabel || undefined}>
            <span className="scale-letter-heading__track" aria-hidden="true">
                {letters.map((item, index) => (
                    <span
                        key={`sl-${index}-${item.className || 'x'}`}
                        className={`scale-letter-heading__char ${item.className || ''}`.trim()}
                        style={getLetterStyle(index, hoveredIndex, variant)}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(-1)}
                    >
                        {item.char === ' ' ? '\u00A0' : item.char}
                    </span>
                ))}
            </span>
        </Tag>
    )
}
