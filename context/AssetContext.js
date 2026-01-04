'use client'
import { createContext, useContext } from 'react'

export const AssetContext = createContext(null)

export const useAssets = () => {
  const context = useContext(AssetContext)
  if (!context) {
    throw new Error('useAssets must be used inside AssetProvider')
  }
  return context
}
