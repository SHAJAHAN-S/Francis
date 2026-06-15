import { useEffect, useRef, useState } from 'react'
import { FiX, FiZoomIn, FiZoomOut } from 'react-icons/fi'

export default function PanoramaViewer({ src, onClose }: { src: string; onClose: () => void }) {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const [pos, setPos] = useState(50) // percent
    const dragging = useRef(false)
    const lastX = useRef(0)
    const [zoom, setZoom] = useState(1)

    useEffect(() => {
        const el = containerRef.current
        if (!el) return
        const handlePointerDown = (e: PointerEvent) => {
            dragging.current = true;
            lastX.current = e.clientX;
            (e.target as Element).setPointerCapture((e as any).pointerId);
        }
        const handlePointerMove = (e: PointerEvent) => {
            if (!dragging.current) return
            const dx = e.clientX - lastX.current
            lastX.current = e.clientX
            setPos((p) => Math.min(100, Math.max(0, p - (dx / el.clientWidth) * 100)))
        }
        const handlePointerUp = () => { dragging.current = false }
        el.addEventListener('pointerdown', handlePointerDown)
        window.addEventListener('pointermove', handlePointerMove)
        window.addEventListener('pointerup', handlePointerUp)
        return () => {
            el.removeEventListener('pointerdown', handlePointerDown)
            window.removeEventListener('pointermove', handlePointerMove)
            window.removeEventListener('pointerup', handlePointerUp)
        }
    }, [])

    return (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
            <div className="relative w-full max-w-6xl h-[70vh] bg-black rounded-lg overflow-hidden shadow-2xl">
                <button onClick={onClose} className="absolute top-3 right-3 z-20 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black transition-colors"><FiX /></button>
                <div className="absolute top-3 left-3 z-20 flex gap-2">
                    <button onClick={() => setZoom((z) => Math.min(3, z + 0.25))} className="w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center"> <FiZoomIn /> </button>
                    <button onClick={() => setZoom((z) => Math.max(1, z - 0.25))} className="w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center"> <FiZoomOut /> </button>
                </div>
                <div ref={containerRef} className="w-full h-full" style={{ touchAction: 'none' }}>
                    <div
                        className="w-full h-full bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url(${src})`,
                            backgroundPosition: `${pos}% 50%`,
                            backgroundSize: `${zoom * 100}% auto`,
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
