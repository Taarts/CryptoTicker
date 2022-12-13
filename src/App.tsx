import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
// import { getCryptoData } from './api'

type CryptoDataType = {
  id: string
  rank: string
  symbol: string | null
  name: string | null
  supply: string | null
  maxSupply: string | null
  marketCapUsd: string | null
  volumeUsd24Hr: string | null
  priceUsd: string | null
  changePercent24Hr: string | null
  vwap24Hr: string | null
  explorer: string | null
}

export function App() {
  const [cryptoData, setCryptoData] = useState<CryptoDataType[]>([])
  const [cycle, setCycle] = useState<number>(0)
  console.log('cryptoData', cryptoData)

  // const  { data: cryptoData= [], refetch: refetchCryptoData } = useQuery('cryptoData', getCryptoData())

  function loadCryptoData() {
    async function getCryptoData() {
      const response = await fetch('https://api.coincap.io/v2/assets')
      if (response.ok) {
        const data = await response.json()
        return data.data
      }
    }
    getCryptoData()
  }
  console.log('loadCryptoData', [cycle])

  useEffect(function () {
    const interval = setInterval(function () {
      setCycle((cycle) => cycle + 1)
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  useEffect(loadCryptoData, [cycle])

  return (
    <>
      <div className="app">
        <header>
          <h1>Crypto Ticker</h1>
        </header>
        <main>
          <h2 className="subheader">Currency</h2>
          <ul>
            {cryptoData.map(function (crypto: CryptoDataType) {
              return (
                <li className="crypto" key={crypto.id}>
                  <span>{crypto.rank}</span>
                  <span>{crypto.symbol}</span>
                  <span>{crypto.name}</span>
                  <span>{crypto.supply}</span>
                  <span>{crypto.priceUsd}</span>
                </li>
              )
            })}
          </ul>
        </main>
      </div>
    </>
  )
}
