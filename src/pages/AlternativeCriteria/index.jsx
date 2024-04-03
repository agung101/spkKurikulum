// import React from 'react'
import { alternative, criteria } from './data'

const AlternativeCriteria = () => {
  console.log(criteria)
  return (
    <main>
      <div className="d-flex gap-4 p-4">
        <div style={{ width: '40%' }}>
          <div className='border p-3'>
            <h3 className='mb-3'>Alternatif</h3>
            <div className='mb-3'>
              {
                alternative.map((item, index) => (
                  <div key={index} className='d-flex align-items-center'>
                    <p className='mb-0 me-3'> • </p>
                    <div className={`w-100 d-flex justify-content-between align-items-center py-1 border-bottom ${index==0 && 'border-top'}`}>
                      <p className='mb-0'>{item}</p>
                      <div className='d-flex gap-1'>
                        <button type="button" className="btn py-0 px-1"><i className="bi bi-pencil-square text-warning fs-5"></i></button>
                        <button type="button" className="btn py-0 px-1"><i className="bi bi-x-square text-danger fs-5"></i></button>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
            <button type="button" className="btn btn-primary btn-sm ms-4 mb-1">Tambah</button>
          </div>
        </div>
        <div style={{ width: '60%' }}>
          <div className='border p-3'>
            <h3 className='mb-3'>Kriteria & Presentase Bobot Awal</h3>
            <div className='mb-3'>
              {
                criteria.map((item, index) => (
                  <div key={index} className='d-flex align-items-center'>                    
                    <p className='mb-0 me-3'> • </p>
                    <div className={`w-100 d-flex justify-content-between align-items-center py-1 border-bottom ${index==0 && 'border-top'}`}>
                      <p className='mb-0'>{item}</p>
                      <div className='d-flex align-items-center gap-1'>
                        <div className="input-group input-group-sm pe-3" style={{ width:80 }}>
                          <input type="text" className="form-control" aria-describedby="num" />
                          <span className="input-group-text" id="num">%</span>
                        </div>
                        <button type="button" className="btn py-0 px-1"><i className="bi bi-pencil-square text-warning fs-5"></i></button>
                        <button type="button" className="btn py-0 px-1"><i className="bi bi-x-square text-danger fs-5"></i></button>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
            <div className='d-flex justify-content-between'>
              <button type="button" className="btn btn-primary btn-sm ms-4">Tambah</button>
              <div className='d-flex gap-2 align-items-center'>
                <p className='mb-0'>Total Bobot Awal: 100 %</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </main>
  )
}

export default AlternativeCriteria