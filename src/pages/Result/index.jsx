import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import ResultTable from '../../components/template/Result/ResultTable'
import './result.css'

const Result = () => {
  const { results, total, alternative, criteria, weights, dynamicWeights, resultsPerCriteria } = useLocation().state
  const [toggle, setToggle] = useState(false)

  useEffect(() => 
    window.scrollTo({top: 0, behavior: 'instant'})
  , [])

  return (
    <main className='mb-5'>
      <h3 className="text-center mt-5 mb-4">Hasil Sistem Pendukung Keputusan</h3>   
      <ResultTable results={results} />
      
      <div className='px-5'>
        <p>Berdasarkan hasil sistem pendukung keputusan, maka direkomendasikan untuk memilih <span className='fw-bold'>{results[0].title}.</span></p>
        <div className='d-flex align-items-end justify-content-between'>
          <div className='d-flex'>
            <button className='no-print btn py-0 px-1' onClick={() => setToggle(!toggle)}>
              {
                toggle ? <i className="bi bi-caret-up-fill fs-6"></i> 
                  : <i className="bi bi-caret-down-fill fs-6"></i>
              }                
            </button>
            <p className={'fs-5 mb-0 -ms-5 '+ (toggle? '': 'no-print')}>Detail</p>
          </div>
          <div className='no-print d-flex'>
            <Link to='/criteria' className='btn btn-secondary' style={{ width:120 }}
            >Mulai lagi <i className="bi bi-arrow-repeat"></i></Link>
            <button className='btn btn-warning ms-3' style={{ width:120 }} onClick={() => window.print()}
            >Cetak <i className="bi bi-printer ms-1"></i></button>
          </div>   
        </div>
      </div>

      {
        toggle ?
          <div className='px-5'>
            <table className="table border mt-4">
              <thead>
                <tr>
                  <th scope="col" className='ps-3'>Kriteria</th>
                  {
                    alternative.map((item, index) => (
                      <th key={index} scope="col" className='text-center'>{item}</th>
                    ))
                  }
                </tr>
              </thead>
              <tbody>
                {
                  criteria.map((item, row) => (
                    <tr key={row}>            
                      <td scope="row" className='mb-0 ps-3'>{item}</td>            
                      {
                        alternative.map((item, index2) => (
                          <td key={index2}>
                            <p className='mb-0 text-center'>{dynamicWeights[row][index2]} × {weights[row]}% = {resultsPerCriteria[row][index2]}</p>
                          </td>
                        ))
                      }
                    </tr>
                  ))            
                }
                <tr>
                  <td className='mb-0 ps-3'>Total</td>
                  {
                    alternative.map((item, index) => (
                      <td key={index}>
                        <p className='mb-0 text-center'>{total[index]}</p>
                      </td>
                    ))
                  }
                </tr> 
              </tbody>
            </table>
          </div>
          :
          <div style={{ height: 400 }}></div>
      }
      
    </main>
  )
}

export default Result