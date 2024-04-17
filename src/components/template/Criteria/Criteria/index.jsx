/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import api from '../../../../config/api'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import AddCriteria from './addCriteria'
import UpdateCriteria from './updateCriteria'

const Criteria = () => {
  const [criterias, setCriterias] = useState([])
  const [weights, setWeights] = useState([])
  const [total, setTotal] = useState(0)
  const navigate = useNavigate()
  const [id, setId] = useState(0)
  const [title, setTitle] = useState('')
  const [isChecking, setIsChecking] = useState(false)
  const blockInvalidChar = e => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()
  const [ids, setIds] = useState([])

  const getCriteria = async () => {
    try {
      const result = await api.get('/criteria')
      const criteriaData = result.data.data
      setCriterias(criteriaData)
      const arrId = criteriaData.map((item) => item.id)
      setIds(arrId)
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
    let arrWeight = criterias.map((item) => item.weight)
    setWeights(arrWeight)
    getTotal(arrWeight)
  }

  const getTotal = (arrWeight) => {
    let result = 0
    arrWeight.forEach((item) => result += item)
    setTotal(result)
  }

  const changeWeight = (e) => {
    const index = Number(e.target.name.slice(-1))
    const newWeight = [...weights]
    newWeight[index] = Number(e.target.value)
    setWeights(newWeight)
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
          title: 'Berhasil menghapus kriteria'
        })
        getCriteria()
      } catch(err) {
        Swal.fire({
          icon: 'error',
          text: 'Gagal menghapus kriteria'
        })
      }
    }    
  }

  function clickUpdate (id, title) {
    setId(id)
    setTitle(title)
  }

  const updateWeight = async () => {
    const data = {
      id:ids,
      weight:weights
    }
    try {
      await api.put('/criteria/batch-weight', data)
      setIsChecking(false)
    } catch(err) {
      Swal.fire({
        icon: 'error',
        text: 'Gagal perbarui bobot kriteria'
      })
    }
  }

  useEffect(() => {
    (criterias.length===0) ? getCriteria() : getWeight()    
  },[criterias])

  useEffect(()=> {
    if (total === 100) {      
      setIsChecking(true)
      const timeout = setTimeout( ()=> {
        updateWeight()
      }, 2000)
      
      return () => clearTimeout(timeout)
    } else setIsChecking(false)
  }, [total])
  
  return (
    <div style={{ width: '60%' }}>
      <div className='border p-3'>
        <h3 className='mb-3'>Kriteria & Bobot Relatif</h3>
        <div className='mb-3'>
          {
            criterias?.map((item, index) => (
              <div key={index} className='d-flex align-items-center'>                    
                <p className='mb-0 me-3'> • </p>
                <div className={`w-100 d-flex justify-content-between align-items-center py-1 border-bottom ${index==0 && 'border-top'}`}>
                  <p className='mb-0'>{item.title}</p>
                  <div className='d-flex align-items-center gap-1'>
                    <div className="input-group input-group-sm pe-3" style={{ width:80 }}>
                      <input type="number" className="form-control" aria-describedby="num" 
                        defaultValue={item.weight} name={'weight'+index} onChange={changeWeight} onKeyDown={blockInvalidChar} />
                      <span className="input-group-text" id="num">%</span>
                    </div>
                    <button type="button" className="btn py-0 px-1"
                      data-bs-toggle="modal" 
                      data-bs-target="#updateCriteria"
                      onClick={() => clickUpdate(item.id, item.title)}>
                      <i className="bi bi-pencil-square text-warning fs-5"></i>
                    </button>
                    <button type="button" className={'btn py-0 px-1 '+ (ids.length < 3 ? 'd-none' : '')} 
                      onClick={() => deleteCriteria(item.id)}>
                      <i className="bi bi-x-square text-danger fs-5"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        <div className='d-flex justify-content-between align-items-center'>
          <div>
            <p className={'mb-0 text-danger '+ (total===100? 'd-none':'')} style={{ fontSize: '.9rem' }}          
            >*Total harus = 100%. Silahkan ubah bobot kriteria di atas</p>          
          </div>      
          <div className='d-flex align-items-center'>
            
            { isChecking ?
              <div className="spinner-border spinner-border-sm text-primary" role="status"></div> :
              total==100 ?
                <i className="bi bi-check-circle text-success fs-5"></i> :
                <i className="bi bi-x-circle text-danger fs-5"></i>
            }
            <p className={'mb-0 ms-2 '+ (total===100 ? 'text-success fw-bold': 'text-danger fw-bold')}
            >Total : {total} %</p>
            <button type="button" className="btn btn-success btn-sm ms-4" 
              data-bs-toggle="modal" data-bs-target="#addCriteria" disabled={ids.length > 9 ? true : false}>Tambah</button>
          </div>          
        </div>
      </div>
      <AddCriteria func={getCriteria} />
      <UpdateCriteria func={getCriteria} id={id} title={title} />
    </div>
  )
}

export default Criteria