import { alternative, criteria } from './data'

const Spk = () => {
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
              alternative.map((item, index) => (
                <th key={index} scope="col">{item}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            criteria.map((item, row) => (
              <tr key={row}>            
                <td scope="row">{item}</td>            
                {
                  alternative.map((item, index2) => (
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