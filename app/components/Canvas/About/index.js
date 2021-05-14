import { Plane, Transform } from 'ogl'
import GSAP from 'gsap'

import map from 'lodash/map'

import Gallery from './Gallery'

export default class {
  constructor ({ gl, scene, sizes }) {
    this.gl = gl
    this.sizes = sizes

    this.group = new Transform()

    this.createGeometry()
    this.createGalleries()

    this.onResize({
      sizes: this.sizes
    })

    this.group.setParent(scene)

    this.show()
  }

  createGeometry () {
    this.geometry = new Plane(this.gl)
  }

  createGalleries () {
    this.galleriesElements = document.querySelectorAll('.about__gallery')

    this.galleries = map(this.galleriesElements, (element, index) => {
      return new Gallery({
        element,
        geometry: this.geometry,
        index,
        gl: this.gl,
        scene: this.group,
        sizes: this.sizes
      })
    })
  }

  /**
   * Animations.
   */
  show () {
    map(this.galleries, gallery => gallery.show())
  }

  hide () {
    map(this.galleries, gallery => gallery.hide())
  }

  /**
   * Events.
   */
  onResize (event) {
    map(this.galleries, gallery => gallery.onResize(event))
  }

  onTouchDown (event) {
    map(this.galleries, gallery => gallery.onTouchDown(event))
  }

  onTouchMove (event) {
    map(this.galleries, gallery => gallery.onTouchMove(event))
  }

  onTouchUp (event) {
    map(this.galleries, gallery => gallery.onTouchUp(event))
  }

  onWheel ({ pixelX, pixelY }) {

  }

  /**
   * Update.
   */
  update (scroll) {
    map(this.galleries, gallery => gallery.update(scroll))
  }

  /**
   * Destroy.
   */
  destroy () {
    map(this.galleries, gallery => gallery.destroy())
  }
}
