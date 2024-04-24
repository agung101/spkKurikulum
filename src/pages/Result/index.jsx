import { useState } from 'react'
import { useLocation } from 'react-router-dom'

const Result = () => {
  const { state : { results, total, alternative, criteria, weights, dynamicWeights, resultsPerCriteria } } = useLocation()
  // console.log(alternative)
  // console.log(criteria)
  // console.log(weights)
  const [toggle, setToggle] = useState(false)

  function colorRowTable(index) {
    let color = ''
    if (index==0) color='table-info'
    else if (index==1) color='table-primary'
    else if (index==2) color='table-success'
    return color
  }

  return (
    <main className='mb-5'>
      <h3 className="text-center mt-5 mb-4">Hasil Sistem Pendukung Keputusan</h3>
      <div className='d-flex flex-column align-items-center mb-3'>      
        <div className='w-50'>
          <table className='table border'>
            <thead className='table-warning'>
              <tr className='bg-primary-subtle'>
                <th className='text-center' style={{ width: 50 }}>No</th>
                <th>Alternatif</th>
                <th style={{ width: 100 }}>Skor</th>
              </tr>
            </thead>
            <tbody>
              { 
                results.map((item, index) => (
                  <tr key={index} className={colorRowTable(index)}>
                    <td className='text-center'>{index+1}</td>
                    <td>{ item.title }</td>
                    <td>{ item.total }</td>
                  </tr>
                ))
              }
            </tbody>
          </table>          
        </div>        
      </div>
      <div className='px-5'>
        <p>Berdasarkan hasil sistem pendukung keputusan, maka direkomendasikan untuk memilih <span className='fw-bold'>{results[0].title}</span></p>
        <div className='d-flex align-items-center'>
          <button className='btn py-0 px-1' onClick={() => setToggle(!toggle)}>
            {
              toggle ? <i className="bi bi-caret-up-fill fs-6"></i> 
                : <i className="bi bi-caret-down-fill fs-6"></i>
            }
                
          </button>
          <p className='fs-5 mb-0'>Detail</p>
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