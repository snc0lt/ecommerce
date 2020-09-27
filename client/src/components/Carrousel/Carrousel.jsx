import React from 'react'

export const Carrousel = () => {

  return (
    <div
      style={{ maxHeight: '400px' }}
      id='carouselExampleIndicators'
      className='carousel slide overflow-hidden'
      data-ride='carousel'
    >
      <ol className='carousel-indicators'>
        <li
          data-target='#carouselExampleIndicators'
          data-slide-to='0'
          className='active'
        ></li>
        <li data-target='#carouselExampleIndicators' data-slide-to='1'></li>
        <li data-target='#carouselExampleIndicators' data-slide-to='2'></li>
      </ol>
      <div className='carousel-inner'>
        <div className='carousel-item active'>
          <img
            src='https://http2.mlstatic.com/optimize/o:f_webp/resources/deals/exhibitors_resources/mco-home-desktop-slider-picture-aad1e028-0a9a-4ea7-b3f4-4bd3bfa92c0f.jpg'
            className='d-block w-100'
            style={{ maxHeight: '400px' }}
            alt='...'
          />
        </div>
        <div className='carousel-item'>
          <img
            src='https://http2.mlstatic.com/optimize/o:f_webp/resources/exhibitors/MLA-aniversario/de35e170-e950-11ea-b3d2-23d954cc4cf0-home-slider_desktop.jpg'
            className='d-block w-100'
            style={{ maxHeight: '400px' }}
            alt='...'
          />
        </div>
        <div className='carousel-item'>
          <img
            src='https://http2.mlstatic.com/optimize/o:f_webp/resources/deals/exhibitors_resources/mla-home-desktop-slider-picture-e55607e0-6fa4-4506-82ef-8a683436cf9c.jpg'
            className='d-block w-100'
            style={{ maxHeight: '400px' }}
            alt='...'
          />
        </div>
      </div>
      <a
        className='carousel-control-prev'
        href='#carouselExampleIndicators'
        role='button'
        data-slide='prev'
      >
        <span className='carousel-control-prev-icon' aria-hidden='true'></span>
        <span className='sr-only'>Previous</span>
      </a>
      <a
        className='carousel-control-next'
        href='#carouselExampleIndicators'
        role='button'
        data-slide='next'
      >
        <span className='carousel-control-next-icon' aria-hidden='true'></span>
        <span className='sr-only'>Next</span>
      </a>
    </div>
  )
}
