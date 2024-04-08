import { useEffect, useState } from 'react'
import api from '../../../config/api'
import Swal from 'sweetalert2'

const Alternative = () => {
  const [alternative, setAlternative] = useState([])

  const getAlternative = async () => {
    try {
      const result = await api.get('/alternative')
      setAlternative(result.data.data)
    } catch(err) {
      Swal.fire({
        icon: 'error',
        text: 'Gagal mendapatkan data alternatif'
      })
    }
  }

  useEffect(() => {
    getAlternative()
  },[])

  return (
    <div style={{ width: '40%' }}>
      <div className='border p-3 mb-4'>
        <h3 className='mb-3'>Alternatif</h3>
        <div className='mb-3'>
          {
            alternative?.map((item, index) => (
              <div key={index} className='d-flex align-items-center'>
                <p className='mb-0 me-3'> • </p>
                <div className={`w-100 d-flex justify-content-between align-items-center py-1 border-bottom ${index==0 && 'border-top'}`}>
                  <p className='mb-0'>{item.title}</p>
                  <div className='d-flex gap-1'>
                    <button type="button" className="btn py-0 px-1"><i className="bi bi-pencil-square text-warning fs-5"></i></button>
                    <button type="button" className="btn py-0 px-1"><i className="bi bi-x-square text-danger fs-5"></i></button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        <div className='d-flex justify-content-end'>
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
  )
}

export default Alternative