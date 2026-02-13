import { useRef, useState } from 'react'
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { Upload, RotateCcw, Download } from 'lucide-react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import TierRow from '../components/TierRow'
import UnrankedPool from '../components/UnrankedPool'
import DraggableImage from '../components/DraggableImage'
import TrashBin from '../components/TrashBin'
import type { TierItem, Tier } from '../types'

export default function MainPage() {
  const [tiers, setTiers] = useState<Tier[]>([
    { id: 'hang', label: '夯', color: '#FF3333', items: [] },
    { id: 'top', label: '顶级', color: '#FFAA33', items: [] },
    { id: 'high', label: '人上人', color: '#FFFF33', items: [] },
    { id: 'npc', label: 'NPC', color: '#FFFDD0', items: [] },
    { id: 'bottom', label: '拉完了', color: '#F5F5F5', items: [] },
  ])
  
  const [unranked, setUnranked] = useState<TierItem[]>([])
  const [activeItem, setActiveItem] = useState<TierItem | null>(null)
  const [isDraggingFile, setIsDraggingFile] = useState(false)
  const tierListRef = useRef<HTMLDivElement>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    })
  )

  const processFiles = (files: FileList) => {
    const newItems: TierItem[] = []
    const fileArray = Array.from(files).filter(file => file.type.startsWith('image/'))
    
    if (fileArray.length === 0) return
    
    fileArray.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const url = e.target?.result as string
        newItems.push({
          id: `${Date.now()}-${Math.random()}`,
          url,
        })
        
        if (newItems.length === fileArray.length) {
          setUnranked((prev) => [...prev, ...newItems])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return
    processFiles(files)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (e.dataTransfer.types.includes('Files')) {
      setIsDraggingFile(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (e.currentTarget === e.target) {
      setIsDraggingFile(false)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDraggingFile(false)
    
    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      processFiles(files)
    }
  }

  const findContainer = (id: string): { type: 'tier' | 'unranked'; tierId?: string } => {
    if (unranked.some((item) => item.id === id)) {
      return { type: 'unranked' }
    }
    
    for (const tier of tiers) {
      if (tier.items.some((item) => item.id === id)) {
        return { type: 'tier', tierId: tier.id }
      }
    }
    
    return { type: 'unranked' }
  }

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const container = findContainer(active.id as string)
    
    if (container.type === 'unranked') {
      const item = unranked.find((i) => i.id === active.id)
      setActiveItem(item || null)
    } else if (container.tierId) {
      const tier = tiers.find((t) => t.id === container.tierId)
      const item = tier?.items.find((i) => i.id === active.id)
      setActiveItem(item || null)
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveItem(null)
    
    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string
    
    if (overId === 'trash') {
      const sourceContainer = findContainer(activeId)
      
      if (sourceContainer.type === 'unranked') {
        setUnranked((prev) => prev.filter((i) => i.id !== activeId))
      } else if (sourceContainer.tierId) {
        setTiers((prev) =>
          prev.map((tier) => {
            if (tier.id === sourceContainer.tierId) {
              return { ...tier, items: tier.items.filter((i) => i.id !== activeId) }
            }
            return tier
          })
        )
      }
      return
    }
    
    const sourceContainer = findContainer(activeId)
    let targetTierId: string | null = null
    
    if (tiers.some((tier) => tier.id === overId)) {
      targetTierId = overId
    } else {
      for (const tier of tiers) {
        if (tier.items.some((item) => item.id === overId)) {
          targetTierId = tier.id
          break
        }
      }
    }
    
    if (overId === 'unranked' || (!targetTierId && overId.includes('unranked'))) {
      targetTierId = null
    }

    let movedItem: TierItem | undefined

    if (sourceContainer.type === 'unranked') {
      movedItem = unranked.find((i) => i.id === activeId)
    } else if (sourceContainer.tierId) {
      const sourceTier = tiers.find((t) => t.id === sourceContainer.tierId)
      movedItem = sourceTier?.items.find((i) => i.id === activeId)
    }

    if (!movedItem) return

    if (sourceContainer.type === 'tier' && sourceContainer.tierId === targetTierId) {
      return
    }
    if (sourceContainer.type === 'unranked' && targetTierId === null) {
      return
    }

    if (sourceContainer.type === 'unranked' && targetTierId !== null) {
      setUnranked((prev) => prev.filter((i) => i.id !== activeId))
      setTiers((prev) =>
        prev.map((tier) => {
          if (tier.id === targetTierId) {
            return { ...tier, items: [...tier.items, movedItem!] }
          }
          return tier
        })
      )
    } else if (sourceContainer.type === 'tier' && targetTierId === null) {
      setTiers((prev) =>
        prev.map((tier) => {
          if (tier.id === sourceContainer.tierId) {
            return { ...tier, items: tier.items.filter((i) => i.id !== activeId) }
          }
          return tier
        })
      )
      setUnranked((prev) => [...prev, movedItem!])
    } else if (sourceContainer.type === 'tier' && targetTierId !== null) {
      setTiers((prev) =>
        prev.map((tier) => {
          if (tier.id === sourceContainer.tierId) {
            return { ...tier, items: tier.items.filter((i) => i.id !== activeId) }
          } else if (tier.id === targetTierId) {
            return { ...tier, items: [...tier.items, movedItem!] }
          }
          return tier
        })
      )
    }
  }

  const handleReset = () => {
    const allItems: TierItem[] = []
    tiers.forEach((tier) => {
      allItems.push(...tier.items)
    })
    
    setUnranked((prev) => [...prev, ...allItems])
    setTiers((prev) =>
      prev.map((tier) => ({
        ...tier,
        items: []
      }))
    )
  }

  const handleExport = async (format: 'png' | 'pdf') => {
    if (!tierListRef.current) return

    try {
      const canvas = await html2canvas(tierListRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
        useCORS: true,
      })

      if (format === 'png') {
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = `夯到拉排行榜_${new Date().getTime()}.png`
            link.click()
            URL.revokeObjectURL(url)
          }
        })
      } else if (format === 'pdf') {
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF({
          orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
          unit: 'px',
          format: [canvas.width, canvas.height]
        })
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)
        pdf.save(`夯到拉排行榜_${new Date().getTime()}.pdf`)
      }
    } catch (error) {
      console.error('Export failed:', error)
      alert('导出失败，请重试')
    }
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div 
        className="h-screen flex flex-col p-2 sm:p-4 gap-2 sm:gap-4 relative"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div 
          ref={tierListRef}
          className="flex-1 bg-[#e0e5ec] rounded-2xl sm:rounded-3xl p-2 sm:p-4 overflow-hidden"
          style={{
            boxShadow: '8px 8px 16px #a3b1c6, -8px -8px 16px #ffffff'
          }}
        >
          <div className="h-full flex flex-col gap-1 sm:gap-2">
            {tiers.map((tier) => (
              <TierRow key={tier.id} tier={tier} />
            ))}
          </div>
        </div>

        <div 
          className="h-32 sm:h-48 bg-[#e0e5ec] rounded-2xl sm:rounded-3xl p-2 sm:p-4 flex flex-col"
          style={{
            boxShadow: '8px 8px 16px #a3b1c6, -8px -8px 16px #ffffff'
          }}
        >
          <div className="flex-1 overflow-hidden mb-1 sm:mb-2">
            <UnrankedPool items={unranked} />
          </div>
          <div className="flex items-center gap-2">
            <label 
              className="bg-[#e0e5ec] text-[#5b8fb9] px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl font-semibold cursor-pointer flex items-center gap-1 sm:gap-2 transition-all text-xs sm:text-sm hover:text-[#4a7a9e]"
              style={{
                boxShadow: '5px 5px 10px #a3b1c6, -5px -5px 10px #ffffff'
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.boxShadow = 'inset 3px 3px 6px #a3b1c6, inset -3px -3px 6px #ffffff'
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.boxShadow = '5px 5px 10px #a3b1c6, -5px -5px 10px #ffffff'
              }}
            >
              <Upload size={14} className="sm:w-4 sm:h-4" />
              上传图片
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            <div className="relative group">
              <button 
                className="bg-[#e0e5ec] text-[#5b8fb9] px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl font-semibold cursor-pointer flex items-center gap-1 sm:gap-2 transition-all text-xs sm:text-sm hover:text-[#4a7a9e]"
                style={{
                  boxShadow: '5px 5px 10px #a3b1c6, -5px -5px 10px #ffffff'
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.boxShadow = 'inset 3px 3px 6px #a3b1c6, inset -3px -3px 6px #ffffff'
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.boxShadow = '5px 5px 10px #a3b1c6, -5px -5px 10px #ffffff'
                }}
              >
                <Download size={14} className="sm:w-4 sm:h-4" />
                导出
              </button>
              <div 
                className="absolute left-0 bottom-full mb-1 bg-[#e0e5ec] rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 min-w-[100px]"
                style={{
                  boxShadow: '5px 5px 10px #a3b1c6, -5px -5px 10px #ffffff'
                }}
              >
                <button
                  onClick={() => handleExport('png')}
                  className="block w-full text-left px-4 py-2 text-sm text-[#5b8fb9] hover:text-[#4a7a9e] rounded-t-xl"
                >
                  PNG图片
                </button>
                <button
                  onClick={() => handleExport('pdf')}
                  className="block w-full text-left px-4 py-2 text-sm text-[#5b8fb9] hover:text-[#4a7a9e] rounded-b-xl"
                >
                  PDF文件
                </button>
              </div>
            </div>
            
            {tiers.some(tier => tier.items.length > 0) && (
              <button
                onClick={handleReset}
                className="bg-[#e0e5ec] text-[#5b8fb9] px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl font-semibold cursor-pointer flex items-center gap-1 sm:gap-2 transition-all text-xs sm:text-sm hover:text-[#4a7a9e]"
                style={{
                  boxShadow: '5px 5px 10px #a3b1c6, -5px -5px 10px #ffffff'
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.boxShadow = 'inset 3px 3px 6px #a3b1c6, inset -3px -3px 6px #ffffff'
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.boxShadow = '5px 5px 10px #a3b1c6, -5px -5px 10px #ffffff'
                }}
              >
                <RotateCcw size={14} className="sm:w-4 sm:h-4" />
                重置
              </button>
            )}
          </div>
        </div>
      </div>

      <TrashBin isVisible={activeItem !== null} />

      {/* File Drop Overlay */}
      {isDraggingFile && (
        <div className="fixed inset-0 bg-[#5b8fb9] bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50 pointer-events-none">
          <div 
            className="bg-[#e0e5ec] rounded-3xl p-12 text-center max-w-md mx-4"
            style={{
              boxShadow: '12px 12px 24px #a3b1c6, -12px -12px 24px #ffffff'
            }}
          >
            <Upload size={64} className="mx-auto mb-4 text-[#5b8fb9]" />
            <h3 className="text-2xl font-bold text-[#5b8fb9] mb-2">
              拖放图片到这里
            </h3>
            <p className="text-[#7a9bb8]">
              支持批量上传多张图片
            </p>
          </div>
        </div>
      )}

      <DragOverlay>
        {activeItem ? (
          <div className="opacity-90">
            <DraggableImage item={activeItem} isDragging={false} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
