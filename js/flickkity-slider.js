const buttons = {
  prev: document.querySelector('.btn-flick-prev'),
  next: document.querySelector('.btn-flick-next')
}

const dots = {
  dot: document.querySelectorAll('.dots-item')
}



var elem = document.querySelector('.main-carousel');
let dots_index = 0

var flkty = new Flickity( elem, {
  // options
  prevNextButtons: false,
  pageDots: false,
  contain: true,
  draggable: false,
  on: {
    ready: function() {
      console.log('Flickity is ready');
    },
    change: function( index ) {
      dots_index = index
      console.log('Я сработал', dots_index)
    }
  }
});

//  Перематываем слайд назад

const backToSlide = () => {
  flkty.previous()
  deleteActive('active-number-dot')
  const dots_wrapper = document.querySelectorAll('.group-dots-slick > div')
  const dots = document.querySelectorAll('.dots-number')
  const dots_active = dots_wrapper[dots_index].querySelector('p')
  dots_active.classList.add('active-dots')     
  const prev_dots = dots_wrapper[dots_index + 1].querySelector('span')
  const dots_activete = dots_wrapper[dots_index + 1].querySelector('p')
  dots_activete.classList.remove('active-dots') 
  changeDots({dots, prev_dots})

  // console.log('Назад')
}

//  Перематываем слайд вперед

const nextToSlide = () => {
  flkty.next()
  deleteActive('active-number-dot')
  const dots_wrapper = document.querySelectorAll('.group-dots-slick > div')
  const dots_active = dots_wrapper[dots_index - 1].querySelector('p')
  dots_active.classList.remove('active-dots')
  const dots = document.querySelectorAll('.dots-number') 
  const dots_activete = dots_wrapper[dots_index].querySelector('p')
  dots_activete.classList.add('active-dots')     
  const prev_dots = dots_wrapper[dots_index - 1].querySelector('span')
  changeDots({dots, prev_dots})
  // console.log('Вперед')
}

const listenerDots = (e) => {
  deleteActive('active-dots')
  const dots_wrapper = document.querySelectorAll('.group-dots-slick > div')
   dots_index = e.target.getAttribute('number')
   const payload_wrapper = {
    dots_p: dots_wrapper[dots_index].querySelector('p'),
    dots_span: dots_wrapper[dots_index].querySelector('span')
  }
  payload_wrapper.dots_span.innerHTML = `0${Number(dots_index) + 1}`
  payload_wrapper.dots_p.classList.add('active-dots')
  payload_wrapper.dots_span.classList.add('active-number-dot')
  flkty.select(dots_index)
}

const deleteActive = (payload) => {
  console.log('payload', payload)
  const dot_active_dot = document.querySelector(`.${payload}`)
  const dot_active_number = document.querySelector('.active-number-dot')
  dot_active_dot.classList.remove(`${payload}`)
  dot_active_number.innerHTML = ''
  dot_active_number.classList.remove('active-number-dot')
}

const changeDots = (payload) => {
  const {dots, prev_dots} = payload
  dots.forEach((item) => {
        if (item.getAttribute("id").includes(dots_index)) {
          item.classList.add('active-number-dot')
          item.innerHTML = `0${dots_index + 1}`
          prev_dots.innerHTML = ''
        }
    })
}


 


buttons.prev.addEventListener('click', (e) => backToSlide())
buttons.next.addEventListener('click', (e) => nextToSlide())

dots.dot.forEach((item) => {
  item.addEventListener('click', (e) => listenerDots(e))
})