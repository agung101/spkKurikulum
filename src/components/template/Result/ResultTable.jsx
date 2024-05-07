import PropTypes from 'prop-types'

const ResultTable = ({ results }) => {
  function colorRowTable(index) {
    let color = ''
    if (index==0) color='table-info'
    else if (index==1) color='table-primary'
    else if (index==2) color='table-success'
    return color
  }
  return (
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
  )
}

export default ResultTable

ResultTable.propTypes = {
  results: PropTypes.array
}