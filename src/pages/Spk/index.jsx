import { useEffect, useState } from 'react'
import api from '../../config/api'
import Swal from 'sweetalert2'
import { useNavigate, Link } from 'react-router-dom'
import confirmAlert from '../../helper/confirmAlert'

const Spk = () => {
  const [alternatives, setAlternatives] = useState([])
  const [criterias, setCriterias] = useState([])
  const [weights, setWeights] = useState([])
  const [values, setValues] = useState([[]])
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
    // set default values with 0
    let temp = []
    for (let i = 0; i < criterias.length; i++) {
      temp[i] = []
      for (let j = 0; j < alternatives.length; j++) {
        temp[i][j] = 0
      }
    }
    setValues(temp)

    let arrWeight = criterias.map((item) => item.weight)
    setWeights(arrWeight)
  }

  function updateValues(e, i, j) {
    const newValues = [...values]
    newValues[i][j] = Number(e.target.value)
    setValues(newValues)
  }

  const submitWeights = async (e) => {
    e.preventDefault()
    if (await confirmAlert('Apakah bobot yang anda masukan sudah benar')) {
      // Inisialisasi variabel yang dibutuhkan
      let resultsPerCriteria = [...values.map(innerArray => [...innerArray])]
      let temp
      let total = []
      for(let i = 0; i < alternatives.length;i++)
        total[i] = 0
      
      // Perhitungan per Kriteria (bobotAwal*bobotInputan) 
      // & Total Bobot Semua Kriteria per Alternatif (bobot1+bobot2+bobot3+...)
      weights.forEach((item, index) => {
        for(let i = 0; i < alternatives.length;i++){
          temp = resultsPerCriteria[index][i] * (item / 100)
          temp = Number((Math.round(temp * 100) / 100).toFixed(2))
          resultsPerCriteria[index][i] = temp
          total[i] += temp 
        }
      })

      // Merapikan dan Mengurutkan Hasil Perhitungan
      let results = alternatives.map((item, index) => (
        { title:item.title, total: total[index] }
      ))
      results.sort((a, b) => b.total - a.total)
      const alternative = alternatives.map((item) => item.title)
      const criteria = criterias.map((item) => item.title)
      navigate('/result', { state: { 
        results, total, alternative, criteria, weights, dynamicWeights: values, resultsPerCriteria }})
    }
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
        <p className='mb-3'>3 : Sangat Baik</p>
      </div>
      <div className='d-flex mb-5'>
        <Link to='/criteria' className='btn btn-secondary btn-sm'
        ><i className="bi bi-arrow-left-circle me-1"></i> Kembali</Link>
      </div>

      <form onSubmit={submitWeights} >
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
                        <input type="radio" className="btn-check" id={'r'+row+'opt0a'+index2} autoComplete="off" defaultChecked
                          name={'criteria'+row+'alternative'+index2} value={0} onChange={(e) => updateValues(e, row, index2)}/>
                        <label className="btn me-1" htmlFor={'r'+row+'opt0a'+index2}>0</label>

                        <input type="radio" className="btn-check" id={'r'+row+'opt1a'+index2} autoComplete="off" 
                          name={'criteria'+row+'alternative'+index2} value={1} onChange={(event) => updateValues(event, row, index2)}/>
                        <label className="btn me-1" htmlFor={'r'+row+'opt1a'+index2}>1</label>

                        <input type="radio" className="btn-check" id={'r'+row+'opt2a'+index2} autoComplete="off" 
                          name={'criteria'+row+'alternative'+index2} value={2} onChange={(event) => updateValues(event, row, index2)}/>                      
                        <label className="btn me-1" htmlFor={'r'+row+'opt2a'+index2}>2</label>

                        <input type="radio" className="btn-check" id={'r'+row+'opt3a'+index2} autoComplete="off" 
                          name={'criteria'+row+'alternative'+index2} value={3} onChange={(event) => updateValues(event, row, index2)}/>
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
          <button type="submit" className="btn btn-outline-primary btn-lg">Hitung SPK</button>
        </div>
      </form>
    </div>
  )
}

export default Spk