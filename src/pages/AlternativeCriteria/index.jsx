import { alternative, criteriaData } from './data.js'
import { useEffect, useState } from 'react'

const AlternativeCriteria = () => {
  const [total, setTotal] = useState(0)
  const [weight, setWeight] = useState([])  

  const getWeight = () => {
    let arrWeight = criteriaData.map((item) => item.weight)
    setWeight(arrWeight)
    getTotal(arrWeight)
  }

  const changeWeight = (e) => {
    const index = Number(e.target.name.slice(-1))
    const newWeight = [...weight]
    newWeight[index] = Number(e.target.value)
    setWeight(newWeight)
    getTotal(newWeight)
  }

  const getTotal = (arrWeight) => {
    let result = 0
    arrWeight.forEach((item) => result += item)
    setTotal(result)
  }

  useEffect(() => {
    getWeight()
  },[])

  return (
    <main>
      <div className="d-flex gap-4 p-4">
        <div style={{ width: '40%' }}>
          <div className='border p-3 mb-4'>
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
            <div className='d-flex justify-content-between'>
              <button type="button" className="btn btn-primary btn-sm ms-4 mb-1">Simpan Perubahan</button>
              <button type="button" className="btn btn-success btn-sm mb-1">Tambah</button>
            </div>
          </div>

          <div className='border p-3'>
            <h3 className='mb-3'>Keterangan</h3>
            <p>Alternatif adalah objek-objek yang berbeda dan memiliki kesempatan yang sama untuk dipilih oleh pengambil keputusan.</p>
            <p>Kriteria adalah ukuran yang menjadi dasar penilaian atau penetapan sesuatu.</p>
            <p>Bobot relatif mencerminkan tingkat kepentingan dalam keputusan. Pastikan total bobot semua kriteria sama dengan 100%.</p>
          </div>
        </div>
        <div style={{ width: '60%' }}>
          <div className='border p-3'>
            <h3 className='mb-3'>Kriteria & Bobot Relatif</h3>
            <div className='mb-3'>
              {
                criteriaData.map((item, index) => (
                  <div key={index} className='d-flex align-items-center'>                    
                    <p className='mb-0 me-3'> • </p>
                    <div className={`w-100 d-flex justify-content-between align-items-center py-1 border-bottom ${index==0 && 'border-top'}`}>
                      <p className='mb-0'>{item.criteria}</p>
                      <div className='d-flex align-items-center gap-1'>
                        <div className="input-group input-group-sm pe-3" style={{ width:80 }}>
                          <input type="text" className="form-control" aria-describedby="num" name={'weight'+index} defaultValue={item.weight} onChange={changeWeight}/>
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
              <button type="button" className="btn btn-primary btn-sm ms-4">Simpan Perubahan</button>
              <div className='d-flex gap-4 align-items-center'>
                <p className='mb-0'>Total : {total} %</p>
                <button type="button" className="btn btn-success btn-sm">Tambah</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </main>
  )
}

export default AlternativeCriteria