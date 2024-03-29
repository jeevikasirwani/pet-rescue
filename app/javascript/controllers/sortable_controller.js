import { Controller } from '@hotwired/stimulus'

export default class SortableController extends Controller {
  get sortOrder () {
    return [...this.element.querySelectorAll('tbody tr')].map(tr => tr.dataset.sortValue)
  }

  onDragstart (e) {
    e.dataTransfer.effectAllowed = 'move'

    e.currentTarget.classList.add('opacity-25')

    this.draggedElement = e.currentTarget
  }

  onDragend (e) {
    e.currentTarget.classList.remove('opacity-25', 'opacity-50')

    this.draggedElement = undefined
  }

  onDragenter (e) {
    e.preventDefault()

    e.currentTarget.classList.add('opacity-50')
  }

  onDragleave (e) {
    e.preventDefault()

    e.currentTarget.classList.remove('opacity-50')
  }

  onDragover (e) {
    e.preventDefault()
  }

  onDrop (e) {
    e.preventDefault()

    if (e.currentTarget.closest('thead')) {
      this.draggedElement.closest('tbody').prepend(this.draggedElement)
    } else {
      e.currentTarget.after(this.draggedElement)
    }

    e.currentTarget.classList.remove('opacity-50')

    console.log(this.sortOrder)
  }
}
