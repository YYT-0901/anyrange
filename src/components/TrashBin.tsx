import { useDroppable } from '@dnd-kit/core'
import { Trash2 } from 'lucide-react'

interface TrashBinProps {
  isVisible: boolean
}

export default function TrashBin({ isVisible }: TrashBinProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'trash',
  })

  return (
    <div
      ref={setNodeRef}
      className={`fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 bg-[#e0e5ec] text-[#5b8fb9] p-4 sm:p-5 rounded-full font-bold flex items-center justify-center transition-all duration-300 ${
        isVisible ? 'scale-100 translate-y-0 opacity-70' : 'opacity-0 scale-50 translate-y-10 pointer-events-none'
      } ${
        isOver ? 'scale-125 opacity-100 text-[#d9534f]' : ''
      }`}
      style={{ 
        touchAction: 'none',
        boxShadow: isOver 
          ? '8px 8px 16px #a3b1c6, -8px -8px 16px #ffffff, inset 2px 2px 4px #a3b1c6' 
          : '8px 8px 16px #a3b1c6, -8px -8px 16px #ffffff'
      }}
    >
      <Trash2 size={28} className="sm:w-9 sm:h-9" />
    </div>
  )
}
