import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
// import { getCryptoData } from './api'

type CryptoDataType = {
  id: number
  rank: number
  symbol: string | null
  name: string | null
  supply: number
  maxSupply: string | null
  marketCapUsd: number
  volumeUsd24Hr: number
  priceUsd: number
  changePercent24Hr: number
  vwap24Hr: string | null
  explorer: string
}

export function App() {
  const [cryptoData, setCryptoData] = useState<CryptoDataType[]>([])
  const [cycle, setCycle] = useState<number>(0)
  console.log('cryptoData', cryptoData)

  function loadCryptoData() {
    async function getCryptoData() {
      const response = await fetch('https://api.coincap.io/v2/assets')
      if (response.ok) {
        const { data } = await response.json()
        setCryptoData(data)
        // return data.data
      }
    }
    getCryptoData()
  }
  console.log('getCryptoData', [cycle])

  useEffect(function () {
    const interval = setInterval(function () {
      setCycle((cycle) => cycle + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(loadCryptoData, [cycle])

  function roundingCrypto(number: number) {
    return Math.round(number * 100) / 1000

    if (number - Math.floor(number) === 0) {
      return
    }
  }
  return (
    <>
      <div className="app">
        <header>
          <h1>Crypto Ticker</h1>
        </header>
        <main>
          <h2 className="subheader">Track Price</h2>
          <table>
            <tr className="headings">
              <th>Rank</th>
              <th>Symbol</th>
              <th>Name</th>
              <th>Market Cap</th>
              <th>Supply</th>
              <th>$Price</th>
              <th>%Change</th>
              <th>Link</th>
            </tr>
            {cryptoData
              .filter((crypto) => crypto.rank <= 25)
              .map(function (crypto) {
                return (
                  <tr className="crypto" key={crypto.id}>
                    <td className="spacing">{crypto.rank}</td>
                    <td>{crypto.symbol}</td>
                    <td>{crypto.name}</td>
                    <td className="right">
                      {roundingCrypto(crypto.marketCapUsd)}
                    </td>
                    <td className="right">{roundingCrypto(crypto.supply)}</td>
                    <td className="right">{roundingCrypto(crypto.priceUsd)}</td>
                    <td className="right">
                      {roundingCrypto(crypto.changePercent24Hr)}
                    </td>
                    <td key="explorer">
                      <a href={crypto.explorer}>
                        <i className="bx bx-link-external"></i>
                      </a>
                    </td>
                  </tr>
                )
              })}
          </table>
        </main>
        <footer>
          <div className="box">by T AMHEISER</div>
        </footer>
      </div>
    </>
  )
}
