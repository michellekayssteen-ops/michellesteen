'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    p5: any
  }
}

export default function FlowerSketch() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const p5Instance = useRef<any>(null)

  useEffect(() => {
    const loadP5 = async () => {
      if (typeof window !== 'undefined' && !window.p5) {
        const p5 = (await import('p5')).default
        window.p5 = p5
      }

      if (window.p5 && canvasRef.current && !p5Instance.current) {
        const sketch = (p: any) => {
          let centroids: any[] = []
          let centroidsIdx = 0
          let nFlowers = 18
          let nPetals = 12
          let margin = 100
          let petalEnds: any[] = []

          p.setup = () => {
            const canvas = p.createCanvas(p.windowWidth, p.windowHeight)
            canvas.parent(canvasRef.current)
            p.pixelDensity(2)
            p.background("#fffbe6")
            p.noStroke()
            
            // Define patch boundaries
            const leftPatch = {
              xMin: margin,
              xMax: p.width/3,
              yMin: p.height - p.height/3,
              yMax: p.height - margin
            }
            
            const rightPatch = {
              xMin: 2*p.width/3,
              xMax: p.width - margin,
              yMin: p.height - p.height/3,
              yMax: p.height - margin
            }
            
            // Alternate between left and right patches
            for (let i = 0; i < nFlowers; i++) {
              const patch = (i % 2 === 0) ? leftPatch : rightPatch
              const x0 = p.random(patch.xMin, patch.xMax)
              const y0 = p.random(patch.yMin, patch.yMax)
              centroids.push({
                x0: x0, 
                y0: y0, 
                theta0: p.random(p.TWO_PI), 
                id: i, 
                arcsLeft: p.shuffle([...Array(nPetals).keys()])
              })
            }
            
            for (let i = 0; i < 3; i++) {
              voronoiRelaxation()
            }
          }

          p.draw = () => {
            const c = centroids[centroidsIdx]
            const theta = p.TWO_PI * c.arcsLeft.pop() / nPetals + c.theta0
            const rMax = longestPossibleRadius(c, theta)
            
            p.fill(5)
            let x, y, d = 0, r = 0
            while (r + d/2 < rMax) {
              x = c.x0 + r * p.cos(theta)
              y = c.y0 + r * p.sin(theta)
              d = r * p.sin(p.TWO_PI / nPetals)
              p.circle(x, y, d + 1)
              
              if (x < margin/2 || x > p.width - margin/2 || y < margin/2 || y > p.height - margin/2) break
              let intersects = false
              for (let petal of petalEnds) {
                if (petal.id != c.id && p.dist(x, y, petal.x, petal.y) < d/2 + petal.d/2 + 6) {
                  intersects = true
                  break
                }
              }
              if (intersects) break
              
              r++
            }
            petalEnds.push({x: x, y: y, d: d, id: c.id})
            
            r = 0
            const borderThickness = 3
            p.fill("#fffbe6")
            while (r * p.sin(p.TWO_PI / nPetals) <= d) {
              x = c.x0 + r * p.cos(theta)
              y = c.y0 + r * p.sin(theta)
              p.circle(x, y, r * p.sin(p.TWO_PI / nPetals) + 1 - borderThickness)
              r += 1/4
            }
            
            if (c.arcsLeft.length == 0) {
              let dSum = 0
              for (let petal of petalEnds) {
                if (petal.id == c.id) {
                  dSum += petal.d
                }
              }
              p.fill(5)
              p.circle(c.x0, c.y0, dSum / nPetals)
              p.fill("#f9d531")
              p.circle(c.x0, c.y0, dSum / nPetals - borderThickness)
              centroidsIdx++
            }
            if (centroidsIdx >= centroids.length) p.noLoop()
          }

          p.windowResized = () => {
            p.resizeCanvas(p.windowWidth, p.windowHeight)
            // Redefine patch boundaries for new canvas size
            const leftPatch = {
              xMin: margin,
              xMax: p.width/3,
              yMin: p.height - p.height/3,
              yMax: p.height - margin
            }
            
            const rightPatch = {
              xMin: 2*p.width/3,
              xMax: p.width - margin,
              yMin: p.height - p.height/3,
              yMax: p.height - margin
            }
            
            // Regenerate centroids for new canvas size
            centroids = []
            for (let i = 0; i < nFlowers; i++) {
              const patch = (i % 2 === 0) ? leftPatch : rightPatch
              const x0 = p.random(patch.xMin, patch.xMax)
              const y0 = p.random(patch.yMin, patch.yMax)
              centroids.push({
                x0: x0, 
                y0: y0, 
                theta0: p.random(p.TWO_PI), 
                id: i, 
                arcsLeft: p.shuffle([...Array(nPetals).keys()])
              })
            }
            
            // Reset drawing state
            centroidsIdx = 0
            petalEnds = []
            p.background("#fffbe6")
            
            // Re-run Voronoi relaxation
            for (let i = 0; i < 3; i++) {
              voronoiRelaxation()
            }
          }

          function voronoiRelaxation() {
            const n = 20
            const s = p.width / n
            const voronoi: number[][][] = Array(nFlowers).fill(null).map(() => [])
            
            for (let i = 0; i < n; i++) {
              const x = (i + 1/2) * s
              for (let j = 0; j < n; j++) {
                const y = (j + 1/2) * s
                const cid = closestCentroidId(x, y)
                voronoi[cid].push([x, y])
              }
            }
            
            for (let i = 0; i < nFlowers; i++) {
              const c = centroids[i]
              const cellPoints = voronoi[c.id]
              let xSum = 0, ySum = 0
              for (let point of cellPoints) {
                xSum += point[0]
                ySum += point[1]
              }
              const x1 = p.constrain(xSum / cellPoints.length, margin, p.width - margin)
              const y1 = p.constrain(ySum / cellPoints.length, margin, p.height - margin)
              c.x0 = x1
              c.y0 = y1
            }
          }

          function longestPossibleRadius(centroid: any, theta: number) {
            const x0 = centroid.x0
            const y0 = centroid.y0
            let r = 0
            const rMax = p.min(p.min(x0, p.width - x0), p.min(y0, p.height - y0))
            const rStep = 2
            while (true) {
              r += rStep
              const x = x0 + r * p.cos(theta)
              const y = y0 + r * p.sin(theta)
              if (closestCentroidId(x, y) != centroid.id) {
                break
              }
              if (x < 0 || x > p.width || y < 0 || y > p.height) {
                break
              }
            }
            return r - rStep
          }

          function closestCentroidId(x: number, y: number) {
            let minDist = Infinity
            let idMin = -1
            for (let c of centroids) {
              const d = distToCentroidSquared(c, x, y)
              if (d < minDist) {
                minDist = d
                idMin = c.id
              }
            }
            return idMin
          }
          
          function distToCentroidSquared(c: any, x: number, y: number) {
            return p.sq(c.x0 - x) + p.sq(c.y0 - y)
          }
        }

        p5Instance.current = new window.p5(sketch)
      }
    }

    loadP5()

    return () => {
      if (p5Instance.current) {
        p5Instance.current.remove()
        p5Instance.current = null
      }
    }
  }, [])

  return (
    <div 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: '#fffbe6' }}
    />
  )
}

