// import React from 'react'
import { useLocation } from 'react-router-dom'

const Result = () => {
  const { state : { result } } = useLocation()
  console.log(result)

  return (
    <main>
      <h3 className="text-center mt-5">Hasil Sistem Pendukung Keputusan</h3>
      <table>
        <thead>
          <tr>
            <th>Alternatif</th>
            <th>Skor</th>
          </tr>
        </thead>
        <tbody>
          { 
            // result.map((item, index) => (
            //   <tr key={index}>
            //     <td>{ item.title }</td>
            //     <td>{ item.total }</td>
            //   </tr>
            // ))
          }
        </tbody>
      </table>
    </main>
  )
}

export default Result