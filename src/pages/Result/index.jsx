import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import ResultTable from '../../components/template/Spk/ResultTable'
import './result.css'

const Result = () => {
  const { state : { results, total, alternative, criteria, weights, dynamicWeights, resultsPerCriteria } } = useLocation()
  const [toggle, setToggle] = useState(false)

  return (
    <main className='mb-5'>
      <h3 className="text-center mt-5 mb-4">Hasil Sistem Pendukung Keputusan</h3>   
      <ResultTable results={results} />
      
      <div className='px-5'>
        <p>Berdasarkan hasil sistem pendukung keputusan, maka direkomendasikan untuk memilih <span className='fw-bold'>{results[0].title}.</span></p>
        <div className='d-flex align-items-center justify-content-between'>
          <div className='d-flex'>
            <button className='btn py-0 px-1 no-print' onClick={() => setToggle(!toggle)}>
              {
                toggle ? <i className="bi bi-caret-up-fill fs-6"></i> 
                  : <i className="bi bi-caret-down-fill fs-6"></i>
              }                
            </button>
            <p className='fs-5 mb-0 -ms-5'>Detail</p>
          </div>          
          <button className='btn btn-secondary ms-3 no-print' onClick={() => window.print()}
          >Cetak <i className="bi bi-printer ms-1"></i></button>
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