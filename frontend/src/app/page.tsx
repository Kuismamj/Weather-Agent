"use client"
import { useEffect, useState } from "react"
import Image from "next/image"

type WeatherData = {
  temperature: number
  condition: string
  recommendation: string
}

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [started, setStarted] = useState(false)
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null
  )

  useEffect(() => {
    if (started && coords) {
      fetch(
        "https://weather-agent-tp2i.onrender.com/api/weather?lat=" +
          coords.lat +
          "&lon=" +
          coords.lon
      )
        .then((res) => res.json())
        .then((data) => setWeather(data))
        .catch((err) => console.error(err))
    }
  }, [started, coords])

  const handleStart = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude })
          setStarted(true)
        },
        () => {
          // Jos käyttäjä ei salli sijaintia, käytetään Helsingin oletuskoordinaatteja
          setCoords({ lat: 60.1699, lon: 24.9384 })
          setStarted(true)
        }
      )
    } else {
      setCoords({ lat: 60.1699, lon: 24.9384 })
      setStarted(true)
    }
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-6">
      {!started && (
        <h1 className="text-3xl font-bold mb-4">
          Todays Weather Recommendation
        </h1>
      )}
      {!started ? (
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow hover:bg-blue-700 transition"
          onClick={handleStart}
        >
          Click for Weather Agent🕵️
        </button>
      ) : !weather ? (
        <div className="flex flex-col items-center">
          <Image
            src="/images/thinking1.jpg"
            alt="Thinking man"
            width={250}
            height={250}
            className="rounded-lg border-2 border-black"
          />
          <div className="mt-4 flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-600 border-solid mb-2"></div>
            <p className="text-xl">Analyzing the weather...</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-row items-center justify-center gap-8">
          <Image
            src="/images/idea1.jpg"
            alt="Weather man"
            width={300}
            height={300}
            className="rounded-lg border-2 border-black"
          />
          <div className="bg-white border-2 border-black rounded-lg p-4 shadow-lg w-[300px] h-[406px] flex flex-col">
            <p className="text-sm text-black">🌡️ {weather.temperature}°C</p>
            <p className="text-sm text-black">🌥️ {weather.condition}</p>
            <p className="text-sm text-black mt-2">
              👕 {weather.recommendation}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
