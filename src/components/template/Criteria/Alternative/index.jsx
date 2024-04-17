import { useEffect, useState } from 'react'
import api from '../../../../config/api'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import AddAlternative from './addAlternative'
import UpdateAlternative from './updateAlternative'

const Alternative = () => {
  const [alternative, setAlternative] = useState([])
  const [id, setId] = useState(0)
  const [title, setTitle] = useState('')

  const navigate = useNavigate()

  const getAlternative = async () => {
    try {
      const result = await api.get('/alternative')
      setAlternative(result.data.data)
    } catch(err) {
      if (err.message === 'Token expired') 
        navigate('/login')
      else
        Swal.fire({
          icon: 'error',
          text: 'Gagal mendapatkan data alternatif'
        })
    }
  }

  const deleteAlternative = async (id) => {
    const confirmed = await Swal.fire({
      title: 'Yakin ingin menghapus',
      icon: 'question',
      confirmButtonText: '<span style="margin: 0 10px">Ya</span>',
      confirmButtonColor: '#3085d6',
      showCancelButton: true,
      cancelButtonText: 'Tidak',
      cancelButtonColor: '#d33',
      reverseButtons: true,
    }).then((result) => {
      return result.isConfirmed
    })

    if (confirmed) {
      try {
        await api.delete('/alternative/'+id)
        Swal.fire({
          icon: 'success',
          title: 'Berhasil menghapus alternatif'
        })
        getAlternative()
      } catch(err) {
        Swal.fire({
          icon: 'error',
          text: 'Gagal menghapus alternatif'
        })
      }
    }    
  }

  function onClickUpdate (id, title) {
    setId(id)
    setTitle(title)
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
                    <button type="button" className="btn py-0 px-1" 
                      data-bs-toggle="modal" 
                      data-bs-target="#updateAlternative"
                      onClick={() => onClickUpdate(item.id, item.title)}>
                      <i className="bi bi-pencil-square text-warning fs-5"></i>
                    </button>
                    <button type="button" className={'btn py-0 px-1 '+ (alternative.length < 3 ? 'd-none' : '')}
                      onClick={() => deleteAlternative(item.id)}>
                      <i className="bi bi-x-square text-danger fs-5"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        <div className='d-flex justify-content-end'>
          <button type="button" className="btn btn-success btn-sm mb-1" 
            data-bs-toggle="modal" 
            data-bs-target="#addAlternative" 
            disabled={alternative.length > 4 ? true : false}>Tambah</button>
        </div>
      </div>

      <div className='border p-3'>
        <h3 className='mb-3'>Keterangan</h3>
        <p>Alternatif adalah objek-objek yang berbeda dan memiliki kesempatan yang sama untuk dipilih oleh pengambil keputusan. <br /><span className='text-danger'>*minimal 2, maksimal 5</span></p>
        <p>Kriteria adalah ukuran yang menjadi dasar penilaian atau penetapan sesuatu. <br /> <span className='text-danger'>*minimal 2, maksimal 10</span></p>
        <p>Bobot relatif mencerminkan tingkat kepentingan dalam keputusan. <br /> <span className='text-danger'>*Pastikan total bobot semua kriteria sama dengan 100%.</span> </p>
      </div>

      <AddAlternative func={getAlternative} />
      <UpdateAlternative func={getAlternative} id={id} title={title} />
    </div>
  )
}

export default Alternative