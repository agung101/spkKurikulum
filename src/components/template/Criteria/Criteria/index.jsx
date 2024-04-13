import { useEffect, useState } from 'react'
import api from '../../../../config/api'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import AddCriteria from './addCriteria'
import UpdateCriteria from './updateCriteria'

const Criteria = () => {
  const [criteria, setCriteria] = useState([])
  const [weight, setWeight] = useState([])
  const [total, setTotal] = useState(0)
  const navigate = useNavigate()
  const [id, setId] = useState(0)
  const [title, setTitle] = useState('')

  const getCriteria = async () => {
    try {
      const result = await api.get('/criteria')
      setCriteria(result.data.data)
    } catch(err) {
      if (err.message === 'Token expired') 
        navigate('/login')
      else
        Swal.fire({
          icon: 'error',
          text: 'Gagal mendapatkan data kriteria'
        })
    }
  }

  const getWeight = () => {
    let arrWeight = criteria.map((item) => item.weight)
    setWeight(arrWeight)
    getTotal(arrWeight)
  }

  const getTotal = (arrWeight) => {
    let result = 0
    arrWeight.forEach((item) => result += item)
    setTotal(result)
  }

  const changeWeight = (e) => {
    const index = Number(e.target.name.slice(-1))
    const newWeight = [...weight]
    newWeight[index] = Number(e.target.value)
    setWeight(newWeight)
    getTotal(newWeight)
  }

  const deleteCriteria = async (id) => {
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
        await api.delete('/criteria/'+id)
        Swal.fire({
          icon: 'success',
          title: 'Berhasil menghapus criteria'
        })
        getCriteria()
      } catch(err) {
        Swal.fire({
          icon: 'error',
          text: 'Gagal menghapus criteria'
        })
      }
    }    
  }

  function clickUpdate (id, title) {
    setId(id)
    setTitle(title)
  }

  useEffect(() => {
    (criteria.length===0) ? getCriteria() : getWeight()    
  },[criteria])
  
  return (
    <div style={{ width: '60%' }}>
      <div className='border p-3'>
        <h3 className='mb-3'>Kriteria & Bobot Relatif</h3>
        <div className='mb-3'>
          {
            criteria?.map((item, index) => (
              <div key={index} className='d-flex align-items-center'>                    
                <p className='mb-0 me-3'> • </p>
                <div className={`w-100 d-flex justify-content-between align-items-center py-1 border-bottom ${index==0 && 'border-top'}`}>
                  <p className='mb-0'>{item.title}</p>
                  <div className='d-flex align-items-center gap-1'>
                    <div className="input-group input-group-sm pe-3" style={{ width:80 }}>
                      <input type="text" className="form-control" aria-describedby="num" 
                        defaultValue={item.weight} name={'weight'+index} onChange={changeWeight} />
                      <span className="input-group-text" id="num">%</span>
                    </div>
                    <button type="button" className="btn py-0 px-1"
                      data-bs-toggle="modal" 
                      data-bs-target="#updateCriteria"
                      onClick={() => clickUpdate(item.id, item.title)}>
                      <i className="bi bi-pencil-square text-warning fs-5"></i>
                    </button>
                    <button type="button" className="btn py-0 px-1" onClick={() => deleteCriteria(item.id)}>
                      <i className="bi bi-x-square text-danger fs-5"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        <div className='d-flex justify-content-end'>
          <div className='d-flex gap-4 align-items-center'>
            <p className='mb-0'>Total : {total} %</p>
            <button type="button" className="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#addCriteria">Tambah</button>
          </div>
        </div>
      </div>
      <AddCriteria func={getCriteria} />
      <UpdateCriteria func={getCriteria} id={id} title={title} />
    </div>
  )
}

export default Criteria