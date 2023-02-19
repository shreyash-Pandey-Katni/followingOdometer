import utils from './utils'
import gsap from 'gsap'

// Content added by the best Tanya.
let angle = 0

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const center = {
  x: canvas.width / 2,
  y: canvas.height / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', (event) => {
  gsap.to(mouse, { x: event.clientX - center.x, y: event.clientY - center.y, duration: 1 })
  angle = Math.atan2(mouse.y, mouse.x)
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})


// Objects
class Object {
  constructor(x, y, radius, color, offset) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.offset = offset
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }

  update() {
    this.x = center.x + Math.cos(angle) * this.offset
    this.y = center.y + Math.sin(angle) * this.offset
    this.draw()
  }
}

// Implementation
let objects
function init() {
  objects = []

  for (let i = 0; i < 400; i++) {
    objects.push(new Object(canvas.width / 2+i, canvas.height / 2, 30*(400-i)/400, `hsl(${i*360/400}, 50%, 50%)`, i))
    // objects.push()
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = 'rgba(0, 0, 0, 0.05)'
  c.fillRect(0, 0, canvas.width, canvas.height)
  // c.clearRect(0, 0, canvas.width, canvas.height)
  let tan = (objects[0].y - mouse.y) / (objects[0].x - mouse.x)
  angle = Math.atan2(mouse.y, mouse.x)
  // c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
  objects.forEach(object => {
    object.update()
  })
}

init()
animate()
