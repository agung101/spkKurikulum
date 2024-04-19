// import { criteria } from './data'
import { useEffect, useState } from 'react'
import api from '../../config/api'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const Spk = () => {
  const [alternatives, setAlternatives] = useState([])
  const [criterias, setCriterias] = useState([])
  const [weights, setWeights] = useState([])
  const navigate = useNavigate()

  const getAlternative = async () => {
    try {
      const result = await api.get('/alternative')
      setAlternatives(result.data.data)
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

  const getCriteria = async () => {
    try {
      const result = await api.get('/criteria')
      const criteriaData = result.data.data
      setCriterias(criteriaData)
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
  }

  useEffect(() => {
    getAlternative()
  },[])

  useEffect(() => {
    (criterias.length===0) ? getCriteria() : getWeight()    
  },[criterias])

  return (
    <div className='p-4'>
      <div className='ms-2 mt-2'>
        <h4>Pemberian Skala Nilai pada Kriteria</h4>
        <p className='mb-0'>Silahkan tentukan skala nilai dari setiap alternatif dan kriteria.</p>
        <p className='mb-0'>0 : Sangat Buruk</p>
        <p className='mb-0'>1 : Buruk</p>
        <p className='mb-0'>2 : Baik</p>
        <p className='mb-4'>3 : Sangat Baik</p>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Kriteria</th>
            {
              alternatives.map((item, index) => (
                <th key={index} scope="col">{item.title}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            criterias.map((item, row) => (
              <tr key={row}>            
                <td scope="row">{item.title}</td>            
                {
                  alternatives.map((item, index2) => (
                    <td key={index2}>
                      <input type="radio" className="btn-check" name={row+'alternative'+index2} id={'r'+row+'opt0a'+index2} autoComplete="off" defaultChecked/>
                      <label className="btn me-1" htmlFor={'r'+row+'opt0a'+index2}>0</label>

                      <input type="radio" className="btn-check" name={row+'alternative'+index2} id={'r'+row+'opt1a'+index2} autoComplete="off" />
                      <label className="btn me-1" htmlFor={'r'+row+'opt1a'+index2}>1</label>

                      <input type="radio" className="btn-check" name={row+'alternative'+index2} id={'r'+row+'opt2a'+index2} autoComplete="off" />
                      <label className="btn me-1" htmlFor={'r'+row+'opt2a'+index2}>2</label>

                      <input type="radio" className="btn-check" name={row+'alternative'+index2} id={'r'+row+'opt3a'+index2} autoComplete="off" />
                      <label className="btn me-1" htmlFor={'r'+row+'opt3a'+index2}>3</label>
                    </td>
                  ))
                }
              </tr>
            ))            
          }    
        </tbody>
      </table>
      <div className='d-flex justify-content-center mb-5 pt-4'>
        <button type="button" className="btn btn-outline-primary btn-lg">Hitung SPK</button>
      </div>
    </div>
  )
}

export default Spk