'use client'

import { useState, useCallback, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Upload, X, Loader2, ImageIcon } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface UploadedImage {
  url: string
  path: string
}

interface ImageUploaderProps {
  value: string[]
  onChange: (urls: string[]) => void
  bucket?: string
  folder?: string
  maxFiles?: number
  label?: string
}

export function ImageUploader({
  value,
  onChange,
  bucket = 'portfolio',
  folder = 'items',
  maxFiles = 10,
  label = 'Imagens',
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const uploadFile = async (file: File): Promise<UploadedImage | null> => {
    const supabase = createClient()
    const ext = file.name.split('.').pop()
    const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const { error } = await supabase.storage.from(bucket).upload(path, file, {
      cacheControl: '31536000',
      upsert: false,
    })
    if (error) return null
    const { data } = supabase.storage.from(bucket).getPublicUrl(path)
    return { url: data.publicUrl, path }
  }

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return
      const remaining = maxFiles - value.length
      if (remaining <= 0) return
      const toUpload = Array.from(files).slice(0, remaining)
      setUploading(true)
      const results = await Promise.all(toUpload.map(uploadFile))
      const urls = results.filter(Boolean).map((r) => r!.url)
      onChange([...value, ...urls])
      setUploading(false)
    },
    [value, onChange, bucket, folder, maxFiles]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragOver(false)
      handleFiles(e.dataTransfer.files)
    },
    [handleFiles]
  )

  const removeImage = (url: string) => {
    onChange(value.filter((u) => u !== url))
  }

  return (
    <div>
      <p className="text-sm font-medium text-metal mb-3">{label}</p>

      {value.length < maxFiles && (
        <div
          className={cn(
            'border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors',
            dragOver
              ? 'border-amber-brand bg-amber-brand/5'
              : 'border-metal-dark/40 hover:border-metal-dark/70'
          )}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 text-amber-brand animate-spin" />
              <p className="text-sm text-metal">Enviando...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="w-8 h-8 text-metal-dark" />
              <p className="text-sm text-metal">
                Arraste imagens ou <span className="text-amber-brand">clique para selecionar</span>
              </p>
              <p className="text-xs text-metal-dark">
                JPG, PNG, WebP · máx. {maxFiles - value.length} arquivo(s)
              </p>
            </div>
          )}
        </div>
      )}

      {value.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4">
          {value.map((url, i) => (
            <div key={url} className="relative group aspect-square rounded-lg overflow-hidden bg-steel">
              <Image
                src={url}
                alt={`Imagem ${i + 1}`}
                fill
                className="object-cover"
                sizes="160px"
              />
              {i === 0 && (
                <span className="absolute bottom-1 left-1 text-[10px] bg-amber-brand text-carbon px-1.5 py-0.5 rounded font-semibold">
                  CAPA
                </span>
              )}
              <button
                type="button"
                onClick={() => removeImage(url)}
                className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3 text-foreground" />
              </button>
            </div>
          ))}
          {value.length === 0 && (
            <div className="aspect-square rounded-lg bg-steel flex items-center justify-center">
              <ImageIcon className="w-6 h-6 text-metal-dark" />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
