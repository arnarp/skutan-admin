import * as uuid from 'uuid'

let updateWidthTimeout: {} | undefined = undefined
const subscribers = new Map<string, (height: number, width: number) => void>()

window.addEventListener('resize', ev => {
  if (!updateWidthTimeout) {
    updateWidthTimeout = setTimeout(() => {
      updateWidthTimeout = undefined
      // Will execute at max 15fps
      onResize()
    }, 66)
  }
})

const onResize = () => {
  const w = window.innerWidth
  const h = window.innerHeight
  subscribers.forEach(cb => cb(h, w))
}

export const onWindowResize = (cb: (height: number, width: number) => void) => {
  const id = uuid()
  subscribers.set(id, cb)
  const w = window.innerWidth
  const h = window.innerHeight
  cb(h, w)
  return () => {
    subscribers.delete(id)
  }
}
