import React, {
    useCallback,
    useContext,
    useEffect,
    useId,
    useMemo,
    useRef,
    useState,
    forwardRef,
} from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, MotionConfig } from 'framer-motion'
import { FiPlus, FiX } from 'react-icons/fi'
import './LinearCardGallery.css'

function cn(...parts) {
    return parts.filter(Boolean).join(' ')
}

const DialogContext = React.createContext(null)

function useDialog() {
    const context = useContext(DialogContext)
    if (!context) {
        throw new Error('useDialog must be used within a DialogProvider')
    }
    return context
}

function DialogProvider({ children, transition }) {
    const [isOpen, setIsOpen] = useState(false)
    const uniqueId = useId()
    const triggerRef = useRef(null)

    const contextValue = useMemo(
        () => ({ isOpen, setIsOpen, uniqueId, triggerRef }),
        [isOpen, uniqueId]
    )

    return (
        <DialogContext.Provider value={contextValue}>
            <MotionConfig transition={transition}>{children}</MotionConfig>
        </DialogContext.Provider>
    )
}

function Dialog({ children, transition }) {
    return <DialogProvider transition={transition}>{children}</DialogProvider>
}

function DialogTrigger({ children, className, style }) {
    const { setIsOpen, isOpen, uniqueId, triggerRef } = useDialog()

    const handleClick = useCallback(() => {
        setIsOpen((o) => !o)
    }, [setIsOpen])

    const handleKeyDown = useCallback(
        (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                setIsOpen((o) => !o)
            }
        },
        [setIsOpen]
    )

    return (
        <motion.div
            ref={triggerRef}
            layoutId={`dialog-${uniqueId}`}
            className={cn('linear-card__trigger', className)}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            style={style}
            role="button"
            tabIndex={0}
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            aria-controls={`dialog-content-${uniqueId}`}
        >
            {children}
        </motion.div>
    )
}

function DialogContent({ children, className, style }) {
    const { isOpen, setIsOpen, uniqueId, triggerRef } = useDialog()
    const containerRef = useRef(null)

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setIsOpen(false)
            }
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [setIsOpen])

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('linear-card-gallery--open')
            if (containerRef.current) {
                containerRef.current.scrollTop = 0
            }
        } else {
            document.body.classList.remove('linear-card-gallery--open')
            triggerRef.current?.focus()
        }
        return () => {
            document.body.classList.remove('linear-card-gallery--open')
        }
    }, [isOpen, triggerRef])

    return (
        <motion.div
            ref={containerRef}
            id={`dialog-content-${uniqueId}`}
            layoutId={`dialog-${uniqueId}`}
            className={cn('linear-card__content', className)}
            style={style}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`dialog-title-${uniqueId}`}
        >
            {children}
        </motion.div>
    )
}

function DialogContainer({ children, className }) {
    const { isOpen, setIsOpen, uniqueId } = useDialog()

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key={`portal-${uniqueId}`}
                    className="linear-card__portal-layer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <div
                        className="linear-card__backdrop"
                        onClick={() => setIsOpen(false)}
                        aria-hidden
                    />
                    <div className={cn('linear-card__modal-slot', className)}>{children}</div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    )
}

function DialogImage({ src, alt = '', className, style }) {
    const { uniqueId } = useDialog()

    return (
        <motion.img
            src={src}
            alt={alt}
            className={cn('linear-card__dialog-img', className)}
            layoutId={`dialog-img-${uniqueId}`}
            style={style}
        />
    )
}

function DialogClose({ className }) {
    const { setIsOpen } = useDialog()

    return (
        <motion.button
            type="button"
            className={cn('linear-card__close', className)}
            onClick={() => setIsOpen(false)}
            aria-label="Close dialog"
            whileTap={{ scale: 0.95 }}
        >
            <FiX size={22} />
        </motion.button>
    )
}

function DialogPanelHeading({ title }) {
    const { uniqueId } = useDialog()
    return (
        <h2 className="linear-card__panel-title" id={`dialog-title-${uniqueId}`}>
            {title}
        </h2>
    )
}

const LinearCardGallery = forwardRef(({ items }, ref) => {
    return (
        <div ref={ref} className="linear-card-gallery" role="list">
            {items.map((item) => (
                <Dialog
                    key={item.id}
                    transition={{
                        type: 'spring',
                        bounce: 0.05,
                        duration: 0.5,
                    }}
                >
                    <div className="linear-card-gallery__cell" role="listitem">
                        <DialogTrigger className="linear-card__trigger-surface">
                            <DialogImage
                                src={item.url.src}
                                alt={item.title}
                                className="linear-card__thumb"
                            />
                            <div className="linear-card__trigger-footer">
                                <h3 className="linear-card__trigger-title">{item.title}</h3>
                                <span className="linear-card__plus" aria-hidden>
                                    <FiPlus size={22} />
                                </span>
                            </div>
                        </DialogTrigger>
                        <DialogContainer>
                            <DialogContent
                                className="linear-card__panel"
                                style={{ borderRadius: '24px' }}
                            >
                                <DialogImage
                                    src={item.url.src}
                                    alt={item.title}
                                    className="linear-card__panel-img"
                                />
                                <div className="linear-card__panel-body">
                                    <DialogPanelHeading title={item.title} />
                                    <motion.div
                                        className="linear-card__panel-desc"
                                        initial={{ opacity: 0, y: -12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.06, duration: 0.35 }}
                                    >
                                        <p>{item.description}</p>
                                        {item.tags?.length > 0 && (
                                            <ul className="linear-card__tags">
                                                {item.tags.map((tag) => (
                                                    <li key={tag}>{tag}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </motion.div>
                                </div>
                                <DialogClose />
                            </DialogContent>
                        </DialogContainer>
                    </div>
                </Dialog>
            ))}
        </div>
    )
})

LinearCardGallery.displayName = 'LinearCardGallery'

export default LinearCardGallery
